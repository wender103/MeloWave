let Pd_Abrir_Lista_Amigos = true
let Lista_Amigos_Aberta = false
const Container_Lista_Amigos = document.getElementById("Container_Lista_Amigos")
let Listner_Ativado = false

function Abrir_Lista_Amigos() {
    if(Pd_Abrir_Lista_Amigos && Device.Tipo != 'Mobile') {

        if(!Listner_Ativado) {
            Listner_Amigos()
        }

        let time_esperar = 0

        if(tela_tocando_agora_aberta || fila_aberta) {
            time_esperar = 600
        }

        Fechar_Tela_Tocando_Agora()
        Fechar_Fila()
        Pd_Abrir_Lista_Amigos = false

        setTimeout(() => {
            Mostrar_Max_Musicas()
            Pd_Abrir_Lista_Amigos = true
        }, 600)

        if(!Lista_Amigos_Aberta) {
            setTimeout(() => {
                Lista_Amigos_Aberta = true
                main.style.transition = '500ms width ease-in-out'
                main.style.width = 'calc(100vw - 386px)'

        
                nav_main.style.transition = '500ms width ease-in-out'
                nav_main.style.width = 'calc(100vw - 386px)'

                Container_Lista_Amigos.style.transition = '500ms right ease-in-out'
        
                Container_Lista_Amigos.style.right = '8px'
        
                setTimeout(() => {
                    main.style.transition = 'none'
                    nav_main.style.transition = 'none'  
                }, 600)
            }, time_esperar)
    
        } else {
            Fechar_Lista_Amigos()
        }

        setTimeout(() => {
            Mostrar_Max_Musicas()
        }, 300)
    }
}

function Fechar_Lista_Amigos() {
    Pd_Abrir_Lista_Amigos = true
    main.style.transition = '500ms width ease-in-out'
    main.style.width = 'calc(100vw - 96px)'
    Container_Lista_Amigos.style.right = '-282px'

    nav_main.style.transition = '500ms width ease-in-out'
    nav_main.style.width = 'calc(100vw - 96px)'
    
    setTimeout(() => {
        main.style.transition = 'none'
        nav_main.style.transition = 'none'
        Lista_Amigos_Aberta = false
    }, 600)
}

const Input_Email_Adicionar_Amigo = document.getElementById('Input_Email_Adicionar_Amigo')
const Btn_Adicionar_Amigo = document.getElementById('Btn_Adicionar_Amigo')

Btn_Adicionar_Amigo.addEventListener('click', () => {
    Adicionar_Amigo()
})

function Adicionar_Amigo() {
    if(Input_Email_Adicionar_Amigo.value.trim() != '') {
        let Ja_Sao_Amigos = false
        for (let c = 0; c < User.Social.Amigos.Aceitos.length; c++) {
            if(User.Social.Amigos.Aceitos[c] == Input_Email_Adicionar_Amigo.value) {
                Ja_Sao_Amigos = true
                break
            }
        }

        if(!Ja_Sao_Amigos) {
            db.collection('Users').get().then((snapshot) => {
                let contador = 0

                snapshot.docs.forEach(Users => {
                    const InfoUsers = Users.data()

                    Todos_Usuarios.push(InfoUsers)

                    Todos_Usuarios[contador].ID = Users.id
                    contador++
                })

                let Pessoa_Encontrada = false
                for (let c = 0; c < Todos_Usuarios.length; c++) {
                    if(Todos_Usuarios[c].Email == Input_Email_Adicionar_Amigo.value) {
                        Enviar_Notificacao_Tempo_Real(Todos_Usuarios[c].ID, 'Solicitação de Amizade', `*#00ceff*${User.Nome}*#00ceff* enviou uma solicitação de amizade!`, 'Modelo1', 'Aceitar Pedido De Amizade', User.Perfil.Img_Perfil, false, 'Recusar', 'Aceitar')
                        Pessoa_Encontrada = true
                        break 
                    }
                }

                if(!Pessoa_Encontrada) {
                    Notificar_Infos('😢 Não encontramos esse usuário, verifique se o email está correto. 😢')
                } else {
                    Notificar_Infos('🎉 Solicitação enviada com sucesso, aguarde a resposta dele(a)! 😊')
                    Input_Email_Adicionar_Amigo.value = ''
                }
            })
        } else {
            Notificar_Infos('🎉 Vocês já são amigos! 👥✨')
        }
    }
}

