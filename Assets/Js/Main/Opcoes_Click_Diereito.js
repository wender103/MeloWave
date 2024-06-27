const opcoes2_click_direito = document.getElementById('opcoes2_click_direito')
let Is_Banir_Amigo_Playlist = false
function Ativar_Opcoes_Click_Direita(Modo, Musica, Indice, Artista_Seguir, ID_Artista, Perfil) {
    opcoes2_click_direito.style.display = 'none'
    //! ---------------- Uls ----------------------
    const opcoes_musica_ul = document.getElementById('opcoes_musica_ul')
    opcoes_musica_ul.innerHTML = ''

    const opcoes_fila_ul = document.getElementById('opcoes_fila_ul')
    opcoes_fila_ul.innerHTML = ''

    const opcoes_musica2_ul = document.getElementById('opcoes_musica2_ul')
    opcoes_musica2_ul.innerHTML = ''

    const opcoes_compartilhar_ul = document.getElementById('opcoes_compartilhar_ul')
    opcoes_compartilhar_ul.innerHTML = ''

    const ul1div2_opcs = document.getElementById('ul1div2_opcs')
    ul1div2_opcs.innerHTML = ''
    const ul2div2_opcs = document.getElementById('ul2div2_opcs')
    ul2div2_opcs.innerHTML = ''
    const ul3div2_opcs = document.getElementById('ul3div2_opcs')
    ul3div2_opcs.innerHTML = ''

    //! ---------------- Buttons ----------------------
    let Add_Playlist = `<li onclick="Adicionar_Playlist_Fila('${Musica.ID}')"><img src="Assets/Imgs/Plus_icos.svg"><p>Adicionar à playlist</p></li>`

    let Remover_Musica_Curtida = `<li onclick="Remover_Musica_Curtida_Opcoes_Click_Direito('${Musica.ID}', 'Fila')"><img src="Assets/Imgs/Like.svg"><p>Remover de Músicas Curtidas</p></li>`

    let Adicionar_Musica_Curtida = `<li onclick="Adicionar_Musica_Curtida_Opcoes_Click_Direito('${Musica.ID}', 'Fila')"><img src="Assets/Imgs/Like_Vazio.svg"><p>Adicionar à Músicas Curtidas</p></li>`

    let Add_Fila = `<li onclick="Adicionar_a_Fila('${Musica.ID}')"><img src="Assets/Imgs/Fila.svg"><p>Adicionar a fila</p></li>`
    let Add_Fila_Seguir = `<li onclick="Adicionar_a_Fila_Seguir('${Musica.ID}')"><img src="Assets/Imgs/Add_Fila.svg"><p>Adicionar a seguir</p></li>`

    let Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('${Modo}', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`

    let Ir_Para_Artista = `<li onclick="Ir_Para_Artista_Opcoes_Click_Direito('${Musica.ID}')"><img src="Assets/Imgs/Ir_Para_Artista.svg"><p>Ir para  o artista</p></li>`

    let About = `<li onclick="Abrir_Creditos('${Musica.ID}')"><img src="Assets/Imgs/About.png"><p>Ver creditos</p></li>`

    let Share = `<li onclick="Comapartilhar_Musica_E_Artista('${Musica.ID}', '${ID_Artista}')"><img src="Assets/Imgs/Share.svg"><p>Compartilhar</p></li>`

    let Btn_Seguir_Artsta

    if (Artista_Seguir) {
        if (Seguir_Artista(Artista_Seguir, 'Checar')) {
            Btn_Seguir_Artsta = `<li onclick="Seguir_Artista('${Artista_Seguir}')"><img src="Assets/Imgs/remover-participante.png"><p>Deixar de seguir</p></li>`
        } else {
            Btn_Seguir_Artsta = `<li onclick="Seguir_Artista('${Artista_Seguir}')"><img src="Assets/Imgs/convite.png"><p>Seguir artista</p></li>`
        }
    }

    let Btn_Seguir_User = `<li onclick="Seguir_Perfil('${Perfil}')"><img src="Assets/Imgs/convite.png"><p>Seguir usuário</p></li>`

    let Share_Perfil = `<li onclick="Comapartilhar_Perfil('${Perfil}')"><img src="Assets/Imgs/Share.svg"><p>Compartilhar perfil</p></li>`

    //! Match
    let Apagar_Match = `<li onclick="Apagar_Match('${Pagina_Atual.ID}')"><img src="Assets/Imgs/lixeira_branca.png"><p>Apagar Match</p></li>`
    let Abrir_Remover_Participante_Match = `<li onclick="Abrir_Remover_Participante_Match()" class="N_Fechar_Opcoes"><img src="Assets/Imgs/remover-participante.png" class="N_Fechar_Opcoes"><p class="N_Fechar_Opcoes">Remover Participante</p></li>`
    let Convidar_Para_Match = `<li onclick="Convidar_Para_Match('${Pagina_Atual.ID}')"><img src="Assets/Imgs/convite.png"><p>Adicionar Amigo</p></li>`
    let Share_Match = `<li onclick="Comapartilhar_Match('${Pagina_Atual.ID}')"><img src="Assets/Imgs/Share.svg"><p>Compartilhar Match</p></li>`

    //! Crirar Playlist
    let Editar_Detalhes_criar_playlist = `<li onclick="Abrir_Editar_Header_CriarPlaylist()"><img src="Assets/Imgs/pen.png"><p>Editar detalhes</p></li>`
    let btn_tornar_particular_criar_playlist = `<li onclick="TornarPlaylist_Particular()"><img src="Assets/Imgs/cadeado.png"><p>Tornar particular</p></li>`
    let btn_tornar_publica_criar_playlist = `<li onclick="TornarPlaylist_Publica()"><img src="Assets/Imgs/mundo.png"><p>Tornar pública</p></li>`

    //! Playlist
    let Baniar_Amigo_Playlist = `<li onclick="Abrir_Remover_Amigo_Playlist(true)" class="N_Fechar_Opcoes"><img src="Assets/Imgs/Hide song.svg" class="N_Fechar_Opcoes"><p class="N_Fechar_Opcoes">Banir amigo da playlist</p></li>`
    let Editar_Detalhes_playlist = `<li onclick="Abrir_Editar_Playlist()"><img src="Assets/Imgs/pen.png"><p>Editar playlist</p></li>`
    let Convidar_Amido_playlist = `<li onclick="Convidar_Amigo_Playlist()"><img src="Assets/Imgs/convite.png"><p>Convidar amigo</p></li>`
    let btn_tornar_particular_playlist = `<li onclick="Tornar_Playlist_Particular()"><img src="Assets/Imgs/cadeado.png"><p>Tornar particular</p></li>`
    let Abrir_Remover_Amigo_playlist = `<li onclick="Abrir_Remover_Amigo_Playlist()" class="N_Fechar_Opcoes"><img src="Assets/Imgs/remover-participante.png" class="N_Fechar_Opcoes"><p class="N_Fechar_Opcoes">Remover amigo</p></li>`
    let btn_tornar_publica_playlist = `<li onclick="Tornar_Playlist_Publica()"><img src="Assets/Imgs/mundo.png"><p>Tornar pública</p></li>`
    let btn_apagar_playlist = `<li onclick="Apagar_playlist()"><img src="Assets/Imgs/lixeira_branca.png"><p>Apagar playlist</p></li>`
    let btn_adicionar_a_fila_playlist = `<li onclick="Adicionar_Playlisy_Fila()"><img src="Assets/Imgs/Add_Fila.svg"><p>Adicionar a fila</p></li>`
    let Share_playlist = `<li onclick="Comapartilhar_playlist()"><img src="Assets/Imgs/Share.svg"><p>Compartilhar playlist</p></li>`
    let Sair_playlist = `<li onclick="Sair_Da_Playlist()"><img src="Assets/Imgs/remover-participante.png"><p>Sair da playlist</p></li>`

    let pode_add_a_fila = true

    for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
        if (Listas_Prox.Lista_Musicas[c].ID == Musica.ID) {
            pode_add_a_fila = false
            break
        }
    }

    function btn_musica_curtida() {
        let tem_nas_musicas_curtidas = false
        for (let c = 0; c < User.Musicas_Curtidas.length; c++) {
            if (Musica.ID == User.Musicas_Curtidas[c].ID) {
                tem_nas_musicas_curtidas = true
                return Remover_Musica_Curtida
            }
        }

        if (!tem_nas_musicas_curtidas) {
            return Adicionar_Musica_Curtida
        }
    }

    //! --------------- Ifs -------------------
    if (Modo == 'Fila Próximas') {
        // opcoes_musica_ul.innerHTML += Add_Playlist

        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        let musica_ja_em_a_seguir = false
        Listas_Prox.A_Seguir.forEach(Musica_Lista => {
            if (Musica_Lista.ID == Musica.ID) {
                musica_ja_em_a_seguir = true
            }
        })

        if (!musica_ja_em_a_seguir) {
            opcoes_fila_ul.innerHTML += Add_Fila_Seguir
        }

        opcoes_fila_ul.innerHTML += Remover_Musica_Fila
        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share

    } else if (Modo == 'Fila Música Tocando') {
        // opcoes_musica_ul.innerHTML += Add_Playlist

        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        opcoes_fila_ul.innerHTML += Add_Fila_Seguir

        if (pode_add_a_fila) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }

        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share

    } else if (Modo == 'Fila a Seguir') {
        // opcoes_musica_ul.innerHTML += Add_Playlist

        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        opcoes_fila_ul.innerHTML += Remover_Musica_Fila
        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share

    } else if (Modo == 'Músicas Caixa') {
        // opcoes_musica_ul.innerHTML += Add_Playlist

        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        let tem_no_a_seguir = false
        for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
            if (Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                tem_no_a_seguir = true
                break
            }
        }

        if (pode_add_a_fila) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }

        if (Musica.ID != Listas_Prox.MusicaAtual.ID && !tem_no_a_seguir && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila_Seguir
        }

        if (pode_add_a_fila && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }

        let tem_na_fila = false
        for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
            if (Musica.ID == Listas_Prox.Lista_Musicas[c].ID) {
                tem_na_fila = true
                Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila Próximas', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                break
            }
        }

        if (!tem_na_fila) {
            for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
                if (Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                    tem_na_fila = true
                    Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila a Seguir', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                    opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                    break
                }
            }
        }

        if (opcoes_fila_ul.innerHTML != '') {
            opcoes_fila_ul.innerHTML += '<hr>'
        }

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share
    } else if (Modo == 'Músicas Linha') {
        // opcoes_musica_ul.innerHTML += Add_Playlist

        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        let tem_no_a_seguir = false
        for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
            if (Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                tem_no_a_seguir = true
                break
            }
        }

        if (Musica.ID != Listas_Prox.MusicaAtual.ID && !tem_no_a_seguir && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila_Seguir
        }

        if (pode_add_a_fila && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }

        let tem_na_fila = false
        for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
            if (Musica.ID == Listas_Prox.Lista_Musicas[c].ID) {
                tem_na_fila = true
                Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila Próximas', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                break
            }
        }

        if (!tem_na_fila) {
            for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
                if (Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                    tem_na_fila = true
                    Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila a Seguir', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                    opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                    break
                }
            }
        }

        if (opcoes_fila_ul.innerHTML != '') {
            opcoes_fila_ul.innerHTML += '<hr>'
        }

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share

    } else if (Modo == 'Artista') {
        opcoes_musica_ul.innerHTML += Btn_Seguir_Artsta
        opcoes_musica_ul.innerHTML += Share
    } else if (Modo == 'Perfil') {
        opcoes_fila_ul.innerHTML += Btn_Seguir_User
        opcoes_fila_ul.innerHTML += Share_Perfil

    } else if (Modo == 'Match Adm') {
        opcoes_fila_ul.innerHTML += Apagar_Match
        opcoes_fila_ul.innerHTML += Abrir_Remover_Participante_Match
        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Convidar_Para_Match
        opcoes_musica2_ul.innerHTML += Share_Match

        for (let a = 0; a < TodosMatchs.length; a++) {
            if (TodosMatchs[a].ID == Pagina_Atual.ID) {
                for (let b = 0; b < TodosMatchs[a].Participantes.length; b++) {
                    for (let c = 0; c < Todos_Usuarios.length; c++) {
                        if (TodosMatchs[a].Participantes[b].ID == Todos_Usuarios[c].ID && TodosMatchs[a].Participantes[b].ID != TodosMatchs[a].Admin) {
                            const li = document.createElement('li')
                            const p = document.createElement('p')
                            const img = document.createElement('img')

                            li.className = 'li_participantes_remover'
                            p.innerText = Todos_Usuarios[c].Nome
                            img.src = Todos_Usuarios[c].Perfil.Img_Perfil

                            li.appendChild(p)
                            li.appendChild(img)

                            ul1div2_opcs.appendChild(li)

                            li.addEventListener('click', () => {
                                if (TodosMatchs[a].Participantes.length > 2) {
                                    Remover_Participante_Match(TodosMatchs[a].ID, TodosMatchs[a].Participantes[b].ID)
                                } else {
                                    Notificar_Infos('⚠️ O mínimo de participantes em um match é dois. Antes de remover esse participante, convide outro amigo para o match! 👥🎧✨', 'Confirmar', 'Convidar').then((resp) => {
                                        if (resp) {
                                            var url = window.location.href
                                            var baseUrl = url.split('?')[0]

                                            let Link_Convidar
                                            Link_Convidar = `${baseUrl}?Page=aceitarmatch_${TodosMatchs[a].ID}`
                                            Copiar_Para_Area_Tranferencia(Link_Convidar)
                                        }
                                    })
                                }
                            })
                        }
                    }
                }

                break
            }
        }

    } else if (Modo == 'Match Participante') {
        opcoes_musica_ul.innerHTML += Convidar_Para_Match
        opcoes_musica_ul.innerHTML += Share_Match

    } else if (Modo == 'Criar Playlist') {
        opcoes_musica_ul.innerHTML += Editar_Detalhes_criar_playlist

        if (Nova_Playlist.Estado == 'Pública') {
            opcoes_musica_ul.innerHTML += btn_tornar_particular_criar_playlist
        } else if (Nova_Playlist.Estado == 'Particular') {
            opcoes_musica_ul.innerHTML += btn_tornar_publica_criar_playlist
        }
    } else if (Modo == 'Playlist Admin') {
        opcoes_musica_ul.innerHTML += Editar_Detalhes_playlist

        if (Playlist_Aberta.Estado == 'Pública') {
            opcoes_musica_ul.innerHTML += btn_tornar_particular_playlist
        } else if (Playlist_Aberta.Estado == 'Particular') {
            opcoes_musica_ul.innerHTML += btn_tornar_publica_playlist
        }

        opcoes_musica_ul.innerHTML += btn_apagar_playlist
        opcoes_musica_ul.innerHTML += '<hr>'

        //! 4 Colaboradores + o Admin ficando 5 pessoas na playlist
        if (Playlist_Aberta.Colaboradores.length < 4) {
            opcoes_musica2_ul.innerHTML += Convidar_Amido_playlist
        }

        if (Playlist_Aberta.Colaboradores.length > 0) {
            opcoes_musica2_ul.innerHTML += Abrir_Remover_Amigo_playlist
            opcoes_musica2_ul.innerHTML += Baniar_Amigo_Playlist
        }

        opcoes_musica2_ul.innerHTML += '<hr>'

        if (Listas_Prox.Indice != undefined && Listas_Prox.Nome_Album != Playlist_Aberta.Nome) {
            opcoes_musica2_ul.innerHTML += btn_adicionar_a_fila_playlist
        }

        opcoes_compartilhar_ul.innerHTML += Share_playlist

        for (let c = 0; c < Playlist_Aberta.Colaboradores.length; c++) {
            for (let b = 0; b < Todos_Usuarios.length; b++) {
                if (Playlist_Aberta.Colaboradores[c] == Todos_Usuarios[b].ID) {
                    const li = document.createElement('li')
                    const img = document.createElement('img')
                    const p = document.createElement('p')

                    li.className = 'li_participantes_remover'
                    p.innerText = Todos_Usuarios[b].Nome
                    img.src = Todos_Usuarios[b].Perfil.Img_Perfil

                    li.appendChild(img)
                    li.appendChild(p)
                    ul1div2_opcs.appendChild(li)

                    li.addEventListener('click', () => {
                        console.log('is banir do li:' + Is_Banir_Amigo_Playlist);
                        if(Is_Banir_Amigo_Playlist) {
                            Banir_Amigo_Playlist(Pagina_Atual.ID, Playlist_Aberta.Colaboradores[c])

                        } else {
                            Remover_Amigo_Playlist(Pagina_Atual.ID, Playlist_Aberta.Colaboradores[c])
                        }
                    })

                    break
                }
            }
        }

    } else if (Modo == 'Playlist Colaboradores') {
        opcoes_musica_ul.innerHTML += Editar_Detalhes_playlist

        if (Playlist_Aberta.Estado == 'Pública') {
            opcoes_musica_ul.innerHTML += btn_tornar_particular_playlist
        } else if (Playlist_Aberta.Estado == 'Particular') {
            opcoes_musica_ul.innerHTML += btn_tornar_publica_playlist
        }

        //! 4 Colaboradores + o Admin ficando 5 pessoas na playlist
        if (Playlist_Aberta.Colaboradores.length < 4) {
            opcoes_fila_ul.innerHTML += Convidar_Amido_playlist
        }
        opcoes_fila_ul.innerHTML += Sair_playlist
        opcoes_fila_ul.innerHTML += '<hr>'

        if (Listas_Prox.Indice != undefined && Listas_Prox.Nome_Album != Playlist_Aberta.Nome) {
            opcoes_musica2_ul.innerHTML += btn_adicionar_a_fila_playlist
        }

        opcoes_musica2_ul.innerHTML += Share_playlist

    } else if (Modo == 'Playlist Visitante') {
        if (Listas_Prox.Indice != undefined && Listas_Prox.Nome_Album != Playlist_Aberta.Nome) {
            opcoes_musica2_ul.innerHTML += btn_adicionar_a_fila_playlist
        }

        opcoes_musica2_ul.innerHTML += Share_playlist
    }
}

//! --------------- Funções -------------------
function Adicionar_Playlist_Fila(ID) { }

function Remover_Musica_Curtida_Opcoes_Click_Direito(ID) {
    for (let c = 0; c < User.Musicas_Curtidas.length; c++) {
        if (ID == User.Musicas_Curtidas[c].ID) {
            Curtir_Musica_Descurtir(User.Musicas_Curtidas[c])
            break
        }
    }
}

function Adicionar_Musica_Curtida_Opcoes_Click_Direito(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if (ID == TodasMusicas[c].ID) {
            Curtir_Musica_Descurtir(TodasMusicas[c])
            break
        }
    }
}

function Adicionar_a_Fila_Seguir(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if (TodasMusicas[c].ID == ID) {
            Listas_Prox.A_Seguir.push(TodasMusicas[c])
            Atualizar_Fila('Adicionando Fila a Seguir')
            break
        }
    }
}

function Adicionar_a_Fila(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if (TodasMusicas[c].ID == ID) {
            let ja_tem_na_lista = false
            for (let a = 0; a < Listas_Prox.Lista_Musicas.length; a++) {
                if (Listas_Prox.Lista_Musicas[a].ID == ID) {
                    ja_tem_na_lista = true
                    break
                }
            }

            if (!ja_tem_na_lista) {
                Listas_Prox.Lista_Musicas.push(TodasMusicas[c])
                Atualizar_Fila()
            }
            break
        }
    }
}

function Remover_Da_Fila(Modo, ID) {
    if (Modo == 'Fila Próximas') {
        for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
            if (Listas_Prox.Lista_Musicas[c].ID == ID) {
                Animacao_Adicionando_Lista('Remover Próximas', c)
                break
            }
        }
    } else if (Modo == 'Fila a Seguir') {
        for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
            if (Listas_Prox.A_Seguir[c].ID == ID) {
                Animacao_Adicionando_Lista('Remover a Seguir', c)
                break
            }
        }
    }
}

function Ir_Para_Artista_Opcoes_Click_Direito(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if (ID == TodasMusicas[c].ID) {
            Abrir_Perfil_Artista(Separar_Por_Virgula(TodasMusicas[c].Autor)[0], TodasMusicas[c])
        }
    }
}

function Comapartilhar_Musica_E_Artista(ID_Musica, ID_Artista) {
    var url = window.location.href
    var baseUrl = url.split('?')[0]

    let link
    if (ID_Artista != null && ID_Artista != undefined && ID_Artista != 'undefined') {
        link = `${baseUrl}?Page=artista_${ID_Artista}`

    } else {
        link = `${baseUrl}?Musica=${ID_Musica}`
    }

    Copiar_Para_Area_Tranferencia(link)
}

function Comapartilhar_Perfil(ID) {
    var url = window.location.href
    var baseUrl = url.split('?')[0]
    let link = `${baseUrl}?Page=perfil_${ID}`
    Copiar_Para_Area_Tranferencia(link)
}

//! Match
function Apagar_Match(ID) {
    for (let c = 0; c < TodosMatchs.length; c++) {
        if (TodosMatchs[c].ID == ID && TodosMatchs[c].Admin == User.ID) {
            Notificar_Infos('❓ Você tem certeza que deseja deletar este match? Essa ação não pode ser desfeita. 🔥⚠️', 'Confirmar', 'Deletar').then(resp => {
                if (resp) {
                    let feito = false
                    db.collection('Matchs').get().then((snapshot) => {
                        snapshot.docs.forEach(Matchs => {
                            TodosMatchs = Matchs.data().Matchs

                            if (!feito) {
                                feito = true

                                for (let b = 0; b < TodosMatchs.length; b++) {
                                    if (TodosMatchs[b].ID == ID) {
                                        TodosMatchs.splice(b, 1)
                                        db.collection('Matchs').doc(Matchs.id).update({ Matchs: TodosMatchs }).then(() => {
                                            Abrir_Pagina('home')
                                            Carreagr_Artistas_Seguindo()
                                            Notificar_Infos('✅ Match deletado com sucesso! 🎉✨', 'Emojis:🎉,🥳,🎊,🍾,🎈,👏')
                                        })
                                    }
                                }
                            }
                        })
                    })
                }
            })
            break
        }
    }
}

function Abrir_Remover_Participante_Match() {
    opcoes2_click_direito.style.display = 'block'
}

function Convidar_Para_Match(ID) {
    Todos_Usuarios = []
    let feito = false
    db.collection('Users').get().then((snapshot) => {
        let contador = 0

        snapshot.docs.forEach(Users => {
            const InfoUsers = Users.data()

            Todos_Usuarios.push(InfoUsers)

            Todos_Usuarios[contador].ID = Users.id
            contador++
        })

        if (!feito) {
            feito = true

            let match_carregado = undefined
            for (let c = 0; c < TodosMatchs.length; c++) {
                if (TodosMatchs[c].ID == ID) {
                    match_carregado = TodosMatchs[c]
                    break
                }
            }

            let user_adm = undefined
            let link_expirou = false
            for (let c = 0; c < Todos_Usuarios.length; c++) {
                if (Todos_Usuarios[c].ID == match_carregado.Admin) {
                    user_adm = Todos_Usuarios[c]
                    for (let d = 0; d < user_adm.Social.Matchs.Convites.length; d++) {
                        if (user_adm.Social.Matchs.Convites[d].ID == ID) {
                            link_expirou = jaPassou(user_adm.Social.Matchs.Convites[d].Data)

                            user_adm.Social.Matchs.Convites.splice(d, 1)
                            break
                        }
                    }
                    break
                }
            }

            let user_admin_match
            for (let c = 0; c < Todos_Usuarios.length; c++) {
                if (Todos_Usuarios[c].ID == match_carregado.Admin) {
                    user_admin_match = Todos_Usuarios[c]
                    break
                }
            }

            if (!link_expirou && match_carregado.Participantes.length < 5 && user_admin_match.Social.Matchs.Convites.length > 0) {
                let id_convite
                for (let d = 0; d < user_admin_match.Social.Matchs.Convites.length; d++) {
                    if (user_admin_match.Social.Matchs.Convites[d].ID == ID) {
                        id_convite = user_admin_match.Social.Matchs.Convites[d].ID_Convite
                        break
                    }
                }

                let url = window.location.href
                let baseUrl = url.split('?')[0]

                let link
                link = `${baseUrl}?Page=aceitarmatch_${ID}&Convite_${id_convite}`
                Copiar_Para_Area_Tranferencia(link)


            } else if (link_expirou && match_carregado.Participantes.length < 5 || user_admin_match.Social.Matchs.Convites.length == 0 && match_carregado.Participantes.length < 5) {
                Deletar_Convite_Match(ID, user_adm.ID).then(() => {
                    let ID_Match = ID
                    let ID_Convite = gerarId()

                    const new_convite = {
                        Data: getDataAtual(5, 0, 0),
                        ID: ID_Match,
                        ID_Convite: ID_Convite
                    }

                    if (user_adm.Social.Matchs == undefined) {
                        user_adm.Social.Matchs = {
                            Convites: [new_convite]
                        }
                    } else {
                        user_adm.Social.Matchs.Convites.push(new_convite)
                    }

                    let url = window.location.href
                    let baseUrl = url.split('?')[0]

                    let link
                    link = `${baseUrl}?Page=aceitarmatch_${ID_Match}&Convite_${ID_Convite}`
                    if (User.Estado_Da_Conta != 'Anônima') {
                        db.collection('Users').doc(user_adm.ID).update({ Social: user_adm.Social }).then(() => {
                            Copiar_Para_Area_Tranferencia(link)
                        })
                    }
                })

            } else {
                Notificar_Infos('🚫 Opa! Parece que esse match já está lotado. Escolha outro match e convide seus amigos! 🎧✨')
            }
        }
    })
}

function Comapartilhar_Match(ID) {
    var url = window.location.href
    var baseUrl = url.split('?')[0]

    let Link_Convidar
    Link_Convidar = `${baseUrl}?Page=match_${ID}`
    Copiar_Para_Area_Tranferencia(Link_Convidar)
}

function Remover_Participante_Match(Match_ID, Participante_ID) {
    let feito = false
    db.collection('Matchs').get().then((snapshot) => {
        snapshot.docs.forEach(Matchs => {
            TodosMatchs = Matchs.data().Matchs

            if (!feito) {
                feito = true

                for (let c = 0; c < TodosMatchs.length; c++) {
                    if (TodosMatchs[c].ID == Match_ID && User.ID == TodosMatchs[c].Admin) {

                        for (let d = 0; d < TodosMatchs[c].Participantes.length; d++) {
                            if (TodosMatchs[c].Participantes[d].ID == Participante_ID) {
                                TodosMatchs[c].Participantes.splice(d, 1)
                                db.collection('Matchs').doc(Matchs.id).update({ Matchs: TodosMatchs }).then(() => {
                                    Notificar_Infos('✅ Participante removido com sucesso! 👋✨', 'Emojis:🎉,🥳,🎊,🍾,🎈,👏')
                                    Abrir_Match(TodosMatchs[c].ID)
                                })
                                break
                            }
                        }
                        break
                    }
                }
            }
        })
    })
}

//! Criar Playlist
const estado_playlist_criar_playlist = document.getElementById('estado_playlist_criar_playlist')
function TornarPlaylist_Particular() {
    Nova_Playlist.Estado = 'Particular'
    estado_playlist_criar_playlist.innerText = 'Playlist ' + Nova_Playlist.Estado
}

function TornarPlaylist_Publica() {
    Nova_Playlist.Estado = 'Pública'
    estado_playlist_criar_playlist.innerText = 'Playlist ' + Nova_Playlist.Estado
}

//! Playlist
function Abrir_Editar_Playlist() {
    Abrir_Pagina('criarplaylist', Playlist_Aberta.ID)
    Editando_Playlist = true
    Carregar_Editar_Playlist(Playlist_Aberta.ID)
}

function Convidar_Amigo_Playlist() {
    let feito = false
    db.collection('Playlists').get().then((snapshot) => {
        snapshot.docs.forEach(Playlists => {
            TodosPlaylists = Playlists.data().Playlists

            if (!feito) {
                feito = true
                let Link_Convidar
                let ID_PLaylist = Pagina_Atual.ID
                var url = window.location.href
                var baseUrl = url.split('?')[0]
                for (let c = 0; c < TodasPlaylists.length; c++) {
                    if (TodasPlaylists[c].ID == ID_PLaylist) {

                        //! Caso não tenha passado a data
                        if (!jaPassou(TodasPlaylists[c].Convites.Data)) {

                            Link_Convidar = `${baseUrl}?Page=aceitarplaylist_${TodasPlaylists[c].Convites.ID}`

                        } else {
                            //! Caso ja tenha passado a data
                            let new_convite = {
                                ID: gerarId(),
                                Data: getDataAtual(5, 0, 0)
                            }

                            TodasPlaylists[c].Convites = new_convite
                            Link_Convidar = `${baseUrl}?Page=aceitarplaylist_${new_convite.ID}`

                            db.collection('Playlists').doc(Playlists.id).update({ Playlists: TodasPlaylists })
                        }

                        Copiar_Para_Area_Tranferencia(Link_Convidar)
                        break
                    }
                }
            }
        })
    })
}

function Tornar_Playlist_Particular() {
    let feito = false
    db.collection('Playlists').get().then((snapshot) => {
        snapshot.docs.forEach(Playlists => {
            TodasPlaylists = Playlists.data().Playlists


            if (!feito) {
                feito = true

                for (let c = 0; c < TodasPlaylists.length; c++) {
                    if (TodasPlaylists[c].ID == Playlist_Aberta.ID) {
                        if (TodasPlaylists[c].Estado != 'Particular') {
                            TodasPlaylists[c].Estado = 'Particular'
                            Playlist_Aberta = TodasPlaylists[c]

                            db.collection('Playlists').doc(Playlists.id).update({ Playlists: TodasPlaylists }).then(() => {
                                Avisos_Rapidos('A playlist agora é particular')
                                document.getElementById("estado_playlist_page_criar_playlist_page").innerText = 'Playlist Particular'
                            })
                        } else {
                            Avisos_Rapidos('A playlist agora é particular')
                            document.getElementById("estado_playlist_page_criar_playlist_page").innerText = 'Playlist Particular'
                        }
                    }
                }
            }
        })
    })
}

function Abrir_Remover_Amigo_Playlist(Banir=false) {
    console.log(Banir)
    Is_Banir_Amigo_Playlist = Banir

    document.getElementById('opcoes_click_direito').style.display = 'flex'
    opcoes2_click_direito.style.display = 'block'
}

function Tornar_Playlist_Publica() {
    let feito = false
    db.collection('Playlists').get().then((snapshot) => {
        snapshot.docs.forEach(Playlists => {
            TodasPlaylists = Playlists.data().Playlists

            if (!feito) {
                feito = true

                for (let c = 0; c < TodasPlaylists.length; c++) {
                    if (TodasPlaylists[c].ID == Playlist_Aberta.ID) {
                        if (TodasPlaylists[c].Estado != 'Pública') {
                            TodasPlaylists[c].Estado = 'Pública'
                            Playlist_Aberta = TodasPlaylists[c]

                            db.collection('Playlists').doc(Playlists.id).update({ Playlists: TodasPlaylists }).then(() => {
                                Avisos_Rapidos('A playlist agora é pública')
                                document.getElementById("estado_playlist_page_criar_playlist_page").innerText = 'Playlist Pública'
                            })
                        } else {
                            Avisos_Rapidos('A playlist agora é pública')
                            document.getElementById("estado_playlist_page_criar_playlist_page").innerText = 'Playlist Pública'
                        }
                    }
                }
            }
        })
    })
}

function Apagar_playlist() {
    Notificar_Infos('❓ Você tem certeza que deseja deletar esta playlist? Essa ação não pode ser desfeita. 🔥⚠️', 'Confirmar', 'Deletar').then((resp) => {
        if (resp) {
            let feito = false
            db.collection('Playlists').get().then((snapshot) => {
                snapshot.docs.forEach(Playlists => {
                    TodasPlaylists = Playlists.data().Playlists

                    if (!feito) {
                        feito = true

                        for (let c = 0; c < TodasPlaylists.length; c++) {
                            if (TodasPlaylists[c].ID == Playlist_Aberta.ID) {
                                TodasPlaylists.splice(c, 1)

                                db.collection('Playlists').doc(Playlists.id).update({ Playlists: TodasPlaylists }).then(() => {
                                    Carreagr_Artistas_Seguindo()
                                    Avisos_Rapidos('A playlist foi apagada com sucesso!')
                                    Abrir_Pagina('home')
                                })
                            }
                        }
                    }
                })
            })
        }
    })
}

function Adicionar_Playlisy_Fila() {
    Listas_Prox.Lista_Musicas.push(...Playlist_Aberta.Musicas)
    Atualizar_Fila()
}

function Comapartilhar_playlist() {
    var url = window.location.href
    var baseUrl = url.split('?')[0]

    let Link_Convidar
    Link_Convidar = `${baseUrl}?Page=playlist_${Playlist_Aberta.ID}`
    Copiar_Para_Area_Tranferencia(Link_Convidar)
}

function Remover_Amigo_Playlist(ID_Playlist, ID_Amigo) {
    let feito = false
    db.collection('Playlists').get().then((snapshot) => {
        snapshot.docs.forEach(Playlists => {
            TodasPlaylists = Playlists.data().Playlists

            if (!feito) {
                feito = true
                let Amigo_Removido
                for (let c = 0; c < Todos_Usuarios.length; c++) {
                    if(Todos_Usuarios[c].ID == ID_Amigo) {
                        Amigo_Removido = Todos_Usuarios[c]
                        break
                    }
                }

                for (let c = 0; c < TodasPlaylists.length; c++) {
                    if (TodasPlaylists[c].ID == ID_Playlist) {
                        for (let b = 0; b < TodasPlaylists[c].Colaboradores.length; b++) {
                            if (TodasPlaylists[c].Colaboradores[b] == ID_Amigo) {
                                TodasPlaylists[c].Colaboradores.splice(b, 1)
                                db.collection('Playlists').doc(Playlists.id).update({ Playlists: TodasPlaylists }).then(() => {
                                    Avisos_Rapidos('Amigo removido da playlist!')
                                    Abrir_Pagina('playlist', ID_Playlist)

                                    //! Vai notificar os colaboradores que o user foi removido da playlist
                                    for (let f = 0; f < TodasPlaylists[c].Colaboradores.length; f++) {
                                        if(TodasPlaylists[c].Colaboradores[f] != User.ID) {
                                            Enviar_Notificacao_Tempo_Real(TodasPlaylists[c].Colaboradores[f], 'Playlist', `🎵😔 *#00ceff*${Amigo_Removido.Nome}*#00ceff* foi removido da playlist.🎶✨`, 'Modelo1', `User Removido Playlist:${Amigo_Removido.ID}`, Amigo_Removido.Perfil.Img_Perfil, null, 'Fehcar')
                                        }
                                    }
                                })
                            }
                        }
                        break
                    }
                }
            }
        })
    })
}

