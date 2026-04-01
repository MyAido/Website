/**
 * Aido Font Library Logic
 * Handles font data and file generation
 */

// Base original alphabet for mapping
const ORIGINAL_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";

// Huge list of unicode fonts (simulated 100+ via algorithmic generation and static lists)
const fonts = [
    // --- Script & Cursive ---
    { name: "Script", trigger: "@sc", map: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃" },
    { name: "Bold Script", trigger: "@bsc", map: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃" }, // Same as script usually, but kept for list
    { name: "Cursive", trigger: "@cur", map: "𝒜ℬ𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏" },

    // --- Bold & Italic ---
    { name: "Bold", trigger: "@bo", map: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳" },
    { name: "Italic", trigger: "@it", map: "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧" },
    { name: "Bold Italic", trigger: "@bi", map: "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛" },

    // --- Gothic / Fraktur ---
    { name: "Gothic", trigger: "@go", map: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷" },
    { name: "Bold Gothic", trigger: "@bgo", map: "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟" },

    // --- Double Struck ---
    { name: "Double Struck", trigger: "@ds", map: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫" },

    // --- Monospace ---
    { name: "Monospace", trigger: "@mo", map: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣" },

    // --- Enclosed / Circles / Squares ---
    { name: "Circles", trigger: "@ci", map: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ" },
    { name: "Black Circles", trigger: "@bci", map: "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅉🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅉" },
    { name: "Parenthesis", trigger: "@pa", map: "⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵" },
    { name: "Squares", trigger: "@sq", map: "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉" },

    // --- Fancy / Decorative ---
    { name: "Small Caps", trigger: "@sm", map: "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ" },
    { name: "Bubble", trigger: "@bu", map: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ" }, // Alias
    { name: "Upside Down", trigger: "@ud", map: "ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎzɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz" }, // Approx
    { name: "Wide", trigger: "@wi", map: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ" },

    // --- Sans Serif ---
    { name: "Sans Serif", trigger: "@ss", map: "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓" },
    { name: "Bold Sans", trigger: "@bss", map: "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇" }, // Fixed 'a' typpo
    { name: "Italic Sans", trigger: "@iss", map: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻" },
    { name: "Bold Italic Sans", trigger: "@bis", map: "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯" },

    // --- More Enclosed ---
    { name: "White Squares", trigger: "@wsq", map: "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉" },

    // --- Tiny text (Partial) ---
    { name: "Superscript", trigger: "@sup", map: "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ" }, // Best effort
    { name: "Subscript", trigger: "@sub", map: "ₐᵦ𝒸𝒹ₑբ₉ₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyzₐᵦ𝒸𝒹ₑբ₉ₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz" }, // User special mix

    // --- Missing Core Unicode Styles (Requested) ---
    { name: "Double Struck Italic", trigger: "@dsi", map: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷" },
    { name: "Outline Letters", trigger: "@ol", map: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ" },
    { name: "Negative Squares", trigger: "@nsq", map: "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉" },
    { name: "Parenthesized Caps", trigger: "@pc", map: "🄐🄑🄒🄓🄔🄕🄖🄗🄘🄙🄚🄛🄜🄝🄞🄟🄠🄡🄢🄣🄤🄥🄦🄧🄨🄩🄐🄑🄒🄓🄔🄕🄖🄗🄘🄙🄚🄛🄜🄝🄞🄟🄠🄡🄢🄣🄤🄥🄦🄧🄨🄩" },
    { name: "Math Sans Light", trigger: "@msl", map: "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓" },
    { name: "Fullwidth Upper Only", trigger: "@fwu", map: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺabcdefghijklmnopqrstuvwxyz" },
    { name: "Inverted", trigger: "@inv", map: "∀ᗺƆᗡƎℲ⅁HIſʞ˥WNOԀΌᴚS⊥∩ΛMXʎZɐqɔpǝɟƃɥıɾʞןɯuodbɹsʇnʌʍxʎz" },
    { name: "Mirror", trigger: "@mir", map: "AᗺƆᗡƎꟻᎮHIႱʞ⅃MИOꟼỌЯƧTUVWXYZɒdɔbɘʇǫʜiႱʞlmᴎoqpɿsƚuvwxyƹ" },
    { name: "Rune Style", trigger: "@run", map: "ᚨᛒᚲᛞᛖᚠᚷᚺᛁᛃᚲᛚᛗᚾᛟᛈᛩᚱᛋᛏᚢᚡᚹᛪᛦᛎᚨᛒᚲᛞᛖᚠᚷᚺᛁᛃᚲᛚᛗᚾᛟᛈᛩᚱᛋᛏᚢᚡᚹᛪᛦᛎ" },
    { name: "Greek Styled", trigger: "@gr", map: "ΑΒϹΔΕFGΗΙJKLΜΝΟΡQRЅΤUVWΧΥΖαβςδεfgηιjklμνορqrѕτυvwχυζ" },
    { name: "Cyrillic Styled", trigger: "@cy", map: "АВСDЕFGHIЈКLМНОРQRЅТUVWХYZавсdеfghіјкlмпорqrѕтуvwхуz" },
    { name: "Katakana Styled", trigger: "@kt", map: "ム乃匚刀モ下厶卄工丁Ｋ乚从几口尸Ｑ尺丂丁凵∨山メ丫乙ム乃匚刀モ下厶卄工丁Ｋ乚从几口尸Ｑ尺丂丁凵∨山メ丫乙" },
    { name: "Box Drawing", trigger: "@box", map: "┌┐├┤┬┴┼─│└┘╔╗╠╣╦╩╬═║╚╝┌┐├┤┬┴┼─│└┘╔╗╠╣╦╩╬═║╚╝" },
    { name: "Zalgo Light", trigger: "@zl", map: "A͛B͛C͛D͛E͛F͛G͛H͛I͛J͛K͛L͛M͛N͛O͛P͛Q͛R͛S͛T͛U͛V͛W͛X͛Y͛Z͛a͛b͛c͛d͛e͛f͛g͛h͛i͛j͛k͛l͛m͛n͛o͛p͛q͛r͛s͛t͛u͛v͛w͛x͛y͛z͛" },

    // --- National / Language Based ---
    { name: "Cherokee Styled", trigger: "@ch", map: "ᎠᏴᏟᎠᎬᎰᎶᎻᎥᏠᏦᏞᎷᏁᎾᏢᎤᏒᏕᏖᏬᏉᏔᏪᎩᏃᎠᏴᏟᎠᎬᎰᎶᎻᎥᏠᏦᏞᎷᏁᎾᏢᎤᏒᏕᏖᏬᏉᏔᏪᎩᏃ" },
    { name: "Georgian Styled", trigger: "@geo", map: "ႠႡႢႣႤႥႦႧႨႩႪႫႬႭႮႯႰႱႲႳႴႵႶႷႸႹႺႠႡႢႣႤႥႦႧႨႩႪႫႬႭႮႯႰႱႲႳႴႵႶႷႸႹႺ" },
    { name: "Armenian Styled", trigger: "@arm", map: "ԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖաբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆ" },
    { name: "Flags", trigger: "@fl", map: "🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿" },
];

// Helper to generate a unique trigger if duplicate
function generateTrigger(base, index) {
    return `@${base.substring(0, 2).toLowerCase()}${index}`;
}

// Populate with more variations to simulate 100 fonts
// (Removed legacy generated decor placeholders)

// Let's add more real mappings to be robust
const extraFonts = [
    { name: "Slash", trigger: "@sl", map: "A̷B̷C̷D̷E̷F̷G̷H̷I̷J̷K̷L̷M̷N̷O̷P̷Q̷R̷S̷T̷U̷V̷W̷X̷Y̷Z̷a̷b̷c̷d̷e̷f̷g̷h̷i̷j̷k̷l̷m̷n̷o̷p̷q̷r̷s̷t̷u̷v̷w̷x̷y̷z̷" },
    { name: "Underline", trigger: "@un", map: "A̲B̲C̲D̲E̲F̲G̲H̲I̲J̲K̲L̲M̲N̲O̲P̲Q̲R̲S̲T̲U̲V̲W̲X̲Y̲Z̲a̲b̲c̲d̲e̲f̲g̲h̲i̲j̲k̲l̲m̲n̲o̲p̲q̲r̲s̲t̲u̲v̲w̲x̲y̲z̲" },
    { name: "Double Underline", trigger: "@du", map: "A̳B̳C̳D̳E̳F̳G̳H̳I̳J̳K̳L̳M̳N̳O̳P̳Q̳R̳S̳T̳U̳V̳W̳X̳Y̳Z̳a̳b̳c̳d̳e̳f̳g̳h̳i̳j̲k̳l̳m̳n̳o̳p̳q̳r̳s̳t̳u̳v̳w̳x̳y̳z̳" },
    { name: "Strikethrough", trigger: "@st", map: "A̶B̶C̶D̶E̶F̶G̶H̶I̶J̶K̶L̶M̶N̶O̶P̶Q̶R̶S̶T̶U̶V̶W̶X̶Y̶Z̶a̶b̶c̶d̶e̶f̶g̶h̶i̶j̶k̶l̶m̶n̶o̶p̶q̶r̶s̶t̶u̶v̶w̶x̶y̶z̶" },
    { name: "Overline", trigger: "@ov", map: "A̅B̅C̅D̅E̅F̅G̅H̅I̅J̅K̅L̅M̅N̅O̅P̅Q̅R̅S̅T̅U̅V̅W̅X̅Y̅Z̅a̅b̅c̅d̅e̅f̅g̅h̅i̅j̅k̅l̅m̅n̅o̅p̅q̅r̅s̅t̅u̅v̅w̅x̅y̅z̅" },
    { name: "Arrows", trigger: "@arr", map: "A͎B͎C͎D͎E͎F͎G͎H͎I͎J͎K͎L͎M͎N͎O͎P͎Q͎R͎S͎T͎U͎V͎W͎X͎Y͎Z͎a͎b͎c͎d͎e͎f͎g͎h͎i͎j͎k͎l͎m͎n͎o͎p͎q͎r͎s͎t͎u͎v͎w͎x͎y͎z͎" },
    { name: "Crosshatch", trigger: "@cr", map: "A͓̽B͓̽C͓̽D͓̽E͓̽F͓̽G͓̽H͓̽I͓̽J͓̽K͓̽L͓̽M͓̽N͓̽O͓̽P͓̽Q͓̽R͓̽S͓̽T͓̽U͓̽V͓̽W͓̽X͓̽Y͓̽Z͓̽a͓̽b͓̽c͓̽d͓̽e͓̽f͓̽g͓̽h͓̽i͓̽j͓̽k͓̽l͓̽m͓̽n͓̽o͓̽p͓̽q͓̽r͓̽s͓̽t͓̽u͓̽v͓̽w͓̽x͓̽y͓̽z͓̽" },
    { name: "Winds", trigger: "@wn", map: "A🍃B🍃C🍃D🍃E🍃F🍃G🍃H🍃I🍃J🍃K🍃L🍃M🍃N🍃O🍃P🍃Q🍃R🍃S🍃T🍃U🍃V🍃W🍃X🍃Y🍃Z🍃a🍃b🍃c🍃d🍃e🍃f🍃g🍃h🍃i🍃j🍃k🍃l🍃m🍃n🍃o🍃p🍃q🍃r🍃s🍃t🍃u🍃v🍃w🍃x🍃y🍃z🍃" },
    { name: "Stars", trigger: "@str", map: "A⋆B⋆C⋆D⋆E⋆F⋆G⋆H⋆I⋆J⋆K⋆L⋆M⋆N⋆O⋆P⋆Q⋆R⋆S⋆T⋆U⋆V⋆W⋆X⋆Y⋆Z⋆a⋆b⋆c⋆d⋆e⋆f⋆g⋆h⋆i⋆j⋆k⋆l⋆m⋆n⋆o⋆p⋆q⋆r⋆s⋆t⋆u⋆v⋆w⋆x⋆y⋆z⋆" },
    { name: "Hearts", trigger: "@hrt", map: "A♥B♥C♥D♥E♥F♥G♥H♥I♥J♥K♥L♥M♥N♥O♥P♥Q♥R♥S♥T♥U♥V♥W♥X♥Y♥Z♥a♥b♥c♥d♥e♥f♥g♥h♥i♥j♥k♥l♥m♥n♥o♥p♥q♥r♥s♥t♥u♥v♥w♥x♥y♥z♥" },

    // --- Requested Fonts Mapped to Nearest Unicode Style ---
    { name: "Calibri", trigger: "@cal", map: "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓" },
    { name: "Ndot55 Regular", trigger: "@nd55", map: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣" },
    { name: "Ndot57 Regular", trigger: "@nd57", map: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣" },
    { name: "NType82 Mono Regular", trigger: "@ntm", map: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣" },
    { name: "NType82 Regular", trigger: "@ntr", map: "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓" },
    { name: "Inter Regular", trigger: "@in", map: "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓" },
    { name: "LetteraMono Regular", trigger: "@lm", map: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣" },
    { name: "SpaceMono Regular", trigger: "@smo", map: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣" },
    { name: "SpaceGrotesk Regular", trigger: "@sg", map: "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓" },

    // --- Additional Decorative & Style Fonts ---
    { name: "Wavy Underline", trigger: "@wav", map: "A̰B̰C̰D̰ḚF̰G̰H̰ḬJ̰K̰L̰M̰N̰O̰P̰Q̰R̰S̰T̰ṴV̰W̰X̰Y̰Z̰a̰b̰c̰d̰ḛf̰g̰h̰ḭj̰k̰l̰m̰n̰o̰p̰q̰r̰s̰t̰ṵv̰w̰x̰y̰z̰" },
    { name: "Dashed Underline", trigger: "@dash", map: "A̱ḆC̱ḎE̱F̱G̱H̱I̱J̱ḴḺM̱ṈO̱P̱Q̱ṞS̱ṮU̱V̱W̱X̱Y̱Ẕa̱ḇc̱ḏe̱f̱g̱ẖi̱j̱ḵḻm̱ṉo̱p̱q̱ṟs̱ṯu̱v̱w̱x̱y̱ẕ" },
    { name: "Dotted", trigger: "@dot", map: "A̤B̤C̤D̤E̤F̤G̤H̤I̤J̤K̤L̤M̤N̤O̤P̤Q̤R̤S̤T̤ṲV̤W̤X̤Y̤Z̤a̤b̤c̤d̤e̤f̤g̤h̤i̤j̤k̤l̤m̤n̤o̤p̤q̤r̤s̤t̤ṳv̤w̤x̤y̤z̤" },
    { name: "Diamonds", trigger: "@dia", map: "A♦B♦C♦D♦E♦F♦G♦H♦I♦J♦K♦L♦M♦N♦O♦P♦Q♦R♦S♦T♦U♦V♦W♦X♦Y♦Z♦a♦b♦c♦d♦e♦f♦g♦h♦i♦j♦k♦l♦m♦n♦o♦p♦q♦r♦s♦t♦u♦v♦w♦x♦y♦z♦" },
    { name: "Sparkles", trigger: "@spa", map: "A✨B✨C✨D✨E✨F✨G✨H✨I✨J✨K✨L✨M✨N✨O✨P✨Q✨R✨S✨T✨U✨V✨W✨X✨Y✨Z✨a✨b✨c✨d✨e✨f✨g✨h✨i✨j✨k✨l✨m✨n✨o✨p✨q✨r✨s✨t✨u✨v✨w✨x✨y✨z✨" },
    { name: "Fire", trigger: "@fire", map: "A🔥B🔥C🔥D🔥E🔥F🔥G🔥H🔥I🔥J🔥K🔥L🔥M🔥N🔥O🔥P🔥Q🔥R🔥S🔥T🔥U🔥V🔥W🔥X🔥Y🔥Z🔥a🔥b🔥c🔥d🔥e🔥f🔥g🔥h🔥i🔥j🔥k🔥l🔥m🔥n🔥o🔥p🔥q🔥r🔥s🔥t🔥u🔥v🔥w🔥x🔥y🔥z🔥" },
    { name: "Snowflakes", trigger: "@snow", map: "A❄B❄C❄D❄E❄F❄G❄H❄I❄J❄K❄L❄M❄N❄O❄P❄Q❄R❄S❄T❄U❄V❄W❄X❄Y❄Z❄a❄b❄c❄d❄e❄f❄g❄h❄i❄j❄k❄l❄m❄n❄o❄p❄q❄r❄s❄t❄u❄v❄w❄x❄y❄z❄" },
    { name: "Crown", trigger: "@crown", map: "A👑B👑C👑D👑E👑F👑G👑H👑I👑J👑K👑L👑M👑N👑O👑P👑Q👑R👑S👑T👑U👑V👑W👑X👑Y👑Z👑a👑b👑c👑d👑e👑f👑g👑h👑i👑j👑k👑l👑m👑n👑o👑p👑q👑r👑s👑t👑u👑v👑w👑x👑y👑z👑" },
    { name: "Lightning", trigger: "@bolt", map: "A⚡B⚡C⚡D⚡E⚡F⚡G⚡H⚡I⚡J⚡K⚡L⚡M⚡N⚡O⚡P⚡Q⚡R⚡S⚡T⚡U⚡V⚡W⚡X⚡Y⚡Z⚡a⚡b⚡c⚡d⚡e⚡f⚡g⚡h⚡i⚡j⚡k⚡l⚡m⚡n⚡o⚡p⚡q⚡r⚡s⚡t⚡u⚡v⚡w⚡x⚡y⚡z⚡" },
    { name: "Music Notes", trigger: "@music", map: "A♪B♪C♪D♪E♪F♪G♪H♪I♪J♪K♪L♪M♪N♪O♪P♪Q♪R♪S♪T♪U♪V♪W♪X♪Y♪Z♪a♪b♪c♪d♪e♪f♪g♪h♪i♪j♪k♪l♪m♪n♪o♪p♪q♪r♪s♪t♪u♪v♪w♪x♪y♪z♪" },

    // --- Mathematical & Scientific ---
    { name: "Math Fraktur", trigger: "@mf", map: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷" },
    { name: "Math Bold Fraktur", trigger: "@mbf", map: "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟" },
    { name: "Serif Italic", trigger: "@si", map: "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧" },
    { name: "Math Bold Italic", trigger: "@mbi", map: "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛" },

    // --- Regional Alphabets ---
    { name: "Arabic Styled", trigger: "@ar", map: "ДБҀDƐFGΉĪĴЌĻMПỌРQЯşȚЦVWΧЧŽαъςďέғģћΐĵķľṃήόρqŕşțυνώχчž" },
    { name: "Thai Styled", trigger: "@th", map: "ศ๒ς๔єŦﻮђเןкl๓ภ๏ק๏гรՇยשฬאץչค๒ς๔єŦﻮђเןкl๓ภ๏ק๏гรՇยשฬאץչ" },
    { name: "Hebrew Styled", trigger: "@heb", map: "ДБҀDƐҒGҢIJĶĻMИỌРQЯSȚЦVШҲҰŻąҍçԁęƒցհìʝҟӀʍղօքզɾʂԵմѵաҳվՀąҍçԁęƒցհìʝҟӀʍղօքզɾʂԵմѵաҳվՀ" },

    // --- Asian Inspired ---
    { name: "Chinese Styled", trigger: "@zh", map: "卂乃匚ᗪ乇千ㄥ卄丨フҜㄥ爪几ㄖ卩Ҩ尺丂ㄒㄩᐯ山乂ㄚ乙卂乃匚ᗪ乇千ㄥ卄丨フҜㄥ爪几ㄖ卩Ҩ尺丂ㄒㄩᐯ山乂ㄚ乙" },
    { name: "Japanese Styled", trigger: "@jp", map: "ﾑ乃ᄃり乇ｷムんﾉﾌズﾚﾶ刀のｱゐ尺丂ｲひ√Wﾒﾘ乙ﾑ乃ᄃり乇ｷムんﾉﾌズﾚﾶ刀のｱゐ尺丂ｲひ√Wﾒﾘ乙" },
    { name: "Korean Styled", trigger: "@ko", map: "ムBᄃDΣFGΉIJҜㄥMПΘPQЯƧTЦVЩXYZ무b섧d로f구휘i즈k레ᄆ돈오ㅔ귀rㄴ내욷v원xㅛ혀" },

    // --- Enclosed Variations ---
    { name: "Black Squares", trigger: "@bsq", map: "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉" },
    { name: "Negative Circles", trigger: "@nci", map: "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩" },
    { name: "Rounded", trigger: "@rnd", map: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ" },

    // --- Unique Styles ---
    { name: "Glitch", trigger: "@glitch", map: "ĄβČĎΣFĢĤÏĴЌĻMŃỌPQŘŞŦŰVŴXŶŽąβςďέғģћΐĵķľṃήόρqŕşțυνώχчž" },
    { name: "Medieval", trigger: "@med", map: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫" },
    { name: "Typewriter", trigger: "@type", map: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣" },
    { name: "Handwriting", trigger: "@hand", map: "𝒜ℬ𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏" },
    { name: "Neon", trigger: "@neon", map: "卂乃匚ᗪ乇千Ꮆ卄丨ﾌҜㄥ爪几ㄖ卩Ҩ尺丂ㄒㄩᐯ山乂ㄚ乙卂乃匚ᗪ乇千Ꮆ卄丨ﾌҜㄥ爪几ㄖ卩Ҩ尺丂ㄒㄩᐯ山乂ㄚ乙" },
    { name: "Graffiti", trigger: "@graf", map: "ꋫꃴ꒝ꂠꂚꄞꁅꑛꂑ꒻ꀗ꒒ꁒꁚꆂꁹɋꌅꌚ꓄ꐇꌚꅐꊼ꒻Z꒯ꐯꐽꂠꆂꎇꁍꁝꂑꀭꀘ꒒ꁒꁠꂱꋖꁷꌗꅒꉧꌩꌗ" },
    { name: "Bubble Text", trigger: "@bub", map: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ" },
    { name: "Ancient", trigger: "@anc", map: "ᗩᗷᑕᗪEᖴGᕼIᒍKᒪᗰᑎOᑭᑫᖇᔕTᑌᐯᗯ᙭YᘔᗩᗷᑕᗪEᖴGᕼIᒍKᒪᗰᑎOᑭᑫᖇᔕTᑌᐯᗯ᙭Yᘔ" },

    // --- User Requested Additions (Batch 2) ---
    { name: "Double Struck Line", trigger: "@dsl", map: "𝑨̲̅𝑩̲̅𝑪̲̅𝑫̲̅𝑬̲̅𝑭̲̅𝑮̲̅𝑯̲̅𝑰̲̅𝑱̲̅𝑲̲̅𝑳̲̅𝑴̲̅𝑵̲̅𝑶̲̅𝑷̲̅𝑸̲̅𝑹̲̅𝑺̲̅𝑻̲̅𝑼̲̅𝑽̲̅𝑾̲̅𝑿̲̅𝒀̲̅𝒁̲̅𝒂̲̅𝒃̲̅𝒄̲̅𝒅̲̅𝒆̲̅𝒇̲̅𝒈̲̅𝒉̲̅𝒊̲̅𝒋̲̅𝒌̲̅𝒍̲̅𝒎̲̅𝒏̲̅𝒐̲̅𝒑̲̅𝒒̲̅𝒓̲̅𝒔̲̅𝒕̲̅𝒖̲̅𝒗̲̅𝒘̲̅𝒙̲̅𝒚̲̅𝒛̲̅" },
    { name: "Cyrillic Mix", trigger: "@cym", map: "ДБСĎЕҒĞНІЈКLМПОРϘГЅТЦѴШХЧZдбсᴅеғɢ̆ніᴊкʟмпорϙгѕтцѵшхчᴢ" },
    { name: "Ransom Note", trigger: "@ran", map: "ａｂ𝔠ᵈέ𝔽gⓗ𝓘ⒿЌl𝓂ή𝐎𝓟𝕢𝔯𝐒𝕥𝓊νᗯⓍуŻ𝐚ᵇ¢ᗪｅғgⓗ𝕀ｊҜᒪмภ𝑜ρ𝓺яᔕ丅𝓊𝐯ŴⓧⓎℤ" },
    { name: "Tilde Strike", trigger: "@tst", map: "A̴B̴C̴D̴E̴F̴G̴H̴I̴J̴K̴L̴M̴N̴O̴P̴Q̴R̴S̴T̴U̴V̴W̴X̴Y̴Z̴a̴b̴c̴d̴e̴f̴g̴h̴i̴j̴k̴l̴m̴n̴o̴p̴q̴r̴s̴t̴u̴v̴w̴x̴y̴z̴" },
    { name: "Phonetic", trigger: "@pho", map: "ǟɮƈɖɛʄɢɦɨʝӄʟʍռօքզʀֆȶʊʋաӼʏʐǟɮƈɖɛʄɢɦɨʝӄʟʍռօքզʀֆȶʊʋաӼʏʐ" },
    { name: "Russian Caps", trigger: "@rus", map: "АБCДЄFGHЇJКГѪЙѲPФЯ$TЦѴШЖЧЗабcдёfgнїjкгѫпѳpфя$тцѵщжчз" },
    // Superscript Full is tricky, using user provided map
    { name: "Superscript Mix", trigger: "@supm", map: "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ" },
    { name: "Greek Lower", trigger: "@grl", map: "αв¢∂єƒgнιנкℓмησρqяѕтυνωχуzαв¢∂єƒgнιנкℓмησρqяѕтυνωχуz" },
    { name: "Curvy", trigger: "@curv", map: "αႦƈԃҽϝɠԋιʝƙʅɱɳσρϙɾʂƚυʋɯxყȥαႦƈԃҽϝɠԋιʝƙʅɱɳσρϙɾʂƚυʋɯxყȥ" },
    { name: "Greek Caps", trigger: "@gkc", map: "ΛBᄃDΣFGΉIJKᄂMПӨPQЯƧƬЦVЩXYZΛBᄃDΣFGΉIJKᄂMПӨPQЯƧƬЦVЩXYZ" },
    { name: "Bubble Script", trigger: "@bus", map: "ꪖ᥇ᥴᦔꫀᠻᧁꫝ꠸꠹ᛕꪶꪑꪀꪮρꪇ᥅ᦓꪻꪊꪜ᭙᥊ꪗƺꪖ᥇ᥴᦔꫀᠻᧁꫝ꠸꠹ᛕꪶꪑꪀꪮρꪇ᥅ᦓꪻꪊꪜ᭙᥊ꪗƺ" },
    { name: "Accented", trigger: "@acc", map: "ÁBĆDÉFǴHíJḰĹḾŃŐṔQŔśTŰVẂXӲŹábćdéfǵhíjḱĺḿńőṕqŕśtúvẃxӳź" },
    { name: "Zalgo Heavy", trigger: "@zhv", map: "Ą̵̺̰̻̻͔͇͓̈́̓͛̏̈́͌͋̄̑͆̏B̶̨̛̺̤̱̾̀́̋̔̆̏̎͘͘C̴̀͐ͅḐ̷̮̳̣̟͉͋͗̓̕͜Ȩ̸̪̯̗̘̥̣̲̣̣͍͚͙̥̩́̀̈̆͑F̵̜̜͎͉̯̜̓͂G̶̺̥̎̄͌͑͂̔̏̓̂́̈́͜͝͝͝͝ͅḨ̵̛̘̤͙͔̝̫̖̻̦̞͙̺̅̿͘͝I̸̺̺͎̰̥̜̯̼̮̰͖̜͂͆̿̈́̿̔Ĵ̸͔̣̮̤̝̥̆̏͋͒͝K̵̢̛̛͉̳̫͔̺̱̗̫̽̉́͋̾́͂͛L̷͖͈̓͌̎̉͒͗͂̓̌̚͝M̶̧͚̪͉̯̜̰͎̘̀͋̇̀͗̍́͆̑̏͂̿̊̚N̸̡̧͕͙̼̻̳̦̪̞̯͎̦͓̏̒͌͑͒͊̾͌̑̅̕͝ͅO̵̧̗͕̹̼̦̗̮̱̝͆͊́́̈̿̋ͅP̷̛̛̛̩̺͇̊̅̍͂͗͑͐̎̂̏̐̐Q̷̡̠̝͚̼̘̜̜̠͍͓̎̒̀̿͋̅̄̀̿̄̏͠ͅŖ̷͇̙̰̭̪̟̺̲̜̹͔̎̍́ͅŚ̸͙̺̥̰̯͙̭͆̏͂T̷̡̧̬̲̭̦̘̩̊̉͛̓̓̌͌̕U̴̡̢̱̳̳͓̗͔̮̔͜͜͜V̵̧͖͙̲̯̞͇̲͔̤͊̔͌͂͆͑́́̑͒͝W̵̰̻͍̉̔̅̀̐͐͒͆̒̚X̶̨̢̗͍̪͚͍̱̭̣̰̳̠͌̓͌̅͆̈́̊̅̓̿͠Ý̴̥͙̘̇̈́̇̃͒̿́͘͘͝͝ͅZ̵̥̼̐̀̐́̅̀̈͆̓͒́̕̚͠ǎ̴̯̀͠b̸̼̋͛̑͆̈́͗̿̅c̵̛̥͊d̶̡̲̗̼̮̤̤̳̲͖͓͍͔͓̓̎̽́̽̏̐͂̆͆͘͘͘ë̸͓̮͉͈͇͍̖͎̩̞͈́́́̋̇̾͋̈́̾͆͑͘͘͜͠͝f̵̢̻͈̫̬̻͔̘̞͈̆̇̍̈̌͊ͅǧ̷̡̟̲̹̩̱͉̮̭͇͚̮̖̟̽̓͊̔̓̕ḥ̸̨̧̗̮̖̽̂̓̀̍̋͋́̅̃͘͜͝i̶̡̹͈͎̳̞͙͖̾̂̀͑̀͆̑̓̽̉͐͘͘ͅj̵̬̺̭̼̺̫̦͚̬̼͚͙̰̭̐̐ͅk̵̘̺̦͉͖̪̪͖͉͊̆̔́̈́̍̃̈́͒̂̑̀̚͜͝l̶̬̞͎̖͉̹̝͕̝͖̣̉͆m̵̢͕̫̓̔͑̊̈ǹ̷̨͍̮̥̹̘͙̗̻̬̬̜̥̮̃̒̈́̽͗̿̍̄̂̏͆͠͝ŏ̸̡̼̺̫̥̻͈̞̍͆̏̓́͜͝ͅp̴̩͙̺̩͓̣͈͖̎ͅq̶̡̛̥̫͓̩̫͇̥̋͊̇̄͐̈́̓͠r̵̡͕͈͚͍͍̼͕̍̀̈́̽̎̍͗̍́̏̚͜͠s̴̹̀̎̇͗̍͗̾̋̏̈͐͒̕͠͠ͅt̸̫̫̤͕̳̻̰̣̭́̌̉͝ͅu̷̬̩̰̫͕̘͎̔́̃̄̍͋̓ṽ̵͇̟̺̣͓̰̭̲̼̻̪̩̰͒̓̿̄̾̔̊͝ͅẃ̸̝̝̰͋͒x̵̢̝̹̘͖͖̜̩̝͗̽́̑͗͋y̶͔͗z̷̛̻̤̯̥̝͎̯͚̹͇͗̆̄̈́̅̎̓̿̎͋́̅̈́̚͜" },
    { name: "Subscript Mix", trigger: "@subm", map: "ₐBCDₑFGₕᵢⱼₖₗₘₙₒₚQᵣₛₜᵤᵥWₓYZₐbcdₑfgₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz" },
    { name: "Shaded", trigger: "@sha", map: "░A░░B░░C░░D░░E░░F░░G░░H░░I░░J░░K░░L░░M░░N░░O░░P░░Q░░R░░S░░T░░U░░V░░W░░X░░Y░░Z░░a░░b░░c░░d░░e░░f░░g░░h░░i░░j░░k░░l░░m░░n░░o░░p░░q░░r░░s░░t░░u░░v░░w░░x░░y░░z░" },
    { name: "Corner Brackets", trigger: "@cbr", map: "『A』『B』『C』『D』『E』『F』『G』『H』『I』『J』『K』『L』『M』『N』『O』『P』『Q』『R』『S』『T』『U』『V』『W』『X』『Y』『Z』『a』『b』『c』『d』『e』『f』『g』『h』『i』『j』『k』『l』『m』『n』『o』『p』『q』『r』『s』『t』『u』『v』『w』『x』『y』『z』" },
    { name: "Starry", trigger: "@sty", map: "A͙B͙C͙D͙E͙F͙G͙H͙I͙J͙K͙L͙M͙N͙O͙P͙Q͙R͙S͙T͙U͙V͙W͙X͙Y͙Z͙a͙b͙c͙d͙e͙f͙g͙h͙i͙j͙k͙l͙m͙n͙o͙p͙q͙r͙s͙t͙u͙v͙w͙x͙y͙z͙" },
    { name: "Diaeresis", trigger: "@dia2", map: "Ä̤̈B̤̈̈C̤̈̈D̤̈̈Ë̤̈F̤̈̈G̤̈̈Ḧ̤̈Ï̤̈J̤̈̈K̤̈̈L̤̈̈M̤̈̈N̤̈̈Ö̤̈P̤̈̈Q̤̈̈R̤̈̈S̤̈̈T̤̈̈Ṳ̈̈V̤̈̈Ẅ̤̈Ẍ̤̈Ÿ̤̈Z̤̈̈ä̤̈b̤̈̈c̤̈̈d̤̈̈ë̤̈f̤̈̈g̤̈̈ḧ̤̈ï̤̈j̤̈̈k̤̈̈l̤̈̈m̤̈̈n̤̈̈ö̤̈p̤̈̈q̤̈̈r̤̈̈s̤̈̈ẗ̤̈ṳ̈̈v̤̈̈ẅ̤̈ẍ̤̈ÿ̤̈z̤̈̈" },
    { name: "Mixed Arts", trigger: "@mxa", map: "ᗩ𝐁Ｃ𝒹𝒆𝔣𝓰𝒽𝒾ڶķ𝔩ᗰ𝓃𝓸𝐏Ωｒｓｔυ𝓥ώЖƳzα𝕓匚Đⓔ𝐟Ꮆｈ𝒾ʲкⓛΜℕㄖᑭᵠℝ丂𝐭ᵘ𝓋ώχ𝕐𝔃" },
    { name: "Runic Mix", trigger: "@rmx", map: "A𐌀𐌁𐌂𐌃𐌄𐌅Ᏽ𐋅𐌉Ꮭ𐌊𐌋𐌌𐌍Ꝋ𐌐𐌒𐌓𐌔𐌕𐌵ᕓᏔ𐋄𐌙𐌀𐌁𐌂𐌃𐌄𐌅Ᏽ𐋅𐌉Ꮭ𐌊𐌋𐌌𐌍Ꝋ𐌐𐌒𐌓𐌔𐌕𐌵ᕓᏔ𐋄𐌙" },
    { name: "Dotted Accents", trigger: "@dot2", map: "ÄḄĊḊЁḞĠḦЇJḲḶṀṄÖṖQṚṠṪÜṾẄẌŸŻäḅċḋëḟġḧïjḳḷṁṅöṗqṛṡẗüṿẅẍÿż" },
    { name: "Waves", trigger: "@wav2", map: "≋A≋≋B≋≋C≋≋D≋≋E≋≋F≋≋G≋≋H≋≋I≋≋J≋≋K≋≋L≋≋M≋≋N≋≋O≋≋P≋≋Q≋≋R≋≋S≋≋T≋≋U≋≋V≋≋W≋≋X≋≋Y≋≋Z≋≋a≋≋b≋≋c≋≋d≋≋e≋≋f≋≋g≋≋h≋≋i≋≋j≋≋k≋≋l≋≋m≋≋n≋≋o≋≋p≋≋q≋≋r≋≋s≋≋t≋≋u≋≋v≋≋w≋≋x≋≋y≋≋z≋" },
    { name: "Fancy Random", trigger: "@frn", map: "𝐀βⓒ𝓭𝑒ⓕᵍⓗᎥןᵏ𝕃ｍⓝ𝓸Ƥℚⓡ𝓼Ｔ𝓾v𝓌ⓧץŻ𝐚๒Ć𝓭𝑒ⓕ𝕘𝓱ƗＪⓀᒪм𝐍Ø卩qя丂𝐓ยｖ𝔀x𝔂𝓩" },
    { name: "Greek Mix", trigger: "@gmx", map: "ΔƁCDΣFGHIJƘLΜ∏ΘƤႳΓЅƬƱƲШЖΨZλϐςdεғϑɢнιϳκlϻπσρφгsτυvшϰψz" },
    { name: "Cherokee 2", trigger: "@ch2", map: "ᏗᏰፈᎴᏋᎦᎶᏂᎥᏠᏦᏝᎷᏁᎧᎮᎤᏒᏕᏖᏬᏉᏇጀᎩፚᏗᏰፈᎴᏋᎦᎶᏂᎥᏠᏦᏝᎷᏁᎧᎮᎤᏒᏕᏖᏬᏉᏇጀᎩፚ" },
    { name: "Arrow Below", trigger: "@arb", map: "͎A͎͎B͎͎C͎͎D͎͎E͎͎F͎͎G͎͎H͎͎I͎͎J͎͎K͎͎L͎͎M͎͎N͎͎O͎͎P͎͎Q͎͎R͎͎S͎͎T͎͎U͎͎V͎͎W͎͎X͎͎Y͎͎Z͎a͎͎b͎͎c͎͎d͎͎e͎͎f͎͎g͎͎h͎͎i͎͎j͎͎k͎͎l͎͎m͎͎n͎͎o͎͎p͎͎q͎͎r͎͎s͎͎t͎͎u͎͎v͎͎w͎͎x͎͎y͎͎z͎͎" },
    { name: "Tie Over", trigger: "@tie", map: "A͡B͡C͡D͡E͡F͡G͡H͡I͡J͡K͡L͡M͡N͡O͡P͡Q͡R͡S͡T͡U͡V͡W͡X͡Y͡Z͡a͡b͡c͡d͡e͡f͡g͡h͡i͡j͡k͡l͡m͡n͡o͡p͡q͡r͡s͡t͡u͡v͡w͡x͡y͡z͡" },
    { name: "Currency", trigger: "@cur2", map: "₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎⱫ₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎⱫ" },
    { name: "Boxed Text", trigger: "@box2", map: "[̲̅A][̲̅B][̲̅C][̲̅D][̲̅E][̲̅F][̲̅G][̲̅H][̲̅I][̲̅J][̲̅K][̲̅L][̲̅M][̲̅N][̲̅O][̲̅P][̲̅Q][̲̅R][̲̅S][̲̅T][̲̅U][̲̅V][̲̅W][̲̅X][̲̅Y][̲̅Z][̲̅a][̲̅b][̲̅c][̲̅d][̲̅e][̲̅f][̲̅g][̲̅h][̲̅i][̲̅j][̲̅k][̲̅l][̲̅m][̲̅n][̲̅o][̲̅p][̲̅q][̲̅r][̲̅s][̲̅t][̲̅u][̲̅v][̲̅w][̲̅x][̲̅y][̲̅z]" },
    { name: "Yi Italic", trigger: "@yii", map: "ꋬꍗꏳꂟꏂꄟꍌꃬ꒐꒻ꀘ꒒ꂵꂚꉻꉣꋠꋪꑄ꓄ꀎ꒦ꅐꉼꐞꑓꁲꃃꇃꂡꏹꄞꁍꍩꂑꀭꈵ꒒ꂵꋊꂦꉣꆰꋪꌚꋖꌈꀰꅐꇒꂖꁴ" },
    { name: "Stroke", trigger: "@strk", map: "ȺɃȻĐɆFǤĦƗɈꝀŁMNØⱣꝖɌSŦᵾVWXɎƵȺƀȼđɇfǥħɨɉꝁłmnøᵽꝗɍsŧᵾvwxɏƶ" },

    // --- User Requested Additions (Batch 3) ---
    { name: "Vaporwave", trigger: "@vap", map: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９" },
    { name: "Spaced Vaporwave", trigger: "@svap", map: "  Λ  ＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９" },
    { name: "Mixed Vaporwave", trigger: "@mvap", map: "  Λ  ＢＣＤ  Σ  ＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９" },
    { name: "Reversed Text", trigger: "@rev", map: "zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA" },
    // UPGRADED: Full ASCII Support
    { name: "Mirrored", trigger: "@mirr", map: "\"/ !#$%&')(*+,-.\\0߁ςƐ߂टმ٢8୧:;<=>⸮@AꓭↃꓷƎꟻӘHIႱꓘ⅃MИOꟼϘЯꙄTUVWXYZ][^_`ɒdↄbɘʇϱʜiįʞlmᴎoqpᴙꙅɈυvwxγz}|{~" },
    { name: "Inverted", trigger: "@inv", map: "„\\ ¡#$%⅋,)(*+‘-˙/0ƖՇƐᔭϛ9𝘓86:;<=>¿@∀ꓭↃꓷƎℲ⅁HIſꓘ⅂WNOԀῸꓤS⊥∩ꓥMX⅄Z][^‾`ɐqɔpǝɟƃɥıɾʞןɯuodbɹsʇnʌʍxʎz}|{~" },

    // --- User Requested Additions (Batch 10) ---
    { name: "Rotated Left", trigger: "@rotl", map: "=/ !#$%&-⏝⏜*+`ǀ∙\\ⴰ↽വ𝈐ፓහமΓꝏᓂ⠒;˅𝄥∧ᣇ@ᗉߘ𝈱⌓ш𝈯ᘎ⌶𝄩⥟𝈎⨼∑Zⴰᓇⵚᓚᔕ⊢⊃𝈷ᕒ×⤚𝇙⎵⎴‹|`ơᓄ𝈱ᓀш𝈯თ𝈦𝄩ᓜ𝈎⨼ᗴ⊂ⴰᓇᓂᓚᔕ𝀏⊃𝈷З×⤚𝇙⏟_⏞ಽ" },
    { name: "Rotated Right", trigger: "@rotr", map: "=/ !#$%&-⏜⏝*+`ǀ∙\\ⴰ⇀ᘚω𝈦හの⨼ꝏᓄ⠒;∧𝄥˅?@ᗆϖᴒᗜጠ╖ᘏ⌶𝄩ᓚ⌤⌐ᕒZⴰᓀᓄᓓᔕ⊣⊂<ᓬ×⤙𝇙⎴⎵›|`⌕ᓂᴒ௨ጠ╖மፓ𝄩ᓚ⌤⌐ᴟᴝⴰᓀᓄᓓᔕ𝀏⊂<ᓬ×⤙𝇙⏞_⏟ಽ" },

    // --- Styled Variations ---
    { name: "Sans Serif Bold Underline", trigger: "@ssbu", map: "​̲𝗔​̲𝗕​̲𝗖​̲𝗗​̲𝗘​̲𝗙​̲𝗚​̲𝗛​̲𝗜​̲𝗝​̲𝗞​̲𝗟​̲𝗠​̲𝗡​̲𝗢​̲𝗣​̲𝗤​̲𝗥​̲𝗦​̲𝗧​̲𝗨​̲𝗩​̲𝗪​̲𝗫​̲𝗬​̲𝗭​̲𝗮​̲𝗯​̲𝗰​̲𝗱​̲𝗲​̲𝗳​̲𝗴​̲𝗵​̲𝗶​̲𝗷​̲𝗸​̲𝗹​̲𝗺​̲𝗻​̲𝗼​̲𝗽​̲𝗾​̲𝗿​̲𝘀​̲𝘁​̲𝘂​̲𝘃​̲𝘄​̲𝘅​̲𝘆​̲𝘇​̲𝟬​̲𝟭​̲𝟮​̲𝟯​̲𝟰​̲𝟱​̲𝟲​̲𝟳​̲𝟴​̲𝟵" },
    { name: "Serif Bold Underline", trigger: "@sbu", map: "​̲𝐀​̲𝐁​̲𝐂​̲𝐃​̲𝐄​̲𝐅​̲𝐆​̲𝐇​̲𝐈​̲𝐉​̲𝐊​̲𝐋​̲𝐌​̲𝐍​̲𝐎​̲𝐏​̲𝐐​̲𝐑​̲𝐒​̲𝐓​̲𝐔​̲𝐕​̲𝐖​̲𝐗​̲𝐘​̲𝐙​̲𝐚​̲𝐛​̲𝐜​̲𝐝​̲𝐞​̲𝐟​̲𝐠​̲𝐡​̲𝐢​̲𝐣​̲𝐤​̲𝐥​̲𝐦​̲𝐧​̲𝐨​̲𝐩​̲𝐪​̲𝐫​̲𝐬​̲𝐭​̲𝐮​̲𝐯​̲𝐰​̲𝐱​̲𝐲​̲𝐳​̲" },

    // --- Spongecase & Fun ---
    { name: "Spongecase", trigger: "@spg", map: "aBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZ" },
    { name: "Mono Spongecase", trigger: "@mspg", map: "𝚊𝙱𝚌𝙳𝚎𝙵𝚐𝙷𝚒𝙹𝚔𝙻𝚖𝙽𝚘𝙿𝚚𝚁𝚜𝚃𝚞𝚅𝚠𝚇𝚢𝚉𝚊𝙱𝚌𝙳𝚎𝙵𝚐𝙷𝚒𝙹𝚔𝙻𝚖𝙽𝚘𝙿𝚚𝚁𝚜𝚃𝚞𝚅𝚠𝚇𝚢𝚉" },

    // --- Strikethrough & Slashes ---
    { name: "Mono Strikethrough", trigger: "@mst", map: "𝙰̶𝙱̶𝙲̶𝙳̶𝙴̶𝙵̶𝙶̶𝙷̶𝙸̶𝙹̶𝙺̶𝙻̶𝙼̶𝙽̶𝙾̶𝙿̶𝚀̶𝚁̶𝚂̶𝚃̶𝚄̶𝚅̶𝚆̶𝚇̶𝚈̶𝚉̶𝚊̶𝚋̶𝚌̶𝚍̶𝚎̶𝚏̶𝚐̶𝚑̶𝚒̶𝚓̶𝚔̶𝚕̶𝚖̶𝚗̶𝚘̶𝚙̶𝚚̶𝚛̶𝚜̶𝚝̶𝚞̶𝚟̶𝚠̶𝚡̶𝚢̶𝚣̶" },
    { name: "Mono Slashes", trigger: "@msl2", map: "𝙰̷𝙱̷𝙲̷𝙳̷𝙴̷𝙵̷𝙶̷𝙷̷𝙸̷𝙹̷𝙺̷𝙻̷𝙼̷𝙽̷𝙾̷𝙿̷𝚀̷𝚁̷𝚂̷𝚃̷𝚄̷𝚅̷𝚆̷𝚇̷𝚈̷𝚉̷𝚊̷𝚋̷𝚌̷𝚍̷𝚎̷𝚏̷𝚐̷𝚑̷𝚒̷𝚓̷𝚔̷𝚕̷𝚖̷𝚗̷𝚘̷𝚙̷𝚚̷𝚛̷𝚜̷𝚝̷𝚞̷𝚟̷𝚠̷𝚡̷𝚢̷𝚣̷" },
    { name: "Redacted", trigger: "@red", map: "████████████████████████████████████████████████████" },

    // --- Superscript Styles ---
    { name: "Superscript Style 1", trigger: "@sup1", map: "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᵠᴿˢᵀᵁᵛʷˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ" },
    { name: "Superscript Style 2", trigger: "@sup2", map: "ᵃᵇᶜᵈᵉᶠᵍʰ ͥ ʲᵏˡᵐⁿᵒᵖᵒ̴ʳˢᵗᵘᵛʷˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰ ͥ ʲᵏˡᵐⁿᵒᵖᵒ̴ʳˢᵗᵘᵛʷˣʸᶻ" },

    // --- Underlined Variations ---
    { name: "Mono Underlined", trigger: "@mun", map: "𝙰̲𝙱̲𝙲̲𝙳̲𝙴̲𝙵̲𝙶̲𝙷̲𝙸̲𝙹̲𝙺̲𝙻̲𝙼̲𝙽̲𝙾̲𝙿̲𝚀̲𝚁̲𝚂̲𝚃̲𝚄̲𝚅̲𝚆̲𝚇̲𝚈̲𝚉̲𝚊̲𝚋̲𝚌̲𝚍̲𝚎̲𝚏̲𝚐̲𝚑̲𝚒̲𝚓̲𝚔̲𝚕̲𝚖̲𝚗̲𝚘̲𝚙̲𝚚̲𝚛̲𝚜̲𝚝̲𝚞̲𝚟̲𝚠̲𝚡̲𝚢̲𝚣̲" },
    { name: "Double Underline Sans", trigger: "@dun", map: "​̳𝖠​̳𝖡​̳𝖢​̳𝖣​̳𝖤​̳𝖥​̳𝖦​̳𝖧​̳𝖨​̳𝖩​̳𝖪​̳𝖫​̳𝖬​̳𝖭​̳𝖮​̳𝖯​̳𝖰​̳𝖱​̳𝖲​̳𝖳​̳𝖴​̳𝖵​̳𝖶​̳𝖷​̳𝖸​̳𝖹​̳𝖺​̳𝖻​̳𝖼​̳𝖽​̳𝖾​̳𝖿​̳𝗀​̳𝗁​̳𝗂​̳𝗃​̳𝗄​̳𝗅​̳𝗆​̳𝗇​̳𝗈​̳𝗉​̳𝗊​̳𝗋​̳𝗌​̳𝗍​̳𝗎​̳𝗏​̳𝗐​̳𝗑​̳𝗒​̳𝗓​̳" },
    { name: "Arrow Underline", trigger: "@arru", map: "̲𝖠̲𝖡̲𝖢̲𝖣̲𝖤̲𝖥̲𝖦̲𝖧̲𝖨̲𝖩̲𝖪̲𝖫̲𝖬̲𝖭̲𝖮̲𝖯̲𝖰̲𝖱̲𝖲̲𝖳̲𝖴̲𝖵̲𝖶̲𝖷̲𝖸̲𝖹̲𝖺̲𝖻̲𝖼̲𝖽̲𝖾̲𝖿̲𝗀̲𝗁̲𝗂̲𝗃̲𝗄̲𝗅̲𝗆̲𝗇̲𝗈̲𝗉̲𝗊̲𝗋̲𝗌̲𝗍̲𝗎̲𝗏̲𝗐̲𝗑̲𝗒̲𝗓͢" },

    // --- Manicules ---
    { name: "Manicules", trigger: "@mani", map: "☛​̳𝘼​̳𝘽​̳𝘾​̳𝘿​̳𝙀​̳𝙁​̳𝙂​̳𝙃​̳𝙄​̳𝙅​̳𝙆​̳𝙇​̳𝙈​̳𝙉​̳𝙊​̳𝙋​̳𝙌​̳𝙍​̳𝙎​̳𝙏​̳𝙐​̳𝙑​̳𝙒​̳𝙓​̳𝙔​̳𝙕​̳𝙖​̳𝙗​̳𝙘​̳𝙙​̳𝙚​̳𝙛​̳𝙜​̳𝙝​̳𝙞​̳𝙟​̳𝙠​̳𝙡​̳𝙢​̳𝙣​̳𝙤​̳𝙥​̳𝙦​̳𝙧​̳𝙨​̳𝙩​̳𝙪​̳𝙫​̳𝙬​̳𝙭​̳𝙮​̳𝙯​̳ ̳☚" },

    // --- Zalgo (Static Approximation) ---
    { name: "Zalgo Static", trigger: "@zal", map: "A̘ͥB̌̔͛͜Ć̲͙̖͚D̶̢̪̄̿̅͐E̷̡̘̻͊ͫ̓̿F̗̗̪ͤ́͛̃̍҉̰G̷͇ͪ͐̆̄̆̿̉͟ͅH̶̛̞̯̭͎̬̅̃ͤ͂̀͡Į̛̹̗̥̝̭̍̋̐ͮ̀̕͢J̵̼̬̪̤͛̇͋̑̔͑̿̿͂͜͝Ķ̢͙̱̝̞͉̟̙̝͍̘̥̌̊̑͊L̶̺̭̥̦̬̳͎ͤ̾̀ͭ̌ͧ̈ͦͯ̚M̡̧͕̼͔͚̪͙͋̋̅ͫ͂̈́̓̒̚͠͡Ņ̛̝̯̱̞̦̞̠̮̰͉̏͛̋̊͐̈́̇̚̕Ơ̺̠͚̟͈̝̖̤͚͒̓̀̋̈́͆͌̚͜͜͠͠P̸̷̻̤̩̝̹͕̆̎̓̿́ͫͨ̐ͫ̉͌ͮ͌̊͡Q̸̡̲͎̼̰̖̰̭͈̳͕͍͆̓̓̊ͮ͛͒͌̑̈ͩR̶̷̶̥̼̱̰̿ͪ́͆̂ͦ̂̄ͯ́̉ͥ̕̕͘͟͝͝Ś̵͕̫̗̱̱̜̳̭ͫ̇̊̓͑ͦͯ̌̌̔ͮ̉̈̽͞͞Ť̛̥̟͙͕̳̹̳̟̝̠̟̠̀͛̍ͦ͑̒̂̔̌͘̚͟͟U̴̷̢̫̹͓̬̗̥ͣ̎͗̀͛̋͋ͤ̃͑ͨ̓͟͢͢͝͡͡͞V̨͔̻͚̠͉͕͕ͭ̔ͨ̈̀͛ͥ́̀̉ͩ̌͗ͦ̋͊̌̇͜͠W̷̢̨̡̡̤͔͓͉͍̬̤̲͔̦̜̱̉͆ͤͫ̀̅̈̃ͦͯ̚͘X̥͛҉̷̢͓̤̠͉̬̯̭̪̯̄̽͌ͨͥ̈́̾̆ͣ̃́̌ͩ͢͡ͅY̸̢̛̪̱̩̠͍̻̠͚̖͙̾́͊ͭ̆̊ͯ̌͒͗̃̂̿͋̀ͧ͢Z̶̶̴̢̠̰̳̠̫̯̲͚͓̜̺͉͓̱̯͂̆̉̄ͩ̉̍͛̐̾͞͡ą̷̧̛̮̣͇͔̩̝̻̬̹̥̲͕ͨ̑̈̇̔ͥ̓̇̍̋̇ͥ̕͟͞b̶̷̵̴̧̧̳̩̳̥̬͕̭̻͕͔̃͂ͤ͛ͭ̑̐̏̋̍̑̃̓̍ͩç̸̶̛̫̦͖̥͈̹̖̔̽̐̔̐̆̅̈̔͘̕͘̚͜͟͜͢͝͠͞ḑ̶̴̡̡͓͕̗͔̮̲̱̫̫̼̣̖̈̊̿̌͑̾̄͊͐̋̑̇ͮ̚e̶̴̴̡̛̜̯̘̞͍̣̩̣͚͙͋̄̔͊̾̐̐̀ͦͩ̊ͥ͋͛̐͠f̶̶̡̛̙͇͙̬̠̭̤͓͇͖͇̩̪̗̩̎̾̑ͧͧͩͭ̿̆͊ͣ̚g̩̲̤͙̻̼͙̯̱͎̫͙̣̥̈́̔̀ͨ͌͊͑́̐̈́ͬ̓͗̊ͪ̀͘ḩ̸̸̸̥̺͉̜̺̤̹͖̑ͧͤ̆ͨͭ̉̔̂̍̎̽̓̿ͦͮ͢͞͠i̧͖̗̼̘̫̥͉̦̞̦͇̫̖̎͒̇̉̔ͬͥͭͤ̋̚͜͟͡͡͠͝j̷̴̤̰͚̝̖̼̤̱̺͈͑̓̄̓͌͑̒̊̓͛̅́̅ͪ͆̕͞͠͡ḳ͚̗͎̰́̽̈́̏҉̴̵̵̡̨̢̞̙͔̱͇̘̲̽ͮͨ͋̓́ͅl̵̷̜͎̼̬͓̫̥͍̯̩̈́͐̓͆̿͐ͧ̈́́ͬ̄̑̽ͪ̅ͤ͢͝m̨̨̧͓͌̍͆͜҉̵̛͖͇͙͖̖͉̒̑̉ͮͥ͑͒ͧͬ̑̚͝n̸͔̪̤̻̬̰̬͕̓ͤ͂͛̑̈́̄̋ͅ҉͚̅ͩͪ͂͗ͩ̔ͩo̴̷̷̧͚̼̹̹̝̹̪̮͇͐́̐̅͑ͪͧ̍͐̓͊̕͜͠͞p̴̷̢̨̧̬̞̪͉̹̟͙͚͔ͩ̆̌̋̉ͦ̌̓̋̃̂ͣ͟q̹̠͕͎̟̜̇́̿́̒͑ͫͥ͊͐͑̆ͦ̍͊̿͑̚̚͟r̢̙͐͒̅́͠҉̘̘̜̥̭̬ͤͦ̈́̀͋ͧ̄͋͘͟͢ş̵̛͙̭̲̹͓͙̒̉ͮ̆ͪ̈̒̌̌̈́ͦͥͭ̚͟t̴̨̺̞̯̗̍̓͊͑ͬ́ͨ̉͑̍̍͋ͦ͑̕͢͠u̧̻͈̥̩̻͖ͧ̈́̑͋̋̐̈͑̔ͮ̒̊ͥ͠͡v̶̡̨̡͕̰̥̠͓̙͊̑̽͛̾̊͂̈́͜͝ͅw̷̵̧͈͙̦͉͓̮̙̯̠̆̊͊͆ͬ͠ͅx̸̶̷̢̛̞͔̼̅́̇͑͆̈́̂ͬ͐͘y̫̼͈͔̭̻̤͎̮͇͆̐̈́̓͂͠͡ẕ̴͙̳͇͓̒̊̎̅̉̔͒̈́͠͞" },

    // --- Final Batch: Missing Variations ---

    // Spongecase Variations
    { name: "Double Struck Spongecase", trigger: "@dssp", map: "𝕒𝔹𝕔𝔻𝕖𝔽𝕘ℍ𝕚𝕁𝕜𝕃𝕞ℕ𝕠ℙ𝕢ℝ𝕤𝕋𝕦𝕍𝕨𝕏𝕪ℤ𝕒𝔹𝕔𝔻𝕖𝔽𝕘ℍ𝕚𝕁𝕜𝕃𝕞ℕ𝕠ℙ𝕢ℝ𝕤𝕋𝕦𝕍𝕨𝕏𝕪ℤ" },

    // Strikethrough & Slash Variations
    { name: "Sans Strikethrough", trigger: "@ssst", map: "𝖠̶𝖡̶𝖢̶𝖣̶𝖤̶𝖥̶𝖦̶𝖧̶𝖨̶𝖩̶𝖪̶𝖫̶𝖬̶𝖭̶𝖮̶𝖯̶𝖰̶𝖱̶𝖲̶𝖳̶𝖴̶𝖵̶𝖶̶𝖷̶𝖸̶𝖹̶𝖺̶𝖻̶𝖼̶𝖽̶𝖾̶𝖿̶𝗀̶𝗁̶𝗂̶𝗃̶𝗄̶𝗅̶𝗆̶𝗇̶𝗈̶𝗉̶𝗊̶𝗋̶𝗌̶𝗍̶𝗎̶𝗏̶𝗐̶𝗑̶𝗒̶𝗓̶" },
    { name: "Sans Slash", trigger: "@sssl", map: "𝖠̷𝖡̷𝖢̷𝖣̷𝖤̷𝖥̷𝖦̷𝖧̷𝖨̷𝖩̷𝖪̷𝖫̷𝖬̷𝖭̷𝖮̷𝖯̷𝖰̷𝖱̷𝖲̷𝖳̷𝖴̷𝖵̷𝖶̷𝖷̷𝖸̷𝖹̷𝖺̷𝖻̷𝖼̷𝖽̷𝖾̷𝖿̷𝗀̷𝗁̷𝗂̷𝗃̷𝗄̷𝗅̷𝗆̷𝗇̷𝗈̷𝗉̷𝗊̷𝗋̷𝗌̷𝗍̷𝗎̷𝗏̷𝗐̷𝗑̷𝗒̷𝗓̷" },
    { name: "Normal Strikethrough", trigger: "@nst", map: "̶A̶B̶C̶D̶E̶F̶G̶H̶I̶J̶K̶L̶M̶N̶O̶P̶Q̶R̶S̶T̶U̶V̶W̶X̶Y̶Z̶a̶b̶c̶d̶e̶f̶g̶h̶i̶j̶k̶l̶m̶n̶o̶p̶q̶r̶s̶t̶u̶v̶w̶x̶y̶z̶" }, // Differs from existing @st? Existing maps char+strike. This looks same. Adding as alias/variant.

    // Complex Underlines
    { name: "Monospace Double Underline", trigger: "@mdu", map: "​̳𝙰​̳𝙱​̳𝙲​̳𝙳​̳𝙴​̳𝙵​̳𝙶​̳𝙷​̳𝙸​̳𝙹​̳𝙺​̳𝙻​̳𝙼​̳𝙽​̳𝙾​̳𝙿​̳𝚀​̳𝚁​̳𝚂​̳𝚃​̳𝚄​̳𝚅​̳𝚆​̳𝚇​̳𝚈​̳𝚉​̳𝚊​̳𝚋​̳𝚌​̳𝚍​̳𝚎​̳🏯​̳𝚐​̳𝚑​̳𝚒​̳𝚓​̳𝚔​̳𝚕​̳𝚖​̳𝚗​̳𝚘​̳𝚙​̳𝚚​̳𝚛​̳𝚜​̳𝚝​̳𝚞​̳𝚟​̳𝚠​̳𝚡​̳𝚢​̳𝚣​̳" },
    { name: "Sans Double Underline", trigger: "@sdu", map: "​̳𝖠​̳𝖡​̳𝖢​̳𝖣​̳𝖤​̳𝖥​̳𝖦​̳𝖧​̳𝖨​̳𝖩​̳𝖪​̳𝖫​̳𝖬​̳𝖭​̳𝖮​̳𝖯​̳𝖰​̳𝖱​̳𝖲​̳𝖳​̳𝖴​̳𝖵​̳𝖶​̳𝖷​̳𝖸​̳𝖹​̳𝖺​̳𝖻​̳𝖼​̳𝖽​̳𝖾​̳𝖿​̳𝗀​̳𝗁​̳𝗂​̳𝗃​̳𝗄​̳𝗅​̳𝗆​̳𝗇​̳𝗈​̳𝗉​̳𝗊​̳𝗋​̳𝗌​̳𝗍​̳𝗎​̳𝗏​̳𝗐​̳𝗑​̳𝗒​̳𝗓​̳" },
    { name: "Bold Italic Underline", trigger: "@biu", map: "𝘼̲𝘽̲𝘾̲𝘿̲𝙀̲𝙁̲𝙂̲𝙃̲𝙄̲𝙅̲𝙆̲𝙇̲𝙈̲𝙉̲𝙊̲𝙋̲𝙌̲𝙍̲𝙎̲𝙏̲𝙐̲𝙑̲𝙒̲𝙓̲𝙔̲𝙕̲𝙖̲𝙗̲𝙘̲𝙙̲𝙚̲𝙛̲𝙜̲𝙝̲𝙞̲𝙟̲𝙠̲𝙡̲𝙢̲𝙣̲𝙤̲𝙥̲𝙦̲𝙧̲𝙨̲𝙩̲𝙪̲𝙫̲𝙬̲𝙭̲𝙮̲𝙯̲" },
    { name: "Bold Italic Double Underline", trigger: "@bidu", map: "𝘼​̳𝘽​̳𝘾​̳𝘿​̳𝙀​̳𝙁​̳𝙂​̳𝙃​̳𝙄​̳𝙅​̳𝙆​̳𝙇​̳𝙈​̳𝙉​̳𝙊​̳𝙋​̳𝙌​̳𝙍​̳𝙎​̳𝙏​̳𝙐​̳𝙑​̳𝙒​̳𝙓​̳𝙔​̳𝙕​̳𝙖​̳𝙗​̳𝙘​̳𝙙​̳𝙚​̳𝙛​̳𝙜​̳𝙝​̳𝙞​̳𝙟​̳𝙠​̳𝙡​̳𝙢​̳𝙣​̳𝙤​̳𝙥​̳𝙦​̳𝙧​̳𝙨​̳𝙩​̳𝙪​̳𝙫​̳𝙬​̳𝙭​̳𝙮​̳𝙯​̳" },

    // Misc
    { name: "Upside Down Reversed", trigger: "@udr", map: "zʎxʍʌnʇsɹbdouɯlʞɾᴉɥƃɟǝpɔqɐZ⅄XMΛ∩┴SᴚỎԀONW˥ꓘſIHפℲƎᗡƆ𐐒∀" }, // Z->A map
    { name: "Upside Down", trigger: "@ud2", map: "ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz∀𐐒ƆᗡƎℲפHIſꓘ˥WNOԀỎᴚS┴∩ΛMX⅄Z" }, // A->z map

    // --- User Requested Additions (Batch 4) ---
    { name: "Zalgo Chaos", trigger: "@zlc", map: "A̷͙ͭͫ̕B̩͎͍̾ͅC̵͉͋̔͞D̶͔̭̪̻Ḛͭ̉̇͟F̘͍͖ͫ͘G̩̱ͩ̏͜Hͥ̽ͣ̃̔I̍̅̀̎̊J̶̳̀́̃K͕͓͌̎̾L̸̖̽̌͂M͉̅ͮ͒ͤN̺̻̔̆ͅO̖̼ͩ͌͐P̧͕̒̊͘Q̦̭̀̾͜R͉̜̎͡͠S̵̙͕̀̃T̨͈͗̌ͥU̠҉̷̙ͦV̘̪͆̂̅W̯ͤ̾ͣ͝X̵̹̬̄̽Ỵ̛̖͋͢Z̟̈́̆̉͜ā̤̓̍͘b̬͖̏́͢c͕͗ͤ̕̕ḑ̴̞͛̒ẹ̿͋̒̕f̵͖̜̉ͅĝ̽̓̀͑ḣ̖̻͛̓ỉ͔͖̜͌j̪̟̮̔ͩḳ̯͍̑ͦl̙͖̑̾ͣḿ̬̏ͤͅṇ̤͛̒̍o̯̱̊͊͢p̞̈͑̚͞q͉ͬ͋̇ͥr̴̨̦͕̝s̠҉͍͊ͅt̲̂̓ͩ̑ư̡͕̭̇v͒̄ͭ̏̇w̦̺̐̐͟x̛̘̠̹͋y҉̃̀̋̑z̼͙̓́ͭ" },
    { name: "Rando", trigger: "@rndm", map: "𝕒Ⓑｃ𝓭𝒆ғﻮĤίĴ𝓚ˡ𝓂几σק𝐐ᖇⓢｔยᐯⓦχ𝔂zⓐｂｃ∂𝐄𝕗𝓖Ｈเנ𝓀𝓛𝐌几𝕆𝕡𝐐ⓡѕт𝐮𝓋ｗχＹℤ" },
    { name: "Funky Bunch", trigger: "@fnk", map: "Ⱥβ↻ᎠƐƑƓǶįلҠꝈⱮហටφҨའϚͲԱỼచჯӋɀąҍçժҽƒցհìʝҟӀʍղօքզɾʂէմѵա×վՀ" },
    { name: "Bracket", trigger: "@brk", map: "【A】【B】【C】【D】【E】【F】【G】【H】【I】【J】【K】【L】【M】【N】【O】【P】【Q】【R】【S】【T】【U】【V】【W】【X】【Y】【Z】【a】【b】【c】【d】【e】【f】【g】【h】【i】【j】【k】【l】【m】【n】【o】【p】【q】【r】【s】【t】【u】【v】【w】【x】【y】【z】" },
    { name: "Freaky Friday", trigger: "@frk", map: "A҉B҉C҉D҉E҉F҉G҉H҉I҉J҉K҉L҉M҉N҉O҉P҉Q҉R҉S҉T҉U҉V҉W҉X҉Y҉Z҉a҉b҉c҉d҉e҉f҉g҉h҉i҉j҉k҉l҉m҉n҉o҉p҉q҉r҉s҉t҉u҉v҉w҉x҉y҉z҉" },
    { name: "Pound Cake", trigger: "@pnd", map: "ⱭƁƇƊҼƑƓӇӀJƘlⱮƝƠƤQRՏƬƲVⱲXƳȤąɓƈɗҽƒɠɦíᴊƙƖɱղօƥʠɾʂƭʋⱱⱳxყz" },
    { name: "Gawd Mode", trigger: "@gwd", map: "ƛƁƇƊЄƑƓӇƖʆƘԼMƝƠƤƢƦƧƬƲƔƜҲƳȤƛƁƇƊЄƑƓӇƖʆƘԼMƝƠƤƢƦƧƬƲƔƜҲƳȤ" },
    { name: "Quebec", trigger: "@que", map: "ᾋϐƇƉἝҒƓἬἿЈḰĿṂƝὋƤQȒṨҬȖVẂẊὛẔᾄвƈḋἔғʛђἷʝќłмᾗὄῥqʀṩҭὗvᾧẋẏẓ" },
    { name: "Spicy ABC", trigger: "@spc", map: "ABCDEFGHIJKLMNOPQRSTUVWXYZãbĉdêfĝĥĩĵklmñǿpqѓşţʉvŵxŷż" },
    { name: "Impression", trigger: "@imp", map: "Ⓐ̣̣̣Ⓑ̣̣̣Ⓒ̣̣̣Ⓓ̣̣̣Ⓔ̣̣̣Ⓕ̣̣̣Ⓖ̣̣̣Ⓗ̣̣̣Ⓘ̣̣̣Ⓙ̣̣̣Ⓚ̣̣̣Ⓛ̣̣̣Ⓜ̣̣̣Ⓝ̣̣̣Ⓞ̣̣̣Ⓟ̣̣̣Ⓠ̣̣̣Ⓡ̣̣̣Ⓢ̣̣̣Ⓣ̣̣̣Ⓤ̣̣̣Ⓥ̣̣̣Ⓦ̣̣̣Ⓧ̣̣̣Ⓨ̣̣̣Ⓩ̣̣̣ⓐ̣̣̣ⓑ̣̣̣ⓒ̣̣̣ⓓ̣̣̣ⓔ̣̣̣ⓕ̣̣̣ⓖ̣̣̣ⓗ̣̣̣ⓘ̣̣̣ⓙ̣̣̣ⓚ̣̣̣ⓛ̣̣̣ⓜ̣̣̣ⓝ̣̣̣ⓞ̣̣̣ⓟ̣̣̣ⓠ̣̣̣ⓡ̣̣̣ⓢ̣̣̣ⓣ̣̣̣ⓤ̣̣̣ⓥ̣̣̣ⓦ̣̣̣ⓧ̣̣̣ⓨ̣̣̣ⓩ̣̣̣" },
    { name: "Balloon", trigger: "@bal", map: "𝑨̲̅𝑩̲̅𝑪̲̅𝑫̲̅𝑬̲̅𝑭̲̅𝑮̲̅𝑯̲̅𝑰̲̅𝑱̲̅𝑲̲̅𝑳̲̅𝑴̲̅𝑵̲̅𝑶̲̅𝑷̲̅𝑸̲̅𝑹̲̅𝑺̲̅𝑻̲̅𝑼̲̅𝑽̲̅𝑾̲̅𝑿̲̅𝒀̲̅𝒁̲̅𝒂̲̅𝒃̲̅𝒄̲̅𝒅̲̅𝒆̲̅𝒇̲̅𝒈̲̅𝒉̲̅𝒊̲̅𝒋̲̅𝒌̲̅𝒍̲̅𝒎̲̅𝒏̲̅𝒐̲̅𝒑̲̅𝒒̲̅𝒓̲̅𝒔̲̅𝒕̲̅𝒖̲̅𝒗̲̅𝒘̲̅𝒙̲̅𝒚̲̅𝒛̲̅" },
    { name: "Undermine", trigger: "@und", map: "Ä̤̈B̤̈̈C̤̈̈D̤̈̈Ë̤̈F̤̈̈G̤̈̈Ḧ̤̈Ï̤̈J̤̈̈K̤̈̈L̤̈̈M̤̈̈N̤̈̈Ö̤̈P̤̈̈Q̤̈̈R̤̈̈S̤̈̈T̤̈̈Ṳ̈̈V̤̈̈Ẅ̤̈Ẍ̤̈Ÿ̤̈Z̤̈̈ä̤̈b̤̈̈c̤̈̈d̤̈̈ë̤̈f̤̈̈g̤̈̈ḧ̤̈ï̤̈j̤̈̈k̤̈̈l̤̈̈m̤̈̈n̤̈̈ö̤̈p̤̈̈q̤̈̈r̤̈̈s̤̈̈ẗ̤̈ṳ̈̈v̤̈̈ẅ̤̈ẍ̤̈ÿ̤̈z̤̈̈" },
    { name: "Bridge", trigger: "@bdg", map: "A͓B͓C͓D͓E͓F͓G͓H͓I͓J͓K͓L͓M͓N͓O͓P͓Q͓R͓S͓T͓U͓V͓W͓X͓Y͓Z͓a͓b͓c͓d͓e͓f͓g͓h͓i͓j͓k͓l͓m͓n͓o͓p͓q͓r͓s͓t͓u͓v͓w͓x͓y͓z͓" },
    { name: "X Axis", trigger: "@xax", map: "ABCDEFGHIJKLMNOPQRSTUVWXYZᾰ♭ḉᖱḙḟ❡ℏ!♩кℓՊℵ✺℘ǭԻṧтṳṽω✘⑂ℨ" },
    { name: "WiFi", trigger: "@wif", map: "ABCDEFGHIJKLMNOPQRSTUVWXYZαвcdeғɢнιjĸlмɴopqrѕтυvwхyz" },
    { name: "Short Caps", trigger: "@shc", map: "ABCDEFGHIJKLMNOPQRSTUVWXYZαв¢∂єƒgнιנкℓмησρqяѕтυνωχуz" },

    // --- User Requested Adds (Batch 5) ---
    { name: "Script Mix 2", trigger: "@scmx", map: "𝓐ẞCƊƐƑGԨｴﻞⲔԼᙏƝOƤQᎡS㆜𝓤ƲᗯⵋУƵαß𝓬ԃҽ⨍ցԋιʝƙɬ𝓶ɳσρգɾട𝜏ᥙʋɯχყ𐌶" },
    { name: "Asian Styled 2", trigger: "@zh2", map: "闩乃⼕ᗪ㠪千Ꮆ廾工丿长㇄爪𝓝龱尸Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙闩⻏⼕ᗪ🝗ﾁᎶ卄讠丿长㇄爪𝓝ㄖ尸Ɋ尺丂七ㄩᐯ山〤丫Ⲍ" },
    { name: "Coptic Styled", trigger: "@cop", map: "ⲀⲂⲤⲆⲈ𝓕𝓖ⲎⲒ𝓙Ⲕ𝓛ⲘⲚⲞⲢ𝓠ꞄϨⲦⴑ𝓥ⲰⲬⲨⲌⲁⲃⲥⲇⲉ𝓯𝓰ⲏⲓ𝓳ⲕ𝓵ⲙⲛⲟⲣ𝓺ꞅ𝛓ⲧ𐌵𝓿ⲱⲭⲩⲍ" },
    { name: "Ancient 2", trigger: "@anc2", map: "ᗩᗷᙅᗪᕮԲᎶᕼᓮＪ𐌊しⲘƝ〇ᑭႳᖇ⟆Ƭ⋃⋎ᙡⲬჄⲌᎯᑲ⊂ᖙ∈⨍ɢᏂ⫯Ｊⲕ𝘭ⲙﬡ𝖮ᕈᖳᖇ⟆𝜏υ𝓿𝈢ⲭႸⲍ" },
    { name: "Musical Mix", trigger: "@mus2", map: "ₐᵦ𝄴Dₑ𝆑GₕᵢⱼₖₗₘₙₒₚQᵣₛₜᵤᵥWₓY𝆎ₐᵦ𝄴dₑ𝆑gₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓy𝆎" },

    // --- Homoglyphs / Stealth ---
    { name: "Stealth", trigger: "@stl", map: "ABCDEFGHIJKLMNOPQRSTUVWXYZаbсԁеfġһіјκӏmոорզrʂtυvfxуʐ" },
    { name: "Accented Stealth", trigger: "@stla", map: "ABCDEFGHIJKLMNOPQRSTUVWXYZạbċɗẹfġhíʝkḷmnoọpqrstüѵwҳýż" },

    // --- User Requested Adds (Batch 6) ---
    { name: "Prohibited", trigger: "@pro", map: "A⃠B⃠C⃠D⃠E⃠F⃠G⃠H⃠I⃠J⃠K⃠L⃠M⃠N⃠O⃠P⃠Q⃠R⃠S⃠T⃠U⃠V⃠W⃠X⃠Y⃠Z⃠a⃠b⃠c⃠d⃠e⃠f⃠g⃠h⃠i⃠j⃠k⃠l⃠m⃠n⃠o⃠p⃠q⃠r⃠s⃠t⃠u⃠v⃠w⃠x⃠y⃠z⃠" },
    { name: "Horned", trigger: "@hrn", map: "A̛B̛C̛D̛E̛F̛G̛H̛I̛J̛K̛L̛M̛N̛ƠP̛Q̛R̛S̛T̛ƯV̛W̛X̛Y̛Z̛a̛b̛c̛d̛e̛f̛g̛h̛i̛j̛k̛l̛m̛n̛ơp̛q̛r̛s̛t̛ưv̛w̛x̛y̛z̛" },
    { name: "Mini Stacked", trigger: "@mstk", map: "AͣВⷡCͨDͩEͤFGнⷩIͥJᴋⷦLMⷨNOͦРⷬQRͬS͛ᴛⷮUͧVͮWXͯYZaͣвⷡcͨdͩeͤfghͪiͥjᴋⷦlmͫnoͦрⷬqrͬs͛ᴛⷮuͧvͮwxͯyz" },
    { name: "Latin Foreign", trigger: "@latm", map: "ÅßÇÐÈƒGHÌJKLMñÖÞQR§†µVWX¥Zåß¢ðêƒghïjklmñöþqr§†µvwx¥z" },
    { name: "Zalgo Distorted", trigger: "@zd1", map: "A͚̻̟B̝̠̘C͙̦̦D͕̞̫E̠̠̙F̢͚̝G͔͚̼H͓̝͓I̺͇͙J̞͓͎K̦̟͍L̟̦͍M͚͍̻N̝̝̪O̻͎͜P͕̟͇Q̢̦͚R̺͙S̙͉͜T̙̘͚U̢͉̦V̡̘͙W̺̞͓X͎̪͜Y͔͚͎Z͕̪̼a̘̼̼b̝̠c̪̻̪d͎͕͖e̘̘̪f̟̝͔g̠̪h̻̟i̞͙j̟͚̘k͕̫͜l̺̺̦m̪̘n͚̝o͙̘͉p̼̟͍q̼̙͕r͖̙͜s̢͇̺t̙̪͜u̢͍͉v̫̟w͔̼͜x̡̝̠y͍̝̟z̻͙͉" },
    { name: "Zalgo Creepy", trigger: "@zd2", map: "Ä́̾͝B͌͛̓Ć̓̔D̓̓Ë́̾̾F̐́G͊͋͆H͆͑Ḯ̚͘J̈́̀͘K̐͛̔L͆̓̒M̈́́͝N̿͘̚O͌͒͝P͐̓̓Q͛̓̕R̒̀̾S͋̐͝T̿͒̚U͒̾͠V̈́͘W̔̿͠X͑͌͠Y̽̽̕Ź̈́̈́a̐̾͋b̔̓͘c͑͐̾d͐̔̔ë́̿f̓͑͊g̒̓̚h̒̚i̐͘͘j̔͆͝k̿͐l͐̓m̓̈́͊n͒͐̕o͌͋̓p͒͌̽q͛͒̚r̈́̔͆s̈́͝t͆̓̈́u̓̕̚v͋͆̓w̐͐͠x̓̽̚y͑͊̾z͌͑̕" },
    { name: "Zalgo Noise", trigger: "@zd3", map: "Ä̴̝̪̺́̒̈́B̸̟͕̿̒͜͝C̴̡͎̦̒̾͆D̸͕̪̦͐̈́̈́E̴̡̻̦͊͋F̵̼͉̝͛̔͝G̴̘̺̟̿̾͘H̵͙̠̀̒͊I̴̦͇̻͋̿͝J̵͙͍͓̓̈́̚K̸̪͔͍̈́̾̒L̵̙̺̪̀͋̈́M̸̟͔͋̓̕N̵̢̪̫̈́́͘O̸͚̞̘̾͠P̵̺̼͔̀͐̽Q̴̞͇͖̒́R̸͖͚͍͊͌S̵͚͍̼̾̔͊T̵̡͎̦͐͌͘U̵̢͚̦͆̾͛V̵̦̞͆͒̔W̵͕̼͊͛͜͝X̵͎̠̝͛͛͝Y̸͖͉̞͒͐̚Z̵̘͎͇͆̈́͘a̴̟̼͆̀͜͠b̵̢͍̺͊̽̒c̴̫̫͐̈́d̴̘͔͎͑͌͝ë̸̪̙̘́͑̈́f̴͍̺̒͊͛g̸̠̙̺̽͝h̸͓̦͑̔̽i̸͕͓͓͋̚͝j̴̘͖͓̈́̐̚k̴͇̻͔̚͝͝l̵̢͕̫̀̿͝m̵̝̻͖̾̈́͝n̸̘̝͒͘͘o̴̢͎̓́͘p̴͉̟͎̈́̓́q̴̝͉͉̓̿͠r̵̡͎̼̐̕̕s̴̙͍͐͛͜͝t̴͇͉͕͛̒͠u̴͎͔̠͊͘v̴̫͉̞̾̒͠w̴͕̺͚̓̈́̈́x̴̠̝͖͋͊͐ÿ̸͍̝́̚͝z̵̡͙̙͊͒̀0̵̟͔̞̓́1̴̦͙͍̓͑̚2̴̞͕̫̀̐3̴͇̞̪̓̒͝4̸̟͓͍͊́̀5̵̞͉̪̈́̒͠6̴̙͚͍͛̿͘7̴̘͙̓̽͝8̸̢͓̾̾͆͜9̵͕͎̪͆͝" },

    // --- User Requested Adds (Batch 7) ---
    { name: "Cuneiform", trigger: "@cun", map: "𒀀𒁀𒂠𒁳𒂊𒃲𒄖𒄩𒄿𒅇𒆠𒇷𒈠𒉡𒋫𒉺𒆥𒊏𒋗𒋰𒌑𒍪𒉿𒌓𒐊𒍣𒀀𒁀𒂠𒁳𒂊𒃲𒄖𒄩𒄿𒅇𒆠𒇷𒈠𒉡𒋫𒉺𒆥𒊏𒋗𒋰𒌑𒍪𒉿𒌓" },
    { name: "Hieroglyphs", trigger: "@hgl", map: "𓂀𓃀𓎡𓂧𓇋𓄿𓎼𓉔𓇋𓆓𓎡𓃯𓅓𓈖𓍯𓏤𓏘𓂋𓋴𓏏𓅱𓆑𓅱𓏭𓇋𓊃𓂀𓃀𓎡𓂧𓇋𓄿𓎼𓉔𓇋𓆓𓎡𓃯𓅓𓈖𓍯𓏤𓏘𓂋𓋴𓏏𓅱𓆑𓅱𓏭" },
    { name: "Emoji Letters", trigger: "@eml", map: "🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿🇦🇧🇨🇩🇪🇫🇬🇭🇮🇯🇰🇱🇲🇳🇴🇵🇶🇷🇸🇹🇺🇻🇼🇽🇾🇿" },
    { name: "Squiggly 2", trigger: "@sq2", map: "ᗩᗷᑕᗪᗴᖴGᕼIᒍKᒪᗰᑎᓍᑭᑫᖇSTᑌᐯᗯ᙭YᘔᗩᗷᑕᗪᗴᖴGᕼIᒍKᒪᗰᑎᓍᑭᑫᖇSTᑌᐯᗯ᙭Yᘔ" },

    // --- User Requested Adds (Batch 8) ---
    { name: "Lydian", trigger: "@lyd", map: "𐤠ƁƇƊƸƑƓǶƖʝƘȴ𐒄ƝΘꝒꝖⱤⳜƬꓴƲⱲ𐊴ƳⱿ𐤠ƁƇƊƸƑƓǶƖʝƘȴ𐒄ƝΘꝒꝖⱤⳜƬꓴƲⱲ𐊴ƳⱿ" },
    { name: "Cyrillic Artsy", trigger: "@cyra", map: "ѦɃƇƊΣԲƓԊƗ𝗝ҠⱢⰏՈⰗꝒႳⱤꞨⲦⳘꝞꝠӾჄⲌѦɃƇƊΣԲƓԊƗ𝗝ҠⱢⰏՈⰗꝒႳⱤꞨⲦⳘꝞꝠӾჄⲌ" },
    { name: "Small Caps", trigger: "@scap", map: "\"\\ !#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴩꞯʀꜱᴛᴜᴠᴡxʏᴢ{|}~" },

    // --- User Requested Additions (Batch 10 - Technical) ---
    { name: "Fullwidth", trigger: "@fw", map: "\"＼　！＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；<＝>？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～" },
    { name: "Subscript", trigger: "@sub", map: "\"\\ !#$%&'₍₎*₊,₋./₀₁₂₃₄₅₆₇₈₉:;<₌>?@ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘ🇶ʀꜱᴛᴜᴠᴡxʏᴢ[]^_`ₐᵦ𝒸𝒹ₑ𝒻𝓰ₕᵢⱼₖₗₘₙₒₚᵩᵣₛₜᵤᵥ𝓌ₓᵧ𝓏{|}~" },
    { name: "Superscript Full", trigger: "@supf", map: "\"\\ !#$%&'⁽⁾*⁺,⁻./⁰¹²³⁴⁵⁶⁷⁸⁹:;<⁼>?@ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᵠᴿˢᵀᵁⱽᵂˣʸᶻ[]^_`ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ{|}~" }, // Full ASCII Superscript

    // --- User Requested Adds (Batch 9) ---
    { name: "Heavy", trigger: "@hvy", map: "ΛＢＣＤΞＦＧＨＩＪＫＬＭＮ♢ＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ" },
    { name: "Bent", trigger: "@bnt", map: "ᗩᗷᑢᕲᘿᖴᘜᕼᓰᒚᐸᒪᘻᘉᓍᕵᕴᖇSᖶᑘᐺᘺ᙭ᖻᗱᗩᗷᑢᕲᘿᖴᘜᕼᓰᒚᐸᒪᘻᘉᓍᕵᕴᖇSᖶᑘᐺᘺ᙭ᖻᗱ" },
    { name: "Fable", trigger: "@fbl", map: "ąცƈɖɛʄɠɧıʝƙƖɱŋơ℘զཞʂɬų۷ῳҳყʑąცƈɖɛʄɠɧıʝƙƖɱŋơ℘զཞʂɬų۷ῳҳყʑ" },
    { name: "Swirls", trigger: "@swr", map: "ค๖¢໓ēfງhiวkl๓ຖ໐p๑rŞtนงຟxฯຊค๖¢໓ēfງhiวkl๓ຖ໐p๑rŞtนงຟxฯຊ" },
    { name: "Rune", trigger: "@rune", map: "ልጌርዕቿቻኗዘጎጋጕረጠክዐየዒዪነፕሁሀሠሸሃጊልጌርዕቿቻኗዘጎጋጕረጠክዐየዒዪነፕሁሀሠሸሃጊ" },

    // --- Imported from font.py ---
    { name: "Symbols", trigger: "@sym", map: "ꍏ♭☾ᕲ€Ϝ❡♄♗♪ϰ↳ᗰ♫⊙ρᵠ☈∫†☋✓ω⌘⚧☡ꍏ♭☾ᕲ€Ϝ❡♄♗♪ϰ↳ᗰ♫⊙ρᵠ☈∫†☋✓ω⌘⚧☡" },
    { name: "Yi Standard", trigger: "@yi", map: "ꁲꃃꇃꂡꏹꄙꁍꀍꀤꀭꈵ꒒ꂵꋊꁏꉣꆰꋪꌚꋖꌈꃴꅐꋚꂖꁴꁲꃃꇃꂡꏹꄙꁍꀍꀤꀭꈵ꒒ꂵꋊꁏꉣꆰꋪꌚꋖꌈꃴꅐꋚꂖꁴ" },
    { name: "Greek Mix 2", trigger: "@gmx2", map: "ΔβĆĐ€₣ǤĦƗĴҜŁΜŇØƤΩŘŞŦỮVŴЖ¥ŽΔβĆĐ€₣ǤĦƗĴҜŁΜŇØƤΩŘŞŦỮVŴЖ¥Ž" },
    { name: "Cherokee 3", trigger: "@ch3", map: "ᎯᏰᏟᏍᏋ೯ⳒᏲᎥႰᏥႱᎷႶᏫᎮᎤᏒᎴᎿᏪᏉᏇ೫Ꮍ೩ᎯᏰᏟᏍᏋ೯ⳒᏲᎥႰᏥႱᎷႶᏫᎮᎤᏒᎴᎿᏪᏉᏇ೫Ꮍ೩" },
    { name: "Blurry", trigger: "@blr", map: "a͏b͏c͏d͏e͏f͏g͏h͏i͏j͏k͏l͏m͏n͏o͏p͏q͏r͏s͏t͏u͏v͏w͏x͏y͏z͏a͏b͏c͏d͏e͏f͏g͏h͏i͏j͏k͏l͏m͏n͏o͏p͏q͏r͏s͏t͏u͏v͏w͏x͏y͏z͏" }
];

fonts.push(...extraFonts);

// Duplicate to fill grid for demo purpose (In real app, we'd have unique ones)
while (fonts.length < 100) {
    const base = fonts[Math.floor(Math.random() * 15)]; // Pick from first few real ones
    fonts.push({
        name: `${base.name} ${fonts.length}`,
        trigger: `@${base.id}_${fonts.length}`,
        map: base.map
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Reorder: Move all "Bold" variants to the end of the list
    fonts.sort((a, b) => {
        const isBoldA = a.name.toLowerCase().includes("bold");
        const isBoldB = b.name.toLowerCase().includes("bold");

        if (isBoldA && !isBoldB) return 1;  // A is bold, B is not -> A goes after B
        if (!isBoldA && isBoldB) return -1; // B is bold, A is not -> A goes before B
        return 0; // Both are same category, keep original relative order
    });

    const fontGrid = document.getElementById('fontGrid');
    const loading = document.getElementById('loading');
    const searchInput = document.getElementById('searchInput');

    // Render Function
    function renderFonts(filter = "") {
        fontGrid.innerHTML = "";
        const lowerFilter = filter.toLowerCase();

        const filtered = fonts.filter(font =>
            font.name.toLowerCase().includes(lowerFilter) ||
            font.trigger.toLowerCase().includes(lowerFilter)
        );

        filtered.forEach(font => {
            const card = document.createElement('div');
            card.className = 'font-card animate-slide-up';

            // Create preview text (just "Hello world" or "Aido")
            // We need to map "Aido" using the font's mapping
            const previewText = applyMapping("Aido", font.map);

            card.innerHTML = `
                <div class="font-preview">${previewText}</div>
                <div class="font-name">${font.name}</div>
                <div class="font-trigger">${font.trigger}</div>
            `;

            const btn = document.createElement('button');
            btn.className = 'download-btn';
            btn.innerHTML = '<i class="ri-download-cloud-line"></i> Download';
            btn.onclick = () => downloadFont(font.name, font.trigger, font.map);

            card.appendChild(btn);
            fontGrid.appendChild(card);
        });

        if (loading) loading.style.display = 'none';
    }

    // Base alphabets
    const ORIGINAL_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const FULL_ASCII = "\"\\ !#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~"; // 95 chars (32-126)

    // Helper to map text
    function applyMapping(text, mappingStr) {
        // Determine source alphabet based on mapping length
        // Standard legacy maps are ~52 chars (or 62 with numbers appended in some old logic, though usually numbers were separate)
        // Full ASCII maps are ~95+ chars (due to unicode surrogates it might vary in length property, but > 80 is safe bet)
        // Using Array.from to count actual codepoints is safer.

        const targetArray = Array.from(mappingStr);
        let sourceArray;

        if (targetArray.length > 80) {
            // Assume Full ASCII mapping
            sourceArray = Array.from(FULL_ASCII);
        } else {
            // Assume Legacy A-Z a-z mapping
            sourceArray = Array.from(ORIGINAL_ALPHABET);
        }

        return Array.from(text).map(char => {
            const index = sourceArray.indexOf(char);
            if (index !== -1 && index < targetArray.length) {
                return targetArray[index];
            }
            return char;
        }).join('');
    }

    // Initial Render
    setTimeout(() => renderFonts(), 500); // Fake loading delay

    // Search Listener
    searchInput.addEventListener('input', (e) => {
        renderFonts(e.target.value);
    });

    // Global download function
    window.downloadFont = (name, trigger, mapped) => {
        const targetArray = Array.from(mapped);
        let sourceMap = ORIGINAL_ALPHABET;

        if (targetArray.length > 80) {
            sourceMap = FULL_ASCII;
        }

        const fileContent = `# Aido Font Format v1.0
name=${name}
trigger=${trigger}
preview=${applyMapping("Hello", mapped)}
mapping=${sourceMap}
mapped=${mapped}`;

        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        // Clean filename: remove spaces/special chars, ensure .aidofont extension
        const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        a.href = url;
        a.download = `${safeName}.aidofont`;

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        showToast(`Downloaded ${name}`);
    };

    function showToast(msg) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMsg');
        toastMsg.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
});
