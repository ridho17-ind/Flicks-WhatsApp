/*
# Haruka - UserBot
# Copyright (C) 2021 Haruka-Bot Created By ZeeoneOfc
#
# This file is a part of < https://github.com/zeeoneofc/Haruka/ >
# PLease read the GNU Affero General Public License in
# <https://www.github.com/zeeoneofc/Haruka/blob/v1/LICENSE/>.
*/ 

// WhatsApp api
const
	{
		WAConnection ,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		WAMessageProto,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		relayWAMessage,
		mentionedJid,
		processTime
	} = require("@adiwajshing/baileys")
	
//module exports
const axios = require("axios")
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")  
const crypto = require('crypto')
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI()
const fetch = require('node-fetch');
const ffmpeg = require('fluent-ffmpeg') 
const figlet = require('figlet')
const fs = require('fs')
const gis = require('g-i-s')
const hx = require('hxz-api')
const ms = require('parse-ms')
const moment = require('moment-timezone')
const request = require('request')
const speed = require('performance-now')
const util = require('util')
const xa = require('xfarr-api')
const yts = require( 'yt-search')
const ytdl = require("ytdl-core")
const zee = require('api-alphabot')

//library
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('../lib/functions')
const { fetchJson, kyun, fetchText } = require('../lib/fetcher')
const { color, bgcolor } = require('../lib/color')
const { yta, ytv} = require('../lib/y2mate')
const simple = require('../lib/simple')
const { uploadImages } = require('../lib/uploadimage')

//json
const antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _registered = JSON.parse(fs.readFileSync('./database/user/registered.json'))
const _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const premium = JSON.parse(fs.readFileSync('./database/user/premium.json'))

const tebakgambar = JSON.parse(fs.readFileSync('./database/game/tebakgambar.json'))

//settings
const setting = JSON.parse(fs.readFileSync('./settings/config.json'))
let {
	ownername,
	ownernumber,
	botname,
	session_name,
	background
	} = setting
let thumbnail = fs.readFileSync(setting.thumbnail)
let limitawal = setting.limit.free

/*
# language
# available now [ind]
*/
const  { ind } = require(`./help`)
lang = ind 

//times
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')

