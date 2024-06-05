function removerParteInicial(url, parteInicial) {
    return url.replace(parteInicial, '');
}

const container_remover_musica = document.getElementById('container_remover_musica')
const img_remover_musica = document.getElementById('img_remover_musica')
const nome_musica_remover = document.getElementById('nome_musica_remover')
const nome_autor_remover = document.getElementById('nome_autor_remover')
let musica_deletar = undefined
function Abrir_Remover_Musica(Musica) {
    container_remover_musica.style.display = 'flex'
    img_remover_musica.src = Musica.Img
    nome_musica_remover.innerText = Musica.Nome
    nome_autor_remover.innerText = Musica.Autor
    musica_deletar = Musica
}

function Fechar_Remover_Musica() {
    container_remover_musica.style.display = 'none'
    img_remover_musica.src = ''
    nome_musica_remover.innerText = ''
    nome_autor_remover.innerText = ''
    musica_deletar = undefined
}

function Deletar_Musica_Selecionada() {
    if(musica_deletar != undefined) {
        ExcluirMusica(musica_deletar)
    } else {
        Notificar_Infos('⚠️🤔 Nenhuma música foi selecionada para ser deletada! 🎵❌')
    }
}

async function ExcluirMusica(Musica) {
    try {
        let LinkImg = removerParteInicial(Musica.Img, 'https://storage.googleapis.com/melowave-f6f7c.appspot.com/MusicasPostadas/')
        let LinkAudio = removerParteInicial(Musica.Audio, 'https://storage.googleapis.com/melowave-f6f7c.appspot.com/MusicasPostadas/')

        // Excluir a pasta do Firebase Storage
        await Promise.all([
            excluirObjetoStorage(LinkImg),
            excluirObjetoStorage(LinkAudio)
        ]);

        // Remover a música do local
        for (let c = 0; c < TodasMusicas.length; c++) {
            if (TodasMusicas[c].ID == Musica.ID) {
                TodasMusicas.splice(c, 1)
                break; // Encerrar o loop assim que a música for encontrada e removida
            }
        }

        for (let c = 0; c < musicas_meu_perfil.length; c++) {
            if (musicas_meu_perfil[c].ID == Musica.ID) {
                musicas_meu_perfil.splice(c, 1)
                break; // Encerrar o loop assim que a música for encontrada e removida
            }
        }

        for (let c = 0; c < musicas_meu_perfil_pesquisa.length; c++) {
            if (musicas_meu_perfil_pesquisa[c].ID == Musica.ID) {
                musicas_meu_perfil_pesquisa.splice(c, 1)
                break; // Encerrar o loop assim que a música for encontrada e removida
            }
        }

        // Remover a música do Firebase Firestore
        const snapshot = await db.collection('Musicas').get()
        snapshot.docs.forEach((doc) => {
            const InfoMusicas = doc.data().Musicas
            for (let c = 0; c < InfoMusicas.length; c++) {
                if (InfoMusicas[c].ID == Musica.ID) {
                    InfoMusicas.splice(c, 1)
                    db.collection('Musicas').doc(doc.id).update({ Musicas: InfoMusicas })
                    break; // Encerrar o loop assim que a música for encontrada e removida
                }
            }
        })

        let musica_foi_removida = true
        for (let c = 0; c < TodasMusicas.length; c++) {
            if(TodasMusicas[c].ID == Musica.ID) {
                musica_foi_removida = false
                break
            }
        }

        if(musica_deletar != undefined) {
            // Notificar o usuário sobre a exclusão bem-sucedida
            Notificar_Infos('✅🎉 A música foi excluída com sucesso! 🎵✨')
            Fechar_Remover_Musica()
            Pesquisar_Musicas_Meu_Perfil(input_pesquisar_musicas_meu_perfil.value)
        }
    } catch (error) {
        console.error('Erro ao excluir pasta da música:', error)
        if(musica_deletar != undefined) {
            // Notificar o usuário sobre o erro na exclusão
            Fechar_Remover_Musica()
            Notificar_Infos('❌😢 Algo deu errado e não conseguimos remover a música. 🚫🎵 Por favor, tente novamente mais tarde. ⏳🙏')
        }
    }
}

async function excluirObjetoStorage(path) {
    try {
        await storage.ref().child(path).delete()
    } catch (error) {
        if (error.code === 'storage/object-not-found') {
            console.warn('Objeto não encontrado:', path)
        } else {
            throw error // Rejeitar o erro se não for um 'object-not-found'
        }
    }
}

let musicas_tmp_exedido = []
function Remover_Musicas_Tempo_Exedido() {
    // Pegar_Usuarios('Não Logar')
    for (let c = 0; c < TodasMusicas.length; c++) {
        let resp = calcularTempoRestante(getDataAtual(0, 0, 5, TodasMusicas[c].Data))
        if(TodasMusicas[c].Estado == 'Pendente' && resp == 'A data já passou!') {
            musicas_tmp_exedido.push(TodasMusicas[c])

            const notificacao = {
                ID: gerarId(),
                Titulo: 'Oops! Sua música foi deletada. 😕🎵',
                Mensagem: `Sentimos informar que sua música: <a target='_black' id='link_notificacao' href='${TodasMusicas[c].VideoURL}'>${TodasMusicas[c].Nome}</a> foi deletada porque você não terminou de adicionar todas as informações necessárias, e o tempo limite de espera expirou. Por favor, lembre-se de completar todos os detalhes da próxima vez. Estamos aqui para ajudar se precisar! 🎵⏰✨`,
                Tipo: 'Aviso',
                Importante: true,
                Lida: false,
                Data: getDataAtual(),
                Config: {
                    Comando: 'Confirmar', 
                    Texto_Btn: 'Postar Novamente',
                    Link: ''
                }
            }
            Notificacao_User(TodasMusicas[c].Email, notificacao)
            ExcluirMusica(TodasMusicas[c])
        }
    }
}