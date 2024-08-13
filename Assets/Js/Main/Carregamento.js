const container = document.getElementById('container_carregamento_tela_innteira')
const messageElement = document.getElementById('message_carregamento')

const messages = [
    "A música mais curta já gravada tem apenas 1,316 segundos.",
    "O piano é conhecido como o instrumento mais difícil de tocar.",
    "Beethoven começou a perder sua audição aos 26 anos.",
    "A primeira música a ser tocada no espaço foi 'Jingle Bells'.",
    "A música 'Happy Birthday' foi a primeira música a ser cantada na lua.",
    "O álbum mais vendido de todos os tempos é 'Thriller' de Michael Jackson.",
    "A batida do coração humano pode sincronizar-se com o ritmo da música que estamos ouvindo.",
    "A música pode ajudar a melhorar a memória em pacientes com Alzheimer.",
    "A canção 'Despacito' de Luis Fonsi é a mais visualizada no YouTube, com mais de 7 bilhões de visualizações.",
    "O violino mais caro do mundo, o 'Messiah Stradivarius', vale cerca de 20 milhões de dólares.",
    "A nota mais longa tocada por um instrumento de sopro foi de 45 minutos e 47 segundos.",
    "Freddie Mercury tinha um alcance vocal de quase quatro oitavas.",
    "O álbum 'Back in Black' do AC/DC é o segundo álbum mais vendido de todos os tempos.",
    "A voz de Mariah Carey cobre cinco oitavas completas.",
    "A primeira gravação de áudio conhecida foi feita em 1860.",
    "Os Beatles são a banda com o maior número de álbuns vendidos na história.",
    "O som viaja mais rápido na água do que no ar.",
    "A música pode reduzir a percepção de dor física.",
    "Mozart começou a compor música aos cinco anos de idade.",
    "A maior orquestra do mundo tinha 8.097 músicos.",
    "A música clássica pode aumentar a inteligência espacial.",
    "A canção mais tocada no rádio é 'You've Lost That Lovin' Feelin'' dos Righteous Brothers.",
    "A frequência mais baixa que um ser humano pode ouvir é cerca de 20 Hz.",
    "O primeiro videoclipe exibido na MTV foi 'Video Killed the Radio Star' do The Buggles.",
    "Os CD's de música foram introduzidos pela primeira vez em 1982.",
    "A música pode melhorar o desempenho físico durante exercícios.",
    "A harpa é o instrumento musical mais antigo conhecido, datando de cerca de 3500 a.C.",
    "A música pode melhorar a qualidade do sono.",
    "A canção 'Bohemian Rhapsody' do Queen levou três semanas para ser gravada.",
    "A música pode aumentar a produção de dopamina, o que nos faz sentir bem.",
    "A maior duração de um concerto foi de 27 horas e 3 minutos.",
    "O primeiro instrumento musical foi a flauta, há mais de 40.000 anos.",
    "A música pode ajudar a reduzir o estresse e a ansiedade.",
    "A música pode aumentar a motivação e a concentração.",
    "O instrumento mais caro já vendido é um violino Stradivarius de 1721, vendido por 15,9 milhões de dólares.",
    "A música 'Shape of You' do Ed Sheeran é a mais tocada no Spotify.",
    "A primeira música gravada no formato MP3 foi 'Tom's Diner' de Suzanne Vega.",
    "A música pode ajudar a melhorar a coordenação motora em crianças.",
    "A primeira rádio FM foi criada em 1939.",
    "Os fones de ouvido foram inventados em 1910 por Nathaniel Baldwin."
]

let currentIndex_curiosidades = 0
let messageInterval

function changeMessage() {
    messageElement.innerText = messages[currentIndex_curiosidades]
    currentIndex_curiosidades = (currentIndex_curiosidades + 1) % messages.length
}

function toggleLoadingScreen(showMessages, background='hsla(0, 0%, 0%, 0.643)') {
    container.style.background = background
    container.style.display = 'flex'

    if (showMessages) {
        messageElement.style.display = 'block'
        changeMessage()
        messageInterval = setInterval(changeMessage, 3000)
    } else {
        messageElement.style.display = 'none'
        clearInterval(messageInterval)
    }
}

toggleLoadingScreen(true, '#181818')

function closeLoadingScreen() {
    container.style.display = 'none'
    clearInterval(messageInterval)
}