//start script
			async function starts() {
				const haruka = new WAConnection()
				haruka.version = [2, 2143, 3]  //jika ada update dari WhatsApp web silahkan ubah
				haruka.logger.level = 'warn'
				console.log(color(figlet.textSync('Haruka-Bot', {
					font: 'Standard',
					horizontalLayout: 'default',
					vertivalLayout: 'default',
					whitespaceBreak: false
					}), 'skyblue'))
				haruka.on('qr', () => {
					console.log(color('[','white'), color('!','red'), color(']','white'), color('SCAN QR MASK 15 SECONDS, AND SUBSCRIBE YOUTUBE ZEEONE OFC'))
					})
			fs.existsSync(`./settings/${session_name}`) && haruka.loadAuthInfo(`./settings/${session_name}`)
			haruka.on('connecting', () => {
				console.log('|\x1b[1;32m TRM \x1b[1;37m|', color('Connecting...', 'yellow'))
				})
			haruka.on('open', () => {
				console.log('|\x1b[1;32m TRM \x1b[1;37m|', color('Connected', 'yellow'))
			})
			await haruka.connect({timeoutMs: 30*1000})
			fs.writeFileSync(`./settings/${session_name}`, JSON.stringify(haruka.base64EncodedAuthInfo(), null, '\t'))

					
//greetings
				haruka.on('group-participants-update', async(anu) => {
					try {
						const sendButLoc = async (id, text1, desc1, gam1, but = [], options = {}) => {
							const mediaxxaaaa = await haruka.prepareMessage(id, gam1, MessageType.location, {thumbnail: gam1})
							var mhan = mediaxxaaaa.message["ephemeralMessage"] ? mediaxxaaaa.message.ephemeralMessage : mediaxxaaaa
							const buttonMessages = {
								locationMessage: mhan.message.locationMessage,
								contentText: text1,
								footerText: desc1,
								buttons: but,
								headerType: 6
								}
							haruka.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
						}
						const mdata = await haruka.groupMetadata(anu.jid)
						console.log(anu)
						num = anu.participants[0]
						let v = haruka.contacts[num] || { notify: num.replace(/@.+/, "") };
						anu_user = v.vname || v.notify || num.split("@")[0];
						try {
							ppmem = await haruka.getProfilePicture(num);
							} catch (e) {
								ppmem = 'https://telegra.ph/file/f8df36078279304745bae.png'
								}
						try {
							ppgc = await haruka.getProfilePicture(anu.jid);
							} catch (e) {
								ppgc = 'https://telegra.ph/file/d4c05638fa7886a1d8060.jpg'
								}
						let ppmem2 = await getBuffer(ppmem)
						let ppmem3 = await uploadImages(ppmem2)
						let ppgc2 = await getBuffer(ppgc)
						let ppgc3 = await uploadImages(ppgc2)
						let gakloo = [{
										"buttonId": `.owner`,
										"buttonText": {
											"displayText": "Welcome 👋"
											},
										"type": "RESPONSE"
										}]
						if (anu.action == 'add' && !num.includes(haruka.user.jid)) {
							welcome = await getBuffer(`https://api-alphabot.herokuapp.com/api/greetings/welcome2?name=${encodeURI(anu_user)}&member=${encodeURI(mdata.participants.length)}&groupName=${encodeURI(mdata.subject)}&ppuser=${ppmem3}&bgurl=${background}&apikey=Alphabot`)
							try{
							await sendButLoc(mdata.id, `Welcome @${num.split('@')[0]} to ${mdata.subject}` + '\n' + lang.welcome(), `Welcome Message By ${ownername}`,welcome, [{"buttonId": `.owner`,"buttonText": {"displayText": "Welcome 🤗"},"type": "RESPONSE"}], {contextInfo: { mentionedJid: [num]}})
							} catch {
								await sendButLoc(mdata.id, `Welcome @${num.split('@')[0]} to ${mdata.subject}` + '\n' + lang.welcome(), `Welcome Message By ${ownername}`,ppmem2, [{"buttonId": `.owner`,"buttonText": {"displayText": "Welcome 🤗"},"type": "RESPONSE"}], {contextInfo: { mentionedJid: [num]}})
							}
						} else if (anu.action == 'remove' && !num.includes(haruka.user.jid)) {
							goodbye = await getBuffer(`https://api-alphabot.herokuapp.com/api/greetings/goodbye2?name=${encodeURI(anu_user)}&member=${encodeURI(mdata.participants.length)}&groupName=${encodeURI(mdata.subject)}&ppuser=${ppmem3}&bgurl=${background}&apikey=Alphabot`)
							try{
							await sendButLoc(mdata.id, `Goodbye @${num.split('@')[0]}\n⌯ָ   ֙Leave from group:\n${mdata.subject}` + '\n' + lang.leave(), `Leave Message By ${ownername}`,goodbye, [{"buttonId": `.owner`,"buttonText": {"displayText": "Bye 🤲"},"type": "RESPONSE"}], {contextInfo: { mentionedJid: [num]}})
							} catch {
								await sendButLoc(mdata.id, `Goodbye @${num.split('@')[0]}\n⌯ָ   ֙Leave from group:\n${mdata.subject}` + '\n' + lang.leave(), `Leave Message By ${ownername}`,ppmem2, [{"buttonId": `.owner`,"buttonText": {"displayText": "Bye 🤲"},"type": "RESPONSE"}], {contextInfo: { mentionedJid: [num]}})
							}
							
						}
				} catch (e) {
					console.log('Error : %s', color(e, 'red'))
					}
				})
				
				haruka.on('chat-update', async (mek) => {
					try {
						if (!mek.hasNewMessage) return
						 mek = mek.messages.all()[0]
						if (!mek.message) return
						if (mek.key && mek.key.remoteJid == 'status@broadcast') return
						if (mek.key.fromMe) return
						mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
						const content = JSON.stringify(mek.message)
						const from = mek.key.remoteJid
						const type = Object.keys(mek.message)[0]
						const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
						const wita = moment(Date.now()).tz('Asia/Makassar').locale('id').format('HH:mm:ss z')
						const wit = moment(Date.now()).tz('Asia/Jayapura').locale('id').format('HH:mm:ss z')
						const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
						var prefix = /^[°•π÷×¶∆£¢€¥®™✓|~zZ+×_*!#$%^&./\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓|~+×_*!#$,|`÷?;:%%^&./\\©^]/gi) : '#'
						body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : (type == "buttonsResponseMessage") && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
						var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
						const manti = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
						budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
						const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
						const arg = budy.slice(command.length + 2, budy.length)
						const args = body.trim().split(/ +/).slice(1)
						const q = args.join(' ')
						const runtime = process.uptime()   
						const isCmd = body.startsWith(prefix)
						const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = haruka.user.phone
						const botNumber = haruka.user.jid
						const ownerNumber = [`${ownernumber}@s.whatsapp.net`] 
						const isGroup = from.endsWith('@g.us')
						const totalchat = await haruka.chats.all()
						const sender = mek.key.fromMe ? haruka.user.jid : isGroup ? mek.participant : mek.key.remoteJid
						const isOwner = mek.key.fromMe ? haruka.user.jid : ownerNumber.includes(sender)
						const conts = mek.key.fromMe ? haruka.user.jid : haruka.contacts[sender] || { notify: jid.replace(/@.+/, '') }
						const pushname = mek.key.fromMe ? haruka.user.name : conts.notify || conts.vname || conts.name || '-'
						
						//apaya
						const isAntiLink = isGroup ? antilink.includes(from) : false
						
						const groupMetadata = isGroup ? await haruka.groupMetadata(from) : ''
						const groupName = isGroup ? groupMetadata.subject : ''
						const groupId = isGroup ? groupMetadata.jid : ''
						const groupMembers = isGroup ? groupMetadata.participants : ''
						const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
						const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
						const isGroupAdmins = groupAdmins.includes(sender) || false
						
			//fake reply
			let ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net",   "remoteJid": "6289523258649-1604595598@g.us"  }, "message": {orderMessage: {itemCount: 2021,status: 200, thumbnail: thumbnail, surface: 200, message: `${botname} 🏟️\nBy ${ownername}`, orderTitle: 'zeeoneofc', sellerJid: '0@s.whatsapp.net'}},sendEphemeral: true}
      	  let fdoc = {key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `© ${ownername}`,jpegThumbnail: thumbnail}}}
   	     let fvn = {key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289643739077-1613049930@g.us" } : {})},message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds":99999,"ptt": "true"}} } 
	        let fgif = {key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289643739077-1613049930@g.us" } : {})},message: {"videoMessage": { "title":`© ${ownername}`, "h": `Hmm`,'seconds': '99999', 'gifPlayback': 'true', 'caption': `${botname} 🏟️\nBy ${ownername}`, 'jpegThumbnail': thumbnail}}}
			let fgclink = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "6288213840883-1616169743@g.us","inviteCode": "m","groupName": "P", "caption": `© ${botname}`, 'jpegThumbnail': thumbnail}}}
			let fgclink2 = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "6288213840883-1616169743@g.us","inviteCode": "m","groupName": "P", "caption": `© ${botname}`, 'jpegThumbnail': thumbnail}}}
			let fvideo = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289643739077-1613049930@g.us" } : {}) },message: { "videoMessage": { "title":`© ${ownername}`, "h": `Hmm`,'seconds': '99999', 'caption': `© ${ownername}`, 'jpegThumbnail': thumbnail}}}
			let floc = {contextInfo: {"forwardingScore":999,"isForwarded":true,'stanzaId': 'B826873620DD5947E683E3ABE663F263', 'participant':`0@s.whatsapp.net`, 'remoteJid': '6283136505591-1614953337@g.us', 'quotedMessage': {"locationMessage": {"degreesLatitude": 41.893714904785156, "degreesLongitude": -87.63370513916016, "name": botname , 'jpegThumbnail':thumbnail}}}}
			let fkontak = { key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `6283136505591-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `© ${ownername}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${ownername},;;;\nFN:${ownername},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': thumbnail, thumbnail: thumbnail,sendEphemeral: true}}}
		
			const addRegisteredUser = (userid, sender, time, serials) => {
				const obj = { id: userid, name: sender, time: time, serial: serials }
				_registered.push(obj)
				fs.writeFileSync('./database/user/registered.json', JSON.stringify(_registered))
			}
			const createSerial = (size) => {
				return crypto.randomBytes(size).toString('hex').slice(0, size)
			}
			function bytesToSize(bytes) {
    return new Promise((resolve, reject) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return 'n/a';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        if (i === 0) resolve(`${bytes} ${sizes[i]}`);
        resolve(`${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`);
    });
  };
			
			const checkRegisteredUser = (sender) => {
				let status = false
				Object.keys(_registered).forEach((i) => {
					if (_registered[i].id === sender) {
						status = true
						}
					})
				return status
			}
			
			const checkLimit = (sender) => {
				let found = false
				for (let lmt of _limit) {
					if (lmt.id === sender) {
						let limitCounts = limitawal - lmt.limit
						if (limitCounts <= 0) return haruka.sendMessage(from,`Limit kamu sudah habis`, text,{ quoted: mek})
						haruka.sendMessage(from, lang.limitcount(isPremium, limitCounts), text, { quoted : mek})
						found = true
					}
				}
					if (found === false) {
						let obj = { id: sender, limit: 1 }
						_limit.push(obj)
						fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
						haruka.sendMessage(from, lang.limitcount(isPremium, limitCounts), text, { quoted : mek})
						}
					}
			const isLimit = (sender) =>{ 
				let position = false
				for (let i of _limit) {
					if (i.id === sender) {
						let limits = i.limit
						if (limits >= limitawal ) {
							position = true
							haruka.sendMessage(from, lang.limitend(pushname), text, {quoted: mek})
							return true
						} else {
							_limit
							position = true
						return false
						}
					}
				}
				if (position === false) {
					const obj = { id: sender, limit: 0 }
					_limit.push(obj)
					fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit))
					return false
					}
				}
				
				const limitAdd = (sender) => {
					if (isOwner && isPremium) {return false;}
					let position = false
					Object.keys(_limit).forEach((i) => {
						if (_limit[i].id == sender) {
							position = i
							}
						})
				if (position !== false) {
					_limit[position].limit += 1
					fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
					}
				}
						
			//function
			const reply = (teks) => {
				haruka.sendMessage(from, teks, text, { quoted: mek, thumbnail: thumbnail})
			}
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? haruka.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : haruka.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
			}
		    const sleep = async (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms));
			}
			const sendMess = (hehe, teks) => {
				haruka.sendMessage(hehe, teks, text)
			}
			
			const sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './sticker' + names + '.png', async function () {
                    console.log('selesai');
                    let filess = './sticker' + names + '.png'
                    let asw = './sticker' + names + '.webp'
                    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                        let media = fs.readFileSync(asw)
                        haruka.sendMessage(to, media, MessageType.sticker,{quoted:mek})
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
                    });
                });
            }
			const sendMediaURL = async(to, url, text="", mids=[]) =>{
				if(mids.length > 0){
					text = normalizeMention(to, text, mids)
					}
					const fn = Date.now() / 10000;
					const filename = fn.toString()
					let mime = ""
					var download = function (uri, filename, callback) {
						request.head(uri, function (err, res, body) {
							mime = res.headers['content-type']
							request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
							});
							};
							download(url, filename, async function () {
								console.log('done');
								let media = fs.readFileSync(filename)
								let type = mime.split("/")[0]+"Message"
								if(mime === "image/gif"){
									type = MessageType.video
									mime = Mimetype.gif
									}
									if(mime.split("/")[0] === "audio"){
										mime = Mimetype.mp4Audio
										}
										haruka.sendMessage(to, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
										fs.unlinkSync(filename)
									});
								} 
			async function sendFileFromUrl(from, url, caption, mek, men) {
				let mime = '';
				let res = await axios.head(url)
				mime = res.headers['content-type']
				let type = mime.split("/")[0]+"Message"
				if(mime === "image/gif"){
					type = MessageType.video
					mime = Mimetype.gif
					}
				if(mime === "application/pdf"){
					type = MessageType.document
					mime = Mimetype.pdf
					}
				if(mime.split("/")[0] === "audio"){
					mime = Mimetype.mp4Audio
					}
					return haruka.sendMessage(from, await getBuffer(url), type, {caption: caption, quoted: mek, thumbnail: Buffer.alloc(0), mimetype: mime, contextInfo: {"mentionedJid": men ? men : []}})
				}
				
				// send message button
				const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
					const buttonMessage = {
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 1,
						};
						haruka.sendMessage(id, buttonMessage, MessageType.buttonsMessage, options);
					};
				const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
					them = gam1
					mediaxxaa = await haruka.prepareMessage(id, them, MessageType.location, {thumbnail: them})
					locmhan = mediaxxaa.message["ephemeralMessage"] ? mediaxxaa.message.ephemeralMessage : mediaxxaa
					const buttonMessages = {
						locationMessage: locmhan.message.locationMessage,
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 6
						}
						haruka.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
						}
				const sendButVideo = async(id, text1, desc1, vid1, but = [], options = {}) => {
					them = vid1
					mediaxxaa = await haruka.prepareMessage(id, them, MessageType.video)
					vimhan = mediaxxaa.message["ephemeralMessage"] ? mediaxxaa.message.ephemeralMessage : mediaxxaa
					const buttonMessages = {
						videoMessage: vimhan.message.videoMessage,
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 5
						}
						haruka.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
						}
				const sendButImage = async(id, text1, desc1, vid1, but = [], options = {}) => {
					them = vid1
					mediaxxaa = await haruka.prepareMessage(id, them, MessageType.image, {thumbnail: Buffer.alloc(0)})
					imgmhan = mediaxxaa.message["ephemeralMessage"] ? mediaxxaa.message.ephemeralMessage : mediaxxaa
					const buttonMessages = {
						imageMessage: imgmhan.message.imageMessage,
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 4
						}
					haruka.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
				}
				
				// antilink
                if (manti.includes("://chat.whatsapp.com/")){
		        if (!isGroup) return
		        if (!isAntiLink) return
		        if (isGroupAdmins) return
		        var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		        await haruka.sendMessage(from, `Hmm maap nih gua kick, dilarang share link di group ini`, text , {quoted: mek})
		        haruka.groupRemove(from, [kic]).catch((e)=>{reply(`Bot Harus Jadi Admin`)})
		        }
			//game 
			if (tebakgambar.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
                jawaban = tebakgambar[sender.split('@')[0]]
                if (budy.toLowerCase() == jawaban) {
                    sendButMessage(from, "Selamat Jawaban kamu benar!", `� ${ownername}`, [{"buttonId": `.tebakgambar`,"buttonText": {"displayText": "Tebak Gambar"},"type": "RESPONSE"}], {quoted : mek})
                    delete tebakgambar[sender.split('@')[0]]
                    fs.writeFileSync("./database/game/tebakgambar.json", JSON.stringify(tebakgambar))
                } else {
                    reply("Jawaban Salah!")
                }
            }
			colors = ['red', 'pink', 'white', 'black', 'blue', 'yellow', 'green']
			const isHaruka = checkRegisteredUser(sender)
			const isPremium = premium.includes(sender) || isOwner
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')			 			  
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isQuotedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage')
			//console termux
			console.log(chalk.black(chalk.bgWhite('| MSG |')), time, chalk.black(chalk.bgBlue(budy || command)), 'from', color(pushname), 'args :', color(args.length), 'in', chalk.green(groupName? groupName : 'Private chat'))
		
