function getParamsFromUrl(url) {
    const params = new URLSearchParams(new URL(url).search)
    const pageParam = params.get('Page')
    const [page, id_page] = pageParam ? pageParam.split('_') : [null, null]

    // Procurando o parâmetro "Convite"
    let convite = null
    for (let param of params.keys()) {
        if (param.startsWith('Convite_')) {
            convite = param.split('_')[1]
            break
        }
    }

    const musicId = params.get('Musica')

    return {
        page,
        id_page,
        musicId,
        convite
    }
}

//! Vai atualizar a URL
function atualizarURL(parametro, ID='') {
    ID = ID.replace(parametro, '')
    ID = ID.replace('_', '')

    if(ID != '') {
        ID = `_${ID}`
    }
    // Obtém a URL atual da página
    var url = window.location.href

    // Verifica se a URL já possui o parâmetro 'Page='
    if (url.indexOf('Page=') === -1) {
        // Se não tiver, adiciona o parâmetro à URL
        url += (url.indexOf('?') !== -1 ? '&' : '?') + 'Page=' + parametro
    } else {
        // Se já tiver, substitui o valor do parâmetro na URL
        url = url.replace(/(Page=)[^\&]+/, '$1' + `${parametro}${ID}`)
    }

    // Atualiza a URL sem recarregar a página
    window.history.pushState({path: url}, '', url)
}

