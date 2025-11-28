const TelegramBot = require('node-telegram-bot-api');
const { Client } = require('ssh2'); // Gunakan SSH2
const { owner, ownerName, botName, token, photoURL, ADMIN_IDS } = require('./setting');
const path = require("path");
const fetch = require("node-fetch");
const axios = require("axios");
const { premiumUsers } = require('./database/premium.js');
const fs = require("fs-extra");
const setting = require('./setting.js')
let bot; // Instance bot

function isValidIP(ip) {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipRegex.test(ip);
}
  global.subdomain = { 
    "pterodactyl-panel.web.id": {
        zone: "d69feb7345d9e4dd5cfd7cce29e7d5b0",
        apitoken: "32zZwadzwc7qB4mzuDBJkk1xFyoQ2Grr27mAfJcB"
    },
    "storedigital.web.id": {
        zone: "2ce8a2f880534806e2f463e3eec68d31",
        apitoken: "v5_unJTqruXV_x-5uj0dT5_Q4QAPThJbXzC2MmOQ"
    },
    "storeid.my.id": {
        zone: "c651c828a01962eb3c530513c7ad7dcf",
        apitoken: "N-D6fN6la7jY0AnvbWn9FcU6ZHuDitmFXd-JF04g"
    },
    "store-panell.my.id": {
        zone: "0189ecfadb9cf2c4a311c0a3ec8f0d5c", 
        apitoken: "eVI-BXIXNEQtBqLpdvuitAR5nXC2bLj6jw365JPZ"
    }, 
    "xyro.web.id": {
        zone: "46d0cd33a7966f0be5afdab04b63e695", 
        apitoken: "CygwSHXRSfZnsi1qZmyB8s4qHC12jX_RR4mTpm62"
    }, 
    "xyroku.my.id": {
        zone: "f6d1a73a272e6e770a232c39979d5139", 
        apitoken: "0Mae_Rtx1ixGYenzFcNG9bbPd-rWjoRwqN2tvNzo"
    }, 
    "mafiapnel.my.id": {
     zone: "34e28e0546feabb87c023f456ef033bf", 
     apitoken: "bHNaEBwaVSdNklVFzPSkSegxOd9OtKzWtY7P9Zwt"
    },
    "gacorr.biz.id": {
        zone: "cff22ce1965394f1992c8dba4c3db539",
        apitoken: "v9kYfj5g2lcacvBaJHA_HRgNqBi9UlsVy0cm_EhT"
    },
    "cafee.my.id": {
        zone: "0d7044fc3e0d66189724952fa3b850ce", 
        apitoken: "wAOEzAfvb-L3vKYE2Xg8svJpHfNS_u2noWSReSzJ"
    }, 
    "pterodaytl.my.id": {
        zone: "828ef14600aaaa0b1ea881dd0e7972b2",
        apitoken: "75HrVBzSVObD611RkuNS1ZKsL5A_b8kuiCs26-f9"
    }
};
const log = (message, error = null) => {
  const timestamp = new Date().toISOString().replace("T", " ").replace("Z", "");
  const prefix = `\x1b[36m[ SYAHV2DOFFC ]\x1b[0m`;
  const timeStyle = `\x1b[33m[${timestamp}]\x1b[0m`;
  const msgStyle = `\x1b[32m${message}\x1b[0m`;
  console.log(`${prefix} ${timeStyle} ${msgStyle}`);
  if (error) {
    const errorStyle = `\x1b[31m✖ Error: ${error.message || error}\x1b[0m`;
    console.error(`${prefix} ${timeStyle} ${errorStyle}`);
    if (error.stack) console.error(`\x1b[90m${error.stack}\x1b[0m`);
  }
};

function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify([...users], null, 2));
  } catch (error) {
    log("Gagal menyimpan pengguna ke JSON", error);
  }
}

const users = [];
const userData = {};

function example() {
  return "Contoh penggunaan: /installpanel ip|password|domainpanel|domainnode|ramserver";
}

function setBotInstance(botInstance) {
  bot = botInstance;
  
const loadData = (file) => { try { return fs.readJsonSync(path.join(dataDir, file)); } catch { return []; } };
const saveData = (file, data) => { fs.writeJsonSync(path.join(dataDir, file), data, { spaces: 2 }); };

const dataDir = path.join(__dirname, 'data');
const dataFiles = ['users.json'];
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
for (const f of dataFiles) {
  const filePath = path.join(dataDir, f);
  if (!fs.existsSync(filePath)) fs.writeJsonSync(filePath, []);
  else if (fs.readFileSync(filePath, 'utf8').trim() === '') fs.writeJsonSync(filePath, []);
}

function loadJsonData(filename) {
    try {
        const filePath = path.resolve(filename)
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf8")
            return JSON.parse(data)
        }
    } catch (error) {
        console.error(`Error loading ${filename}:`, error)
    }
    return []
}
const OWNER_ID = setting.owner;
// ─── /menu ───────────────────────────────
bot.onText(/^\/start$/, async (msg) => {
  const chatId = msg.chat.id;  // Definisi chatId
  const menuText = `
<blockquote>╭─────( 𝙋𝙍𝙊𝙏𝙀𝘾𝙏 𝙎𝙏𝘼𝙍𝙏 )─────────╮
│友 ɴᴀᴍᴇ ʙᴏᴛ : ᴘʀᴏᴛᴇᴄᴛ ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ
│友 ᴠᴇʀsɪᴏɴ : 4.0 ᴠɪᴘ
│友 ᴅᴇᴠᴇʟᴏᴘᴇʀ  : @syahv2doffc
│友 ᴏᴡɴᴇʀ : @syahv2doffc
│友 ɪɴғᴏʀᴍᴀᴛɪᴏɴ : t.me/syahv2doffctesti
╰─────────────────────╯</blockquote>
<blockquote>╭────────( 𝙐𝙨𝙚𝙧 )────────╮
│⻆ ᴜsᴇʀ : ${chatId}👋
╰─────────────────────╯</blockquote>
<blockquote>反暴動 エラーになりたくないなら、誤用しないでください
sᴇʟʟᴇᴄᴛ ʙᴜᴛᴛᴏɴ ᴘʟᴇᴀsᴇ</blockquote>
  `;  // Teks caption untuk menu
  
  const keyboard = {
    parse_mode: "HTML",
    reply_to_message_id: msg.message_id,
    reply_markup: {
      inline_keyboard: [
        [
          { text: "⿻ ᴄᴠᴘs ᴍᴇɴᴜ", callback_data: "cvpsmenu" },
          { text: "⿻ ᴘʀᴏᴛᴇᴄᴛ ᴍᴇɴᴜ", callback_data: "protectmenu" },
        ],
        [
          { text: "ᴍᴀᴋᴀsɪʜ ᴅᴇᴠᴇʟᴏᴘᴇʀ", callback_data: "tqto" },
          { text: "ᴏᴡɴᴇʀ ᴍᴇɴᴜ", callback_data: "ownermenu" }
        ],
        [
          { text: "ʙᴜʏ ꜱᴄʀɪᴘᴛ syah", url: "t.me/syahv2doffc" }
        ]
      ],
    },
  };
  
  bot.sendPhoto(chatId, photoURL, {
    caption: menuText,
    ...keyboard
  });
  
  if (fs.existsSync('./database/Musik.mp3')) {
    bot.sendAudio(chatId, "./database/Musik.mp3", {
      title: "SYAHV2DOFFC",
      performer: "SYAHV2DOFFC"
    });
  } else {
    bot.sendMessage(chatId, "❌ Audio file tidak ditemukan. Pastikan file 'Musik.mp3' ada di direktori bot.");
  }
});


bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;

  // Handler untuk "protectmenu"
  if (data === "protectmenu") {
    bot.answerCallbackQuery(callbackQuery.id);
    const text = `<blockquote>╭──✧ <b>ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ</b> ✧
│ ⪼ Version : 4.0
│ ⪼ Owner : @syahv2doffc
│ ⪼ Language : JavaScript
╰────────────⧽

╭──✧ <b>ᴍᴇɴᴜ ᴘʀᴇᴍɪᴜᴍ</b> ✧
│ ⪼ /ɪɴsᴛᴀʟʟᴘʀᴏᴛᴇᴄᴛᴀʟʟ ipvps|pwvps
│ ⪼ /ᴜɴɪɴsᴛᴀʟʟᴛᴇᴍᴀ (ᴜɴᴛᴜᴋ ᴜɴɪɴsᴛᴀʟʟᴘʀᴏᴛᴇᴄᴛ+ᴛᴇᴍᴀ) 
╰────────────⧽
</blockquote>`;

    bot.editMessageCaption(text, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "ᴍᴀᴋᴀsɪʜ ᴅᴇᴠᴇʟᴏᴘᴇʀ", callback_data: "tqto" },
            { text: "<<", callback_data: "back" },
          ],
          [{ text: "ᴏᴡɴᴇʀ ᴍᴇɴᴜ", callback_data: "ownermenu" }],
          [{ text: "ᴜɴᴘʀᴏᴛᴇᴄᴛ ᴍᴇɴᴜ", callback_data: "unprotect" }],
        ],
      },
    });
  }

  // Handler untuk "unprotect"
  else if (data === "cvpsmenu") {
    bot.answerCallbackQuery(callbackQuery.id);
    const text = `<blockquote>╭──✧ <b>ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ</b> ✧
│ ⪼ Version : 4.0
│ ⪼ Owner : @syahv2doffc
│ ⪼ Language : JavaScript
╰────────────⧽

╭──✧ <b>ᴏᴡɴᴇʀ ᴘʀɪᴠᴀᴛᴇ</b> ✧
│ ⪼ /ᴄᴠᴘs
│ ⪼ /ᴄᴇᴋɪᴘ
│ ⪼ /ᴅᴇʟᴠᴘs
│ ⪼ /ɪɴsᴛᴀʟʟᴘᴀɴᴇʟ
│ ⪼ /ᴜɴɪɴsᴛᴀʟʟᴘᴀɴᴇʟ
│ ⪼ /sᴡɪɴɢs
│ ⪼ /sᴜʙᴅᴏ
│ ⪼ /ʟɪsᴛsᴜʙᴅᴏ
│ ⪼ /sᴇᴛᴘᴡᴠᴘs
│ ⪼ /ʜʙᴘᴀɴᴇʟ
╰────────────
</blockquote>`;

    bot.editMessageCaption(text, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "<<", callback_data: "back" },
            { text: "⿻ ᴍᴀᴋᴀsɪʜ ᴅᴇᴠ", callback_data: "tqto" },
          ],
          [{ text: "ᴏᴡɴᴇʀ ᴍᴇɴᴜ", callback_data: "ownermenu" }],
        ],
      },
    });
  }

  // Handler untuk "ownermenu"
  else if (data === "ownermenu") {
    bot.answerCallbackQuery(callbackQuery.id);
    const text = `<blockquote>┌─⧼ <b>ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ</b> ⧽
├ ⬡ Version : 4.0
├ ⬡ Owner : @syahv2doffc
├ ⬡ Language : JavaScript
╰─────────────

┌─⧼ ᴏᴡɴᴇʀ ᴍᴇɴᴜ ⧽
├ /ᴀᴅᴅᴀᴅᴍɪɴ
├ /ᴅᴇʟᴀᴅᴍɪɴ
├ /ʟɪsᴛᴀᴅᴍɪɴ
╰─────────────
</blockquote>`;

    bot.editMessageCaption(text, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "⿻ ᴘʀᴏᴛᴇᴄᴛ ᴍᴇɴᴜ", callback_data: "protectmenu" },
            { text: "⿻ ᴄᴠᴘs ᴍᴇɴᴜ", callback_data: "cvpsmenu" },
          ],
          [{ text: "<<", callback_data: "back" }],
          [{ text: "ᴍᴀᴋᴀsɪʜ ᴅᴇᴠᴇʟᴏᴘᴇʀ", callback_data: "tqto" }],
        ],
      },
    });
  }


  else if (data === "tqto") {
    bot.answerCallbackQuery(callbackQuery.id);
    const text = `<blockquote>╭──✧ <b>ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ</b> ✧
│ ⪼ Version : 4.0
│ ⪼ Owner : @syahv2doffc
│ ⪼ Language : JavaScript
╰────────────⧽

╭──✧ ᴍᴀᴋᴀsɪʜ ᴅᴇᴠᴇʟᴏᴘᴇʀ ᴀɴᴅ sᴜᴘᴘᴏʀᴛ ✧
│ ⪼ ᴀʟʟᴀʜ ɪs ᴛʜᴇ ʙᴇsᴛ ɢᴏᴅ
│ ⪼ ᴋᴇɴɴʏ ʜᴏsᴛɪɴɢ
│ ⪼ @syahv2doffc
╰────────────
</blockquote>`;

    bot.editMessageCaption(text, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "<<", callback_data: "back" },
            { text: "⿻ ᴘʀᴏᴛᴇᴄᴛ ᴍᴇɴᴜ", callback_data: "protectmenu" },
          ],
          [{ text: "ᴏᴡɴᴇʀ ᴍᴇɴᴜ", callback_data: "ownermenu" }],
        ],
      },
    });
  }
});

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;
  // Handler untuk "back"
  if (data === "back") {
    await bot.answerCallbackQuery(callbackQuery.id);

    const text = `<blockquote>╭─────( 𝙋𝙍𝙊𝙏𝙀𝘾𝙏 𝙎𝙏𝘼𝙍𝙏 )─────────╮
│友 ɴᴀᴍᴇ ʙᴏᴛ : ᴘʀᴏᴛᴇᴄᴛ ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ
│友 ᴠᴇʀsɪᴏɴ : 4.0 ᴠɪᴘ
│友 ᴅᴇᴠᴇʟᴏᴘᴇʀ  : @syahv2doffc
│友 ᴏᴡɴᴇʀ : @syahv2doffc
│友 ɪɴғᴏʀᴍᴀᴛɪᴏɴ : t.me/syahv2doffctesti
╰─────────────────────╯</blockquote>
<blockquote>╭────────( 𝙐𝙨𝙚𝙧 )────────╮
│⻆ ᴜsᴇʀ : ${chatId}👋
╰─────────────────────╯</blockquote>
<blockquote>反暴動 エラーになりたくないなら、誤用しないでください
sᴇʟʟᴇᴄᴛ ʙᴜᴛᴛᴏɴ ᴘʟᴇᴀsᴇ</blockquote>`;

    const keyboard = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "⿻ ᴄᴠᴘs ᴍᴇɴᴜ", callback_data: "cvpsmenu" },
            { text: "⿻ ᴘʀᴏᴛᴇᴄᴛ ᴍᴇɴᴜ", callback_data: "protectmenu" },
          ],
          [
            { text: "ᴍᴀᴋᴀsɪʜ ᴅᴇᴠᴇʟᴏᴘᴇʀ", callback_data: "tqto" },
            { text: "ᴏᴡɴᴇʀ ᴍᴇɴᴜ", callback_data: "ownermenu" },
          ],
          [
            { text: "ʙᴜʏ ꜱᴄʀɪᴘᴛ syah", url: "https://t.me/syahv2doffc" },
          ],
        ],
      },
    };

    // Kirim foto utama dengan caption dan tombol
    await bot.sendPhoto(chatId, photoURL, {
      caption: text,
      parse_mode: "HTML",
      ...keyboard,
    });

    // Kirim musik jika tersedia
    if (fs.existsSync("./database/Musik.mp3")) {
      await bot.sendAudio(chatId, "./database/Musik.mp3", {
        title: "SYAHV2DOFFC",
        performer: "SYAHV2DOFFC",
      });
    } else {
      await bot.sendMessage(
        chatId,
        "❌ Audio file tidak ditemukan. Pastikan file 'Musik.mp3' ada di direktori bot."
      );
    }
  }
});

  // ─── /fiturpremium ───────────────────────
  bot.onText(/^\/fiturpremium$/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!premiumUsers.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Kamu bukan user premium!');
    }

    bot.sendMessage(chatId, '✨ Selamat datang di fitur *Premium Eksklusif*!', { parse_mode: 'Markdown' });
  });
//========
bot.onText(/\/addadmin (\d+)/, async (msg, match) => {
  const senderId = msg.from.id;
  const newAdminId = Number(match[1]);

  if (!OWNER_ID.includes(senderId))
    return bot.sendMessage(senderId, "❌ Kamu tidak punya izin menambah admin.");

  if (setting.ADMIN_IDS.includes(newAdminId))
    return bot.sendMessage(senderId, "⚠️ User ini sudah menjadi admin.");

  setting.ADMIN_IDS.push(newAdminId);

  // Simpan ke config.js
  const configPath = path.join(__dirname, "setting.js");
  const updatedConfig = `export default ${JSON.stringify(setting, null, 2)};\n`;
  fs.writeFileSync(configPath, updatedConfig, "utf8");

  await bot.sendMessage(senderId, `✅ Admin baru berhasil ditambahkan!\n👤 ID: <code>${newAdminId}</code>`, { parse_mode: "HTML" });

  try {
    await bot.sendMessage(newAdminId, `🎉 Kamu telah ditambahkan sebagai *Admin* oleh <b>${msg.from.first_name}</b>.`, { parse_mode: "HTML" });
  } catch (err) {
    console.log("Gagal kirim notifikasi ke admin baru:", err.message);
  }
});

// === /deladmin <user_id> ===
bot.onText(/\/deladmin (\d+)/, async (msg, match) => {
  const senderId = msg.from.id;
  const targetId = Number(match[1]);

  if (!OWNER_ID.includes(senderId))
    return bot.sendMessage(senderId, "❌ Kamu tidak punya izin menghapus admin.");

  if (!setting.ADMIN_IDS.includes(targetId))
    return bot.sendMessage(senderId, "⚠️ User ini bukan admin.");

  setting.ADMIN_IDS = premiumUsers.filter(id => id !== targetId);

  // Simpan ke config.js
  const configPath = path.join(__dirname, "setting.js");
  const updatedConfig = `export default ${JSON.stringify(setting, null, 2)};\n`;
  fs.writeFileSync(configPath, updatedConfig, "utf8");

  await bot.sendMessage(senderId, `🗑️ Admin dengan ID <code>${targetId}</code> berhasil dihapus.`, { parse_mode: "HTML" });

  try {
    await bot.sendMessage(targetId, `⚠️ Kamu telah dihapus dari daftar *Admin Bot*.`, { parse_mode: "HTML" });
  } catch (err) {
    console.log("Gagal kirim notifikasi ke user:", err.message);
  }
});
bot.onText(/\/listadmin/, async (msg) => {
  const userId = msg.from.id;
  if (!OWNER_ID.includes(userId))
    return bot.sendMessage(userId, "❌ Hanya admin yang bisa melihat daftar admin.");

  if (!setting.ADMIN_IDS.length)
    return bot.sendMessage(userId, "📭 Belum ada admin yang terdaftar.");

  let text = "👑 <b>Daftar Admin Aktif:</b>\n";
  for (const id of setting.ADMIN_IDS) {
    text += `• <code>${id}</code>\n`;
  }

  await bot.sendMessage(userId, text, { parse_mode: "HTML" });
});
//addprem
bot.onText(/\/addprem (\d+)/, async (msg, match) => {
  const senderId = msg.from.id;
  const newAdminId = Number(match[1]);

  if (!OWNER_ID.includes(senderId))
    return bot.sendMessage(senderId, "❌ Kamu tidak punya izin menambah admin.");

  if (setting.PREM_IDS.includes(newAdminId))
    return bot.sendMessage(senderId, "⚠️ User ini sudah menjadi admin.");

  setting.PREM_IDS.push(newAdminId);

  // Simpan ke config.js
  const configPath = path.join(__dirname, "setting.js");
  const updatedConfig = `export default ${JSON.stringify(setting, null, 2)};\n`;
  fs.writeFileSync(configPath, updatedConfig, "utf8");

  await bot.sendMessage(senderId, `✅ Admin baru berhasil ditambahkan!\n👤 ID: <code>${newAdminId}</code>`, { parse_mode: "HTML" });

  try {
    await bot.sendMessage(newAdminId, `🎉 Kamu telah ditambahkan sebagai *Admin* oleh <b>${msg.from.first_name}</b>.`, { parse_mode: "HTML" });
  } catch (err) {
    console.log("Gagal kirim notifikasi ke admin baru:", err.message);
  }
});

// === /deladmin <user_id> ===
bot.onText(/\/delprem (\d+)/, async (msg, match) => {
  const senderId = msg.from.id;
  const targetId = Number(match[1]);

  if (!OWNER_ID.includes(senderId))
    return bot.sendMessage(senderId, "❌ Kamu tidak punya izin menghapus admin.");

  if (!setting.PREM_IDS.includes(targetId))
    return bot.sendMessage(senderId, "⚠️ User ini bukan admin.");

  setting.PREM_IDS = premiumUsers.filter(id => id !== targetId);

  // Simpan ke config.js
  const configPath = path.join(__dirname, "setting.js");
  const updatedConfig = `export default ${JSON.stringify(setting, null, 2)};\n`;
  fs.writeFileSync(configPath, updatedConfig, "utf8");

  await bot.sendMessage(senderId, `🗑️ Admin dengan ID <code>${targetId}</code> berhasil dihapus.`, { parse_mode: "HTML" });

  try {
    await bot.sendMessage(targetId, `⚠️ Kamu telah dihapus dari daftar *Admin Bot*.`, { parse_mode: "HTML" });
  } catch (err) {
    console.log("Gagal kirim notifikasi ke user:", err.message);
  }
});

bot.onText(/\/listprem/, async (msg) => {
  const userId = msg.from.id;
  if (!OWNER_ID.includes(userId))
    return bot.sendMessage(userId, "❌ Hanya admin yang bisa melihat daftar admin.");

  if (!setting.PREM_IDS.length)
    return bot.sendMessage(userId, "📭 Belum ada admin yang terdaftar.");

  let text = "👑 <b>Daftar Admin Aktif:</b>\n";
  for (const id of PREMIUM_FILE) {
    text += `• <code>${id}</code>\n`;
  }

  await bot.sendMessage(userId, text, { parse_mode: "HTML" });
});

