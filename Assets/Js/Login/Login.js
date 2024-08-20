const container_signIn = document.getElementById('container_signIn') //? Section sign in
const background_orange = document.getElementById('background_orange') //? background laranja
const container_background_orange = document.getElementById('container_background_orange') //? container dentro do background laranja
const container_CreatAcoonout = document.getElementById('container_CreatAcoonout') //? Section create account
let model_SignIn = true //? Vai identificar se o user quer fazer login ou cadastrar
let isAnimating = false //! Controle de animação em andamento

function changeModel() {
    if (isAnimating) return //? Impede nova ação durante a animação

    isAnimating = true //! Marca que uma animação está em progresso

    if (model_SignIn) {
        background_orange.className = 'left'
        scrollLeft()
        setTimeout(() => {
            container_CreatAcoonout.style.zIndex = 2
            container_signIn.style.zIndex = 0
            isAnimating = false //! Animação terminou
        }, 300)
        container_CreatAcoonout.style.left = '50%'
        container_signIn.style.left = '50%'
    } else {
        background_orange.className = 'right'
        scrollRight()
        setTimeout(() => {
            container_signIn.style.zIndex = 2
            container_CreatAcoonout.style.zIndex = 0
            isAnimating = false //! Animação terminou
        }, 300)
        container_signIn.style.left = '0%'
        container_CreatAcoonout.style.left = '0%'
    } 

    model_SignIn = !model_SignIn //? Alterna entre login e cadastro
}

function scrollRight() {
    container_background_orange.style.left = '-100%'
}

function scrollLeft() {
    container_background_orange.style.left = '0%'
}

//! ------------------------------------------- Funções de Cadastro e Login --------------------------------------------
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

function Pegar_Usuarios() {
    Todos_Usuarios = []
    db.collection('Users').get().then((snapshot) => {
        let contador = 0
        snapshot.docs.forEach(Users => {
            const InfoUsers = Users.data()

            Todos_Usuarios.push(InfoUsers)

            Todos_Usuarios[contador].ID = Users.id
            contador++
        })
    })

} Pegar_Usuarios()

function Checar_User_Tem_Conta(Email) {
    for (let c = 0; c < Todos_Usuarios.length; c++) {
        if(Todos_Usuarios[c].Email == Email) {
            return true
        }
    }

    return false
}

function logout() {
    auth.signOut()
}

let Criando_Conta = false
auth.onAuthStateChanged((val) => {
    if(val == null || val == undefined) {
        //! Caso o user não esteja conectado
        console.log(val)
    }

    try {
        //! Caso o use esteja conectado
        if(val.email) {
            if(Checar_User_Tem_Conta(val.email)) {
                location.href = 'index.html'

            } else {
                if(Criando_Conta) {
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
                            Transicoes_De_Faixas: false,
                            Animacao_Detalhada: false,
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
                        setTimeout(() => {
                            location.href = 'index.html'
                        }, 100)
                    })

                } else {
                    logout()
                    Notificar_Infos('🚫 Ops! Parece que essa conta não está cadastrada. Quer criar uma nova conta? 😅', 'Confirmar', 'Criar conta').then((resp) => {
                        if(resp) {
                            if(model_SignIn) {
                                changeModel() 
                            }
                        } else {
                            if(!model_SignIn) {
                                changeModel()
                            }
                        }
                    })
                }
            }
        }
    } catch (error) {
        console.warn(error)
    }
})

function Fazer_Login() {
    auth.signInWithPopup(provider)
}

function Cadastrar() {
    Criando_Conta = true
    auth.signInWithPopup(provider)
}