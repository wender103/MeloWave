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

function Tocar_Musica(Lista, MusicaAtual, Comando='', IDPagina, Qm_Chamou, Nome_Album) {
    if(Comando == null || Comando == undefined) {
        Comando = ''
    }

    if(Nome_Album != '') {
        Listas_Prox.Nome_Album = Nome_Album
    }

    if(Listas_Prox.MusicaAtual != MusicaAtual) {
        Repetir_Musica(false)
        tmp_ouvindo_musica = 0
    }

    Listas_Prox.MusicaAtual = MusicaAtual
    Listas_Prox.Lista_Musicas = Lista
    for (let c = 0; c < Lista.length; c++) {
        if(Lista[c].ID == MusicaAtual.ID) {
            Listas_Prox.Indice = c
            break
        }
    }

    Carregar_Tela_Tocando_Agora(MusicaAtual)

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
        pre_letra_da_musica.innerHTML = MusicaAtual.Letra.Letra_Musica
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
                // console.log(currentTimeInSeconds)
                // console.log('View adicionada')
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

let Musica_Pausada = true
function Pausar() {
    icone_play_pc.forEach(element => {
        element.src = 'Assets/Imgs/play_pc.svg'
    })
    audio_player.pause()

    document.title = 'MeloWave - Home'
    Musica_Pausada = true
    btn_pausar_letra_sincronizar.querySelector('img').src = 'Assets/Imgs/botao_play_sem_fundo.png'
    btn_pausar_letra_sincronizar.title = 'Play'
}

function Play() {
    icone_play_pc.forEach(element => {
        element.src = 'Assets/Imgs/Pause.svg'
    })
    audio_player.play()

    document.title = `${Listas_Prox.MusicaAtual.Nome} - ${Listas_Prox.MusicaAtual.Autor}`
    Musica_Pausada = false
    btn_pausar_letra_sincronizar.querySelector('img').src = 'Assets/Imgs/pausa_icon_sem_fundo.png'
    btn_pausar_letra_sincronizar.title = 'Pausar'

}

let prox_ativo = false
function Proxima_Musica(Chamado_Por) {
    if(!prox_ativo && !repetir_musicas || !prox_ativo && Chamado_Por != 'fim_do_audio') {
        prox_ativo = true

        if(repetir_musicas) {
            Repetir_Musica()
        }

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
        Atualizar_Linha_Letra_Input()
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
    volume = parseInt(volume)

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

    Volume_Atual = parseInt(volume)
    
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
function Retornar_Musica_Linha(Musicas_Recebidas, Local, Comando='', Qm_Chamou = '', ID_Pagina='', Nome_Album = '') {
    if(Comando == null || Comando == undefined) {
        Comando = ''
    }

    Array_Musica_Linha = []
    Local.innerHTML = ''

    let soma_ouvintes = 0
    let Musicas = inverterArrayDeMusicas(Musicas_Recebidas)

    if(Comando.includes('Não Inverter')) {
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
            const bnt_carrinho_editar = document.createElement('button')
            const img_carrinho_editar = document.createElement('img')
    
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
            bnt_carrinho_editar.className = 'bnt_carrinho_editar'
            img_carrinho_editar.className = 'img_carrinho_editar'
    
            //! Valores
            img.src = Musicas[c].Img
            p.innerText = Musicas[c].Nome
            span.appendChild(Retornar_Artistas_Da_Musica(Musicas[c]))
            p_contador.innerText = c + 1
            img_pen.src = 'Assets/Imgs/pen.png'
            img_trash.src = 'Assets/Imgs/trash-bin.png'
            img_mic_editar.src = 'Assets/Imgs/Mic.svg'
            img_carrinho_editar.src = 'Assets/Imgs/carrinho-de-compras.png'
    
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
            if(!Comando.includes('Resumido')) {
                primeira_parte_musica_linha.appendChild(p_contador)
            }

            primeira_parte_musica_linha.appendChild(img)
            texto_musica_linha.appendChild(p)
            texto_musica_linha.appendChild(span)
            primeira_parte_musica_linha.appendChild(texto_musica_linha)
        
            bnt_carrinho_editar.appendChild(img_carrinho_editar)
            btn_letra_editar.appendChild(img_mic_editar)
            btn_trash.appendChild(img_trash)
            btn_editar_musica.appendChild(img_pen)
    
            if(Comando.includes('Editar')) {
                if(!Array.isArray(Musicas[c].Letra)) {
                    segunda_parte_musica_linha.appendChild(btn_letra_editar)
                }
    
                segunda_parte_musica_linha.appendChild(bnt_carrinho_editar)
                segunda_parte_musica_linha.appendChild(btn_editar_musica)
                segunda_parte_musica_linha.appendChild(btn_trash)
    
            } else if(!Comando.includes('Resumido')) {
                segunda_parte_musica_linha.appendChild(like)
                segunda_parte_musica_linha.appendChild(tempo)
            }
    
            musica_linha.appendChild(primeira_parte_musica_linha)
    
            if(Comando.includes('View')) {
                musica_linha.appendChild(views)
            }
    
            if(!Comando.includes('Resumido')) {
                musica_linha.appendChild(segunda_parte_musica_linha)
            }
            Local.appendChild(musica_linha)
    
            //! Funções de click
            like.addEventListener('click', () => {
                let Musicas_Recebidas = [...Musicas]
                Curtir_Musica_Descurtir(Musicas_Recebidas[c], like)
            })
    
            btn_letra_editar.addEventListener('click', () => {
                musica_editando_meu_perfil = Musicas[c]
                Abrir_Pagina('adicionarletra', `adicionarletra_${Musicas[c].ID}`)
                btn_pesquisar_letra_add.href = `https://www.musixmatch.com/es/busqueda?query=${`${Separar_Por_Virgula(Musicas[c].Autor)[0]} ${Musicas[c].Nome}`}`
                btn_pesquisar_letra_add.addEventListener('click', () => {
                    sairDaTelaCheia()
                })
            })
    
            btn_editar_musica.addEventListener('click', () => {
                Abrir_Container_Editar_Musicas(Musicas[c])
            })
    
            bnt_carrinho_editar.addEventListener('click', () => {
                Iniciar_Loja(Musicas[c])
            })

            musica_linha.addEventListener('click', (e) => {
                let Musicas_Recebidas = [...Musicas]
                let el = e.target.className
                let qm_chamou = formatarString(Qm_Chamou)
    
                if(el != 'span_nomes_artistas' && el != 'like_musicas_linha' && el != 'btn_editar_musica' && el != 'btn_trash' && el != 'img_trash' && el != 'img_pen' && el != 'img_mic_editar' && el != 'btn_letra_editar' && el != 'bnt_carrinho_editar' && el != 'img_carrinho_editar') {
                    Tocar_Musica(Musicas_Recebidas, Musicas_Recebidas[c], '', ID_Pagina, Qm_Chamou, Nome_Album)
                    Listas_Prox.Nome_Album = Qm_Chamou
                }
            })
    
            musica_linha.addEventListener('contextmenu', (event) => {
                if(!Comando.includes('Resumido')) {
                    let Musicas_Recebidas = [...Musicas]
                    Ativar_Opcoes_Click_Direita('Músicas Linha', Musicas_Recebidas[c], c)
                    posicionarElemento(event, document.getElementById('opcoes_click_direito'))
                }
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

let img_barra_musica_aberta = false
function Ativar_img_maior_barra_musica() {
    const btn_mostrar_img_musica_barra_maior = document.getElementById('btn_mostrar_img_musica_barra_maior')
    const tcontainer_img_musica_barra_musica = document.getElementById('container_img_musica_barra_musica')

    if(!img_barra_musica_aberta) {
        img_barra_musica_aberta = true
        tcontainer_img_musica_barra_musica.classList.add('active')
        btn_mostrar_img_musica_barra_maior.classList.add('active')
    } else {
        img_barra_musica_aberta = false
        tcontainer_img_musica_barra_musica.classList.remove('active')
        btn_mostrar_img_musica_barra_maior.classList.remove('active')
    }

    btn_mostrar_img_musica_barra_maior.style.display = 'none'

    setTimeout(() => {
        btn_mostrar_img_musica_barra_maior.style.display = 'flex'
    }, 1000)
}

function Abrir_Creditos(ID_Musica) {
    for (let c = 0; c < TodasMusicas.length; c++) {
       if(TodasMusicas[c].ID == ID_Musica) {
        document.getElementById('contanier_creditos_musica').style.display = 'flex'
        document.getElementById('nome_artistas_credito').innerHTML = ''
        document.getElementById('nome_artistas_credito').appendChild(Retornar_Artistas_Da_Musica((TodasMusicas[c])))
        if(Separar_Por_Virgula(TodasMusicas[c].Autor).length > 0) {
            document.getElementById('p_artista_creditos').innerText = 'Artistas:'

        } else {
            document.getElementById('p_artista_creditos').innerText = 'Artista:'
        }

        document.getElementById('nome_musica_cretido').innerText = TodasMusicas[c].Nome

        let user_encontrado = false
        const nome_qm_postou_creditos = document.getElementById('nome_qm_postou_creditos')
        let usuario_carregado = undefined
        for (let a = 0; a < Todos_Usuarios.length; a++) {
            if(Todos_Usuarios[a].Email == TodasMusicas[c].Email) {
                nome_qm_postou_creditos.innerText = Todos_Usuarios[a].Nome
                nome_qm_postou_creditos.classList.add('active')
                user_encontrado = true
                usuario_carregado = Todos_Usuarios[a]
                break
            }
        }

        if(!user_encontrado) {
            nome_qm_postou_creditos.classList.remove('active')
            nome_qm_postou_creditos.innerText = 'Anônimo'
        }

        nome_qm_postou_creditos.addEventListener('click', () => {
            if(nome_qm_postou_creditos.innerText != 'Anônimo') {
                Carregar_Perfil(usuario_carregado)
                Fechar_Creditos()
            }
        })

        break
       }
        
    }
}

function Fechar_Creditos() {
    document.getElementById('contanier_creditos_musica').style.display = 'none'
}

//! Tela Tocando Agora
let infos_artistas_musica_tela_musica_tocando = []
const container_tela_tocando_agora = document.getElementById('container_tela_tocando_agora')
function Carregar_Tela_Tocando_Agora(Musica) {
    infos_artistas_musica_tela_musica_tocando = []
    const container_letra_tela_tocando_agora = document.getElementById('container_letra_tela_tocando_agora')
    document.getElementById('carousel_telta_tocando_agora').innerHTML = ''
    document.getElementById('img_musica_tela_tocando_agora').src = Musica.Img
    document.getElementById('nome_musica_tela_tocando_agora').innerText = Musica.Nome
    document.getElementById('nome_artistas_tela_tocando_agora').innerHTML = ''
    document.getElementById('nome_artistas_tela_tocando_agora').appendChild(Retornar_Artistas_Da_Musica(Musica))

    document.getElementById('nome_artistas_credito_tela_tocando_agora').innerHTML = ''
    document.getElementById('nome_artistas_credito_tela_tocando_agora').appendChild(Retornar_Artistas_Da_Musica(Musica))
    document.getElementById('nome_musica_cretido_tela_tocando_agora').innerText = Musica.Nome

    document.getElementById('p_nome_album_tela_tocando_agora').innerText = Separar_Por_Virgula(Musica.Autor)[0]

    if(!Array.isArray(Musica.Letra)) {
        container_letra_tela_tocando_agora.style.display = 'block'
    } else {
        container_letra_tela_tocando_agora.style.display = 'none'
    }

    document.getElementById('nome_qm_postou_creditos_tela_tocando_agora').innerText = 'Anônimo'
    let user_carregado = undefined
    document.getElementById('nome_qm_postou_creditos_tela_tocando_agora').classList.remove('active')
    for (let c = 0; c < Todos_Usuarios.length; c++) {
        if(Todos_Usuarios[c].Email == Musica.Email) {
            document.getElementById('nome_qm_postou_creditos_tela_tocando_agora').innerText = Todos_Usuarios[c].Nome
            document.getElementById('nome_qm_postou_creditos_tela_tocando_agora').classList.add('active')
            user_carregado = Todos_Usuarios[c]
            break
        }
    }

    document.getElementById('nome_qm_postou_creditos_tela_tocando_agora').addEventListener('click' , () => {
        if(document.getElementById('nome_qm_postou_creditos_tela_tocando_agora').innerText != 'Anônimo') {
            Carregar_Perfil(user_carregado)
        }
    })

    let array_artistas = Separar_Por_Virgula(Musica.Autor)
    const carousel_telta_tocando_agora = document.getElementById('carousel_telta_tocando_agora')

    let active_add = false
    for (let contador = 0; contador < array_artistas.length; contador++) {
        let artista_formatado_atual = array_artistas[contador]
        let user_encontrado = false
        for (let contador2 = 0; contador2 < TodasMusicas.length; contador2++) {
            let todasmusicas_artista_formatado = TodasMusicas[contador2].Autor
            if(todasmusicas_artista_formatado == artista_formatado_atual) {
                user_encontrado = true
                const carousel_item_telta_tocando_agora = document.createElement('img')
                carousel_item_telta_tocando_agora.classList.add('carousel_item_telta_tocando_agora')
                carousel_item_telta_tocando_agora.src = TodasMusicas[contador2].Img

                let new_infos = {
                    Artista: array_artistas[contador],
                    Musica: TodasMusicas[contador2]
                }
                infos_artistas_musica_tela_musica_tocando.push(new_infos)

                if(!active_add) {
                    active_add = true
                    carousel_item_telta_tocando_agora.classList.add('active')
                } else {
                    carousel_item_telta_tocando_agora.classList.add('next')
                }

                carousel_telta_tocando_agora.appendChild(carousel_item_telta_tocando_agora)

                carousel_item_telta_tocando_agora.addEventListener('click', () => {
                    Abrir_Perfil_Artista(new_infos.Artista, new_infos.Musica)
                })
                break
            }
        }

        if(!user_encontrado) {
            const carousel_item_telta_tocando_agora = document.createElement('img')
            carousel_item_telta_tocando_agora.classList.add('carousel_item_telta_tocando_agora')
            carousel_item_telta_tocando_agora.src = Musica.Img

            let new_infos = {
                Artista: array_artistas[contador],
                Musica: Musica
            }
            infos_artistas_musica_tela_musica_tocando.push(new_infos)

            if(!active_add) {
                active_add = true
                carousel_item_telta_tocando_agora.classList.add('active')
            } else {
                carousel_item_telta_tocando_agora.classList.add('next')
            }

            carousel_telta_tocando_agora.appendChild(carousel_item_telta_tocando_agora)
        }
    }

    update_lista_a_seguir()
    updateButtons()
}

let array_sequencia_musica = []
function update_lista_a_seguir() {
    array_sequencia_musica = []
    let conseguir_10_musicas = Listas_Prox.Lista_Musicas.length > 10

    if(conseguir_10_musicas) {
        for (let b = Listas_Prox.Indice + 1; b < Listas_Prox.Lista_Musicas.length && array_sequencia_musica.length < 10; b++) {
            array_sequencia_musica.unshift(Listas_Prox.Lista_Musicas[b])
        }
    } else {
        for (let b = Listas_Prox.Indice + 1; b < Listas_Prox.Lista_Musicas.length && array_sequencia_musica.length < 10; b++) {
            array_sequencia_musica.unshift(Listas_Prox.Lista_Musicas[b])
        }
    }

    if(array_sequencia_musica.length < 10) {
        for (let b = 0; b < Listas_Prox.Indice && array_sequencia_musica.length < 10; b++) {
            array_sequencia_musica.unshift(Listas_Prox.Lista_Musicas[b])
        }
    }

    if(Listas_Prox.A_Seguir.length > 0) {
        array_sequencia_musica.push(...Listas_Prox.A_Seguir)
    }
    Retornar_Musica_Linha(array_sequencia_musica, document.getElementById('contanier_fila_tela_tocando_agora'), 'Resumido')
}

const next_btn_telta_tocando_agora = document.getElementById('next_btn_telta_tocando_agora')
const prev_btn_telta_tocando_agora = document.getElementById('prev_btn_telta_tocando_agora')
const carousel_telta_tocando_agora = document.getElementById('carousel_telta_tocando_agora')
let currentIndex_tela_musica_tocando_agora = 0
const btn_seguir_artista_tela_tocando_agora = document.getElementById('btn_seguir_artista_tela_tocando_agora')

function updateButtons() {
    const carousel_item_telta_tocando_agora = document.querySelectorAll('.carousel_item_telta_tocando_agora')
    if (currentIndex_tela_musica_tocando_agora === 0) {
        prev_btn_telta_tocando_agora.style.display = 'none'
        if(infos_artistas_musica_tela_musica_tocando.length <= 1) {
            next_btn_telta_tocando_agora.style.display = 'none'
    
        } else {
            next_btn_telta_tocando_agora.style.display = 'block'
        }
    } else if (currentIndex_tela_musica_tocando_agora === carousel_item_telta_tocando_agora.length - 1) {
        next_btn_telta_tocando_agora.style.display = 'none'
        prev_btn_telta_tocando_agora.style.display = 'block'
    } else {
        prev_btn_telta_tocando_agora.style.display = 'block'
        next_btn_telta_tocando_agora.style.display = 'block'
    }

    let ouvintes_mensais = 0
    for (let c = 0; c < TodasMusicas.length; c++) {
        let artista_todas_musicas_formatado = formatarString(TodasMusicas[c].Autor)
        let nome_artista_formatado = formatarString(infos_artistas_musica_tela_musica_tocando[currentIndex_tela_musica_tocando_agora].Artista)
        
        if(artista_todas_musicas_formatado.includes(nome_artista_formatado) || nome_artista_formatado.includes(artista_todas_musicas_formatado)) {
            ouvintes_mensais += parseInt(TodasMusicas[c].Views)
        }
    }

    document.getElementById('nome_artista_tela_tocando_agora').innerText = infos_artistas_musica_tela_musica_tocando[currentIndex_tela_musica_tocando_agora].Artista
    document.getElementById('ouvintes_mensais_artista_tela_tocando_agora').innerText = `${ouvintes_mensais} ouvintes mensais`

    if(Seguir_Artista(infos_artistas_musica_tela_musica_tocando[currentIndex_tela_musica_tocando_agora].Artista, 'Checar')) {
        btn_seguir_artista_tela_tocando_agora.innerText = 'Deixar de seguir'
    } else {
        btn_seguir_artista_tela_tocando_agora.innerText = 'Seguir'
    }

    update_lista_a_seguir()
}

btn_seguir_artista_tela_tocando_agora.addEventListener('click', () => {
    Seguir_Artista(infos_artistas_musica_tela_musica_tocando[currentIndex_tela_musica_tocando_agora].Artista)
    updateButtons()
})

next_btn_telta_tocando_agora.addEventListener('click', () => {
    const carousel_item_telta_tocando_agora = document.querySelectorAll('.carousel_item_telta_tocando_agora')
    carousel_item_telta_tocando_agora[currentIndex_tela_musica_tocando_agora].classList.remove('active')
    carousel_item_telta_tocando_agora[currentIndex_tela_musica_tocando_agora].classList.add('next')
    currentIndex_tela_musica_tocando_agora = (currentIndex_tela_musica_tocando_agora + 1) % carousel_item_telta_tocando_agora.length
    carousel_item_telta_tocando_agora[currentIndex_tela_musica_tocando_agora].classList.remove('next')
    carousel_item_telta_tocando_agora[currentIndex_tela_musica_tocando_agora].classList.add('active')

    const offset = -currentIndex_tela_musica_tocando_agora * 100
    carousel_telta_tocando_agora.style.transform = `translateX(${offset}%)`
    updateButtons()
})

prev_btn_telta_tocando_agora.addEventListener('click', () => {
    const carousel_item_telta_tocando_agora = document.querySelectorAll('.carousel_item_telta_tocando_agora')
    carousel_item_telta_tocando_agora[currentIndex_tela_musica_tocando_agora].classList.remove('active')
    carousel_item_telta_tocando_agora[currentIndex_tela_musica_tocando_agora].classList.add('next')
    currentIndex_tela_musica_tocando_agora = (currentIndex_tela_musica_tocando_agora - 1 + carousel_item_telta_tocando_agora.length) % carousel_item_telta_tocando_agora.length
    carousel_item_telta_tocando_agora[currentIndex_tela_musica_tocando_agora].classList.remove('next')
    carousel_item_telta_tocando_agora[currentIndex_tela_musica_tocando_agora].classList.add('active')

    const offset = -currentIndex_tela_musica_tocando_agora * 100
    carousel_telta_tocando_agora.style.transform = `translateX(${offset}%)`
    updateButtons()
})

//! Tela Tocando Agora
let telca_tocando_agora_aberta = false
let pd_abrir_tela_tocando_agora = true
function Abrir_Tela_Tocando_Agora() {
    let time_esperar = 0

    if(fila_aberta) {
        time_esperar = 600
    }
    Fechar_Fila()

    if(pd_abrir_tela_tocando_agora) {
        pd_abrir_tela_tocando_agora = false

        setTimeout(() => {
            Mostrar_Max_Musicas()
            pd_abrir_tela_tocando_agora = true
        }, 600)

        if(!telca_tocando_agora_aberta) {
            setTimeout(() => {
                telca_tocando_agora_aberta = true
                main.style.transition = '500ms width ease-in-out'
                main.style.width = 'calc(100vw - 386px)'

        
                nav_main.style.transition = '500ms width ease-in-out'
                nav_main.style.width = 'calc(100vw - 386px)'

                container_tela_tocando_agora.style.transition = '500ms right ease-in-out'
        
                container_tela_tocando_agora.style.right = '8px'
        
                setTimeout(() => {
                    main.style.transition = 'none'
                    nav_main.style.transition = 'none'
                }, 600)
            }, time_esperar)
    
        } else {
            Fechar_Tela_Tocando_Agora()
        }
    }
}

function Fechar_Tela_Tocando_Agora() {
    telca_tocando_agora_aberta = false
    main.style.transition = '500ms width ease-in-out'
    main.style.width = 'calc(100vw - 96px)'
    container_tela_tocando_agora.style.right = '-282px'

    nav_main.style.transition = '500ms width ease-in-out'
    nav_main.style.width = 'calc(100vw - 96px)'

    Fechar_Letra_Tela_Tocando_Agora()

    
    setTimeout(() => {
        main.style.transition = 'none'
        nav_main.style.transition = 'none'
    }, 600)
}

const btn_mostrar_letra_tela_tocando_agora = document.getElementById('btn_mostrar_letra_tela_tocando_agora')
const pre_letra_tocando_agora = document.getElementById('pre_letra_tocando_agora')
const container_letra_tocando_agora = document.getElementById('container_letra_tocando_agora')
let pode_atualizar_letra_tela_tocando_agora = false

btn_mostrar_letra_tela_tocando_agora.addEventListener('click', () => {
    if(pode_atualizar_letra_tela_tocando_agora) {
        Fechar_Letra_Tela_Tocando_Agora()
    } else {
        Mostrar_Letra_Tela_Tocando_Agora()
    }
})

function Mostrar_Letra_Tela_Tocando_Agora() {
    if(!Array.isArray(Listas_Prox.MusicaAtual.Letra)) {
        pre_letra_tocando_agora.innerText = Listas_Prox.MusicaAtual.Letra.Letra_Musica
        btn_mostrar_letra_tela_tocando_agora.innerText = 'Fechar Letra'
        pode_atualizar_letra_tela_tocando_agora = true
        container_letra_tocando_agora.classList.add('active')
        container_letra_tela_tocando_agora.style.background = 'rgba(13, 17, 31, 0.192)'
        container_letra_tela_tocando_agora.style.backdropFilter = 'blur(20px)'
    } else {
        pre_letra_tocando_agora.innerText = 'Não aprendi essa ainda ;('
    }
}

function Fechar_Letra_Tela_Tocando_Agora() {
    const container_letra_tela_tocando_agora = document.getElementById('container_letra_tela_tocando_agora')
    pode_atualizar_letra_tela_tocando_agora = false 
    btn_mostrar_letra_tela_tocando_agora.innerText = 'Mostrar Letra'
    pode_atualizar_letra_tela_tocando_agora = false
    container_letra_tocando_agora.classList.remove('active')
    container_letra_tela_tocando_agora.style.background = '#0000001a'
    container_letra_tela_tocando_agora.style.backdropFilter = 'blur(0px)'
}