bot.onText(/\/broadcast/, async (msg) => {
  const adminId = msg.from.id;
  if (!OWNER_ID.includes(adminId)) return bot.sendMessage(adminId,"❌ Tidak punya izin.");
  const reply = msg.reply_to_message;
  if(!reply) return bot.sendMessage(adminId,"📌 Reply pesan untuk broadcast.");

  const users = loadData("users.json");
  if (!users.length) return bot.sendMessage(adminId,"📭 Belum ada user terdaftar.");

  const totalBlocks = 10; // bar compact
  const blockFull = '▰';
  const blockEmpty = '▱';
  let success = 0;

  // Kirim initial progress message
  let progressMsg = await bot.sendMessage(adminId, `🚀 Broadcast ke ${users.length} pengguna...\n[${blockEmpty.repeat(totalBlocks)}] 0%\n✅ Sukses: 0 | ❌ Gagal: 0`);

  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    try {
      // Kirim pesan sesuai tipe
      if(reply.text) await bot.sendMessage(u.id, reply.text);
      else if(reply.photo) await bot.sendPhoto(u.id, reply.photo.slice(-1)[0].file_id, { caption: reply.caption||"" });
      else if(reply.video) await bot.sendVideo(u.id, reply.video.file_id, { caption: reply.caption||"" });
      else if(reply.document) await bot.sendDocument(u.id, reply.document.file_id, { caption: reply.caption||"" });
      success++;
    } catch(e){ console.log(`❌ Gagal kirim ke ${u.id}: ${e.message}`); }

    // update smooth progress bar
    const percent = Math.floor(((i+1)/users.length)*100);
    const blocks = Math.floor((percent/100)*totalBlocks);
    const bar = blockFull.repeat(blocks) + blockEmpty.repeat(totalBlocks - blocks);

    await bot.editMessageText(`🚀 Broadcast ke ${users.length} pengguna...\n[${bar}] ${percent}%\n✅ Sukses: ${success} | ❌ Gagal: ${i+1-success}`, {
      chat_id: adminId,
      message_id: progressMsg.message_id
    });

    await new Promise(r => setTimeout(r, 30)); // smooth delay
  }

  // hasil akhir
  await bot.editMessageText(
    `🎯 Broadcast Selesai!\n────────────────────────\n📤 Total Pengguna: ${users.length}\n✅ Berhasil: ${success}\n❌ Gagal: ${users.length - success}\n────────────────────────\n💎 Terima kasih telah menggunakan bot premium!`,
    { chat_id: adminId, message_id: progressMsg.message_id }
  );
});
// TOOLS MENU
bot.onText(/\/iqc(.+)?/, async (msg, match) => {
  const chatId = msg.chat.id;
    
  const text = match[1] ? match[1].trim() : '';

  if (!text) {
    return bot.sendMessage(chatId, '❌ Format Salah: /iqc jam|batre|carrier|pesan\nContoh: /iqc 18:00|40|Indosat|hai hai', {
      reply_to_message_id: msg.message_id
    });
  }

  const parts = text.split('|');
  if (parts.length < 4) {
    return bot.sendMessage(chatId, '❌ Format salah! Gunakan:\n/iqc jam|batre|carrier|pesan\nContoh:\n/iqc 18:00|40|Indosat|hai hai', {
      reply_to_message_id: msg.message_id
    });
  }

  const time = parts[0].trim();
  const battery = parts[1].trim();
  const carrier = parts[2].trim();
  const messageParts = parts.slice(3);
  const messageText = messageParts.join('|').trim();

  if (!time || !battery || !carrier || !messageText) {
    return bot.sendMessage(chatId, '⚠️ Format salah! Pastikan semua field terisi:\n/iqc jam|batre|carrier|pesan', {
      reply_to_message_id: msg.message_id
    });
  }

  const waitingMsg = await bot.sendMessage(chatId, '⏳', {
    reply_to_message_id: msg.message_id
  });

  try {
    const encodedTime = encodeURIComponent(time);
    const encodedCarrier = encodeURIComponent(carrier);
    const encodedMessage = encodeURIComponent(messageText);
    
    const url = `https://brat.siputzx.my.id/iphone-quoted?time=${encodedTime}&batteryPercentage=${battery}&carrierName=${encodedCarrier}&messageText=${encodedMessage}&emojiStyle=apple`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await bot.sendPhoto(chatId, buffer, {
      caption: `✅ *ꜱᴜᴋꜱᴇꜱ ʙᴀɴɢ*`,
      parse_mode: 'Markdown',
      reply_to_message_id: msg.message_id
    });

    await bot.deleteMessage(chatId, waitingMsg.message_id);

  } catch (error) {
    console.error('Error:', error);
    
    await bot.deleteMessage(chatId, waitingMsg.message_id);
    
    await bot.sendMessage(chatId, '❌ Terjadi kesalahan, Coba lagi!', {
      reply_to_message_id: msg.message_id
    });
  }
});

bot.onText(/^\/brat(?: (.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const users = loadData("users.json");
  const argsRaw = match[1];

  if (!argsRaw) {
    return bot.sendMessage(chatId, 'Format: /brat <teks> [--gif] [--delay=500]');
  }

  try {
    const args = argsRaw.split(' ');

    const textParts = [];
    let isAnimated = false;
    let delay = 500;

    for (let arg of args) {
      if (arg === '--gif') isAnimated = true;
      else if (arg.startsWith('--delay=')) {
        const val = parseInt(arg.split('=')[1]);
        if (!isNaN(val)) delay = val;
      } else {
        textParts.push(arg);
      }
    }

    const text = textParts.join(' ');
    if (!text) {
      return bot.sendMessage(chatId, 'Teks tidak boleh kosong!');
    }

    if (isAnimated && (delay < 100 || delay > 1500)) {
      return bot.sendMessage(chatId, 'Delay harus antara 100–1500 ms.');
    }

    await bot.sendMessage(chatId, '⏳ ᴍᴇᴍʙᴜᴀᴛ sᴛɪᴄᴋᴇʀ ʙʀᴀᴛ...');

    const apiUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isAnimated=${isAnimated}&delay=${delay}`;
    const response = await axios.get(apiUrl, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(response.data);

    await bot.sendSticker(chatId, buffer);
  } catch (error) {
    console.error('❌ Error brat:', error.message);
    bot.sendMessage(chatId, 'Gagal membuat stiker brat. Coba lagi nanti ya!');
  }
});

bot.onText(/\/cekid/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const users = loadData("users.json");
  try {
    const userProfilePhotos = await bot.getUserProfilePhotos(userId, { limit: 1 });
    const username = msg.from.username || "-";
    const firstName = msg.from.first_name || "-";
    const lastName = msg.from.last_name || "-";
    const fullName = `${firstName} ${lastName}`.trim();

    let photoFileId = null;
    if(userProfilePhotos.total_count > 0) {
      photoFileId = userProfilePhotos.photos[0][0].file_id;
    }

    // --- Teks info premium ---
    const text = `
📝 *INFO DETAIL KAMU*
────────────────────────
👤 Nama: ${fullName}
🆔 ID: \`${userId}\`  
💻 Username: @${username}
────────────────────────
`;

    // Tombol inline BOT GACHA
    const replyMarkup = {
      inline_keyboard: [
        [{ text: "OWNER", url: "https://t.me/syahv2doffc" }]
      ]
    };

    if(photoFileId) {
      await bot.sendPhoto(chatId, photoFileId, { caption: text, parse_mode: "Markdown", reply_markup: replyMarkup });
    } else {
      await bot.sendMessage(chatId, text, { parse_mode: "Markdown", reply_markup: replyMarkup });
    }

  } catch {
    await safeSendMessage(chatId, "❌ Terjadi kesalahan saat cek ID.");
  }
});

bot.onText(/^\/stalkig(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const username = match[1];
  const users = loadData("users.json");
  if (!username) {
    return bot.sendMessage(chatId, "⚠️ Masukkan username IG!\nContoh: /stalkig google");
  }
    
  bot.sendMessage(chatId, '⏳', {
    reply_to_message_id: msg.message_id
  });

  try {
    const apiUrl = `https://api.siputzx.my.id/api/stalk/instagram?username=${encodeURIComponent(username)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.status) {
      return bot.sendMessage(chatId, "❌ User tidak ditemukan!");
    }

    const data = json.data;

    let caption = `✦ Instagram Stalker ✦

⤷ ɴᴀᴍᴀ: ${data.full_name || "Kosong"}
⤷ ᴜꜱᴇʀɴᴀᴍᴇ: ${data.username}
⤷ ʙɪᴏ: ${data.biography || "Kosong"}
⤷ ʟɪɴᴋ: ${data.external_url || "Kosong"}
⤷ ᴠᴇʀɪꜰɪᴇᴅ: ${data.is_verified ? "Yes" : "No"}
⤷ ᴘʀɪᴠᴀᴛᴇ: ${data.is_private ? "Yes" : "No"}
⤷ ꜰᴏʟʟᴏᴡᴇʀꜱ: ${data.followers_count}
⤷ ꜰᴏʟʟᴏᴡɪɴɢ: ${data.following_count}
⤷ ᴘᴏꜱᴛꜱ: ${data.posts_count}

✦ ᴘᴏꜱᴛɪɴɢᴀɴ ᴛᴇʀʙᴀʀᴜ ✦
${data.posts.length ? data.posts[0].caption : "-"}
`;

    bot.sendPhoto(chatId, data.profile_pic_url_hd || data.profile_pic_url, {
  caption,
  parse_mode: "Markdown"
    });
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "❌ Gagal mengambil data user IG.");
  }
});

bot.onText(/^\/stalktiktok(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const username = match[1];

  if (!username) {
    return bot.sendMessage(chatId, "⚠️ Masukkan username TikTok.\nContoh: `/stalktiktok mrbeast`", { parse_mode: "Markdown" });
  }
    
  bot.sendMessage(chatId, '⏳', {
    reply_to_message_id: msg.message_id
  });

  try {
    const res = await axios.get(`https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(username)}`);
    const data = res.data;

    if (!data.status || !data.data) {
      return bot.sendMessage(chatId, "❌ User TikTok tidak ditemukan.");
    }

    const user = data.data.user;
    const stats = data.data.stats;

    const caption = `
⟢ TikTok Stalk Result
──────────────────────
✦ ID: ${user.id}
✦ Username: ${user.uniqueId}
✦ Nickname: ${user.nickname}
✦ Verified: ${user.verified ? "✅ Yes" : "❌ No"}
✦ Bio: ${user.signature || "-"}
✦ Link: ${user.bioLink?.link || "-"}

⟢ Stats
──────────────────────
✦ Followers: ${stats.followerCount.toLocaleString()}
✦ Following: ${stats.followingCount.toLocaleString()}
✦ Likes: ${stats.heartCount.toLocaleString()}
✦ Videos: ${stats.videoCount.toLocaleString()}
    `.trim();

    bot.sendPhoto(chatId, user.avatarLarger, {
      caption,
      parse_mode: "Markdown"
    });

  } catch (e) {
    console.error(e);
    bot.sendMessage(chatId, "❌ Gagal mengambil data TikTok.");
  }
});
//end tools
const userStates = {};
const vpsSpecs = {
  r4c2: { size: "s-2vcpu-4gb", name: "ʀᴀᴍ 4ɢʙ ᴄ2", icon: "✅" },
  r8c4: { size: "s-4vcpu-8gb", name: "ʀᴀᴍ 8ɢʙ ᴄ4", icon: "✅" },
  r16c4: { size: "s-4vcpu-16gb-amd", name: "ʀᴀᴍ 16ɢʙ ᴄ4", icon: "✅" },
  r16c8: { size: "s-8vcpu-16gb-amd", name: "ʀᴀᴍ 16ɢʙ ᴄ8", icon: "✅" },
  r32c8: { size: "s-8vcpu-32gb-amd", name: "ʀᴀᴍ 32ɢʙ ᴄ8", icon: "✅" },
};

const vpsImages = {
  ubuntu20: { image: "ubuntu-20-04-x64", name: "Ubuntu 20.04 LTS", icon: "✅" },
  ubuntu22: { image: "ubuntu-22-04-x64", name: "Ubuntu 22.04 LTS", icon: "✅" },
  ubuntu24: { image: "ubuntu-24-04-x64", name: "Ubuntu 24.04 LTS", icon: "✅" },
};

const vpsRegions = {
  sgp1: { name: "Singapore", flag: "🇸🇬", latency: "Tercepat untuk Asia" },
  nyc1: { name: "New York", flag: "🇺🇸", latency: "USA Pantai Timur" },
  sfo3: { name: "San Francisco", flag: "🇺🇸", latency: "USA Pantai Barat" },
  lon1: { name: "London", flag: "🇬🇧", latency: "Eropa Barat" },
  fra1: { name: "Frankfurt", flag: "🇩🇪", latency: "Eropa Tengah" },
  ams3: { name: "Amsterdam", flag: "🇳🇱", latency: "Eropa Barat" },
  tor1: { name: "Toronto", flag: "🇨🇦", latency: "Amerika Utara" },
  blr1: { name: "Bangalore", flag: "🇮🇳", latency: "Asia Selatan" },
};


  async function createVPSDroplet(apiKey, hostname, spec, os, region, password) {
    const dropletData = {
      name: hostname.toLowerCase().trim(),
      region,
      size: vpsSpecs[spec].size,
      image: vpsImages[os].image,
      ssh_keys: null,
      backups: false,
      ipv6: true,
      user_data: `#cloud-config
password: ${password}
chpasswd:
  expire: False
ssh_pwauth: True
`,
      private_networking: false,
      volumes: null,
      tags: ["AnggaDev-VPS", "pay-tama.vercel.app", new Date().toISOString().split("T")[0]],
    };

    const response = await fetch("https://api.digitalocean.com/v2/droplets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(dropletData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create VPS");
    return data.droplet.id;
  }

  async function getDropletIP(apiKey, dropletId) {
    const response = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch droplet info");
    return data.droplet.networks.v4.find((net) => net.type === "public").ip_address;
  }

async function getDropletInfo(apiKey, dropletId) {
  const response = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Gagal ambil info VPS (HTTP ${response.status})`);
  }

  return data.droplet;
}
    
