window.addEventListener('resize', () => {
    Mostrar_Max_Musicas()
})

//! Formata a string
function formatarString(str) {
    // Remove acentos e caractesres especiais
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    // Converte para minúsculas
    str = str.toLowerCase()

    // Remove espaços
    str = str.replace(/\s/g, '')

    return str
}

//! Formata a pesquisa
function formatarTermoPesquisa(musica, cantor) {
    // Remove acentos e caracteres especiais
    const removerAcentos = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // Remove espaços e substitui por "+"
    const formatarTexto = (str) => {
        return str.replace(/\s+/g, "+");
    };

    // Formata a música e o cantor
    const musicaFormatada = removerAcentos(musica);
    const cantorFormatado = removerAcentos(cantor);

    // Retorna a música e o cantor formatados
    return formatarTexto(musicaFormatada) + "+" + formatarTexto(cantorFormatado);
}

//! Vai pegar a data atual
function getDataAtual(dia = 0, mes = 0, ano = 0, dataInicial = '') {
    let data;

    if (dataInicial) {
        // Divide a data inicial em partes (dia, mês, ano)
        const [diaInicial, mesInicial, anoInicial] = dataInicial.split('/').map(Number);
        // Cria um objeto Date com a data inicial fornecida
        data = new Date(anoInicial, mesInicial - 1, diaInicial);
    } else {
        // Usa a data atual se nenhuma data inicial for fornecida
        data = new Date();
    }

    // Realiza a soma ou subtração de anos, meses e dias
    if (ano) data.setFullYear(data.getFullYear() + ano);
    if (mes) data.setMonth(data.getMonth() + mes);
    if (dia) data.setDate(data.getDate() + dia);

    // Retorna a nova data no formato 'dd/mm/aaaa'
    return `${formatarNumero(data.getDate())}/${formatarNumero(data.getMonth() + 1)}/${data.getFullYear()}`;
}

//! Checa se a data já passou
function jaPassou(data) {
    // Divide a string da data em partes (dia, mês, ano)
    const partesData = data.split('/');
    const dia = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10) - 1; // Meses em JavaScript são indexados de 0 (Janeiro) a 11 (Dezembro)
    const ano = parseInt(partesData[2], 10);

    // Cria um objeto Date com a data fornecida
    const dataFornecida = new Date(ano, mes, dia);

    // Obtém a data atual
    const dataAtual = new Date();

    // Verifica se a data fornecida já passou
    if (dataFornecida < dataAtual) {
        return true;
    } else {
        return false;
    }
}

// Função auxiliar para formatar números menores que 10 com zero à esquerda
function formatarNumero(numero) {
    return numero < 10 ? '0' + numero : numero;
}

//! Vai carregar uma imagem
function carregarImagem(src, callback) {
    var img = new Image()
    img.onload = function() {
        callback(img)
    }
    img.onerror = function() {
        callback(null)
    }
    img.src = src
}

//! Vai jogar confetes na tela
function Confetes() {
    let params = {
        particleCount: 500, // Quantidade de confetes
        spread: 90, // O quanto eles se espalham
        startVelocity: 70, // Velocidade inicial
        origin: { x: 0, y: 1 }, // Posição inicial na tela
        angle: 45 // Ângulo em que os confetes serão lançados
    };

    // Joga confetes da esquerda pra direita
    confetti(params);

    // Joga confetes da direita para a esquerda
    params.origin.x = 1;
    params.angle = 135;
    confetti(params);
}

//! Vai notificar alguma coisa
let comemorar = false
let noficacao_esta_aberta = false
function Notificar_Infos(info='', comando='', Texto_Btn='Sim!', Link='') {
    noficacao_esta_aberta = true
    return new Promise((resolve) => {
        const div_notificacao_infos = document.getElementById('div_notificacao_infos')
        const texto_notificacao_infos = document.getElementById('texto_notificacao_infos')
        const btn_confirmar_notificacao_infos = document.getElementById('btn_confirmar_notificacao_infos')
        const btn_fechar_notificacao_infos = document.getElementById('btn_fechar_notificacao_infos')
        const notificacao_infos = document.getElementById('notificacao_infos')
        const link_notificar_infos = document.getElementById('link_notificar_infos')
        
        if(comando.includes('Grande')) {
            notificacao_infos.classList.add('Informacao')
        } else {
            notificacao_infos.classList.remove('Informacao')
        }

        if(comando.includes('Informação')) {
            div_notificacao_infos.innerHTML = substituirCor_cor(substituirTexto_cor(info))
            div_notificacao_infos.style.display = 'block'
            texto_notificacao_infos.style.display = 'none'

        } else {
            texto_notificacao_infos.innerHTML = info
            div_notificacao_infos.style.display = 'none'
            texto_notificacao_infos.style.display = 'block'
        }

        if(comando.includes('Link')) {
            link_notificar_infos.style.display = 'block'
            link_notificar_infos.href = Link

            if(Texto_Btn != 'Sim!') {
                link_notificar_infos.innerText = Texto_Btn
            } else {
                link_notificar_infos.innerText = 'Ver'
            }
        } else {
            link_notificar_infos.style.display = 'none'
        }

        document.getElementById('container_notificacao_infos').style.display = 'flex'
        btn_confirmar_notificacao_infos.innerText = Texto_Btn

        if (comando.includes('Comemorar')) {
            comemorar = true
            Comemorar()

        }
        
        if(comando.includes('Emojis')) {
            let emojis = Separar_Por_Virgula(comando.replace('Emojis:', ''))
            startEmojiRain(emojis)
        }

        btn_confirmar_notificacao_infos.addEventListener('click', () => {
            Fechar_Notificacao_Infos(comando)
            resolve(true)
        })

        btn_fechar_notificacao_infos.addEventListener('click', () => {
            Fechar_Notificacao_Infos(comando)
            resolve(false)
        })

        if (comando.includes('Confirmar')) {
            btn_confirmar_notificacao_infos.style.display = 'block'
        } else {
            btn_confirmar_notificacao_infos.style.display = 'none'  
        }
    })
}

