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
function Carregar_Amigos() {
    const listaAmigosContainer = document.querySelector('#Container_Divs_Lista_Amigos')
    listaAmigosContainer.innerHTML = '' // Limpa a lista antes de renderizar os amigos

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

                // Cria o elemento principal .Container_Amigo
                const containerAmigo = document.createElement('div')
                containerAmigo.classList.add('Container_Amigo')

                // Adicional_Perfil_Amigo
                containerAmigo.innerHTML = `
                    <div class="Adicional_Perfil_Amigo" style="background-image: linear-gradient(${Musica_Atividade.Cores[1]}, ${Musica_Atividade.Cores[2]});">
                        <div class="Background_Adicional_Perfil_Amigo">
                            <img src="${usuario.Perfil.Img_Background || 'https://akamai.sscdn.co/uploadfile/letras/albuns/d/a/8/9/1969261695993301.jpg'}" alt="">
                        </div>
                        <div class="Container_Img_Perfil_Amigo">
                            <img src="${usuario.Perfil.Img_Perfil || 'https://w.wallhaven.cc/full/dg/wallhaven-dg1yeg.jpg'}" alt="">
                            <div class="${User_On ? `Boll_Online` : `Boll_Online Offline`}"></div>
                        </div>
                        <h3 class="Nome_User_Adicional_Perfil_Amigo">${sanitizeHtml(usuario.Nome)}</h3>
                        <div class="Atividade_User_Adicional_Perfil_Amigo" onclick="Tocar_Musica_Amigo('${Musica_Atividade.ID}')">
                            ${Mostrar_Musica ? `
                                <p class="Ouvindo">Ouvindo</p>
                                <div class="Atividade">
                                    <div class="Img_Musica_Atividade">
                                        <img src="${Musica_Atividade.Imagens[1] || 'https://storage.googleapis.com/melowave-f6f7c.appspot.com/MusicasPostadas/95ff4b22-1dbe-4e5c-b4b1-37015228386a/200x200_cMFwIjLaAFY_520d8dc8-a71b-4e2f-8012-167d546bedd9.jpg'}" alt="">
                                    </div>
                                    <div class="Texto_Musica_Atividade">
                                        <p>${Musica_Atividade.Nome || 'Cowgirls (feat. ERNEST)'}</p>
                                        <span>${Musica_Atividade.Autor || 'Morgan Wallen, ERNEST'}</span>
                                    </div>
                                </div>
                            ` : ''} 
                        </div>
                    </div>
                    <div class="Perfil_Amigo">
                        <div class="Container_Img_Perfil_Amigo">
                            <img src="${usuario.Perfil.Img_Perfil || 'https://w.wallhaven.cc/full/dg/wallhaven-dg1yeg.jpg'}" alt="">
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

                // Evento para fechar ao clicar fora do perfil
                document.addEventListener('click', (event) => {
                    if (!containerAmigo.contains(event.target)) {
                        adicionalPerfilAmigo.classList.remove('open')
                        adicionalPerfilAmigo.style.maxHeight = '0'
                    }
                })
            }
        }
    }
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
            console.log('Atividade atualizada com sucesso!')
        } else {
            db.collection('Amigos').doc(User.ID).set({ Atividade: Atividade_Atualizada })
            // Se o documento não existe, exibe uma mensagem ou toma outra ação
            console.log(`Documento com ID ${User.ID} não encontrado.`)
        }
    }).catch((error) => {
        console.error('Erro ao verificar o documento:', error)
    })
}

function Listner_Amigos() {
    if (User.Social.Amigos.Aceitos.length > 0) {
        Listner_Ativado = true
        console.log('Arroz')

        // Escuta para a coleção inteira
        db.collection('Amigos').onSnapshot((snapshot) => {
            console.log('Dentro do listener')
            
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
                        console.log(amigo)
                        
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