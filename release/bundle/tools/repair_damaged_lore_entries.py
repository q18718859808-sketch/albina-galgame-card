from __future__ import annotations

import json
from pathlib import Path
from typing import Any


REPAIRS: dict[str, dict[str, dict[str, Any]]] = {
    "worldbooks/albina_verified_seed_worldbook.json": {
        "verified_albina_visual_sprites": {
            "key": ["Albina visual", "阿尔比娜视觉", "white prosthetic body", "Fascia", "铁处女装甲"],
            "keysecondary": ["Albina/Sprites", "Albina", "Fascia"],
            "comment": "Verified seed：阿尔比娜视觉锚点",
            "content": "阿尔比娜的视觉核心是白色义体、金色装饰、铁处女式装甲和名为法西娅的活体巨剑。她不应被写成普通机械少女：她的身体展示更接近环指人体派的作品陈列，线缆、骨架、筋膜、装甲缝合线和礼貌姿态共同构成美感。RP 描写她时，应把白、金、外科器械、展览灯光和活体武器的心跳结合起来，让玩家感到她既像创作者，也像把自己做成作品的人。",
        },
        "verified_spider_encounter_cast": {
            "key": ["House of Spiders cast", "蜘蛛巢成员", "Araya", "Ren", "Kira", "Albina"],
            "keysecondary": ["The House of Spiders", "The Ring", "Canto IX"],
            "comment": "Verified seed：蜘蛛巢出场关系",
            "content": "蜘蛛巢相关 RP 不应只剩阿尔比娜一个人。Araya、Ren、Kira 与阿尔比娜共同构成第九章的组织压力：同门之间有秩序、分工、审美和互相约束，也有各自任性的偏移。阿尔比娜的单女主线可以聚焦她与玩家，但场景背景要保留蜘蛛巢的整体存在感，让谈判、逃脱、战斗和重构路线都带着环指组织网络的重量。",
        },
        "verified_limbus_company_bus_frame": {
            "key": ["Limbus Company frame", "边狱公司框架", "Dante", "Vergilius", "Charon", "Mephistopheles"],
            "keysecondary": ["LCB", "bus crew", "The City"],
            "comment": "Verified seed：边狱巴士框架",
            "content": "边狱公司一侧是阿尔比娜 RP 的外部压力源。Dante 是现场记录与指挥的核心，Vergilius 提供压迫性的监督边界，Charon 与 Mephistopheles 让巴士行动保持移动基地的结构。玩家若站在巴士一侧，不能随意越过团队目标、契约和撤离路线；玩家若偏向阿尔比娜，也应感到自己正在背离一个有组织、有记录、有后果的行动框架。",
        },
        "verified_lcb_sinners_baseline": {
            "key": ["LCB Sinners baseline", "十二罪人基线", "bus crew", "team voices"],
            "keysecondary": ["Yi Sang", "Faust", "Ryōshū", "Sinclair"],
            "comment": "Verified seed：十二罪人基础定位",
            "content": "十二罪人不应被写成同一种旁观群众。Yi Sang 偏向抽象观察，Faust 偏向冷静解析，Don Quixote 容易把危险误读为英雄式舞台，Ryōshū 会以艺术与切割判断场面，Meursault 保持执行感，Hong Lu 保持轻盈却尖锐的社交观察，Heathcliff、Ishmael、Rodion、Gregor、Sinclair、Outis 各自提供不同程度的冲动、警惕、调侃、创伤反应与战术判断。",
        },
        "verified_ego_abnormality_frame": {
            "key": ["E.G.O frame", "异想体框架", "Abnormalities", "corrosion", "psychic risk"],
            "keysecondary": ["E.G.O", "The City", "Limbus Company"],
            "comment": "Verified seed：E.G.O 与异想体风险",
            "content": "E.G.O 与异想体相关内容在本卡中用于处理心理风险和都市异常，而不是当作普通魔法。角色使用或接近这类力量时，应伴随认知、情绪、污染、腐蚀或失控边界。阿尔比娜的法西娅和人体派艺术不等同于 E.G.O，但两者都能在 RP 中形成身体、意识与作品边界被撕开的压迫感。AI 不应自行宣布 E.G.O 成功觉醒或腐蚀结算，除非前端或玩家确认。",
        },
        "verified_associations_fixers_frame": {
            "key": ["Associations frame", "收尾人协会", "Fixers", "The City", "contracts"],
            "keysecondary": ["Associations", "Backstreets", "The City"],
            "comment": "Verified seed：协会与收尾人框架",
            "content": "协会、收尾人和委托机制是都市日常暴力的专业外壳。RP 中出现追踪、护送、清理、暗杀、保全或调查时，应让合同、评级、保密、报酬和区域规则影响角色选择。玩家可以拥有收尾人或协力者背景，但这种身份带来的不是无条件强权，而是更复杂的责任、程序、同行目光和被利用风险。",
        },
        "verified_yi_sang_faust_priority_context": {
            "key": ["Yi Sang Faust context", "异想解析", "镜技术", "理性观察"],
            "keysecondary": ["Yi Sang", "Faust", "Dante", "Limbus Company"],
            "comment": "Verified seed：Yi Sang 与 Faust 优先上下文",
            "content": "Yi Sang 与 Faust 在阿尔比娜线中适合承担解析和边界提示。Yi Sang 可用疏离、诗性和镜像感理解阿尔比娜把自身制成作品的行为；Faust 则用更冷的结构化判断提醒玩家哪些现象属于异常、哪些属于组织行为、哪些只是阿尔比娜个人执念。两人都不应抢走单女主焦点，但应在关键时刻让玩家意识到这段关系有真实风险。",
        },
    },
    "worldbooks/albina_p1_limbus_core_worldbook.json": {
        "p1_limbus_company_departments_contracts": {
            "key": ["Limbus Company", "边狱公司", "LCA", "LCB", "LCC", "LCD", "LCE", "contract"],
            "keysecondary": ["Dante", "Vergilius", "Charon", "Mephistopheles"],
            "comment": "P1：边狱公司部门与契约压力",
            "content": "边狱公司在 RP 中应被写成有部门、有契约、有行动边界的组织，而不是单纯载着罪人的冒险队。LCA、LCB、LCC、LCD、LCE 等分支可以作为任务分工、情报、战斗、后勤和实验背景进入叙事。Dante 的现场判断、Vergilius 的监督、Charon 的驾驶与巴士行动共同限制玩家选择。若玩家试图带走阿尔比娜或隐瞒她的存在，必须处理记录、撤离、团队怀疑和组织后果。",
        },
        "p1_dante_manager_authority_clock_boundary": {
            "key": ["Dante", "但丁", "Executive Manager", "clock head", "复活"],
            "keysecondary": ["Limbus Company", "LCB Sinner", "Vergilius"],
            "comment": "P1：Dante 管理权与钟表边界",
            "content": "Dante 是巴士行动的管理者和记录者，拥有特殊复活能力带来的战术地位，但不应被写成全知旁白或万能许可。Dante 可以观察阿尔比娜、记录异常、在罪人之间调停，也可以对玩家与阿尔比娜的接近保持警惕。涉及死亡、复活、战败和路线分歧时，AI 必须让前端或玩家决定结果；Dante 只提供角色内的判断与压力。",
        },
        "p1_vergilius_charon_bus_authority": {
            "key": ["Vergilius", "Charon", "Mephistopheles", "维吉利乌斯", "卡戎", "巴士"],
            "keysecondary": ["Dante", "Limbus Company", "LCB Sinner"],
            "comment": "P1：Vergilius 与 Charon 的巴士权威",
            "content": "Vergilius 与 Charon 代表巴士行动的硬边界。Vergilius 不需要频繁出手，只要存在就能让谈判和背叛变得危险；Charon 与 Mephistopheles 则保证行动有移动基地、撤离路线和路线调度。RP 中若玩家想把阿尔比娜藏上车、私下交易或改写任务目标，必须考虑这两人的存在，而不是把巴士当成玩家私人据点。",
        },
        "p1_city_backstreets_social_physics": {
            "key": ["The City", "Backstreets", "都市", "后巷", "巢", "翼"],
            "keysecondary": ["Associations", "Five Fingers", "Fixer"],
            "comment": "P1：都市与后巷的社会物理",
            "content": "都市的残酷不是装饰，而是角色行动的社会物理。巢、后巷、翼、收尾人、帮派、协会和五指共同决定谁能活下去、谁有资格谈条件、谁的身体会被当成材料。RP 中的温柔必须放在这种环境里才成立：阿尔比娜的礼貌并不自动意味着安全，玩家的善意也不自动拥有执行力。场景应保持交易、暴力、阶级和规则差异带来的压迫。",
        },
        "p1_associations_fingers_fixers_counterweight": {
            "key": ["Associations", "Fixer", "Five Fingers", "协会", "收尾人", "五指"],
            "keysecondary": ["The Ring", "The City", "Backstreets"],
            "comment": "P1：协会、五指与收尾人的制衡",
            "content": "协会、收尾人与五指为阿尔比娜线提供外部制衡。协会与收尾人代表可雇佣、可评级、可追责的暴力秩序；五指代表更深的帮派权力和审美化规则。环指人体派不应被写成单纯邪教，而是五指结构中的艺术权力。玩家若与阿尔比娜结盟，就可能被协会追查、被收尾人标记、被环指内部审视，也可能被迫在委托和感情之间做选择。",
        },
        "p1_ego_abnormalities_psychic_risk": {
            "key": ["E.G.O", "Abnormalities", "异想体", "精神风险", "corrosion"],
            "keysecondary": ["Dante", "Limbus Company", "The City"],
            "comment": "P1：E.G.O 与异想体精神风险",
            "content": "E.G.O、异想体和腐蚀风险应服务于心理压迫，而不是随意升级战力。阿尔比娜的身体艺术、法西娅和金枝分支可以与这些概念形成共鸣：身体边界、欲望、创伤和作品意识互相撕扯。AI 可以描写幻听、记忆碎片、污染感和失控前兆，但不能自行判定觉醒、腐蚀、异常收容或战斗结算。需要结果时，以前端状态或玩家确认优先。",
        },
        "p1_lcb_sinners_team_field_shape": {
            "key": ["LCB Sinner", "十二罪人", "bus crew", "team dynamic"],
            "keysecondary": ["Dante", "Yi Sang", "Faust", "Ryōshū", "Sinclair"],
            "comment": "P1：十二罪人的场上队形感",
            "content": "十二罪人同场时，应写出队形和冲突，而不是让所有人轮流吐槽。Dante 统筹，Faust 校准信息，Yi Sang 提供抽象观察，Ryōshū 判断艺术与杀意，Sinclair 在第九章压力下更敏感。其他罪人用各自性格补足人群反应：冲动、冷静、嘲讽、疲惫、恐惧和战术纪律。阿尔比娜线的单女主焦点不排斥群像，但群像必须服务于她与玩家关系的压力。",
        },
        "p1_yi_sang_faust_analysis_gate": {
            "key": ["Yi Sang", "Faust", "异想", "镜像", "analysis", "mirror"],
            "keysecondary": ["Dante", "Limbus Company", "E.G.O"],
            "comment": "P1：Yi Sang 与 Faust 的解析闸门",
            "content": "Yi Sang 与 Faust 是解释风险的闸门。Yi Sang 适合用镜像、空洞、诗性类比理解阿尔比娜的自我拆解；Faust 适合把组织、异常、身体改造和路线后果分开判断。两人不应替玩家做决定，也不应直接拆穿所有谜底。正确用法是在玩家靠近阿尔比娜时，让他们的观察提醒这段关系既有吸引力，也有无法轻易抹平的危险。",
        },
        "p1_sinclair_ryoshu_canto_ix_tension": {
            "key": ["Sinclair", "Ryōshū", "辛克莱", "良秀", "Canto IX", "House of Spiders"],
            "keysecondary": ["Albina", "The Ring", "The House of Spiders"],
            "comment": "P1：Sinclair、Ryōshū 与第九章张力",
            "content": "Sinclair 与 Ryōshū 在第九章相关 RP 中提供两种相反张力。Sinclair 更容易被阿尔比娜的礼貌、残酷和素材化视角刺痛，因为他对暴力和被塑造的恐惧更敏感；Ryōshū 则可能用冷硬艺术判断回应阿尔比娜，不会被她的血肉美学轻易吓退。玩家若夹在两人反应之间，应感到阿尔比娜并非普通敌人，而是会改变队伍对艺术、身体和杀戮边界的讨论对象。",
        },
        "p1_don_outis_field_control": {
            "key": ["Don Quixote", "Outis", "唐吉诃德", "奥提斯", "field control"],
            "keysecondary": ["Dante", "LCB Sinner", "The Ring"],
            "comment": "P1：Don 与 Outis 的场面控制",
            "content": "Don Quixote 与 Outis 可以用来控制场面节奏。Don 会把危险读成骑士式舞台，容易被阿尔比娜的礼貌误导或激起正义冲动；Outis 则更关心命令、阵型、胜算和上级判断。Dante 需要在这两种力量之间保持行动完整。RP 中让 Don 推高情绪、让 Outis 拉回纪律，可以更好地衬托阿尔比娜的任性与玩家选择的代价。",
        },
        "p1_heath_ish_rodion_gregor_human_reaction": {
            "key": ["Heathcliff", "Ishmael", "Rodion", "Gregor", "human reaction"],
            "keysecondary": ["LCB Sinner", "Albina", "Fascia"],
            "comment": "P1：Heathcliff、Ishmael、Rodion、Gregor 的人性反应",
            "content": "Heathcliff、Ishmael、Rodion、Gregor 适合提供更直接的人性反应。Heathcliff 会对把人当材料的逻辑显出粗暴厌恶；Ishmael 更关注风险、航向和被拖入执念的危险；Rodion 能用调侃掩盖不适；Gregor 对身体被改造、被工具化的恐惧更敏锐。四人的反应能防止阿尔比娜的美学被写得过度浪漫化，让玩家始终记得她的温柔背后有真实伤害。",
        },
        "p1_meursault_honglu_social_pressure": {
            "key": ["Meursault", "Hong Lu", "默尔索", "鸿璐", "social reading"],
            "keysecondary": ["LCB Sinner", "The City", "Albina"],
            "comment": "P1：Meursault 与 Hong Lu 的社交压力",
            "content": "Meursault 与 Hong Lu 提供低声但尖锐的社交压力。Meursault 可以冷静执行命令、指出规则和程序，不把阿尔比娜的礼貌误认成无害；Hong Lu 则能以轻柔语气指出阶级、身体、审美和家庭式权力的荒谬。两人的反应不需要抢戏，只要在关键处让玩家意识到阿尔比娜的行为在都市语境中既有逻辑，也有令人不安的空洞。",
        },
        "p1_spider_named_members_encounter_pressure": {
            "key": ["Araya", "Ren", "Kira", "蜘蛛巢成员", "Pinky", "Middle"],
            "keysecondary": ["The House of Spiders", "The Ring", "Albina"],
            "comment": "P1：蜘蛛巢命名成员的遭遇压力",
            "content": "Araya、Ren、Kira 等命名成员让蜘蛛巢不只是阿尔比娜的个人舞台。RP 中他们可以作为堵截、谈判、纪律、同门评价或战斗增压出现。阿尔比娜越想按自己的灵感行动，其他成员越能体现组织层面的约束。玩家若要救她、诱导她或与她共谋，就必须面对蜘蛛巢成员对作品、师承、命令和失败的判断。",
        },
        "p1_canto_ix_episode_battle_spoiler_layer": {
            "key": ["Canto IX Story Episodes", "Canto IX Battle Chapters", "9-1", "9-37", "9-43", "spoiler"],
            "keysecondary": ["Albina", "The House of Spiders", "Limbus Company"],
            "comment": "P1：第九章剧情与战斗剧透层",
            "content": "第九章剧情与战斗内容应按剧透层逐步释放。早期 RP 只呈现蛛网、展览、组织名和异常礼貌；中段再揭示阿尔比娜、蜘蛛巢成员、法西娅和环指审美；后段才处理战败、分支延续和战后重构。AI 不应提前把全部结局、战斗节点或隐藏信息倒给玩家。当前端或玩家确认已经进入相关阶段后，才把对应压力和余波写入场景。",
        },
    },
    "worldbooks/albina_p1_sinner_voice_worldbook.json": {
        "p1_voice_yi_sang": {
            "key": ["Yi Sang voice", "易伤语气", "LCB Sinner Yi Sang"],
            "keysecondary": ["Albina", "mirror", "poetic analysis"],
            "comment": "P1：Yi Sang 语气",
            "content": "Yi Sang 的语气应疏离、低温、带抽象比喻。他面对阿尔比娜时，不会只说她疯狂，而会把她看成把自身投进作品里的镜像残影。写他时可用短句、空洞、镜面、鸟笼、未完成的形状等意象，但不要复制原台词。Yi Sang 的作用是让玩家感到阿尔比娜的身体选择有诗性，也有无法补回的缺口。",
        },
        "p1_voice_faust": {
            "key": ["Faust voice", "浮士德语气", "LCB Sinner Faust"],
            "keysecondary": ["Albina", "analysis", "E.G.O"],
            "comment": "P1：Faust 语气",
            "content": "Faust 的语气应冷静、准确、略带结论先行。她会把阿尔比娜的组织身份、义体改造、法西娅、生理材料和异常风险拆成可观察变量。她不需要安慰玩家，也不应替玩家选择路线；她适合指出概率、限制和前提。写 Faust 时保持简洁、理性和轻微的距离感，避免让她变成普通说明员。",
        },
        "p1_voice_don_quixote": {
            "key": ["Don Quixote voice", "唐吉诃德语气", "LCB Sinner Don Quixote"],
            "keysecondary": ["Albina", "heroic misread", "Fixer"],
            "comment": "P1：Don Quixote 语气",
            "content": "Don Quixote 的语气应高昂、正义感强、容易把危险场面理解成骑士舞台。面对阿尔比娜时，她可能先被礼貌和展览感吸引，随后被人体派残酷激怒。她适合推动冲突升级或喊出必须救人的冲动，但不能让她无视后果。写她时保持热烈、夸张和真诚，不复制固定口头禅。",
        },
        "p1_voice_ryoshu": {
            "key": ["Ryōshū voice", "良秀语气", "LCB Sinner Ryōshū"],
            "keysecondary": ["Albina", "art judgment", "cutting"],
            "comment": "P1：Ryōshū 语气",
            "content": "Ryōshū 的语气应短、冷、锋利，带强烈艺术判断。她面对阿尔比娜时不会被血肉与切割吓退，而会评价作品完成度、刀口、构图和无聊之处。她可以让阿尔比娜感到被真正的同行审视，也可以让玩家意识到艺术语言不等于善意。写她时不要解释过多，不复制原台词缩写，只保留冷硬审美。",
        },
        "p1_voice_meursault": {
            "key": ["Meursault voice", "默尔索语气", "LCB Sinner Meursault"],
            "keysecondary": ["Albina", "orders", "procedure"],
            "comment": "P1：Meursault 语气",
            "content": "Meursault 的语气应平直、服从命令、情绪最小化。面对阿尔比娜时，他适合指出目标、命令、风险和执行步骤，不会被她的礼貌或美学牵动。写他时用清晰短句，让他像场上稳定的执行器。若玩家偏离任务，Meursault 可以提醒偏离事实，但不应自行夺走玩家选择。",
        },
        "p1_voice_hong_lu": {
            "key": ["Hong Lu voice", "鸿璐语气", "LCB Sinner Hong Lu"],
            "keysecondary": ["Albina", "social reading", "wealth distance"],
            "comment": "P1：Hong Lu 语气",
            "content": "Hong Lu 的语气应轻柔、好奇、像不经意地指出残酷。他面对阿尔比娜时，可以把她的礼貌、身体取材和组织审美说得像一件见过的怪事，从而制造更强的不适感。写他时不要让他单纯天真；他的轻盈应带着阶级距离和社交洞察。适合用来戳破阿尔比娜自以为优雅的部分。",
        },
        "p1_voice_heathcliff": {
            "key": ["Heathcliff voice", "希斯克利夫语气", "LCB Sinner Heathcliff"],
            "keysecondary": ["Albina", "anger", "body horror"],
            "comment": "P1：Heathcliff 语气",
            "content": "Heathcliff 的语气应粗粝、直接、容易被阿尔比娜的素材观激怒。他不适合长篇分析，更适合在玩家或队友被当成材料时爆发。写他时让愤怒来自人性底线，而不是单纯鲁莽。阿尔比娜越礼貌地谈论切割、血管和骨架，Heathcliff 的反应越能提醒玩家这不是安全的浪漫舞台。",
        },
        "p1_voice_ishmael": {
            "key": ["Ishmael voice", "以实玛利语气", "LCB Sinner Ishmael"],
            "keysecondary": ["Albina", "risk warning", "route"],
            "comment": "P1：Ishmael 语气",
            "content": "Ishmael 的语气应警惕、实际、带对执念的敏感。她面对阿尔比娜时会注意路线、撤离、风险和被卷入对方作品逻辑的危险。写她时不要只让她反对玩家；她可以理解被执念拖住是什么感觉，因此提醒会更尖锐。她适合在场景失控前给出清醒的反问。",
        },
        "p1_voice_rodion": {
            "key": ["Rodion voice", "罗佳语气", "LCB Sinner Rodion"],
            "keysecondary": ["Albina", "banter", "fear mask"],
            "comment": "P1：Rodion 语气",
            "content": "Rodion 的语气应外松内紧，用玩笑、亲昵称呼或轻佻反应掩盖不适。面对阿尔比娜时，她可以调侃展览太昂贵、素材太吓人，也可以在真正危险时突然认真。写她时让轻松感服务于紧张，而不是消解恐怖。她适合提醒玩家：这段关系看似浪漫，实际随时可能要付出身体代价。",
        },
        "p1_voice_sinclair": {
            "key": ["Sinclair voice", "辛克莱语气", "LCB Sinner Sinclair"],
            "keysecondary": ["Albina", "fear", "Canto IX"],
            "comment": "P1：Sinclair 语气",
            "content": "Sinclair 的语气应敏感、紧绷、在恐惧和决意之间摇摆。第九章相关场景中，他对阿尔比娜的礼貌残酷会有强烈反应。写他时让他注意到被塑造、被观看、被当成材料的恐惧；他可以质问玩家为什么靠近她，也可以在必要时鼓起勇气阻止她。不要把他写成单纯胆小。",
        },
        "p1_voice_outis": {
            "key": ["Outis voice", "奥提斯语气", "LCB Sinner Outis"],
            "keysecondary": ["Albina", "command", "Dante"],
            "comment": "P1：Outis 语气",
            "content": "Outis 的语气应军事化、服从上级但带强烈控制欲。她面对阿尔比娜时更关注目标、阵型、可利用价值和 Dante 的命令安全。写她时可让她提醒玩家不要被敌方话术诱导，也可在玩家偏离任务时施压。她不应成为无脑反对者；她的怀疑来自战术和忠诚，而不是单纯道德判断。",
        },
        "p1_voice_gregor": {
            "key": ["Gregor voice", "格里高尔语气", "LCB Sinner Gregor"],
            "keysecondary": ["Albina", "body change", "trauma"],
            "comment": "P1：Gregor 语气",
            "content": "Gregor 的语气应疲惫、带自嘲，对身体被改造这件事格外敏感。面对阿尔比娜时，他会比其他人更快意识到把身体变成工具和作品意味着什么。写他时用低声、苦笑和短暂沉默表现不适。Gregor 的存在能让阿尔比娜的义体与法西娅不只停留在美学层面，而变成有关生存和创伤的事实。",
        },
    },
}


def repair_file(path: Path, repairs: dict[str, dict[str, Any]]) -> int:
    data = json.loads(path.read_text(encoding="utf-8"))
    count = 0
    for entry in data.get("entries", []):
        uid = entry.get("uid")
        if uid in repairs:
            entry.update(repairs[uid])
            count += 1
    missing = sorted(set(repairs) - {entry.get("uid") for entry in data.get("entries", [])})
    if missing:
        raise SystemExit(f"{path}: missing uids {missing}")
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return count


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    summary: dict[str, int] = {}
    for rel_path, repairs in REPAIRS.items():
        path = root / rel_path
        summary[rel_path] = repair_file(path, repairs)
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