//! Vai fechar a notificação
function Fechar_Notificacao_Infos(comando) {
    noficacao_esta_aberta = false
    comemorar = false
    if(comando.includes('Comemorar')) {
        Comemorar()        

    } else if(comando.includes('Emojis')) {
        stopEmojiRain()

    } else if(comando.includes('Imgs')) {
        stopImageRain()
    }

    document.getElementById('container_notificacao_infos').style.display = 'none'
}

//! Vai comemorar alguma coisa
function Comemorar() { 
    if(comemorar) {
        Confetes()
        setTimeout(() => {
            Comemorar(comemorar)  
        }, 3000)
    }
}

//! Vai separar os artistas por uma virgula
function Separar_Por_Virgula(stringDeArtistas) {
    // Verifica se a string não está vazia
    if (stringDeArtistas.trim() === "") {
        return [];
    }

    // Separa os artistas usando a vírgula como delimitador
    const artistasArray = stringDeArtistas.split(",");

    // Remove espaços em branco antes e depois de cada nome de artista
    const artistasLimpos = artistasArray.map(artist => artist.trim());

    return artistasLimpos;
}

//! Vai encontrar o artista
function encontrarArtistas(arrayDeArtistas, nomeProcurado) {
    if (arrayDeArtistas.length === 0) {
        return [];
    }

    const nomesFormatados = arrayDeArtistas.map(artist => artist.toLowerCase());

    let nomeMaisProximo = "";
    let menorDistancia = Infinity;

    nomesFormatados.forEach((nome, index) => {
        const partesDoNome = nome.split(' ');
        let distanciaMedia = 0;

        partesDoNome.forEach(part => {
            const distancia = calcularDistanciaLevenshtein(nomeProcurado.toLowerCase(), part);
            distanciaMedia += distancia;
        });

        distanciaMedia /= partesDoNome.length;

        if (distanciaMedia < menorDistancia) {
            menorDistancia = distanciaMedia;
            nomeMaisProximo = arrayDeArtistas[index];
        }
    });

    return {
        artistas: arrayDeArtistas,
        nomeMaisProximo: nomeMaisProximo,
        indiceNomeMaisProximo: arrayDeArtistas.indexOf(nomeMaisProximo)
    };
}

const artistas = ['Hulvey', 'Forrest Frank'];
const resultado = encontrarArtistas(artistas, 'forrest');


//! calcula a distância de Levenshtein entre duas strings, a e b
function calcularDistanciaLevenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // Inicializar a primeira linha e coluna da matriz
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Preencher o resto da matriz
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                const deletion = matrix[i - 1][j] + 1;
                const insertion = matrix[i][j - 1] + 1;
                const substitution = matrix[i - 1][j - 1] + 1;
                matrix[i][j] = Math.min(deletion, insertion, substitution);
            }
        }
    }

    return matrix[b.length][a.length];
}

//! Vai remover os nomes duplicados
function removerNomesDuplicados(arrayDeNomes) {
    // Criar um conjunto vazio para armazenar os nomes únicos
    const nomesUnicos = new Set();

    // Iterar sobre o array de nomes
    arrayDeNomes.forEach(nome => {
        // Formatar o nome removendo espaços em branco extras e convertendo para minúsculas
        const nomeFormatado = nome.trim().toLowerCase();

        // Adicionar o nome formatado ao conjunto de nomes únicos
        nomesUnicos.add(nomeFormatado);
    });

    // Converter o conjunto de volta para um array
    const nomesUnicosArray = Array.from(nomesUnicos);

    return nomesUnicosArray;
}

function removerDuplicados(array) {
    return [...new Set(array)]
}

//! tem o objetivo de extrair e listar os nomes de todos os artistas presentes em uma coleção de músicas
function Nome_Artistas() {
    let TodosArtistas = []
    for (let c = 0; c < TodasMusicas.length; c++) {
        const resultado = Separar_Por_Virgula(TodasMusicas[c].Autor)

        resultado.forEach(element => {
            TodosArtistas.push(element)
        })
    }

    return TodosArtistas
}

//! Vai entrar em tela cheia
let esta_em_tela_cheia = false
// Função para entrar em tela cheia
function entrarEmTelaCheia() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen()
    }
}
  
// Função para sair da tela cheia
function sairTelaCheia() {
    if (document.exitFullscreen) {
    document.exitFullscreen().catch(err => {
        console.error("Erro ao sair da tela cheia:", err)
    })
    } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
    document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen()
    }
}
  
// Função para checar se está em tela cheia
function isFullscreen() {
return document.fullscreenElement != null ||
        document.mozFullScreenElement != null ||
        document.webkitFullscreenElement != null ||
        document.msFullscreenElement != null
}

//! Vai retornar os artistas da musica
function Retornar_Artistas_Da_Musica(Musica) {
    const p = document.createElement('p')
    p.className = 'p_nomes_artistas'
    let artistas = Separar_Por_Virgula(Musica.Autor)
    for (let c = 0; c < artistas.length; c++) {
        if(c < artistas.length -1) {
            p.innerHTML += `<span class="span_nomes_artistas">${artistas[c]}</span>, `

        } else {
            p.innerHTML += `<span class="span_nomes_artistas">${artistas[c]}</span>`
        }
    }

    let spans = p.querySelectorAll('span')
    spans.forEach(element => {
      element.addEventListener('click', () => {
        Abrir_Perfil_Artista(element.innerText, Musica)
      })  
    })

    return p
}

