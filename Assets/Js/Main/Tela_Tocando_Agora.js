//! Tela Tocando Agora
const next_btn_telta_tocando_agora = document.getElementById('next_btn_telta_tocando_agora')
const prev_btn_telta_tocando_agora = document.getElementById('prev_btn_telta_tocando_agora')
const carousel_telta_tocando_agora = document.getElementById('carousel_telta_tocando_agora')
let currentIndex_tela_musica_tocando_agora = 0
const btn_seguir_artista_tela_tocando_agora = document.getElementById('btn_seguir_artista_tela_tocando_agora')

let infos_artistas_musica_tela_musica_tocando = []
const container_letra_tela_tocando_agora = document.getElementById('container_letra_tela_tocando_agora')
const container_tela_tocando_agora = document.getElementById('container_tela_tocando_agora')
const carouselTocandoAgora = document.getElementById('carousel_telta_tocando_agora')
const imgMusicaTelaTocandoAgora = document.getElementById('img_musica_tela_tocando_agora')
const nomeMusicaTelaTocandoAgora = document.getElementById('nome_musica_tela_tocando_agora')
const nomeArtistasTelaTocandoAgora = document.getElementById('nome_artistas_tela_tocando_agora')
const nomeArtistasCreditoTelaTocandoAgora = document.getElementById('nome_artistas_credito_tela_tocando_agora')
const nomeMusicaCreditoTelaTocandoAgora = document.getElementById('nome_musica_cretido_tela_tocando_agora')

