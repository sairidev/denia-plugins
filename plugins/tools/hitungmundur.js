// Hitung mundur ke tanggal tertentu: .hitungmundur 2026-12-31 Tahun Baru (juga menerima 31-12-2026).
// Tanpa tanggal: hitung mundur ke tahun baru berikutnya.
const TZ = process.env.TZ || 'Asia/Jakarta'

const bacaTanggal = (s) => {
   let m = String(s || '').match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
   if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
   m = String(s || '').match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/)
   if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]))
   return null
}

export default {
   command: ['hitungmundur'],
   hidden: ['countdown'],
   category: 'tools',
   async run(m, { isPrefix, command, args }) {
      const sekarang = new Date()
      let tujuan = bacaTanggal(args[0])
      let acara = args.slice(1).join(' ').trim()
      if (!tujuan) {
         if (args[0]) return m.reply(`👉🏻 *Contoh*: ${isPrefix + command} 2026-12-31 Tahun Baru`)
         tujuan = new Date(sekarang.getFullYear() + 1, 0, 1)
         acara = `Tahun Baru ${tujuan.getFullYear()}`
      }
      const ms = tujuan - sekarang
      const tanggal = tujuan.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ })
      if (ms <= 0) return m.reply(`📅 ${acara || tanggal} sudah lewat ${Math.floor(-ms / 86400000)} hari yang lalu.`)
      const hari = Math.floor(ms / 86400000)
      const jam = Math.floor((ms % 86400000) / 3600000)
      const menit = Math.floor((ms % 3600000) / 60000)
      m.reply(`⏳ *${acara || 'Hitung mundur'}*\n📅 ${tanggal}\n\nTinggal *${hari} hari ${jam} jam ${menit} menit* lagi.`)
   }
}
