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
    if(User.Notificacao.length > 0 ) {
        setTimeout(() => {
            if(!noficacao_esta_aberta) {
                for (let c = 0; c < User.Notificacao.length; c++) {
                    if(User.Notificacao[c].Lida == false) {
                        array_notificacoes_nao_vistas.push(User.Notificacao[c])
                    }
                }
    
                let contador = 0
                function Mostrar_Notificacoes() {
                    let texto = `<h1>${array_notificacoes_nao_vistas[contador].Titulo}</h1>
                    <p>${array_notificacoes_nao_vistas[contador].Mensagem}</p>`
                    Notificar_Infos(texto, array_notificacoes_nao_vistas[contador].Config.Comando, array_notificacoes_nao_vistas[contador].Config.Texto_Btn, array_notificacoes_nao_vistas[contador].Config.Link).then((resp) => {
                        if(resp) {
                            if(array_notificacoes_nao_vistas[contador].Extra == 'Postar Música') {
                                document.getElementById('input_add_musica').value = document.getElementById('link_notificacao').href
                                Postar_Musica('Abrir Página: adicionarmusicas')   
                            }
                        }
    
                        Remover_Notificacao_User(array_notificacoes_nao_vistas[contador])
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