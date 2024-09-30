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
//! --------------------------------

async function ExcluirMusica(Musica) {
    const idMusica = Musica.ID

    try {
        Fechar_Remover_Musica()
        // 1. Remove a música do Firebase Storage
        await deletarArquivosDaMusica(idMusica)

        // 2. Remove a música do Firebase Firestore
        const snapshot = await db.collection('Musicas').get()
        let musicaRemovida = false

        snapshot.docs.forEach((doc) => {
            const InfoMusicas = doc.data().Musicas
            for (let c = 0; c < InfoMusicas.length; c++) {
                if (InfoMusicas[c].ID == idMusica) {
                    InfoMusicas.splice(c, 1)
                    db.collection('Musicas').doc(doc.id).update({ Musicas: InfoMusicas }).then(() => {
                        // A música foi removida do Firestore, agora removemos do local
                        removerMusicaLocal(idMusica)
                        musicaRemovida = true
                    })
                    break // Encerra o loop assim que a música for encontrada e removida
                }
            }
        })

        // Notificar o usuário sobre a exclusão bem-sucedida
        Notificar_Infos('✅🎉 A música foi excluída com sucesso! 🎵✨')

        setTimeout(() => {
            Pesquisar_Musicas_Meu_Perfil('')
        }, 1000)

        console.log(`Música com ID ${idMusica} excluída com sucesso! 🎉`)
    } catch (error) {
        console.error('Erro ao excluir a música:', error)
    }
}

async function deletarArquivosDaMusica(idMusica) {
    // Referência à pasta da música
    const pastaRef = storage.ref(`MusicasPostadas/${idMusica}`)

    try {
        // Lista todos os arquivos na pasta
        const lista = await pastaRef.listAll()

        // Mapeia os arquivos para suas promessas de exclusão
        const deletarPromessas = lista.items.map(item => item.delete())

        // Aguarda todas as promessas de exclusão
        await Promise.all(deletarPromessas)

        console.log(`Todos os arquivos da música ${idMusica} foram deletados com sucesso! 🎶🗑️`)
    } catch (error) {
        console.error('Erro ao deletar os arquivos:', error)
    }
}

// Função para excluir o documento do Firebase Firestore
function removerMusicaLocal(idMusica) {
    [TodasMusicas, musicas_meu_perfil, musicas_meu_perfil_pesquisa].forEach(array => {
        for (let c = 0; c < array.length; c++) {
            if (array[c].ID == idMusica) {
                array.splice(c, 1)
                break; // Encerrar o loop assim que a música for encontrada e removida
            }
        }
    })
}

//! --------------------------------

let musicas_tmp_exedido = []
function Remover_Musicas_Tempo_Exedido() {
    // Pegar_Usuarios('Não Logar')
    for (let c = 0; c < TodasMusicas.length; c++) {
        let resp = calcularTempoRestante(getDataAtual(5, 0, 0, TodasMusicas[c].Data))
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