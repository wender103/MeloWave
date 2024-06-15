function Carregar_Criar_Match() {
    const img_user_match = document.getElementById('img_user_match')
    img_user_match.src = User.Perfil.Img_Perfil
}

const btn_config_match = document.getElementById('btn_config_match')
const btn_convidar_para_match = document.getElementById('btn_convidar_para_match')

btn_convidar_para_match.addEventListener('click', () => {
    //! Vai checar se o user tem algum convite pendente
    let id_pendente = undefined
    try {
        const Convites = User.Social.Matchs.Convites
        for (let d = 0; d < Convites.length; d++) {
            for (let c = 0; c < TodosMatchs.length; c++) {
                let id_encontrado = false
                if(Convites.ID == TodosMatchs[c].ID) {
                    id_encontrado = true
                    break
                }
            }

            if(!id_pendente) {
                id_pendente = Convites[d].ID
            }
        }
    } catch{}

    let ID_Match

    if(id_pendente != undefined) {
        ID_Match = id_pendente
    } else {
        ID_Match = gerarId()

        const new_convite = {
            Data: getDataAtual(5, 0, 0),
            ID: ID_Match
        }
    
        if(User.Social.Matchs == undefined) {
            User.Social.Matchs = {
                Convites: [new_convite]
            }
        } else {
            User.Social.Matchs.Convites.push(new_convite)
        }
    }


    var url = window.location.href
    var baseUrl = url.split('?')[0]

    let link
    link = `${baseUrl}?Page=aceitarmatch_${ID_Match}`

    if(id_pendente == undefined) {
        if(User.Estado_Da_Conta != 'Anônima') {
            db.collection('Users').doc(User.ID).update({ Social: User.Social }).then(() => {
                Copiar_Para_Area_Tranferencia(link)
            })
        }
    } else {
        Copiar_Para_Area_Tranferencia(link)
    }
})

//! ------------------------ Aceitar Match ------------------------------------
let tudo_certo_participar_match = false
let ID_Match_Participar = null
let Adm_Match = null
function Carregar_Infos_Aceitar_Match(ID) {
    ID_Match_Participar = ID
    const img_user_aceitarmatch = document.getElementById('img_user_aceitarmatch')

    //! Vai checar se o user já faz parte do Match
    let user_encontrado = false
    let match_convidado = undefined
    for (let c = 0; c < TodosMatchs.length; c++) {
        for (let a = 0; a < TodosMatchs[c].Participantes.length; a++) {
            if(TodosMatchs[c].ID == ID) {
                match_convidado = TodosMatchs[c]

                if(TodosMatchs[c].Participantes[a].ID == User.ID) {
                    user_encontrado = true
                    break
                }
            }
        }
    }

    //! Caso o user já faça parte do Match
    if(user_encontrado) {
        if(match_convidado == undefined) {
            Abrir_Pagina('home')
        } else {
            Abrir_Pagina('match', match_convidado.ID)
        }
        Notificar_Infos('Ops! 😅 Você já está nesse match! Convide os amigos 😉', 'Confirmar', 'Convidar').then((resp) => {
            if(resp) {
                var url = window.location.href
                var baseUrl = url.split('?')[0]

                let Link_Convidar
                Link_Convidar = `${baseUrl}?Page=aceitarmatch_${match_convidado.ID}`
                Copiar_Para_Area_Tranferencia(Link_Convidar)
            }
        })
    }

    let link_expirou = false
    if(!user_encontrado && match_convidado != undefined) {
        for (let c = 0; c < Todos_Usuarios.length; c++) {
            if(Todos_Usuarios[c].ID == match_convidado.Admin) {
                for (let d = 0; d < Todos_Usuarios[c].Social.Matchs.Convites.length; d++) {
                    if(Todos_Usuarios[c].Social.Matchs.Convites[d].ID == match_convidado.ID) {
                        if(jaPassou(Todos_Usuarios[c].Social.Matchs.Convites[d].Data)) {
                            link_expirou = true
                            Abrir_Pagina('home')
                            Deletar_Convite_Match(match_convidado.ID, match_convidado.Admin)
                            Notificar_Infos('⏰ Oops! O link deste match já expirou. Tente criar um novo match ou peça um link atualizado! 🚀', 'Confirmar', 'Criar Novo Match').then((resp) => {
                                if(resp) {
                                    Abrir_Pagina('criarmatch')
                                }
                            })
                        }
                    }

                    break
                }
                break
            }
        }
    }

    if(!link_expirou) {
        //! Vai checar se o Match já tem 5 users
        if(match_convidado == undefined || match_convidado.Participantes.length < 5) {
            if(!user_encontrado) {
                for (let c = 0; c < Todos_Usuarios.length; c++) {
                    try {
                        if(Todos_Usuarios[c].Social.Matchs.Convites != undefined && !user_encontrado) {
                            let Convites = Todos_Usuarios[c].Social.Matchs.Convites
            
                            for (let a = 0; a < Convites.length; a++) {
                                if(Convites[a].ID == ID) {
            
                                    if(Todos_Usuarios[c].ID != User.ID) {
                                        img_user_aceitarmatch.src = Todos_Usuarios[c].Perfil.Img_Perfil
                                        Adm_Match = Todos_Usuarios[c]
                                        user_encontrado = true
                                        tudo_certo_participar_match = true
                                    } else {
                                        user_encontrado = true
                                        let Link_Convidar = location.href
                                        Abrir_Pagina('home')
                                        Notificar_Infos('Ops! 😅 Você já está nesse match! Convide os amigos 😉', 'Confirmar', 'Convidar').then((resp) => {
                                            if(resp) {
                                                Copiar_Para_Area_Tranferencia(Link_Convidar)
                                            }
                                        })
                                    }
                                    
                                    break
                                }
                            }
                        } else if(Todos_Usuarios[c].Social.Matchs.Convites != undefined && user_encontrado) {
                            break
                        }
                        
                    } catch{}
                    
                }
            
                if(!user_encontrado) {
                    Abrir_Pagina('home')
                    Notificar_Infos('Eita! 😕 Esse link não está funcionando. Talvez esteja errado ou já expirou. Tente de novo com um novo link! 🔗✨')
                }
            }
        } else {
            Abrir_Pagina('home')
            Notificar_Infos('🚫 Opa! Parece que esse match já está lotado. Escolha outro match para entrar! 🎧✨')
        }
    }
}

