let fila_aberta = false
const main = document.querySelector('main')
const nav_main = document.getElementById('nav_main')
const container_fila = document.getElementById('container_fila')
let pd_abrir_lista = true

let array_locais_opcoes = ['musica_resulmo', 'config_lista_prox'] //! Classes que vão ativar a section click direito

document.getElementById('musica_tocando_agora_fila').addEventListener('contextmenu', (event) => {
    Ativar_Opcoes_Click_Direita('Fila Música Tocando', Listas_Prox.MusicaAtual, Listas_Prox.Indice)
    posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
})

document.getElementById('config_lista_prox_musica_tocando_agora').addEventListener('click', (event) => {
    Ativar_Opcoes_Click_Direita('Fila Música Tocando', Listas_Prox.MusicaAtual, Listas_Prox.Indice)
    posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
})

function Abrir_Fila() {
    if(pd_abrir_lista) {
        pd_abrir_lista = false

        setTimeout(() => {
            Mostrar_Max_Musicas()
            pd_abrir_lista = true
        }, 600)

        if(!fila_aberta) {
            fila_aberta = true
            main.style.transition = '500ms width ease-in-out'
            main.style.width = 'calc(100vw - 386px)'

    
            nav_main.style.transition = '500ms width ease-in-out'
            nav_main.style.width = 'calc(100vw - 386px)'
    
            container_fila.style.right = '8px'
    
            setTimeout(() => {
                main.style.transition = 'none'
                nav_main.style.transition = 'none'
            }, 600)
    
        } else {
            fila_aberta = false
            Fehcar_Fila()
        }

        setTimeout(() => {
            Mostrar_Max_Musicas()
        }, 300)
    }
}

function Fehcar_Fila() {
    main.style.transition = '500ms width ease-in-out'
    main.style.width = 'calc(100vw - 96px)'
    container_fila.style.right = '-282px'

    nav_main.style.transition = '500ms width ease-in-out'
    nav_main.style.width = 'calc(100vw - 96px)'

    
    setTimeout(() => {
        main.style.transition = 'none'
        nav_main.style.transition = 'none'
    }, 600)
}

const container_musicas_prox_fila = document.getElementById('container_musicas_prox_fila')
const container_musicas_a_seguir_fila = document.getElementById('container_musicas_a_seguir_fila')
function Atualizar_Fila(Info) {
    const img_tocando_agora_fila = document.getElementById('img_tocando_agora_fila')
    const nome_tocando_agora_fila = document.getElementById('nome_tocando_agora_fila')
    const autor_tocando_agora_fila = document.getElementById('autor_tocando_agora_fila')

    img_tocando_agora_fila.src = Listas_Prox.MusicaAtual.Img
    nome_tocando_agora_fila.innerText = Listas_Prox.MusicaAtual.Nome
    autor_tocando_agora_fila.innerHTML = ''
    autor_tocando_agora_fila.appendChild(Retornar_Artistas_Da_Musica(Listas_Prox.MusicaAtual))

    let num_inicial = Listas_Prox.Indice
    for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
        if(!Tocando_Musica_A_Seguir && Listas_Prox.Lista_Musicas[c].ID == Listas_Prox.MusicaAtual.ID) {
            num_inicial = c
            break
        }
    }

    container_musicas_prox_fila.innerHTML = ''
    container_musicas_a_seguir_fila.innerHTML = ''
    let contador = 0
    let max_musicas = 10

    if (Listas_Prox.Lista_Musicas.length < max_musicas) {
        max_musicas = Listas_Prox.Lista_Musicas.length - 1
    }

    for (let c = num_inicial + 1; contador < max_musicas; c++) {
        Criar_Musica_Fila(container_musicas_prox_fila, Listas_Prox.Lista_Musicas, c, 'Fila Próximas')

        // Reinicie o contador se chegou ao final da lista
        if (c === Listas_Prox.Lista_Musicas.length) {
            c = 0
        }
    }

    //! Carregar lista a seguir
    for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
        Criar_Musica_Fila(container_musicas_a_seguir_fila, Listas_Prox.A_Seguir, c, 'Fila a Seguir')

        // Reinicie o contador se chegou ao final da lista
        if (c === Listas_Prox.A_Seguir.length) {
            c = 0
        }
    }

    function Criar_Musica_Fila(Elemento_Pai, Lista_Musicas, c, Modo) {
        const indice = c % Lista_Musicas.length

        for (let b = 0; b < TodasMusicas.length; b++) {
            if(TodasMusicas[b].ID == Lista_Musicas[indice].ID) {
                contador++

                const musica_resulmo = document.createElement('div')
                const primeira_parte = document.createElement('div')
                const img = document.createElement('img')
                const texto_musica_resulmo = document.createElement('div')
                const p = document.createElement('p')
                const span = document.createElement('span')
                const config = document.createElement('span')

                img.src = TodasMusicas[b].Img
                musica_resulmo.className = 'musica_resulmo'
                musica_resulmo.id = `Musica_Fila_${TodasMusicas[b].ID}`
                texto_musica_resulmo.className = 'texto_musica_resulmo'
                config.className = 'config_lista_prox'
                primeira_parte.className = 'primeira_parte_lista_prox'
                span.className = 'nome_autor_fila_prox'

                p.innerText = TodasMusicas[b].Nome
                span.appendChild(Retornar_Artistas_Da_Musica(TodasMusicas[b]))
                config.innerText = '...'

                primeira_parte.appendChild(img)
                texto_musica_resulmo.appendChild(p)
                texto_musica_resulmo.appendChild(span)
                primeira_parte.appendChild(texto_musica_resulmo)
                musica_resulmo.appendChild(primeira_parte)
                musica_resulmo.appendChild(config)
                Elemento_Pai.appendChild(musica_resulmo)

                config.addEventListener('click', (event) => {
                    Ativar_Opcoes_Click_Direita(Modo, Lista_Musicas[indice], indice)
                    posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
                })

                musica_resulmo.addEventListener('click', (e) => {
                    let Musicas_Recebidas = [...Listas_Prox.Lista_Musicas]
                    let el = e.target.className

                    if(el != 'config_lista_prox' && el != 'nome_autor_fila_prox' && el != 'span_nomes_artistas' && el != 'p_nomes_artistas') {
                        Tocar_Musica(Musicas_Recebidas, TodasMusicas[b])
                    }
                })

                musica_resulmo.addEventListener('contextmenu', (event) => {
                    Ativar_Opcoes_Click_Direita(Modo, TodasMusicas[b], b)
                    posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
                })

                if(c != Listas_Prox.A_Seguir.length - 1 || Modo != 'Fila a Seguir' || Info != 'Adicionando Fila a Seguir') {
                    musica_resulmo.classList.add('Animation_Nova_Musica_Fila')

                    document.querySelectorAll('.contanier_caixa_fila').forEach(element => {
                        
                        if(element.getElementsByClassName('contanier_caixa_fila2')[0].querySelectorAll('.musica_resulmo').length > 0) {
                            element.querySelector('p').classList.add('Animation_Nova_Musica_Fila')
                        } else {
                            if(element.id == 'container_musicas_a_seguir_fila' && element.getElementsByClassName('contanier_caixa_fila2')[0].querySelectorAll('.musica_resulmo').length <= 1) {

                            } else {
                                element.querySelector('p').classList.remove('Animation_Nova_Musica_Fila')
                            }
                        }
                    })
                }

                break
            }
            
        }
    }

    if(container_musicas_prox_fila.innerHTML == '') {
        document.getElementById('container_proximas_fila').style.display = 'none'
    } else {
        document.getElementById('container_proximas_fila').style.display = 'flex'
    }

    document.querySelectorAll('.contanier_caixa_fila').forEach(element => {
        
        if(element.getElementsByClassName('contanier_caixa_fila2')[0].innerHTML == '') {
            element.style.height = '0px'
        } else {
            element.style.height = 'auto'
        }
    })

    if(Listas_Prox.A_Seguir.length > 0 && Info == 'Adicionando Fila a Seguir') {
        Animacao_Adicionando_Lista('Adicionar a Seguir')
    }
}

