function Abrir_PLaylistMix(Array, Nome, svg) {
    let new_array = [...Array]

    document.getElementById('container_svg_mix_daily').style.display = 'flex'
    document.getElementById('nome_mix_playlistmix').innerText = Nome
    document.getElementById('contaier_svg_playlistmix').innerHTML = svg
    document.getElementById('nome_playlistmix').innerText = Nome
    document.getElementById('img_da_playlistmix').src = new_array[new_array.length - 1].Img
    document.getElementById('p_infos_playlistmix').innerText = `Feito para ${User.Nome}`

    const container_header_img_playlistmix = document.getElementById('container_header_img_playlistmix')
    const container_imgs_playlist_zoom = document.getElementById('container_imgs_playlist_zoom')
    container_imgs_playlist_zoom.innerHTML = container_header_img_playlistmix.cloneNode(true).innerHTML
    container_imgs_playlist_zoom.className = 'active_daily'

    somarTempos(new_array).then((Tempo) => {
        let resultado = ''

        if(Tempo.Horas > 0) {
            resultado += `${Tempo.Horas} horas`
        }

        if(Tempo.Minutos > 0) {
            if(resultado != '') {
                resultado += `, ${Tempo.Minutos} min`

            } else {
                resultado += `${Tempo.Minutos} min`
            }
        }

        if(Tempo.Segundos > 0) {
            if(resultado != '') {
                resultado += ` e ${Tempo.Segundos} s`

            } else {
                resultado += `${Tempo.Segundos} s`
            }
        }

        let name_msuicas = 'músicas'
        if(new_array.length == 1) {
            name_msuicas = 'música'
        }
        document.getElementById('p_infos_playlistmix').innerHTML += ` - <span id="quantidade_Playlist_Aberta.Musicas_daily">${new_array.length} ${name_msuicas}, ${resultado}</span>`
    })

    Retornar_Musica_Linha(new_array.reverse(), document.getElementById('container_playlistmix'), null, 'PlaylistMix')
    Abrir_Pagina('playlistmix', `${formatarString(Nome)}-${new_array[new_array.length - 1].ID}`)
    Trocar_Background(new_array[0].Img, document.body)
}

const img_play_playlistmix = document.getElementById('img_play_playlistmix')
img_play_playlistmix.addEventListener('click', () => {
    Listas_Prox.Tocando.Nome = 'PlaylistMix'
    Listas_Prox.Tocando.ID = Pagina_Atual.ID
    Tocar_Musica(Arraay_PlaylistMix, Arraay_PlaylistMix[0], '', undefined, 'PlaylistMix')
})