function Carregar_Tela_Tocando_Agora(Musica) {
    infos_artistas_musica_tela_musica_tocando = []
    carouselTocandoAgora.innerHTML = ''
    imgMusicaTelaTocandoAgora.src = Musica.Imagens[1]
    imgMusicaTelaTocandoAgora.loading = 'lazy'
    nomeMusicaTelaTocandoAgora.innerText = Musica.Nome
    nomeArtistasTelaTocandoAgora.innerHTML = ''
    nomeArtistasTelaTocandoAgora.appendChild(Retornar_Artistas_Da_Musica(Musica))

    nomeArtistasCreditoTelaTocandoAgora.innerHTML = ''
    nomeArtistasCreditoTelaTocandoAgora.appendChild(Retornar_Artistas_Da_Musica(Musica))
    nomeMusicaCreditoTelaTocandoAgora.innerText = Musica.Nome

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
        let artista_formatado_atual = formatarString(array_artistas[contador])
        let user_encontrado = false
        const carousel_item_containder_telta_tocando_agora = document.createElement('div')
        const carousel_item_telta_tocando_agora = document.createElement('img')
        carousel_item_telta_tocando_agora.loading = 'lazy'
        const carousel_item_p = document.createElement('p')
        carousel_item_p.innerText = 'Artista'
        let musica_artista_encontrada = false
        for (let contador2 = 0; contador2 < TodasMusicas.length; contador2++) {
            let todasmusicas_artista_formatado = formatarString(TodasMusicas[contador2].Autor)
            if(todasmusicas_artista_formatado == artista_formatado_atual) {
                musica_artista_encontrada = true
                user_encontrado = true
                carousel_item_containder_telta_tocando_agora.classList.add('carousel_item_telta_tocando_agora')
                carousel_item_telta_tocando_agora.src = TodasMusicas[contador2].Imagens[1]

                let new_infos = {
                    Artista: array_artistas[contador],
                    Musica: TodasMusicas[contador2]
                }
                infos_artistas_musica_tela_musica_tocando.push(new_infos)

                if(!active_add) {
                    active_add = true
                    carousel_item_containder_telta_tocando_agora.classList.add('active')
                } else {
                    carousel_item_containder_telta_tocando_agora.classList.add('next')
                }

                carousel_item_containder_telta_tocando_agora.appendChild(carousel_item_telta_tocando_agora)
                carousel_item_containder_telta_tocando_agora.appendChild(carousel_item_p)
                carousel_telta_tocando_agora.appendChild(carousel_item_containder_telta_tocando_agora)

                carousel_item_containder_telta_tocando_agora.addEventListener('click', () => {
                    Abrir_Perfil_Artista(infos_artistas_musica_tela_musica_tocando[contador].Artista, infos_artistas_musica_tela_musica_tocando[contador].Musica)
                })
                break
            }

        }

        if(!musica_artista_encontrada) {
            musica_artista_encontrada = true
            user_encontrado = true
            carousel_item_containder_telta_tocando_agora.classList.add('carousel_item_telta_tocando_agora')
            carousel_item_telta_tocando_agora.src = Musica.Img

            let new_infos = {
                Artista: array_artistas[contador],
                Musica: Musica
            }
            infos_artistas_musica_tela_musica_tocando.push(new_infos)

            if(!active_add) {
                active_add = true
                carousel_item_containder_telta_tocando_agora.classList.add('active')
            } else {
                carousel_item_containder_telta_tocando_agora.classList.add('next')
            }

            carousel_item_containder_telta_tocando_agora.appendChild(carousel_item_telta_tocando_agora)
            carousel_item_containder_telta_tocando_agora.appendChild(carousel_item_p)
            carousel_telta_tocando_agora.appendChild(carousel_item_containder_telta_tocando_agora)

            carousel_item_containder_telta_tocando_agora.addEventListener('click', () => {
                Abrir_Perfil_Artista(infos_artistas_musica_tela_musica_tocando[contador].Artista, infos_artistas_musica_tela_musica_tocando[contador].Musica)
            })
        }

        if(!user_encontrado) {
            const carousel_item_containder_telta_tocando_agora = document.createElement('div')
            const carousel_item_telta_tocando_agora = document.createElement('img')
            carousel_item_telta_tocando_agora.loading = 'lazy'
            const carousel_item_p = document.createElement('p')
            carousel_item_p.innerText = 'Artista'
            carousel_item_containder_telta_tocando_agora.classList.add('carousel_item_telta_tocando_agora')
            carousel_item_telta_tocando_agora.src = Musica.Img

            let new_infos = {
                Artista: array_artistas[contador],
                Musica: Musica
            }
            infos_artistas_musica_tela_musica_tocando.push(new_infos)

            if(!active_add) {
                active_add = true
                carousel_item_containder_telta_tocando_agora.classList.add('active')
            } else {
                carousel_item_containder_telta_tocando_agora.classList.add('next')
            }

            carousel_item_containder_telta_tocando_agora.appendChild(carousel_item_telta_tocando_agora)
            carousel_item_containder_telta_tocando_agora.appendChild(carousel_item_p)
            carousel_telta_tocando_agora.appendChild(carousel_item_containder_telta_tocando_agora)
        }
    }

    carousel_telta_tocando_agora.style.transform = `translateX(0%)`
    currentIndex_tela_musica_tocando_agora = 0
    update_lista_a_seguir()
    updateButtons()
}