//! Animação Filha -----------------------
let aaa = false
function Animacao_Adicionando_Lista(Modo, Indice, Comando='') {
    let container_pai = document.getElementById('container_a_seguir_fila')
    let Lista = Listas_Prox.A_Seguir

    if(Modo.includes('Próximas')) {
        container_pai = document.getElementById('container_proximas_fila')
        Lista = Listas_Prox.Lista_Musicas
    }

    let divs_encontradas = container_pai.getElementsByClassName('contanier_caixa_fila2')[0].querySelectorAll('.musica_resulmo')
    let tamanho = (divs_encontradas.length * 73) + 50

    if(Modo.includes('Adicionar')) {
        let tamanho_menor_partes = 73 / 5
        let tamanho_menor_partes2 = tamanho_menor_partes + (tamanho - 73)

        function almentar_container_pai() {
            container_pai.style.height = `${tamanho_menor_partes2}px`
            tamanho_menor_partes2 += tamanho_menor_partes

            if(tamanho_menor_partes2 < tamanho) {
                setTimeout(() => {
                    almentar_container_pai()
                }, 50)
            }
        } almentar_container_pai()
    
        setTimeout(() => {
            document.querySelectorAll('.musica_resulmo').forEach(element => {
                if (!element.classList.contains('Animation_Nova_Musica_Fila')) {
                    element.classList.add('Animation_Nova_Musica_Fila')
                }

                if(!container_pai.querySelector('p').classList.contains('Animation_Nova_Musica_Fila')) {
                    container_pai.querySelector('p').classList.add('Animation_Nova_Musica_Fila')
                }
            })
        }, 600)

    } else {

        divs_encontradas.forEach(element => {
            if(element.id.replace("Musica_Fila_", "") == Lista[Indice].ID) {
                element.classList.remove('Animation_Nova_Musica_Fila')

                if(divs_encontradas.length == 1) {
                    container_pai.querySelector('p').classList.remove('Animation_Nova_Musica_Fila')
                }
                setTimeout(() => {
                    if(divs_encontradas.length == 1) {
                        container_pai.querySelector('p').style.position = 'absolute'
                    } else {
                        container_pai.querySelector('p').style.position = 'static'
                    }

                    tamanho = tamanho - element.offsetHeight
                    container_pai.style.height = `auto`;
                    element.style.height = '0px'
                    element.style.transition = '0.5s height ease-in-out'
                    element.style.padding = '0px'
    
                    setTimeout(() => {
                        container_pai.querySelector('p').style.position = 'static'
                        element.remove()
                        Atualizar_Fila()
                    }, 1000)
                }, 500)
            }
        })

        if(!Comando.includes('Não Remover Da Lista')) {
            if(Modo.includes('Próximas')) {
                Listas_Prox.Lista_Musicas.splice(Indice, 1)
            } else if(Modo.includes('Seguir')) {
                Listas_Prox.A_Seguir.splice(Indice, 1)
            }
        }
    }
}