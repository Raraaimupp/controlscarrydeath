/*━━━━━━━━━━━━━━━━━━━━━━━━━━━❀
🌸  Script Bot Telegram By Ayame  🌸
━━━━━━━━━━━━━━━━━━━━━━━━━━━❀
📺 Youtube  : @AyameNew
📢 Telegram : @ShinomiyaShop
💬 WhatsApp : 082261639578
📡 Channel  : https://whatsapp.com/channel/0029VarFmXW4Spk7e033IG0W
👥 GroupBot : https://chat.whatsapp.com/KdfviO75ebv0F5YkHDLbqi
━━━━━━━━━━━━━━━━━━━━━━━━━━━❀
💠 © 2025 Ayame Senpai 
🗿 Hapus WM = Dosa Bang
📌 Kalau mau upload di YouTube atau tempat lain,
     Minimal *tag aja ya 😄*
━━━━━━━━━━━━━━━━━━━━━━━━━━━❀
console.log("✅ Script aktif! Terima kasih sudah pakai script Ayame 💕");
*/
require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
// 🔹 Ambil token dari .env
const TOKEN = process.env.BOT_TOKEN
if (!TOKEN) {
  console.error('❌ BOT_TOKEN not found in .env')
  process.exit(1)
}
// 🔹 Aktifkan bot
const bot = new TelegramBot(TOKEN, { polling: true })
const prefixes = ['.', '/']

console.log('🤖 Telegram bot is running...')
// =============================
// 🔹 Auto Welcome Member Baru
// =============================
bot.on('new_chat_members', async (msg) => {
  const chatId = msg.chat.id

  try {
    for (const member of msg.new_chat_members) {
      const mention = member.username
        ? `@${member.username}`
        : `[klik di sini](tg://user?id=${member.id})`

      const welcomeText = `🎉 Selamat datang ${mention} di grup *${msg.chat.title}*!\nSemoga betah dan ikut aktif ngobrol bareng 😄`

      await bot.sendMessage(chatId, welcomeText, { parse_mode: 'Markdown' })
      console.log(`✅ Welcome dikirim ke ${member.id}`)
    }
  } catch (err) {
    console.error('❌ Gagal kirim welcome:', err)
  }
})
// =============================
// 🔹 Command handler biasa
// =============================
bot.on('message', async (msg) => {
  try {
    const chatId = msg.chat.id
    const text = msg.text || msg.caption || ''
    const prefix = prefixes.find(p => text.startsWith(p))
    if (!prefix) return

    const args = text.slice(prefix.length).trim().split(/\s+/)
    const command = args.shift()?.toLowerCase()

    console.log(`⚙️ Command terdeteksi: ${command} | Prefix: ${prefix}`)
//=============================================================   
    switch (command) {
//🗿 Simple Menu
case 'start':
case 'menu': {
  const photoPath = './image.jpg'; // Ganti sesuai file kamu
  const caption = `\`\`\`┌── SYSTEM BOOT : RARAA SIMPLE 
┌───────────────────────────────────
│ Initializing core modules... [OK]
│ Connecting to Telegram API... [READY]
│ System Online. Awaiting user input.
│
│ Welcome to Sanaka Bot Command Interface.
│ Type /menu or tap the buttons below to begin.
└────────────────────────────────────

┌── COMMAND LIST:
────────────────────────────────────
/ping  → Test system response  
/play [judul]  → Download YouTube music  
/pin [teks]  → Search image on Pinterest  
/tiktoksearch [q]  → Random TikTok video  
/waifu  → Random anime image  
/tiktok [link]  → Download TikTok video  
/gura  → Edit photo with Gura  
/runtime  → Bot uptime  
/sticker  → Convert image to sticker  
/menu  → Show this menu
└────────────────────────────────────
Developer : @raraa_imuppp  
Status    : Online\`\`\`
`;

  const buttons = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Channel Testimoni', url: 'https://t.me/+Xge8v6Hsj7Y5ZDFl' },
        ],
        [
          { text: 'Developer', url: 'https://t.me/raraa_imuppp' },
          { text: 'Channel', url: 'https://t.me/kepoluyee' },
        ],
      ],
    },
    parse_mode: 'MarkdownV2',
    disable_web_page_preview: true,
  };

  await bot.sendPhoto(chatId, photoPath, {
    caption,
    ...buttons,
  });
  break;
}
 // 🔹 =============CASE / COMMAND SECTION/========================
