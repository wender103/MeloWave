let TodasMusicas = []
let Audio_Mutado = false

let Listas_Prox = {
    Nome_Album: '',
    MusicaAtual: {},
    Lista_Musicas: [],
    Indice: undefined,
    A_Seguir: [],
}

function Quantas_musicas() {
    const Paginas = document.querySelectorAll('.Paginas')

    let pag_encontrada = false
    let qtns_musicas = 0
    Paginas.forEach(element => {
        if(!pag_encontrada && element.offsetWidth > 0) {
            pag_encontrada = true
            qtns_musicas = Math.floor(element.offsetWidth / 170)
        }
    })
    
    return qtns_musicas
}

//! Vai mostrar na tela apenas a quantidade de música que caiba no enquadro
function Mostrar_Max_Musicas() {
    const max_musicas = Quantas_musicas()
    document.querySelectorAll('.Container_Musicas_Caixa').forEach(container => {
        container = container.querySelector('article')

        if(container.querySelectorAll('.musica_caixa')){

            const musicas = container.querySelectorAll('.musica_caixa')  
    
            if(musicas.length > max_musicas && max_musicas > 4) {
                container.style.justifyContent = 'space-around'
            } else {
                container.style.justifyContent = 'start'
            }
            
            for (let c = 0; c < musicas.length; c++) {
                if(c >= max_musicas) {
                    musicas[c].style.display = 'none'
                } else {
                    musicas[c].style.display = 'flex'
                }   
            }
        } 
    })

    document.querySelectorAll('.Container_Autor_Caixa').forEach(container => {
        container = container.querySelector('article')
        
        if(container.querySelectorAll('.artista_caixa')  ) { 
            const artista = container.querySelectorAll('.artista_caixa')  

            if(artista.length > max_musicas && max_musicas > 4) {
                container.style.justifyContent = 'space-around'
            } else {
                container.style.justifyContent = 'start'
            }
            
            for (let c = 0; c < artista.length; c++) {
                if(c >= max_musicas) {
                    artista[c].style.display = 'none'
                } else {
                    artista[c].style.display = 'flex'
                }   
            }
        }
    })
} Mostrar_Max_Musicas()

let Execultar_Funcoes_Ao_Carregar_execultado = false
function Pegar_Todas_Musicas() {
    TodasMusicas = []

    db.collection('Musicas').get().then((snapshot) => {
        snapshot.docs.forEach(Musicas => {
            let AllMusics = Musicas.data().Musicas

            for (let c = 0; c < AllMusics.length; c++) {
                if(AllMusics[c].Estado != 'Pendente') {
                    TodasMusicas.push(AllMusics[c])
                }
            }
        })

        Execultar_Funcoes_Ao_Carregar()
    })
} Pegar_Todas_Musicas()

//! --------------------------------- Tocar Musica -------------------------------
const audio_player = document.getElementById('audio_player')

//? Controlar inputs
let cor_input_agora = '#fff'
function atualizar_cor_progresso_input(inputElement) {
    var value = (inputElement.value-inputElement.min)/(inputElement.max-inputElement.min)*100;
    inputElement.style.background = `linear-gradient(to right, ${cor_input_agora} 0%, ${cor_input_agora} ${value}%, #4d4d4d52 ${value}%, #4d4d4d52 100%)`
}

let feito_musica_tocar = false
let Tocando_Musica_A_Seguir = false
let tmp_ouvindo_musica = 0
const img_btn_mic_letra = document.querySelectorAll('.img_btn_mic_letra')