//! Vai reposicionar um elemento HTML na tela com base na posição do cursor do mouse
function posicionarElemento(event, elemento, array_classes=array_locais_opcoes, tipo_display='block') {
    elemento.style.display = tipo_display // Mostra o elemento

    var mouseX = event.clientX
    var mouseY = event.clientY

    var windowWidth = window.innerWidth
    var windowHeight = window.innerHeight

    var elementoWidth = elemento.offsetWidth
    var elementoHeight = elemento.offsetHeight

    var novoX = mouseX + 10; // Adiciona uma folga de 10 pixels
    var novoY = mouseY + 10; // Adiciona uma folga de 10 pixels

    // Verifica se o elemento estará fora da tela horizontalmente
    if (novoX + elementoWidth > windowWidth) {
        novoX = windowWidth - elementoWidth
    }

    // Verifica se o elemento estará fora da tela verticalmente
    if (novoY + elementoHeight > windowHeight) {
        novoY = windowHeight - elementoHeight
    }

    elemento.style.left = novoX + 'px'
    elemento.style.top = novoY + 'px'

    document.addEventListener('click', (e) => {
        let el = e.target.className
        let elemento_igual = false
        array_classes.forEach(classes => {
            if(classes == el) {
                elemento_igual = true
            }
        })

        if(!elemento_igual) {
            elemento.style.display = 'none'
        }
    })

    document.querySelector('main').addEventListener('scroll', (e) => {
        let el = e.target.className
        let elemento_igual = false
        array_classes.forEach(classes => {
            if(classes == el) {
                elemento_igual = true
            }
        })

        if(!elemento_igual) {
            elemento.style.display = 'none'
        }
    })
}

//! Vai ordenar dos nomes que aparecem mais para os que aparencem menos
function ordenarNomesPorFrequencia(nomes) {
    // Cria um objeto para contar a frequência de cada nome
    const frequencia = {};
    for (const nome of nomes) {
        frequencia[nome] = (frequencia[nome] || 0) + 1;
    }

    // Converte o objeto em uma matriz de pares [nome, frequência]
    const frequenciaArray = Object.entries(frequencia);

    // Ordena a matriz com base na frequência, do maior para o menor
    frequenciaArray.sort((a, b) => b[1] - a[1]);

    // Extrai apenas os nomes ordenados
    const nomesOrdenados = frequenciaArray.map(item => item[0]);

    return nomesOrdenados;
}

document.addEventListener('contextmenu', function(event) {
    event.preventDefault()
})

//! Vai gerar uma cor aleatória
function gerarCorAleatoria(clara = true, transparencia = 1) {
    if (clara) {
        // Gerar uma cor clara
        var r = Math.floor(Math.random() * 76) + 90; // Intervalo entre 180 e 255
        var g = Math.floor(Math.random() * 76) + 90;
        var b = Math.floor(Math.random() * 76) + 90;
    } else {
        // Gerar uma cor escura
        var r = Math.floor(Math.random() * 101); // Intervalo entre 0 e 100
        var g = Math.floor(Math.random() * 101);
        var b = Math.floor(Math.random() * 101);
    }
    
    return `rgb(${r}, ${g}, ${b}, ${transparencia})`;
}

//! Esta função denominada `shuffleArray` 🌟 tem o propósito de embaralhar um array 🎲 de forma aleatória 🌀.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//! Converte as strings de data para objetos Date
function verificarDataDepois(data1, data2) {
    const partesData1 = data1.split('/');
    const partesData2 = data2.split('/');
    const dataObjeto1 = new Date(partesData1[2], partesData1[1] - 1, partesData1[0]); // Mês é 0-indexado
    const dataObjeto2 = new Date(partesData2[2], partesData2[1] - 1, partesData2[0]); // Mês é 0-indexado
    
    // Verifica se a segunda data é depois da primeira
    if (dataObjeto2 > dataObjeto1) {
        return true;
    } else {
        return false;
    }
}

//! Converte as datas para objetos Date
function organizarPorDataDescendente(array) {
    return array.sort((a, b) => {
        const dataA = new Date(a.Data.split('/').reverse().join('/'));
        const dataB = new Date(b.Data.split('/').reverse().join('/'));
        
        // Compara as datas para ordenar do mais recente para o mais antigo
        return dataB - dataA;
    });
}

//! Verifica se alguma das strings no array contém a palavra
function palavraNoArray(array, palavra) {
    if (array.some(str => str.includes(palavra))) {
        return true;
    } else {
        return false;
    }
}

//! Chover emojis
let intervalId; // Variável global para armazenar o ID do intervalo

function emojiRain(emoji) {
    function animateEmoji(emojiElement) {
        const speed = Math.random() * 4 + 2; // Velocidade de queda (ajuste conforme necessário)
        const drift = (Math.random() - 0.5) * 2; // Desvio horizontal para adicionar efeito de movimento

        emojiElement.style.top = (parseFloat(emojiElement.style.top) + speed) + 'px';
        emojiElement.style.left = (parseFloat(emojiElement.style.left) + drift) + 'px';

        if (parseFloat(emojiElement.style.top) > window.innerHeight + 100) {
            emojiElement.remove(); // Remove o emoji quando ele cai abaixo da tela
            return;
        }

        requestAnimationFrame(() => animateEmoji(emojiElement));
    }

    const emojiElement = document.createElement('div');
    emojiElement.innerHTML = emoji;
    emojiElement.style.position = 'absolute';
    emojiElement.style.zIndex = '6';
    emojiElement.style.fontSize = '24px'; // Tamanho do emoji (ajuste conforme necessário)
    emojiElement.style.left = Math.random() * (window.innerWidth - 50) + 'px'; // Posição inicial X
    emojiElement.style.top = '-50px'; // Posição inicial Y
    document.body.appendChild(emojiElement);

    animateEmoji(emojiElement);
}