function Aceitar_Pedido_Amizade(_ID) {
    db.collection('Users').get().then((snapshot) => {
        let contador = 0

        snapshot.docs.forEach(Users => {
            const InfoUsers = Users.data()

            Todos_Usuarios.push(InfoUsers)

            Todos_Usuarios[contador].ID = Users.id
            contador++
        })

        for (let c = 0; c < Todos_Usuarios.length; c++) {
            if(Todos_Usuarios[c].ID == _ID) {
                Todos_Usuarios[c].Social.Amigos.Aceitos.push(User.ID)
                User.Social.Amigos.Aceitos.push(_ID)
                db.collection('Users').doc(_ID).update({ Social: Todos_Usuarios[c].Social }).then(() => {
                    db.collection('Users').doc(User.ID).update({ Social: User.Social }).then(() => {
                        Notificar_Infos('🎉 Parabéns, você agora é amigo dele(a)! 😍')

                        Enviar_Notificacao_Tempo_Real(_ID, 'Amizade Confirmada', `Parabéns! *#00ceff*${User.Nome}*#00ceff* aceitou seu pedido de amizade! Agora vocês são amigos.`, 'Modelo1', '', User.Perfil.Img_Perfil, true, 'Fechar')
                    })
                })
            }
        }
   })
}

const Atividade = {
    Musica: 'id da musga',
    Estado_Online: 'Online',
}

