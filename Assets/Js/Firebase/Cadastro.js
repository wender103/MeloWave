
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

document.getElementById('Container_Cadastro').addEventListener('click', (e) => {
    let el = e.target.id

    if(el == 'Container_Cadastro') {
        Fechar_Entrar()
    }
})

function Fechar_Entrar() {
    document.getElementById('Container_Cadastro').style.display = 'none'
}

let user_fez_login = false
function Login() {
    auth.signInWithPopup(provider)
    user_fez_login = true
    Logar_Na_Conta()
}

function Logar_Na_Conta() {
    User_logado = false
    auth.onAuthStateChanged((val) => {
        if(val) {
            if(user_fez_login) {
                location.reload()
            }

            if(!User_logado && val.emailVerified) {
                User_logado = true
    
                let usuario_encontrado = false
                for (let c = 0; c < Todos_Usuarios.length; c++) {
                    if(Todos_Usuarios[c].Email == val.email) {
                        usuario_encontrado = true
                        User = Todos_Usuarios[c]
                        Fechar_Entrar()
                        Atualizar_User()
                    }
                }
    
                //? Vai cricar a conta do usuário
                if(!usuario_encontrado) {
                    console.log('usuário não encontrado')
    
                    const New_User = {
                        Email: val.email,
                        Nome: val.displayName,
                        Musicas_Curtidas: [],
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
    document.getElementById('btns_cadastro').style.display = 'none'
    document.getElementById('btns_direita').style.display = 'flex'
    document.getElementById('img_perfil_emial').src = User.Perfil.Img_Perfil
}