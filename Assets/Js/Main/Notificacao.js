function Notificacao_User(Email_User, Notificacao) {
    for (let c = 0; c < Todos_Usuarios.length; c++) {
        if(Todos_Usuarios[c].Email == Email_User) {
            Todos_Usuarios[c].Notificacao.push(Notificacao)
            db.collection('Users').doc(Todos_Usuarios[c].ID).update({ Notificacao: User.Notificacao })
        }
    }
}

function Noficacao_Classes(Classe) {

}

let array_notificacoes_nao_vistas = []
function Carregar_Notificacaoes() {
    array_notificacoes_nao_vistas = []
    if(User.Notificacao.length > 0 ) {
        setTimeout(() => {
            if(!noficacao_esta_aberta) {
                for (let c = 0; c < User.Notificacao.length; c++) {
                    if(User.Notificacao[c].Lida == false) {
                        array_notificacoes_nao_vistas.push(User.Notificacao[c])
                    }
                }
    
                function Mostrar_Notificacoes() {
                    let texto = `<h1>${array_notificacoes_nao_vistas[0].Titulo}</h1>
                    <p>${array_notificacoes_nao_vistas[0].Mensagem}</p>`
                    Notificar_Infos(texto, array_notificacoes_nao_vistas[0].Config.Comando, array_notificacoes_nao_vistas[0].Config.Texto_Btn, array_notificacoes_nao_vistas[0].Config.Link).then((resp) => {
                        if(resp) {
                            if(array_notificacoes_nao_vistas[0].Extra == 'Postar Música') {
                                document.getElementById('input_add_musica').value = document.getElementById('link_notificacao').href
                                Postar_Musica('Abrir Página: adicionarmusicas')   
                            }
                        }
                        
                        Remover_Notificacao_User(array_notificacoes_nao_vistas[0])
                        Carregar_Notificacaoes()
                    })
                } Mostrar_Notificacoes()
            } else {
                Carregar_Notificacaoes()
            }
        }, 2000)
    }
}

function Remover_Notificacao_User(Notificacao) {
    for (let c = 0; c < User.Notificacao.length; c++) {
        if(User.Notificacao[c].ID == Notificacao.ID) {
            User.Notificacao.splice(c, 1)
            db.collection('Users').doc(User.ID).update({ Notificacao: User.Notificacao })
            break
        }
    }
}

//! Notificações em tempo real
function Enviar_Notificacao_Tempo_Real(Destinatario, Titulo, Desc, Modelo='Modelo2', Comando=null, Img=null, Temporaria=false, Btn1='Fechar', Btn2=null) {
    const Nova_Notificacao = {
        Titulo,
        Desc,
        Img,
        Temporaria,
        Btn1,
        Btn2,
        ID: gerarId(),
        Data: getDataAtual(),
        Enviada_Por: User.ID,
        Destinatario,
        Modelo,
        Comando
    }

    let Todas_Notificacoes = []
    db.collection('Notificacoes_Users').get().then((snapshot) => {
        let contador = 0

        snapshot.docs.forEach(Notificacoes => {
            const InfoUsers = Notificacoes.data()

            Todas_Notificacoes.push(InfoUsers)

            Todas_Notificacoes[contador].ID = Notificacoes.id
            contador++
        })
        let ja_tem = false
        let contador_notificacao_user = undefined
        for (let c = 0; c < Todas_Notificacoes.length; c++) {
            if(Todas_Notificacoes[c].ID == Destinatario) {
                ja_tem = true
                contador_notificacao_user = c
                break
            }
        }

        //! Caso já tenha um documento em Notificacoes_User 
        if(ja_tem) {
            Todas_Notificacoes[contador_notificacao_user].Notificacoes.push(Nova_Notificacao)
            db.collection('Notificacoes_Users').doc(Todas_Notificacoes[contador_notificacao_user].ID).update({ Notificacoes: Todas_Notificacoes[contador_notificacao_user].Notificacoes }).then(() => {
                console.log('Notificação enviada com sucesso');
            })
        } else {
            const Notificacoes_User = {
                Notificacoes: [Nova_Notificacao]
            }
            db.collection('Notificacoes_Users').doc(Destinatario).set(Notificacoes_User).then(() => {
                console.log('Criada a notificaçao com sucesso!')
            })
        }
    })
}

