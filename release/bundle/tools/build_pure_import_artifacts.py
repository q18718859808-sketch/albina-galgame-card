from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path
from typing import Any


SOURCE_META_KEYS = {
    "source",
    "sources",
    "source_ref",
    "source_refs",
    "source_title",
    "source_url",
    "revision",
    "revision_id",
    "verified_at",
    "evidence_kind",
    "claim_status",
    "copyright_mode",
    "review_status",
    "rp_scope",
    "metadata",
}

DROP_LINE_PREFIXES = (
    "【RP触发条目】",
    "设定路径：",
    "使用方式：",
)

REPLACEMENTS = (
    ("AI 不得提到“设定集、世界书、条目、源文件、官方资料、系统提示”。若需要引用设定，只能以都市居民自然认知、传闻、记忆或现场细节进入叙事。", "AI 叙事必须保持沉浸，不把幕后台词、规则说明、文件名或工具名说给玩家。若需要引入背景，只能以都市居民自然认知、传闻、记忆或现场细节进入叙事。"),
    ("不得提及系统、设定集、世界书、条目、源文件、官方资料。", "叙事保持沉浸，不把幕后台词、规则说明、文件名或工具名说给玩家。"),
    ("设定集、世界书、条目、源文件、官方资料、系统提示", "幕后台词、规则说明、文件名或工具名"),
    ("设定集、世界书、条目、源文件、官方资料", "幕后台词、规则说明、文件名或工具名"),
    ("不要提到资料来源", "保持沉浸表达"),
    ("使用方式", "叙事用途"),
    ("资料来源", "取材背景"),
    ("源文件", "外部文件"),
    ("官方资料", "外部称谓"),
    ("系统提示", "规则说明"),
    ("设定集", "背景信息"),
    ("世界书", "背景包"),
    ("条目", "内容"),
    ("来源", "取材"),
    ("页面元数据标示", "正史锚点显示"),
    ("页面元数据", "正史锚点"),
    ("审计", "校验"),
    ("追溯", "回溯"),
    ("归档", "保存"),
    ("source-backed", "hand-written"),
    ("Source-Backed", "Hand-Written"),
    ("source checked enemy", "enemy ecology"),
    ("Worldbook", "Lore Pack"),
    ("worldbook", "lore pack"),
    ("wiki page metadata", "canon anchor data"),
    ("wiki metadata", "canon anchor data"),
    ("wiki", "canon index"),
)

# Safe for generated JS/Markdown/package manifests: only replaces user-facing
# source-provenance terms, and deliberately avoids generic code identifiers
# such as "source", "metadata", or "worldbook".
IMPORT_TEXT_REPLACEMENTS = (
    ("\u8d44\u6599\u6765\u6e90", "\u53d6\u6750\u80cc\u666f"),
    ("\u6e90\u6587\u4ef6", "\u5916\u90e8\u6587\u4ef6"),
    ("\u5b98\u65b9\u8d44\u6599", "\u80cc\u666f\u4f20\u95fb"),
    ("\u6765\u6e90", "\u53d6\u6750"),
    ("\u5ba1\u8ba1", "\u6821\u9a8c"),
    ("\u5236\u5361", "\u5236\u4f5c"),
    ("\u8ffd\u6eaf", "\u56de\u6eaf"),
    ("\u9875\u9762\u5143\u6570\u636e\u6807\u793a", "\u6b63\u53f2\u951a\u70b9\u663e\u793a"),
    ("\u9875\u9762\u5143\u6570\u636e", "\u6b63\u53f2\u951a\u70b9"),
    ("source_refs", "anchor_refs"),
    ("source_title", "anchor_title"),
    ("source_url", "anchor_url"),
    ("verified_at", "checked_at"),
    ("evidence_kind", "anchor_kind"),
    ("claim_status", "anchor_status"),
    ("copyright_mode", "text_mode"),
    ("review_status", "check_status"),
    ("source-backed", "hand-written"),
    ("Source-Backed", "Hand-Written"),
    ("source checked", "checked"),
    ("wiki page metadata", "canon anchor data"),
    ("wiki metadata", "canon anchor data"),
    ("Wiki", "Canon Index"),
    ("wiki", "canon index"),
)

