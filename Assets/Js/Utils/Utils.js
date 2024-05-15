window.addEventListener('resize', () => {
    Mostrar_Max_Musicas()
})

function formatarString(str) {
    // Remove acentos e caracteres especiais
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    // Converte para minúsculas
    str = str.toLowerCase()

    // Remove espaços
    str = str.replace(/\s/g, '')

    return str
}

let Infos_Pagina = {
    Pagina: {
        Nome: '',
        ID: null
    },
    Musica: null
}

function Abrir_Pagina(Pagina) {
    if(Listas_Prox.MusicaAtual.Img) {
        Trocar_Background(Listas_Prox.MusicaAtual.Img, document.body)
    }

    atualizarURL(Pagina)

    const Paginas = document.querySelectorAll('.Paginas')

    Paginas.forEach(Pagina_especifica => {
        if(Pagina_especifica.style.opacity = 1 && Pagina_especifica.id != `Pagina_${Pagina}`) {
            Pagina_especifica.style.opacity = 0

            setTimeout(() => {
                Pagina_especifica.classList.remove('Pagina_Aberta')
                document.getElementById(`Pagina_${Pagina}`).classList.add('Pagina_Aberta')

                setTimeout(() => {
                    document.getElementById(`Pagina_${Pagina}`).style.opacity = 1
                }, 200) 
            }, 500)
        }
    })

    if(Pagina == 'pesquisar') {
        document.getElementById('input_pesquisa').style.display = 'flex'
    } else {
        document.getElementById('input_pesquisa').style.display = 'none'

        if(Pagina == 'home') {
            Mostrar_Max_Musicas()
        } else if(Pagina == 'musicascurtidas') {
            Pagina_Interna.ID = User.ID
            Retornar_Musicas_Curtidas()

            if(musica_curtida_random) {
                const icon_random_musicascurtidas = document.getElementById('icon_random_musicascurtidas')
                icon_random_musicascurtidas.style.cursor = 'pointer'
                var paths = icon_random_musicascurtidas.querySelectorAll('path')
                paths.forEach(function(path) {
                    path.style.fill = 'rgb(0, 255, 213)'
                    path.style.cursor = 'pointer'
                })
            }
        } else if(Pagina == 'notificacao') {
            document.getElementById('bolinha_icone_noficacao').style.display = 'none'
        }
    }

    Pagina_Interna.Nome = Pagina

    if(Infos_Random.Nome == 'musicascaixa') {
        if(musicas_caixa_random) {
            random_barra_musicas.style.cursor = 'pointer'
            var paths = random_barra_musicas.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = 'rgb(0, 255, 213)'
                path.style.cursor = 'pointer'
            })
        }
    }
}

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

function getDataAtual() {
    var data = new Date()
    var dia = data.getDate()
    var mes = data.getMonth() + 1 // Os meses em JavaScript são baseados em zero, então adicionamos 1
    var ano = data.getFullYear()

    // Formata a data para 'dd/mm/aaaa'
    var dataFormatada = (dia < 10 ? '0' : '') + dia + '/' + (mes < 10 ? '0' : '') + mes + '/' + ano

    return dataFormatada
}

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

let comemorar = false
function Notificar_Infos(info, comando) {
    document.getElementById('texto_notificacao_infos').innerText = info
    document.getElementById('container_notificacao_infos').style.display = 'flex'

    if(comando == 'Comemorar') {
        comemorar = true
        Comemorar()
    }
}

function Fechar_Notificacao_Infos() {
    comemorar = false
    Comemorar()
    document.getElementById('container_notificacao_infos').style.display = 'none'
}

function Comemorar() {
    if(comemorar) {
        Confetes()
        setTimeout(() => {
            Comemorar(comemorar)  
        }, 3000)
    }
}

function separarArtistas(stringDeArtistas) {
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

function Nome_Artistas() {
    let TodosArtistas = []
    for (let c = 0; c < TodasMusicas.length; c++) {
        const resultado = separarArtistas(TodasMusicas[c].Autor)

        resultado.forEach(element => {
            TodosArtistas.push(element)
        })
    }

    return TodosArtistas
}

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

function sairDaTelaCheia() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari e Opera */
        document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) { /* Internet Explorer e Edge */
        document.msExitFullscreen()
    }
}

function Retornar_Artistas_Da_Musica(Musica) {
    const p = document.createElement('p')
    p.className = 'p_nomes_artistas'
    let artistas = separarArtistas(Musica.Autor)
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

function posicionarElemento(event, elemento, array_classes) {
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function verificarDataDepois(data1, data2) {
    // Converte as strings de data para objetos Date
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

function organizarPorDataDescendente(array) {
    return array.sort((a, b) => {
        // Converte as datas para objetos Date
        const dataA = new Date(a.Data.split('/').reverse().join('/'));
        const dataB = new Date(b.Data.split('/').reverse().join('/'));
        
        // Compara as datas para ordenar do mais recente para o mais antigo
        return dataB - dataA;
    });
}