//! Vai mostrar as notificações em tempo real
let Todas_Notificacoes_Tempo_Real_User = []
function Carregar_Notificacaoes_Em_Tempo_Real() {
    db.collection('Notificacoes_Users').onSnapshot((snapshot) => {
        Todas_Notificacoes_Tempo_Real_User = []
        let Todas_Notificacoes = []
        let contador = 0

        snapshot.docs.forEach(Notificacoes => {
            const InfoUsers = Notificacoes.data()

            Todas_Notificacoes.push(InfoUsers)

            Todas_Notificacoes[contador].ID = Notificacoes.id
            contador++
        })

        for (let c = 0; c < Todas_Notificacoes.length; c++) {
            if(Todas_Notificacoes[c].ID == User.ID) {
                Todas_Notificacoes_Tempo_Real_User.push(...Todas_Notificacoes[c].Notificacoes)
                Mostrar_Notificaco_Tempo_Real()
                break
            }
        }
    })
}

let notificacao_tempo_real_aberta = false
const container_notificacoes_tempo_real = document.getElementById('container_notificacoes_tempo_real')
const container_infos_notificacoes = document.getElementById('container_infos_notificacoes')

const container_img_notificacao_tempo_real = document.getElementById('container_img_notificacao_tempo_real')
const titulo_notificacao_tempo_real = document.getElementById('titulo_notificacao_tempo_real')
const texto_notificacao_tempo_real = document.getElementById('texto_notificacao_tempo_real')

const container_btns_notificacao_tempo_real = document.getElementById('container_btns_notificacao_tempo_real')
// const img_notificacao_tempo_real = document.getElementById('img_notificacao_tempo_real')
// const btn_fechar_notificacao_tempo_real = document.getElementById('btn_fechar_notificacao_tempo_real')
// const btn_notificacao_tempo_real = document.getElementById('btn_notificacao_tempo_real')

function Zerar_Mostrar_Notificaco_Tempo_Real(Comando='') {
    container_notificacoes_tempo_real.className = ''
    setTimeout(() => {
        container_img_notificacao_tempo_real.innerHTML = ''
        container_btns_notificacao_tempo_real.innerHTML = ''
        titulo_notificacao_tempo_real.innerText = ''
        texto_notificacao_tempo_real.innerText = ''
        // btn_fechar_notificacao_tempo_real.innerText = 'Fehcar'
        // btn_notificacao_tempo_real.innerText = ''
        notificacao_tempo_real_aberta = false

        if(Comando == 'Salvar') {
            db.collection('Notificacoes_Users').doc(User.ID).update({ Notificacoes: Todas_Notificacoes_Tempo_Real_User }).then(() => {
                console.log('Salvou no banco de dados')
            })
        }
    }, 2000)
}