let Todos_Amigos = []
const listaAmigosContainer = document.querySelector('#Container_Divs_Lista_Amigos')
function Carregar_Amigos() {
    let Apagar_Tudo = true

    let Aceitos = User.Social.Amigos.Aceitos
    for (let c = 0; c < Aceitos.length; c++) {
        for (let b = 0; b < Todos_Amigos.length; b++) {
            if (Todos_Amigos[b].ID === Aceitos[c]) {
                const usuario = Todos_Amigos[b]

                let Musica_Atividade = {
                    Cores: ['#7f7f7f', '#7f7f7f', '#7f7f7f', '#7f7f7f', '#7f7f7f', '#7f7f7f', '#7f7f7f'],
                    Nome: 'Cowgirls (feat. ERNEST)',
                    Autor: 'Morgan Wallen, ERNEST',
                    Imagens:['', '', '']
                }

                let User_On = usuario.Atividade.Estado_Online != 'Offline'
                let Mostrar_Musica = User_On && usuario.Atividade.Musica != null
                
                if (usuario.Atividade.Musica != null) {
                    for (let a = 0; a < TodasMusicas.length; a++) {
                        if (TodasMusicas[a].ID == usuario.Atividade.Musica) {
                            Musica_Atividade = TodasMusicas[a]
                            break
                        }
                    }
                }


                //! Carregar img do perfil             
                carregarImagem(usuario.Perfil.Img_Perfil, function(imgPerfil) {
                    let Img_Perfil

                    if(imgPerfil) {
                        Img_Perfil = usuario.Perfil.Img_Perfil

                    } else {
                        if(usuario.Perfil.Img_Email) {
                            carregarImagem(usuario.Perfil.Img_Email, function(imgEmail) {
                                if(imgEmail) {
                                    Img_Perfil = usuario.Perfil.Img_Email
                                } else {
                                    Img_Perfil = 'Assets/Imgs/user_anonimo.png'
                                }
                            })
                        }
                    }

                    carregarImagem(usuario.Perfil.Img_Background, function(imgPerfil) {
                        let Img_Background
                        
                        if(imgPerfil) {
                            Img_Background = usuario.Perfil.Img_Background

                        } else {
                            if(usuario.Perfil.Img_Email) {
                                carregarImagem(usuario.Perfil.Img_Email, function(imgEmail) {
                                    if(imgEmail) {
                                        Img_Background = usuario.Perfil.Img_Email
                                    } else {
                                        Img_Background = 'Assets/Imgs/user_anonimo.png'
                                    }
                                })
                            }
                        }

                        let Ja_Esta_Na_Lista = false
                        const Container_Amigo = document.querySelectorAll('.Container_Amigo')

                        for (let g = 0; g < Container_Amigo.length; g++) {                                  
                            if (Container_Amigo[g].id == `Amigo_${usuario.ID}`) {
                                Ja_Esta_Na_Lista = true

                                Container_Amigo[g].querySelector('.Adicional_Perfil_Amigo').style.backgroundImage = `linear-gradient(${Musica_Atividade.Cores[1]}, ${Musica_Atividade.Cores[2]})`
                                Container_Amigo[g].querySelector('.Adicional_Perfil_Amigo').querySelector('.Background_Adicional_Perfil_Amigo').querySelector('img').src = Img_Background
                                Container_Amigo[g].querySelector('.Container_Img_Perfil_Amigo').querySelector('img').src = Img_Perfil
                                Container_Amigo[g].querySelector('.Container_Img_Perfil_Amigo').querySelector('.Boll_Online').classList.add(User_On ? 'Online' : 'Offline')
                                Container_Amigo[g].querySelector('.Nome_User_Adicional_Perfil_Amigo').textContent = usuario.Nome

                                if(Mostrar_Musica) {
                                    Container_Amigo[g].querySelector('.Atividade_User_Adicional_Perfil_Amigo').id = `Tocar_Musica_Amigo_${Musica_Atividade.ID}`

                                    Container_Amigo[g].querySelector('.Atividade_User_Adicional_Perfil_Amigo').querySelector('.Atividade').querySelector('.Img_Musica_Atividade').querySelector('img').src = Musica_Atividade.Imagens[1]
                                    Container_Amigo[g].querySelector('.Atividade_User_Adicional_Perfil_Amigo').querySelector('.Atividade').querySelector('.Texto_Musica_Atividade').querySelector('p').innerText = Musica_Atividade.Nome
                                    Container_Amigo[g].querySelector('.Atividade_User_Adicional_Perfil_Amigo').querySelector('.Atividade').querySelector('.Texto_Musica_Atividade').querySelector('span').innerText = Musica_Atividade.Autor
                                } else {
                                    Container_Amigo[g].querySelector('.Atividade_User_Adicional_Perfil_Amigo').style.display = 'none'
                                }

                                Container_Amigo[g].querySelector('.Perfil_Amigo').querySelector('.Container_Img_Perfil_Amigo').querySelector('img').src = Img_Perfil
                                Container_Amigo[g].querySelector('.Perfil_Amigo').querySelector('.Container_Img_Perfil_Amigo').querySelector('.Boll_Online').classList.add(User_On ? 'Online' : 'Offline')
                                Container_Amigo[g].querySelector('.Perfil_Amigo').querySelector('p').classList.add(User_On ? 'Online...' : 'Offline...')
                            }
                        }

                        if(!Ja_Esta_Na_Lista) {
                            if(Apagar_Tudo) {
                                Apagar_Tudo = false
                                listaAmigosContainer.innerHTML = '' // Limpa a lista antes de renderizar os amigos
                            }

                            // Cria o elemento principal .Container_Amigo
                            const containerAmigo = document.createElement('div')
                            containerAmigo.classList.add('Container_Amigo')
                            containerAmigo.id = `Amigo_${usuario.ID}`
                            
                            // Adicional_Perfil_Amigo
                            containerAmigo.innerHTML = `
                                <div class="Adicional_Perfil_Amigo" style="background-image: linear-gradient(${Musica_Atividade.Cores[1]}, ${Musica_Atividade.Cores[2]});">
                                    <div class="Background_Adicional_Perfil_Amigo">
                                        <img src="${usuario.Perfil.Img_Background}" alt="">
                                    </div>
                                    <div class="Container_Img_Perfil_Amigo">
                                        <img src="${Img_Perfil}" alt="">
                                        <div class="${User_On ? `Boll_Online` : `Boll_Online Offline`}"></div>
                                    </div>
                                    <h3 class="Nome_User_Adicional_Perfil_Amigo">${sanitizeHtml(usuario.Nome)}</h3>
                                    <div class="Atividade_User_Adicional_Perfil_Amigo" id="Tocar_Musica_Amigo_${Musica_Atividade.ID}" style="display: ${Mostrar_Musica ? 'block' : 'none'}">
                                        <p class="Ouvindo">Ouvindo</p>
                                        <div class="Atividade">
                                            <div class="Img_Musica_Atividade">
                                                <img src="${Musica_Atividade.Imagens[1]}" alt="">
                                            </div>
                                            <div class="Texto_Musica_Atividade">
                                                <p>${Musica_Atividade.Nome || 'Cowgirls (feat. ERNEST)'}</p>
                                                <span>${Musica_Atividade.Autor || 'Morgan Wallen, ERNEST'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="Perfil_Amigo" id="Perfil_Amigo_${usuario.ID}">
                                    <div class="Container_Img_Perfil_Amigo">
                                        <img src="${Img_Perfil}" alt="">
                                        <div class="${User_On ? `Boll_Online` : `Boll_Online Offline`}"></div>
                                    </div>
                                    <div class="Container_Nome_Perfil_Amigo">
                                        <h3>${sanitizeHtml(usuario.Nome)}</h3>
                                        <p class="${User_On ? '' : `Offline`}">${User_On ? `Online...` : `Offline...`}</p>
                                    </div>
                                </div>
                            `

                            // Adiciona o container de amigo na lista de amigos
                            listaAmigosContainer.appendChild(containerAmigo)

                            // Seleciona os elementos para manipulação
                            const perfilAmigo = containerAmigo.querySelector('.Perfil_Amigo')
                            const adicionalPerfilAmigo = containerAmigo.querySelector('.Adicional_Perfil_Amigo')

                            // Evento para abrir/fechar perfil adicional ao clicar no Perfil_Amigo
                            perfilAmigo.addEventListener('click', () => {
                                // Fecha todos os outros perfis abertos
                                const perfisAbertos = document.querySelectorAll('.Adicional_Perfil_Amigo.open')
                                perfisAbertos.forEach((perfil) => {
                                    perfil.classList.remove('open')
                                    perfil.style.maxHeight = '0'
                                })

                                // Abre o perfil clicado
                                adicionalPerfilAmigo.classList.toggle('open')
                                adicionalPerfilAmigo.style.maxHeight = adicionalPerfilAmigo.classList.contains('open') ? adicionalPerfilAmigo.scrollHeight + 'px' : '0'
                            })

                            perfilAmigo.addEventListener('contextmenu', (event) => {
                                Ativar_Opcoes_Click_Direita(perfilAmigo.id)
                                posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
                            })

                            // Evento para fechar ao clicar fora do perfil
                            document.addEventListener('click', (event) => {
                                if (!containerAmigo.contains(event.target)) {
                                    adicionalPerfilAmigo.classList.remove('open')
                                    adicionalPerfilAmigo.style.maxHeight = '0'
                                }
                            })
                        }
                    })
                })
            }
        }
    }

    const Atividade_User_Adicional_Perfil_Amigo = document.querySelectorAll('.Atividade_User_Adicional_Perfil_Amigo')
    Atividade_User_Adicional_Perfil_Amigo.forEach((Atividade_User_Adicional_Perfil_Amigo) => {
        Atividade_User_Adicional_Perfil_Amigo.addEventListener('click', () => {
            Tocar_Musica_Amigo(Atividade_User_Adicional_Perfil_Amigo.id.replace('Tocar_Musica_Amigo_', ''))
        })
    })
}
function Tocar_Musica_Amigo(_ID_Musica) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(TodasMusicas[c].ID == _ID_Musica) {
            Listas_Prox.A_Seguir.push(TodasMusicas[c])
            Proxima_Musica()
            Atualizar_Atividade(false, TodasMusicas[c])
        }
    }
}

