// Cek khodam (hiburan): .cekkhodam [nama] → hasil yang sama untuk nama yang sama di hari yang sama.
const KHODAM = [
   'Macan Putih', 'Naga Hijau', 'Kucing Oren', 'Burung Garuda', 'Harimau Sumatra', 'Kuda Lumping', 'Ayam Jago',
   'Kancil Cerdik', 'Gajah Mungkur', 'Bebek Goreng', 'Kodok Ngorek', 'Rice Cooker', 'Kipas Angin Rusak', 'Sandal Jepit',
   'Tutup Panci', 'Charger KW', 'Galon Kosong', 'Ultraman', 'Power Ranger Pink', 'Ninja Hatori', 'Doraemon',
   'Ikan Cupang', 'Semut Rangrang', 'Kecoa Terbang', 'Lele Jumbo', 'Kambing Etawa', 'Burung Hantu', 'Panda Merah',
   'Singa Laut', 'Nyi Roro Kidul (versi KW)', 'Tuyul Magang', 'Wifi Tetangga', 'Remote TV', 'Bakso Urat', 'Seblak Level 5'
]
const SIFAT = ['penjaga rezeki', 'pembawa hoki', 'penunda tugas', 'pengusir ngantuk', 'pemanggil hujan', 'pelindung kuota', 'penambah nafsu makan', 'peredam emosi']

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)

export default {
   command: ['cekkhodam'],
   hidden: ['khodam'],
   category: 'fun',
   async run(m, { text }) {
      const nama = String(text || m.pushName || 'kamu').trim().slice(0, 40)
      const kunci = hash(nama.toLowerCase() + new Date().toDateString())
      const kosong = kunci % 9 === 0
      m.reply(kosong
         ? `🔮 Khodam *${nama}*: ... kosong! Khodamnya lagi cuti hari ini 😴`
         : `🔮 Khodam *${nama}* adalah *${KHODAM[kunci % KHODAM.length]}*\nSifat: ${SIFAT[(kunci >> 3) % SIFAT.length]} ✨\n\n_Hanya hiburan ya!_`)
   }
}
