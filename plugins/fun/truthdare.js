// Truth or Dare: .truth → pertanyaan jujur, .dare → tantangan (ringan, aman untuk grup).
const TRUTH = [
   'Apa hal paling memalukan yang pernah kamu alami di sekolah?',
   'Siapa orang terakhir yang kamu stalk di media sosial?',
   'Apa kebohongan terakhir yang kamu ucapkan?',
   'Kalau bisa tukar hidup dengan satu orang di grup ini selama sehari, siapa?',
   'Apa kebiasaan anehmu yang jarang diketahui orang?',
   'Lagu apa yang diam-diam sering kamu putar berulang-ulang?',
   'Pernah pura-pura sakit supaya tidak masuk sekolah/kerja?',
   'Apa hal yang paling kamu sesali tahun ini?',
   'Siapa crush pertamamu (cukup inisial)?',
   'Apa barang paling tidak berguna yang pernah kamu beli?',
   'Pernah salah kirim chat? Ke siapa dan isinya apa?',
   'Apa makanan yang kamu bilang suka padahal sebenarnya tidak?',
   'Kalau HP-mu diperiksa sekarang, aplikasi apa yang paling bikin malu?',
   'Apa mimpi teraneh yang masih kamu ingat?',
   'Hal apa yang membuatmu paling mudah tertawa?',
   'Pernah ketiduran di tempat umum? Di mana?',
   'Apa julukan masa kecilmu?',
   'Siapa orang di grup ini yang paling sering kamu chat pribadi?',
   'Apa ketakutan terbesarmu yang mungkin terdengar konyol?',
   'Kalau bisa menghapus satu kenangan, kenangan apa itu?'
]
const DARE = [
   'Kirim voice note menyanyikan reff lagu favoritmu.',
   'Ganti foto profil WhatsApp-mu dengan foto kucing selama 1 jam.',
   'Ketik namamu dengan siku lalu kirim hasilnya tanpa diperbaiki.',
   'Kirim stiker paling aneh yang kamu punya.',
   'Puji tiga orang di grup ini dengan kalimat yang berbeda.',
   'Ceritakan lelucon terlucu yang kamu tahu.',
   'Kirim emoji yang menggambarkan suasana hatimu hari ini, minimal 5 emoji.',
   'Tulis pantun 4 baris untuk orang di atas chat-mu.',
   'Buat status WA "Aku sayang grup ini" selama 30 menit.',
   'Kirim foto benda paling dekat di sebelah kirimu sekarang.',
   'Ucapkan "selamat pagi" dengan gaya pembawa berita lewat voice note.',
   'Tulis 3 fakta tentang dirimu, salah satunya bohong. Biar grup menebak.',
   'Kirim chat ke grup hanya dengan huruf kapital selama 3 pesan berikutnya.',
   'Ceritakan pengalaman paling lucu minggu ini dalam 3 kalimat.',
   'Berikan julukan baru untuk admin grup (yang sopan ya).',
   'Kirim voice note tertawa paling heboh selama 5 detik.',
   'Gambar sesuatu dalam 1 menit lalu kirim fotonya.',
   'Sebutkan 5 nama buah dalam bahasa Inggris tanpa berpikir lama.',
   'Tirukan suara hewan favoritmu lewat voice note.',
   'Kirim pesan semangat untuk anggota grup yang sedang sibuk.'
]

export default {
   command: ['truth', 'dare'],
   category: 'fun',
   async run(m, { command }) {
      const daftar = command === 'truth' ? TRUTH : DARE
      m.reply(`${command === 'truth' ? '🤔 *TRUTH*' : '🔥 *DARE*'}\n\n${daftar[Math.floor(Math.random() * daftar.length)]}`)
   }
}
