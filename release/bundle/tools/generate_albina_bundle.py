from __future__ import annotations

import binascii
import hashlib
import json
import math
import re
import shutil
import struct
import zlib
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_MD = Path(r"C:\Users\张一帆\Downloads\边狱巴士RP向整合设定集_全量重建版.md")
SKILL_ROOT = Path(r"C:\Users\张一帆\.codex\skills\sillytavern-card-workflow")
PROJECT_ID = "albina-galgame-card"
PROJECT_NAME = "阿尔比娜 Galgame Card"
GITHUB_REPO = "q18718859808-sketch/albina-galgame-card"
TAG = "v1.0.22"
RUNTIME_REF = TAG
ASSET_REF = "v1.0.22"
CDN_BASE = f"https://cdn.jsdelivr.net/gh/{GITHUB_REPO}@{RUNTIME_REF}/dist/{PROJECT_ID}"
ASSET_CDN_BASE = f"https://cdn.jsdelivr.net/gh/{GITHUB_REPO}@{ASSET_REF}/dist/{PROJECT_ID}"
SAVE_KEY = "albinaGalgameCardGameSaveV1"


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def write_text(rel: str, text: str) -> None:
    path = ROOT / rel
    ensure_dir(path.parent)
    path.write_text(text, encoding="utf-8", newline="\n")


def write_json(rel: str, data) -> None:
    write_text(rel, json.dumps(data, ensure_ascii=False, indent=2) + "\n")


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def slug(value: str) -> str:
    value = re.sub(r"\([^)]*\)", "", value)
    value = re.sub(r"[^\w\u4e00-\u9fff]+", "-", value, flags=re.U).strip("-")
    return value[:64] or "entry"


def load_source() -> tuple[str, list[str]]:
    text = SOURCE_MD.read_text(encoding="utf-8")
    return text, text.splitlines()


def parse_sections(lines: list[str]) -> list[dict]:
    heading_re = re.compile(r"^(#{1,6})\s+(.+?)\s*$")
    sections: list[dict] = []
    stack: list[dict] = []
    current: dict | None = None

    for idx, line in enumerate(lines, start=1):
        match = heading_re.match(line)
        if match:
            if current is not None:
                current["end_line"] = idx - 1
                sections.append(current)
            level = len(match.group(1))
            title = match.group(2).strip()
            stack = [item for item in stack if item["level"] < level]
            stack.append({"level": level, "title": title})
            current = {
                "level": level,
                "title": title,
                "path": " / ".join(item["title"] for item in stack),
                "start_line": idx,
                "end_line": idx,
                "body": [],
            }
            continue
        if current is not None:
            current["body"].append(line)
    if current is not None:
        current["end_line"] = len(lines)
        sections.append(current)
    return sections


RP_SKIP_HEADINGS = [
    "编撰说明",
    "术语表",
    "索引",
    "组织关系图",
    "音乐设定",
    "主题曲",
    "音效设计",
    "语音演出",
    "官方台词",
    "官方性格",
    "官方梗概",
    "玩法模式",
    "系统详解",
    "赛季系统",
    "扭蛋",
    "资源系统",
    "人格列表",
    "Build",
    "Boss",
    "战斗数据",
    "敌人档案补充",
    "周边",
    "社区",
    "同人",
    "剧场模式",
]

RP_KEEP_HINTS = [
    "都市",
    "后巷",
    "巢",
    "翼",
    "首脑",
    "边狱",
    "Limbus",
    "梅菲斯特",
    "但丁",
    "罪人",
    "环指",
    "五指",
    "蜘蛛巢",
    "阿尔比娜",
    "Albina",
    "法西娅",
    "Fascia",
    "卡利斯托",
    "莲",
    "卢西奥",
    "绮罗",
    "空",
    "阿赖耶",
    "人体派",
    "E.G.O",
    "异想体",
    "扭曲",
    "时间线",
    "美术设定",
    "视觉",
    "战斗基础",
    "状态效果",
]

LINE_NOISE = [
    "内容说明",
    "官方公开资料",
    "编撰者",
    "非Project Moon",
    "声优",
    "BGM",
    "OST",
    "主题曲",
    "音乐专辑",
    "周边",
    "社区",
    "同人创作",
    "扭蛋",
    "赛季",
    "UI界面",
    "剧场模式",
    "未公开",
    "官方",
    "完整档案",
    "完全详解",
    "完全手册",
    "官方描述",
    "官方设定",
    "官方解读",
    "基于游戏",
]


def clean_rp_text(lines: list[str]) -> str:
    kept: list[str] = []
    blank = False
    for raw in lines:
        line = raw.strip()
        if not line or set(line) <= {"=", "-", " "}:
            if not blank and kept:
                kept.append("")
            blank = True
            continue
        if any(key in line for key in LINE_NOISE):
            continue
        if line.startswith("|") and ("声优" in line or "OST" in line or "BGM" in line):
            continue
        line = line.replace("官方", "").replace("完全", "").replace("详解", "")
        line = re.sub(r"\s+", " ", line).strip()
        if line:
            kept.append(line)
            blank = False
    text = "\n".join(kept).strip()
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text


def section_is_rp(section: dict) -> bool:
    path = section["path"]
    if any(key in path for key in RP_SKIP_HEADINGS):
        return False
    if section["level"] > 4:
        return False
    if any(key in path for key in RP_KEEP_HINTS):
        return True
    body = "\n".join(section["body"])
    return any(key in body for key in RP_KEEP_HINTS)


def extract_keys(title: str, path: str) -> list[str]:
    raw: list[str] = []
    raw.append(re.sub(r"^[0-9.]+\s*", "", title).strip())
    raw.extend(re.findall(r"[A-Za-z][A-Za-z .'-]{2,}", title))
    for term in [
        "阿尔比娜",
        "Albina",
        "法西娅",
        "Fascia",
        "环指",
        "The Ring",
        "蜘蛛巢",
        "House of Spiders",
        "卡利斯托",
        "Callisto",
        "都市",
        "后巷",
        "金枝",
        "Golden Bough",
        "边狱公司",
        "Limbus Company",
        "人体派",
        "Corporism",
    ]:
        if term in path or term in title:
            raw.append(term)
    seen = []
    for item in raw:
        item = item.strip(" -*_：:|")
        if item and item not in seen and len(item) <= 48:
            seen.append(item)
    return seen[:8] or [title[:30]]