function Tocar_Musica(Lista, MusicaAtual, Comando='', IDPagina, Qm_Chamou) {
    if(Comando == null || Comando == undefined) {
        Comando = ''
    }

    if(Listas_Prox.MusicaAtual != MusicaAtual) {
        Repetir_Musica(false)
        tmp_ouvindo_musica = 0
    }

    Listas_Prox.MusicaAtual = MusicaAtual
    Listas_Prox.Lista_Musicas = Lista
    if(Listas_Prox.Indice == undefined) {
        for (let c = 0; c < Lista.length; c++) {
            if(Lista[c].ID == MusicaAtual.ID) {
                Listas_Prox.Indice = c
                break
            }
        }
    }

    audio_player.src = MusicaAtual.Audio
    Play()
    document.title = `${MusicaAtual.Nome} - ${MusicaAtual.Autor}`

    //! Vai trocar o background apenas se não for as páginas bloqueadas
    let pagina_igual = false
    for (let c = 0; c < Paginas_Nao_Trocar_Background.length; c++) {
        if(Paginas_Nao_Trocar_Background[c] == Pagina_Atual.Nome) {
            pagina_igual = true
            break
        }
    }

    if(!Array.isArray(MusicaAtual.Letra)) {
        pre_letra_da_musica.innerHTML = MusicaAtual.Letra.Lerta_Musica
        letra_pre_ver_letra = pre_letra_da_musica.innerText.split('\n')
        linha_atual = -1
        Destacar_linhas()
    }

    //! Vai remover o icone do mic caso a música não tenha letra
    img_btn_mic_letra.forEach(element => {
        if(!Array.isArray(MusicaAtual.Letra)) {
            element.style.display = 'block'

        } else if(!pd_atualizar_letra_pc) {
            element.style.display = 'none'
        }
    })
    
    if(!Comando.includes('Não Ativar Música')) {
        Ativar_Musica(MusicaAtual)

        if(!pagina_igual) {
            Trocar_Background(MusicaAtual.Img, document.body)
        }
    }

    if(fullscreen_aberta) {
        Atualizar_Fullscreen()
    }
    
    if(Comando != 'Não Atualizar') {
        Atualizar_Fila()
    }

    //! Checar se a música é uma curtida ou não
    Checar_Musica_Atual_Is_Curtida()

    //! Vai adicionar a música na parte de música ouvidas do artista
    let user_artistas_seguindo = User.Social.Artistas
    let ja_tem_a_musica = false
    for (let c = 0; c < user_artistas_seguindo.length; c++) {
        if(MusicaAtual.Autor.includes(user_artistas_seguindo[c].Autor) && !ja_tem_a_musica) {           
            for (let a = 0; a < user_artistas_seguindo[c].Musicas_Ouvidas.length; a++) {
                if(user_artistas_seguindo[c].Musicas_Ouvidas[a].ID == MusicaAtual.ID) {
                    ja_tem_a_musica = true
                    break
                }
            }
        } else {
            break
        }
    }

    if(!ja_tem_a_musica) {
        for (let c = 0; c < user_artistas_seguindo.length; c++) {
            if(MusicaAtual.Autor.includes(user_artistas_seguindo[c].Autor)) {  
                user_artistas_seguindo[c].Musicas_Ouvidas.push(MusicaAtual.ID)
                Salvar_Musicas_Ouvidas_Artista_Seguindo(user_artistas_seguindo)
                break
            }
        }
    }

    //! Historico Salvar -------------------
    User.Historico.Musicas.push(MusicaAtual)
    User.Historico.Artistas.push(...Separar_Por_Virgula(MusicaAtual.Autor))

    Salvar_Historico()

    //! ---------------- Navegador ----------------------------------
    navigator.mediaSession.metadata = new MediaMetadata({
        title: MusicaAtual.Nome,
        artist: MusicaAtual.Autor,
        album: '...',
        artwork: [
            { 
                src: MusicaAtual.Img, 
                sizes: '300x300', 
                type: 'image/png', 
                purpose: 'cover', 
                style: 'object-fit: cover'
            }
        ]
    })

    // Manipulador para avançar para a próxima faixa de áudio
    navigator.mediaSession.setActionHandler('nexttrack', function() {
        if(!Comando.includes('Pausar Ao Finalizar')) {
            RepetirMusica = false
            Proxima_Musica()
        }
    })

    // Manipulador para retroceder para a faixa de áudio anterior
    navigator.mediaSession.setActionHandler('previoustrack', function() {
        if(!Comando.includes('Pausar Ao Finalizar')) {
            Musica_Anterior()
        }
    })

    // Manipulador para avançar a reprodução em 10 segundos
    navigator.mediaSession.setActionHandler('seekforward', function() {
        if(!Comando.includes('Pausar Ao Finalizar')) {
            audio_player.currentTime += 10 // Avança 10 segundos
        }
    })

    // Manipulador para retroceder a reprodução em 10 segundos
    navigator.mediaSession.setActionHandler('seekbackward', function() {
        if(!Comando.includes('Pausar Ao Finalizar')) {
            audio_player.currentTime -= 10 // Retrocede 10 segundos
        }
    })

    // Manipulador para iniciar a reprodução da mídia
    navigator.mediaSession.setActionHandler('play', function() {
        Play() // Inicia a reprodução do áudio
    })

    // Manipulador para pausar a reprodução da mídia
    navigator.mediaSession.setActionHandler('pause', function() {
        Pausar() // Pausa a reprodução do áudio
    })

    // Manipulador para parar a reprodução da mídia e reiniciar para o início
    navigator.mediaSession.setActionHandler('stop', function() {
        if(!Comando.includes('Pausar Ao Finalizar')) {
            Pausar() // Pausa a reprodução do áudio
            audio_player.currentTime = 0 // Reinicia a reprodução para o início
        }
    })

    // Manipulador para alterar a posição de reprodução para um tempo específico
    navigator.mediaSession.setActionHandler('seekto', function(details) {
        if(!Comando.includes('Pausar Ao Finalizar')) {
            if (details.fastSeek && 'seekable' in audio_player) {
                audio_player.currentTime = details.seekTime // Altera a posição de reprodução para o tempo especificado
            }
        }
    })

    //! ---------------- Fim Navegador ----------------------------------

    //! ---------------- Audio ------------------------------------------
    audio_player.removeEventListener('timeupdate', updateTime)
    audio_player.addEventListener('timeupdate', updateTime)

    //? Vai atualizar a barra de progresso da música
    let input_range_musica_pc = document.getElementById('input_range_musica_pc') //? Progresso barra para pc
    let input_range_musica_pc_fullscreen = document.getElementById('input_range_musica_pc_fullscreen') //? Progresso barra para pc

    // Função para exibir o tempo atual em segundos enquanto o áudio está tocando
    let adicionar_view_musica = false
    function updateTime() {
        let feito = false
        if(!feito) {
            feito = true

            const percentProgress = (audio_player.currentTime / audio_player.duration) * 100
            input_range_musica_pc.value = percentProgress
            atualizar_cor_progresso_input(input_range_musica_pc)
    
            input_range_musica_pc_fullscreen.value = percentProgress
            atualizar_cor_progresso_input(input_range_musica_pc_fullscreen)
    
            const currentTimeInSeconds = Math.floor(audio_player.currentTime);
            const minutes = Math.floor(currentTimeInSeconds / 60)
            const seconds = Math.floor(currentTimeInSeconds % 60)
            const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`
            document.getElementById('contador_segundos_musica').innerText = formattedDuration
            document.getElementById('contador_segundos_musica_fullscreen').innerText = formattedDuration
    
            tmp_ouvindo_musica += 1
    
            //! Vai adicionar a view a música
            if(!adicionar_view_musica && tmp_ouvindo_musica > 80) {
                console.log(currentTimeInSeconds)
                console.log('View adicionada')
                adicionar_view_musica = true
    
                // Adicionar_View_Musica(MusicaAtual)
            }

            //! Vai atualizar a letra
            Atualizar_Letra_PC()
        }
    }

    audio_player.removeEventListener('loadedmetadata', carregar_metadados_audio)
    audio_player.addEventListener('loadedmetadata', carregar_metadados_audio)

    function carregar_metadados_audio() {
        let feito = false
        if(!feito) {
            feito = true

            const durationInSeconds = audio_player.duration;
            const minutes = Math.floor(durationInSeconds / 60)
            const seconds = Math.floor(durationInSeconds % 60)
            const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`
            document.getElementById('tempo_max_musica').innerText = formattedDuration
            document.getElementById('tempo_max_musica_fullscreen').innerText = formattedDuration
        }
    }

    audio_player.removeEventListener('ended', fim_audio)
    audio_player.addEventListener('ended', fim_audio)
    
    function fim_audio() {
        if(!Comando.includes('Pausar Ao Finalizar')) {
            if(!feito_musica_tocar) {
                feito_musica_tocar = true
                Proxima_Musica('fim_do_audio')
                //! Resolver ---------------------------------------------------------------------------------------------------------
                //* Está repetindo a chamada
            }
        }
    }

    setTimeout(() => {
        feito_musica_tocar = false
    }, 1000)

    //! ---------------- Fim Audio ----------------------------------

    let debounceTimeout1
    input_range_musica_pc.addEventListener('input', function() {
        const newTime = (input_range_musica_pc.value / 100) * audio_player.duration
        audio_player.currentTime = newTime
        atualizar_cor_progresso_input(input_range_musica_pc)

        audio_player.currentTime = newTime
        atualizar_cor_progresso_input(input_range_musica_pc_fullscreen)

        clearTimeout(debounceTimeout1)
        debounceTimeout1 = setTimeout(function() {
            Atualizar_Linha_Letra_Input()
        }, 300)
    })

    let debounceTimeout2
    input_range_musica_pc_fullscreen.addEventListener('input', function() {
        const newTime = (input_range_musica_pc_fullscreen.value / 100) * audio_player.duration
        audio_player.currentTime = newTime
        atualizar_cor_progresso_input(input_range_musica_pc_fullscreen)

        audio_player.currentTime = newTime
        atualizar_cor_progresso_input(input_range_musica_pc)

        clearTimeout(debounceTimeout2)
        debounceTimeout2 = setTimeout(function() {
            Atualizar_Linha_Letra_Input()
        }, 300)
    })
}

