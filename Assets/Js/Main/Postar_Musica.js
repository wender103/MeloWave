let infos_musica_postada
let pd_postar_outra_musica = true
const btn_pesquisar_genero = document.getElementById('btn_pesquisar_genero')
async function Postar_Musica() {
    let AllMusics = []
    if(User.Estado_Da_Conta != 'Anônima') {
        const input_add_musica = document.getElementById('input_add_musica').value
        document.getElementById('input_add_musica').value = ''

        //! Vai checar se a música já foi adicionada anteriormente
        db.collection('Musicas').get().then((snapshot) => {
            snapshot.docs.forEach(Musicas => {
                AllMusics = Musicas.data().Musicas
            })
        })

        let musica_ja_adicionada_anteriormente = false
        for (let c = 0; c < AllMusics.length; c++) {
            if(AllMusics[c].VideoURL == input_add_musica) {
                musica_ja_adicionada_anteriormente = AllMusics[c]
                break
            }
        }

        if(!musica_ja_adicionada_anteriormente) {
            if(input_add_musica.startsWith('https://music.youtube.com') && pd_postar_outra_musica) {
                pd_postar_outra_musica = false
                let downloadURL
        
                // Verifica se está rodando localmente
                if (window.location.href.includes('http://127.0.0.1:')) {
                    downloadURL = 'http://localhost:3000/download'
                } else if (window.location.href.includes('https://wender103.github.io/MeloWave/')) {
                    downloadURL = 'https://molewaveapibaixarmusica.onrender.com/download'
                } else {
                    // Caso a URL não corresponda a nenhum dos casos anteriores
                    console.error('URL não reconhecida')
                }
        
                try {
                    const response = await fetch(downloadURL, {
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
                                btn_pesquisar_genero.href = `https://www.google.com/search?q=${formatarTermoPesquisa('"genêro" da musica ' + data.videoTitle, ' "' + data.channelName + '"')}`
                                btn_pesquisar_genero.addEventListener('click', () => {
                                    sairDaTelaCheia()
                                })
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
        
            } else if(input_add_musica.startsWith('https://music.youtube.com') && !pd_postar_outra_musica) {
                Notificar_Infos('🚫 Você precisa terminar de adicionar a música anterior antes de postar uma nova! 🎵⏳ Espere mais um pouco.', 'Emojis:🕰️,⏳,⌛,⏱️,⏲️')

            } else if(input_add_musica.trim() != '') {
                Notificar_Infos('Por favor, utilize apenas links do YouTube Music para adicionar músicas.')
            } else {
                Notificar_Infos('🚨 Opa! 🚨 Você esqueceu de colocar o link da música do YouTube Music no input 🎶. Sem isso, não dá pra postar a música 😢. Por favor, adicione o link e tente novamente! 👍')
            }
        } else {
            Notificar_Infos('⚠️ Essa música já foi adicionada antes! 🎵 Quer ouvir agora? 🎧', 'Confirmar').then((confirmed) => {
                if (confirmed) {
                    Tocar_Musica([musica_ja_adicionada_anteriormente], musica_ja_adicionada_anteriormente)
                    Abrir_Perfil_Artista(Separar_Por_Virgula(musica_ja_adicionada_anteriormente.Autor)[0], musica_ja_adicionada_anteriormente)
                }
            })
        }


    } else {
        Abrir_Entrar()
    }
}

function Finalizar_Postar() {
    if(User.Estado_Da_Conta != 'Anônima') {
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
                                User.Loja.Pontos += Pontos_Por_Atividade.Adicionar_Musica
                                db.collection('Users').doc(User.ID).update({ Loja: User.Loja }).then(() => {
                                    Limpar_add_Musica()
                                    Notificar_Infos(`🎉 Parabéns por postar essa música! 🎶 Você ganhou ${Pontos_Por_Atividade.Adicionar_Musica} pontos com isso! 🌟 Obrigado por compartilhar! 🙌`, 'Comemorar')
                                    Atualizar_Infos_Perfil_Loja()
                                    pd_postar_outra_musica = true
                                })
                            })
                        }
                    }
                })
            })
    
        } else {
            alert('Preencha todos os campos antes de enviar!')
        }
    } else {
        Abrir_Entrar()
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