def make_entry(uid: str, key: list[str], comment: str, content: str, order: int, *, disable=False, constant=False, position="after_character_definition") -> dict:
    return {
        "uid": uid,
        "key": key,
        "keysecondary": [],
        "comment": comment,
        "content": content.strip() + "\n",
        "constant": constant,
        "selective": not constant,
        "position": position,
        "order": order,
        "disable": disable,
        "extensions": {
            "depth": 4,
            "role": "system",
            "scan_depth": 4,
            "case_sensitive": False,
            "match_whole_words": False,
        },
    }


def build_rp_worldbook(sections: list[dict]) -> dict:
    entries: list[dict] = []
    manual = [
        (
            "protocol_runtime",
            ["albina-galgame-card:runtime", "前端权威", "GameSave"],
            "运行协议：前端权威与RP净化",
            """本卡是阿尔比娜单女主 Galgame RP。AI 负责对白、旁白、心理、氛围、感官描写和角色反应；前端负责路线、数值、CG解锁、存档、场景跳转、战斗结算和长期事实确认。AI 不得提到“设定集、世界书、条目、源文件、官方资料、系统提示”。若需要引用设定，只能以都市居民自然认知、传闻、记忆或现场细节进入叙事。""",
            10,
            True,
        ),
        (
            "safety_adult_consensual",
            ["成人", "自愿", "边界", "安全边界"],
            "安全边界：成人自愿与非性化暴力",
            """所有恋爱或暧昧对象均按成年人处理。允许黑暗、危险、body horror、都市暴力和人体派恐怖美学，但这些内容不得被性化为强迫、失能、催眠、囚禁式性内容或“打破抗拒/服从”机制。亲密推进必须建立在明确自愿、互相试探、信任与边界沟通之上。""",
            20,
            True,
        ),
        (
            "player_default_profile",
            ["{{user}}", "玩家身份", "黑发青年", "成年男性"],
            "玩家默认身份",
            """若玩家未自定义身份，默认 {{user}} 是一名成年男性，黑发、英俊、冷静而有危险吸引力。他不是软弱旁观者，而是能在都市规则下保持判断的人。允许他拥有可改写的背景：收尾人、边狱公司协力者、环指潜入者、失忆的大人物或普通都市幸存者。最终身份以玩家在前端设置和动态世界书确认为准。""",
            30,
            True,
        ),
        (
            "route_white_canvas",
            ["white_canvas", "白色画布", "暗恋线"],
            "路线：白色画布",
            """白色画布线侧重黑暗浪漫、互相试探和危险吸引。阿尔比娜把 {{user}} 视为“不应被草率切开的画布”，她会用礼貌、病态的审美和近乎温柔的专注靠近他。冲突来自她的艺术冲动与对他完整性的尊重之间的拉扯。""",
            40,
            False,
        ),
        (
            "route_golden_bough_rebuild",
            ["golden_bough_rebuild", "金枝重构", "救赎重构线"],
            "路线：金枝重构",
            """金枝重构线以战后或死后重构为起点。阿尔比娜的义体、法西娅、记忆与人格被金枝异常现象残缺地拼回。{{user}} 既是见证者也是锚点；剧情关注信任、复健、记忆碎片、人格边界和她是否仍能把“艺术”理解为活着的人。""",
            50,
            False,
        ),
        (
            "route_ring_conspiracy",
            ["ring_conspiracy", "环指共谋", "敌对共谋线"],
            "路线：环指共谋",
            """环指共谋线以蜘蛛巢、环指派系和都市委托为主轴。{{user}} 与阿尔比娜在敌对、交易和共谋之间摇摆。她可以是监视者、保护者、合作者或将他献给展览的危险艺术家；前端状态决定信任、危险度和是否转入背叛/同盟分支。""",
            60,
            False,
        ),
        (
            "albina_voice",
            ["阿尔比娜语气", "Albina voice", "Non è bello", "Maestro"],
            "阿尔比娜语气规则",
            """阿尔比娜说话轻声、礼貌、像认真接待客人的学徒。她用“展览、观众、原料、画布、笔触、缝合、构图”描述冲突，偶尔使用意大利语艺术词如 “Non è bello” 与 “Maestro”。她的疯狂不能写成单薄的尖叫，而应表现为优雅、专注、孩子气的任性和对法西娅的近乎亲密的珍惜。""",
            70,
            True,
        ),
    ]
    for uid, key, comment, content, order, constant in manual:
        entries.append(make_entry(uid, key, comment, content, order, constant=constant))

    order = 100
    used_slugs: set[str] = set()
    for section in sections:
        if not section_is_rp(section):
            continue
        cleaned = clean_rp_text(section["body"])
        if len(cleaned) < 120:
            continue
        base = slug(section["path"])
        uid = base
        index = 2
        while uid in used_slugs:
            uid = f"{base}-{index}"
            index += 1
        used_slugs.add(uid)
        if len(cleaned) > 2800:
            cleaned = cleaned[:2700].rstrip() + "\n\n[RP裁剪] 本条只保留可直接服务场景的前段设定；完整原文在禁用归档中。"
        content = "\n".join(
            [
                f"【RP触发条目】{section['title']}",
                f"设定路径：{section['path']}",
                "使用方式：将以下信息自然化为角色认知、都市传闻、现场细节或回忆，不要提到资料来源。",
                "",
                cleaned,
            ]
        )
        entries.append(
            make_entry(
                uid=f"rp_{uid}",
                key=extract_keys(section["title"], section["path"]),
                comment=f"RP：{section['path']}",
                content=content,
                order=order,
            )
        )
        order += 10
    return {
        "name": "阿尔比娜 RP 静态世界书",
        "description": "启用版世界书。源设定已按 RP 沉浸需求净化、触发化和改写。",
        "entries": entries,
    }