//! Vai começar a chuva de emojis
function startEmojiRain(emojis, interval = 50) {
    intervalId = setInterval(() => {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        emojiRain(randomEmoji); // Chama a função emojiRain para criar um emoji aleatório
    }, interval);
}

//! Vai parar a chuva de imagens
function stopEmojiRain() {
    clearInterval(intervalId)
}

//! Chover imgs
let intervalId_imgs_rain; // Variável global para armazenar o ID do intervalo

function imageRain(imageUrl) {
    function animateImage(imageElement) {
        const speed = Math.random() * 4 + 2; // Velocidade de queda (ajuste conforme necessário)
        // const rotation = Math.random() * 360; // Rotação aleatória da imagem
        // const rotateDir = Math.random() < 0.5 ? -1 : 1; // Direção da rotação (aleatório)
        const drift = (Math.random() - 0.5) * 2; // Desvio horizontal para adicionar efeito de movimento

        // imageElement.style.transform = `rotate(${rotation * rotateDir}deg)`;
        imageElement.style.top = (parseFloat(imageElement.style.top) + speed) + 'px';
        imageElement.style.left = (parseFloat(imageElement.style.left) + drift) + 'px';

        if (parseFloat(imageElement.style.top) > window.innerHeight) {
            imageElement.remove(); // Remove a imagem quando ela cai abaixo da tela
            return;
        }

        requestAnimationFrame(() => animateImage(imageElement));
    }

    let tamanho_img = 50
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.style.zIndex = '6'
    imageElement.style.borderRadius = '50%'
    imageElement.style.objectFit = 'cover'
    imageElement.style.position = 'absolute';
    imageElement.style.width = `${tamanho_img}px`; // Tamanho da imagem
    imageElement.style.height = `${tamanho_img}px`; // Tamanho da imagem
    imageElement.style.left = Math.random() * (window.innerWidth - 50) + 'px'; // Posição inicial X
    imageElement.style.top = '-50px'; // Posição inicial Y
    document.body.appendChild(imageElement);

    animateImage(imageElement);
}

//! Vai chamar a função imageRain para criar uma imagem
function startImageRain(imageUrl, interval = 100) {
    intervalId_imgs_rain = setInterval(() => {
        imageRain(imageUrl); 
    }, interval);
}

//! Vai limpar o intervalo
function stopImageRain() {
    clearInterval(intervalId_imgs_rain);
}

//! Vai trocar a cor de fundo de forma animada
function animateBackgroundColor(color, elements, duration = 2000) {
    elements.forEach(element => {
        element.style.transition = `background-color ${duration}ms linear`
        element.style.backgroundColor = color
    })
}

//! Vai remover as palavras do texto
function removerPalavras(palavras, texto) {
    // Cria uma expressão regular que corresponde a qualquer uma das palavras, ignorando maiúsculas/minúsculas
    const regex = new RegExp(`\\b(${palavras.join('|')})\\b`, 'gi');
    
    // Substitui as palavras encontradas por uma string vazia
    const textoLimpo = texto.replace(regex, '').replace(/\s+/g, ' ').trim();
    
    return textoLimpo;
}

//! Vai remover a palavra só
function removerPalavrasSozinha(palavras, texto) {
    // Cria um conjunto de expressões regulares para corresponder as palavras variáveis
    const regexes = palavras.map(palavra => new RegExp(`\\[${palavra}\\s*\\d*\\]`, 'i'));
    
    // Divide o texto em linhas
    const linhas = texto.split('\n');
    
    // Percorre cada linha e aplica as regras de remoção
    const linhasFiltradas = linhas.map((linha, index, arr) => {
        const linhaTrim = linha.trim();
        if (regexes.some(regex => regex.test(linhaTrim))) {
            const linhaAnterior = arr[index - 1] && arr[index - 1].trim();
            const linhaSeguinte = arr[index + 1] && arr[index + 1].trim();
            
            if (linhaAnterior && linhaSeguinte) {
                return ''; // Deixa uma linha vazia se estiver entre duas linhas com texto
            } else {
                return null; // Remove a linha completamente se não estiver entre duas linhas com texto
            }
        }
        return linha; // Mantém a linha inalterada se não corresponder à palavra
    }).filter(linha => linha !== null); // Remove as linhas que foram definidas como null

    // Junta as linhas filtradas de volta em um único texto
    const textoFiltrado = linhasFiltradas.join('\n');
    
    return textoFiltrado;
}

//! Vai limpar a letra da musica ao colocar no add letra
function limparLetraMusica(musica) {
    // Array de palavras a serem removidas em várias línguas
    const palavrasParaRemover = [
        "intro", "verse", "chorus", "outro", "bridge", "pre-chorus", "hook", "coro", "ver",
        "verso", "estrofe", "refrão", "ponte", "introdução", "final", "introduction", "end",
        "verse 1", "verse 2", "vers 1", "vers 2", "chorus 1", "chorus 2", "verse one", "verse two"
    ];

    // Regex para identificar palavras para remover, considerando [] opcional
    const regexRemover = new RegExp(`(^|\\[)(?:\\s*)(${palavrasParaRemover.join('|')})(?:\\s*)(?=\\]|$)`, 'gi');

    // Remove palavras indesejadas apenas das linhas com uma ou duas palavras
    let linhas = musica.split('\n');
    for (let i = 0; i < linhas.length; i++) {
        if (linhas[i].trim().split(/\s+/).length <= 2) {
            linhas[i] = linhas[i].replace(regexRemover, '').trim();
        }
    }

    // Adiciona linha vazia entre estrofes
    let musicaLimpa = linhas.join('\n').replace(/\n{2,}/g, '\n\n');

    return musicaLimpa;
}