IMPORT_TEXT_SUFFIXES = {
    ".json",
    ".md",
    ".txt",
    ".html",
    ".css",
    ".js",
    ".mjs",
    ".cjs",
    ".yaml",
    ".yml",
    ".toml",
}

WORLD_BOOK_OUTPUTS = {
    "albina_rp_static_worldbook.json": (
        "albina_rp_static_worldbook.pure.json",
        "阿尔比娜 RP 静态背景包",
        "沉浸式 RP 背景、路线与场景触发内容。",
    ),
    "albina_verified_seed_worldbook.json": (
        "albina_verified_seed_worldbook.pure.json",
        "阿尔比娜核心补充",
        "沉浸式核心背景补充。",
    ),
    "albina_p0_core_worldbook.json": (
        "albina_p0_core_worldbook.pure.json",
        "阿尔比娜 P0 核心背景",
        "阿尔比娜身份、关系、战斗和分支边界。",
    ),
    "albina_p1_limbus_core_worldbook.json": (
        "albina_p1_limbus_core_worldbook.pure.json",
        "边狱公司 P1 核心背景",
        "都市、边狱公司、罪人与环指相关背景。",
    ),
    "albina_p1_sinner_voice_worldbook.json": (
        "albina_p1_sinner_voice_worldbook.pure.json",
        "罪人语气校准",
        "边狱公司罪人的 RP 语气与互动边界。",
    ),
    "albina_p1_canto_ix_scene_worldbook.json": (
        "albina_p1_canto_ix_scene_worldbook.pure.json",
        "第九章场景结构补充",
        "第九章展览馆、战斗压力与相关角色场景边界。",
    ),
    "albina_p2_canto_backbone_worldbook.json": (
        "albina_p2_canto_backbone_worldbook.pure.json",
        "主线章节骨架补充",
        "Canto I-VIII 主线氛围、场景推进与阿尔比娜线可用压力结构。",
    ),
    "albina_p2_enemy_ecology_worldbook.json": (
        "albina_p2_enemy_ecology_worldbook.pure.json",
        "阿尔比娜 P2 敌对生态补充",
        "面向沉浸式 RP 导入的敌人、异想体与战斗氛围补充包。",
    ),
    "albina_p2_identity_association_worldbook.json": (
        "albina_p2_identity_association_worldbook.pure.json",
        "都市身份与组织压力补充",
        "命名敌人、助战单位、协会、帮派与家族势力的沉浸式 RP 补充包。",
    ),
    "albina_p2_event_support_worldbook.json": (
        "albina_p2_event_support_worldbook.pure.json",
        "事件与助战场景补充",
        "支线事件、主题场域和助战角色的沉浸式 RP 补充包。",
    ),
    "albina_p2_urban_factions_worldbook.json": (
        "albina_p2_urban_factions_worldbook.pure.json",
        "都市协会与帮派生态补充",
        "Fixer、协会、事务所、帮派和 Fingers 秩序的沉浸式 RP 补充包。",
    ),
    "albina_p3_bloodfiend_abnormality_worldbook.json": (
        "albina_p3_bloodfiend_abnormality_worldbook.pure.json",
        "血族与异想体生态补充",
        "血族、血袋、游行眷属和异想体遭遇的沉浸式 RP 补充包。",
    ),
    "albina_p3_ego_sin_worldbook.json": (
        "albina_p3_ego_sin_worldbook.pure.json",
        "E.G.O 与罪属性演出补充",
        "E.G.O、罪属性共鸣和战斗状态的沉浸式 RP 补充包。",
    ),
    "albina_p3_ego_abnormality_anchors_worldbook.json": (
        "albina_p3_ego_abnormality_anchors_worldbook.pure.json",
        "E.G.O 与异常锚点补充",
        "E.G.O 演出、异常遭遇、章节音乐和战斗情绪的沉浸式 RP 补充包。",
    ),
    "albina_p2_named_character_ecology_worldbook.json": (
        "albina_p2_named_character_ecology_worldbook.pure.json",
        "命名角色视觉生态补充",
        "命名角色、助战人物和敌对人物的视觉连续性与场面识别补充包。",
    ),
    "albina_p2_theme_atmosphere_worldbook.json": (
        "albina_p2_theme_atmosphere_worldbook.pure.json",
        "主题氛围场景补充",
        "主题场域、危险情绪、探索节奏和阿尔比娜审美反应补充包。",
    ),
    "albina_p2_ego_identities_worldbook.json": (
        "albina_p2_ego_identities_worldbook.pure.json",
        "E.G.O 身份演出补充",
        "E.G.O 身份、身份故事和语气边界的沉浸式 RP 补充包。",
    ),
    "albina_p3_combat_mechanics_worldbook.json": (
        "albina_p3_combat_mechanics_worldbook.pure.json",
        "战斗机制叙事补充",
        "战斗资源、攻防语义、播报声线和特殊层级场景的沉浸式 RP 补充包。",
    ),
    "albina_p2_intervallo_story_worldbook.json": (
        "albina_p2_intervallo_story_worldbook.pure.json",
        "支线章节骨架补充",
        "Prologue、Intervallo 和联动剧情的沉浸式场景骨架补充包。",
    ),
    "albina_p4_article_reviewed_identity_worldbook.json": (
        "albina_p4_article_reviewed_identity_worldbook.pure.json",
        "身份故事深写补充",
        "高影响身份故事、组织压力与路线反应的沉浸式 RP 补充包。",
    ),
    "albina_p4_manifest_bridge_worldbook.json": (
        "albina_p4_manifest_bridge_worldbook.pure.json",
        "Albina Full Canon Bridge Pack",
        "Broad route support entries for remaining canon-index terms.",
    ),
}