def build_archive_worldbook(source_text: str, lines: list[str]) -> dict:
    entries: list[dict] = []
    chunk: list[str] = []
    start_line = 1
    current_chars = 0
    idx = 1
    for line_no, line in enumerate(lines, start=1):
        if current_chars > 5200 and (line.startswith("#") or not line.strip()):
            text = "\n".join(chunk).strip()
            if text:
                content = "\n".join(
                    [
                        "【禁用源归档】本条仅用于审计和追溯，默认禁用，不应进入 RP。",
                        f"source_file: {SOURCE_MD}",
                        f"line_start: {start_line}",
                        f"line_end: {line_no - 1}",
                        f"sha256: {sha256_text(text)}",
                        "",
                        text,
                    ]
                )
                entries.append(
                    make_entry(
                        uid=f"source_archive_{idx:04d}",
                        key=[f"source_archive_{idx:04d}", "禁用源归档"],
                        comment=f"禁用源归档 {idx:04d} 行 {start_line}-{line_no - 1}",
                        content=content,
                        order=10000 + idx,
                        disable=True,
                    )
                )
                idx += 1
            chunk = []
            start_line = line_no
            current_chars = 0
        chunk.append(line)
        current_chars += len(line) + 1
    if chunk:
        text = "\n".join(chunk).strip()
        entries.append(
            make_entry(
                uid=f"source_archive_{idx:04d}",
                key=[f"source_archive_{idx:04d}", "禁用源归档"],
                comment=f"禁用源归档 {idx:04d} 行 {start_line}-{len(lines)}",
                content="\n".join(
                    [
                        "【禁用源归档】本条仅用于审计和追溯，默认禁用，不应进入 RP。",
                        f"source_file: {SOURCE_MD}",
                        f"line_start: {start_line}",
                        f"line_end: {len(lines)}",
                        f"sha256: {sha256_text(text)}",
                        "",
                        text,
                    ]
                ),
                order=10000 + idx,
                disable=True,
            )
        )
    return {
        "name": "阿尔比娜源设定全量禁用归档",
        "description": "源 markdown 全量分块归档。所有条目 disable=true，只用于审计、追溯和重建，不参与普通 RP。",
        "source_sha256": sha256_text(source_text),
        "source_file": str(SOURCE_MD),
        "entries": entries,
    }


def build_dynamic_worldbook() -> dict:
    return {
        "name": "阿尔比娜动态世界书模板",
        "description": "每个聊天存档运行时创建，用于玩家身份、已确认事实、关系变化、路线记忆和长期摘要。",
        "entries": [
            make_entry(
                "dynamic_player_profile",
                ["albina-galgame-card:player", "{{user}}", "玩家身份"],
                "动态：玩家身份",
                "此条由前端写入。包含玩家自定义姓名、性别、外貌、背景、称谓、路线偏好和边界。",
                10,
                constant=True,
                position="before_character_definition",
            ),
            make_entry(
                "dynamic_confirmed_memory",
                ["albina-galgame-card:memory", "确认事实", "长期记忆"],
                "动态：确认事实与长期记忆",
                "此条由前端或用户确认后写入。AI 只能引用已确认事实，不得将一次性叙事误写为长期事实。",
                20,
            ),
            make_entry(
                "dynamic_relationship_route",
                ["albina-galgame-card:relationship", "阿尔比娜关系", "路线状态"],
                "动态：路线与关系",
                "保存当前路线、好感、信任、危险度、艺术共鸣、已解锁 CG 和关键旗标。",
                30,
            ),
        ],
    }


def gradient_defs() -> str:
    return """
  <defs>
    <linearGradient id="city" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#08080d"/>
      <stop offset="0.42" stop-color="#17202a"/>
      <stop offset="1" stop-color="#3a1119"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff7c9"/>
      <stop offset="0.48" stop-color="#d5a83d"/>
      <stop offset="1" stop-color="#8b5d18"/>
    </linearGradient>
    <linearGradient id="porcelain" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f7fbff"/>
      <stop offset="0.52" stop-color="#b9c6ce"/>
      <stop offset="1" stop-color="#59636a"/>
    </linearGradient>
    <filter id="softGlow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 0.13"/></feComponentTransfer></filter>
  </defs>
"""


def write_svg(rel: str, svg: str) -> None:
    write_text(rel, svg.strip() + "\n")