const btn_convidar_para_aceitarmatch = document.getElementById('btn_convidar_para_aceitarmatch')

btn_convidar_para_aceitarmatch.addEventListener('click', () => {
    if(tudo_certo_participar_match) {
        Criar_Match_Add_Participante()
    } else {
        Notificar_Infos('Opa! Algo deu errado 😕 Parece que você não está qualificado para participar deste Match 🚫🎮 Tente novamente mais tarde! 🔄✨')
        Abrir_Pagina('home')
    }
})

function Criar_Match_Add_Participante() {
    if(tudo_certo_participar_match) {
        let salvo = false
        let feito = false
        db.collection('Matchs').get().then((snapshot) => {
            snapshot.docs.forEach(Matchs => {
                TodosMatchs = Matchs.data().Matchs

                if(!feito) {
                    feito = true
                    let vc_ja_faz_parte = false
                    let match_encontrado = false
                    let num_match
                    for (let c = 0; c < TodosMatchs.length; c++) {
                        if(TodosMatchs[c].ID == ID_Match_Participar) {
                            match_encontrado = true
                            num_match = c
                            for (let a = 0; a < TodosMatchs[c].Participantes.length; a++) {
                                if(TodosMatchs[c].Participantes[a].ID == User.ID) {
                                    vc_ja_faz_parte = true
                                    break
                                }
                            }
                            break
                        }
                    }

                    if(vc_ja_faz_parte) {
                        let Link_Convidar = location.href
                        Notificar_Infos('Ops! 😅 Você já está nesse match! Convide os amigos 😉', 'Confirmar', 'Convidar').then((resp) => {
                            if(resp) {
                                Copiar_Para_Area_Tranferencia(Link_Convidar)
                            }
                        })
                    } else if(match_encontrado) {
                        let new_participante = {
                            ID: User.ID,
                            Cor: gerarCorAleatoria(true, 0.7)
                        }
                        TodosMatchs[num_match].Participantes.push(new_participante)

                    } else {
                        let new_participante = {
                            ID: User.ID,
                            Cor: gerarCorAleatoria(true, 0.7)
                        }

                        let new_participante_adm = {
                            ID: Adm_Match.ID,
                            Cor: gerarCorAleatoria(true, 0.7)
                        }

                        const new_match = {
                            ID: ID_Match_Participar,
                            Admin: Adm_Match.ID,
                            Participantes: [new_participante_adm, new_participante],
                            Data: getDataAtual(),
                            Background: gerarCorAleatoria(false)
                        }

                        TodosMatchs.push(new_match)
                    }
                    
                    if(!salvo) {
                        salvo = true
                        db.collection('Matchs').doc(Matchs.id).update({Matchs: TodosMatchs}).then(() => {
                            Notificar_Infos('🎉 Uhuu! Você entrou no Match! 🎉 Bem-vindo à playlist entre amigos, onde vamos reunir as músicas mais ouvidas de cada um! 🎶👯‍♂️ Prepare-se para descobrir novas músicas e curtir com a galera! 🚀🔥', 'Comemorar')
                            Abrir_Pagina('match', ID_Match_Participar)
                        })
                    }
                }
            })
        })

    } else {
        Notificar_Infos('Opa! Algo deu errado 😕 Parece que você não está qualificado para participar deste Match 🚫🎮 Tente novamente mais tarde! 🔄✨')
        Abrir_Pagina('home')
    }
}