//! Vai somar os tempos do audios
async function somarTempos(Musicas) {
    let totalSegundos = 0
  
    for (let musica of Musicas) {
      const audio = new Audio(musica.Audio)
      await new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', () => {
          totalSegundos += audio.duration
          resolve()
        })
      })
    }
  
    let horas = Math.floor(totalSegundos / 3600)
    let minutos = Math.floor((totalSegundos % 3600) / 60)
    let segundos = Math.floor(totalSegundos % 3600 % 60)
  
    return {
      Horas: horas,
      Minutos: minutos,
      Segundos: segundos
    }
}

async function Tempo_Musica(Musica, Formatado=false) {
    let resultado = ''

    let totalSegundos = 0
  
    const audio = new Audio(Musica.Audio)
    await new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', () => {
            totalSegundos += audio.duration
            resolve()
        })
    })
  
    let Horas = Math.floor(totalSegundos / 3600)
    let Minutos = Math.floor((totalSegundos % 3600) / 60)
    let Segundos = Math.floor(totalSegundos % 3600 % 60)
  
    if(!Formatado) {
        return {
            Horas,
            Minutos,
            Segundos
        }
    } else {

        if(Horas > 0) {
            resultado += `${Horas} horas`
        }

        if(Minutos > 0) {
            if(resultado != '') {
                resultado += `, ${Minutos} min`

            } else {
                resultado += `${Minutos} min`
            }
        }

        if(Segundos > 0) {
            if(resultado != '') {
                resultado += ` e ${Segundos} s`

            } else {
                resultado += `${Segundos} s`
            }
        }

        return resultado
    }
}

//! Detecta imgs pon!@# e | ou violentas

function validateImage(imageUrl, Qm_Chamou) {
    let ban_dado = false
    const API_KEY = 'acc_bec382334232238';
    const API_SECRET = '2ac96f503928a2bdc3216f9fbdf01f30';

    return fetch(`https://api.imagga.com/v2/categories/nsfw_beta?image_url=${encodeURIComponent(imageUrl)}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(`${API_KEY}:${API_SECRET}`)
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result && result.result && result.result.categories) {
            function Checar_Resultados_Img(result) {
                let safeConfidence = 0;
                const safeCategory = result.result.categories.find(category => category.name.en === 'safe');
                if (safeCategory) {
                    safeConfidence = safeCategory.confidence;
                }
                
                console.log(safeConfidence)
                
                const unsafeCategories = ['nudity', 'adult', 'unsafe', 'nsfw', 'underwear']
                const containsUnsafeCategory = result.result.categories.some(category => unsafeCategories.includes(category.name.en))
                
                console.log(result)
                let ban_dado = false
                let safe_maior = true
                let nivel_ban1 = false
                let nivel_ban2 = false
                let categorias = result.result.categories
                let tem_unsafe = false
                let unsafe_is_maior_max = false
                let tem_not_safe = false
                let not_safe_maior_max = false
                const max_unsafe = 7
                const max_not_safe = 10
                let not_safe_confidence = 0
                let unsafe_confidence = 0
                for (let c = 0; c < categorias.length; c++) {
                    for (let b = 0; b < unsafeCategories.length; b++) {
                        if(categorias[c].name.en == unsafeCategories[b] && categorias[c].name.en != 'nsfw') {
                            tem_unsafe = true
                
                            if(categorias[c].confidence > max_unsafe) {
                                unsafe_is_maior_max = true
                            }
                        }
                
                        if(categorias[c].name.en == 'nsfw') {
                            not_safe_confidence = categorias[c].confidence
                            tem_not_safe = true
                
                            if(categorias[c].confidence > max_not_safe) {
                                not_safe_maior_max = true
                            }
                        }
                    }
                }
                
                console.log('Not Safe For Work: ' + tem_unsafe)
                console.log('Tem Categoria Bloqueada: ' + tem_unsafe)
                console.log('Categoria Bloqueada Maior Que Max: ' + unsafe_is_maior_max)
                console.log('Not Safe Maior Que Max: ' + not_safe_maior_max)
                
                if(unsafe_is_maior_max && not_safe_maior_max || not_safe_confidence > 40 && tem_unsafe || unsafe_confidence > 40 && tem_not_safe) {
                    console.log('User Banido ❌🟥')
                    Aplicar_Ban(User, 'Banir', 'Imagens de Perfil e Background')
                    return { 
                        isValid: false, 
                        message: ' ⚠️ Sua conta está sob aviso 🚨 por utilizar uma imagem inadequada. 🖼️ Se continuar assim, sua conta pode acabar sendo banida! 🚫 Por favor, ajuste o conteúdo conforme as diretrizes para evitar problemas futuros. 🙏', 
                        emojis: 'Emojis:🚫, ❌, ⛔, 🔒, 🙅, 🚷, 🛑, 🔞, 🔐, 👋', 
                        action: 'Entendi' 
                    }
                } else if(unsafe_is_maior_max || not_safe_maior_max) {
                    console.log('User Avisado 🛩✈🛫')
                    return { 
                        isValid: false, 
                        message: 'Imagem inadequada!🚫🔞 Por favor, escolha outra.⛔', 
                        emojis: 'Emojis:🚫, ❌, ⛔, 🔒, 🙅, 🚷, 🛑, 🔞, 🔐, 👋', 
                        action: 'Entendi' 
                    }

                } else {
                    console.log('Img Aprovada ✔✅🥗')
                    return { 
                        isValid: true, 
                        message: 'Imagem aprovada!🥳', 
                        emojis: 'Emojis:🎉,🎊,🥳,🎂,🎆,🍾,🥂,🏆,🏅,🎇' 
                    }
                }
            }  return Checar_Resultados_Img(result)
        } else {
            throw new Error('Não foi possível processar a resposta da API.');
        }
    })
    .catch(error => {
        console.error('Ocorreu um erro ao processar a imagem:', error);
        // Retornar uma resposta indicando que houve um erro
        return { 
            isValid: false, 
            message: 'Ocorreu um erro ao processar a imagem. Por favor, tente novamente mais tarde.', 
            emojis: 'Emojis:❗️, ⚠️, 🚫' 
        };
    });
}

//! Mostra o time da música
function obterDuracaoOuTempoAtualAudio(audioPlayer, formatado = false, tipo = 'duration', atualizarInputs = false) {
    return new Promise((resolve, reject) => {
        if (!audioPlayer) {
            return reject(new Error('Elemento de áudio não fornecido'))
        }

        const processTime = () => {
            let durationInSeconds

            if (tipo === 'currentTime') {
                durationInSeconds = audioPlayer.currentTime
            } else {
                durationInSeconds = audioPlayer.duration
            }

            const hours = Math.floor(durationInSeconds / 3600)
            const minutes = Math.floor((durationInSeconds % 3600) / 60)
            const seconds = Math.floor(durationInSeconds % 60)

            const durationObj = {
                hours,
                minutes,
                seconds
            }

            if (formatado) {
                const formattedDuration = hours > 0 
                    ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` 
                    : `${minutes}:${seconds.toString().padStart(2, '0')}`
                resolve({ ...durationObj, formattedDuration })
            } else {
                resolve(durationObj)
            }

            if (atualizarInputs) {
                const percentProgress = (audioPlayer.currentTime / audioPlayer.duration) * 100
                const inputRangeMusicaPC = document.getElementById('input_range_musica_pc')
                const inputRangeMusicaPCFullscreen = document.getElementById('input_range_musica_pc_fullscreen')
                const input_range_musica_cell = document.getElementById('input_range_musica_cell')
                const traco_barra_musica_cell = document.getElementById('traco_barra_musica_cell')
                
                if(!audio_player.paused) {
                    if(Device.Tipo != 'Mobile') {
                        if (fullscreen_aberta) {
                            inputRangeMusicaPCFullscreen.value = percentProgress
                            atualizar_cor_progresso_input(inputRangeMusicaPCFullscreen)
                        } else {
                            inputRangeMusicaPC.value = percentProgress
                            atualizar_cor_progresso_input(inputRangeMusicaPC)
                        }

                    } else {
                        traco_barra_musica_cell.style.width = `${percentProgress}%`
                        input_range_musica_cell.value = percentProgress
                        atualizar_cor_progresso_input(input_range_musica_cell)
                    }
                }
            }
        }

        if (tipo === 'currentTime') {
            if (!audioPlayer.paused || audioPlayer.currentTime > 0) {
                processTime()
            } else {
                audioPlayer.removeEventListener('play', processTime, { once: true })
                audioPlayer.addEventListener('play', processTime, { once: true })
                audioPlayer.play().then(() => {
                    audioPlayer.pause()
                }).catch(reject)
            }
        } else {
            if (audioPlayer.duration) {
                processTime()
            } else {
                audioPlayer.removeEventListener('loadedmetadata', processTime, { once: true })
                audioPlayer.addEventListener('loadedmetadata', processTime, { once: true })
            }
        }

        // audioPlayer.addEventListener('error', (e) => {
        //     reject(e)
        // })
    })
}