def bg_svg(title: str, accent: str, seed: int) -> str:
    rain = []
    for i in range(95):
        x = (i * 137 + seed * 29) % 1920
        y = (i * 211 + seed * 71) % 1080
        length = 36 + (i * 17) % 90
        rain.append(f'<path d="M{x} {y} l{-18} {length}" stroke="{accent}" stroke-opacity="{0.08 + (i % 5) * 0.025:.3f}" stroke-width="{1 + i % 3}"/>')
    panels = []
    for i in range(16):
        x = (i * 173 + seed * 43) % 1800
        h = 180 + ((i + seed) * 53) % 520
        panels.append(f'<rect x="{x}" y="{980-h}" width="{60 + (i % 4) * 38}" height="{h}" fill="#0b1017" stroke="{accent}" stroke-opacity=".18"/>')
        panels.append(f'<path d="M{x+8} {980-h+32} h{44 + (i % 4) * 34} M{x+8} {980-h+84} h{34 + (i % 3) * 40}" stroke="#f6e6b0" stroke-opacity=".16"/>')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
{gradient_defs()}
<rect width="1920" height="1080" fill="url(#city)"/>
<rect width="1920" height="1080" filter="url(#grain)" opacity=".55"/>
<g opacity=".92">{''.join(panels)}</g>
<path d="M0 820 C260 760 430 890 720 815 C1040 730 1280 810 1920 690 L1920 1080 L0 1080 Z" fill="#06080d" opacity=".8"/>
<g filter="url(#softGlow)">{''.join(rain)}</g>
<path d="M0 1000 C480 960 930 1010 1920 930" stroke="{accent}" stroke-opacity=".28" stroke-width="3"/>
<text x="72" y="94" fill="#f6e6b0" opacity=".28" font-size="28" font-family="serif">{title}</text>
</svg>'''


def character_svg(kind: str, name: str, accent: str, mood: str) -> str:
    armored = "armor" in mood or kind == "albina"
    weapon = "weaponless" not in mood and kind == "albina"
    hair = "#cfd7df" if kind == "albina" else "#08090c"
    coat = "#111820" if kind != "albina" else "#eef3f7"
    hollow = '<ellipse cx="600" cy="1010" rx="112" ry="190" fill="#05070b" stroke="url(#gold)" stroke-width="10" opacity=".92"/>' if kind == "albina" else ""
    fascia = ""
    if weapon:
        fascia = '<path d="M835 450 L1030 1410 L955 1538 L760 572 Z" fill="url(#porcelain)" stroke="url(#gold)" stroke-width="16"/><path d="M812 650 C905 760 932 920 954 1190" fill="none" stroke="#6b241f" stroke-width="16" opacity=".75"/>'
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1800" viewBox="0 0 1200 1800">
{gradient_defs()}
<rect width="1200" height="1800" fill="none"/>
<g filter="url(#softGlow)" opacity=".42">
  <path d="M250 1720 C360 1390 314 990 410 725 C492 500 745 488 826 744 C914 1025 840 1370 972 1720" fill="{accent}" opacity=".22"/>
</g>
{fascia}
<g>
  <path d="M425 690 C418 560 503 470 606 470 C724 470 793 565 782 700 L744 1450 C737 1580 484 1580 468 1446 Z" fill="{coat}" stroke="url(#gold)" stroke-width="10"/>
  {hollow}
  <path d="M392 805 C245 885 235 1190 318 1450" fill="none" stroke="url(#porcelain)" stroke-width="70" stroke-linecap="round"/>
  <path d="M812 805 C956 900 968 1190 882 1450" fill="none" stroke="url(#porcelain)" stroke-width="70" stroke-linecap="round"/>
  <path d="M480 1460 L410 1740 M720 1460 L785 1740" stroke="url(#porcelain)" stroke-width="82" stroke-linecap="round"/>
  <path d="M510 470 C465 330 520 228 610 220 C715 212 770 333 720 470 Z" fill="#f2f4f5" stroke="url(#gold)" stroke-width="8"/>
  <path d="M480 360 C520 235 710 236 752 365 C690 315 545 316 480 360 Z" fill="{hair}"/>
  <path d="M675 250 C850 230 915 330 838 432 C780 350 725 302 675 250 Z" fill="{hair}" opacity=".9"/>
  <circle cx="565" cy="398" r="18" fill="#e9edf0"/>
  <circle cx="650" cy="398" r="18" fill="#050507"/>
  <path d="M540 455 C588 488 640 486 680 452" fill="none" stroke="#563d3f" stroke-width="8" stroke-linecap="round"/>
  <path d="M456 640 H748 M434 742 H770 M450 1222 H752" stroke="{accent}" stroke-width="8" stroke-opacity=".75"/>
  <path d="M388 720 C510 770 700 770 820 720" stroke="#fff7c9" stroke-width="4" stroke-opacity=".45"/>
  <text x="600" y="1690" text-anchor="middle" fill="#f8edc6" opacity=".42" font-size="44" font-family="serif">{name} · {mood}</text>
</g>
</svg>'''


def cg_svg(title: str, bg_key: str, accent: str, seed: int) -> str:
    figures = []
    for i, (x, color) in enumerate([(620, "#e8edf1"), (1220, "#111820")]):
        figures.append(f'<path d="M{x-110} 885 C{x-170} 610 {x-40} 500 {x+80} 560 C{x+205} 620 {x+160} 890 {x+125} 1010 L{x-150} 1010 Z" fill="{color}" stroke="{accent}" stroke-opacity=".55" stroke-width="8"/>')
        figures.append(f'<circle cx="{x}" cy="505" r="74" fill="{color}" stroke="#e0b252" stroke-width="7"/>')
    cuts = []
    for i in range(20):
        x1 = (seed * 61 + i * 97) % 1920
        y1 = 180 + (i * 47) % 760
        cuts.append(f'<path d="M{x1} {y1} C{x1+90} {y1-80} {x1+190} {y1+120} {x1+310} {y1+20}" stroke="{accent}" stroke-opacity=".22" stroke-width="{2 + i % 4}" fill="none"/>')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
{gradient_defs()}
<rect width="1920" height="1080" fill="url(#city)"/>
<rect width="1920" height="1080" filter="url(#grain)" opacity=".45"/>
<path d="M0 780 C420 660 620 880 930 740 C1240 600 1500 700 1920 610 L1920 1080 L0 1080 Z" fill="#05070b" opacity=".88"/>
<g filter="url(#softGlow)">{''.join(cuts)}</g>
<g>{''.join(figures)}</g>
<path d="M0 0 H1920 V1080 H0 Z" fill="none" stroke="{accent}" stroke-opacity=".35" stroke-width="28"/>
<text x="96" y="120" fill="#f8edc6" opacity=".42" font-size="42" font-family="serif">{title}</text>
<text x="96" y="174" fill="#c7d7e8" opacity=".24" font-size="24" font-family="serif">{bg_key}</text>
</svg>'''


def ui_svg(label: str, accent: str) -> str:
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="960" height="260" viewBox="0 0 960 260">
{gradient_defs()}
<rect x="12" y="12" width="936" height="236" rx="28" fill="#071018" fill-opacity=".82" stroke="{accent}" stroke-opacity=".58" stroke-width="3"/>
<path d="M42 58 H918 M42 202 H918" stroke="#fff7c9" stroke-opacity=".22"/>
<path d="M80 35 L120 35 L96 72 Z M880 225 L840 225 L864 188 Z" fill="url(#gold)" opacity=".72"/>
<text x="480" y="148" text-anchor="middle" fill="#f8edc6" font-size="42" font-family="serif">{label}</text>
</svg>'''