//! --------------------------------- Fim Tocar Musica -------------------------------

function Ativar_Musica(Musica) {
    const nav = document.querySelector('nav')
    nav.classList.add('Musica_On')

    const main = document.querySelector('main')
    main.classList.add('Musica_On')

    main.style.transition = '500ms height ease-in-out'
    nav.style.transition = '500ms height ease-in-out'
    nav.style.height = 'calc(100vh - 112px)'
    main.style.height = 'calc(100vh - 112px)'
    
    const container_barra_musica = document.querySelector('#container_barra_musica')
    container_barra_musica.style.bottom = '8px'

    setTimeout(() => {
        main.classList.remove('Musica_On')
        nav.classList.remove('Musica_On')
    }, 1000)

    document.getElementById('nome_musica_barra_musica').innerText = Musica.Nome
    const autor_musica_barra_musica = document.getElementById('autor_musica_barra_musica')
    autor_musica_barra_musica.innerHTML = ''
    autor_musica_barra_musica.appendChild(Retornar_Artistas_Da_Musica(Musica))
    document.getElementById('img_musica_barra_musica').src = Musica.Img
}

function Desativar_Musica() {
    Pausar()
    Fehcar_Fila()
    const nav = document.querySelector('nav')
    nav.classList.add('Musica_On')

    const main = document.querySelector('main')
    main.classList.add('Musica_On')

    const container_barra_musica = document.querySelector('#container_barra_musica')
    container_barra_musica.style.bottom = '-300px'

    main.style.transition = '500ms height ease-in-out'
    nav.style.transition = '500ms height ease-in-out'

    nav.style.height = 'calc(100vh - 16px)'
    main.style.height = 'calc(100vh - 16px)'

    setTimeout(() => {
        main.classList.remove('Musica_On')
        nav.classList.remove('Musica_On')
    }, 1000)
}