function Banir_Amigo_Playlist(ID_Playlist, ID_Amigo) {
    console.log('Na função de banir')
    let feito = false
    db.collection('Playlists').get().then((snapshot) => {
        snapshot.docs.forEach(Playlists => {
            TodasPlaylists = Playlists.data().Playlists

            if (!feito) {
                feito = true

                let Amigo_Removido
                for (let c = 0; c < Todos_Usuarios.length; c++) {
                    if(Todos_Usuarios[c].ID == ID_Amigo) {
                        Amigo_Removido = Todos_Usuarios[c]
                        break
                    }
                }

                for (let c = 0; c < TodasPlaylists.length; c++) {
                    if(TodasPlaylists[c].ID == ID_Playlist) {
                        TodasPlaylists[c].Banidos.push(ID_Amigo)

                        for (let f = 0; f < TodasPlaylists[c].Colaboradores.length; f++) {
                            if(TodasPlaylists[c].Colaboradores[f] == ID_Amigo) {
                                TodasPlaylists[c].Colaboradores.splice(f, 1)
                                break
                            }
                        }

                        db.collection('Playlists').doc(Playlists.id).update({ Playlists: TodasPlaylists }).then(() => {
                            Avisos_Rapidos('Amigo banido da playlist!')
                            Abrir_Pagina('playlist', ID_Playlist)

                            Enviar_Notificacao_Tempo_Real(Amigo_Removido.ID, 'Playlist', `🎵😔 Você foi banido permanentemente da playlist *#00ceff*${TodasPlaylists[c].ID}*#00ceff*.🎶✨`, 'Modelo1', `User Banido Playlist:${Amigo_Removido.ID}`, Amigo_Removido.Perfil.Img_Perfil, null, 'Fehcar')

                            //! Vai notificar os colaboradores que o user foi removido da playlist
                            for (let f = 0; f < TodasPlaylists[c].Colaboradores.length; f++) {
                                if(TodasPlaylists[c].Colaboradores[f] != User.ID) {
                                    Enviar_Notificacao_Tempo_Real(TodasPlaylists[c].Colaboradores[f], 'Playlist', `🎵😔 *#00ceff*${Amigo_Removido.Nome}*#00ceff* foi banido permanentemente da playlist.🎶✨`, 'Modelo1', `User Removido Playlist:${Amigo_Removido.ID}`, Amigo_Removido.Perfil.Img_Perfil, null, 'Fehcar')
                                }
                            }
                        })
                        break
                    }
                }
            }
        })
    })
}

