//! Organizar por ordem dos vistos e não por ordem de seguidos
function Carreagr_Artistas_Seguindo() {
    document.getElementById('container_artistas_seguindo').innerHTML = ''
    let lista_seguindo = []

    for (let c = 0; c < TodosMatchs.length; c++) {
        for (let b = 0; b < TodosMatchs[c].Participantes.length; b++) {
            if(TodosMatchs[c].Participantes[b].ID == User.ID) {
                lista_seguindo.push(TodosMatchs[c])
                break
            }
        }
    }

    for (let c = 0; c < TodasPlaylists.length; c++) {
        if(TodasPlaylists[c].Admin == User.ID) {
            lista_seguindo.push(TodasPlaylists[c])
            
        } else {
            for (let b = 0; b < TodasPlaylists[c].Colaboradores.length; b++) {
                if(TodasPlaylists[c].Colaboradores[b] == User.ID) {
                    lista_seguindo.push(TodasPlaylists[c])
                    break
                }
            }
        }
    }

    lista_seguindo.push(...User.Social.Artistas)
    lista_seguindo.push(...User.Social.Seguindo)
    lista_seguindo = [...organizarPorDataDescendente(lista_seguindo)]

    for (let c = 0; c < lista_seguindo.length; c++) {
        if(lista_seguindo[c].Email != undefined) {

        } else if(lista_seguindo[c].Participantes != undefined) {
            Match_Seguindo(lista_seguindo[c])            

        } else if(lista_seguindo[c].Colaboradores != undefined) {
            Playlist_Seguindo(lista_seguindo[c])

        } else {
            //? Caso for um artista
            Artistas_Seguindo(lista_seguindo[c].Autor)
        }
    }
}

function Match_Seguindo(Match_Carregar) {
    const container_item_biblioteca = document.createElement('li')
    const container_img_match_item_biblioteca = document.createElement('div')
    const container_container_header_match = document.createElement('div')
    const container_esferas = document.createElement('div')
    const p_match = document.createElement('p')
    const traco_match = document.createElement('div')

    container_container_header_match.className = 'container_container_header_match'
    container_esferas.className = 'container_esferas'
    traco_match.className = 'traco_match'
    container_item_biblioteca.classList.add('container_item_biblioteca')
    container_item_biblioteca.classList.add('container_item_biblioteca_match')
    container_img_match_item_biblioteca.classList.add('container_img_match_item_biblioteca')

    let cor_adm
    let array_participantes = []
    for (let c = 0; c < Match_Carregar.Participantes.length; c++) {
        const esfera = document.createElement('div')
        esfera.className = 'esferas'
        esfera.style.background = Match_Carregar.Participantes[c].Cor
        container_esferas.appendChild(esfera)

        if(Match_Carregar.Participantes[c].ID == Match_Carregar.Admin) {
            cor_adm = Match_Carregar.Participantes[c].Cor
        }

        for (let a = 0; a < Todos_Usuarios.length; a++) {
            if(Todos_Usuarios[a].ID == Match_Carregar.Participantes[c].ID) {
                array_participantes.push(Todos_Usuarios[a])
                break
            }
        }
    }

    container_img_match_item_biblioteca.style.background = Match_Carregar.Background
    traco_match.style.background = cor_adm

    p_match.innerHTML = 'Match'

    container_container_header_match.appendChild(container_esferas)
    container_container_header_match.appendChild(p_match)
    container_container_header_match.appendChild(traco_match)
    container_img_match_item_biblioteca.appendChild(container_container_header_match)
    container_item_biblioteca.appendChild(container_img_match_item_biblioteca)
    document.getElementById('container_artistas_seguindo').appendChild(container_item_biblioteca)

    container_item_biblioteca.addEventListener('click', () => {
        Abrir_Pagina('match', Match_Carregar.ID)
    })
}