window.addEventListener('beforeunload', (event) => {
    // Mensagem que será exibida para o usuário
    // Defina a variável para a atualização do banco
    let Atividades_Atualizadas = {}

    // Se o usuário confirmar a saída
    Atividades_Atualizadas = {
        Estado_Online: 'Offline',
        Musica: null
    }

    // Atualize o banco de dados com a atividade
    db.collection('Amigos').doc(User.ID).update({ Atividade: Atividades_Atualizadas })

    // Você pode cancelar a ação de saída para que o código execute, mas isso pode não ser necessário em muitos navegadores.
    event.preventDefault(); // Impede a saída imediata
    return event.returnValue = '' // Requerido para que o navegador mostre a mensagem de confirmação
})

function Atualizar_Atividade(Offline = false, Musica_Atual) {
    if(!Musica_Atual) {
        Musica_Atual = Listas_Prox.MusicaAtual
    }

    const Atividade_Atualizada = {
        Estado_Online: Offline ? 'Offline' : 'Online',
        Musica: Musica_Atual.ID ? Musica_Atual.ID : null
    }

    db.collection('Amigos').doc(User.ID).get().then((doc) => {
        if (doc.exists) {
            // Se o documento existe, faz a atualização
            db.collection('Amigos').doc(User.ID).update({ Atividade: Atividade_Atualizada })
        } else {
            db.collection('Amigos').doc(User.ID).set({ Atividade: Atividade_Atualizada })
        }
    }).catch((error) => {
        console.error('Erro ao verificar o documento:', error)
    })
}

