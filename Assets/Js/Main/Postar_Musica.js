let infos_musica_postada
async function Postar_Musica() {
    const input_add_musica = document.getElementById('input_add_musica').value
    document.getElementById('input_add_musica').value = ''
    if(input_add_musica.startsWith('https://music.youtube.com')) {
        try {
            const response = await fetch('http://localhost:3000/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    videoURL: input_add_musica,
                    userEmail: User.Email,
                })
            })
            const data = await response.json()
            infos_musica_postada = data

            let img_carregada = false

            function Carregar_Musica() {
                carregarImagem(data.thumbnailUrl, function(imgThumb) {
    
                    function Carregar_infos() {
                        img_carregada = true
                        // Aqui dentro você atualiza os elementos na página
                        document.getElementById('input_add_musica_nome').value = data.videoTitle;
                        document.getElementById('input_add_musica_autor').value = data.channelName;
                        document.getElementById('img_musica_postada').src = data.thumbnailUrl;
                        document.getElementById('primeira_parte_postar_musica').style.display = 'none'
                        document.getElementById('segunda_parte_postar_musica').style.display = 'flex'
                        //! Gerar link
                        document.getElementById('btn_pesquisar_genero').href = `https://www.google.com/search?q=${formatarTermoPesquisa('genero da musica ' + data.videoTitle, ' ' + data.channelName)}`
                    }

                    if(imgThumb) {
                        Carregar_infos()
                    } else{
                        setTimeout(() => {
                            Carregar_Musica()
                        }, 1000)
                    }
                })
            } Carregar_Musica()



            
        } catch (error) {
            console.error("Erro na requisição: ", error);
            alert('Erro: ' + error.message);
        }

    } else {
        alert('Por favor, utilize apenas links do YouTube Music para adicionar músicas.')
    }
}

function Finalizar_Postar() {
    const input_add_musica_nome = document.getElementById('input_add_musica_nome').value
    const input_add_musica_autor = document.getElementById('input_add_musica_autor').value
    const input_add_musica_genero = document.getElementById('input_add_musica_genero').value

    if(input_add_musica_nome.trim() != '' && input_add_musica_autor.trim() != '' && input_add_musica_genero.trim() != '') {
        db.collection('Musicas').get().then((snapshot) => {
    
            snapshot.docs.forEach(Musicas => {
                TodasMusicas = Musicas.data().Musicas
                
                for (let c = 0; c < TodasMusicas.length; c++) {                    
                    if(TodasMusicas[c].ID == infos_musica_postada.uid) {
                        TodasMusicas[c].Autor = input_add_musica_autor
                        TodasMusicas[c].Nome = input_add_musica_nome
                        TodasMusicas[c].Genero = input_add_musica_genero
                        TodasMusicas[c].Estado = 'Ativo'

                        db.collection('Musicas').doc(Musicas.id).update({Musicas: TodasMusicas}).then(() => {
                            Limpar_add_Musica()
                            Notificar_Infos('Parabéns pela escolha da música! 🎶 É incrível como uma simples melodia pode nos transportar para tantos lugares e momentos especiais. Obrigado por compartilhá-la conosco!', 'Comemorar')
                        })
                    }
                }
            })
        })

    } else {
        alert('Preencha todos os campos antes de enviar!')
    }
}

function Limpar_add_Musica() {
    document.getElementById('input_add_musica_nome').value = ''
    document.getElementById('input_add_musica_autor').value = ''
    document.getElementById('input_add_musica_genero').value = ''
    document.getElementById('input_add_musica').value = ''
    document.getElementById('img_musica_postada').src = ''
    document.getElementById('primeira_parte_postar_musica').style.display = 'flex'
    document.getElementById('segunda_parte_postar_musica').style.display = 'none'
}