//! --------------------------------- Abrir Playlist ----------------------------------------
let Musicas_Pesquisa_Playlist = []
let Playlist_Aberta
let Musicas_Playlist_Aberta = []
function Abrir_Playlist(ID_PLaylist) {
    Musicas_Playlist_Aberta = []
    let Playlist
    let musicas_playlist = []
    for (let c = 0; c < TodasPlaylists.length; c++) {
        if(TodasPlaylists[c].ID == ID_PLaylist) {
            Playlist = Object.assign({}, TodasPlaylists[c])
            break
        }
    }

    let Participantes_PLaylist = []
    for (let c = 0; c < Playlist.Colaboradores.length; c++) {
        for (let b = 0; b < Todos_Usuarios.length; b++) {
            if(Todos_Usuarios[b].ID == Playlist.Colaboradores[c]) {
                Participantes_PLaylist.push(Todos_Usuarios[b])
                break
            }
        }
    }

    for (let b = 0; b < Todos_Usuarios.length; b++) {
        if(Todos_Usuarios[b].ID == Playlist.Admin) {
            Participantes_PLaylist.push(Todos_Usuarios[b])
            break
        }
    }

    let user_faz_parte_playlist = false
    for (let c = 0; c < Participantes_PLaylist.length; c++) {
        if(User.ID == Participantes_PLaylist[c].ID) {
            user_faz_parte_playlist = true
            break
        }
    }

    if(!user_faz_parte_playlist) {
        document.getElementById('btn_config_match').style.display = 'none'
        document.getElementById('opcoes_click_direito').style.display = 'none'
    }

    if(Playlist.Estado == 'Particular' && user_faz_parte_playlist || Playlist.Estado == 'Pública') {
    
        for (let b = 0; b < Playlist.Musicas.length; b++) {
            for (let c = 0; c < TodasMusicas.length; c++) {
                if(TodasMusicas[c].ID == Playlist.Musicas[b].ID_Musica) {
                    musicas_playlist.push(TodasMusicas[c])
                    break
                }
            }
        }
    
        Playlist_Aberta = Playlist
    
    
        const container_imgs_criar_playlist_page = document.getElementById('container_imgs_criar_playlist_page')
        const container_imgs_playlist_zoom = document.getElementById('container_imgs_playlist_zoom')
        const estado_playlist_page_criar_playlist_page = document.getElementById('estado_playlist_page_criar_playlist_page')
        const nome_playlist_page = document.getElementById('nome_playlist_page')
        const desc_playlist_page_criar_playlist_page = document.getElementById('desc_playlist_page_criar_playlist_page')
        const container_imgs_header_playlist_page = document.getElementById('container_imgs_header_playlist_page') //? Imgs Colaboradores
        const nomes_colaboradores_playlist_page = document.getElementById('nomes_colaboradores_playlist_page')
    
        estado_playlist_page_criar_playlist_page.innerText = 'Playlist ' + Playlist.Estado
        nome_playlist_page.innerText = Playlist.Nome
        desc_playlist_page_criar_playlist_page.innerText = Playlist.Descricao
    
        Participantes_PLaylist.reverse()
        let nomes_participantes_playlist_page = ''
        container_imgs_header_playlist_page.innerHTML = ''
        let z_index_imgs = Participantes_PLaylist.length
        for (let c = 0; c < Participantes_PLaylist.length; c++) {
            const img = document.createElement('img')
            img.src = Participantes_PLaylist[c].Perfil.Img_Perfil
            img.style.zIndex = z_index_imgs
            container_imgs_header_playlist_page.appendChild(img)
            z_index_imgs--
    
            if(c + 1 > Participantes_PLaylist.length && Participantes_PLaylist.length > 1) {
                nomes_participantes_playlist_page += 'e ' + Participantes_PLaylist[c].Nome
            } else {
                if(Participantes_PLaylist.length > 1) {
                    nomes_participantes_playlist_page += Participantes_PLaylist[c].Nome + ', '
                } else {
    
                    nomes_participantes_playlist_page += Participantes_PLaylist[c].Nome
                }
            }
        }
    
        nomes_colaboradores_playlist_page.innerText = nomes_participantes_playlist_page
    
        //! Carregar as imgs
        container_imgs_criar_playlist_page.innerHTML =  ''
        container_imgs_playlist_zoom.innerHTML =  ''
        if(Playlist.Img != null) {
            container_imgs_criar_playlist_page.classList.remove('active')
            container_imgs_playlist_zoom.className = ''
            const img = document.createElement('img')
            const img2 = document.createElement('img')
            img.src = Playlist.Img
            img2.src = Playlist.Img
            container_imgs_criar_playlist_page.appendChild(img)
            container_imgs_playlist_zoom.appendChild(img2)
    
        } else if(Playlist.Musicas.length <= 3) {
            container_imgs_criar_playlist_page.classList.remove('active')
            container_imgs_playlist_zoom.className = 'active'
            const img = document.createElement('img')
            const img2 = document.createElement('img')
            img.src = musicas_playlist[0].Img
            img2.src = musicas_playlist[0].Img
            container_imgs_criar_playlist_page.appendChild(img)
            container_imgs_playlist_zoom.appendChild(img2)
    
        } else {
    
            for (let b = 0; b < 4; b++) {
                const img = document.createElement('img')
                const img2 = document.createElement('img')
                img.src = musicas_playlist[b].Img
                img2.src = musicas_playlist[b].Img
                container_imgs_criar_playlist_page.classList.add('active')
                container_imgs_playlist_zoom.className = 'active'
                container_imgs_criar_playlist_page.appendChild(img)
                container_imgs_playlist_zoom.appendChild(img2)
            }
        }
    
        somarTempos(musicas_playlist).then((Tempo) => {
            let resultado = ''
    
            if(Tempo.Horas > 0) {
                resultado += `${Tempo.Horas} horas`
            }
    
            if(Tempo.Minutos > 0) {
                if(resultado != '') {
                    resultado += `, ${Tempo.Minutos} min`
    
                } else {
                    resultado += `${Tempo.Minutos} min`
                }
            }
    
            if(Tempo.Segundos > 0) {
                if(resultado != '') {
                    resultado += ` e ${Tempo.Segundos} s`
    
                } else {
                    resultado += `${Tempo.Segundos} s`
                }
            }
    
            let name_msuicas = 'músicas'
            if(musicas_playlist.length == 1) {
                name_msuicas = 'música'
            }
    
            const infos_musica_page_playlist = document.getElementById('infos_musica_page_playlist')
            infos_musica_page_playlist.innerHTML = ` - ${musicas_playlist.length} ${name_msuicas}, ${resultado}`
        })

        for (let c = 0; c < Playlist.Musicas.length; c++) {
            for (let b = 0; b < TodasMusicas.length; b++) {
                if(TodasMusicas[b].ID == Playlist.Musicas[c].ID_Musica) {
                    for (let a = 0; a < Todos_Usuarios.length; a++) {
                        if(Todos_Usuarios[a].ID == Playlist.Musicas[c].Adicionada_Por) {
                            const new_obj = {
                                User: Todos_Usuarios[a],
                                Musica: TodasMusicas[b]
                            }
                            Musicas_Playlist_Aberta.push(new_obj)
                            break
                        }
                    }
                    break
                }
            }
        }
    
        Musicas_Pesquisa_Playlist = [...Musicas_Playlist_Aberta]

        Retornar_Musicas_Playlist(Playlist.ID, document.getElementById('container_musicas_playlist_page'))
    } else {
        Notificar_Infos('🔒 Esta playlist é particular. Você não tem permissão para visualizá-la. Entre em contato com o administrador para solicitar acesso. 🎶')
        Abrir_Pagina('home')
    }
}

