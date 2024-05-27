function Carregar_Perfil_Anonimo_User() {
    let memoria = JSON.parse(localStorage.getItem('Perfil_Anonimo_User'))
    if(memoria) {
        User = memoria
    } else {
        User = {
            Email: 'anonimo@gmail.com',
            Nome: 'Anônimo',
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
            Estado_Da_Conta: 'Anônima',
            Notificacao: [],
            Perfil: {
                Img_Perfil: 'Assets/Imgs/user_anonimo.jpg',
                Img_Background: null,
                Ouvintes: 0,
                Horas_Ouvindo: 0,
                Data_Criacao_Conta: getDataAtualCadastro()
            },
        }
    }
}

function Salvar_Perfil_Anonimo_User() {
    localStorage.setItem('Perfil_Anonimo_User', JSON.stringify(User))
}