async function getDropletInfo(apiKey, dropletId) {
  const response = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Gagal ambil info VPS (HTTP ${response.status})`);
  }

  return data.droplet;
}

async function deleteVPS(apiKey, dropletId) {
    const response = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || `Gagal delete VPS (HTTP ${response.status})`);
    }

  return true;
}

async function getAllVPS(apiKey) {
  const response = await fetch("https://api.digitalocean.com/v2/droplets", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    }
  });
  const data = await response.json();
  return data.droplets || [];
}

async function getListVps(apiKey) {
  const response = await fetch("https://api.digitalocean.com/v2/droplets", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Gagal ambil daftar VPS: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.droplets || [];
}

async function getVpsDetail(apiKey, dropletId) {
  const response = await fetch(`https://api.digitalocean.com/v2/droplets/${dropletId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Gagal ambil detail VPS: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.droplet;
}

function formatVPSStatus(status) {
    if (status === "active") return "🟢 Active";
    if (status === "off") return "🔴 Off";
    return "⚪ " + status;
  }

function formatUptime(createdAt) {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now - created;
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffHrs / 24);
    return diffDays > 0 ? `${diffDays}d ${diffHrs % 24}h` : `${diffHrs}h`;
  }

bot.onText(/^\/cvps(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const users = loadData("users.json");
  if (!setting.ADMIN_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }
  const keyboard = [
    [{ text: "🌐 DO 1", callback_data: "createvps_1" }],
    [{ text: "🌐 DO 2", callback_data: "createvps_2" }],
    [{ text: "🌐 DO 3", callback_data: "createvps_3" }],
  ];

  await bot.sendMessage(chatId,
    `📡 *ᴍᴇɴᴜ ᴄʀᴇᴀᴛᴇ ᴠᴘꜱ ᴏᴛᴏᴍᴀᴛɪꜱ*
ᴛʜᴀɴᴋꜱ ꜰʀᴏᴍ @syahv2doffc

Digital Ocean Account:`,
    {
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: keyboard }
    }
  );
});

bot.on("callback_query", async (cb) => {
  const chatId = cb.message.chat.id;
  const data = cb.data;

  if (data.startsWith("createvps_") && data.split("_").length === 2) {
    const accId = data.split("_")[1];
    const keyboard = Object.entries(vpsSpecs).map(([id, spec]) => ([{
      text: `${spec.icon} ${spec.name}`,
      callback_data: `spec_${accId}_${id}`
    }]));

    try {
      await bot.editMessageText(
        `📡 *ᴍᴇɴᴜ ᴄʀᴇᴀᴛᴇ ᴠᴘꜱ*

Digital Ocean: 🌐 *${accId}*
Sekarang pilih spesifikasi:`,
        {
          chat_id: chatId,
          message_id: cb.message.message_id,
          parse_mode: "Markdown",
          reply_markup: { inline_keyboard: keyboard }
        }
      );
    } catch (err) {
      console.error("EditMessageText error:", err);
    }
  }

  if (data.startsWith("spec_")) {
    const [_, accId, specId] = data.split("_");
    const spec = vpsSpecs[specId];
    const keyboard = Object.entries(vpsImages).map(([id, img]) => ([{
      text: `${img.icon} ${img.name}`,
      callback_data: `image_${accId}_${specId}_${id}`
    }]));
    
    try {
      await bot.editMessageText(
        `📦 Spesifikasi VPS
*${spec.name}*

Sekarang pilih OS image:`,
        {
          chat_id: chatId,
          message_id: cb.message.message_id,
          parse_mode: "Markdown",
          reply_markup: { inline_keyboard: keyboard }
        }
      );
    } catch (err) {
      console.error("EditMessageText error:", err);
    }
  }

  if (data.startsWith("image_")) {
    const [_, accId, specId, imageId] = data.split("_");
    const spec = vpsSpecs[specId];
    const img = vpsImages[imageId];
    const keyboard = Object.entries(vpsRegions).map(([id, reg]) => ([{
      text: `${reg.flag} ${reg.name}`,
      callback_data: `region_${accId}_${specId}_${imageId}_${id}`
    }]));

    try {
      await bot.editMessageText(
        `📦 Spesifikasi VPS
*${spec.name}*
💿 Image: *${img.name}*

Sekarang pilih region:`,
        {
          chat_id: chatId,
          message_id: cb.message.message_id,
          parse_mode: "Markdown",
          reply_markup: { inline_keyboard: keyboard }
        }
      );
    } catch (err) {
      console.error("EditMessageText error:", err);
    }
  }

  if (data.startsWith("region_")) {
    const [_, accId, specId, imageId, regionId] = data.split("_");
    const spec = vpsSpecs[specId];
    const img = vpsImages[imageId];
    const reg = vpsRegions[regionId];

    let apiKey;
    if (accId === "1") apiKey = setting.apiDigitalOcean;
    if (accId === "2") apiKey = setting.apiDigitalOcean2;
    if (accId === "3") apiKey = setting.apiDigitalOcean3;

    try {
      await bot.editMessageText(
        `📡 Memulai proses create VPS...

📦 *${spec.name}*
💿 *${img.name}*
🌍 ${reg.flag} *${reg.name}*

⏳ Tunggu proses...`,
        {
          chat_id: chatId,
          message_id: cb.message.message_id,
          parse_mode: "Markdown"
        }
      );

      const hostname = `vpshosting`;
      const password = `vpshostinger${Math.random().toString(36).substring(2, 10)}`;

      const dropletId = await createVPSDroplet(apiKey, hostname, specId, imageId, regionId, password);

      await bot.sendMessage(chatId,
        `✅ *Sukses create VPS*
Berikut detail VPS Anda:

🖥️ Hostname: ${hostname}
🆔 ID Droplet: \`${dropletId}\`
📦 Spec: ${spec.name}
💿 OS: ${img.name}
🌍 Region: ${reg.flag} ${reg.name}

📡 Detail login VPS:
🔐 Password: ${password}

Untuk cek IP, ketik \`/cekip ${dropletId}\``,
        { parse_mode: "Markdown" }
      );
    } catch (err) {
      await bot.sendMessage(chatId, `❌ Gagal membuat VPS

Error: ${err.message}`);
    }
  }

  await bot.answerCallbackQuery(cb.id);
});

bot.onText(/^\/cekip(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id
  const dropletId = match[1]?.trim()
  
  if (!setting.ADMIN_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }
  if (!dropletId) {
    return bot.sendMessage(chatId, "⚠️ Usage: /cekip <droplet_id>")
  }

  const keyboard = [
    [{ text: "🌐 DO 1", callback_data: `cekip_${dropletId}_1` }],
    [{ text: "🌐 DO 2", callback_data: `cekip_${dropletId}_2` }],
    [{ text: "🌐 DO 3", callback_data: `cekip_${dropletId}_3` }]
  ]

  bot.sendMessage(
    chatId,
    `*🔍 ᴍᴇɴᴜ ᴄᴇᴋ ɪᴘ ᴠᴘꜱ*
ᴛʜᴀɴᴋꜱ ꜰʀᴏᴍ @syahv2doffc

Digital Ocean Account:`,
    {
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: keyboard }
    }
  )
})

