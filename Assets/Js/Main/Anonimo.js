let notificado_que_esta_modo_anonimo = false
function Carregar_Perfil_Anonimo_User() {
    let memoria = JSON.parse(localStorage.getItem('Perfil_Anonimo_User'))
    if(memoria) {
        User = memoria

        if(!notificado_que_esta_modo_anonimo) {
            notificado_que_esta_modo_anonimo = true
            Notificar_Infos('⚠️ Você está usando o site sem se cadastrar. Suas informações serão salvas apenas neste navegador e ficarão no localStorage. 🔒 Limpar os dados do navegador ou usar outro dispositivo vai fazer você perder essas informações. 🚨')
        }

    } else {
        User = {
           Email: val.email,
            Nome: val.displayName,
            Musicas_Curtidas: [],
            Loja: {
                Pontos: 0,
            },
            Configuracoes: {
                Tema: 'Claro',
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
    }
}

function Salvar_Perfil_Anonimo_User() {
    localStorage.setItem('Perfil_Anonimo_User', JSON.stringify(User))
}