function Artistas_Seguindo(Autor) {
    let musica_mais_view = Retornar_Musicas_Mais_View_Artista(Autor)[0]

    const container_item_biblioteca = document.createElement('li')
    const container_img_item_biblioteca = document.createElement('div')
    const img = document.createElement('img')

    container_item_biblioteca.classList.add('container_item_biblioteca')
    container_item_biblioteca.classList.add('container_item_biblioteca_artista')
    container_img_item_biblioteca.classList.add('container_img_item_biblioteca')
    container_item_biblioteca.style.borderRadius = '50%'
    container_item_biblioteca.style.overflow = 'hidden'
    container_item_biblioteca.style.width = '47px'
    container_item_biblioteca.style.height = '47px'
    img.style.width = '100%'
    img.style.height = '100%'

    img.src = musica_mais_view.Img

    container_img_item_biblioteca.appendChild(img)
    container_item_biblioteca.appendChild(container_img_item_biblioteca)
    document.getElementById('container_artistas_seguindo').appendChild(container_item_biblioteca)

    container_item_biblioteca.addEventListener('click', () => {
        Abrir_Perfil_Artista(Autor, musica_mais_view)
    })

    container_item_biblioteca.addEventListener('contextmenu', (event) => {
        Ativar_Opcoes_Click_Direita('Artista', [musica_mais_view], 0, Autor, musica_mais_view.ID)
        posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
    })
}

function Playlist_Seguindo(Playlist_Carregar) {
    for (let c = 0; c < Playlist_Carregar.Musicas.length; c++) {
        for (let b = 0; b < TodasMusicas.length; b++) {
            if(TodasMusicas[b].ID == Playlist_Carregar.Musicas[c]) {
                Playlist_Carregar.Musicas[c] = TodasMusicas[b]
            }
        }
    }

    const container_playlist = document.createElement('li')
    const container_img_playlist_playlist = document.createElement('div')
    const img_so = document.createElement('img')

    container_playlist.classList.add('container_playlist')
    container_playlist.classList.add('container_playlist_playlist')
    container_img_playlist_playlist.classList.add('container_img_playlist_playlist')

    if(Playlist_Carregar.Img != null) {
        img_so.src = Playlist_Carregar.Img
        container_img_playlist_playlist.appendChild(img_so)

    } else if(Playlist_Carregar.Musicas.length <= 3) {
        img_so.src = Playlist_Carregar.Musicas[0].Img
        container_img_playlist_playlist.appendChild(img_so)

    } else {

        for (let b = 0; b < 4; b++) {
            const img = document.createElement('img')
            img.src = Playlist_Carregar.Musicas[b].Img
            container_img_playlist_playlist.classList.add('active')
            container_img_playlist_playlist.appendChild(img)
        }
    }

    container_playlist.appendChild(container_img_playlist_playlist)
    document.getElementById('container_artistas_seguindo').appendChild(container_playlist)

    container_playlist.addEventListener('click', () => {
        Abrir_Pagina('playlist', Playlist_Carregar.ID)
    })
}

function Retornar_User_Seguindo(Email) {
    for (let c = 0; c < Todos_Usuarios.length; c++) {
        if(Todos_Usuarios[c].Email == Email) {
            const div_container_perfil_usuario = document.createElement('div')
            const div_container_img = document.createElement('div')
            const img = document.createElement('img')
            const div_container_texto = document.createElement('div')
            const nome_user = document.createElement('p')
            const span = document.createElement('span')

            //! Classes
            div_container_perfil_usuario.classList.add('container_artista_caixa')
            div_container_perfil_usuario.classList.add('div_container_perfil_usuario_historico')
            div_container_img.className = 'div_container_img_historico'
            div_container_texto.className = 'div_container_texto_historico'

            //! Valores
            nome_user.innerText = Todos_Usuarios[c].Nome
            span.innerText = 'Perfil'
            img.src = Todos_Usuarios[c].Perfil.Img_Perfil

            //! AppendChild
            div_container_img.appendChild(img)
            div_container_texto.appendChild(span)
            div_container_texto.appendChild(nome_user)
            div_container_perfil_usuario.appendChild(div_container_img)
            div_container_perfil_usuario.appendChild(div_container_texto)
            
            div_container_perfil_usuario.addEventListener('click', () => {
                Carregar_Perfil(Todos_Usuarios[c])
            })

            div_container_perfil_usuario.addEventListener('contextmenu', (event) => {
                Ativar_Opcoes_Click_Direita('Perfil', TodasMusicas[0], undefined, undefined, undefined, Todos_Usuarios[c].ID)
                posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
            })

            return div_container_perfil_usuario
        }
    }
}