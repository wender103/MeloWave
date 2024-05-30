
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

function Pegar_Usuarios() {
    db.collection('Users').get().then((snapshot) => {
        let contador = 0
        // console.log('Chamada feita, carregar info user')

        snapshot.docs.forEach(Users => {
            const InfoUsers = Users.data()

            Todos_Usuarios.push(InfoUsers)

            Todos_Usuarios[contador].ID = Users.id
            contador++
        })

        Logar_Na_Conta()
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
        location.reload()
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
                            Execultar_Funcoes_Ao_Carregar()
                        }
                    }
                }
    
                //? Vai cricar a conta do usuário
                if(!usuario_encontrado) {
                    console.log('usuário não encontrado')
    
                    const New_User = {
                        Email: val.email,
                        Nome: val.displayName,
                        Musicas_Curtidas: [],
                        Loja: {
                            Pontos: 0,
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
                            Playlists: [],
                            Users: [],
                            Artistas: [],
                            Pesquisa: [],
                        },
                        Dispositivos: {
                            Todos: [],
                            Atual: []
                        },
                        Estado_Da_Conta: 'Ativa',
                        Notificacao: [],
                        Perfil: {
                            Img_Perfil: val.photoURL,
                            Img_Background: null,
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
                        }, 500)
                    })
                }
            } else if(!val.emailVerified) {
                alert('Este email não é um email verificado!')
            }
        } else {
            Carregar_Perfil_Anonimo_User()
        }
    })
}

function Atualizar_User() {
    try {
        document.getElementById('btns_cadastro').style.display = 'none'
        document.getElementById('btns_direita').style.display = 'flex'
    } catch{}
}