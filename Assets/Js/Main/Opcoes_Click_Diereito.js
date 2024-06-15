const opcoes2_click_direito = document.getElementById('opcoes2_click_direito')

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
    
    if(Artista_Seguir) {
        if(Seguir_Artista(Artista_Seguir, 'Checar')) {
            Btn_Seguir_Artsta = `<li onclick="Seguir_Artista('${Artista_Seguir}')"><img src="Assets/Imgs/Share.svg"><p>Deixar de seguir</p></li>`
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

    let pode_add_a_fila = true

    for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
        if(Listas_Prox.Lista_Musicas[c].ID == Musica.ID) {
            pode_add_a_fila = false
            break
        }
    }

    function btn_musica_curtida() {
        let tem_nas_musicas_curtidas = false
        for (let c = 0; c < User.Musicas_Curtidas.length; c++) {
            if(Musica.ID == User.Musicas_Curtidas[c].ID) {
                tem_nas_musicas_curtidas = true
                return Remover_Musica_Curtida
            }
        }
        
        if(!tem_nas_musicas_curtidas) {
            return Adicionar_Musica_Curtida
        }
    }

    //! --------------- Ifs -------------------
    if(Modo == 'Fila Próximas') {
        // opcoes_musica_ul.innerHTML += Add_Playlist
        
        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        let musica_ja_em_a_seguir = false
        Listas_Prox.A_Seguir.forEach(Musica_Lista => {
            if(Musica_Lista.ID == Musica.ID) {
                musica_ja_em_a_seguir = true
            }
        })

        if(!musica_ja_em_a_seguir) {
            opcoes_fila_ul.innerHTML += Add_Fila_Seguir
        }

        opcoes_fila_ul.innerHTML += Remover_Musica_Fila
        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share

    } else if(Modo == 'Fila Música Tocando') {
        // opcoes_musica_ul.innerHTML += Add_Playlist
        
        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'
        
        opcoes_fila_ul.innerHTML += Add_Fila_Seguir
        
        if(pode_add_a_fila) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }

        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share

    } else if(Modo == 'Fila a Seguir') {
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

    } else if(Modo == 'Músicas Caixa') {
        // opcoes_musica_ul.innerHTML += Add_Playlist
        
        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        let tem_no_a_seguir = false
        for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
            if(Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                tem_no_a_seguir = true
                break
            }
        }

        if(pode_add_a_fila) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }

        if(Musica.ID != Listas_Prox.MusicaAtual.ID && !tem_no_a_seguir && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila_Seguir
        }

        if(pode_add_a_fila && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }
        
        let tem_na_fila = false
        for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
            if(Musica.ID == Listas_Prox.Lista_Musicas[c].ID) {
                tem_na_fila = true
                Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila Próximas', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                break
            }
        }

        if(!tem_na_fila) {
            for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
                if(Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                    tem_na_fila = true
                    Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila a Seguir', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                    opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                    break
                }
            }
        }

        if(opcoes_fila_ul.innerHTML != '') {
            opcoes_fila_ul.innerHTML += '<hr>'
        }

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share
    } else if(Modo == 'Músicas Linha') {
        // opcoes_musica_ul.innerHTML += Add_Playlist
        
        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        let tem_no_a_seguir = false
        for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
            if(Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                tem_no_a_seguir = true
                break
            }
        }

        if(Musica.ID != Listas_Prox.MusicaAtual.ID && !tem_no_a_seguir && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila_Seguir
        }
        
        if(pode_add_a_fila && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }

        let tem_na_fila = false
        for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
            if(Musica.ID == Listas_Prox.Lista_Musicas[c].ID) {
                tem_na_fila = true
                Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila Próximas', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                break
            }
        }

        if(!tem_na_fila) {
            for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
                if(Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                    tem_na_fila = true
                    Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila a Seguir', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                    opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                    break
                }
            }
        }

        if(opcoes_fila_ul.innerHTML != '') {
            opcoes_fila_ul.innerHTML += '<hr>'
        }

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share

    } else if(Modo == 'Artista') {
        opcoes_musica_ul.innerHTML += Btn_Seguir_Artsta
        opcoes_musica_ul.innerHTML += Share
    } else if(Modo == 'Perfil') {
        opcoes_fila_ul.innerHTML += Btn_Seguir_User
        opcoes_fila_ul.innerHTML += Share_Perfil

    } else if(Modo == 'Match Adm') {
        opcoes_fila_ul.innerHTML += Apagar_Match
        opcoes_fila_ul.innerHTML += Abrir_Remover_Participante_Match
        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Convidar_Para_Match
        opcoes_musica2_ul.innerHTML += Share_Match

        for (let a = 0; a < TodosMatchs.length; a++) {
            if(TodosMatchs[a].ID == Pagina_Atual.ID) {
                for (let b = 0; b < TodosMatchs[a].Participantes.length; b++) {
                    for (let c = 0; c < Todos_Usuarios.length; c++) {
                        if(TodosMatchs[a].Participantes[b].ID == Todos_Usuarios[c].ID && TodosMatchs[a].Participantes[b].ID != TodosMatchs[a].Admin) {
                            const li = document.createElement('li')
                            const p = document.createElement('p')
                            const img = document.createElement('img')
                            const hr = document.createElement('hr')

                            li.className = 'li_participantes_remover'
                            p.innerText = Todos_Usuarios[c].Nome
                            img.src = Todos_Usuarios[c].Perfil.Img_Perfil

                            li.appendChild(p)
                            li.appendChild(img)

                            ul1div2_opcs.appendChild(li)
                            if(b + 1 < TodosMatchs[a].Participantes.length) {
                                ul1div2_opcs.appendChild(hr)
                            }

                            li.addEventListener('click', () => {
                                if(TodosMatchs[a].Participantes.length > 2) {
                                    Remover_Participante_Match(TodosMatchs[a].ID, TodosMatchs[a].Participantes[b].ID)
                                } else {
                                    Notificar_Infos('⚠️ O mínimo de participantes em um match é dois. Antes de remover esse participante, convide outro amigo para o match! 👥🎧✨', 'Confirmar', 'Convidar').then((resp) => {
                                        if(resp) {
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

    } else if(Modo == 'Match Participante') {
        opcoes_musica_ul.innerHTML += Convidar_Para_Match
        opcoes_musica_ul.innerHTML += Share_Match

    }
}

//! --------------- Funções -------------------
function Adicionar_Playlist_Fila(ID) {}

function Remover_Musica_Curtida_Opcoes_Click_Direito(ID) {
    for (let c = 0; c < User.Musicas_Curtidas.length; c++) {
        if(ID == User.Musicas_Curtidas[c].ID) {
            Curtir_Musica_Descurtir(User.Musicas_Curtidas[c])
            break
        }
    }
}

function Adicionar_Musica_Curtida_Opcoes_Click_Direito(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(ID == TodasMusicas[c].ID) {
            Curtir_Musica_Descurtir(TodasMusicas[c])
            break
        }
    }
}

function Adicionar_a_Fila_Seguir(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(TodasMusicas[c].ID == ID) {
            Listas_Prox.A_Seguir.push(TodasMusicas[c])
            Atualizar_Fila('Adicionando Fila a Seguir') 
            break
        }
    }
}

function Adicionar_a_Fila(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(TodasMusicas[c].ID == ID) {            
            let ja_tem_na_lista = false
            for (let a = 0; a < Listas_Prox.Lista_Musicas.length; a++) {
                if(Listas_Prox.Lista_Musicas[a].ID == ID) {
                    ja_tem_na_lista = true
                    break
                }
            }

            if(!ja_tem_na_lista) {
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
            if(Listas_Prox.Lista_Musicas[c].ID == ID) {
                Animacao_Adicionando_Lista('Remover Próximas', c)
                break
            }
        }
    } else if (Modo == 'Fila a Seguir') {
        for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
            if(Listas_Prox.A_Seguir[c].ID == ID) {
                Animacao_Adicionando_Lista('Remover a Seguir', c)
                break
            }
        }
    }
}

function Ir_Para_Artista_Opcoes_Click_Direito(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(ID == TodasMusicas[c].ID) {
            Abrir_Perfil_Artista(Separar_Por_Virgula(TodasMusicas[c].Autor)[0], TodasMusicas[c])
        }
    }
}

function Comapartilhar_Musica_E_Artista(ID_Musica, ID_Artista) {
    var url = window.location.href
    var baseUrl = url.split('?')[0]

    let link
    if(ID_Artista != null && ID_Artista != undefined && ID_Artista != 'undefined') {
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
        if(TodosMatchs[c].ID == ID && TodosMatchs[c].Admin == User.ID) {
            Notificar_Infos('❓ Você tem certeza que deseja deletar este match? Essa ação não pode ser desfeita. 🔥⚠️', 'Confirmar', 'Deletar').then(resp => {
                if(resp) {
                    let feito = false
                    db.collection('Matchs').get().then((snapshot) => {
                        snapshot.docs.forEach(Matchs => {
                            TodosMatchs = Matchs.data().Matchs

                            if(!feito) {
                                feito = true

                                for (let b = 0; b < TodosMatchs.length; b++) {
                                    if(TodosMatchs[b].ID == ID) {
                                        TodosMatchs.splice(b, 1)
                                        db.collection('Matchs').doc(Matchs.id).update({Matchs: TodosMatchs}).then(() => {
                                            Abrir_Pagina('home')
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

        if(!feito) {
            feito = true

            let match_carregado = undefined
            for (let c = 0; c < TodosMatchs.length; c++) {
                if(TodosMatchs[c].ID == ID) {
                    match_carregado = TodosMatchs[c]
                    break
                }
            }

            let user_adm = undefined
            let link_expirou = false
            for (let c = 0; c < Todos_Usuarios.length; c++) {
                if(Todos_Usuarios[c].ID == match_carregado.Admin) {
                    user_adm = Todos_Usuarios[c]

                    for (let d = 0; d < user_adm.Social.Matchs.Convites.length; d++) {
                        if(user_adm.Social.Matchs.Convites[d].ID == ID) {
                            link_expirou = jaPassou(user_adm.Social.Matchs.Convites[d].Data)
                            user_adm.Social.Matchs.Convites.splice(d, 1)
                            break
                        }
                    }
                    break
                }
            }

            if(!link_expirou && match_carregado.Participantes.length < 5) {
                let url = window.location.href
                let baseUrl = url.split('?')[0]

                let link
                link = `${baseUrl}?Page=aceitarmatch_${ID}`
                Copiar_Para_Area_Tranferencia(link)


            } else if(link_expirou && match_carregado.Participantes.length < 5) {
                Deletar_Convite_Match(ID, user_adm.ID).then(() => {
                    ID_Match = ID

                    const new_convite = {
                        Data: getDataAtual(5, 0, 0),
                        ID: ID_Match
                    }
                
                    if(user_adm.Social.Matchs == undefined) {
                        user_adm.Social.Matchs = {
                            Convites: [new_convite]
                        }
                    } else {
                        user_adm.Social.Matchs.Convites.push(new_convite)
                    }

                    let url = window.location.href
                    let baseUrl = url.split('?')[0]

                    let link
                    link = `${baseUrl}?Page=aceitarmatch_${ID_Match}`
                    if(User.Estado_Da_Conta != 'Anônima') {
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

            if(!feito) {
                feito = true

                for (let c = 0; c < TodosMatchs.length; c++) {
                    if(TodosMatchs[c].ID == Match_ID && User.ID == TodosMatchs[c].Admin) {
                        
                        for (let d = 0; d < TodosMatchs[c].Participantes.length; d++) {
                            if(TodosMatchs[c].Participantes[d].ID == Participante_ID) {
                                TodosMatchs[c].Participantes.splice(d, 1)
                                db.collection('Matchs').doc(Matchs.id).update({Matchs: TodosMatchs}).then(() => {
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