// handle callback button
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id
  const data = query.data

  if (!data.startsWith("cekip_")) return

  // data format: cekip_<dropletId>_<acc>
  const [, dropletId, accId] = data.split("_")

  let apiKey
  if (accId === "1") apiKey = setting.apiDigitalOcean
  else if (accId === "2") apiKey = setting.apiDigitalOcean2
  else if (accId === "3") apiKey = setting.apiDigitalOcean3
  else return bot.answerCallbackQuery(query.id, { text: "❌ Akun tidak valid" })

  try {
    const droplet = await getDropletInfo(apiKey, dropletId)

    const ipAddress =
      droplet?.networks?.v4?.find((n) => n.type === "public")?.ip_address ||
      "⚠️ Dalam Proses"

    const region =
      vpsRegions[droplet?.region?.slug] || {
        name: droplet?.region?.slug || "Unknown",
        flag: "❓"
      }

    const spec = Object.values(vpsSpecs).find(
      (s) => s.size === droplet?.size_slug
    )

    const osName =
      (droplet?.image?.distribution || "") +
      " " +
      (droplet?.image?.name || "")

    const msgText = `📡 *ʙᴇʀɪᴋᴜᴛ ᴅᴇᴛᴀɪʟ ᴠᴘꜱ:*

🖥️ Hostname: \`${droplet?.name || "???"}\`
🌐 IP: \`${ipAddress}\`
📦 Spec: ${spec ? spec.name : droplet?.size_slug || "???"}
💿 OS: ${osName || "???"}
🌍 Region: ${region.flag} ${region.name}
⚡ Status: *${droplet?.status || "???"}*
🆔 Droplet ID: \`${droplet?.id || dropletId}\`

🔒 *ʟᴏɢɪɴ ᴊᴜɪᴄᴇꜱꜱʜ:*
\`root@${ipAddress}:22\``

    await bot.editMessageText(msgText, {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: "Markdown"
    })
  } catch (err) {
    bot.editMessageText(`❌ Gagal cek VPS\n\n🧾 Error: ${err.message}`, {
      chat_id: chatId,
      message_id: query.message.message_id
    })
  }

  bot.answerCallbackQuery(query.id)
});

bot.onText(/^\/delvps (.+)$/, async (msg, match) => {
  try {
    const chatId = msg.chat.id;
    const dropletId = match[1]?.trim();
    const userId = msg.from.id;
    const users = loadData("users.json");

    // Cek OWNER_ID
    if (typeof OWNER_ID === "undefined" || !Array.isArray(OWNER_ID)) {
      return bot.sendMessage(chatId, "⚠️ OWNER_ID belum didefinisikan di config!");
    }

    // Cek user premium
    if (!setting.ADMIN_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }

    // Validasi droplet ID
    if (!dropletId || isNaN(dropletId)) {
      return bot.sendMessage(chatId, "❌ ID VPS tidak valid.");
    }

    // Kirim menu pilihan akun DO
    await bot.sendMessage(
      chatId,
      `*♻️ ᴍᴇɴᴜ ᴅᴇʟᴇᴛᴇ ᴠᴘꜱ*\nᴛʜᴀɴᴋꜱ ꜰʀᴏᴍ @syahv2doffc\n\nPilih akun Digital Ocean:`,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "🌐 DO 1", callback_data: `delvpsacc_1_${dropletId}` }],
            [{ text: "🌐 DO 2", callback_data: `delvpsacc_2_${dropletId}` }],
            [{ text: "🌐 DO 3", callback_data: `delvpsacc_3_${dropletId}` }]
          ]
        }
      }
    );
  } catch (err) {
    console.error("Error in /delvps:", err);
    bot.sendMessage(msg.chat.id, `❌ Terjadi kesalahan:\n${err.message}`);
  }
});