//! -------------------------------- Funções do audio --------------------------------
const icone_play_pc = document.querySelectorAll('.icone_play_pc')

icone_play_pc.forEach(element => {
    element.addEventListener('click', () => {
        if (audio_player.paused) {
            Play()
    
        } else {
            Pausar()
        }
    })  
})

function Pausar() {
    icone_play_pc.forEach(element => {
        element.src = 'Assets/Imgs/play_pc.svg'
    })
    audio_player.pause()

    document.title = 'MeloWave - Home'
}

function Play() {
    icone_play_pc.forEach(element => {
        element.src = 'Assets/Imgs/Pause.svg'
    })
    audio_player.play()

    document.title = `${Listas_Prox.MusicaAtual.Nome} - ${Listas_Prox.MusicaAtual.Autor}`
}

let prox_ativo = false
function Proxima_Musica(Chamado_Por) {
    console.log('Poroxjaiasdf');
    if(!prox_ativo && !repetir_musicas || !prox_ativo && Chamado_Por != 'fim_do_audio') {
        prox_ativo = true

        audio_player.currentTime = 0

        if(Listas_Prox.A_Seguir.length <= 0) {
            if(Tocando_Musica_A_Seguir) {
                Tocando_Musica_A_Seguir = false

                if(Listas_Prox.Indice >= Listas_Prox.Lista_Musicas.length - 1) {
                    Listas_Prox.Indice = 0
                    
                } else {
                    Listas_Prox.Indice = Listas_Prox.Indice + 1
                }

                Listas_Prox.MusicaAtual = Listas_Prox.Lista_Musicas[Listas_Prox.Indice]

            } else {

                for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
                    if(Listas_Prox.Lista_Musicas[c].ID == Listas_Prox.MusicaAtual.ID) {
            
                        if(c >= Listas_Prox.Lista_Musicas.length - 1) {
                            Listas_Prox.MusicaAtual = Listas_Prox.Lista_Musicas[0]
            
                        } else {
                            Listas_Prox.Indice = c + 1
                            Listas_Prox.MusicaAtual = Listas_Prox.Lista_Musicas[c + 1]
                        }
                        break
                    }
                }
            }
            
            Tocar_Musica(Listas_Prox.Lista_Musicas, Listas_Prox.MusicaAtual)
            Atualizar_Fila()

        } else {
            Tocando_Musica_A_Seguir = true
            Listas_Prox.MusicaAtual = Listas_Prox.A_Seguir[0]

            setTimeout(() => {
                document.getElementById('img_tocando_agora_fila').src = Listas_Prox.MusicaAtual.Img
                document.getElementById('nome_tocando_agora_fila').innerText = Listas_Prox.MusicaAtual.Nome
                document.getElementById('autor_tocando_agora_fila').appendChild(Retornar_Artistas_Da_Musica(Listas_Prox.MusicaAtual))
            }, 500)

            Remover_Da_Fila('Fila a Seguir', Listas_Prox.MusicaAtual.ID)
            Tocar_Musica(Listas_Prox.Lista_Musicas, Listas_Prox.MusicaAtual, 'Não Atualizar')
        }

        setTimeout(() => {
            prox_ativo = false
        }, 1000)

    } else if(repetir_musicas) {
        audio_player.currentTime = 0
        feito_musica_tocar = false
        Play()
    }
}