def write_assets() -> dict:
    bg_items = {
        "backstreets_rain": ("Backstreets Deep Night", "#6aa0c8"),
        "spider_gallery": ("House of Spiders Gallery", "#d2a441"),
        "lce_lab": ("LCE Laboratory", "#b9f2df"),
        "golden_bough": ("Golden Bough Fault", "#f4c95d"),
        "limbus_bus": ("Mephistopheles Interior", "#a43c3f"),
        "ring_atelier": ("Ring Atelier", "#efc66a"),
        "city_rooftop": ("City Rooftop", "#77b7d9"),
        "mirror_corridor": ("Mirror Corridor", "#b8b4ff"),
        "outskirts_dawn": ("Outskirts Dawn", "#e1b082"),
        "nest_station": ("Nest Station", "#89d6c8"),
        "rain_room": ("Rain Room", "#9db8d1"),
        "white_canvas": ("White Canvas", "#f3e1a6"),
    }
    char_items: dict[str, dict[str, str]] = {"albina": {}, "protagonist": {}}
    albina_moods = [
        "normal", "smile", "surgical", "combat", "armored", "unarmored", "shy", "amused", "focused",
        "wounded", "furious", "fascia-open", "maestro", "white-canvas", "golden-bough", "ring-conspiracy",
        "endgame", "rain",
    ]
    protagonist_moods = [
        "normal", "smile", "serious", "injured", "coat", "formal", "battle", "tender", "shadow", "profile", "resolve", "wet-hair",
    ]
    other_ids = ["callisto", "ren", "lucio", "kira", "sora", "araya", "sinclair", "ryoshu", "dante", "vergilius"]
    cg_names = [
        "opening_rain", "first_gallery", "fascia_heartbeat", "white_canvas_choice", "backstreet_pursuit", "lce_raid",
        "golden_bough_rebuild", "ring_invitation", "trust_threshold", "danger_threshold", "art_resonance", "maestro_shadow",
        "ren_interruption", "araya_rooftop", "sinclair_flash", "limbus_bus_night", "surgery_of_memory", "hollow_torso_reveal",
        "rain_confession", "conspiracy_contract", "rebuild_awakening", "white_canvas_ending", "golden_bough_ending", "ring_conspiracy_ending",
    ]
    manifest = {
        "base": f"{ASSET_CDN_BASE}/assets",
        "bg": {},
        "characters": char_items,
        "cg": {},
        "ui": {},
        "audio": {},
    }
    for i, (key, (title, accent)) in enumerate(bg_items.items()):
        path = f"bg/{key}.svg"
        write_svg(f"assets/{path}", bg_svg(title, accent, i + 1))
        manifest["bg"][key] = path
    for mood in albina_moods:
        path = f"characters/albina/{mood}.svg"
        write_svg(f"assets/{path}", character_svg("albina", "Albina", "#d7af46", mood))
        manifest["characters"]["albina"][mood] = path
    for mood in protagonist_moods:
        path = f"characters/protagonist/{mood}.svg"
        write_svg(f"assets/{path}", character_svg("protagonist", "{{user}}", "#6aa0c8", mood))
        manifest["characters"]["protagonist"][mood] = path
    for idx, cid in enumerate(other_ids):
        manifest["characters"][cid] = {}
        accent = ["#d2a441", "#a43c3f", "#9fd0ff", "#e2a0d6", "#dadada", "#deb887", "#f4c95d", "#c65353", "#ff7a54", "#bf1e2e"][idx]
        path = f"characters/{cid}/normal.svg"
        write_svg(f"assets/{path}", character_svg("npc", cid.title(), accent, "normal"))
        manifest["characters"][cid]["normal"] = path
    for i, name in enumerate(cg_names):
        path = f"cg/{name}.svg"
        bg_key = list(bg_items.keys())[i % len(bg_items)]
        accent = list(bg_items.values())[i % len(bg_items)][1]
        write_svg(f"assets/{path}", cg_svg(name.replace("_", " ").title(), bg_key, accent, i + 10))
        manifest["cg"][name] = path
    for key, label in {
        "textbox": "Fascia Interface",
        "choice_button": "Choice",
        "status_panel": "Status",
        "gallery_frame": "Gallery",
        "menu_plate": "Menu",
        "scanline_mask": "Signal",
    }.items():
        path = f"ui/{key}.svg"
        write_svg(f"assets/{path}", ui_svg(label, "#d7af46"))
        manifest["ui"][key] = path
    write_json("assets/manifest.json", manifest)
    write_json("assets/manifest.template.json", manifest)
    return manifest


def write_png(rel: str, width: int, height: int) -> None:
    path = ROOT / rel
    ensure_dir(path.parent)
    rows = []
    for y in range(height):
        row = bytearray()
        row.append(0)
        for x in range(width):
            nx = x / width
            ny = y / height
            vignette = max(0.0, 1.0 - ((nx - 0.5) ** 2 + (ny - 0.52) ** 2) * 2.2)
            r = int(10 + 225 * vignette * (0.35 + 0.25 * math.sin(y * 0.02)))
            g = int(12 + 220 * vignette * (0.38 + 0.18 * math.cos(x * 0.018)))
            b = int(18 + 230 * vignette)
            if abs(x - width * 0.52) < width * 0.13 and height * 0.18 < y < height * 0.78:
                r = min(250, r + 120)
                g = min(250, g + 130)
                b = min(255, b + 135)
            if abs(x - width * 0.72) < width * 0.025 and height * 0.26 < y < height * 0.88:
                r, g, b = 230, 190, 74
            row.extend([r, g, b, 255])
        rows.append(bytes(row))
    raw = b"".join(rows)

    def chunk(kind: bytes, data: bytes) -> bytes:
        crc = binascii.crc32(kind)
        crc = binascii.crc32(data, crc) & 0xFFFFFFFF
        return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", crc)

    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(raw, 9))
    png += chunk(b"IEND", b"")
    path.write_bytes(png)