case 'stiker':
case 'sticker':
case 's': {
  try {
    // Ambil file yang direply
    const photo = msg.reply_to_message?.photo?.pop()
    if (!photo) return bot.sendMessage(chatId, `📸 Balas gambar dengan perintah *${prefix + command}* untuk dijadikan stiker.`)

    bot.sendMessage(chatId, '🖼️ Tunggu sebentar, sedang membuat stiker...')

    // Ambil path file
    const file = await bot.getFile(photo.file_id)
    const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${file.file_path}`

    // Ambil gambar lalu kirim ulang ke Telegram sebagai stiker
    const axios = require('axios')
    const fs = require('fs')
    const path = require('path')
    const tempFile = path.join(__dirname, 'temp.webp')

    // Download file dan ubah ke webp
    const sharp = require('sharp')
    const res = await axios.get(fileUrl, { responseType: 'arraybuffer' })
    await sharp(res.data).webp({ quality: 90 }).toFile(tempFile)

    await bot.sendSticker(chatId, tempFile, { reply_to_message_id: msg.message_id })

    fs.unlinkSync(tempFile) // hapus setelah dikirim
  } catch (e) {
    console.error(e)
    bot.sendMessage(chatId, '❌ Gagal membuat stiker. Pastikan kamu balas gambar ya!')
  }
}
break
case 'gura': {
  try {
    const axios = require('axios')

    // cek kalau user reply atau kasih link gambar
    const imageUrl = msg.reply_to_message?.photo
      ? await bot.getFileLink(msg.reply_to_message.photo.pop().file_id)
      : args[0]

    if (!imageUrl)
      return bot.sendMessage(
        chatId,
        `Contoh: ${prefix + command} https://telegra.ph/file/xxxx.jpg\nAtau balas gambar dengan perintah ${prefix + command}`
      )

    bot.sendMessage(chatId, '🧜‍♀️ Gura lagi menggigit gambarmu... tunggu ya!')

    const apiUrl = `https://api.nekolabs.my.id/canvas/gura?imageUrl=${encodeURIComponent(imageUrl)}`
    const res = await axios.get(apiUrl, { responseType: 'arraybuffer' })

    await bot.sendPhoto(chatId, res.data, { caption: '🩵 Nih hasil edit Gura kamu~' })
  } catch (err) {
    console.error(err)
    bot.sendMessage(chatId, '❌ Terjadi kesalahan saat membuat gambar Gura.')
  }
}
break
case 'runtime': case 'uptime': {
  try {
    const os = require('os')

    // Hitung uptime bot
    const uptime = process.uptime()
    const days = Math.floor(uptime / (60 * 60 * 24))
    const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((uptime % (60 * 60)) / 60)
    const seconds = Math.floor(uptime % 60)

    // Format teks runtime
    const runtimeText = `🤖 *BOT STATUS*\n
🕒 *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s
💾 *Platform:* ${os.platform()}
⚙️ *CPU:* ${os.cpus()[0].model}
📈 *RAM:* ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB Total
🧠 *Free RAM:* ${(os.freemem() / 1024 / 1024).toFixed(2)} MB
\n© ${global.botname || 'Raraa Bot'}`

    await bot.sendMessage(chatId, runtimeText, { parse_mode: 'Markdown' })
  } catch (e) {
    console.error(e)
    bot.sendMessage(chatId, '❌ Gagal menampilkan runtime bot.')
  }
  break
}
case 'tiktoksearch': {
  try {
    const axios = require('axios')

    if (!args[0]) {
      return bot.sendMessage(chatId, '🔍 Contoh penggunaan:\n.tiktoksearch sad\n\nKetik kata kunci apa pun untuk mencari video TikTok.')
    }

    const query = args.join(' ')
    await bot.sendMessage(chatId, `🔎 Mencari video TikTok dengan kata kunci: *${query}*...`, { parse_mode: 'Markdown' })

    const apiUrl = `https://api.siputzx.my.id/api/s/tiktok?query=${encodeURIComponent(query)}`
    const res = await axios.get(apiUrl)
    const data = res.data

    if (!data?.status || !data?.data?.length) {
      return bot.sendMessage(chatId, '❌ Tidak ditemukan hasil untuk kata kunci tersebut.')
    }

    const first = data.data[0]
    const videoUrl = first.play
    const caption = `🎬 *${first.title || 'Tanpa judul'}*\n👤 ${first.author || 'Unknown'}\n\n© ${global.botname}`

    await bot.sendMessage(chatId, '📥 Mengunduh dan mengirim video pertama...')
    await bot.sendVideo(chatId, videoUrl, { caption, parse_mode: 'Markdown' })

  } catch (e) {
    console.error('❌ Error TikTok Search:', e.message)
    bot.sendMessage(chatId, '❌ Gagal mengambil atau mengirim video. Coba lagi nanti.')
  }
  break
}
case 'tiktok': {
  try {
    const axios = require('axios')
    const fs = require('fs')
    const path = require('path')

    if (!args[0]) {
      return bot.sendMessage(chatId, '📱 Contoh penggunaan:\n.tiktok https://vt.tiktok.com/ZSjXNEbnC/')
    }

    const tiktokUrl = args[0]
    await bot.sendMessage(chatId, '⏳ Tunggu sebentar, sedang memproses video TikTok...')

    const apiUrl = `https://api.siputzx.my.id/api/d/tiktok?url=${encodeURIComponent(tiktokUrl)}`
    const res = await axios.get(apiUrl, { timeout: 20000 })
    const data = res.data

    console.log('📦 Data API TikTok:', data)

    if (!data?.status || !data?.data?.urls?.length) {
      return bot.sendMessage(chatId, '❌ Tidak dapat mengambil data dari API. Coba lagi nanti.')
    }

    const videoUrl = data.data.urls[0]
    const filePath = path.join(__dirname, `tiktok_${Date.now()}.mp4`)

    // Download video buffer langsung ke file
    const response = await axios.get(videoUrl, { responseType: 'arraybuffer' })
    fs.writeFileSync(filePath, response.data)

    // Kirim video langsung
    await bot.sendVideo(chatId, filePath, {
      caption: `🎬 *TikTok Downloader*\n✅ Video berhasil diunduh.`,
      parse_mode: 'Markdown'
    })

    // Hapus file setelah dikirim
    fs.unlinkSync(filePath)

  } catch (e) {
    console.error('❌ Error TikTok:', e.message)
    bot.sendMessage(chatId, '❌ Terjadi kesalahan saat memproses video TikTok.')
  }
  break
}
case 'waifu': {
  try {
    // Tambahkan query acak biar hasilnya gak ke-cache
    const random = Math.floor(Math.random() * 999999)
    const imageUrl = `https://api.siputzx.my.id/api/r/waifu?nocache=${random}`

    await bot.sendPhoto(
      msg.chat.id,
      imageUrl,
      {
        caption: `💞 Random Waifu #${random}\n\n© ${msg.from.first_name || 'User'}`
      }
    )
  } catch (e) {
    console.error('Error waifu:', e)
    await bot.sendMessage(msg.chat.id, '⚠️ Gagal mengambil gambar waifu, coba lagi nanti!')
  }
  break
}
case 'pin':
case 'pinterest':
case 'pindl': {
  if (!args[0]) return bot.sendMessage(chatId, '📸 Contoh: `.pinterest kucing`\n(Otomatis ambil gambar)')

  const query = args.join(' ')
  await bot.sendMessage(chatId, '🔎 Sedang mencari gambar di Pinterest...')

  try {
    const axios = require('axios')
    const res = await axios.get('https://api.siputzx.my.id/api/s/pinterest', {
      params: { query, type: 'image' },
      timeout: 10000
    })

    const data = res.data
    if (!data.status || !data.data || data.data.length === 0) {
      return bot.sendMessage(chatId, `❌ Tidak ada hasil ditemukan untuk: *${query}*`, { parse_mode: 'Markdown' })
    }

    const validImages = data.data.filter(v => v.image_url && v.image_url.startsWith('http'))
    if (validImages.length === 0) {
      return bot.sendMessage(chatId, '⚠️ Tidak ada gambar valid ditemukan dari API.')
    }

    const hasil = validImages[Math.floor(Math.random() * validImages.length)]
    const img = hasil.image_url
    const pin = hasil.pin || 'Tidak tersedia'
    const user = hasil.pinner?.username || '-'

    await bot.sendPhoto(chatId, img, {
      caption: `🖼️ *Hasil Pinterest*\n🔎 Query: ${query}\n👤 User: ${user}\n🔗 ${pin}`,
      parse_mode: 'Markdown'
    })
  } catch (e) {
    console.error('Pinterest Error:', e.message)
    bot.sendMessage(chatId, '❌ Terjadi kesalahan saat mengambil data dari API Pinterest.\nMungkin server sedang lambat atau gambar kosong.')
  }
  break
}
case 'play': {
        const ytdl = require('@vreden/youtube_scraper');
        const yts = require('yt-search');

        const query = args.join(' ');
        if (!query) {
          await bot.sendMessage(chatId, `❌ Contoh penggunaan: .play Night Changes`);
          break;
        }

        // cari video di YouTube
        const res = await yts(query);
        const video = res.videos[0];
        if (!video) {
          await bot.sendMessage(chatId, '⚠️ Video tidak ditemukan!');
          break;
        }

        // info video
        const caption = `🎵 *Menemukan Lagu:*\n\n📌 Judul: ${video.title}\n🔗 URL: ${video.url}\n⏱️ Durasi: ${video.timestamp}\n\nSedang mengunduh audio...`;

        // kirim thumbnail + caption
        await bot.sendPhoto(chatId, video.thumbnail, { caption });

        // ambil link MP3 via ytmp3
        const data = await ytdl.ytmp3(video.url);
        if (data.status && data.download && data.download.url) {
          await bot.sendAudio(chatId, data.download.url, {
            title: video.title,
            performer: video.author.name,
          });
        } else {
          await bot.sendMessage(chatId, '❌ Error! Gagal mengunduh audio.');
        }
        break;
      }
      case 'ping': {
        const start = Date.now()
        const sent = await bot.sendMessage(chatId, '🏓 Pinging...')
        const latency = Date.now() - start
        await bot.editMessageText(`PONG! 🏓\nLatency: ${latency} ms`, {
          chat_id: chatId,
          message_id: sent.message_id,
        })
        break
      }
//====≠==========≠====BATAS JANGAN DI APA APAIN====================
      default:
        await bot.sendMessage(chatId, `❌ Unknown command: ${command}\nCoba .ping`)
    }
  } catch (err) {
    console.error('⚠️ Error:', err)
  }
})

process.on('SIGINT', () => {
  console.log('🛑 Bot stopped.')
  bot.stopPolling()
  process.exit(0)
})