//colong aja bang, ingat jgn asal colong ntr sc lu error
switch (command) {
case 'menu': case 'help': case 'haruka':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
				sendButLocation(from, lang.menu(prefix, salam, pushname), '© ' + ownername, thumbnail, [{buttonId: '.owner', buttonText: {displayText: 'Owner'}, type: 1},{buttonId: '.infobot', buttonText:{displayText: 'Infobot'}, type: 1}], {quoted: mek})
				break
case 'infobot':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			reply('Update bot selanjutnya silahkan cek YouTube zeeone ofc')
break
case 'owner':{
	if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
		const ownerContact = [ownernumber, "", "", "", "", "", "", "", "", "", "" , "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
		let ini_list = []
		for (let i of ownerContact.map(v => v + '@s.whatsapp.net')) {
			const vname = haruka.contacts[i] != undefined ? haruka.contacts[i].vname || haruka.contacts[i].notify : undefined
			ini_list.push({
				"displayName": `${ownername}`,
				"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${vname}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
				})
				}
				hehe = await haruka.sendMessage(from, {
					"displayName": `${ini_list.length} kontak`,
					"contacts": ini_list 
					}, 'contactsArrayMessage', { quoted: mek })
					haruka.sendMessage(from, `Nih Kak Contact Owner Ku, Cuma Sv Nomor Cewe Ya 🤝`, text, {quoted: hehe})
				}
			break
case 'sticker':case 'stiker':case 'stickergif':case 'stikergif':case 'sgif':case 's':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
			const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
			const media = await haruka.downloadAndSaveMediaMessage(encmedia)
			ran = getRandom('.webp')
			await ffmpeg(`./${media}`)
			.input(media)
			.on('start', function (cmd) {
				console.log(`Started : ${cmd}`)
				})
				.on('error', function (err) {
					console.log(`Error : ${err}`)
					fs.unlinkSync(media)
					reply('Eror')
					})
			.on('end', function () {
				console.log('Finish')
				haruka.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
				fs.unlinkSync(media)
				fs.unlinkSync(ran)
				})
				.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
				.toFormat('webp')
				.save(ran)
				} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
				const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
				const media = await haruka.downloadAndSaveMediaMessage(encmedia)
				ran = getRandom('.webp')
				await ffmpeg(`./${media}`)
				.inputFormat(media.split('.')[1])
				.on('start', function (cmd) {
					console.log(`Started : ${cmd}`)
					})
					.on('error', function (err) {
						console.log(`Error : ${err}`)
						fs.unlinkSync(media)
						tipe = media.endsWith('.mp4') ? 'video' : 'gif'
						reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
						})
						.on('end', function () {
							console.log('Finish')
							haruka.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
							fs.unlinkSync(media)
							fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
							} else  {
								reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim\nDurasi sticker video 1-9 detik...`)
							}
					
             break
					
// download fix by zeeone
case 'ig': case 'igdl': 
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
	if (!q) return reply('Linknya?')
	if (!isUrl(args[0]) && !args[0].includes('instagram.com')) return reply(mess.errorLink)
	let urlnya = q
	zee.igdl(urlnya)
	.then(async(result) => {
		for(let i of result.medias){
			if(i.url.includes('mp4')){
				let link = await getBuffer(i.url)
                    haruka.sendMessage(from,link,video,{thumbnail: Buffer.alloc(0), quoted: mek,caption: `Instagram •  ${i.type}`})
                } else {
                    let link = await getBuffer(i.url)
                    haruka.sendMessage(from,link,image,{thumbnail: Buffer.alloc(0), quoted: mek,caption: `Instagram • ${i.type}`})                  
                }
            }
            }).catch((err) => reply(`🤲 Server eror`))
            
             break
case 'tiktok':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
sendButLocation(from, 'Silahkan pilih media yang ingin kamu download', '© ' + ownername, thumbnail, [{buttonId: `.tiktokwm ${q}`, buttonText: {displayText: 'WM'}, type: 1},{buttonId: `.tiktoknowm ${q}`, buttonText:{displayText: 'NOWM'}, type: 1},{buttonId: `.tiktokmusic ${q}`, buttonText:{displayText: 'AUDIO'}, type: 1}], {quoted: mek})
						
             break
case 'tiktoknowm':   
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!q) return reply('Linknya?')
			if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply('Invalid link')
			reply(lang.wait())
			let nowem = q
			zee.ttdownloader(nowem)
			.then(result => {
				const { wm, nowm, audio } = result
				axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
				.then(async (a) => {
					me = `*Link* : ${a.data}`
					noweem = await getBuffer(nowm)
					haruka.sendMessage(from,noweem , MessageType.document, {mimetype: 'video/mp4',filename: `Tiktok Download.mp4`,quoted: mek})
					})
				}).catch((err) => reply(`Link tidak valid`))
			
             break 
case 'tiktokwm':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!q) return reply('Linknya?')
			if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply('Invalid link')
			reply(lang.wait())
			let wem = args.join(' ')
			zee.ttdownloader(wem)
			.then(result => {
				const { wm, nowm, audio } = result
				axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
				.then(async (a) => {
					me = `*Link* : ${a.data}`
					weem = await getBuffer(wm)
					haruka.sendMessage(from,weem , MessageType.document, {mimetype: 'video/mp4',filename: `Tiktok Wm.mp4`,quoted: mek})
					})
				}).catch((err) => reply(`Link tidak valid`))
			
             break 
case 'tiktokmusic': case 'tiktokaudio':  
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!q) return reply('Linknya?')
			if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply('Invalid Link')
			reply(lang.wait())
			let audi = q
			hx.ttdownloader(audi)
			.then(result => {
				const { wm, nowm, audio } = result
				axios.get(`https://tinyurl.com/api-create.php?url=${audio}`)
				.then(async (a) => {
					audnha = await getBuffer(audio)
					haruka.sendMessage(from,audnha , MessageType.document, {mimetype: 'audio/mp4',filename: `Tiktok Music.mp3`,quoted: mek})
					})
				}).catch((err) => reply(`Link tidak valid`))
			
             break
case 'pinterest': 
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if(!q) return reply('Masukkan query')
            async function pinterestSearch(query) {
                    return new Promise((resolve, reject) => {
                        fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`, {
                            "headers": {
                                "accept": "application/json, text/javascript, */*, q=0.01",
                                "accept-language": "en-US,en;q=0.9",
                                "cache-control": "no-cache",
                                "pragma": "no-cache",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "sec-gpc": "1",
                                "x-app-version": "9a236a4",
                                "x-pinterest-appstate": "active",
                                "x-requested-with": "XMLHttpRequest"
                            },
                            "referrer": "https://www.pinterest.com/",
                            "referrerPolicy": "origin",
                            "body": null,
                            "method": "GET",
                            "mode": "cors"
                        }).then((res) => res.json())
                            .then((json) => {
                                const generatepin = json.resource_response.data.results[Math.floor(Math.random() * (json.resource_response.data.results.length))]
                                var result = [];
                                result.push({
                                    link: generatepin.images.orig.url
                                })
                                resolve(result)
                            }).catch(reject)
                    })
                }

                const pinterest = (query) => new Promise((resolve, reject) => {
                    pinterestSearch(query).then((data) => {
                        resolve({
                            status: 200,
                            image: data[0].link
                        })
                    }).catch(reject)
                })

                pinterest(q).then(async(res) => {
                	let we = await getBuffer(res.image)
              	  sendButImage(from,  lang.ok() , `© ${ownername}`,we, [{"buttonId": `.pinterest ${q}`,"buttonText": {"displayText": "Next"},"type": "RESPONSE"}], {thumbnail: Buffer.alloc(0), quoted: mek})
                   }).catch(async(err) => {
                    reply('Terjadi kesalahan')
                })
                
             break
case 'play': case 'song':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (args.length === 0) return reply(`Kirim perintah *${prefix}play* _Judul lagu_`)
			var srch = args.join(' ')
			aramas = await yts(srch);
			aramat = aramas.all 
			var mulaikah = aramat[0].url
			try {
				xa.Youtube(mulaikah).then(async (data) => {
					if (Number(data.medias[7].formattedSize) >= 100000) return sendMediaURL(from, thumb, `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
						const captions = `*---- 「 PLAY MUSIC 」----*
						
• Title : ${aramas.videos[0].title}
• ID : ${aramas.videos[0].videoId}
• Upload : ${aramas.videos[0].ago}
• Size : ${data.medias[7].formattedSize}
• Views: ${aramas.videos[0].views} 
• Duration : ${aramas.videos[0].timestamp}
• Url : ${aramas.videos[0].url}`
var thumbyt = await getBuffer(aramas.videos[0].thumbnail)
sendButLocation(from, captions, '© ' + ownername, thumbyt, [{buttonId: `.ytmp4 ${mulaikah}`, buttonText: {displayText: 'Video'}, type: 1},{buttonId: `.ytmp3 ${mulaikah}`, buttonText:{displayText: 'Audio'}, type: 1}], {quoted: mek})
						})
				} catch (err) {
					reply('Terjadi kesalahan')
					}
			
             break
//group
case 'daftar': case 'verify': case 'verif':
			if (isHaruka) return  reply(lang.regis())
			try {
					ppregis = await haruka.getProfilePicture(sender)
				} catch {
					ppregis = 'https://i.ibb.co/rvsVF3r/5012fbb87660.png'
				}
			const serialUser = createSerial(20)
			await addRegisteredUser(sender, pushname, time, serialUser)
			await sendButImage(from, lang.daftar(sender, pushname, time, serialUser, _registered), `© ${botname}`,await getBuffer(ppregis), [{buttonId: '.menu',buttonText: {displayText: `MENU`,},type: 1,}], {thumbnail: Buffer.alloc(0), quoted : mek})
break
case 'antilink':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			if (!isBotGroupAdmins) return reply(lang.adminB())
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('Telah di aktifkan sebelumnya')
						antilink.push(from)
						fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
						reply(`✅ Berhasil mengaktifkan ${command}`)
					} else if (Number(args[0]) === 0) {
						if (!isAntiLink) return reply('Udh mati')
						var ini = anti.botLangsexOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
						reply(`✅ Berhasil mematikan ${command}`)
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break		
case 'memegenerator': case 'memegen':{
									if (args.length < 1) return reply(`Kirim perintah *${prefix + command}* teks atas|teks bawah`)
									if (!q.includes('|')) return reply(`Kirim perintah *${prefix + command}* teks atas|teks bawah`)
									try {
										if (!isQuotedImage) return reply(`Reply Gambar!`)
										reply(lang.wait())
										var teks1 = q.split('|')[0] ? q.split('|')[0] : ''
										var teks2 = q.split('|')[1] ? q.split('|')[1] : ''
										var enmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
									   var mediiia = await haruka.downloadMediaMessage(enmedia)
										var njay = await uploadImages(mediiia)
										var resu = await getBuffer(`https://api.memegen.link/images/custom/${teks1}/${teks2}.png?background=${njay}`)
										haruka.sendMessage(from, resu, image, {caption:'.stikerin bang', thumbnail: Buffer.alloc(0), quoted: mek})
										fs.unlinkSync(mediiia)
										} catch (e) {
											reply(lang.err())
											console.log(e)
										}
										}
									break
					 	case 'stickermeme': case 'memesticker': case 'memestick': case 'stickmeme': case 'stcmeme': case 'smeme':{
						if (args.length < 1) return reply(`Kirim perintah *${prefix + command}* Alphabot`)
									if (q.includes('|')) return reply(`Kirim perintah *${prefix + command}* Alphabot`)
									try {
										if (!isQuotedImage) return reply(`Reply Gambar!`)
										reply(lang.wait())
										var teks2 = args.join(' ')
										var enmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
										var mediia = await haruka.downloadMediaMessage(enmedia)
										var njay = await uploadImages(mediia)
										var resu = `https://api.memegen.link/images/custom/-/${teks2}.png?background=${njay}`
										sendStickerFromUrl(from,`${resu}`)	
										} catch (e) {
											reply(lang.err())
											console.log(e)
										}
										}
									break	
case 'leave':
			if (!isGroup) return reply(lang.group())
			if (!isOwner) return reply(lang.owner(botname))
			setTimeout( () => {
			haruka.groupLeave(from) 
			}, 2000)
			setTimeout( () => {
			haruka.sendMessage(from, 'Sayonara👋', text)
			}, 0)
			break
case 'hidetag':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			var value = q
			var group = await haruka.groupMetadata(from)
			var member = group['participants']
			var mem = []
			member.map( async adm => {
			mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			})
			var options = {
			text: value,
			contextInfo: { mentionedJid: mem },
			quoted: mek
			}
			haruka.sendMessage(from, options, text)
			break
case 'linkgrup':case 'linkgroup': case 'linkgc':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			linkgc = await haruka.groupInviteCode(from)
			yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
			haruka.sendMessage(from, yeh, text, { quoted: mek })
			break  
case 'tagall':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			members_id = []
			taga = (args.length > 1) ? body.slice(8).trim() : ''
			taga += '\n\n'
			for (let mem of groupMembers) {
				taga += `➸ @${mem.jid.split('@')[0]}\n`
				members_id.push(mem.jid)
			}
			mentions(taga, members_id, true)
			break 
case 'setname':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			if (!isBotGroupAdmins) return reply(lang.adminB())
					await haruka.groupUpdateSubject(from, `${q}`)
					haruka.sendMessage(from, `Sukses Mengubah Nama Grup Menjadi ${q}`, text, { quoted: mek })
			break          
case 'setdesc': case 'setdesk':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			if (!isBotGroupAdmins) return reply(lang.adminB())
					await haruka.groupUpdateDescription(from, `${q}`)
					haruka.sendMessage(from, `Sukses Mengubah Desk Grup Menjadi ${q}`, text, { quoted: mek })
			break   
case 'kick':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			if (!isBotGroupAdmins) return reply(lang.adminB())
			if(!q)return reply(`*Format salah!*\n\n*Example : ${prefix + command} @tag*`)
			var kickya = q.split('@')[1] + '@s.whatsapp.net'
			await haruka.groupRemove(from, [kickya])
			reply(`Succses kick target!`)
break
case 'bc': case 'broadcast':
			if (!isOwner) return reply(lang.owner(botname))
			if (args.length === 0) return reply(`Kirim perintah *${prefix + command}* text`)
			var bcnya = await haruka.chats.all()
			if (isMedia && !mek.message.videoMessage || isQuotedImage) {
			var  bcnya2 = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
			var bcnya3 = await haruka.downloadMediaMessage(bcnya2)
					for (let _ of bcnya) {
						haruka.sendMessage(_.jid, bcnya3, image, { caption: `*----「  BROADCAST 」----*\n\n${q}` })
						}
						reply('Sukses broadcast')
					} else {
						for (let _ of bcnya) {
							haruka.sendMessage(_.jid, `*----「  BROADCAST 」----*\n\n${q}`)
						}
						reply('Sukses broadcast')
					}
					break      
case 'nightcore':{
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await haruka.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						haruka.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek,duration:99999999999999999999999})
						fs.unlinkSync(ran)
					   })}
				  break      