// === CALLBACK HANDLER ===
bot.on("callback_query", async (cbq) => {
  try {
    const chatId = cbq.message.chat.id;
    const data = cbq.data;

    // === STEP 1: Pilih akun DO ===
    if (data.startsWith("delvpsacc_")) {
      const [, accIndex, dropletId] = data.split("_");

      let apiKey;
      if (accIndex === "1") apiKey = setting?.apiDigitalOcean;
      else if (accIndex === "2") apiKey = setting?.apiDigitalOcean2;
      else if (accIndex === "3") apiKey = setting?.apiDigitalOcean3;
      else {
        return bot.answerCallbackQuery(cbq.id, { text: "❌ Akun tidak valid" });
      }

      // Pastikan fungsi ada
      if (typeof getDropletInfo !== "function") {
        return bot.sendMessage(chatId, "⚠️ Fungsi getDropletInfo belum didefinisikan!");
      }

      const vps = await getDropletInfo(apiKey, dropletId);
      if (!vps) {
        await bot.answerCallbackQuery(cbq.id, { text: "❌ VPS tidak ditemukan" });
        return bot.sendMessage(chatId, "❌ VPS tidak ditemukan atau sudah dihapus.");
      }

      // Escape karakter Markdown
      const safeName = vps.name.replace(/([_*`])/g, "\\$1");

      const confirmMsg = [
        `⚠️ *KONFIRMASI DELETE VPS*`,
        ``,
        `🖥️ Name: *${safeName}*`,
        `🆔 ID: \`${dropletId}\``,
        `🌐 IP: \`${vps.networks?.v4?.[0]?.ip_address || "Tidak ada IP"}\``,
        ``,
        `❗ *PERINGATAN:*`,
        `• Semua data akan hilang permanen`,
        `• VPS tidak dapat dikembalikan`,
        `• Proses delete tidak bisa dibatalkan`,
        ``,
        `Yakin ingin menghapus VPS ini?`
      ].join("\n");

      await bot.sendMessage(chatId, confirmMsg, {
        parse_mode: "MarkdownV2",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "✅ Ya, Hapus", callback_data: `confirmdel_${accIndex}_${dropletId}` },
              { text: "❌ Batal", callback_data: "canceldelete" }
            ]
          ]
        }
      });

      return bot.answerCallbackQuery(cbq.id);
    }

    // === STEP 2: Konfirmasi delete ===
    if (data.startsWith("confirmdel_")) {
      const [, accIndex, dropletId] = data.split("_");

      let apiKey;
      if (accIndex === "1") apiKey = setting?.apiDigitalOcean;
      else if (accIndex === "2") apiKey = setting?.apiDigitalOcean2;
      else if (accIndex === "3") apiKey = setting?.apiDigitalOcean3;
      else {
        return bot.answerCallbackQuery(cbq.id, { text: "❌ Akun tidak valid" });
      }

      if (typeof deleteVPS !== "function") {
        return bot.sendMessage(chatId, "⚠️ Fungsi deleteVPS belum didefinisikan!");
      }

      await deleteVPS(apiKey, dropletId);
      await bot.sendMessage(chatId, `✅ VPS \`${dropletId}\` berhasil dihapus`, {
        parse_mode: "Markdown"
      });

      return bot.answerCallbackQuery(cbq.id, { text: "VPS berhasil dihapus ✅" });
    }

    // === STEP 3: Batalkan delete ===
    if (data === "canceldelete") {
      await bot.answerCallbackQuery(cbq.id, { text: "❌ Dibatalkan" });
      await bot.sendMessage(chatId, "❌ Delete VPS dibatalkan.");
    }
  } catch (err) {
    console.error("Error callback_query:", err);
    try {
      await bot.sendMessage(cbq.message.chat.id, `❌ Error:\n${err.message}`);
    } catch {}
  }
});
//END CASE CVPS 
bot.onText(/^\/installpanel (.+)$/, async (msg, match) => {
  users.push(msg.from.id); 
  saveUsers(users); 
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const text = match[1];
  const users = loadData("users.json");
  const userId = msg.from.id;
  if (!text) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh: /installpanel ipvps|pwvps|domainpanel|domainnode|ramserver");
  }

  const vii = text.split("|");
  if (vii.length < 5) {
    await bot.sendMessage(msg.chat.id, example());
    return;
  }

  if (!setting.PREM_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }
  // Simpan data pengguna
  userData[msg.from.id] = {
    ip: vii[0],
    password: vii[1],
    domainpanel: vii[2],
    domainnode: vii[3],
    ramserver: vii[4],
    step: "installing",
  };
 
  await bot.sendMessage(
    msg.chat.id,
    "Memproses instalasi server panel...\nTunggu 1-10 menit hingga proses selesai."
  );
  startInstallation(msg, bot);
});
function startInstallation(msg, bot) {
  const userId = msg.from.id;
  if (!userData[userId]) {
    bot.sendMessage(msg.chat.id, "Data pengguna tidak ditemukan, silakan ulangi perintah.");
    return;
  }

  const { ip, password, domainpanel, domainnode, ramserver } = userData[userId];

  const ress = new Client();
  const connSettings = {
    host: ip,
    port: 22,
    username: "root",
    password: password,
  };
  
  const userPanel = `admin${Math.random().toString(36).substring(7)}`;
  const emailPanel = `admin@gmail.com`;
  const passwordPanel = `admin${Math.random().toString(36).substring(7)}`; // Random password
  const commandPanel = `bash <(curl -s https://pterodactyl-installer.se)`;

  // Fungsi untuk instal wings
  const installWings = (conn) => {
    conn.exec(commandPanel, (err, stream) => {
      if (err) {
        bot.sendMessage(msg.chat.id, `Gagal menjalankan instalasi wings: ${err.message}`);
        delete userData[userId];
        return;
      }
      stream
        .on("close", (code, signal) => {
          conn.exec(
            "bash <(curl -s https://raw.githubusercontent.com/antirusuhnihdeks/pterodactyl/main/createnode.sh)",
            (err, stream) => {
              if (err) {
                bot.sendMessage(msg.chat.id, `Gagal menjalankan pembuatan node: ${err.message}`);
                delete userData[userId];
                return;
              }
              stream
                .on("close", async (code, signal) => {
                  const teks = `
𝗕𝗘𝗥𝗜𝗞𝗨𝗧 𝗗𝗔𝗧𝗔 𝗣𝗔𝗡𝗘𝗟 𝗔𝗡𝗗𝗔 📎 :
 ᴜsᴇʀɴᴀᴍᴇ : ${userPanel}
 ᴘᴀssᴡᴏʀᴅ : ${passwordPanel}
 ᴅᴏᴍᴀɪɴ : ${domainpanel}
`;
                  await bot.sendMessage(msg.chat.id, teks);
                  delete userData[userId]; // Bersihkan data setelah selesai
                })
                .on("data", (data) => {
                  const output = data.toString();
                  console.log(output);
                  if (output.includes("Masukkan nama lokasi:"))
                    stream.write("Singapore\n");
                  if (output.includes("Masukkan deskripsi lokasi:"))
                    stream.write("Node By SYAH\n");
                  if (output.includes("Masukkan domain:"))
                    stream.write(`${domainnode}\n`);
                  if (output.includes("Masukkan nama node:"))
                    stream.write("Node By SYAH\n");
                  if (output.includes("Masukkan RAM (dalam MB):"))
                    stream.write(`${ramserver}\n`);
                  if (
                    output.includes(
                      "Masukkan jumlah maksimum disk space (dalam MB):"
                    )
                  )
                    stream.write(`${ramserver}\n`);
                  if (output.includes("Masukkan Locid:")) stream.write("1\n");
                })
                .stderr.on("data", (data) => console.log("Stderr: " + data));
            }
          );
        })
        .on("data", (data) => {
          const output = data.toString();
          console.log("Logger: " + output);
          if (output.includes("Input 0-6")) stream.write("1\n");
          if (output.includes("(y/N)")) stream.write("y\n");
          if (output.includes("Enter the panel address"))
            stream.write(`${domainpanel}\n`);
          if (output.includes("Database host username"))
            stream.write(`${userPanel}\n`);
          if (output.includes("Database host password"))
            stream.write(`${passwordPanel}\n`);
          if (output.includes("Set the FQDN to use for Let's Encrypt"))
            stream.write(`${domainnode}\n`);
          if (output.includes("Enter email address for Let's Encrypt"))
            stream.write("admin@gmail.com\n");
        })
        .stderr.on("data", (data) => console.log("STDERR: " + data));
    });
  };

  // Fungsi untuk instal panel
  const installPanel = (conn) => {
    conn.exec(commandPanel, (err, stream) => {
      if (err) {
        bot.sendMessage(msg.chat.id, `Gagal menjalankan instalasi panel: ${err.message}`);
        delete userData[userId];
        return;
      }
      stream
        .on("close", (code, signal) => installWings(conn))
        .on("data", (data) => {
          const output = data.toString();
          console.log("Logger: " + output);
          if (output.includes("Input 0-6")) stream.write("0\n");
          if (output.includes("(y/N)")) stream.write("y\n");
          if (output.includes("Database name")) stream.write(`${userPanel}\n`);
          if (output.includes("Database username")) stream.write(`${userPanel}\n`);
          if (
            output.includes(
              "Password (press enter to use randomly generated password)"
            )
          )
            stream.write(`${passwordPanel}\n`);
          if (output.includes("Select timezone"))
            stream.write("Asia/Jakarta\n");
          if (output.includes("Provide the email address"))
            stream.write("admin@gmail.com\n");
          if (output.includes("Email address for the initial admin account"))
            stream.write("admin@gmail.com\n");
          if (output.includes("Username for the initial admin account"))
            stream.write(`${userPanel}\n`);
          if (output.includes("First name")) stream.write("admin\n");
          if (output.includes("Last name")) stream.write("admin\n");
          if (output.includes("Password for the initial admin account"))
            stream.write(`${passwordPanel}\n`);
          if (output.includes("Set the FQDN of this panel"))
            stream.write(`${domainpanel}\n`);
          if (output.includes("Do you want to automatically configure UFW"))
            stream.write("y\n");
          if (output.includes("Do you want to automatically configure HTTPS"))
            stream.write("y\n");
          if (output.includes("Select the appropriate number [1-2]"))
            stream.write("1\n");
          if (output.includes("I agree that this HTTPS request"))
            stream.write("y\n");
          if (output.includes("Proceed anyways")) stream.write("y\n");
          if (output.includes("(yes/no)")) stream.write("y\n");
          if (output.includes("Initial configuration completed"))
            stream.write("y\n");
          if (output.includes("Still assume SSL")) stream.write("y\n");
          if (output.includes("Please read the Terms of Service"))
            stream.write("y\n");
          if (output.includes("(A)gree/(C)ancel:")) stream.write("A\n");
        })
        .stderr.on("data", (data) => console.log("STDERR: " + data));
    });
  };

 
  ress
    .on("ready", () => {
      installPanel(ress);
    })
    .on("error", (err) => {
      bot.sendMessage(msg.chat.id, `Gagal koneksi ke server: ${err.message}`);
      delete userData[userId];
    })
    .connect(connSettings);
}
bot.onText(/^\/uninstalltema(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1];
  const senderId = msg.from.id;
  const users = loadData("users.json");
    if (!setting.PREM_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }
  if (!text) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh: /uninstalltema ipvps|pwvps");
  }

  if (!text.includes("|")) {
    return bot.sendMessage(chatId, "Format: /uninstalltema IpVps|PwVps");
  }

  let [ipvps, passwd] = text.split("|");
  if (!ipvps || !passwd) {
    return bot.sendMessage(chatId, "Format: /uninstalltema IpVps|PwVps");
  }

  const connSettings = {
    host: ipvps,
    port: 22,
    username: "root",
    password: passwd,
  };

  const command = `bash <(curl -s https://raw.githubusercontent.com/Bangsano/Autoinstaller-Theme-Pterodactyl/refs/heads/main/install.sh)`;
  const conn = new Client();

  conn.on("ready", () => {
      bot.sendMessage(chatId, "⏳ ᴍᴇᴍᴘʀᴏꜱᴇꜱ ᴜɴɪɴꜱᴛᴀʟʟ ᴛᴇᴍᴀ ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ...\nᴛᴜɴɢɢᴜ 1-10 ᴍᴇɴɪᴛ ʜɪɴɢɢᴀ ᴘʀᴏꜱᴇꜱ ꜱᴇʟᴇꜱᴀɪ ✅");

      conn.exec(command, (err, stream) => {
        if (err) {
          bot.sendMessage(chatId, "❌ Error saat eksekusi command!");
          return conn.end();
        }

        stream
          .on("close", async () => {
            await bot.sendPhoto(chatId, panel, {
              caption: "✅ ʙᴇʀʜᴀꜱɪʟ ᴜɴɪɴꜱᴛᴀʟʟ ᴛᴇᴍᴀ",
              parse_mode: "Markdown",
            });
            conn.end();
          })
          .on("data", (data) => {
            console.log(data.toString());
            stream.write("2\n");
            stream.write("y\n");
            stream.write("x\n");
          })
          .stderr.on("data", (data) => {
            console.log("STDERR: " + data);
          });
      });
    })
    .on("error", () => {
      bot.sendMessage(chatId, "❌ Katasandi atau IP tidak valid");
    })
    .connect(connSettings);
});
bot.onText(/^\/installwings (.+)$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const senderId = msg.from.id;
  const users = loadData("users.json");
  const userId = msg.from.id;
    if (!setting.PREM_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }
    
  if (!text.includes("|")) {
    return bot.sendMessage(chatId, "⚠️ Format: /installwings IpVps|PwVps|domainpanel|domainnode");
  }

  const parts = text.split("|").map(item => item.trim());
  if (parts.length !== 4) {
    return bot.sendMessage(chatId, "⚠️ Format: /installwings IpVps|PwVps|domainpanel|domainnode\nPastikan ada 4 bagian yang dipisah oleh |");
  }

  const [ipvps, passwd, domainpanel, domainnode] = parts;
  if (!ipvps || !passwd || !domainpanel || !domainnode) {
    return bot.sendMessage(chatId, "⚠️ Format: /installwings IpVps|PwVps|domainpanel|domainnode\nSemua bagian harus diisi!");
  }

  const loadingMsg = await bot.sendMessage(chatId, "🔍 ᴍᴇɴɢᴜʟᴀꜱ ᴋᴏɴᴇᴋꜱɪ ᴠᴘꜱ...");
  lastMessageContent[chatId] = "🔍 ᴍᴇɴɢᴜʟᴀꜱ ᴋᴏɴᴇᴋꜱɪ ᴠᴘꜱ...";

  const connSettings = {
    host: ipvps,
    port: 22,
    username: "root",
    password: passwd,
    readyTimeout: 15000
  };

  const command = `bash <(curl -s https://pterodactyl-installer.se)`;
  const emailrandom = `syahv2d@gmail.com`;
  const userDb = `syahv2d${Math.random().toString(36).substring(7)}`;
  const passwordDb = `syahv2d${Math.random().toString(36).substring(7)}`;
  const conn = new Client();

  const progressStages = [
    "🔍 ᴍᴇɴɢᴜʟᴀꜱ ᴋᴏɴᴇᴋꜱɪ ᴠᴘꜱ...",
    "✅ ᴋᴏɴᴇᴋꜱɪ ʙᴇʀʜᴀꜱɪʟ",
    "📦 ᴍᴇɴɢɪɴꜱᴛᴀʟ ᴘᴀᴋᴇᴛ ᴅᴇᴘᴇɴᴅᴇɴꜱɪ...",
    "⚡ ᴍᴇᴍᴘʀᴏꜱᴇꜱ ꜱᴇʟᴇꜱᴀɪ..."
  ];

  let currentStage = 0;

  const updateProgress = async (newText) => {
    if (lastMessageContent[chatId] !== newText) {
      try {
        await bot.editMessageText(newText, {
          chat_id: chatId,
          message_id: loadingMsg.message_id
        });
        lastMessageContent[chatId] = newText;
      } catch (error) {
        if (!error.message.includes('message is not modified')) {
          console.error('Edit message error:', error.message);
        }
      }
    }
  };

  conn
    .on("ready", async () => {
      const newText = `✅ ᴋᴏɴᴇᴋꜱɪ ʙᴇʀʜᴀꜱɪʟ\n⏳ ᴍᴇᴍᴘʀᴏꜱᴇꜱ ɪɴꜱᴛᴀʟʟ wings ᴘᴛᴇʀᴏᴅᴀᴄᴛʏʟ...\n🌐 Panel: ${domainpanel}\n🛰️ Node: ${domainnode}\n📧 Email: ${emailrandom}\n🗃️ DB: ${userDb} | ${passwordDb}\n⏰ ᴛᴜɴɢɢᴜ 1-10 ᴍᴇɴɪᴛ ʜɪɴɢɢᴀ ᴘʀᴏꜱᴇꜱ ꜱᴇʟᴇꜱᴀɪ ✅`;
      await updateProgress(newText);

      conn.exec(command, (err, stream) => {
        if (err) {
          updateProgress("❌ ɢᴀɢᴀʟ ᴍᴇɴɢᴇᴋꜱᴇᴋᴜꜱɪ ᴄᴏᴍᴍᴀɴᴅ!");
          return conn.end();
        }

        let progressUpdated = false;

        stream
          .on("close", async () => {
            try {
              await bot.deleteMessage(chatId, loadingMsg.message_id);
              delete lastMessageContent[chatId];
              await bot.sendMessage(chatId, `✅ ʙᴇʀʜᴀꜱɪʟ ɪɴꜱᴛᴀʟʟ ᴡɪɴɢꜱ!\n🌐 Panel: ${domainpanel}\n🛰️ Node: ${domainnode}\n📧 Email: ${emailrandom}\n🗃️ DB: ${userDb} | ${passwordDb}\n`);
            } catch (error) {
              console.error('Delete message error:', error.message);
            }
            conn.end();
          })
          .on("data", (data) => {
            const output = data.toString();
            console.log("OUTPUT:", output);
            
            if (!progressUpdated && output.includes("Installing")) {
              updateProgress("📦 ᴍᴇɴɢɪɴꜱᴛᴀʟ ᴘᴀᴋᴇᴛ ᴅᴇᴘᴇɴᴅᴇɴꜱɪ...\n⏰ ᴛᴜɴɢɢᴜ ꜱᴇʙᴇɴᴛᴀʀ");
              progressUpdated = true;
            }

            // Kondisi untuk input berdasarkan prompt installer
            if (output.includes("Input 0-6")) stream.write("1\n");
            if (output.includes("(y/N)")) stream.write("y\n");
            if (output.includes("Enter the panel address")) stream.write(`${domainpanel}\n`);
            if (output.includes("Database host username")) stream.write(`${userDb}\n`);
            if (output.includes("Database host password")) stream.write(`${passwordDb}\n`);
            if (output.includes("Set the FQDN to use for Let's Encrypt")) stream.write(`${domainnode}\n`);
            if (output.includes("Enter email address")) stream.write(`${emailrandom}\n`);
          })
          .stderr.on("data", (data) => {
            console.log("ERROR:", data.toString());
          });
      });
    })
    .on("error", async (err) => {
      console.error("SSH Error:", err.message);
      await updateProgress("❌ ᴋᴀᴛᴀꜱᴀɴᴅɪ ᴀᴛᴀᴜ ɪᴘ ᴛɪᴅᴀᴋ ᴠᴀʟɪᴅ\nᴘᴀꜱᴛɪᴋᴀɴ ᴠᴘꜱ ᴀᴋᴛɪꜰ ᴅᴀɴ ᴋʀᴇᴅᴇɴꜱɪᴀʟ ʙᴇɴᴀʀ!");
    })
    .on("end", () => {
      console.log("SSH Connection closed");
    })
    .connect(connSettings);
});