function Sair_Da_Playlist() {
    const ID_Playlist = Pagina_Atual.ID
    let feito = false
    db.collection('Playlists').get().then((snapshot) => {
        snapshot.docs.forEach(Playlists => {
            TodasPlaylists = Playlists.data().Playlists

            if (!feito) {
                feito = true
                for (let c = 0; c < TodasPlaylists.length; c++) {
                    if (TodasPlaylists[c].ID == ID_Playlist) {
                        for (let b = 0; b < TodasPlaylists[c].Colaboradores.length; b++) {
                            if (TodasPlaylists[c].Colaboradores[b] == User.ID) {
                                TodasPlaylists[c].Colaboradores.splice(b, 1)
                                db.collection('Playlists').doc(Playlists.id).update({ Playlists: TodasPlaylists }).then(() => {
                                    Avisos_Rapidos('Você saiu da playlist!')
                                    Abrir_Pagina('playlist', ID_Playlist)
                                    Enviar_Notificacao_Tempo_Real(TodasPlaylists[c].Admin, 'Playlist', `🎵😔 *#00ceff*${User.Nome}*#00ceff* saiu da playlist.🎶✨`, 'Modelo1', `Novo User Abrir Playlist:${TodasPlaylists[c].ID}`, User.Perfil.Img_Perfil, null, 'Fehcar')

                                    for (let f = 0; f < TodasPlaylists[c].Colaboradores.length; f++) {
                                        if(TodasPlaylists[c].Colaboradores[f] != User.ID) {
                                            Enviar_Notificacao_Tempo_Real(TodasPlaylists[c].Colaboradores[f], 'Playlist', `🎵😔 *#00ceff*${User.Nome}*#00ceff* saiu da playlist.🎶✨`, 'Modelo1', `Novo User Abrir Playlist:${TodasPlaylists[c].ID}`, User.Perfil.Img_Perfil, null, 'Fehcar')
                                        }
                                    }
                                })
                            }
                        }
                        break
                    }
                }
            }
        })
    })
}