function Musica_Anterior() {
    audio_player.currentTime = 0
    let feito = false
    if(Tocando_Musica_A_Seguir) {
        Tocando_Musica_A_Seguir = false
        Listas_Prox.MusicaAtual = Listas_Prox.Lista_Musicas[Listas_Prox.Indice]
        Tocar_Musica(Listas_Prox.Lista_Musicas, Listas_Prox.MusicaAtual)

    } else {

        for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
            if(Listas_Prox.Lista_Musicas[c].ID == Listas_Prox.MusicaAtual.ID && !feito) {
                feito = true
    
                if(c == 0) {
                    Listas_Prox.MusicaAtual = Listas_Prox.Lista_Musicas[Listas_Prox.Lista_Musicas.length - 1]
    
                } else {
                    Listas_Prox.MusicaAtual = Listas_Prox.Lista_Musicas[c - 1]
                }
    
                Tocar_Musica(Listas_Prox.Lista_Musicas, Listas_Prox.MusicaAtual)
            }
        }
    }
}

//! -------------------------------- Fim Funções do audio --------------------------------


//! -------------------------------- Som - Volume ------------------------------------

const input_volume_pc = document.getElementById("input_volume_pc")
const input_volume_pc_fullscreen = document.getElementById("input_volume_pc_fullscreen")
let Volume_Atual = 0
const icone_som_pc = document.querySelectorAll('.icone_som_pc')


//? Vai alterar o volume para o ultimo salvo
const ultimoVolumeSalvo = localStorage.getItem('Volume_Melo_Wave')
if(ultimoVolumeSalvo) {
    Volume_Atual = parseInt(ultimoVolumeSalvo)
    input_volume_pc.value = parseInt(ultimoVolumeSalvo)
    Volume(parseInt(ultimoVolumeSalvo), input_volume_pc)
    input_volume_pc_fullscreen.value = parseInt(ultimoVolumeSalvo)
    atualizar_cor_progresso_input(input_volume_pc)
    atualizar_cor_progresso_input(input_volume_pc_fullscreen)
}

input_volume_pc.onmouseenter = function() {
    // cor_input_agora = 'rgb(0, 255, 255)'
    atualizar_cor_progresso_input(this)
}

input_volume_pc.oninput = function() {
    // cor_input_agora = 'rgb(0, 255, 255)'
    Volume(this.value, input_volume_pc_fullscreen)
    atualizar_cor_progresso_input(this)
}

// Evento quando o mouse sai do input
input_volume_pc.onmouseleave = function() {
    cor_input_agora = '#fff'
    atualizar_cor_progresso_input(this)
}