function Retornar_Musicas_Playlist(ID_Playlist, Local, ArrayMusicas=undefined) {
    Local.innerHTML = ''
    let Musicas_Playlist = []
    let Playlist

    //! Vai pegar todas as informações necessárias da playlist como as música e quem postou
    for (let c = 0; c < TodasPlaylists.length; c++) {
        if(TodasPlaylists[c].ID == ID_Playlist) {
            Playlist = TodasPlaylists[c]
            for (let d = 0; d < TodasPlaylists[c].Musicas.length; d++) {
                for (let e = 0; e < TodasMusicas.length; e++) {
                    if(TodasMusicas[e].ID == TodasPlaylists[c].Musicas[d].ID_Musica) {
                        for (let f = 0; f < Todos_Usuarios.length; f++) {
                            if(Todos_Usuarios[f].ID == TodasPlaylists[c].Musicas[d].Adicionada_Por) {
                                const new_obj = {
                                    User: Todos_Usuarios[f],
                                    Musica: TodasMusicas[e]
                                }
                                Musicas_Playlist.push(new_obj)
                                break
                            }
                        }
                        break
                    }
                }
            }
            break
        }
    }

    if(ArrayMusicas != undefined) {
        for (let c = 0; c < ArrayMusicas.length; c++) {
            for (let b = 0; b < Musicas_Playlist.length; b++) {
                if(ArrayMusicas[c].ID == Musicas_Playlist[b].Musica.ID) {
                    ArrayMusicas[c] = {
                        User: Musicas_Playlist[b].User,
                        Musica: Musicas_Playlist[b].Musica
                    }
                    break
                }
            }
        }
        
        Musicas_Playlist = [...ArrayMusicas]
    }

    //! Vai construir as música na tela
    for (let c = Musicas_Playlist.length - 1; c >= 0 ; c--) {
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
        const container_img_perfil = document.createElement('div')
        const img_perfil = document.createElement('img')

        //! Classes
        musica_linha.classList.add('musica_linha')
        musica_linha.classList.add('Musica_Linha_' + Musicas_Playlist[c].Musica.ID)
        primeira_parte_musica_linha.className = 'primeira_parte_musica_linha'
        texto_musica_linha.className = 'texto_musica_linha'
        segunda_parte_musica_linha.className = 'segunda_parte_musica_linha'
        img.className = 'Img_musica_linha'
        p.className = 'Nome_musica_linha'
        p_contador.className = 'p_contador_musica_curtida'
        like.className = 'like_musicas_linha icone'
        views.className = 'Views_Musica_Linha'
        span.className = 'Autor_Musica_Linha'
        container_img_perfil.className = 'container_img_perfil_musica_linha_match'
        img_perfil.className = 'img_perfil_playlist'

        //! Valores
        img.src = Musicas_Playlist[c].Musica.Img
        p.innerText = Musicas_Playlist[c].Musica.Nome
        span.appendChild(Retornar_Artistas_Da_Musica(Musicas_Playlist[c].Musica))
        p_contador.innerText = c + 1
        img_perfil.src = Musicas_Playlist[c].User.Perfil.Img_Perfil
        container_img_perfil.title = `Adicionada por ${Musicas_Playlist[c].User.Nome}`

        if(Musicas_Playlist[c].Musica.Views <= 0) {
            views.style.display = 'none'

        } else {
            views.innerText = Musicas_Playlist[c].Musica.Views
        }

        Curtir_Musica_Descurtir(Musicas_Playlist[c].Musica, like, 'Checar')

        const audio = new Audio(Musicas_Playlist[c].Musica.Audio)

        obterDuracaoOuTempoAtualAudio(audio, true).then((resp) => {
            tempo.innerText = resp.formattedDuration
        })


        //! AppendChild
        primeira_parte_musica_linha.appendChild(p_contador)

        primeira_parte_musica_linha.appendChild(img)
        texto_musica_linha.appendChild(p)
        texto_musica_linha.appendChild(span)
        primeira_parte_musica_linha.appendChild(texto_musica_linha)

        segunda_parte_musica_linha.appendChild(like)
        segunda_parte_musica_linha.appendChild(tempo)
        container_img_perfil.appendChild(img_perfil)
        segunda_parte_musica_linha.appendChild(container_img_perfil)
        musica_linha.appendChild(primeira_parte_musica_linha)
        musica_linha.appendChild(views)
        musica_linha.appendChild(segunda_parte_musica_linha)
        Local.appendChild(musica_linha)

        if(User.Configuracoes.Tema == 'Escuro') {
            mudarTemaParaEscuro()
        }

        //! Funções de click
        like.addEventListener('click', () => {
            let Musicas_Recebidas = []

            for (let c = 0; c < Musicas_Playlist.length; c++) {
                for (let b = 0; b < TodasMusicas.length; b++) {
                    if(Musicas_Playlist[c].Musica.ID == TodasMusicas[b].ID) {
                        Musicas_Recebidas.push(TodasMusicas[b])
                        break
                    }
                }
            }
            Curtir_Musica_Descurtir(Musicas_Recebidas[c], like)
        })

        container_img_perfil.addEventListener('click', () => {
            const user_playlist = Musicas_Playlist[c].User
            for (let c = 0; c < Todos_Usuarios.length; c++) {
                if(Todos_Usuarios[c].ID == user_playlist.ID) {
                    Carregar_Perfil(Todos_Usuarios[c])
                    break
                }
            }
        })

        musica_linha.addEventListener('click', (e) => {
            let Musicas_Recebidas = []

            for (let c = Musicas_Pesquisa_Playlist.length - 1; c >= 0; c--) {
                for (let b = 0; b < TodasMusicas.length; b++) {
                    if(Musicas_Playlist[c].Musica.ID == TodasMusicas[b].ID) {
                        Musicas_Recebidas.push(TodasMusicas[b])
                        break
                    }
                }
            }
            let el = e.target.className

            if(el != 'span_nomes_artistas' && el != 'like_musicas_linha' && el != 'btn_editar_musica' && el != 'btn_trash' && el != 'img_trash' && el != 'img_pen' && el != 'img_mic_editar' && el != 'btn_letra_editar' && el != 'bnt_carrinho_editar' && el != 'img_carrinho_editar' && el != 'container_img_perfil' && el != 'img_perfil_playlist') {
                User_Tocando_Agora = undefined

                Listas_Prox.Tocando.Nome = 'Playlist'
                Listas_Prox.Tocando.ID = Playlist.ID

                Tocar_Musica(Musicas_Recebidas, Musicas_Playlist[c].Musica, '', Playlist.ID, 'Playlist', `Playlist - ${Playlist.Nome}`)
                Listas_Prox.Nome_Album = `Playlist - ${Playlist.Nome}`
            }
        })

        musica_linha.addEventListener('contextmenu', (event) => {
            let Musicas_Recebidas = []

            for (let c = 0; c < Musicas_Playlist.length; c++) {
                for (let b = 0; b < TodasMusicas.length; b++) {
                    if(Musicas_Playlist[c].Musica.ID == TodasMusicas[b].ID) {
                        Musicas_Recebidas.push(TodasMusicas[b])
                        break
                    }
                }
            }

            Ativar_Opcoes_Click_Direita('Músicas Linha', Musicas_Recebidas[c], c)
            posicionarElemento(event, document.getElementById('opcoes_click_direito'))
        })
    }
}

