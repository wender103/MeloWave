function Abrir_PLaylistMix(Array, Nome, svg) {
    let new_array = [...Array]

    document.getElementById('container_svg_mix_daily').style.display = 'flex'
    document.getElementById('nome_mix_playlistmix').innerText = Nome
    document.getElementById('contaier_svg_playlistmix').innerHTML = svg
    document.getElementById('nome_playlistmix').innerText = Nome
    document.getElementById('img_da_playlistmix').src = new_array[new_array.length - 1].Img
    document.getElementById('p_infos_playlistmix').innerText = `Feito para ${User.Nome}`

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

//! --------------------------------- Abrir Playlist ----------------------------------------
let Pesquisa_Playlist = []
let Playlist_Aberta
function Abrir_Playlist(Playlist) {
    for (let c = 0; c < TodasPlaylists.length; c++) {
        if(TodasPlaylists[c].ID == Playlist) {
            Playlist = TodasPlaylists[c]
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

    if(Playlist.Estado == 'Particular' && user_faz_parte_playlist || Playlist.Estado == 'Pública') {
    
        for (let c = 0; c < TodasMusicas.length; c++) {
            for (let b = 0; b < Playlist.Musicas.length; b++) {
                if(TodasMusicas[c].ID == Playlist.Musicas[b]) {
                    Playlist.Musicas[b] = TodasMusicas[c]
                    break
                }
            }
        }
    
        Playlist_Aberta = Playlist
        Pesquisa_Playlist = [...Playlist_Aberta.Musicas]
    
    
        const container_imgs_criar_playlist_page = document.getElementById('container_imgs_criar_playlist_page')
        const container_imgs_playlist_zoom = document.getElementById('container_imgs_playlist_zoom')
        const estado_playlist_page_criar_playlist_page = document.getElementById('estado_playlist_page_criar_playlist_page')
        const nome_playlist_page = document.getElementById('nome_playlist_page')
        const desc_playlist_page_criar_playlist_page = document.getElementById('desc_playlist_page_criar_playlist_page')
        const container_imgs_header_playlist_page = document.getElementById('container_imgs_header_playlist_page') //? Imgs Colaboradores
        const nomes_colaboradores_playlist_page = document.getElementById('nomes_colaboradores_playlist_page')
        const infos_musica_playlist_page_criar = document.getElementById('infos_musica_playlist_page_criar')
    
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
            container_imgs_playlist_zoom.classList.remove('active')
            const img = document.createElement('img')
            const img2 = document.createElement('img')
            img.src = Playlist.Img
            img2.src = Playlist.Img
            container_imgs_criar_playlist_page.appendChild(img)
            container_imgs_playlist_zoom.appendChild(img2)
    
        } else if(Playlist.Musicas.length <= 3) {
            container_imgs_criar_playlist_page.classList.remove('active')
            container_imgs_playlist_zoom.classList.remove('active')
            const img = document.createElement('img')
            const img2 = document.createElement('img')
            img.src = Playlist.Musicas[0].Img
            img2.src = Playlist.Musicas[0].Img
            container_imgs_criar_playlist_page.appendChild(img)
            container_imgs_playlist_zoom.appendChild(img2)
    
        } else {
    
            for (let b = 0; b < 4; b++) {
                const img = document.createElement('img')
                const img2 = document.createElement('img')
                img.src = Playlist.Musicas[b].Img
                img2.src = Playlist.Musicas[b].Img
                container_imgs_criar_playlist_page.classList.add('active')
                container_imgs_playlist_zoom.classList.add('active')
                container_imgs_criar_playlist_page.appendChild(img)
                container_imgs_playlist_zoom.appendChild(img2)
            }
        }
    
        somarTempos(Playlist.Musicas).then((Tempo) => {
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
            if(Playlist.Musicas.length == 1) {
                name_msuicas = 'música'
            }
    
            const infos_musica_page_playlist = document.getElementById('infos_musica_page_playlist')
            infos_musica_page_playlist.innerHTML = ` - ${Playlist.Musicas.length} ${name_msuicas}, ${resultado}`
        })
    
        Retornar_Musica_Linha(Playlist.Musicas, document.getElementById('container_musicas_playlist_page'))
    } else {
        Notificar_Infos('🔒 Esta playlist é particular. Você não tem permissão para visualizá-la. Entre em contato com o administrador para solicitar acesso. 🎶')
        Abrir_Pagina('home')
    }
}

const img_play_playlist_page = document.getElementById('img_play_playlist_page')
img_play_playlist_page.addEventListener('click', () => {
    let new_array = [...Pesquisa_Playlist]
    new_array.reverse()
    Tocar_Musica(new_array, new_array[0], '', User.ID, 'playlist', Playlist_Aberta.Nome)
})

function Pesquisar_Musica_Playlist_Page(Pesquisa) {
    let pesquisa_formadata = formatarString(Pesquisa)

    let array_musicas_encontradas = []

    if(pesquisa_formadata.trim() != '') {
        for (let c = 0; c < Playlist_Aberta.Musicas.length; c++) {
            let nome = formatarString(Playlist_Aberta.Musicas[c].Nome)
            let autor = formatarString(Playlist_Aberta.Musicas[c].Autor)
            let genero = formatarString(Playlist_Aberta.Musicas[c].Genero)

            if(pesquisa_formadata.includes(nome) || pesquisa_formadata.includes(autor) || pesquisa_formadata.includes(genero) || nome.includes(pesquisa_formadata) || autor.includes(pesquisa_formadata) || genero.includes(pesquisa_formadata)) {
                array_musicas_encontradas.push(Playlist_Aberta.Musicas[c])
            }
        }

        Pesquisa_Playlist = array_musicas_encontradas
        Retornar_Musica_Linha(Pesquisa_Playlist, document.getElementById('container_musicas_playlist_page'))
    } else {
        Pesquisa_Playlist = [...Playlist_Aberta.Musicas]
        Retornar_Musica_Linha(Pesquisa_Playlist, document.getElementById('container_musicas_playlist_page'))
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
        Ativar_Opcoes_Click_Direita('Playlist Admin', Playlist_Aberta.Musicas[0], 0)
        posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)

    } else if(oq_o_user_e == 'Colaboradores') {
        Ativar_Opcoes_Click_Direita('Playlist Colaboradores', Playlist_Aberta.Musicas[0], 0)
        posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)

    } else {
        Ativar_Opcoes_Click_Direita('Playlist Visitante', Playlist_Aberta.Musicas[0], 0)
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