PURE_CREATOR_NOTE = (
    "阿尔比娜单女主 Galgame RP。酒馆助手脚本会载入独立前端；"
    "导入时启用随包提供的纯净背景包。"
)

PURE_SYSTEM_PROMPT = (
    "你是阿尔比娜单女主 RP 的叙事模型。必须尊重成人自愿边界和前端权威状态。"
    "叙事保持沉浸，不把幕后台词、规则说明、文件名或工具名说给玩家。"
    "不得私自改变路线、数值、CG解锁、战斗胜负、存档或长期事实。"
)


def sanitize_text(value: str) -> str:
    lines: list[str] = []
    for raw_line in value.replace("\r\n", "\n").replace("\r", "\n").split("\n"):
        stripped = raw_line.strip()
        if any(stripped.startswith(prefix) for prefix in DROP_LINE_PREFIXES):
            continue
        lines.append(raw_line)
    text = "\n".join(lines)
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    while "\n\n\n" in text:
        text = text.replace("\n\n\n", "\n\n")
    return text.strip() + ("\n" if value.endswith("\n") and text.strip() else "")


def strip_source_metadata(value: Any) -> Any:
    if isinstance(value, dict):
        cleaned: dict[str, Any] = {}
        for key, item in value.items():
            if key in SOURCE_META_KEYS:
                continue
            cleaned[key] = strip_source_metadata(item)
        return cleaned
    if isinstance(value, list):
        return [strip_source_metadata(item) for item in value]
    if isinstance(value, str):
        return sanitize_text(value)
    return value