//! Vai calcular quanto tempo falta até a data e retornar de forma formatada
function calcularTempoRestante(data) {
    const [dia, mes, ano] = data.split('/').map(Number);
    const dataFutura = new Date(ano, mes - 1, dia);
    const dataAtual = new Date();

    if (dataFutura < dataAtual) {
        return 'A data já passou!';
    }

    let anos = dataFutura.getFullYear() - dataAtual.getFullYear();
    let meses = dataFutura.getMonth() - dataAtual.getMonth();
    let dias = dataFutura.getDate() - dataAtual.getDate();

    if (dias < 0) {
        meses--;
        dias += new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).getDate();
    } else if (meses < 0) {
        anos--;
        meses += 12;
    }

    let texto_ano = ''
    let texto_meses = ''
    let texto_dias = ''
    if (anos == 1) {
        texto_ano = `${anos} ano`
    } else if (anos > 1) {
        texto_ano = `${anos} anos`
    }
    
    if (meses == 1) {
        texto_meses = `${meses} mes`
    } else if (meses > 1) {
        texto_meses = `${meses} meses`
    }
    
    if (dias == 1) {
        texto_dias = `${dias} dia`
    } else if (dias > 1) {
        texto_dias = `${dias} dias`
    }

    let resultado = ''
    if (anos > 0) {
        resultado += texto_ano
    }

    if (meses > 0 && resultado != '' && dias > 0) {
        resultado += `, ` + texto_meses
    } else if (dias <= 0 && resultado != '' && meses > 0) {
        resultado += ' e ' + texto_meses
    } else if (meses > 0 && resultado == '') {
        resultado += texto_meses
    }

    if (dias > 0 && resultado != '') {
        resultado += ` e ` + texto_dias
    } else if (dias > 0 && resultado == '') {
        resultado += texto_dias
    }

    return resultado
}

//! Gera ids aleátorios
function gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