function Deletar_Convite_Match(ID, ID_Usuario) {
    return new Promise((resolve, reject) => {
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

                for (let c = 0; c < Todos_Usuarios.length; c++) {
                    if(Todos_Usuarios[c].ID == ID_Usuario) {
                        let Convites = Todos_Usuarios[c].Social.Matchs.Convites
                        for (let d = 0; d < Convites.length; d++) {
                            if(ID == Convites[d].ID) {
                                Todos_Usuarios[c].Social.Matchs.Convites.splice(d, 1)
                                if(User.Estado_Da_Conta != 'Anônima') {
                                    db.collection('Users').doc(Todos_Usuarios[c].ID).update({ Social: Todos_Usuarios[c].Social }).then(() => {
                                        resolve(true)
                                    })
                                    
                                }
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

//! ---------------------------------- Abrir Página Match ----------------------------------
let abriu_match = false
let match_aberto = undefined
function Abrir_Match(ID=undefined) {
    if(!abriu_match) {
        document.getElementById('input_pesquisar_match').value = ''
        document.getElementById('container_match').innerHTML = ''

        abriu_match = true
        if(ID == undefined) {
            Abrir_Pagina('home')
            Notificar_Infos('Opa! Algo deu errado 😕 Não consegui carregar esse Match 🚫🎮')
    
        } else {
            let Match_Carregar
    
            for (let c = 0; c < TodosMatchs.length; c++) {
                if(TodosMatchs[c].ID == ID) {
                    Match_Carregar = TodosMatchs[c]
                    break
                }
            }

            match_aberto = Match_Carregar

            let user_e_participante = false
            for (let c = 0; c < match_aberto.Participantes.length; c++) {
                if(match_aberto.Participantes[c].ID == User.ID) {
                    user_e_participante = true
                    break
                }
            }

            if(user_e_participante) {
                btn_config_match.style.display = 'block'
            }
    
            const container_infos_foto_perfil_match = document.getElementById('container_infos_foto_perfil_match')
            const esferas_perfil_match = document.getElementById('esferas_perfil_match')
            const traco_perfil_match = document.getElementById('traco_perfil_match')
    
            esferas_perfil_match.innerHTML = ''
    
            let cor_adm
            let nomes_participantes = ''
            let array_participantes = []
            for (let c = 0; c < Match_Carregar.Participantes.length; c++) {
                const esfera = document.createElement('div')
                esfera.className = 'esferas'
                esfera.style.background = Match_Carregar.Participantes[c].Cor
                esferas_perfil_match.appendChild(esfera)

                if(Match_Carregar.Participantes[c].ID == Match_Carregar.Admin) {
                    cor_adm = Match_Carregar.Participantes[c].Cor
                }

                for (let a = 0; a < Todos_Usuarios.length; a++) {
                    if(Todos_Usuarios[a].ID == Match_Carregar.Participantes[c].ID) {
                        array_participantes.push(Todos_Usuarios[a])

                        if(c + 1 >= Match_Carregar.Participantes.length) {
                            nomes_participantes += Todos_Usuarios[a].Nome

                        } else {
                            nomes_participantes += `${Todos_Usuarios[a].Nome} + `
                        }
                        break
                    }
                }
            }

                Retornar_Musicas_Match(array_participantes)
                
                container_infos_foto_perfil_match.style.background = Match_Carregar.Background
                traco_perfil_match.style.background = cor_adm
                document.getElementById('nome_match').innerText = nomes_participantes
                document.getElementById('para_qm_match').innerText = `Um Match de músicas feito para ${nomes_participantes}. Atualizado todos os dias.`
        }
    }

    setTimeout(() => {
        abriu_match = false
    }, 500)
}

let todas_musicas_match = []
let pesquisa_match = []
function Retornar_Musicas_Match(Users) {
    todas_musicas_match = []
    let max_generos = 30
    let max_generos_por_user = 20

    for (let n = 0; n < Users.length; n++) {
        let User_Recebido = Users[n]

        let musicas_historico = []
        let musica_historico_carregada = false
        for (let c = 0; c < User_Recebido.Historico.Musicas.length; c++) {
            for (let a = 0; a < TodasMusicas.length; a++) {
                if(TodasMusicas[a].ID == User_Recebido.Historico.Musicas[c]) {
                    musicas_historico.push(TodasMusicas[a])
                    musica_historico_carregada = true
                    break
                }
            }
        }

        if(!musica_historico_carregada) {
            for (let c = 0; c < User_Recebido.Historico.Musicas.length; c++) {
                for (let a = 0; a < TodasMusicas.length; a++) {
                    if(TodasMusicas[a].ID == User_Recebido.Historico.Musicas[c].ID) {
                        musicas_historico.push(TodasMusicas[a])
                        musica_historico_carregada = true
                        break
                    }
                }
            }
        }


        let generos_mais_ouvidos_user = []
        let array_musicas_user = []

        for (let c = 0; c < musicas_historico.length; c++) {
            generos_mais_ouvidos_user.push(...Separar_Por_Virgula(formatarString(musicas_historico[c].Genero)))
        }
        generos_mais_ouvidos_user = removerNomesDuplicados(generos_mais_ouvidos_user)
        if(generos_mais_ouvidos_user.length > max_generos) {
            generos_mais_ouvidos_user.length = max_generos
        }

        let todasmusicas_random = []
        todasmusicas_random.push(...shuffleArray(TodasMusicas))
        
        for (let c = 0; c < todasmusicas_random.length; c++) {
            const genero_formatado = formatarString(todasmusicas_random[c].Genero)

            for (let b = 0; b < generos_mais_ouvidos_user.length; b++) {
                if(array_musicas_user.length < max_generos_por_user) {
                    if(genero_formatado.includes(generos_mais_ouvidos_user[b]) || generos_mais_ouvidos_user[b].includes(genero_formatado)) {
                        let infos_user = {
                            Img: User_Recebido.Perfil.Img_Perfil,
                            ID: User_Recebido.ID,
                            Nome: User_Recebido.Nome
                        }
                        let new_obj = todasmusicas_random[c]
                        new_obj.User_Match = infos_user
                        array_musicas_user.push(new_obj)
                        break
                    }
                } else {
                    break
                }
            }
        }   
        todas_musicas_match.push(...array_musicas_user)
    }

    todas_musicas_match = shuffleArray(todas_musicas_match)

    pesquisa_match = [...todas_musicas_match]

    //! Carregar músicas ---------------------------

    todas_musicas_match = removeDuplicatesPeloID(todas_musicas_match)
    for (let c = 0; c < todas_musicas_match.length; c++) {
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
        musica_linha.classList.add('Musica_Linha_' + todas_musicas_match[c].ID)
        primeira_parte_musica_linha.className = 'primeira_parte_musica_linha'
        texto_musica_linha.className = 'texto_musica_linha'
        segunda_parte_musica_linha.className = 'segunda_parte_musica_linha'
        img.className = 'Img_musica_linha'
        p.className = 'Nome_musica_linha'
        p_contador.className = 'p_contador_musica_curtida'
        like.className = 'like_musicas_linha'
        views.className = 'Views_Musica_Linha'
        span.className = 'Autor_Musica_Linha'
        container_img_perfil.className = 'container_img_perfil_musica_linha_match'

        //! Valores
        img.src = todas_musicas_match[c].Img
        p.innerText = todas_musicas_match[c].Nome
        span.appendChild(Retornar_Artistas_Da_Musica(todas_musicas_match[c]))
        p_contador.innerText = c + 1
        img_perfil.src = todas_musicas_match[c].User_Match.Img

        if(todas_musicas_match[c].Views <= 0) {
            views.style.display = 'none'

        } else {
            views.innerText = todas_musicas_match[c].Views
        }

        Curtir_Musica_Descurtir(todas_musicas_match[c], like, 'Checar')

        const audio = new Audio(todas_musicas_match[c].Audio)

        obterDuracaoOuTempoAtualAudio(audio, true).then((resp) => {
            tempo.innerText = resp.formattedDuration
        })


        //! AppendChild
        primeira_parte_musica_linha.appendChild(img)
        texto_musica_linha.appendChild(p)
        texto_musica_linha.appendChild(span)
        primeira_parte_musica_linha.appendChild(texto_musica_linha)
        musica_linha.appendChild(primeira_parte_musica_linha)

        musica_linha.appendChild(views)
        container_img_perfil.appendChild(img_perfil)
        segunda_parte_musica_linha.appendChild(container_img_perfil)
        segunda_parte_musica_linha.appendChild(like)
        segunda_parte_musica_linha.appendChild(tempo)
        musica_linha.appendChild(segunda_parte_musica_linha)
        document.getElementById('container_match').appendChild(musica_linha)

        //! Funções de click
        like.addEventListener('click', () => {
            let Musicas_Recebidas = [...todas_musicas_match]
            Curtir_Musica_Descurtir(Musicas_Recebidas[c], like)
        })

        musica_linha.addEventListener('click', (e) => {
            let Musicas_Recebidas = [...todas_musicas_match]
            let el = e.target.className

            if(el != 'span_nomes_artistas' && el != 'like_musicas_linha' && el != 'btn_editar_musica' && el != 'btn_trash' && el != 'img_trash' && el != 'img_pen' && el != 'img_mic_editar' && el != 'btn_letra_editar' && el != 'bnt_carrinho_editar' && el != 'img_carrinho_editar') {
                Tocar_Musica(Musicas_Recebidas, Musicas_Recebidas[c], '', Pagina_Atual.ID, 'match', 'match')
                Listas_Prox.Nome_Album = 'match'
                User_Tocando_Agora = false
            }
        })

        musica_linha.addEventListener('contextmenu', (event) => {
            let Musicas_Recebidas = [...todas_musicas_match]
            Ativar_Opcoes_Click_Direita('Músicas Linha', Musicas_Recebidas[c], c)
            posicionarElemento(event, document.getElementById('opcoes_click_direito'))
        })
        
    }

    somarTempos(todas_musicas_match).then((Tempo) => {

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
        if(todas_musicas_match.length == 1) {
            name_msuicas = 'música'
        }

        const p_infos_match = document.getElementById('p_infos_match')
        p_infos_match.innerHTML = `<span id="quantidade_musicas_playlist_musicas_curtidas">${todas_musicas_match.length} ${name_msuicas}, ${resultado}</span>`
    })
}

//! Pesquisar Matchs -------------------------
function Pesquisar_Matchs(Pesquisa) {
    let pesquisa_formadata = formatarString(Pesquisa)

    let array_musicas_encontradas = []

    if(pesquisa_formadata.trim() != '') {
        for (let c = 0; c < todas_musicas_match.length; c++) {
            let nome = formatarString(todas_musicas_match[c].Nome)
            let autor = formatarString(todas_musicas_match[c].Autor)
            let genero = formatarString(todas_musicas_match[c].Genero)
            let nome_user = formatarString(todas_musicas_match[c].User_Match.Nome)

            if(pesquisa_formadata.includes(nome) || pesquisa_formadata.includes(autor) || pesquisa_formadata.includes(genero) || nome.includes(pesquisa_formadata) || autor.includes(pesquisa_formadata) || genero.includes(pesquisa_formadata) || pesquisa_formadata.includes(nome_user) || nome_user.includes(pesquisa_formadata)) {
                array_musicas_encontradas.push(todas_musicas_match[c])
            }
        }

        Carregar_Musicas_Match(array_musicas_encontradas)
    } else {
        Carregar_Musicas_Match(todas_musicas_match)
    }
    
    function Carregar_Musicas_Match(array_musicas) {
        pesquisa_match = array_musicas
        document.getElementById('container_match').innerHTML = ''

        for (let c = 0; c < array_musicas.length; c++) {
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
            musica_linha.classList.add('Musica_Linha_' + array_musicas[c].ID)
            primeira_parte_musica_linha.className = 'primeira_parte_musica_linha'
            texto_musica_linha.className = 'texto_musica_linha'
            segunda_parte_musica_linha.className = 'segunda_parte_musica_linha'
            img.className = 'Img_musica_linha'
            p.className = 'Nome_musica_linha'
            p_contador.className = 'p_contador_musica_curtida'
            like.className = 'like_musicas_linha'
            views.className = 'Views_Musica_Linha'
            span.className = 'Autor_Musica_Linha'
            container_img_perfil.className = 'container_img_perfil_musica_linha_match'
    
            //! Valores
            img.src = array_musicas[c].Img
            p.innerText = array_musicas[c].Nome
            span.appendChild(Retornar_Artistas_Da_Musica(array_musicas[c]))
            p_contador.innerText = c + 1
            img_perfil.src = array_musicas[c].User_Match.Img
    
            if(array_musicas[c].Views <= 0) {
                views.style.display = 'none'
    
            } else {
                views.innerText = array_musicas[c].Views
            }
    
            Curtir_Musica_Descurtir(array_musicas[c], like, 'Checar')
    
            const audio = new Audio(array_musicas[c].Audio)
    
            obterDuracaoOuTempoAtualAudio(audio, true).then((resp) => {
                tempo.innerText = resp.formattedDuration
            })
    
    
            //! AppendChild
            primeira_parte_musica_linha.appendChild(img)
            texto_musica_linha.appendChild(p)
            texto_musica_linha.appendChild(span)
            primeira_parte_musica_linha.appendChild(texto_musica_linha)
            musica_linha.appendChild(primeira_parte_musica_linha)
    
            musica_linha.appendChild(views)
            container_img_perfil.appendChild(img_perfil)
            segunda_parte_musica_linha.appendChild(container_img_perfil)
            segunda_parte_musica_linha.appendChild(like)
            segunda_parte_musica_linha.appendChild(tempo)
            musica_linha.appendChild(segunda_parte_musica_linha)
            document.getElementById('container_match').appendChild(musica_linha)
    
            //! Funções de click
            like.addEventListener('click', () => {
                let Musicas_Recebidas = [...array_musicas]
                Curtir_Musica_Descurtir(Musicas_Recebidas[c], like)
            })
    
            musica_linha.addEventListener('click', (e) => {
                let Musicas_Recebidas = [...array_musicas]
                let el = e.target.className
    
                if(el != 'span_nomes_artistas' && el != 'like_musicas_linha' && el != 'btn_editar_musica' && el != 'btn_trash' && el != 'img_trash' && el != 'img_pen' && el != 'img_mic_editar' && el != 'btn_letra_editar' && el != 'bnt_carrinho_editar' && el != 'img_carrinho_editar') {
                    Tocar_Musica(Musicas_Recebidas, Musicas_Recebidas[c], '', Pagina_Atual.ID, 'match', 'match')
                    Listas_Prox.Nome_Album = 'match'
                    User_Tocando_Agora = false
                }
            })
    
            musica_linha.addEventListener('contextmenu', (event) => {
                let Musicas_Recebidas = [...array_musicas]
                Ativar_Opcoes_Click_Direita('Músicas Linha', Musicas_Recebidas[c], c)
                posicionarElemento(event, document.getElementById('opcoes_click_direito'))
            })
            
        }
    }
}

const img_play_match = document.getElementById('img_play_match')
img_play_match.addEventListener('click', () => {
    let new_arrey = [...pesquisa_match]
    Tocar_Musica(new_arrey, pesquisa_match[0], '', Pagina_Atual.ID, 'match')
})

//! Configurar Match ----------------------------------------
btn_config_match.addEventListener('click', (event) => {
    //! Checa se o user é o adm do Match para retornar opções personalizadas
    if(match_aberto.Admin == User.ID) {
        Ativar_Opcoes_Click_Direita('Match Adm', TodasMusicas[0], 0)
        posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes, 'flex')
    } else {
        let user_e_participante = false
        for (let c = 0; c < match_aberto.Participantes.length; c++) {
            if(match_aberto.Participantes[c].ID == User.ID) {
                user_e_participante = true
                break
            }
        }

        if(user_e_participante) {
            Ativar_Opcoes_Click_Direita('Match Participante', TodasMusicas[0], 0)
            posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes, 'flex')
        }
    }
})