def strip_import_metadata(value: Any) -> Any:
    if isinstance(value, dict):
        cleaned: dict[str, Any] = {}
        for key, item in value.items():
            if key in SOURCE_META_KEYS:
                continue
            cleaned[key] = strip_import_metadata(item)
        return cleaned
    if isinstance(value, list):
        return [strip_import_metadata(item) for item in value]
    if isinstance(value, str):
        return sanitize_import_text(value)
    return value


def sanitize_import_text(value: str) -> str:
    text = value
    for old, new in IMPORT_TEXT_REPLACEMENTS:
        text = text.replace(old, new)
    return text


def sanitize_import_text_file(path: Path) -> bool:
    if path.suffix.lower() not in IMPORT_TEXT_SUFFIXES:
        return False
    if path.suffix.lower() == ".json":
        try:
            original = path.read_text(encoding="utf-8")
            data = json.loads(original)
            stripped = strip_import_metadata(data)
            cleaned = json.dumps(stripped, ensure_ascii=False, indent=2) + "\n"
            cleaned = sanitize_import_text(cleaned)
        except (UnicodeDecodeError, json.JSONDecodeError):
            return False
    else:
        try:
            original = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            return False
        cleaned = sanitize_import_text(original)
    if cleaned == original:
        return False
    path.write_text(cleaned, encoding="utf-8")
    return True


def sanitize_import_text_tree(root: Path) -> list[str]:
    changed: list[str] = []
    for base in (
        root / "dist",
        root / "release" / "pure-import",
    ):
        if not base.exists():
            continue
        for path in sorted(base.rglob("*")):
            if path.is_file() and sanitize_import_text_file(path):
                changed.append(str(path.relative_to(root)))
    return changed


def normalize_worldbook(data: dict[str, Any], name: str, description: str) -> dict[str, Any]:
    pure = strip_source_metadata(data)
    pure["name"] = name
    pure["description"] = description
    entries = pure.get("entries")
    if isinstance(entries, list):
        for entry in entries:
            if not isinstance(entry, dict):
                continue
            extensions = entry.get("extensions")
            if isinstance(extensions, dict) and not extensions:
                entry.pop("extensions", None)
    return pure


def normalize_card(data: dict[str, Any]) -> dict[str, Any]:
    pure = strip_source_metadata(data)
    pure["creatorcomment"] = PURE_CREATOR_NOTE
    pure_data = pure.get("data")
    if isinstance(pure_data, dict):
        pure_data["creator_notes"] = PURE_CREATOR_NOTE
        pure_data["system_prompt"] = PURE_SYSTEM_PROMPT
        extensions = pure_data.get("extensions")
        if isinstance(extensions, dict):
            extensions["world"] = "阿尔比娜 RP 静态背景包"
        book = pure_data.get("character_book")
        if isinstance(book, dict):
            book["name"] = "阿尔比娜核心内容"
            book["description"] = "卡内核心内容；完整背景包随项目提供。"
    return pure


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def build(root: Path) -> dict[str, Any]:
    worldbook_dir = root / "worldbooks"
    pure_dir = worldbook_dir / "pure"
    pure_dir.mkdir(parents=True, exist_ok=True)

    outputs: list[str] = []
    for source_name, (out_name, name, description) in WORLD_BOOK_OUTPUTS.items():
        source_path = worldbook_dir / source_name
        if not source_path.exists():
            continue
        data = json.loads(source_path.read_text(encoding="utf-8"))
        pure = normalize_worldbook(data, name, description)
        out_path = pure_dir / out_name
        write_json(out_path, pure)
        outputs.append(str(out_path.relative_to(root)))

    sanitized_text_files = sanitize_import_text_tree(root)
    return {"pure_outputs": outputs, "sanitized_text_files": sanitized_text_files}


def main() -> int:
    parser = argparse.ArgumentParser(description="Build pure SillyTavern import artifacts without source/audit metadata.")
    parser.add_argument("--root", default=".", help="Project root.")
    args = parser.parse_args()
    root = Path(args.root).resolve()
    report = build(root)
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
