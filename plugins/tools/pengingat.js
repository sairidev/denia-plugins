import { frame } from '../../lib/Utilities.js'

// Pengingat: .ingatkan 30m Minum obat → bot mengirim pesan 30 menit lagi di chat ini (sambil menandai kamu).
// Satuan: d (detik), m (menit), j (jam). Maksimal 24 jam, 5 pengingat per orang.
// Disimpan di memori: pengingat hilang kalau bot di-restart.
const SATUAN = { d: 1000, s: 1000, m: 60000, j: 3600000, h: 3600000 }
const MAKS_MS = 24 * 3600000
const MAKS_PER_ORANG = 5
const AKTIF = new Map()   // id -> { jid, chat, pesan, waktu, timer }
let nomor = 0

const sisa = (ms) => {
   const menit = Math.max(1, Math.round(ms / 60000))
   return menit >= 60 ? `${Math.floor(menit / 60)} jam${menit % 60 ? ` ${menit % 60} menit` : ''}` : `${menit} menit`
}

export default {
   command: ['ingatkan', 'listingat', 'hapusingat'],
   hidden: ['reminder', 'remind'],
   category: 'tools',
   async run(m, { sock, isPrefix, command, text, args }) {
      const milikku = [...AKTIF.entries()].filter(([, r]) => r.jid === m.sender)

      if (command === 'listingat')
         return m.reply(milikku.length
            ? frame('PENGINGATMU', milikku.map(([id, r]) => `#${id} · ${sisa(r.waktu - Date.now())} lagi · ${r.pesan}`), '⏰')
            : '⏰ Kamu belum punya pengingat.')

      if (command === 'hapusingat') {
         const id = Number(String(args[0] || '').replace('#', ''))
         const r = AKTIF.get(id)
         if (!r || r.jid !== m.sender) return m.reply(`❌ Pengingat #${args[0] || '?'} tidak ada. Lihat: \`${isPrefix}listingat\``)
         clearTimeout(r.timer)
         AKTIF.delete(id)
         return m.reply(`🗑️ Pengingat #${id} dihapus.`)
      }

      const cocok = String(args[0] || '').toLowerCase().match(/^(\d+)([dsmjh])$/)
      const pesan = args.slice(1).join(' ').trim().slice(0, 300)
      if (!cocok || !pesan)
         return m.reply(`👉🏻 *Contoh*: ${isPrefix + command} 30m Minum obat\nSatuan: *d* detik, *m* menit, *j* jam (maks. 24j).`)
      const ms = Number(cocok[1]) * SATUAN[cocok[2]]
      if (ms < 10000 || ms > MAKS_MS) return m.reply('⚠️ Waktu pengingat antara 10 detik sampai 24 jam.')
      if (milikku.length >= MAKS_PER_ORANG) return m.reply(`⚠️ Maksimal ${MAKS_PER_ORANG} pengingat aktif per orang.`)

      const id = ++nomor
      const r = { jid: m.sender, chat: m.chat, pesan, waktu: Date.now() + ms }
      r.timer = setTimeout(() => {
         AKTIF.delete(id)
         sock.sendMessage(r.chat, { text: `⏰ *Pengingat* untuk @${r.jid.split('@')[0]}\n\n${r.pesan}`, mentions: [r.jid] }).catch(() => {})
      }, ms)
      AKTIF.set(id, r)
      m.reply(`✅ Pengingat #${id} disetel, ${sisa(ms)} lagi.\n_Pengingat hilang kalau bot di-restart._`)
   }
}