let musica_carregada = false
function Recarregar_Infos_Url() {
    const url = window.location.href
    const { page, id_page, musicId, conviteID } = getParamsFromUrl(url)

    if(musicId != undefined && musicId != null && !musica_carregada) {
        musica_carregada = true
        //! Vai checar se a música da url tem na lista
        let memoria = JSON.parse(localStorage.getItem('Lista_De_Reproducao'))
        if(memoria) {
            let tem_na_lista = false

            let musica_ouvindo
            let new_lista_prox = {
                Nome_Album: '',
                MusicaAtual: {},
                Lista_Musicas: [],
                Indice: undefined,
                A_Seguir: [],
                Tocando: {
                    Nome: '',
                    ID: undefined
                }
            }

            for (let a = 0; a < memoria.A_Seguir.length; a++) {
                for (let c = 0; c < TodasMusicas.length; c++) {
                    if(memoria.A_Seguir[a] == TodasMusicas[c].ID) {
                        new_lista_prox.A_Seguir.push(TodasMusicas[c])
                        break
                    }
                }
            }

            for (let b = 0; b < memoria.Lista_Musicas.length; b++) {
                for (let c = 0; c < TodasMusicas.length; c++) {
                    if(memoria.Lista_Musicas[b] == TodasMusicas[c].ID) {
                        new_lista_prox.Lista_Musicas.push(TodasMusicas[c])
                        break
                    }
                }
            }
            
            for (let c = 0; c < TodasMusicas.length; c++) {
                if(TodasMusicas[c].ID == musicId) {
                    musica_ouvindo = TodasMusicas[c]
                    break
                }
            }

            for (let c = 0; c < new_lista_prox.A_Seguir.length; c++) {
                if(new_lista_prox.A_Seguir[c].ID == musicId) {
                    tem_na_lista = true
                    break
                }
            }

            for (let c = 0; c < new_lista_prox.Lista_Musicas.length; c++) {
                if(new_lista_prox.Lista_Musicas[c].ID == musicId) {
                    tem_na_lista = true
                    break
                }
            }

            if(musica_ouvindo != undefined && musica_ouvindo != null) {
                setTimeout(() => {
                    if(!tem_na_lista) {
                        Tocar_Musica([musica_ouvindo], musica_ouvindo, 'Pausar')
                    } else {
                        Listas_Prox = new_lista_prox
                        Listas_Prox.Lista_Musicas = new_lista_prox.Lista_Musicas.reverse()
                        Listas_Prox.A_Seguir = new_lista_prox.A_Seguir.reverse()
        
                        Tocar_Musica(Listas_Prox.Lista_Musicas, musica_ouvindo, 'Pausar')
                    }
                }, 1000)
            }
        }
    }

    if(page != null && page != undefined) {
        if(page == 'perfil') {
            for (let c = 0; c < Todos_Usuarios.length; c++) {
                if(Todos_Usuarios[c].ID == id_page) {
                    Carregar_Perfil(Todos_Usuarios[c])
                    break
                }
            }

        } else if(page == 'artista') {
            for (let c = 0; c < TodasMusicas.length; c++) {
                if(TodasMusicas[c].ID == id_page) {
                    Abrir_Perfil_Artista(Separar_Por_Virgula(TodasMusicas[c].Autor)[0], TodasMusicas[c])
                    break
                }
            }

        } else if(page == 'musicascurtidas') {
            Abrir_Pagina('musicascurtidas', `musicascurtidas_${id_page}`)

        }  else if(page == 'meuperfil') {
            Abrir_Pagina('meuperfil', `meuperfil_${id_page}`)

        } else if(page == 'verletra') {

            function Checar() {
                if(document.getElementById('container_barra_musica').style.bottom == '8px') {
                    Abrir_Ver_Letra_PC(id_page)
                } else {
                    setTimeout(() => {
                        Checar()
                    }, 300)
                }
            } Checar()

        } else if(page == 'biblioteca') {
            Abrir_Pagina('biblioteca') 
        } else if(page == 'aceitarmatch') {
            Abrir_Pagina('aceitarmatch', id_page) 
        } else if(page == 'criarmatch') {
            Abrir_Pagina('criarmatch') 
        } else if(page == 'match') {
            Abrir_Pagina('match', id_page) 
        } else if(page == 'criarplaylist') {
            if(id_page) {
                Editando_Playlist = true
                
                let user_participante = false
                let playlist_econtrada

                for (let c = 0; c < TodasPlaylists.length; c++) {
                    if(TodasPlaylists[c].ID == id_page) {
                        if(User.ID == TodasPlaylists[c].Admin) {
                            user_participante = true
                            playlist_econtrada = Object.assign({}, TodasPlaylists[c])
                            break
                        } else {
                            for (let b = 0; b < TodasPlaylists[c].Colaboradores.length; b++) {
                                if(User.ID == TodasPlaylists[c].Colaboradores[b]) {
                                    user_participante = true
                                    playlist_econtrada = Object.assign({}, TodasPlaylists[c])
                                    break
                                }
                            }
                        }
                    }
                }

                if(user_participante) {
                    Abrir_Pagina('criarplaylist', id_page)
                    Nova_Playlist = playlist_econtrada
                    Carregar_Editar_Playlist()
                } else {
                    Abrir_Pagina('criarplaylist')
                }
            }

        } else if(page == 'playlist') {
            Abrir_Pagina('playlist', id_page)
        } else if(page == 'aceitarplaylist') {
            Abrir_Pagina('aceitarplaylist', id_page)
        } else if(page == 'adicionartraducao') {
            Abrir_Pagina('meuperfil', `meuperfil_${User.ID}`)
        } else if(page == 'adicionarletra') {
            Abrir_Pagina('meuperfil', `meuperfil_${User.ID}`)
        } else {
            let Pode_Salvar_Pagina = true
            for (let c = 0; c < Paginas_Nao_Salvar_No_Historico.length; c++) {
                if(page == Paginas_Nao_Salvar_No_Historico[c]) {
                    Pode_Salvar_Pagina = false
                    break
                }
            }

            if(Pode_Salvar_Pagina) {
                Abrir_Pagina(page, id_page)
            }
        }
    }
}

//! Vai atualizar a URL Adicionando a música
function atualizarURL_add_Musica(ID) {
    var url = window.location.href

    if (url.indexOf('Musica=') === -1) {
        url += (url.indexOf('?') !== -1 ? '&' : '?') + 'Musica=' + ID
    } else {
        url = url.replace(/(Musica=)[^\&]+/, '$1' + ID)
    }

    window.history.pushState({path: url}, '', url)
}

function Copiar_Para_Area_Tranferencia(Link=undefined) {
    if(Link != undefined) {
        navigator.clipboard.writeText(Link).then(function() {

            var notification = document.getElementById('copyNotification')
            notification.classList.add('show')
    
            setTimeout(function() {
                notification.classList.remove('show')
            }, 3000)
        }, function(err) {
            console.error('Erro ao copiar o link: ', err)
        })
    }
}