//! Identifica se é um email
function validarEmail(email) {
    // Expressão regular para validar e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

//! Pausar Despausar
function togglePlayPause() {
    if(audio_player.paused) {
      Play()
    } else {
      Pausar()
    }
}

//! Diminuir Volume
function diminuirVolume() {
    let volume = Volume_Atual
    if(audio_player.volume > 0) {
        volume--

        Volume(volume, input_volume_pc)
        Volume(volume, input_volume_pc_fullscreen)
    }
}

//! Aumentar o Volume
function aumentarVolume() {
    let volume = Volume_Atual
    if(audio_player.volume < 1) {
        volume++

        Volume(volume, input_volume_pc)
        Volume(volume, input_volume_pc_fullscreen)
    }
}

//! Adiciona cores as notificações

function substituirTexto_cor(text) {
    const regex = /\*([a-zA-Z]+)\*([^*]+?)\*\1\*/g
    return text.replace(regex, (match, color, content) => {
        return `<strong style="color: ${color}">${content}</strong>`
    })
}

function substituirCor_cor(text){
    const regex = /\*#([a-fA-F0-9]{6})\*([^*]+?)\*#\1\*/g
    return text.replace(regex, (match, color, content) => {
        return `<strong style="color: #${color}">${content}</strong>`
    })
}

//! Retorna primeiro nome
function retornar_primeiro_nome(fullName) {
    return fullName.split(' ')[0]
}

//! Remover músicas duplicadas pelo id
function removeDuplicatesById(arr1, arr2) {
    let new_array = []
    for (let a = 0; a < arr1.length; a++) {
        let ja_tem = false

        for (let b = 0; b < arr2.length; b++) {
            if(arr1[a].ID == arr2[b].ID) {
                ja_tem = true
                break
            }
        }

        if(!ja_tem) {
            new_array.push(arr1[a])
        }
    }

    return new_array
}

function removeDuplicatesPeloID(array) {
    // Usando um objeto para manter o controle dos IDs únicos
    const uniqueIds = {}
    
    // Filtrando o array, mantendo apenas os objetos com IDs únicos
    const uniqueArray = array.filter(item => {
      if (!uniqueIds[item.ID]) {
        uniqueIds[item.ID] = true
        return true
      }
      return false
    })
  
    return uniqueArray
}

//! Retorna o que não se repete
function elementosUnicos(array1, array2) {
    const combinados = [...array1, ...array2]
    const unicos = combinados.filter(item => 
      combinados.indexOf(item) === combinados.lastIndexOf(item)
    )
    return unicos
}

//! Checa se é um URL valida
function isValidURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocolo
      '(([a-zA-Z0-9$_.+!*\'(),;:&=]|%[0-9a-fA-F]{2})+@)?' + // usuário e senha
      '(([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})|' + // domínio
      '(\\d{1,3}\\.){3}\\d{1,3})' + // IP (v4)
      '(:\\d+)?' + // porta
      '(\\/[-a-zA-Z0-9$_.+!*\'(),;:@&=]*)*' + // caminho
      '(\\?[;&a-zA-Z0-9$_.+!*\'(),;:@&=-]*)?' + // query
      '(#[-a-zA-Z0-9$_.+!*\'(),;:@&=]*)?$', 'i') // fragmento
  
    return pattern.test(str)
}

//! Avisos Rapidos
let Todos_Avisos_Rapidos = []
let aviso_rapido_ativado = false
function Avisos_Rapidos(Aviso) {
    Todos_Avisos_Rapidos.push(Aviso)
    
    function Avisar(Aviso_Atual) {
        aviso_rapido_ativado = true
        const avisos_rapidos = document.getElementById('avisos_rapidos')
        avisos_rapidos.innerHTML = ''
        const p = document.createElement('p')
    
        p.innerText = Aviso_Atual
        avisos_rapidos.appendChild(p)
    
        avisos_rapidos.classList.add('show')
    
        setTimeout(() => {
            avisos_rapidos.classList.remove('show')
            Todos_Avisos_Rapidos.splice(0, 1)

            setTimeout(() => {
                if(Todos_Avisos_Rapidos.length > 0) {
                    Avisar(Todos_Avisos_Rapidos[0])
                } else {
                    aviso_rapido_ativado = false
                }
            }, 600)
        }, 2000)
        

    } 
    
    if(!aviso_rapido_ativado) {
        Avisar(Todos_Avisos_Rapidos[0])
    }
}

//! Lima a url tirando a parte informada
function limparURL(parametroParaRemover) {
    const url = window.location.href;
    // Extrair a parte da query da URL
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    // Iterar sobre todos os parâmetros
    for (let param of params.keys()) {
        if (param.startsWith(`${parametroParaRemover}_`)) {
            params.delete(param);
            break;  // Interrompe após o primeiro parâmetro removido
        }
    }

    // Reconstruir a URL sem o parâmetro especificado
    const novaURL = `${urlObj.origin}${urlObj.pathname}?${params.toString()}${urlObj.hash}`;

    // Trocar a URL sem atualizar a página
    history.replaceState(null, '', novaURL);
}

//! Organizar arrays listra por email
function organizarArrayPorEmail(array) {
    // Primeiro, agrupa os objetos por User_Match.ID
    const agrupadosPorUser = array.reduce((acc, obj) => {
      const userID = obj.User_Match.ID
      if (!acc[userID]) {
        acc[userID] = []
      }
      acc[userID].push(obj)
      return acc
    }, {})
  
    // Depois, transforma o objeto em um array de arrays
    const listasPorUser = Object.values(agrupadosPorUser)
  
    // Cria um array para armazenar o resultado final
    const resultado = []
    
    // Usa um loop infinito que só para quando não há mais objetos para distribuir
    while (listasPorUser.some(lista => lista.length > 0)) {
      for (const lista of listasPorUser) {
        if (lista.length > 0) {
          resultado.push(lista.shift())
        }
      }
    }
  
    return resultado
}