function Volume(volume = 0, input = undefined) {
    let volume_porcentagem = volume / 100
    //? Vai mudar o volume de acordo com o input
    audio_player.volume = volume_porcentagem

    if(input) {
        input.value = parseInt(volume)
        atualizar_cor_progresso_input(input)
    }

    if(volume > 0) {
        Audio_Mutado = false
    } 
    
    let img_icone_som
    if(volume > 0 && volume < 50) {
        img_icone_som = 'Assets/Imgs/Som1.svg'

    } else if(volume > 50 && volume < 99) {
        img_icone_som = 'Assets/Imgs/Som2.svg'

    } else if(volume > 99) {
        img_icone_som = 'Assets/Imgs/Som3.svg'
    } else {
        img_icone_som = 'Assets/Imgs/Som.svg'
    }

    icone_som_pc.forEach(element => {
        element.src = img_icone_som
    })

    //? Vai salvar o volume do local Storage
    localStorage.setItem('Volume_Melo_Wave', volume)
    atualizar_cor_progresso_input(input_volume_pc)
}

//! -------------------------------- Fim Som - Volume --------------------------------

function Trocar_Background(background, Local) {
    Local.style.transition = 'background 1s ease-in-out'
    Local.style.backgroundImage = `url('${background}')`
}

function Pegar_Musicas(pesquisa, tipo) {
    let musicas_array = []
    if(tipo == 'Artista') {
        let pesquisa_formatada = formatarString(pesquisa)

        for (let c = 0; c < TodasMusicas.length; c++) {
            let autor_formatado = formatarString(TodasMusicas[c].Autor)
            if(autor_formatado.includes(pesquisa_formatada) || pesquisa_formatada.includes(autor_formatado)) {
                musicas_array.push(TodasMusicas[c])
            }
        }
    }

    return musicas_array
}

function inverterArrayDeMusicas(arrayDeMusicas) {
    // Usando o método reverse() para inverter o array
    let new_array = [...arrayDeMusicas]
    return new_array.reverse()
}