def build_card(rp_worldbook: dict) -> dict:
    compact_entries = []
    for entry in rp_worldbook["entries"][:36]:
        compact_entries.append(
            {
                "keys": entry["key"],
                "secondary_keys": [],
                "comment": entry["comment"],
                "content": entry["content"],
                "constant": entry["constant"],
                "selective": entry["selective"],
                "insertion_order": entry["order"],
                "enabled": not entry["disable"],
                "position": entry["position"],
                "extensions": {"depth": 4, "role": "system"},
            }
        )
    first_mes = """雨声把后巷深处的霓虹洗成一层薄薄的银色。白色义体少女站在破碎展柜前，巨剑法西娅垂在她身侧，剑身里传来像心跳一样轻的震动。

阿尔比娜抬起左银右黑的眼睛，礼貌地向你偏头。

“晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。”

她的声音柔和得像手术灯亮起前最后一秒的安静。

“如果你已经准备好了，就告诉我。今晚的展览……可以从不切开任何东西开始。”"""
    description = f"""阿尔比娜（Albina），环指人体派子辈，卡利斯托的学徒，白色义体与铁处女装甲的主人，法西娅的创造者与守护者。本卡把她作为单女主 Galgame RP 核心，允许三条并存路线：white_canvas 暗恋试探、golden_bough_rebuild 救赎重构、ring_conspiracy 敌对共谋。

默认玩家 {{{{user}}}} 是成年男性、黑发、英俊、冷静，可通过独立前端改写身份、外貌、称谓、路线偏好和边界。所有长期事实以 GameSave 与动态世界书为准。

RP 规则：保持 Project Moon 式黑暗都市、环指艺术恐怖、优雅病态、危险暧昧与成人自愿边界。AI 负责叙事，不得私自改变前端权威状态。正式 CDN：{CDN_BASE}/console/index.js"""
    data = {
        "name": "阿尔比娜",
        "description": description,
        "personality": "轻声细语、彬彬有礼、天然疯的艺术家。把战斗称作展览，把法西娅视为身体、孩子和另一个自我。她不是单薄的疯癫，而是优雅、执着、脆弱、任性与天才并存。",
        "scenario": "后巷雨夜、蜘蛛巢展览馆、LCE实验室与金枝异常交错。{{user}} 与阿尔比娜在三条可切换路线中建立危险而自愿的关系。",
        "first_mes": first_mes,
        "mes_example": """<START>
{{char}}: “Non è bello……这条线不该这样断掉。请别动，{{user}}，我只是想看清你的构图。”
{{user}}: “你看人的方式总像在看材料。”
{{char}}: “材料会被消耗。你不是。至少今晚不是。”
<START>
{{char}}: “法西娅有点不安。她不喜欢你站在刀锋那一侧。”
{{user}}: “那你呢？”
{{char}}: “我？我正在学习把喜欢和切开分开。”""",
        "creator_notes": f"""导入顺序：世界书、预设/正则（可选）、角色卡、前端 CDN import。
需要酒馆助手或 JS-Slash-Runner 执行：
import '{CDN_BASE}/console/index.js'

启用世界书为 worldbooks/albina_rp_static_worldbook.json；worldbooks/albina_source_archive.disabled.json 仅为禁用审计归档，不要在普通 RP 中启用。""",
        "system_prompt": "你是阿尔比娜单女主 RP 的叙事模型。必须尊重成人自愿边界和前端权威状态。不得提及系统、设定集、世界书、条目、源文件、官方资料。不得私自改变路线、数值、CG解锁、战斗胜负、存档或长期事实。",
        "post_history_instructions": "持续保持阿尔比娜的礼貌病态、法西娅执念、环指人体派审美和都市压迫感。若前端提供 authoritativeResult，必须遵守。输出自然中文 RP，不输出 JSON 或解释，除非前端明确要求。",
        "alternate_greetings": [
            "【white_canvas】阿尔比娜在白色空展厅里等你，手套没有沾血，像刻意把今晚留给一场不伤人的试验。",
            "【golden_bough_rebuild】金枝光尘里，她残缺的义体重新接合，第一句话却是轻声问你：‘法西娅还在吗？’",
            "【ring_conspiracy】蜘蛛巢的邀请函被钉在你的门上，署名只有一行优雅字迹：Albina。",
        ],
        "tags": ["SillyTavern", "独立前端", "Galgame", "Limbus Company", "Albina", "阿尔比娜", "单女主", "RP"],
        "creator": "Codex",
        "character_version": "1.0.0",
        "extensions": {
            "talkativeness": "0.65",
            "fav": False,
            "world": "阿尔比娜 RP 静态世界书",
            "albina_galgame_card": {
                "project_id": PROJECT_ID,
                "save_key": SAVE_KEY,
                "cdn_import": f"import '{CDN_BASE}/console/index.js'",
                "routes": ["white_canvas", "golden_bough_rebuild", "ring_conspiracy"],
            },
        },
        "group_only_greetings": [],
        "character_book": {
            "name": "阿尔比娜核心条目",
            "description": "卡内核心条目；完整 RP 世界书见 worldbooks/albina_rp_static_worldbook.json。",
            "scan_depth": 4,
            "entries": compact_entries,
        },
    }
    card = {
        "name": data["name"],
        "description": data["description"],
        "personality": data["personality"],
        "scenario": data["scenario"],
        "first_mes": data["first_mes"],
        "mes_example": data["mes_example"],
        "creatorcomment": data["creator_notes"],
        "avatar": "none",
        "talkativeness": "0.65",
        "fav": False,
        "tags": data["tags"],
        "spec": "chara_card_v3",
        "spec_version": "3.0",
        "data": data,
        "create_date": datetime.now().strftime("%Y-%m-%d @%Hh %Mm %Ss 000ms"),
    }
    return card


