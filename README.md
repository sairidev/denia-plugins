# Denia Plugins

Katalog plugin tambahan untuk bot WhatsApp **DENIA-MD**. Plugin di sini bisa dipasang sekali klik dari panel
SairiHost: menu **Plugin → Cari**. Plugin langsung aktif tanpa restart bot.

## Isi

| Plugin | Perintah | Kategori |
| --- | --- | --- |
| Absen Grup | `.mulaiabsen` `.absen` `.listabsen` `.resetabsen` | group |
| Catatan Grup | `.catatan` `.addcatatan` `.delcatatan` | group |
| Polling WhatsApp | `.polling` | group |
| Pengingat | `.ingatkan` `.listingat` `.hapusingat` | tools |
| Hitung Mundur | `.hitungmundur` | tools |
| Kalkulator Umur | `.umur` | tools |
| Tebak Angka | `.tebakangka` `.tebak` `.nyerahangka` | games |
| Suit | `.suit` | games |
| Truth or Dare | `.truth` `.dare` | fun |
| Cek Khodam | `.cekkhodam` | fun |
| Cek Jodoh | `.cekjodoh` | fun |
| Kata Penyemangat | `.quotes` | fun |

## Pasang manual

Salin file dari folder `plugins/<kategori>/` ke folder `plugins/<kategori>/` di server bot (lewat File Manager panel).
Bot memuat plugin baru otomatis.

## Format plugin

Satu file `.js` per plugin, sama seperti plugin bawaan Denia:

```js
import { frame } from '../../lib/Utilities.js'

export default {
   command: ['halo'],          // perintah utama (tampil di menu)
   hidden: ['hai'],            // alias (tidak tampil di menu)
   category: 'tools',          // kategori menu = nama folder
   group: true,                // opsional: owner, partner, premium, group, private, admin, botAdmin, limit
   async run(m, { sock, group, user, isAdmin, isPrefix, command, text, args }) {
      m.reply('Halo ' + (text || m.pushName) + '!')
   }
}
```

Data per grup bisa disimpan di objek `group` (ikut tersimpan di database bot). Pakai nama kolom berawalan
`plugin_` supaya tidak bentrok dengan data bawaan.

## Menambah plugin ke katalog

1. Tambahkan file di `plugins/<kategori>/<id>.js`.
2. Tambahkan entri di `index.json` (`id`, `nama`, `deskripsi`, `kategori`, `file`, `versi`, `pembuat`, `perintah`, `tag`).
3. Naikkan `versi` setiap kali isi plugin berubah supaya panel menawarkan update.