function Mostrar_Notificaco_Tempo_Real() {
    return new Promise((resolve, reject) => {
        
        function Notificar(Notificacao) {
            container_img_notificacao_tempo_real.innerHTML = ''
            container_btns_notificacao_tempo_real.innerHTML = ''
            const img_notificacao_tempo_real = document.createElement('img')
            const btn_fechar_notificacao_tempo_real = document.createElement('button')
            const btn_notificacao_tempo_real = document.createElement('button')

            img_notificacao_tempo_real.id = 'img_notificacao_tempo_real'
            btn_fechar_notificacao_tempo_real.id = 'btn_fechar_notificacao_tempo_real'
            btn_notificacao_tempo_real.id = 'btn_notificacao_tempo_real'

            notificacao_tempo_real_aberta = true
            if(Notificacao.Img != null) {
                img_notificacao_tempo_real.src = Notificacao.Img
            }
        
            Notificacao.Titulo = escapeHtml(Notificacao.Titulo)
            Notificacao.Desc = escapeHtml(Notificacao.Desc)

            titulo_notificacao_tempo_real.innerHTML = substituirCor_cor(substituirTexto_cor(Notificacao.Titulo))
            texto_notificacao_tempo_real.innerHTML = substituirCor_cor(substituirTexto_cor(Notificacao.Desc))
        
            btn_fechar_notificacao_tempo_real.innerText = Notificacao.Btn1
        
            if(Notificacao.Btn2 != null) {
                btn_notificacao_tempo_real.style.display = 'block'
                btn_notificacao_tempo_real.innerText = Notificacao.Btn2
            } else {
                btn_notificacao_tempo_real.style.display = 'none'
            }
        
            container_infos_notificacoes.className = Notificacao.Modelo
        
            if(!fila_aberta && !telca_tocando_agora_aberta && Listas_Prox.Indice == undefined) {
                container_notificacoes_tempo_real.className = 'active'
            } else if(!fila_aberta && !telca_tocando_agora_aberta && Listas_Prox.Indice != undefined) {
                container_notificacoes_tempo_real.className = 'active1'
        
            }  else {
                container_notificacoes_tempo_real.className = 'active2'
            }
        
            Todas_Notificacoes_Tempo_Real_User.shift()

            //! AppendChild
            container_img_notificacao_tempo_real.appendChild(img_notificacao_tempo_real)
            container_btns_notificacao_tempo_real.appendChild(btn_fechar_notificacao_tempo_real)
            container_btns_notificacao_tempo_real.appendChild(btn_notificacao_tempo_real)
        
            //! Funções
            btn_fechar_notificacao_tempo_real.addEventListener('click', () => {
                Zerar_Mostrar_Notificaco_Tempo_Real('Salvar')
                resolve(false)
            })

            let user_carregado
            if(Notificacao.Comando.includes('Novo User Abrir Playlist:')) {
                for (let c = 0; c < Todos_Usuarios.length; c++) {
                    if(Todos_Usuarios[c].ID == Notificacao.Enviada_Por) {
                        user_carregado = Todos_Usuarios[c]
                        break
                    }
                }
            } else if(Notificacao.Comando.includes('User Removido Playlist:')) {
                for (let c = 0; c < Todos_Usuarios.length; c++) {
                    if(Todos_Usuarios[c].ID == Notificacao.Comando.replace('User Removido Playlist:', '')) {
                        user_carregado = Todos_Usuarios[c]
                        break
                    }
                }
            }

            btn_notificacao_tempo_real.addEventListener('click', () => {
                Zerar_Mostrar_Notificaco_Tempo_Real('Salvar')
                resolve(true)

                if(Notificacao.Comando != null) {
                    if(Notificacao.Comando.includes('Novo User Abrir Playlist:')) {
                        Abrir_Pagina('playlist', Notificacao.Comando.replace('Novo User Abrir Playlist:', ''))
                    }
                }
            })

            if(Notificacao.Comando.includes('Novo User Abrir Playlist:') || Notificacao.Comando.includes('User Removido Playlist:')) {
                img_notificacao_tempo_real.style.cursor = 'pointer'
                img_notificacao_tempo_real.addEventListener('click', () => {
                    Carregar_Perfil(user_carregado)
                })

                texto_notificacao_tempo_real.querySelector('strong').style.cursor = 'pointer'
                texto_notificacao_tempo_real.querySelector('strong').addEventListener('click', () => {
                    Carregar_Perfil(user_carregado)
                }) 

            } else if(Notificacao.Comando.includes('User Banido Playlist:')) {
                img_notificacao_tempo_real.style.cursor = 'pointer'
                img_notificacao_tempo_real.addEventListener('click', () => {
                    Carregar_Perfil(User)
                })

                texto_notificacao_tempo_real.querySelector('strong').style.cursor = 'pointer'

                let Playlist_Carregada
                for (let c = 0; c < TodasPlaylists.length; c++) {
                    if(TodasPlaylists[c].ID == texto_notificacao_tempo_real.querySelector('strong').innerText) {
                        Playlist_Carregada = TodasPlaylists[c]
                        break
                    }
                }

                texto_notificacao_tempo_real.querySelector('strong').innerText = Playlist_Carregada.Nome
                texto_notificacao_tempo_real.querySelector('strong').addEventListener('click', () => {
                    Abrir_Pagina('playlist', Playlist_Carregada.ID)
                }) 
            }
        } 

        if(Todas_Notificacoes_Tempo_Real_User.length > 0) {
            Notificar(Todas_Notificacoes_Tempo_Real_User[0])
        }
    
        let intervalo_notificacao = setInterval(() => {
            if(Todas_Notificacoes_Tempo_Real_User.length > 0 && !notificacao_tempo_real_aberta) {
                Notificar(Todas_Notificacoes_Tempo_Real_User[0])
            } else if(Todas_Notificacoes_Tempo_Real_User.length <= 0) {
                clearInterval(intervalo_notificacao)
            }
        }, 2000)  
    })
}