//! Compara 2 Objetos
function objetosDiferentes(obj1, obj2) {
    // Convertemos os objetos em strings JSON e comparamos diretamente
    return JSON.stringify(obj1) !== JSON.stringify(obj2)
}

//! Troca os <> por &lt e &gt
function escapeHtml(text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

//! Checa se todas imgs e audios foram carregados
function checkIfAllLoaded() {
    let allImagesLoaded = Array.from(document.images).every(img => img.complete);
    let allAudioLoaded = Array.from(document.querySelectorAll('audio')).every(audio => audio.readyState === 4);
  
    return allImagesLoaded && allAudioLoaded;
}

//! Transforma #642420" em rgb
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return [r, g, b]
}

//! Retorna se a cor é clara de mais
function corEhClara(cor) {
    // Função para converter formato HEX para RGB
    function hexParaRgb(hex) {
        hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });
        const bigint = parseInt(hex.substring(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Função para calcular o brilho da cor
    function calcularBrilho(cor) {
        let r, g, b, a;

        if (cor.startsWith('rgba')) {
            [r, g, b, a] = cor.match(/[\d.]+/g);
        } else if (cor.startsWith('rgb')) {
            [r, g, b] = cor.match(/[\d.]+/g);
            a = 1;
        } else if (cor.startsWith('#')) {
            cor = hexParaRgb(cor);
            [r, g, b] = cor.match(/[\d.]+/g);
            a = 1;
        }

        // Calcula o brilho conforme a fórmula perceptiva
        const brilho = (r * 299 + g * 587 + b * 114) / 1000;
        return brilho;
    }

    // Converte a cor para minúsculas para facilitar a comparação
    cor = cor.toLowerCase();

    // Obtém o brilho da cor
    const brilho = calcularBrilho(cor);

    // Define um limite de brilho para determinar se a cor é clara demais
    const limiteBrilho = 100;

    // Retorna verdadeiro se a cor for clara demais (brilho acima do limite)
    return brilho > limiteBrilho;
}

function limitarTamanhoArray(array, tamanhoMaximo = 10, removerPrimeiros = false) {
    if (array.length > tamanhoMaximo) {
        if (removerPrimeiros) {
            array.splice(0, array.length - tamanhoMaximo) // Remove os primeiros elementos
        } else {
            array.splice(tamanhoMaximo) // Remove os últimos elementos
        }
    }
    return array
}

//! Vai fazer uma transição de volume
function ajustarVolume(audioElement, novoVolume, duracao) {
    return new Promise((resolve, reject) => {
        const passos = 50; // Número de passos para a transição
        const intervalo = duracao / passos; // Intervalo entre cada passo

        // Converte o volume de 0-100 para 0-1
        const volumeFinal = Math.max(0, Math.min(100, novoVolume)) / 100;

        // Calcula o incremento de volume a cada passo
        const volumeAtual = audioElement.volume;
        const incremento = (volumeFinal - volumeAtual) / passos;

        // Cria um intervalo para ajustar gradualmente o volume
        const interval = setInterval(function() {
            try {
                // Atualiza o volume do áudio
                audioElement.volume = Math.max(0, Math.min(1, audioElement.volume + incremento));

                // Verifica se atingiu o novo volume
                if ((incremento > 0 && audioElement.volume >= volumeFinal) || (incremento < 0 && audioElement.volume <= volumeFinal)) {
                    audioElement.volume = volumeFinal;
                    clearInterval(interval); // Para o intervalo
                    return resolve(true)
                }
            } catch (error) {
                console.error('Erro ao ajustar o volume:', error);
                clearInterval(interval); // Para o intervalo em caso de erro
                return reject('Algo deu errado ao tentar ajustar o volume: ' + error)
            }
        }, intervalo);
    })
}

//! Obtem o tamanho usavel da tela do celular
function obterDimensoesTela() {
    let larguraTela = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
    )
    
    let alturaTela = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
    )
    

    if(larguraTela < 700) {
        Device.Tipo = 'Mobile'
    } else {
        Device.Tipo = 'Desktop'
    }

    return { largura: larguraTela, altura: alturaTela }
}

//! Altera transparencia
function alterarTransparencia(cor, transparencia) {
    // Verificar se a cor é HEX
    if (cor.startsWith('#')) {
        if (cor.length === 7) {
            // Converter HEX para RGBA
            const r = parseInt(cor.slice(1, 3), 16)
            const g = parseInt(cor.slice(3, 5), 16)
            const b = parseInt(cor.slice(5, 7), 16)
            return `rgba(${r}, ${g}, ${b}, ${transparencia})`
        } else if (cor.length === 4) {
            // Converter HEX curto (#RGB) para RGBA
            const r = parseInt(cor[1] + cor[1], 16)
            const g = parseInt(cor[2] + cor[2], 16)
            const b = parseInt(cor[3] + cor[3], 16)
            return `rgba(${r}, ${g}, ${b}, ${transparencia})`
        }
    }

    // Verificar se a cor é RGB ou RGBA
    const rgbMatch = cor.match(/^rgb(a?)\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})(?:, ?([01]?\.?\d*))?\)$/)
    if (rgbMatch) {
        const r = parseInt(rgbMatch[2])
        const g = parseInt(rgbMatch[3])
        const b = parseInt(rgbMatch[4])
        return `rgba(${r}, ${g}, ${b}, ${transparencia})`
    }

    throw new Error('Formato de cor inválido')
}

//! Srolla ao Topo
function scrollToTop(element) {
  element.scrollTo({
    top: 0,
    behavior: 'smooth' // ? Isso faz com que o scroll seja suave
  })
}