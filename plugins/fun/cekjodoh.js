// Cek kecocokan (hiburan): .cekjodoh Budi & Siti → persentase yang selalu sama untuk pasangan nama yang sama.
const hash = (s) => [...s].reduce((h, c) => (h * 33 + c.charCodeAt(0)) >>> 0, 5381)

const komentar = (p) =>
   p >= 90 ? 'Cocok banget! Sudah, langsung tentukan tanggal 💍' :
   p >= 70 ? 'Serasi! Tinggal saling jujur dan sabar 💞' :
   p >= 50 ? 'Lumayan, masih bisa diperjuangkan 🙂' :
   p >= 30 ? 'Hmm, butuh banyak usaha nih 😅' :
   'Mending temenan aja dulu 🤝'

export default {
   command: ['cekjodoh'],
   hidden: ['jodoh', 'kecocokan'],
   category: 'fun',
   async run(m, { isPrefix, command, text }) {
      const [a, b] = String(text || '').split(/\s*(?:&|\+|dan|\|)\s*/i).map((s) => s.trim()).filter(Boolean)
      if (!a || !b) return m.reply(`👉🏻 *Contoh*: ${isPrefix + command} Budi & Siti`)
      const pasangan = [a.toLowerCase(), b.toLowerCase()].sort().join('+')
      const persen = hash(pasangan) % 101
      const bar = '❤️'.repeat(Math.round(persen / 20)) + '🤍'.repeat(5 - Math.round(persen / 20))
      m.reply(`💘 *${a.slice(0, 30)}* & *${b.slice(0, 30)}*\n${bar} *${persen}%*\n\n${komentar(persen)}\n\n_Hanya hiburan ya!_`)
   }
}