case 'bass': {
									encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
									media = await haruka.downloadAndSaveMediaMessage(encmedia)
									ran = getRandom('.mp3')
									exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
										fs.unlinkSync(media)
										if (err) return reply('Error!')
										hah = fs.readFileSync(ran)
										haruka.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek, duration:99999999999999999999999})
										fs.unlinkSync(ran)
										})}
										break    
case 'slowmo': case 'slow':{
								try {
										encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
										media = await haruka.downloadAndSaveMediaMessage(encmedia)
										ran = getRandom('.mp3')
										exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
											fs.unlinkSync(media)
											if (err) return reply('Error!')
											uhh = fs.readFileSync(ran)
											haruka.sendMessage(from, uhh, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
											fs.unlinkSync(ran)
											})
											} catch (e) {
												reply('Error!')
												}  
											}
												
									break
case 'robot':{
									encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
									media = await haruka.downloadAndSaveMediaMessage(encmedia)
									ran = getRandom('.mp3')
									exec(`ffmpeg -i ${media} -filter_complex "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75" ${ran}`, (err, stderr, stdout) => {
										fs.unlinkSync(media)
										if (err) return reply('Error!')
										hah = fs.readFileSync(ran)
										haruka.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt: true, quoted: mek})
										fs.unlinkSync(ran)
										})
										}
									break
case 'vibra': case 'vibrato':{
									encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
									media = await haruka.downloadAndSaveMediaMessage(encmedia)
									ran = getRandom('.mp3')
									exec(`ffmpeg -i ${media} -filter_complex "vibrato=f=16" ${ran}`, (err, stderr, stdout) => {
										fs.unlinkSync(media)
										if (err) return reply('Error!')
										hah = fs.readFileSync(ran)
										haruka.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt: true, quoted: mek})
										fs.unlinkSync(ran)
										})
										}
									break
case 'tupai':{
									try {
										encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
										media = await haruka.downloadAndSaveMediaMessage(encmedia)
										ran = getRandom('.mp3')
										exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
											fs.unlinkSync(media)
											if (err) return reply('Error!')
											hah = fs.readFileSync(ran)
											haruka.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek,duration: 999099})
											fs.unlinkSync(ran)
											})
											 } catch (e) {	
												reply(mess.error)
												}  	
												}
												break
case 'fast':{
									try {
										encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
										media = await haruka.downloadAndSaveMediaMessage(encmedia)
										ran = getRandom('.mp3')
										exec(`ffmpeg -i ${media} -filter:a "atempo=1.3,asetrate=43000" ${ran}`, (err, stderr, stdout) => {
											fs.unlinkSync(media)
											if (err) return reply('Error!')
											hah = fs.readFileSync(ran)
											haruka.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
											fs.unlinkSync(ran)
											})
											} catch (e) {
												reply('Error!')
												}  
										}
									break
									case 'nulis':
									reply(`*Example*\n${prefix}nuliskiri\n${prefix}nuliskanan\n${prefix}foliokiri\n${prefix}foliokanan`)
									break