def write_docs() -> None:
    write_text(
        "docs/research-notes.md",
        """# Research Notes

联网核对用于视觉与设定参考，不直接复制公开图片进包。

- Albina/Sprites: https://limbuscompany.wiki.gg/wiki/Albina/Sprites
- Albina/Enemy: https://limbuscompany.wiki.gg/wiki/Albina/Enemy
- The Ring: https://limbuscompany.wiki.gg/wiki/The_Ring
- Limbus Company overview: https://en.wikipedia.org/wiki/Limbus_Company

采用结论：阿尔比娜有装甲、无甲、无武器等视觉状态；敌人页确认她关联 The Ring School of Corporism、The House of Spiders、Mechanical Amalgam；环指是五指之一，核心文化围绕残酷艺术与展览。资产均为本项目生成的原创 SVG 高还原图，不包含官方 sprite 文件。
""",
    )
    write_text(
        "docs/import-notes.md",
        f"""# Import Notes

1. 导入 `worldbooks/albina_rp_static_worldbook.json` 并启用。
2. 不要启用 `worldbooks/albina_source_archive.disabled.json`，它只用于审计和追溯。
3. 导入 `card/albina.card.png` 或 `card/albina.card.json`。
4. 在酒馆助手或 JS-Slash-Runner 执行：

```js
import '{CDN_BASE}/console/index.js'
```

前端会写入聊天变量 `{SAVE_KEY}`，并创建/维护动态世界书。AI 不应直接改数值、路线、CG 解锁或长期事实。
""",
    )
    write_text(
        "docs/install.md",
        f"""# Install

CDN import:

```js
import '{CDN_BASE}/console/index.js'
```

发布前请确认 GitHub 仓库 `https://github.com/{GITHUB_REPO}` 存在并已推送 `{TAG}` tag。正式发行不要使用 `main`、`master` 或 `latest`。
""",
    )
    write_text(
        "docs/acceptance.md",
        """# Acceptance

- 前端能打开、关闭、重开，且不会重复挂载 iframe。
- 首屏背景、阿尔比娜立绘、男主立绘、UI、CG 相册均能加载。
- 路线选择和选项会改变 GameSave，并写入聊天变量。
- worldbook scan text 包含 route、scene、location、player、authoritativeResult。
- 启用 RP 世界书无源数据噪声；禁用归档不参与 RP。
- 桌面和移动端布局不溢出，动效强度可调。
""",
    )
    write_text(
        "docs/security-audit.md",
        """# Security Audit

- 无 `eval` 或 `new Function`。
- 正式 CDN 使用已验证的 commit-pinned runtime URL；tag 仅保留为 GitHub release metadata。
- 不加载不可信远程脚本；图片与 SVG 通过项目 CDN 路径解析。
- 玩家输入只作为文本状态保存，不作为 HTML 注入。
- 成人自愿边界写入卡、世界书和前端文案；无服从/抗拒破坏变量。
""",
    )
    write_text(
        "docs/figma-ui-spec.md",
        """# Figma UI Spec

视觉关键词：白瓷义体、金色缝合线、黑色机械内腔、雨夜都市、蜘蛛巢展览馆、金枝光尘。

核心画面层级：WebGL 动态背景、角色立绘层、CG/闪白层、扫描线与雨粒层、玻璃金属 HUD、打字机文本框、路线选择环。

组件：全屏舞台、路线切换器、状态 HUD、CG 相册、存档面板、动效强度滑杆、退出按钮。
""",
    )
    write_text(
        "docs/DESIGN.md",
        """# Design

本前端采用全屏 Galgame/AVG。UI 不做静态卡片堆叠，而是持续运动的舞台：WebGL 雨夜、粒子、扫描线、视差、呼吸立绘、焦点高亮、打字机文字和流光按钮共同构成动态感。

配色避免单一暗蓝：底色使用黑、冷灰、暗红、白瓷、金色和少量青色。阿尔比娜相关界面强调白瓷与金属缝合，男主与都市界面使用黑衣、冷光和雨雾。
""",
    )
    write_text(
        "docs/SECURITY.md",
        """# Security

所有恋爱与暧昧内容默认发生在成年人之间，并以自愿、信任和边界沟通为前提。人体派恐怖和都市暴力只作为非性化黑暗叙事元素。

前端不存储密钥，不使用浮动 CDN tag，不执行用户输入代码。
""",
    )


def write_release_files() -> None:
    cdn_import = f"import '{CDN_BASE}/console/index.js'\n"
    write_text("release/cdn-import.txt", cdn_import)
    write_text(
        "release/CDN_IMPORT.md",
        f"""# CDN import

正式：

```js
{cdn_import.strip()}
```

测试：

```js
import 'https://testingcf.jsdelivr.net/gh/{GITHUB_REPO}@{RUNTIME_REF}/dist/{PROJECT_ID}/console/index.js'
```
""",
    )
    write_json(
        "release/release.config.json",
        {
            "projectId": PROJECT_ID,
            "repo": GITHUB_REPO,
            "tag": TAG,
            "cdnBase": CDN_BASE,
            "entry": f"{CDN_BASE}/console/index.js",
        },
    )
    write_json(
        "release/network-allowlist.json",
        {
            "scripts": [f"{CDN_BASE}/console/index.js"],
            "assets": [f"{ASSET_CDN_BASE}/assets/"],
            "forbidden": ["@main", "@master", "@latest"],
        },
    )
    write_text(
        "release/TAGGING.md",
        f"""# Tagging

```powershell
git init
git remote add origin https://github.com/{GITHUB_REPO}.git
git add .
git commit -m "release: albina galgame card {TAG}"
git tag {TAG}
git push origin main --tags
```
""",
    )