let array_sequencia_musica = []
function update_lista_a_seguir(Comando='') {
    if(!Listas_Prox.Indice) {
        Listas_Prox.Indice = 0
    }

    let Indice_global = Listas_Prox.Indice
        
    if(Listas_Prox.MusicaAtual.ID != Listas_Prox.Lista_Musicas[Listas_Prox.Indice].ID) {
        Indice_global = Listas_Prox.Indice - 1
    }

    array_sequencia_musica = []
    let conseguir_10_musicas = Listas_Prox.Lista_Musicas.length > 10

    if(conseguir_10_musicas) {
        for (let b = Indice_global + 1; b < Listas_Prox.Lista_Musicas.length && array_sequencia_musica.length < 10; b++) {
            array_sequencia_musica.unshift(Listas_Prox.Lista_Musicas[b])
        }
    } else {
        for (let b = Indice_global + 1; b < Listas_Prox.Lista_Musicas.length && array_sequencia_musica.length < 10; b++) {
            array_sequencia_musica.unshift(Listas_Prox.Lista_Musicas[b])
        }
    }

    if(array_sequencia_musica.length < 10) {
        for (let b = 0; b < Indice_global && array_sequencia_musica.length < 10; b++) {
            array_sequencia_musica.unshift(Listas_Prox.Lista_Musicas[b])
        }
    }

    if(Listas_Prox.A_Seguir.length > 0) {
        let new_array = [...Listas_Prox.A_Seguir]
        new_array.reverse()
        array_sequencia_musica.push(...new_array)
    }
    Retornar_Musica_Linha(array_sequencia_musica, document.getElementById('contanier_fila_tela_tocando_agora'), 'Resumido')
}

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
    document.getElementById('ouvintes_mensais_artista_tela_tocando_agora').innerText = `${formatViews(ouvintes_mensais)}`

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
let tela_tocando_agora_aberta = false
let pd_abrir_tela_tocando_agora = true
function Abrir_Tela_Tocando_Agora() {
    let time_esperar = 0

    if(fila_aberta || Lista_Amigos_Aberta) {
        time_esperar = 600
    }
    Fechar_Fila()
    Fechar_Lista_Amigos()

    if(pd_abrir_tela_tocando_agora && Device.Tipo != 'Mobile') {
        pd_abrir_tela_tocando_agora = false

        setTimeout(() => {
            Mostrar_Max_Musicas()
            pd_abrir_tela_tocando_agora = true
        }, 600)

        if(!tela_tocando_agora_aberta) {
            tela_tocando_agora_aberta = true
            setTimeout(() => {
                main.style.transition = '500ms width ease-in-out'
                main.style.width = 'calc(100vw - 386px)'

        
                nav_main.style.transition = '500ms width ease-in-out'
                nav_main.style.width = 'calc(100vw - 386px)'
                if(notificacao_tempo_real_aberta) {
                    Mostrar_Notificacao_Na_Tela(2)
                }

                container_tela_tocando_agora.style.transition = '500ms right ease-in-out'
        
                container_tela_tocando_agora.style.right = '8px'

                Atualizar_Cores_Partes_Site()
                
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
    tela_tocando_agora_aberta = false
    main.style.transition = '500ms width ease-in-out'
    main.style.width = 'calc(100vw - 96px)'
    container_tela_tocando_agora.style.right = '-282px'

    nav_main.style.transition = '500ms width ease-in-out'
    nav_main.style.width = 'calc(100vw - 96px)'
    if(!fila_aberta && notificacao_tempo_real_aberta) {
        Mostrar_Notificacao_Na_Tela(1)
    }

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
        reabrir_letra_aba_musica_tocando_agora = true
        if(pd_atualizar_letra_pc) {
            Fechar_Ver_Letra_PC('Não Abrir Letra Tela Tocando Agora')
        }
        pre_letra_tocando_agora.innerText = Listas_Prox.MusicaAtual.Letra.Letra_Musica
        btn_mostrar_letra_tela_tocando_agora.innerText = 'Fechar Letra'
        pode_atualizar_letra_tela_tocando_agora = true
        container_letra_tocando_agora.classList.add('active')
        animateBackgroundColor(Listas_Prox.MusicaAtual.Cores[2], document.getElementById('container_letra_tela_tocando_agora'), 500, true)

        setTimeout(() => {
            Atualizar_Cores_Partes_Site()
        }, 500)

        setTimeout(() => {
            Atualizar_Linha_Letra_Input()
        }, 500)
    } else {
        pre_letra_tocando_agora.innerText = 'Não aprendi essa ainda ;('
    }
}

function Fechar_Letra_Tela_Tocando_Agora(Comando = '') {
    if(!Comando.includes('Reabrir')) {
        reabrir_letra_aba_musica_tocando_agora = false
    }

    const container_letra_tela_tocando_agora = document.getElementById('container_letra_tela_tocando_agora')
    pode_atualizar_letra_tela_tocando_agora = false 
    btn_mostrar_letra_tela_tocando_agora.innerText = 'Mostrar Letra'
    pode_atualizar_letra_tela_tocando_agora = false
    container_letra_tocando_agora.classList.remove('active')
    try {
        animateBackgroundColor(Listas_Prox.MusicaAtual.Cores[2], document.getElementById('container_letra_tela_tocando_agora'), 500, true)
    } catch{}

    setTimeout(() => {
        Atualizar_Cores_Partes_Site()
    }, 500)
}