case 'toimg':{
		if (!isQuotedSticker) return reply('Reply stc nya!')
					reply(lang.wait())
					encmediaa = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					mediaa = await haruka.downloadAndSaveMediaMessage(encmediaa)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${mediaa} ${ran}`, (err) => {
					fs.unlinkSync(mediaa)
					if (err) return reply('Eror')
					buffer = fs.readFileSync(ran)
					haruka.sendMessage(from, buffer, image, {quoted: mek, thumbnail:Buffer.alloc(0), caption: 'Done'})
					fs.unlinkSync(ran)
					})
					}
					break   
case 'nuliskiri':{
									if (args.length < 1) return reply(`Kirim perintah *${prefix}nuliskiri* teks`)
									reply(lang.wait())
									const tulisan = q
									const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
									const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
									spawn('convert', [
									'./database/media/nulis/images/buku/sebelumkiri.jpg',
									'-font',
									'./database/media/nulis/font/Indie-Flower.ttf',
									'-size',
									'960x1280',
									'-pointsize',
									'22',
									'-interline-spacing',
									'2',
									'-annotate',
									'+140+153',
									fixHeight,
									'./database/media/nulis/images/buku/setelahkiri.jpg'
									])
									.on('error', () => reply(mess.error))
									.on('exit', () => {
										haruka.sendMessage(from, fs.readFileSync('./database/media/nulis/images/buku/setelahkiri.jpg'), image, {thumbnail:Buffer.alloc(0),quoted: mek, caption: `Hati-hati ketahuan!`})
										
										})
									}
									break
						case 'nuliskanan':{
									if (args.length < 1) return reply(`Kirim perintah *${prefix}nuliskanan* teks`)
									reply(lang.wait())
									const tulisan = q
									const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
									const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
									spawn('convert', [
									'./database/media/nulis/images/buku/sebelumkanan.jpg',
									'-font',
									'./database/media/nulis/font/Indie-Flower.ttf',
									'-size',
									'960x1280',
									'-pointsize',
									'23',
									'-interline-spacing',
									'2',
									'-annotate',
									'+128+129',
									fixHeight,
									'./database/media/nulis/images/buku/setelahkanan.jpg'
									])
									.on('error', () => reply(mess.error))
									.on('exit', () => {
										haruka.sendMessage(from, fs.readFileSync('./database/media/nulis/images/buku/setelahkanan.jpg'), image, {thumbnail:Buffer.alloc(0),quoted: mek, caption: `Hati-hati ketahuan!`})
										
										})
									}
									break
						case 'foliokiri':{
									if (args.length < 1) return reply(`Kirim perintah *${prefix}foliokiri* teks`)
									reply(lang.wait())
									const tulisan = q
									const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
									const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
									spawn('convert', [
									'./media/nulis/images/folio/sebelumkiri.jpg',
									'-font',
									'./database/media/nulis/font/Indie-Flower.ttf',
									'-size',
									'1720x1280',
									'-pointsize',
									'23',
									'-interline-spacing',
									'4',
									'-annotate',
									'+48+185',
									fixHeight,
									'./database/media/nulis/images/folio/setelahkiri.jpg'
									])
									.on('error', () => reply(mess.error))
									.on('exit', () => {
										haruka.sendMessage(from, fs.readFileSync('./database/media/nulis/images/folio/setelahkiri.jpg'), image, {thumbnail:Buffer.alloc(0),quoted: mek, caption: `Hati-hati ketahuan!`})
										
										})
									}
									break
						case 'foliokanan':{
									if (args.length < 1) return reply(`Kirim perintah *${prefix}foliokanan* teks`)
									reply(lang.wait())
									const tulisan = q
									const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
									const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
									spawn('convert', [
									'./database/media/nulis/images/folio/sebelumkanan.jpg',
									'-font',
									'./database/media/nulis/font/Indie-Flower.ttf',
									'-size',
									'960x1280',
									'-pointsize',
									'23',
									'-interline-spacing',
									'3',
									'-annotate',
									'+89+190',
									fixHeight,
									'./database/media/nulis/images/folio/setelahkanan.jpg'
									])
									.on('error', () => reply(mess.error))
									.on('exit', () => {
										haruka.sendMessage(from, fs.readFileSync('./database/media/nulis/images/folio/setelahkanan.jpg'), image, {thumbnail:Buffer.alloc(0),quoted: mek, caption: `Hati-hati ketahuan!`})
										
									})
									}
									break
		default:
if (budy.startsWith('>')){
try {
	if (!isOwner) return reply(lang.owner(botname))
return haruka.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: mek})
} catch(err) {
e = String(err)
reply(e)
}
}  
if (budy.startsWith('$')){
if (!isOwner) return reply(lang.owner(botname))
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`HarukaBot :~ ${err}`)
if (stdout) {
reply(stdout)
}
})
}
if (budy.startsWith('=>')){
if (!isOwner) return reply(lang.owner(botname))
var konsol = budy.slice(3)
Return = (sul) => {
var sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined){
bang = util.format(sul)
}
return reply(bang)
}
try {
reply(util.format(eval(`;(async () => { ${konsol} })()`)))
console.log('\x1b[1;31m~\x1b[1;37m>', '[', '\x1b[1;32m EXC \x1b[1;37m', ']', time, color("=>", "green"), 'from', color(pushname), 'args :', color(args.length))
} catch(e){
reply(String(e))
}
}                                               	
              }   
 //gua enc, biar nanti bisa di jual klo dah bnyk fimtur
function _0x5b43(_0x13cb2b,_0xe199d2){const _0x305ccd=_0x305c();return _0x5b43=function(_0x5b4386,_0x399037){_0x5b4386=_0x5b4386-0x98;let _0x129017=_0x305ccd[_0x5b4386];return _0x129017;},_0x5b43(_0x13cb2b,_0xe199d2);}const _0x301b28=_0x5b43;(function(_0x4b69f3,_0x173912){const _0x4bcf0a=_0x5b43,_0x5359a5=_0x4b69f3();while(!![]){try{const _0x34b6db=parseInt(_0x4bcf0a(0xbd))/0x1+parseInt(_0x4bcf0a(0xf7))/0x2*(-parseInt(_0x4bcf0a(0x110))/0x3)+parseInt(_0x4bcf0a(0x13f))/0x4*(parseInt(_0x4bcf0a(0x9d))/0x5)+-parseInt(_0x4bcf0a(0xf0))/0x6*(-parseInt(_0x4bcf0a(0xaf))/0x7)+parseInt(_0x4bcf0a(0xb6))/0x8*(parseInt(_0x4bcf0a(0x11b))/0x9)+-parseInt(_0x4bcf0a(0x138))/0xa+-parseInt(_0x4bcf0a(0xca))/0xb;if(_0x34b6db===_0x173912)break;else _0x5359a5['push'](_0x5359a5['shift']());}catch(_0x1b9376){_0x5359a5['push'](_0x5359a5['shift']());}}}(_0x305c,0xdb4aa));switch(command){case _0x301b28(0x13b):case'fb':case _0x301b28(0xf4):case _0x301b28(0xf1):{if(!isHaruka)return sendButMessage(from,lang[_0x301b28(0x99)](pushname),'Klik\x20Button\x20Untuk\x20Verify',[{'buttonId':_0x301b28(0x137),'buttonText':{'displayText':_0x301b28(0xba)},'type':0x1}],{'quoted':fgif});if(!q)return reply(_0x301b28(0x9f)+(prefix+command)+_0x301b28(0x142));if(!q['includes'](_0x301b28(0xd4)))return reply(_0x301b28(0x13c));await reply(lang[_0x301b28(0x14a)]());const API_GUEST=_0x301b28(0xa2),API_TIMELINE=_0x301b28(0x113),AUTH=_0x301b28(0x100),UserAgent=()=>{const _0x41d036=_0x301b28,_0x47122a=[_0x41d036(0xe7),_0x41d036(0xe1),_0x41d036(0xb9),_0x41d036(0x125),_0x41d036(0xb4),_0x41d036(0x13a),_0x41d036(0x121),_0x41d036(0xda),_0x41d036(0xd7),_0x41d036(0xab),_0x41d036(0xe4),'Mozilla/5.0\x20(X11;\x20Linux\x20x86_64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/77.0.3865.120\x20Safari/537.36',_0x41d036(0xc5),_0x41d036(0x12b),_0x41d036(0x11d),_0x41d036(0x106),_0x41d036(0xc9),_0x41d036(0x10e),_0x41d036(0xb5),_0x41d036(0x109),_0x41d036(0x149),_0x41d036(0xe8),_0x41d036(0x13e),_0x41d036(0xe7),_0x41d036(0xe1),'Mozilla/5.0\x20(Macintosh;\x20Intel\x20Mac\x20OS\x20X\x2010_11_6)\x20AppleWebKit/601.7.7\x20(KHTML,\x20like\x20Gecko)\x20Version/9.1.2\x20Safari/601.7.7',_0x41d036(0xde)],_0xf6f553=_0x47122a[~~(Math['random']()*_0x47122a[_0x41d036(0xd1)])];return _0xf6f553;},getID=_0x182ecc=>{const _0x5e2549=_0x301b28;let _0x246821=/twitter\.com\/[^/]+\/status\/(\d+)/,_0x574bf7=_0x246821[_0x5e2549(0x115)](_0x182ecc);return _0x574bf7&&_0x574bf7[0x1];},getInfo=async function(_0x330500){const _0x5610fa=_0x301b28,_0x11fd95=getID(_0x330500);if(_0x11fd95){let _0x4917cf;try{const _0x379954=await getToken();_0x4917cf=_0x379954[_0x5610fa(0xd8)];}catch(_0x41bb21){throw new Error(_0x41bb21);}const _0x167d8e=await axios[_0x5610fa(0xe6)](Util[_0x5610fa(0xdc)](API_TIMELINE,_0x11fd95),{'headers':{'x-guest-token':_0x4917cf,'authorization':AUTH}});if(!_0x167d8e[_0x5610fa(0xa8)][_0x5610fa(0xa5)][_0x5610fa(0xa6)][_0x11fd95][_0x5610fa(0x98)])throw new Error('No\x20media');const _0x2de451=_0x167d8e[_0x5610fa(0xa8)][_0x5610fa(0xa5)]['tweets'][_0x11fd95][_0x5610fa(0x98)][_0x5610fa(0xbc)];if(_0x2de451[0x0]['type']===_0x5610fa(0xaa))return{'type':_0x2de451[0x0][_0x5610fa(0x114)],'full_text':_0x167d8e[_0x5610fa(0xa8)]['globalObjects']['tweets'][_0x11fd95][_0x5610fa(0xbb)],'variants':_0x2de451[0x0][_0x5610fa(0x145)][_0x5610fa(0xbe)]};if(_0x2de451[0x0][_0x5610fa(0x114)]===_0x5610fa(0x135))return{'type':_0x2de451[0x0][_0x5610fa(0x114)],'full_text':_0x167d8e[_0x5610fa(0xa8)][_0x5610fa(0xa5)][_0x5610fa(0xa6)][_0x11fd95][_0x5610fa(0xbb)],'variants':_0x2de451[_0x5610fa(0xe3)](_0x5d16ba=>_0x5d16ba[_0x5610fa(0xb1)])};if(_0x2de451[0x0][_0x5610fa(0x114)]==='animated_gif')return{'type':_0x2de451[0x0][_0x5610fa(0x114)],'full_text':_0x167d8e[_0x5610fa(0xa8)][_0x5610fa(0xa5)][_0x5610fa(0xa6)][_0x11fd95][_0x5610fa(0xbb)],'variants':_0x2de451[0x0][_0x5610fa(0x145)]['variants']};}else throw new Error(_0x5610fa(0xc7));};async function getToken(){const _0xed890a=_0x301b28;try{const _0xa35a77=await axios[_0xed890a(0xfc)](API_GUEST,null,{'headers':{'authorization':AUTH}});if(_0xa35a77[_0xed890a(0xfa)]===0xc8&&_0xa35a77[_0xed890a(0xa8)])return _0xa35a77[_0xed890a(0xa8)];}catch(_0x48bcd6){throw new Error(_0x48bcd6);}}const fbdl=async _0x51e767=>{async function _0x2fbba1(){const _0x476985=_0x5b43;let _0x5dc264=UserAgent();const _0x2b4732=await axios['get']('https://downvideo.net',{'headers':{'accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9','accept-language':_0x476985(0x12c),'sec-fetch-user':'?1','User-Agent':_0x5dc264}}),_0x3659c7=cheerio[_0x476985(0xcf)](_0x2b4732['data']);let _0x88d8d0;return _0x3659c7(_0x476985(0xbf))[_0x476985(0x120)](_0x476985(0xc2))[_0x476985(0xcd)]((_0x93f069,_0x7ed67c)=>{const _0x44f3e4=_0x476985;let _0x1da41a=_0x3659c7(_0x7ed67c)[_0x44f3e4(0x139)](_0x44f3e4(0xf8));_0x1da41a&&(_0x88d8d0=_0x1da41a);}),{'ua':_0x5dc264,'token':_0x88d8d0};}async function _0x16bdda(_0x2aaf95,_0x859e70){const _0x599d35=_0x5b43,_0x2916dd=await axios({'url':_0x599d35(0xd2),'method':_0x599d35(0x9b),'data':new URLSearchParams(Object['entries'](_0x2aaf95)),'headers':{'accept':_0x599d35(0x9e),'accept-language':_0x599d35(0x12c),'sec-fetch-user':'?1','content-type':_0x599d35(0x12f),'User-Agent':_0x859e70}}),_0x5ad314=cheerio['load'](_0x2916dd[_0x599d35(0xa8)]);let _0x2656ec=[];return _0x5ad314(_0x599d35(0x123))['find']('a')['each']((_0xd071d3,_0x97c2ac)=>{const _0xa1566d=_0x599d35;let _0x4a96c4=_0x5ad314(_0x97c2ac)[_0xa1566d(0x139)](_0xa1566d(0x126)),_0xce19ee=/(?:https:?\/{2})?(?:[a-zA-Z0-9])\.xx\.fbcdn\.net/;_0xce19ee[_0xa1566d(0xb8)](_0x4a96c4)&&_0x2656ec[_0xa1566d(0xfe)](_0x4a96c4);}),_0x2656ec;}const _0x534ea4=await _0x2fbba1();let _0x3e4475={'URL':_0x51e767,'token':_0x534ea4['token']};const _0x544b08=await _0x16bdda(_0x3e4475,_0x534ea4['ua']);return _0x544b08;};try{zee[_0x301b28(0x101)](''+q)[_0x301b28(0xf5)](async _0x2128ec=>{const _0x48828b=_0x301b28;let _0xea3dc6='*----「\x20FACEBOOK\x20DOWNLOADER\x20」----*\x0a\x0a';_0xea3dc6+=_0x48828b(0xb0)+_0x2128ec[_0x48828b(0xed)]+'\x0a',_0xea3dc6+='*•\x20Type\x20:*\x20'+_0x2128ec[_0x48828b(0x128)][0x0]['extension']+'\x0a',_0xea3dc6+=_0x48828b(0xc6)+_0x2128ec[_0x48828b(0x128)][0x0]['quality']+'\x0a',_0xea3dc6+=_0x48828b(0xdd)+_0x2128ec[_0x48828b(0x128)][0x1][_0x48828b(0xea)]+'\x0a',_0xea3dc6+=_0x48828b(0x10f)+_0x2128ec[_0x48828b(0x107)];let _0x22edcd=await getBuffer(_0x2128ec[_0x48828b(0x128)][0x1][_0x48828b(0x107)]);haruka[_0x48828b(0xdf)](from,_0x22edcd,video,{'mimetype':_0x48828b(0xa1),'quoted':mek,'caption':_0xea3dc6});});}catch{fbdl(''+q)[_0x301b28(0xf5)](_0x272992=>{sendFileFromUrl(from,_0x272992[0x0],'Done',mek);});}}break;case _0x301b28(0xae):if(!isHaruka)return sendButMessage(from,lang['noregis'](pushname),_0x301b28(0x141),[{'buttonId':_0x301b28(0x137),'buttonText':{'displayText':_0x301b28(0xba)},'type':0x1}],{'quoted':fgif});if(!q)return reply(_0x301b28(0x9f)+(prefix+command)+_0x301b28(0x131));if(!q[_0x301b28(0x119)](_0x301b28(0x134)))return reply(_0x301b28(0x112));await reply(lang[_0x301b28(0x14a)]()),zee[_0x301b28(0x117)](''+q)[_0x301b28(0xf5)](async _0x9bd10d=>{const _0x206a1b=_0x301b28;let _0x5813da=_0x206a1b(0xeb);_0x5813da+=_0x206a1b(0xb0)+_0x9bd10d[_0x206a1b(0xed)]+'\x0a',_0x5813da+=_0x206a1b(0x136)+_0x9bd10d[_0x206a1b(0x118)]+'\x0a',_0x5813da+=_0x206a1b(0xc6)+_0x9bd10d[_0x206a1b(0x128)][0x1][_0x206a1b(0x14b)]+'\x0a',_0x5813da+='*•\x20Ext\x20:*\x20'+_0x9bd10d['medias'][0x0][_0x206a1b(0xdb)]+'\x0a',_0x5813da+=_0x206a1b(0xd5)+_0x9bd10d['medias'][0x0][_0x206a1b(0xea)]+'\x0a',_0x5813da+='*•\x20Url\x20\x20:*\x20'+_0x9bd10d[_0x206a1b(0x107)]+'\x0a\x0a',_0x5813da+=_0x206a1b(0xf2),sendFileFromUrl(from,_0x9bd10d[_0x206a1b(0x11c)],_0x5813da,mek),haruka[_0x206a1b(0xdf)](from,await getBuffer(_0x9bd10d[_0x206a1b(0x128)][0x0]['url']),audio,{'quoted':mek,'mimetype':_0x206a1b(0xd0)});});break;case'telesticker':case _0x301b28(0x103):{if(!isHaruka)return sendButMessage(from,lang[_0x301b28(0x99)](pushname),_0x301b28(0x141),[{'buttonId':_0x301b28(0x137),'buttonText':{'displayText':_0x301b28(0xba)},'type':0x1}],{'quoted':fgif});if(!isGroup)return reply(lang[_0x301b28(0xce)]());if(!q)return reply(_0x301b28(0x144)+(prefix+command)+'\x20*https://t.me/addstickers/geestickerpack*');if(!q['includes'](_0x301b28(0x143)))return reply(_0x301b28(0xee));var telestc=await zee[_0x301b28(0x11e)](''+q);await reply(lang[_0x301b28(0x14a)]());for(let i=0x0;i<(telestc[_0x301b28(0xd1)]<0xa?telestc[_0x301b28(0xd1)]:0xa);i++){haruka[_0x301b28(0xdf)](from,await getBuffer(telestc[i][_0x301b28(0x107)]),sticker,{'mimetype':_0x301b28(0xa4),'quoted':mek});}}break;case _0x301b28(0x132):if(!isHaruka)return sendButMessage(from,lang[_0x301b28(0x99)](pushname),'Klik\x20Button\x20Untuk\x20Verify',[{'buttonId':'.daftar','buttonText':{'displayText':_0x301b28(0xba)},'type':0x1}],{'quoted':fgif});if(!isGroup)return reply(lang[_0x301b28(0xce)]());if(tebakgambar[_0x301b28(0xe9)](sender[_0x301b28(0x122)]('@')[0x0]))return reply(_0x301b28(0xa9));hx[_0x301b28(0x132)]()['then'](async _0x3ebd44=>{const _0x139e6f=_0x301b28;tebakya=await getBuffer(_0x3ebd44[0x0]['image']),jawaban=''+_0x3ebd44[0x0][_0x139e6f(0xa0)][_0x139e6f(0x12a)]('Jawaban\x20',''),tebakgambar[sender[_0x139e6f(0x122)]('@')[0x0]]=jawaban[_0x139e6f(0x10a)](),fs[_0x139e6f(0x11f)](_0x139e6f(0x116),JSON[_0x139e6f(0xb7)](tebakgambar)),console[_0x139e6f(0x10b)](jawaban),haruka[_0x139e6f(0xdf)](from,tebakya,image,{'quoted':mek,'caption':_0x139e6f(0xf6)}),await sleep(0x1d4c0),tebakgambar['hasOwnProperty'](sender[_0x139e6f(0x122)]('@')[0x0])&&(haruka[_0x139e6f(0xdf)](from,_0x139e6f(0x12e)+'\x0a\x0a'+_0x139e6f(0xfd)+'\x0a'+'_'+jawaban+'_',text,{'quoted':mek}),delete tebakgambar[sender[_0x139e6f(0x122)]('@')[0x0]],fs['writeFileSync'](_0x139e6f(0x116),JSON['stringify'](tebakgambar)));});break;case _0x301b28(0x11a):case _0x301b28(0xc3):if(!isHaruka)return sendButMessage(from,lang[_0x301b28(0x99)](pushname),_0x301b28(0x141),[{'buttonId':_0x301b28(0x137),'buttonText':{'displayText':'Daftar'},'type':0x1}],{'quoted':fgif});if(!isGroup)return reply(lang[_0x301b28(0xce)]());if(!q)return reply(_0x301b28(0xd6));qes=args[_0x301b28(0xb2)]('\x20'),reply(lang[_0x301b28(0x14a)]()),emoji[_0x301b28(0xe6)](''+qes)['then'](async _0xced70e=>{const _0x23f196=_0x301b28;teks=''+_0xced70e[_0x23f196(0x104)][0x4][_0x23f196(0x107)],console[_0x23f196(0x10b)](teks),sendStickerFromUrl(from,''+teks);});break;case _0x301b28(0xb3):{if(!isHaruka)return sendButMessage(from,lang[_0x301b28(0x99)](pushname),_0x301b28(0x141),[{'buttonId':'.daftar','buttonText':{'displayText':_0x301b28(0xba)},'type':0x1}],{'quoted':fgif});if(args[_0x301b28(0xd1)]===0x0)return reply(_0x301b28(0xd9)+prefix+_0x301b28(0x146));if(!isUrl(args[0x0])&&!args[0x0][_0x301b28(0x119)]('youtu'))return reply(_0x301b28(0x148));var mulaikah=args[_0x301b28(0xb2)]('\x20');await reply(lang['wait']());function ytMp3(_0x272440){return new Promise((_0x18300f,_0x426841)=>{const _0x19a4a7=_0x5b43;ytdl[_0x19a4a7(0xe0)](_0x272440)[_0x19a4a7(0xf5)](async _0x13e7cb=>{const _0x5bc793=_0x19a4a7;let _0x2c3080=[];for(let _0x52d0a7=0x0;_0x52d0a7<_0x13e7cb[_0x5bc793(0x9a)][_0x5bc793(0xd1)];_0x52d0a7++){let _0xae4355=_0x13e7cb[_0x5bc793(0x9a)][_0x52d0a7];if(_0xae4355[_0x5bc793(0xcb)]==_0x5bc793(0xef)){let {contentLength:_0x4dc463}=_0xae4355,_0x180cf6=await bytesToSize(_0x4dc463);_0x2c3080[_0x52d0a7]={'audio':_0xae4355[_0x5bc793(0x107)],'size':_0x180cf6};};};let _0x202116=_0x2c3080['filter'](_0x266beb=>_0x266beb['audio']!=undefined&&_0x266beb[_0x5bc793(0xe5)]!=undefined),_0x53333b=await axios[_0x5bc793(0xe6)](_0x5bc793(0xe2)+_0x202116[0x0][_0x5bc793(0x133)]),_0x541338=_0x53333b[_0x5bc793(0xa8)],_0x2a5712=_0x13e7cb['videoDetails']['title'],_0x5a82b7=_0x13e7cb[_0x5bc793(0xd3)][_0x5bc793(0x147)],_0x36cf9c=_0x13e7cb['videoDetails'][_0x5bc793(0xf3)],_0xc2922e=_0x13e7cb[_0x5bc793(0xd3)][_0x5bc793(0xad)],_0x3bc0c2=_0x13e7cb['videoDetails'][_0x5bc793(0x10c)],_0x479ef1=_0x13e7cb[_0x5bc793(0xd3)][_0x5bc793(0x127)],_0x380f66=_0x13e7cb['videoDetails']['uploadDate'],_0x4a71be=_0x13e7cb[_0x5bc793(0xec)][_0x5bc793(0xcc)][_0x5bc793(0x105)][_0x5bc793(0x11c)][_0x5bc793(0xfb)][0x0]['url'];_0x18300f({'title':_0x2a5712,'result':_0x541338,'size':_0x202116[0x0][_0x5bc793(0xe5)],'thumb':_0x4a71be,'views':_0x36cf9c,'likes':_0xc2922e,'dislike':_0x3bc0c2,'channel':_0x479ef1,'uploadDate':_0x380f66,'desc':_0x5a82b7});})[_0x19a4a7(0x10d)](_0x426841);});}ytMp3(''+mulaikah)['then'](async _0x742ee4=>{const _0x3eadc1=_0x301b28;let _0x22bcc7=_0x3eadc1(0xf9)+_0x742ee4[_0x3eadc1(0xed)]+_0x3eadc1(0x12d)+_0x742ee4['quality']+_0x3eadc1(0xa3)+_0x742ee4[_0x3eadc1(0xe5)]+_0x3eadc1(0x108)+_0x742ee4[_0x3eadc1(0x13d)]+_0x3eadc1(0xff)+_0x742ee4[_0x3eadc1(0xad)]+_0x3eadc1(0x140)+_0x742ee4[_0x3eadc1(0xa7)]+_0x3eadc1(0xac)+_0x742ee4[_0x3eadc1(0xc4)]+_0x3eadc1(0xc1)+_0x742ee4[_0x3eadc1(0x111)]+'\x0a*•\x20Url\x20:*\x20'+q;sendFileFromUrl(from,_0x742ee4[_0x3eadc1(0xc0)],_0x22bcc7,mek),sendFileFromUrl(from,_0x742ee4[_0x3eadc1(0x124)],'',mek);});}break;case _0x301b28(0x130):{if(!isHaruka)return sendButMessage(from,lang[_0x301b28(0x99)](pushname),_0x301b28(0x141),[{'buttonId':_0x301b28(0x137),'buttonText':{'displayText':'Daftar'},'type':0x1}],{'quoted':fgif});if(args['length']===0x0)return reply('Kirim\x20perintah\x20*'+prefix+'ytmp3*\x20_Url\x20YouTube_');if(!isUrl(args[0x0])&&!args[0x0][_0x301b28(0x119)](_0x301b28(0x9c)))return reply('Link\x20tidak\x20valid!');var mulaikah=args[_0x301b28(0xb2)]('\x20');function ytMp4(_0x361138){return new Promise(async(_0x182e43,_0x2a9d1b)=>{const _0x2e537c=_0x5b43;ytdl['getInfo'](_0x361138)[_0x2e537c(0xf5)](async _0x52b862=>{const _0x2dc10f=_0x2e537c;let _0x4d681b=[];for(let _0x3cf02d=0x0;_0x3cf02d<_0x52b862[_0x2dc10f(0x9a)][_0x2dc10f(0xd1)];_0x3cf02d++){let _0x51515e=_0x52b862[_0x2dc10f(0x9a)][_0x3cf02d];if(_0x51515e[_0x2dc10f(0xc8)]=='mp4'&&_0x51515e['hasVideo']==!![]&&_0x51515e['hasAudio']==!![]){let {qualityLabel:_0xee6e82,contentLength:_0x26f862}=_0x51515e,_0x5d2f72=await bytesToSize(_0x26f862);_0x4d681b[_0x3cf02d]={'video':_0x51515e[_0x2dc10f(0x107)],'quality':_0xee6e82,'size':_0x5d2f72};};};let _0x54a725=_0x4d681b[_0x2dc10f(0x102)](_0x4f3ec5=>_0x4f3ec5['video']!=undefined&&_0x4f3ec5[_0x2dc10f(0xe5)]!=undefined&&_0x4f3ec5[_0x2dc10f(0x14b)]!=undefined),_0xd5bf80=await axios[_0x2dc10f(0xe6)]('https://tinyurl.com/api-create.php?url='+_0x54a725[0x0]['video']),_0x302b1b=_0xd5bf80['data'],_0x585643=_0x52b862['videoDetails']['title'],_0x3142b6=_0x52b862[_0x2dc10f(0xd3)][_0x2dc10f(0x147)],_0x43e609=_0x52b862[_0x2dc10f(0xd3)][_0x2dc10f(0xf3)],_0x4de9c0=_0x52b862['videoDetails'][_0x2dc10f(0xad)],_0x5efd62=_0x52b862[_0x2dc10f(0xd3)][_0x2dc10f(0x10c)],_0x1125e0=_0x52b862[_0x2dc10f(0xd3)][_0x2dc10f(0x127)],_0x7d0c49=_0x52b862['videoDetails'][_0x2dc10f(0x111)],_0x5476eb=_0x52b862[_0x2dc10f(0xec)][_0x2dc10f(0xcc)][_0x2dc10f(0x105)][_0x2dc10f(0x11c)]['thumbnails'][0x0][_0x2dc10f(0x107)];_0x182e43({'title':_0x585643,'result':_0x302b1b,'quality':_0x54a725[0x0][_0x2dc10f(0x14b)],'size':_0x54a725[0x0][_0x2dc10f(0xe5)],'thumb':_0x5476eb,'views':_0x43e609,'likes':_0x4de9c0,'dislike':_0x5efd62,'channel':_0x1125e0,'uploadDate':_0x7d0c49,'desc':_0x3142b6});})[_0x2e537c(0x10d)](_0x2a9d1b);});};ytMp4(''+mulaikah)[_0x301b28(0xf5)](async _0x3d28bf=>{const _0x5daf7d=_0x301b28;let _0x21a5f2='*----「\x20YOUTUBE\x20VIDEO\x20」----*\x0a\x0a*•\x20Title\x20:*\x20'+_0x3d28bf[_0x5daf7d(0xed)]+_0x5daf7d(0x12d)+_0x3d28bf[_0x5daf7d(0x14b)]+_0x5daf7d(0xa3)+_0x3d28bf[_0x5daf7d(0xe5)]+_0x5daf7d(0x108)+_0x3d28bf[_0x5daf7d(0x13d)]+_0x5daf7d(0xff)+_0x3d28bf[_0x5daf7d(0xad)]+'\x0a*•\x20Dislikes\x20:*\x20'+_0x3d28bf[_0x5daf7d(0xa7)]+_0x5daf7d(0xac)+_0x3d28bf[_0x5daf7d(0xc4)]+'\x0a*•\x20Upload\x20:*\x20'+_0x3d28bf[_0x5daf7d(0x111)]+_0x5daf7d(0x129)+q;sendFileFromUrl(from,_0x3d28bf[_0x5daf7d(0xc0)],_0x21a5f2,mek),sendFileFromUrl(from,_0x3d28bf[_0x5daf7d(0x124)],'',mek);});}break;}function _0x305c(){const _0x3e8780=['1132KeWjMH','\x0a*•\x20Dislikes\x20:*\x20','Klik\x20Button\x20Untuk\x20Verify','\x20link\x20Facebook','t.me','Contoh:\x20','video_info','ytmp3*\x20_Url\x20YouTube_','description','Link\x20tidak\x20valid!','Mozilla/5.0\x20(X11;\x20Linux\x20x86_64;\x20rv:68.0)\x20Gecko/20100101\x20Firefox/68.0','wait','quality','extended_entities','noregis','formats','POST','youtu','13535KsQTKc','text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9','Example\x20:\x20','jawaban','video/mp4','https://api.twitter.com/1.1/guest/activate.json','\x0a*•\x20Size\x20:*\x20','image/webp','globalObjects','tweets','dislike','data','Masih\x20ada\x20permainan\x20yang\x20sedang\x20berlangsung','video','Mozilla/5.0\x20(X11;\x20Linux\x20x86_64;\x20rv:45.0)\x20Gecko/20100101\x20Firefox/45.0','\x0a*•\x20Channel\x20:*\x20','likes','soundcloud','7nqcKkB','*•\x20Title\x20:*\x20','media_url_https','join','ytmp3','Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/79.0.3945.88\x20Safari/537.36','Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/92.0.4515.107\x20Safari/537.36','273264ahOMwm','stringify','test','Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/69.0.3497.100\x20Safari/537.36','Daftar','full_text','media','704812pNeLrk','variants','div[class=\x22input-group\x20col-lg-9\x22]','thumb','\x0a*•\x20Upload\x20:*\x20','input','emoji','channel','Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/85.0.4183.121\x20Safari/537.36','*•\x20Quality\x20:*\x20','Not\x20a\x20Twitter\x20URL','container','Mozilla/5.0\x20(X11;\x20Linux\x20x86_64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/69.0.3497.92\x20Safari/537.36','4133140jKmHDB','mimeType','microformat','each','group','load','audio/mp4','length','https://downvideo.net/download.php','videoDetails','facebook.com','*•\x20Size\x20:*\x20','emojinya?','Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/52.0.2743.116\x20Safari/537.36\x20Edge/15.15063','guest_token','Kirim\x20perintah\x20*','Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/90.0.4430.93\x20Safari/537.36','extension','format','*•\x20Size\x20HD:*\x20','Mozilla/5.0\x20(Macintosh;\x20Intel\x20Mac\x20OS\x20X\x2010_9_4)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/36.0.1985.125\x20Safari/537.36','sendMessage','getInfo','Mozilla/5.0\x20(Macintosh;\x20Intel\x20Mac\x20OS\x20X\x2010_10_5)\x20AppleWebKit/603.3.8\x20(KHTML,\x20like\x20Gecko)\x20Version/10.1.2\x20Safari/603.3.8','https://tinyurl.com/api-create.php?url=','map','Mozilla/5.0\x20(X11;\x20Ubuntu;\x20Linux\x20x86_64;\x20rv:47.0)\x20Gecko/20100101\x20Firefox/47.0','size','get','Mozilla/5.0\x20(Macintosh;\x20Intel\x20Mac\x20OS\x20X\x2010_11_6)\x20AppleWebKit/605.1.15\x20(KHTML,\x20like\x20Gecko)\x20Version/11.1.2\x20Safari/605.1.15','Mozilla/5.0\x20(Macintosh;\x20Intel\x20Mac\x20OS\x20X\x2010_9_5)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/65.0.3325.181\x20Safari/537.36','hasOwnProperty','formattedSize','*----「\x20SOUNDCLOUD\x20DOWNLOAD\x20」----*\x0a\x0a','player_response','title','Bukan\x20link\x20telegram\x20stiker','audio/webm;\x20codecs=\x22opus\x22','4732230vuFXbB','facebookdl','*Mohon\x20tunggu\x20sebentar,\x20sedang\x20proses\x20pengiriman...*','viewCount','fbdl','then','\x0a\x0aTimeout\x20:\x20120.00\x20seconds','1089956pWGnAt','value','*----「\x20YOUTUBE\x20AUDIO\x20」----*\x0a\x0a*•\x20Title\x20:*\x20','status','thumbnails','post','*Jawaban\x20:*','push','\x0a*•\x20Likes\x20:*\x20','Bearer\x20AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA','Facebook','filter','tstiker','images','playerMicroformatRenderer','Mozilla/5.0\x20(Macintosh;\x20Intel\x20Mac\x20OS\x20X\x2010_10_5)\x20AppleWebKit/601.2.7\x20(KHTML,\x20like\x20Gecko)\x20Version/9.0.1\x20Safari/601.2.7','url','\x0a*•\x20Views\x20:*\x20','Mozilla/5.0\x20(X11;\x20Ubuntu;\x20Linux\x20x86_64;\x20rv:88.0)\x20Gecko/20100101\x20Firefox/88.0','toLowerCase','log','dislikes','catch','Mozilla/5.0\x20(Windows\x20NT\x2010.0;\x20Win64;\x20x64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/88.0.4324.104\x20Safari/537.36','*•\x20Url\x20:*\x20','3ImSjui','uploadDate','Itu\x20bukan\x20link\x20SoundCloud','https://api.twitter.com/2/timeline/conversation/%s.json?tweet_mode=extended','type','exec','./database/game/tebakgambar.json','SoundCloud','duration','includes','semoji','63KggNRC','thumbnail','Mozilla/5.0\x20(Macintosh;\x20Intel\x20Mac\x20OS\x20X\x2010_9_5)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/67.0.3396.87\x20Safari/537.36','Telesticker','writeFileSync','find','Mozilla/5.0\x20(Macintosh;\x20Intel\x20Mac\x20OS\x20X\x2010_10;\x20rv:33.0)\x20Gecko/20100101\x20Firefox/33.0','split','div[class=\x22col-md-10\x22]','result','Mozilla/5.0\x20(X11;\x20Datanyze;\x20Linux\x20x86_64)\x20AppleWebKit/537.36\x20(KHTML,\x20like\x20Gecko)\x20Chrome/65.0.3325.181\x20Safari/537.36','href','ownerChannelName','medias','\x0a*•\x20Url\x20:*\x20','replace','Mozilla/5.0\x20(X11;\x20Ubuntu;\x20Linux\x20x86_64;\x20rv:57.0)\x20Gecko/20100101\x20Firefox/57.0','id,en-US;q=0.9,en;q=0.8,es;q=0.7,ms;q=0.6','\x0a*•\x20Quality\x20:*\x20','Waktu\x20permainan\x20habis','application/x-www-form-urlencoded','ytmp4','\x20link\x20SoundCloud','tebakgambar','audio','m.soundcloud.com','photo','*•\x20Duration\x20:*\x20','.daftar','6797680fpFMMH','attr','Mozilla/5.0\x20(Macintosh;\x20Intel\x20Mac\x20OS\x20X\x2010_9_3)\x20AppleWebKit/537.75.14\x20(KHTML,\x20like\x20Gecko)\x20Version/7.0.3\x20Safari/E7FBAF','facebook','Itu\x20bukan\x20link\x20Facebook','views','Mozilla/5.0\x20(Macintosh;\x20Intel\x20Mac\x20OS\x20X\x2010.11;\x20rv:47.0)\x20Gecko/20100101\x20Firefox/47.0'];_0x305c=function(){return _0x3e8780;};return _0x305c();}
		} catch (e) {
			console.log('Emror : %s', color(e, 'white'))
		}
	})
}
starts() 