function Listner_Amigos() {
    if (User.Social.Amigos.Aceitos.length > 0) {
        Listner_Ativado = true

        // Escuta para a coleção inteira
        db.collection('Amigos').onSnapshot((snapshot) => {
            Todos_Amigos = [] // Limpa a lista antes de recarregar

            for (let c = 0; c < Todos_Usuarios.length; c++) {
                let Aceitos = User.Social.Amigos.Aceitos
                for (let b = 0; b < Aceitos.length; b++) {
                    if(Aceitos[b] == Todos_Usuarios[c].ID) {
                        Todos_Amigos.push(Todos_Usuarios[c])
                    }
                }
            }
            
            snapshot.forEach((doc) => {
                let amigo = doc.data()
                amigo.ID = doc.id // Adiciona o ID ao objeto do amigo

                for (let c = 0; c < Todos_Amigos.length; c++) {
                    if(Todos_Amigos[c].ID == doc.id) {                        
                        Todos_Amigos[c].Atividade = {
                            Estado_Online: amigo.Atividade.Estado_Online,
                            Musica: amigo.Atividade.Musica
                        }
                    }    
                }
            })
            
            Carregar_Amigos() // Chama a função para exibir amigos
        })
    }
}

function Remover_Amigo_Lista_Amigos(_ID_Amigo) {
    db.collection('Users').get().then((snapshot) => {
        let contador = 0

        snapshot.docs.forEach(Users => {
            const InfoUsers = Users.data()

            Todos_Usuarios.push(InfoUsers)

            Todos_Usuarios[contador].ID = Users.id
            contador++
        })

        for (let c = 0; c < Todos_Usuarios.length; c++) {
            if(Todos_Usuarios[c].ID == _ID_Amigo) {

                for (let d = 0; d < Todos_Usuarios[c].Social.Amigos.Aceitos.length; d++) {
                    if(Todos_Usuarios[c].Social.Amigos.Aceitos[d] == User.ID) {
                        Todos_Usuarios[c].Social.Amigos.Aceitos.splice(d, 1)
                        db.collection('Users').doc(Todos_Usuarios[c].ID).update({ Social: Todos_Usuarios[c].Social })
                        break
                    }  
                }
            } else if(Todos_Usuarios[c].ID == User.ID) {
                
                for (let d = 0; d < Todos_Usuarios[c].Social.Amigos.Aceitos.length; d++) {
                    if(Todos_Usuarios[c].Social.Amigos.Aceitos[d] == _ID_Amigo) {
                        
                        Todos_Usuarios[c].Social.Amigos.Aceitos.splice(d, 1)
                        db.collection('Users').doc(Todos_Usuarios[c].ID).update({ Social: Todos_Usuarios[c].Social })
                        User = Todos_Usuarios[c]
                        listaAmigosContainer.innerHTML = ''
                        break
                    }  
                }
            }
        }
    })
}