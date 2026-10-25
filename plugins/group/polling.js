// Polling WhatsApp asli: .polling Pertanyaan | Pilihan 1 | Pilihan 2 | ...
// Tambah "multi" di akhir pertanyaan (.polling Makan apa? multi | ...) supaya boleh pilih lebih dari satu.
export default {
   command: ['polling'],
   hidden: ['poll', 'vote'],
   category: 'group',
   async run(m, { sock, isPrefix, command, text }) {
      const bagian = String(text || '').split('|').map((s) => s.trim()).filter(Boolean)
      if (bagian.length < 3)
         return m.reply(`👉🏻 *Contoh*: ${isPrefix + command} Libur ke mana? | Pantai | Gunung | Di rumah aja\n\nTambah kata *multi* di akhir pertanyaan supaya boleh pilih lebih dari satu.`)

      let [judul, ...pilihan] = bagian
      const multi = /\s+multi$/i.test(judul)
      judul = judul.replace(/\s+multi$/i, '').slice(0, 255)
      pilihan = [...new Set(pilihan.map((p) => p.slice(0, 100)))].slice(0, 12)
      if (pilihan.length < 2) return m.reply('⚠️ Minimal 2 pilihan yang berbeda.')

      await sock.sendMessage(m.chat, {
         poll: { name: judul, values: pilihan, selectableCount: multi ? pilihan.length : 1 }
      }, { quoted: m })
   }
}