const img_play_playlist_page = document.getElementById('img_play_playlist_page')
img_play_playlist_page.addEventListener('click', () => {
    let new_array = []

    for (let c = Musicas_Pesquisa_Playlist.length - 1; c >= 0; c--) {
        for (let b = 0; b < TodasMusicas.length; b++) {
            if(Musicas_Pesquisa_Playlist[c].Musica.ID == TodasMusicas[b].ID) {
                new_array.push(TodasMusicas[b])
                break
            }
        }
    }

    Listas_Prox.Tocando.Nome = 'Playlist'
    Listas_Prox.Tocando.ID = Pagina_Atual.ID
    Tocar_Musica(new_array, new_array[0], '', Pagina_Atual.ID, 'playlist', Playlist_Aberta.Nome)
})

function Pesquisar_Musica_Playlist_Page(Pesquisa) {
    let pesquisa_formadata = formatarString(Pesquisa)

    let array_musicas_encontradas = []

    if(pesquisa_formadata.trim() != '') {
        for (let c = 0; c < Musicas_Playlist_Aberta.length; c++) {
            let nome = formatarString(Musicas_Playlist_Aberta[c].Musica.Nome)
            let autor = formatarString(Musicas_Playlist_Aberta[c].Musica.Autor)
            let genero = formatarString(Musicas_Playlist_Aberta[c].Musica.Genero)

            if(pesquisa_formadata.includes(nome) || pesquisa_formadata.includes(autor) || pesquisa_formadata.includes(genero) || nome.includes(pesquisa_formadata) || autor.includes(pesquisa_formadata) || genero.includes(pesquisa_formadata)) {
                array_musicas_encontradas.push(Musicas_Playlist_Aberta[c])
            }
        }

        Musicas_Pesquisa_Playlist = array_musicas_encontradas
        Retornar_Musicas_Playlist(Playlist_Aberta.ID, document.getElementById('container_musicas_playlist_page'), Musicas_Pesquisa_Playlist)
    } else {
        Musicas_Pesquisa_Playlist = [...Musicas_Playlist_Aberta]
        Retornar_Musicas_Playlist(Playlist_Aberta.ID, document.getElementById('container_musicas_playlist_page'), Musicas_Pesquisa_Playlist)
    }
}


