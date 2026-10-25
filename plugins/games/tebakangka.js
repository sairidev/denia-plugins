// Tebak angka 1-100 per chat: .tebakangka mulai, .tebak 50 menebak (bot menjawab "lebih besar/kecil"),
// .nyerahangka membuka jawabannya. Yang menebak benar dapat limit sesuai jumlah percobaan.
const SESI = new Map()   // chat -> { angka, coba, mulai }
const BATAS_WAKTU = 10 * 60000

const hadiah = (coba) => (coba <= 5 ? 3 : coba <= 8 ? 2 : 1)

export default {
   command: ['tebakangka', 'tebak', 'nyerahangka'],
   category: 'games',
   async run(m, { user, isPrefix, command, args }) {
      const sesi = SESI.get(m.chat)
      const kedaluwarsa = sesi && Date.now() - sesi.mulai > BATAS_WAKTU
      if (kedaluwarsa) SESI.delete(m.chat)

      if (command === 'tebakangka') {
         if (sesi && !kedaluwarsa) return m.reply(`🎲 Permainan masih jalan (${sesi.coba} tebakan). Tebak dengan \`${isPrefix}tebak <angka>\``)
         SESI.set(m.chat, { angka: 1 + Math.floor(Math.random() * 100), coba: 0, mulai: Date.now() })
         return m.reply(`🎲 Aku sudah memilih angka *1 sampai 100*.\nTebak dengan \`${isPrefix}tebak <angka>\`. Waktu 10 menit!`)
      }

      if (!sesi || kedaluwarsa) return m.reply(`🎲 Belum ada permainan. Mulai dengan \`${isPrefix}tebakangka\``)

      if (command === 'nyerahangka') {
         SESI.delete(m.chat)
         return m.reply(`🏳️ Jawabannya *${sesi.angka}*. Main lagi: \`${isPrefix}tebakangka\``)
      }

      const tebakan = Number(args[0])
      if (!Number.isInteger(tebakan) || tebakan < 1 || tebakan > 100) return m.reply('⚠️ Tebak dengan angka 1 sampai 100.')
      sesi.coba++
      if (tebakan === sesi.angka) {
         SESI.delete(m.chat)
         const dapat = hadiah(sesi.coba)
         if (user && typeof user.limit === 'number') user.limit += dapat
         return m.reply(`🎉 *Benar!* Angkanya ${sesi.angka}, ditebak dalam ${sesi.coba} percobaan.\n🎁 +${dapat} limit untuk ${m.pushName || 'kamu'}.`)
      }
      m.reply(`${tebakan < sesi.angka ? '⬆️ Lebih *besar*' : '⬇️ Lebih *kecil*'} dari ${tebakan}. (tebakan ke-${sesi.coba})`)
   }
}
