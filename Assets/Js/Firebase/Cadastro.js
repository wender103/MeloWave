
//! Vai checar se o user está conectado em uma conta
auth.onAuthStateChanged((val) => {
    if(val == null || val == undefined) {
        //! Caso o user não esteja conectado
        location.href = 'Cadastro.html'
    }
})

function getDataAtualCadastro() {
    var data = new Date()
    var dia = data.getDate()
    var mes = data.getMonth() + 1 // Os meses em JavaScript são baseados em zero, então adicionamos 1
    var ano = data.getFullYear()

    // Formata a data para 'dd/mm/aaaa'
    var dataFormatada = (dia < 10 ? '0' : '') + dia + '/' + (mes < 10 ? '0' : '') + mes + '/' + ano

    return dataFormatada
}

let Todos_Usuarios = []
let User_logado = false
let User
let Infos_Email

function Pegar_Usuarios(Comando='') {
    Todos_Usuarios = []
    db.collection('Users').get().then((snapshot) => {
        let contador = 0
        // console.log('Chamada feita, carregar info user')

        snapshot.docs.forEach(Users => {
            const InfoUsers = Users.data()

            Todos_Usuarios.push(InfoUsers)

            Todos_Usuarios[contador].ID = Users.id
            contador++
        })

        if(!Comando.includes('Não Logar')) {
            Logar_Na_Conta()
        }
    })

} Pegar_Usuarios()

function Abrir_Entrar() {
    document.getElementById('Container_Cadastro').style.display = 'flex'
}

try {
    document.getElementById('Container_Cadastro').addEventListener('click', (e) => {
        let el = e.target.id
    
        if(el == 'Container_Cadastro') {
            Fechar_Entrar()
        }
    })
} catch{}

function Fechar_Entrar() {
    try {
        document.getElementById('Container_Cadastro').style.display = 'none'
    } catch{}
}

let user_fez_login = false
function Login() {
    auth.signInWithPopup(provider).then(() => {
        location.reload()
    })
    user_fez_login = true
}

function logout() {
    auth.signOut()
      .then(() => {
        console.log('Deslogado com sucesso!') // Mensagem de sucesso
        // Aqui você pode redirecionar o usuário para uma página de login, por exemplo
        location.href = 'Cadastro.html'
      })
      .catch((error) => {
        console.error('Erro ao deslogar:', error) // Mensagem de erro
      })
}

function Logar_Na_Conta() {
    User_logado = false
    auth.onAuthStateChanged((val) => {
        if(val) {
            if(!User_logado && val.emailVerified) {
                User_logado = true

                Infos_Email = {
                    Nome: val.displayName,
                    Email: val.email,
                    Foto_Perfil: val.photoURL,
                }

                try {
                    document.getElementById('img_perfil_emial').src = val.photoURL
                } catch{}
    
                let usuario_encontrado = false
                for (let c = 0; c < Todos_Usuarios.length; c++) {
                    if(Todos_Usuarios[c].Email == val.email) {
                        usuario_encontrado = true
                        User = Todos_Usuarios[c]
                        Fechar_Entrar()
                        Atualizar_User()

                        if(location.href.includes('aviso')) {
                            Execultar_Funcoes_Ao_Carregar().then(() => {
                                closeLoadingScreen()
                            })                 
                        } else {
                            const Atividades_Atualizadas = {
                                Estado_Online: 'Online',
                                Musica: Listas_Prox.MusicaAtual.ID ? Listas_Prox.MusicaAtual.ID : null
                            }
                            db.collection('Amigos').doc(User.ID).update({ Atividade: Atividades_Atualizadas })
                        }

                    }
                }
    
                //? Vai cricar a conta do usuário
                if(!usuario_encontrado) {
                    closeLoadingScreen()
                    Notificar_Infos('Parece que não encontramos nenhuma conta associada a este e-mail. Você gostaria de criar uma nova conta? 😊🎶🚀', 'Confirmar', 'Criar conta').then((resp) => {

                        if(resp) {
                            console.log('usuário não encontrado')
        
                            const New_User = {
                                Email: val.email,
                                Nome: val.displayName,
                                Musicas_Curtidas: [],
                                Loja: {
                                    Pontos: 0,
                                },
                                Configuracoes: {
                                    Tema: 'Claro',
                                    Background: {
                                        blur: 20,
                                        brilho: 100,
                                        contraste: 100,
                                        saturacao: 100,
                                        Cores_Solidas: false
                                    },
                                    Transicoes_De_Faixas: true,
                                    Animacao_Detalhada: true,
                                    Mapeamento_De_Teclas: {
                                        Tela_Cheia: 'f',
                                        Mute: 'm',
                                        Play_Pause: 'p',
                                        Aumentar_Volume: '+',
                                        Diminuir_Volume: '-',
                                        Proxima_Musica: 'n',
                                        Musica_Anterior: 'b',
                                        Repetir_Musica: 'r',
                                        Alternar_Fullscreen: 't',
                                        Ver_Letra: 'l'
                                    }
                                },
                                Social: {
                                    Seguindo: [],
                                    Seguidores: [],
                                    Amigos: {
                                        Pendentes: [],
                                        Recusados: [],
                                        Aceitos: []
                                    },
                                    Artistas: [],
                                    Playlists_Curtidas: []
                                },
                                Gosto_Musical: {
                                    Generos: [],
                                    Artistas: [],
                                },
                                Historico: {
                                    Musicas: [],
                                    Outros: []
                                },
                                Dispositivos: {
                                    Todos: [],
                                    Atual: []
                                },
                                Estado_Da_Conta: {
                                    Estado: 'Ativo',
                                    Motivo: '',
                                    Tempo: '',
                                    Historico_De_Infracoes: [],
                                },
                                Notificacao: [],
                                Perfil: {
                                    Img_Perfil: val.photoURL,
                                    Img_Background: null,
                                    Img_Email: val.photoURL,
                                    Ouvintes: 0,
                                    Horas_Ouvindo: 0,
                                    Data_Criacao_Conta: getDataAtual()
                                },
                            }
            
                            db.collection('Users').add(New_User).then(() => {
                                Fechar_Entrar()
                                Atualizar_User()
    
                                setTimeout(() => {
                                    location.reload()
                                }, 100)
                            })
                        } else {
                            logout()
                        }
                    })
                }
            } else if(!val.emailVerified) {
                alert('Este email não é um email verificado!')
            }
        } else {
            try {
                Carregar_Perfil_Anonimo_User()
            } catch{closeLoadingScreen()}
        }
    })
}

function Atualizar_User() {
    try {
        document.getElementById('btns_cadastro').style.display = 'none'
        document.getElementById('btns_direita').style.display = 'flex'
    } catch{}
}