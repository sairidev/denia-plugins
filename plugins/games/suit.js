// Suit melawan bot: .suit batu | gunting | kertas
const PILIHAN = { batu: '🪨', gunting: '✂️', kertas: '📄' }
const MENANG = { batu: 'gunting', gunting: 'kertas', kertas: 'batu' }
const ALIAS = { b: 'batu', g: 'gunting', k: 'kertas', rock: 'batu', scissors: 'gunting', paper: 'kertas' }

export default {
   command: ['suit'],
   hidden: ['suwit', 'rps'],
   category: 'games',
   async run(m, { isPrefix, command, args }) {
      const kamu = ALIAS[String(args[0] || '').toLowerCase()] || String(args[0] || '').toLowerCase()
      if (!PILIHAN[kamu]) return m.reply(`👉🏻 *Contoh*: ${isPrefix + command} batu\nPilihan: batu, gunting, kertas`)
      const bot = Object.keys(PILIHAN)[Math.floor(Math.random() * 3)]
      const hasil = kamu === bot ? '🤝 *Seri!*' : MENANG[kamu] === bot ? '🎉 *Kamu menang!*' : '😜 *Bot menang!*'
      m.reply(`Kamu: ${PILIHAN[kamu]} ${kamu}\nBot: ${PILIHAN[bot]} ${bot}\n\n${hasil}`)
   }
}