const btn_config_playlist_page = document.getElementById('btn_config_playlist_page')

btn_config_playlist_page.addEventListener('click', (event) => {
    let oq_o_user_e = 'Visitante'
    if(User.ID == Playlist_Aberta.Admin) {
        oq_o_user_e = 'Admin'

    } else {
        for (let c = 0; c < Playlist_Aberta.Colaboradores.length; c++) {
            if(Playlist_Aberta.Colaboradores[c] == User.ID) {
                oq_o_user_e = 'Colaboradores'
                break
            }
        }
    }

    if(oq_o_user_e == 'Admin') {
        Ativar_Opcoes_Click_Direita('Playlist Admin', Musicas_Playlist_Aberta[0].Musica, 0)
        posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)

    } else if(oq_o_user_e == 'Colaboradores') {
        Ativar_Opcoes_Click_Direita('Playlist Colaboradores', Musicas_Playlist_Aberta[0].Musica, 0)
        posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)

    } else {
        Ativar_Opcoes_Click_Direita('Playlist Visitante', Musicas_Playlist_Aberta[0].Musica, 0)
        posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)

    }
})

function Abrir_Zoom_Img_Playlist() {
    const container = document.getElementById('container_img_zoom_playlist')
    container.style.display = 'flex'

    // Adiciona uma pequena pausa para garantir que o display flex tenha sido aplicado antes de iniciar a animação
    setTimeout(() => {
        container.classList.add('active')
    }, 10)
}

function Fechar_Zoom_Img_Playlist() {
    const container = document.getElementById('container_img_zoom_playlist')
    container.classList.remove('active')

    setTimeout(() => {
        container.style.display = 'none'
    }, 500)
}

//! Vai atualizar as playlist assim que alguém fizer alguma alteração

function listenToPlaylists() {
    db.collection('Playlists').onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        TodasPlaylists = doc.data().Playlists
      })
    
        //! Vai checar se a playlist atualizada está aberta e vai atualiza-la na tela
        if(Playlist_Aberta != undefined) {
            for (let c = 0; c < TodasPlaylists.length; c++) {
                if(TodasPlaylists[c].ID == Playlist_Aberta.ID) {

                    if(objetosDiferentes(TodasPlaylists[c], Playlist_Aberta)) {
                        Abrir_Pagina('playlist', Playlist_Aberta.ID)
                    }
                    break
                }
            }
        }
    })
} listenToPlaylists()
  