bot.onText(/^\/uninstallwings(?:\s+(.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const senderId = msg.from.id;
  const users = loadData("users.json");
  const userId = msg.from.id;
  if (!text) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh: /uninstallwings ip|password");
  }
  
  if (!setting.PREM_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }
    
  const [ip, password] = text.split("|");
  if (!ip || !password) {
    return bot.sendMessage(chatId, "❌ Format salah!\nGunakan:\n`/uninstallwings ip|password`", { parse_mode: "Markdown" });
  }

  const conn = new Client();
  bot.sendMessage(chatId, `🛠 ᴍᴇɴɢʜᴜʙᴜɴɢᴋᴀɴ ᴋᴇ ᴠᴘꜱ *${ip}*...\nꜱᴇᴅᴀɴɢ ᴘʀᴏꜱᴇꜱ ᴜɴɪɴꜱᴛᴀʟʟ ᴡɪɴɢꜱ + ʀᴇꜱᴇᴛ ᴘᴏʀᴛ`, { parse_mode: "Markdown" });

  conn.on("ready", () => {
    const script = `
systemctl stop wings
systemctl disable wings
rm -f /etc/systemd/system/wings.service
rm -f /usr/local/bin/wings
rm -rf /etc/pterodactyl
rm -rf /var/lib/pterodactyl
`;

    conn.exec(script, (err, stream) => {
      if (err) {
        conn.end();
        return bot.sendMessage(chatId, "❌ Gagal mengeksekusi perintah di VPS.");
      }

      stream.on("close", (code) => {
        conn.end();
        if (code === 0) {
          bot.sendMessage(chatId, `✅ *Wings berhasil dihapus dari VPS ${ip}*\n🧹 Port 8080 & 2022 juga dibersihkan.`, { parse_mode: "Markdown" });
        } else {
          bot.sendMessage(chatId, `⚠️ Selesai dengan kode ${code}. Sebagian mungkin gagal. Periksa manual.`);
        }
      }).on("data", (data) => {
        console.log("STDOUT:", data.toString());
      }).stderr.on("data", (data) => {
        console.error("STDERR:", data.toString());
      });
    });
  }).on("error", (err) => {
    bot.sendMessage(chatId, `❌ Tidak bisa konek ke VPS:\n${err.message}`);
  }).connect({
    host: ip,
    port: 22,
    username: "root",
    password: password,
    readyTimeout: 15000
  });
});

bot.onText(/^\/uninstallpanel(?:\s+(.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const senderId = msg.from.id;
  const users = loadData("users.json");
  const userId = msg.from.id;
  if (!text) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh: /uninstallpanel ip|password");
  }

  if (!setting.PREM_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }
   
  const [ip, password] = text.split("|");
  if (!ip || !password) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh: /uninstallpanel ip|password", { parse_mode: "Markdown" });
  }

  const conn = new Client();
  const random = Math.floor(1000 + Math.random() * 9000);

  bot.sendMessage(chatId, `
📡 ᴍᴇɴɢʜᴜʙᴜɴɢᴋᴀɴ ᴋᴇ ᴠᴘꜱ *${ip}*
ꜱɪʟᴀʜᴋᴀɴ ᴛᴜɴɢɢᴜ 10-20 ᴍᴇɴɪᴛ...`, { parse_mode: "Markdown" });

  conn.on("ready", () => {
    conn.exec("bash <(curl -s https://pterodactyl-installer.se)", (err, stream) => {
      if (err) {
        conn.end();
        return bot.sendMessage(chatId, "❌ Gagal menjalankan installer.");
      }

      stream.on("close", (code) => {
        conn.end();
        if (code === 0) {
          bot.sendMessage(chatId, `
✅ *ꜱᴜᴋꜱᴇꜱ ᴜɴɪɴꜱᴛᴀʟʟ ᴘᴀɴᴇʟ!*
`, { parse_mode: "Markdown" });
        } else {
          bot.sendMessage(chatId, `⚠️ ɪɴꜱᴛᴀʟʟᴇʀ ꜱᴇʟᴇꜱᴀɪ ᴅᴇɴɢᴀɴ ᴋᴏᴅᴇ ${code}. ʙᴇʙᴇʀᴀᴘᴀ ᴍᴜɴɢᴋɪɴ ɢᴀɢᴀʟ. ᴄᴇᴋ ᴍᴀɴᴜᴀʟ ᴠᴘꜱ.`);
        }
      });

      stream.on("data", (data) => {
        const out = data.toString();
        console.log("INSTALL >>", out);

        if (out.includes("Input 0-6")) stream.write("6\n");
        if (out.includes("Do you want to remove panel? (y/N)")) stream.write("y\n");
        if (out.includes("Do you want to remove Wings (daemon)? (y/N)")) stream.write("y\n");
        if (out.includes("Continue with uninstallation? (y/N)")) stream.write("y\n");
        if (out.includes("Choose the panel database (to skip don't input anything)")) stream.write("\n");
        if (out.includes("Database called panel has been detected. Is it the pterodactyl database? (y/N)")) stream.write("y\n");
        if (out.includes("User called pterodactyl has been detected. Is it the pterodactyl user? (y/N)")) stream.write("y\n");
      });

      stream.stderr.on("data", (data) => {
        console.error("STDERR:", data.toString());
      });
    });
  }).on("error", (err) => {
    bot.sendMessage(chatId, `❌ Gagal konek ke VPS:\n${err.message}`);
  }).connect({
    host: ip,
    port: 22,
    username: "root",
    password: password,
    readyTimeout: 20000
  });
});

bot.onText(/^\/swings(?:\s+(.+))?/, async (msg, match) => {
  const users = loadData("users.json");
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const userId = msg.from.id;
  
   if (!setting.PREM_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }

  const text = match[1];
  if (!text) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh: /swings ipvps|pwvps|token_node");
  }

  const t = text.split("|");
  if (t.length < 3) {
    return bot.sendMessage(chatId, "❌ Format salah!\n\nContoh:\n/swings ipvps|pwvps|token_node");
  }

  const ipvps = t[0].trim();
  const passwd = t[1].trim();
  const token = t[2].trim();

  let logs = "🚀 Menjalankan proses wings...\n\n";
  const loadingMsg = await bot.sendMessage(chatId, logs);

  const connSettings = {
    host: ipvps,
    port: 22,
    username: "root",
    password: passwd,
    readyTimeout: 20000
  };

  const conn = new Client();
  const command = token;

  function updateLogs(newLine) {
    logs += newLine + "\n";
    safeEdit(bot, chatId, loadingMsg.message_id, "```\n" + logs.slice(-3500) + "\n```"); // max 4096 limit
  }

  conn.on("ready", () => {
    updateLogs("✅ SSH Connected!");

    conn.exec(command, (err, stream) => {
      if (err) {
        updateLogs("❌ Gagal menjalankan token node.");
        return conn.end();
      }

      updateLogs("▶️ Menjalankan token...");

      stream.stdout.on("data", (data) => updateLogs("TOKEN OUT: " + data.toString().trim()));
      stream.stderr.on("data", (data) => updateLogs("TOKEN ERR: " + data.toString().trim()));

      stream.on("close", () => {
        updateLogs("✅ Token selesai, lanjut jalankan wings...");

        conn.exec("sudo wings", (err2, stream2) => {
          if (err2) {
            updateLogs("❌ Gagal menjalankan wings.");
            return conn.end();
          }

          updateLogs("▶️ Menjalankan wings...");

          stream2.stdout.on("data", (data) => updateLogs("WINGS OUT: " + data.toString().trim()));
          stream2.stderr.on("data", (data) => updateLogs("WINGS ERR: " + data.toString().trim()));

          stream2.on("close", () => {
            updateLogs("✅ Wings berhasil dijalankan!\n\nJika masih merah:\n1. Login VPS di JuiceSSH\n2. Ketik `sudo wings --debug`\n3. Refresh panel");
            conn.end();
          });
        });
      });
    });
  })
  .on("error", (err) => {
    updateLogs("❌ Connection Error: " + err.message);
  })
  .on("end", () => updateLogs("🔌 SSH Connection closed"))
  .connect(connSettings);
});

async function safeEdit(bot, chatId, messageId, text) {
  try {
    await bot.editMessageText(text, {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: "Markdown"
    });
  } catch (e) {
    console.error("Telegram editMessage error:", e.message);
  }
}

bot.onText(/^\/subdo(?:\s+(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const input = match[1];
     const senderId = msg.from.id;
     const users = loadData("users.json");

    // Validasi premium
if (!setting.PREM_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }

    const text = match[1];
    if (!text) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh: /subdo reqname|ipvps");
    }
    
    if (!text.includes("|")) return bot.sendMessage(chatId, "❌ Format salah!\nContoh: `/subdo reqname|ipvps`", { parse_mode: "Markdown" });

    const [host, ip] = text.split("|").map(i => i.trim());
    const dom = Object.keys(global.subdomain);

    if (dom.length === 0) return bot.sendMessage(chatId, "❌ Tidak ada domain yang tersedia saat ini.");

    const inlineKeyboard = [];
    for (let i = 0; i < dom.length; i += 2) {
        const row = dom.slice(i, i + 2).map((d, index) => ({
            text: d,
            callback_data: `create_domain ${i + index} ${host}|${ip}`
        }));
        inlineKeyboard.push(row);
    }

    const opts = {
        reply_markup: {
            inline_keyboard: inlineKeyboard
        }
    };

    bot.sendMessage(chatId, `🔹 *Subdomain yang tersedia saat ini*\nbig thanks from @syahv2doffc\nᴄʜᴏᴏꜱᴇ ᴀ ꜱᴜʙᴅᴏᴍᴀɪɴ :`, { parse_mode: "Markdown", ...opts });
});

