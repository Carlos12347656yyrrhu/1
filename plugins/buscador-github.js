import MessageType from '@adiwajshing/baileys'
import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, { conn, text, usedPrefix, command }) => {
try {
if (!text) throw `⚠️ 𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝙐𝙉 𝙍𝙀𝙋𝙊𝙎𝙄𝙏𝙊𝙍𝙄𝙊 𝘿𝙀 𝙂𝙄𝙏𝙃𝙐𝘽\n\n📌 Ejemplo: ${usedPrefix + command} CuriosityBotV1-MD`
let res = await fetch(global.API('https://api.github.com', '/search/repositories', { q: text }))
let json = await res.json()
if (res.status !== 200) throw json
let str = json.items.map((repo, index) => {
return `
▢ 📦 Resultado: ${1 + index}
▢ 📎 Link: ${repo.html_url}
▢ 🍁 Creador: ${repo.owner.login}
▢ 🔍 Nombre: ${repo.name}
▢ 📅 Creado: ${formatDate(repo.created_at)}
▢ ⏱️ Actualizado: ${formatDate(repo.updated_at)}
▢ 👀 Visitas: ${repo.watchers}
▢ ⚜️ Bifurcado: ${repo.forks}
▢ ⭐ Estrellas: ${repo.stargazers_count}
▢ 🎭 Issues: ${repo.open_issues}
▢ 📓 Descripción: ${repo.description ? `${repo.description}` : 'Sin Descripción'}
▢ 🥃 Clone: ${repo.clone_url}
`.trim()}).join('\n\n─────────────────\n\n')
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]
let buttonMessage= {
'document': { url: `https://github.com/Azami19/CuriosityBotV1-MD` },
'mimetype': `application/${document}`,
'fileName': `CuriosityBot-MD`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'forwardingScore': 200,
'isForwarded': true,
'externalAdReply': {
'mediaUrl': 'https://github.com/Azami19/CuriosityBotV1-MD',
'mediaType': 2,
'previewType': 'pdf',
'title': `• Resultados Encontrados🔎`,
'body': global.wm,
'thumbnail': await (await fetch(json.items[0].owner.avatar_url)).buffer(),
'sourceUrl': 'https//wa.me/524531106422'}},
'caption': str,
'footer': `• Si desea descargar un\n*repositorio de Github*\n*escriba ${usedPrefix}gitclone <LINK>*`,
'buttons':[
{buttonId: `${usedPrefix}menu`, buttonText: {displayText: 'Menú 🤖'}, type: 1}, 
{buttonId: `${usedPrefix}infobot`, buttonText: {displayText: 'Info 📦'}, type: 1}],
'headerType': 6 }
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
} catch {
    m.reply('⚠️ *_𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎 𝙉𝙊 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝘼𝘿𝙊𝙎_*')
  }
}
handler.help = ['githubsearch'].map(v => v + '')
handler.tags = ['search']

handler.command = /^(githubsearch)$/i
handler.register = true

export default handler 

function formatDate(n, locale = 'es') {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