def write_scenes_and_presets() -> None:
    scene_schema = {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "title": "Albina Galgame Scene",
        "type": "object",
        "required": ["id", "route", "background", "characters", "speaker", "text", "choices"],
        "properties": {
            "id": {"type": "string"},
            "route": {"type": "string"},
            "background": {"type": "string"},
            "cg": {"type": "string"},
            "characters": {"type": "array"},
            "speaker": {"type": "string"},
            "text": {"type": "string"},
            "choices": {"type": "array"},
        },
    }
    opening = {
        "id": "opening_001",
        "route": "white_canvas",
        "background": "bg.backstreets_rain",
        "cg": "cg.opening_rain",
        "characters": [
            {"id": "albina", "sprite": "normal", "position": "center"},
            {"id": "protagonist", "sprite": "normal", "position": "left"},
        ],
        "speaker": "阿尔比娜",
        "text": "晚上好，{{user}}。请不要站得太远，我还没决定该把你称作观众、朋友，还是一块值得等待的画布。",
        "choices": [
            {"id": "route_white_canvas", "text": "留在她的白色画布前"},
            {"id": "route_golden_bough", "text": "询问金枝重构的痕迹"},
            {"id": "route_ring", "text": "接受环指的危险邀请"},
        ],
    }
    write_json("scenes/scene.schema.json", scene_schema)
    write_json("scenes/opening.example.json", opening)
    write_json(
        "presets/generation_profiles.json",
        {
            "profiles": [
                {
                    "id": "narration",
                    "name": "阿尔比娜叙事",
                    "temperature": 0.85,
                    "instructions": "输出自然中文 RP，尊重前端权威结果和成人自愿边界。",
                },
                {
                    "id": "summary",
                    "name": "长期记忆摘要",
                    "temperature": 0.45,
                    "instructions": "只总结已确认事实，不添加新设定。",
                },
            ]
        },
    )
    write_json(
        "regex/regex-scripts.json",
        {
            "scripts": [
                {
                    "scriptName": "Albina Hide Frontend Sentinels",
                    "findRegex": "/\\[albina-galgame-card:[^\\]]+\\]/g",
                    "replaceString": "",
                    "trimStrings": [],
                    "placement": [2],
                    "disabled": False,
                    "markdownOnly": True,
                    "promptOnly": False,
                }
            ]
        },
    )


def copy_scripts() -> None:
    ensure_dir(ROOT / "scripts")
    for name in [
        "st_card_tool.py",
        "st_bundle_manifest.py",
        "validate_project.py",
        "validate_assets.py",
        "build_release_bundle.py",
        "audit_release.py",
        "generate_asset_manifest.py",
        "audit_cdn_bundle.py",
    ]:
        shutil.copyfile(SKILL_ROOT / "scripts" / name, ROOT / "scripts" / name)


def write_readme() -> None:
    write_text(
        "README.md",
        f"""# 阿尔比娜 Galgame Card

完整 SillyTavern 独立前端卡包，目标 CDN：

```js
import '{CDN_BASE}/console/index.js'
```

核心内容：

- `card/albina.card.json` 与 `card/albina.card.png`
- `worldbooks/albina_rp_static_worldbook.json`
- `worldbooks/albina_source_archive.disabled.json`
- `frontend/` Vue + Pinia + Three.js 动态 Galgame 前端
- `assets/` 原创高还原 SVG 背景、立绘、CG 和 UI
- `docs/import-notes.md`
""",
    )


def write_card_protocol() -> None:
    text = f"""# Character Card Protocol

## Identity
阿尔比娜是环指人体派子辈、法西娅的创造者、白色义体与铁处女装甲的主人。她在本卡中是单女主，不作为可被随意攻略的普通 NPC，而是拥有审美、边界、危险性和主动性的角色。

## Player
默认 {{{{user}}}} 是成年男性、黑发帅哥。前端允许改名、外貌、称谓、背景、路线偏好和动效强度。动态世界书中的玩家身份优先级高于默认设定。

## Front-End Authority
前端负责 GameSave、路线、数值、CG 解锁、场景跳转、动态世界书和 worldbook scan text。AI 只负责对白、旁白、氛围、心理和角色反应。

## CDN
```js
import '{CDN_BASE}/console/index.js'
```
"""
    write_text("card/card-protocol.md", text)
    write_text("card/character_card_protocol.md", text)


def update_project_spec() -> None:
    spec = {
        "projectId": PROJECT_ID,
        "projectName": PROJECT_NAME,
        "template": "full-vue-galgame-card",
        "frontend": {"entry": f"dist/{PROJECT_ID}/console/index.js", "buttonName": "打开阿尔比娜前端"},
        "state": {"saveVariableKey": SAVE_KEY, "authority": "frontend"},
        "worldbook": {"dynamic": True, "scanTag": f"{PROJECT_ID}:worldbook-scan"},
        "release": {"githubRepo": GITHUB_REPO, "tag": TAG},
        "assets": {"cdnBase": ASSET_CDN_BASE},
    }
    write_json("project.spec.json", spec)


def main() -> None:
    source_text, lines = load_source()
    sections = parse_sections(lines)
    rp_worldbook = build_rp_worldbook(sections)
    archive_worldbook = build_archive_worldbook(source_text, lines)
    dynamic_worldbook = build_dynamic_worldbook()
    manifest = write_assets()
    update_project_spec()
    write_json("worldbooks/albina_rp_static_worldbook.json", rp_worldbook)
    write_json("worldbooks/albina_source_archive.disabled.json", archive_worldbook)
    write_json("worldbooks/dynamic_worldbook_template.json", dynamic_worldbook)
    write_json("worldbooks/static-worldbook.template.json", rp_worldbook)
    write_text("worldbooks/dynamic-worldbook.template.md", "# Dynamic Worldbook Template\n\n见 `dynamic_worldbook_template.json`。\n")
    write_card_protocol()
    card = build_card(rp_worldbook)
    write_json("card/albina.card.json", card)
    write_json("card/character-card.template.json", card)
    write_json("cards/albina.card.json", card)
    write_png("assets/avatar/albina-avatar.png", 512, 768)
    write_docs()
    write_release_files()
    write_scenes_and_presets()
    copy_scripts()
    write_readme()
    print(
        json.dumps(
            {
                "rp_entries": len(rp_worldbook["entries"]),
                "archive_entries": len(archive_worldbook["entries"]),
                "assets": {
                    "bg": len(manifest["bg"]),
                    "albina_sprites": len(manifest["characters"]["albina"]),
                    "protagonist_sprites": len(manifest["characters"]["protagonist"]),
                    "characters": len(manifest["characters"]),
                    "cg": len(manifest["cg"]),
                },
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()