let Array_Musica_Linha = []
function Retornar_Musica_Linha(Musicas_Recebidas, Local, Comando=null, Qm_Chamou = '') {
    Array_Musica_Linha = []
    Local.innerHTML = ''

    let soma_ouvintes = 0
    let Musicas = inverterArrayDeMusicas(Musicas_Recebidas)

    if(Comando == 'Não Inverter') {
        Musicas = Musicas_Recebidas
    }

    for (let c = 0; c < Musicas.length; c++) {
        if(Musicas[c].Estado == 'Ativo') {
            Array_Musica_Linha.push(Musicas[c])
            soma_ouvintes += parseInt(Musicas[c].Views)
    
            const musica_linha = document.createElement('div')
            const primeira_parte_musica_linha = document.createElement('div')
            const img = document.createElement('img')
            const p_contador = document.createElement('p')
            const texto_musica_linha = document.createElement('div')
            const p = document.createElement('p')
            const span = document.createElement('span')
            const views = document.createElement('p')
            const segunda_parte_musica_linha = document.createElement('div')
            const like = document.createElement('img')
            const tempo = document.createElement('p')
            const btn_letra_editar = document.createElement('button')
            const img_mic_editar = document.createElement('img')
            const btn_editar_musica = document.createElement('button')
            const img_pen = document.createElement('img')
            const btn_trash = document.createElement('button')
            const img_trash = document.createElement('img')
    
            //! Classes
            musica_linha.classList.add('musica_linha')
            musica_linha.classList.add('Musica_Linha_' + Musicas[c].ID)
            primeira_parte_musica_linha.className = 'primeira_parte_musica_linha'
            texto_musica_linha.className = 'texto_musica_linha'
            segunda_parte_musica_linha.className = 'segunda_parte_musica_linha'
            img.className = 'Img_musica_linha'
            p.className = 'Nome_musica_linha'
            p_contador.className = 'p_contador_musica_curtida'
            like.className = 'like_musicas_linha'
            views.className = 'Views_Musica_Linha'
            span.className = 'Autor_Musica_Linha'
            btn_letra_editar.className = 'btn_letra_editar'
            img_mic_editar.className = 'img_mic_editar'
            btn_editar_musica.className = 'btn_editar_musica'
            img_pen.className = 'img_pen'
            btn_trash.className = 'btn_trash'
            img_trash.className = 'img_trash'
    
            //! Valores
            img.src = Musicas[c].Img
            p.innerText = Musicas[c].Nome
            span.appendChild(Retornar_Artistas_Da_Musica(Musicas[c]))
            p_contador.innerText = c + 1
            img_pen.src = 'Assets/Imgs/pen.png'
            img_trash.src = 'Assets/Imgs/trash-bin.png'
            img_mic_editar.src = 'Assets/Imgs/Mic.svg'
    
            if(Musicas[c].Views < 10) {
                views.innerText = `0${Musicas[c].Views}`
    
            } else {
                views.innerText = Musicas[c].Views
            }
    
            Curtir_Musica_Descurtir(Musicas[c], like, 'Checar')
    
            const audio = new Audio(Musicas[c].Audio)
    
            audio.addEventListener('loadedmetadata', function() {
                const durationInSeconds = audio.duration;
                const minutes = Math.floor(durationInSeconds / 60)
                const seconds = Math.floor(durationInSeconds % 60)
                const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`
                tempo.innerText = formattedDuration
            })
    
    
            //! AppendChild
            primeira_parte_musica_linha.appendChild(p_contador)
            primeira_parte_musica_linha.appendChild(img)
            texto_musica_linha.appendChild(p)
            texto_musica_linha.appendChild(span)
            primeira_parte_musica_linha.appendChild(texto_musica_linha)
    
            btn_letra_editar.appendChild(img_mic_editar)
            btn_trash.appendChild(img_trash)
            btn_editar_musica.appendChild(img_pen)
    
            if(Comando == 'Editar') {
                if(!Array.isArray(Musicas[c].Letra)) {
                    segunda_parte_musica_linha.appendChild(btn_letra_editar)
                }
    
                segunda_parte_musica_linha.appendChild(btn_editar_musica)
                segunda_parte_musica_linha.appendChild(btn_trash)
    
            } else {
                segunda_parte_musica_linha.appendChild(like)
                segunda_parte_musica_linha.appendChild(tempo)
            }
    
            musica_linha.appendChild(primeira_parte_musica_linha)
    
            if(Qm_Chamou.includes('artista')) {
                musica_linha.appendChild(views)
            }
    
            musica_linha.appendChild(segunda_parte_musica_linha)
            Local.appendChild(musica_linha)
    
            //! Funções de click
            like.addEventListener('click', () => {
                let Musicas_Recebidas = [...Musicas]
                Curtir_Musica_Descurtir(Musicas_Recebidas[c], like)
            })
    
            btn_letra_editar.addEventListener('click', () => {
                musica_editando_meu_perfil = Musicas[c]
                Abrir_Pagina('adicionarletra', `adicionarletra_${Musicas[c].ID}`)
            })
    
            btn_editar_musica.addEventListener('click', () => {
                Abrir_Container_Editar_Musicas(Musicas[c])
            })
    
            musica_linha.addEventListener('click', (e) => {
                let Musicas_Recebidas = [...Musicas]
                let el = e.target.className
                let qm_chamou = formatarString(Qm_Chamou)
    
                if(el != 'span_nomes_artistas' && el != 'like_musicas_linha' && el != 'btn_editar_musica' && el != 'btn_trash' && el != 'img_trash' && el != 'img_pen' && el != 'img_mic_editar' && el != 'btn_letra_editar') {
                    Tocar_Musica(Musicas_Recebidas, Musicas_Recebidas[c])
                    Listas_Prox.Nome_Album = Qm_Chamou
                }
            })
    
            musica_linha.addEventListener('contextmenu', (event) => {
                let Musicas_Recebidas = [...Musicas]
                Ativar_Opcoes_Click_Direita('Músicas Linha', Musicas_Recebidas[c], c)
                posicionarElemento(event, document.getElementById('opcoes_click_direito'))
            })
        }
    }

    document.getElementById('ouvintes_artista').innerText = `${soma_ouvintes} ouvintes mensais`
}

function Adicionar_View_Musica(Musica) {
    let feito = false
    if(User.Estado_Da_Conta != 'Anônima') {
    
        db.collection('Musicas').get().then((snapshot) => {
            snapshot.docs.forEach(Musicas => {
                TodasMusicas = Musicas.data().Musicas
                
                if(!feito) {
                    for (let c = 0; c < TodasMusicas.length; c++) {
                        if(TodasMusicas[c].ID == Musica.ID && feito != true) {
                            feito = true
                            TodasMusicas[c].Views = parseInt(TodasMusicas[c].Views) + 1
                
                            db.collection('Musicas').doc(Musicas.id).update({Musicas: TodasMusicas})
                            break
                        }
                    }
                }
            })
        })
    }
}