// Kata-kata penyemangat acak: .quotes
const QUOTES = [
   'Pelan-pelan saja, yang penting tidak berhenti.',
   'Hari ini mungkin berat, tapi kamu sudah sampai sejauh ini.',
   'Gagal itu biasa. Yang luar biasa adalah mencoba lagi.',
   'Mulai dari yang kecil, selesaikan satu per satu.',
   'Istirahat bukan berarti menyerah.',
   'Jangan bandingkan bab satumu dengan bab dua puluh orang lain.',
   'Kebiasaan kecil yang konsisten mengalahkan semangat besar yang sebentar.',
   'Kalau belum bisa berlari, berjalanlah. Kalau belum bisa berjalan, merangkaklah.',
   'Rezeki tidak akan tertukar, tapi tetap harus dijemput.',
   'Hal baik butuh waktu. Sabar sedikit lagi.',
   'Kamu tidak harus sempurna untuk mulai, tapi harus mulai untuk jadi lebih baik.',
   'Lelah itu tanda kamu sedang berusaha.',
   'Fokus pada apa yang bisa kamu kendalikan.',
   'Setiap ahli dulunya juga pemula.',
   'Belajar dari kemarin, hidup untuk hari ini, berharap untuk besok.',
   'Tidak apa-apa tidak baik-baik saja, asal jangan menyerah.',
   'Senyum dulu, masalahnya dipikir sambil jalan.',
   'Waktu terbaik untuk mulai adalah tadi. Waktu terbaik kedua adalah sekarang.',
   'Berbuat baiklah, walau tidak ada yang melihat.',
   'Jadilah versi terbaik dari dirimu, bukan salinan orang lain.',
   'Doa, usaha, dan sabar: tiga kunci yang jarang mengecewakan.',
   'Kesempatan sering datang menyamar sebagai kerja keras.',
   'Yang penting bukan seberapa cepat, tapi seberapa tekun.',
   'Masalah hari ini adalah cerita lucu di masa depan.',
   'Bersyukur membuat yang sedikit terasa cukup.'
]

export default {
   command: ['quotes'],
   hidden: ['quote', 'katakata'],
   category: 'fun',
   async run(m) {
      m.reply(`💬 _"${QUOTES[Math.floor(Math.random() * QUOTES.length)]}"_`)
   }
}
