import { frame } from '../../lib/Utilities.js'

// Catatan grup: admin menyimpan teks (aturan, link, info) dengan nama, anggota memanggilnya.
// .catatan → daftar nama, .catatan aturan → isi catatan "aturan"
// .addcatatan aturan | isi catatan (admin), .delcatatan aturan (admin)
const MAKS_CATATAN = 50

export default {
   command: ['catatan', 'addcatatan', 'delcatatan'],
   hidden: ['note', 'notes', 'addnote', 'delnote'],
   category: 'group',
   group: true,
   async run(m, { group, isAdmin, isPrefix, command, text }) {
      const catatan = (group.plugin_catatan ??= {})
      const nama = (s) => String(s || '').trim().toLowerCase().replace(/\s+/g, '-').slice(0, 30)

      if (command === 'addcatatan' || command === 'addnote') {
         if (!isAdmin) return m.reply('⚠️ Hanya admin grup yang bisa menambah catatan.')
         const [kunci, ...isi] = String(text || '').split('|')
         const teks = (isi.join('|') || m.quoted?.body || '').trim()
         if (!nama(kunci) || !teks)
            return m.reply(`👉🏻 *Contoh*: ${isPrefix}addcatatan aturan | 1. Dilarang spam\n2. Hormati sesama\n\nAtau reply sebuah pesan dengan \`${isPrefix}addcatatan aturan\``)
         if (!catatan[nama(kunci)] && Object.keys(catatan).length >= MAKS_CATATAN)
            return m.reply(`⚠️ Maksimal ${MAKS_CATATAN} catatan per grup. Hapus yang lama dulu.`)
         catatan[nama(kunci)] = teks.slice(0, 3000)
         return m.reply(`✅ Catatan *${nama(kunci)}* disimpan. Panggil dengan \`${isPrefix}catatan ${nama(kunci)}\``)
      }

      if (command === 'delcatatan' || command === 'delnote') {
         if (!isAdmin) return m.reply('⚠️ Hanya admin grup yang bisa menghapus catatan.')
         if (!catatan[nama(text)]) return m.reply('❌ Catatan itu tidak ada.')
         delete catatan[nama(text)]
         return m.reply(`🗑️ Catatan *${nama(text)}* dihapus.`)
      }

      if (nama(text)) {
         const isi = catatan[nama(text)]
         return m.reply(isi ? frame(nama(text).toUpperCase(), [isi], '📝') : `❌ Catatan "${nama(text)}" tidak ada. Lihat daftar: \`${isPrefix}catatan\``)
      }

      const daftar = Object.keys(catatan)
      m.reply(daftar.length
         ? frame('CATATAN GRUP', daftar.map((k) => `• ${k}`).concat('', `Buka: ${isPrefix}catatan <nama>`), '📝')
         : `📝 Belum ada catatan. Admin bisa menambah dengan \`${isPrefix}addcatatan nama | isi\`.`)
   }
}
