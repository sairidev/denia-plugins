import { frame } from '../../lib/Utilities.js'

// Absen grup: admin membuka absen (.mulaiabsen Judul), anggota ketik .absen [keterangan],
// daftar hadir dilihat dengan .listabsen dan ditutup admin dengan .resetabsen.
// Data disimpan di database grup (kolom plugin_absen), jadi tetap ada walau bot restart.
const ADMIN = ['mulaiabsen', 'resetabsen']

const jam = (t) => new Date(t).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: process.env.TZ || 'Asia/Jakarta' })

const daftarHadir = (a) => frame(a.judul.toUpperCase(), [
   `Dibuka ${new Date(a.mulai).toLocaleString('id-ID', { timeZone: process.env.TZ || 'Asia/Jakarta' })}`,
   '',
   ...(a.daftar.length
      ? a.daftar.map((d, i) => `${i + 1}. ${d.nama}${d.ket ? ` (${d.ket})` : ''} · ${jam(d.waktu)}`)
      : ['Belum ada yang absen.']),
   '',
   `Total hadir: ${a.daftar.length}`
], '📋')

export default {
   command: ['absen', 'listabsen', 'mulaiabsen', 'resetabsen'],
   category: 'group',
   group: true,
   async run(m, { group, isAdmin, isPrefix, command, text }) {
      const absen = group.plugin_absen

      if (ADMIN.includes(command) && !isAdmin)
         return m.reply('⚠️ Hanya admin grup yang bisa membuka atau menutup absen.')

      if (command === 'mulaiabsen') {
         if (absen) return m.reply(`⚠️ Masih ada absen "${absen.judul}". Tutup dulu dengan \`${isPrefix}resetabsen\`.`)
         group.plugin_absen = { judul: String(text || 'Absen').trim().slice(0, 60), mulai: Date.now(), daftar: [] }
         return m.reply(`✅ Absen *${group.plugin_absen.judul}* dibuka.\nKetik \`${isPrefix}absen\` (boleh ditambah keterangan, mis. \`${isPrefix}absen izin sakit\`).`)
      }

      if (!absen) return m.reply(`📋 Belum ada absen yang dibuka. Admin bisa membuka dengan \`${isPrefix}mulaiabsen Judul\`.`)

      if (command === 'resetabsen') {
         delete group.plugin_absen
         return m.reply(daftarHadir(absen) + '\n\n🔒 Absen ditutup.')
      }

      if (command === 'listabsen') return m.reply(daftarHadir(absen))

      if (absen.daftar.some((d) => d.jid === m.sender))
         return m.reply('✅ Kamu sudah absen.')
      absen.daftar.push({ jid: m.sender, nama: m.pushName || m.sender.split('@')[0], ket: String(text || '').trim().slice(0, 40), waktu: Date.now() })
      m.reply(`✅ Absen tercatat (urutan ${absen.daftar.length}). Lihat daftar: \`${isPrefix}listabsen\``)
   }
}