// handler subdomain
bot.on("callback_query", async (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data.split(" ");

    if (data[0] === "create_domain") {
        /*if (callbackQuery.from.id !== ownerId) {
            return bot.answerCallbackQuery(callbackQuery.id, { text: "❌ Owner only!", show_alert: true });
        }*/

        const domainIndex = Number(data[1]);
        const dom = Object.keys(global.subdomain);

        if (domainIndex < 0 || domainIndex >= dom.length) return bot.sendMessage(msg.chat.id, "Domain tidak ditemukan!");
        if (!data[2] || !data[2].includes("|")) return bot.sendMessage(msg.chat.id, "Hostname/IP tidak ditemukan!");

        const tldnya = dom[domainIndex];
        const [host, ip] = data[2].split("|").map(item => item.trim());

        async function createSubDomain(host, ip) {
            try {
                const response = await axios.post(
                    `https://api.cloudflare.com/client/v4/zones/${global.subdomain[tldnya].zone}/dns_records`,
                    {
                        type: "A",
                        name: `${host.replace(/[^a-z0-9.-]/gi, "")}.${tldnya}`,
                        content: ip.replace(/[^0-9.]/gi, ""),
                        ttl: 1,
                        proxied: false
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${global.subdomain[tldnya].apitoken}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                const res = response.data;
                if (res.success) {
                    return {
                        success: true,
                        name: res.result?.name || `${host}.${tldnya}`,
                        ip: res.result?.content || ip
                    };
                } else {
                    return { success: false, error: "Gagal membuat subdomain" };
                }
            } catch (e) {
                const errorMsg = e.response?.data?.errors?.[0]?.message || e.message || "Terjadi kesalahan";
                return { success: false, error: errorMsg };
            }
        }

        const result = await createSubDomain(host.toLowerCase(), ip);

        if (result.success) {
            let teks = `
✅ *ʙᴇʀʜᴀsɪʟ ᴍᴇᴍʙᴜᴀᴛ sᴜʙᴅᴏᴍᴀɪɴ*

🌐 *sᴜʙᴅᴏᴍᴀɪɴ:* \`${result.name}\`
📌 *ɪᴘ ᴠᴘs:* \`${result.ip}\`
`;
            await bot.sendMessage(msg.chat.id, teks, { parse_mode: "Markdown", reply_to_message_id: msg.message_id });
        } else {
            await bot.sendMessage(msg.chat.id, `❌ Gagal membuat subdomain:\n${result.error}`);
        }

        bot.answerCallbackQuery(callbackQuery.id);
    }
});
    
bot.onText(/^\/listsubdo$/, async (msg) => {
   const chatId = msg.chat.id;
   const userId = msg.from.id;
   const senderId = msg.from.id;
   const users = loadData("users.json");
    // Validasi premium
if (!setting.ADMIN_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }

  const dom = Object.keys(global.subdomain);
  if (dom.length === 0) {
    return bot.sendMessage(chatId, "❌ Tidak ada domain yang tersedia saat ini.");
  }

  let teks = `📜 *ᴅᴀꜰᴛᴀʀ ᴅᴏᴍᴀɪɴ ʏᴀɴɢ ᴛᴇʀꜱᴇᴅɪᴀ*\n\n`;
  dom.forEach((d, i) => {
    teks += `${i + 1}. \`${d}\`\n`;
  });

  bot.sendMessage(chatId, teks, { parse_mode: "Markdown", reply_to_message_id: msg.message_id });
});

bot.onText(/^\/hbpanel(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const senderId = msg.from.id;
  const users = loadData("users.json");
    // Validasi premium
if (!setting.PREM_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }
  let text = match[1];
  if (!text) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh: /hbpanel ipvps|pwvps");
  }
    
  let t = text.split("|");
  if (t.length < 2) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh:\n/hbpanel ipvps|pwvps");
  }

  let ipvps = t[0].trim();
  let passwd = t[1].trim();

  await bot.sendMessage(chatId, "⏳ ᴘʀᴏꜱᴇꜱ ʜᴀᴄᴋʙᴀᴄᴋ ᴘᴀɴᴇʟ...");

  let newuser = "admin" + Math.floor(Math.random() * 9999).toString();
  let newpw = "admin" + Math.floor(Math.random() * 9999).toString();

  const connSettings = {
    host: ipvps,
    port: 22,
    username: "root",
    password: passwd
  };

  const command = `bash <(curl -s https://raw.githubusercontent.com/Bangsano/Autoinstaller-Theme-Pterodactyl/refs/heads/main/install.sh)`;
  const conn = new Client();

  conn.on("ready", () => {
    conn.exec(command, (err, stream) => {
      if (err) throw err;

      stream.on("close", async () => {
        let teks = `
*ʜᴀᴄᴋʙᴀᴄᴋ ᴘᴀɴᴇʟ ꜱᴜᴋꜱᴇꜱ ✅*

*ᴅᴇᴛᴀɪʟ ᴀᴋᴜɴ ᴀᴅᴍɪɴ ᴘᴀɴᴇʟ:*
👤 ᴜꜱᴇʀɴᴀᴍᴇ: \`${newuser}\`
🔑 ᴘᴀꜱꜱᴡᴏʀᴅ: \`${newpw}\`
`;
        await bot.sendMessage(chatId, teks, { parse_mode: "Markdown" });
        conn.end();
      }).on("data", (data) => {
        console.log("STDOUT:", data.toString());
      }).stderr.on("data", (data) => {
        console.log("STDERR:", data.toString());
        stream.write("7\n");
        stream.write(`${newuser}\n`);
        stream.write(`${newpw}\n`);
      });
    });
  }).on("error", (err) => {
    console.log("Connection Error:", err);
    bot.sendMessage(chatId, "❌ ᴋᴀᴛᴀꜱᴀɴᴅɪ ᴀᴛᴀᴜ ɪᴘ ᴛɪᴅᴀᴋ ᴠᴀʟɪᴅ");
  }).connect(connSettings);
});
    
// command /setpwvps
bot.onText(/^\/setpwvps(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const senderId = msg.from.id;
  const users = loadData("users.json");
    // Validasi premium
if (!setting.PREM_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }
  let text = match[1];
  if (!text) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh: /setpwvps ipvps|password_lama|password_baru");
  }
    
  let t = text.split("|");
  if (t.length < 3) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh:\n/setpwvps ipvps|password_lama|password_baru");
  }

  let ipvps = t[0].trim();
  let passwd = t[1].trim();
  let newpw = t[2].trim();

  await bot.sendMessage(chatId, "⏳  ꜱᴇᴅᴀɴɢ ᴘʀᴏꜱᴇꜱ...");

  const connSettings = {
    host: ipvps,
    port: 22,
    username: "root",
    password: passwd
  };

  const command = `bash <(curl -s https://raw.githubusercontent.com/Bangsano/Autoinstaller-Theme-Pterodactyl/refs/heads/main/install.sh)`;
  const conn = new Client();

  conn.on("ready", () => {
    conn.exec(command, (err, stream) => {
      if (err) throw err;

      stream.on("close", async () => {
        conn.end();
      }).on("data", (data) => {
        console.log("STDOUT:", data.toString());
      }).stderr.on("data", (data) => {
        console.log("STDERR:", data.toString());
        stream.write("8\n");
        stream.write(`${newpw}\n`);
        stream.write(`${newpw}\n`);
      });
    });
  }).on("error", (err) => {
    console.log("Connection Error:", err);
    bot.sendMessage(chatId, "❌ ᴋᴀᴛᴀꜱᴀɴᴅɪ ᴀᴛᴀᴜ ɪᴘ ᴛɪᴅᴀᴋ ᴠᴀʟɪᴅ");
  }).connect(connSettings);
    
    let teks = `
*ꜱᴜᴋꜱᴇꜱ ɢᴀɴᴛɪ ᴘᴀꜱꜱᴡᴏʀᴅ ✅*

*ᴅᴇᴛᴀɪʟ ᴘᴀꜱꜱᴡᴏʀᴅ:*
📌 ɪᴘ ᴠᴘꜱ: \`${ipvps}\`
🔑 ᴘᴀꜱꜱᴡᴏʀᴅ: \`${newpw}\`
`;
        await bot.sendMessage(chatId, teks, { parse_mode: "Markdown" });
});

// ─── /installprotectall (versi SSH2) ────────────────────
bot.onText(/^\/installprotectall (.+)$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const senderId = msg.from.id;
  const users = loadData("users.json");
  const input = match[1];
  const text = match[1];
  if (!text) {
    return bot.sendMessage(chatId, "❌ Format salah!\nContoh: /installprotectall ipvps|pwvps");
  }
  
  // Validasi premium
  if (!setting.ADMIN_IDS.includes(userId)) {
      return bot.sendMessage(chatId, '❌ Hanya user premium yang bisa menggunakan perintah ini!');
    }

  // Validasi format input
  if (!input.includes('|')) {
    return bot.sendMessage(chatId, '❌ Salah format!\nGunakan seperti ini:\n`/installprotectall ipvps|pwvps`', { parse_mode: 'Markdown' });
  }

  const [ipvps, pwvps] = input.split('|').map(i => i.trim());
  if (!ipvps || !pwvps) {
    return bot.sendMessage(chatId, '❌ Salah format!\nGunakan seperti ini:\n`/installprotectall ipvps|pwvps`', { parse_mode: 'Markdown' });
  }

  const conn = new Client();
  const scripts = [
    'mbut.sh',
    'mbut2.sh',
    'mbut3.sh',
    'mbut4.sh',
    'mbut5.sh',
    'mbut6.sh',
    'mbut7.sh',
    'mbut8.sh',
    'mbut9.sh',
    'mbut10.sh'
  ];

  bot.sendMessage(chatId, `⏳ Menghubungkan ke VPS *${ipvps}* dan mulai instalasi Protect Panel 1-10...`, { parse_mode: 'Markdown' });

  conn.on('ready', async () => {
    bot.sendMessage(chatId, '⚙️ Koneksi berhasil! Proses instalasi semua Protect Panel sedang berjalan...');

    for (let i = 0; i < scripts.length; i++) {
      const scriptURL = `https://raw.githubusercontent.com/antirusuhnihdeks/mbut/main/${scripts[i]}`;
      bot.sendMessage(chatId, `🚀 Memulai instalasi *${scripts[i]}*...`, { parse_mode: 'Markdown' });

      await new Promise((resolve) => {
        conn.exec(`curl -fsSL ${scriptURL} | bash`, (err, stream) => {
          if (err) {
            bot.sendMessage(chatId, `❌ Gagal mengeksekusi ${scripts[i]}:\n\`${err.message}\``, { parse_mode: 'Markdown' });
            return resolve();
          }

          let output = '';

          stream.on('data', (data) => {
            output += data.toString();
          });

          stream.stderr.on('data', (data) => {
            output += `\n[ERROR] ${data.toString()}`;
          });

          stream.on('close', () => {
            const cleanOutput = output.trim().slice(-3800) || '(tidak ada output)';
            bot.sendMessage(chatId, `✅ *${scripts[i]} selesai!*\n📦 Output terakhir:\n\`\`\`${cleanOutput}\`\`\``, { parse_mode: 'Markdown' });
            resolve();
          });
        });
      });
    }

    conn.end();
    bot.sendMessage(chatId, '🎉 Semua instalasi Protect Panel 1-10 selesai!', { parse_mode: 'Markdown' });
  });

  conn.on('error', (err) => {
    bot.sendMessage(chatId, `❌ Gagal terhubung ke VPS!\nPeriksa IP & Password kamu.\n\nError:\n\`${err.message}\``, { parse_mode: 'Markdown' });
  });

  conn.connect({
    host: ipvps,
    port: 22,
    username: 'root',
    password: pwvps
  });
 });
}

module.exports = { setBotInstance };