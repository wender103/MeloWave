window.addEventListener('resize', () => {
    Mostrar_Max_Musicas()
})

//! Formata a string
function formatarString(str) {
    // Remove acentos e caracteres especiais
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

//! Vai atualizar a URL
function atualizarURL(parametro) {
    // Obtém a URL atual da página
    var url = window.location.href

    // Verifica se a URL já possui o parâmetro 'Page='
    if (url.indexOf('Page=') === -1) {
        // Se não tiver, adiciona o parâmetro à URL
        url += (url.indexOf('?') !== -1 ? '&' : '?') + 'Page=' + parametro
    } else {
        // Se já tiver, substitui o valor do parâmetro na URL
        url = url.replace(/(Page=)[^\&]+/, '$1' + parametro)
    }

    // Atualiza a URL sem recarregar a página
    window.history.pushState({path: url}, '', url)
}

//! Vai pegar a data atual
function getDataAtual(ano, mes, dia) {
    // Obtém a data atual
    let data = new Date();
    
    // Se nenhum valor for passado, retorna a data atual no formato 'dd/mm/aaaa'
    if (!ano && !mes && !dia) {
        return `${formatarNumero(data.getDate())}/${formatarNumero(data.getMonth() + 1)}/${data.getFullYear()}`;
    } else {
        // Se valores forem passados, calcula a nova data somando os valores passados
        if (ano) data.setFullYear(data.getFullYear() + ano);
        if (mes) data.setMonth(data.getMonth() + mes);
        if (dia) data.setDate(data.getDate() + dia);
        
        // Retorna a nova data no formato 'dd/mm/aaaa'
        return `${formatarNumero(data.getDate())}/${formatarNumero(data.getMonth() + 1)}/${data.getFullYear()}`;
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
function Notificar_Infos(info, comando='', Texto_Btn='Sim!') {
    return new Promise((resolve) => {
        const div_notificacao_infos = document.getElementById('div_notificacao_infos')
        const texto_notificacao_infos = document.getElementById('texto_notificacao_infos')
        const btn_confirmar_notificacao_infos = document.getElementById('btn_confirmar_notificacao_infos')
        const btn_fechar_notificacao_infos = document.getElementById('btn_fechar_notificacao_infos')
        const notificacao_infos = document.getElementById('notificacao_infos')

        if(comando.includes('Informação')) {
            notificacao_infos.classList.add('Informacao')
            notificacao_infos.style.maxWidth = '800px'
            div_notificacao_infos.innerHTML = info
            div_notificacao_infos.style.display = 'block'
            texto_notificacao_infos.style.display = 'none'

        } else {
            notificacao_infos.classList.remove('Informacao')
            notificacao_infos.style.maxWidth = '450px'
            texto_notificacao_infos.innerHTML = info
            div_notificacao_infos.style.display = 'none'
            texto_notificacao_infos.style.display = 'block'
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
            resolve(true)  // Resolve a promise com true quando o botão de confirmar for clicado
        })

        btn_fechar_notificacao_infos.addEventListener('click', () => {
            Fechar_Notificacao_Infos(comando)
            resolve(false)  // Resolve a promise com false se o botão de fechar for clicado
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
function entrarEmTelaCheia() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari e Opera */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* Internet Explorer e Edge */
        document.documentElement.msRequestFullscreen();
    }
}

//! Vai sair do modo tela cheia
function sairTelaCheia() {
    
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
function posicionarElemento(event, elemento, array_classes=array_locais_opcoes) {
    elemento.style.display = 'block' // Mostra o elemento

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

//! Detecta imgs pon!@# e | ou violentas

function validateImage(imageUrl) {
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
        console.log(result);
        if (result && result.result && result.result.categories) {
            let safeConfidence = 0;
            const safeCategory = result.result.categories.find(category => category.name.en === 'safe');
            if (safeCategory) {
                safeConfidence = safeCategory.confidence;
            }

            console.log(safeConfidence);

            const unsafeCategories = ['nudity', 'adult', 'unsafe', 'nsfw', 'underwear']
            const containsUnsafeCategory = result.result.categories.some(category => unsafeCategories.includes(category.name.en));
            console.log(containsUnsafeCategory)

            let safe_maior = true
            let nivel_ban1 = false
            let nivel_ban2 = false
            let categorias = result.result.categories
            for (let c = 0; c < categorias.length; c++) {
                if(categorias[c].name.en != 'safe' && categorias[c].confidence > safeConfidence) {
                    safe_maior = false
                }

                for (let a = 0; a < unsafeCategories.length; a++) {
                    if(categorias[c].name.en == unsafeCategories[a] && categorias[c].name.en != 'nsfw') {
                        nivel_ban1 = true
                    }
                    
                    if(categorias[c].name.en == 'nsfw' && categorias[c].confidence > 20) {
                        if(nivel_ban1 || categorias[c].confidence >  50) {
                            nivel_ban2 = true
                        }
                    }
                }
                
            }

            if(nivel_ban2 && !ban_dado) {
                ban_dado = true
                if(User.Estado_Da_Conta.Estado == 'Ativo') {
                    User.Estado_Da_Conta.Estado = 'Aviso 1'

                } else if(User.Estado_Da_Conta.Estado == 'Aviso 1') {
                    User.Estado_Da_Conta.Estado = 'Aviso 2'

                } else if(User.Estado_Da_Conta.Estado == 'Aviso 2') {
                    User.Estado_Da_Conta.Estado = 'Banido 1'
                    User.Estado_Da_Conta.Motivo = 'Sua conta foi banida por postar conteúdo pornográfico ou/e inapropriado. 🚫 Tal comportamento é inaceitável e demonstra total desrespeito pelas regras e pela comunidade. 😠 Reflita sobre suas ações e suas consequências. 😢'
                    User.Estado_Da_Conta.Tempo = getDataAtual(0, 0, 10)

                }  else if(User.Estado_Da_Conta.Estado == 'Banido 1') {
                    User.Estado_Da_Conta.Estado = 'Banido 2'
                    User.Estado_Da_Conta.Motivo = 'Sua conta foi banida por postar conteúdo pornográfico ou/e inapropriado. 🚫 Tal comportamento é inaceitável e demonstra total desrespeito pelas regras e pela comunidade. 😠 Reflita sobre suas ações e suas consequências. 😢'
                    User.Estado_Da_Conta.Tempo = getDataAtual(0, 0, 10)

                }   else if(User.Estado_Da_Conta.Estado == 'Banido 2') {
                    User.Estado_Da_Conta.Estado = 'Banido 2'
                    User.Estado_Da_Conta.Motivo = 'Sua conta foi banida por postar conteúdo pornográfico ou/e inapropriado. 🚫 Tal comportamento é inaceitável e demonstra total desrespeito pelas regras e pela comunidade. 😠 Reflita sobre suas ações e suas consequências. 😢'
                    User.Estado_Da_Conta.Tempo = 'Permanente'
                }

                db.collection('Users').doc(User.ID).update({ Estado_Da_Conta: User.Estado_Da_Conta })

                try {
                    Carregar_Banimento()
                } catch{}
            }
            
            if (safeConfidence > 0 && safe_maior) {
                return { 
                    isValid: true, 
                    message: 'Imagem aprovada!🥳', 
                    emojis: 'Emojis:🎉,🎊,🥳,🎂,🎆,🍾,🥂,🏆,🏅,🎇' 
                };
            } else {
                if(nivel_ban2) {
                    return { 
                        isValid: false, 
                        message: ' ⚠️ Sua conta está sob aviso 🚨 por utilizar uma imagem inadequada. 🖼️ Se continuar assim, sua conta pode acabar sendo banida! 🚫 Por favor, ajuste o conteúdo conforme as diretrizes para evitar problemas futuros. 🙏', 
                        emojis: 'Emojis:🚫, ❌, ⛔, 🔒, 🙅, 🚷, 🛑, 🔞, 🔐, 👋', 
                        action: 'Entendi' 
                    }
                } else {
                    return { 
                        isValid: false, 
                        message: 'Imagem inadequada!🚫🔞 Por favor, escolha outra.⛔', 
                        emojis: 'Emojis:🚫, ❌, ⛔, 🔒, 🙅, 🚷, 🛑, 🔞, 🔐, 👋', 
                        action: 'Entendi' 
                    };
                }
            }
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

