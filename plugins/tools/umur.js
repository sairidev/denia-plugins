// Kalkulator umur: .umur 17-08-2001 → umur tepat, hari lahir, dan hitung mundur ulang tahun berikutnya.
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

export default {
   command: ['umur'],
   hidden: ['usia', 'cekumur'],
   category: 'tools',
   async run(m, { isPrefix, command, text }) {
      const cocok = String(text || '').trim().match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/)
      const lahir = cocok && new Date(Number(cocok[3]), Number(cocok[2]) - 1, Number(cocok[1]))
      if (!lahir || lahir.getDate() !== Number(cocok[1]) || lahir.getMonth() !== Number(cocok[2]) - 1)
         return m.reply(`👉🏻 *Contoh*: ${isPrefix + command} 17-08-2001`)
      const kini = new Date()
      kini.setHours(0, 0, 0, 0)
      if (lahir > kini) return m.reply('⚠️ Tanggal lahir belum terjadi.')

      let tahun = kini.getFullYear() - lahir.getFullYear()
      let bulan = kini.getMonth() - lahir.getMonth()
      let hari = kini.getDate() - lahir.getDate()
      if (hari < 0) {
         bulan--
         hari += new Date(kini.getFullYear(), kini.getMonth(), 0).getDate()
      }
      if (bulan < 0) {
         tahun--
         bulan += 12
      }
      let ultah = new Date(kini.getFullYear(), lahir.getMonth(), lahir.getDate())
      if (ultah < kini) ultah = new Date(kini.getFullYear() + 1, lahir.getMonth(), lahir.getDate())
      const menuju = Math.round((ultah - kini) / 86400000)
      const totalHari = Math.round((kini - lahir) / 86400000)

      m.reply([
         `🎂 *Umur*: ${tahun} tahun ${bulan} bulan ${hari} hari`,
         `📅 *Lahir hari*: ${HARI[lahir.getDay()]}`,
         `🗓️ *Sudah hidup*: ${totalHari.toLocaleString('id-ID')} hari`,
         menuju === 0 ? '🎉 *Hari ini ulang tahunmu!* Selamat ulang tahun!' : `🎁 *Ulang tahun berikutnya*: ${menuju} hari lagi (${HARI[ultah.getDay()]})`
      ].join('\n'))
   }
}
