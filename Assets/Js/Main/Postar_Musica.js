let infos_musica_postada
let pd_postar_outra_musica = true
const btn_pesquisar_genero = document.getElementById('btn_pesquisar_genero')
async function Postar_Musica(Comando = '') {
    if(User.Estado_Da_Conta != 'Anônima') {
        const input_add_musica = document.getElementById('input_add_musica').value

        //! Vai checar se a música já foi adicionada anteriormente
        db.collection('Musicas').get().then((snapshot) => {
            snapshot.docs.forEach(Musicas => {
                TodasMusicas = Musicas.data().Musicas
            })
        })

        let musica_ja_adicionada_anteriormente = false
        for (let c = 0; c < TodasMusicas.length; c++) {
            if(TodasMusicas[c].VideoURL == input_add_musica) {
                musica_ja_adicionada_anteriormente = TodasMusicas[c]
                break
            }
        }

        document.getElementById('input_add_musica').value = ''
        const carregamento_postar_musica = document.getElementById('carregamento_postar_musica')
        const primeira_parte_postar_musica = document.getElementById('primeira_parte_postar_musica')

        if(!musica_ja_adicionada_anteriormente) {
            if(Comando.includes('Abrir Página: ')) {
                Abrir_Pagina(Comando.replace('Abrir Página: ', ''))
            }

            if(input_add_musica.startsWith('https://music.youtube.com') && pd_postar_outra_musica) {
                pd_postar_outra_musica = false
                carregamento_postar_musica.style.display = 'flex'
                primeira_parte_postar_musica.style.display = 'none'
                
                let downloadURL
        
                // Verifica se está rodando localmente
                if (window.location.href.includes('http://127.0.0.1:')) {
                    downloadURL = 'http://localhost:3001/download'
                } else if (window.location.href.includes('https://wender103.github.io/MeloWave/')) {
                    downloadURL = 'https://molewaveapibaixarmusica.onrender.com/download'
                } else {
                    // Caso a URL não corresponda a nenhum dos casos anteriores
                    pd_postar_outra_musica = true
                    carregamento_postar_musica.style.display = 'none'
                    primeira_parte_postar_musica.style.display = 'flex'
                    
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
                            // userEmail: User.Email,
                        })
                    })
                    const data = await response.json()
                    infos_musica_postada = data
        
                    let img_carregada = false
        
                    function Carregar_Musica() {
                        carregarImagem(data.thumbnailUrl, function(imgThumb) {
            
                            function Carregar_infos() {
                                closeLoadingScreen()
                                img_carregada = true
                                // Aqui dentro você atualiza os elementos na página
                                document.getElementById('input_add_musica_nome').value = data.videoTitle;
                                document.getElementById('input_add_musica_autor').value = data.channelName;
                                document.getElementById('img_musica_postada').src = data.thumbnailUrl;
                                document.getElementById('primeira_parte_postar_musica').style.display = 'none'
                                document.getElementById('segunda_parte_postar_musica').style.display = 'flex'
                                carregamento_postar_musica.style.display = 'none'
                                //! Gerar link
                                btn_pesquisar_genero.href = `https://www.google.com/search?q=${formatarTermoPesquisa('Genre of the song ' + data.videoTitle, ' by artist ' + data.channelName)}`
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
                    console.error("Erro na requisição: ")
                    console.error(error)
                    alert('Erro: ' + error.message)
                    pd_postar_outra_musica = true
                    carregamento_postar_musica.style.display = 'none'
                    primeira_parte_postar_musica.style.display = 'flex'
                    
                    closeLoadingScreen()
                }
        
            } else if(input_add_musica.startsWith('https://music.youtube.com') && !pd_postar_outra_musica) {
                Notificar_Infos('🚫 Você precisa terminar de adicionar a música anterior antes de postar uma nova! 🎵⏳ Espere mais um pouco.', 'Emojis:🕰️,⏳,⌛,⏱️,⏲️')

            } else if(input_add_musica.trim() != '') {
                Notificar_Infos('Por favor, utilize apenas links do YouTube Music para adicionar músicas.')
            } else {
                Notificar_Infos('🚨 Opa! 🚨 Você esqueceu de colocar o link da música do YouTube Music no input 🎶. Sem isso, não dá pra postar a música 😢. Por favor, adicione o link e tente novamente! 👍')
            }
        } else {
            if(musica_ja_adicionada_anteriormente.Estado == 'Ativo') {
                Notificar_Infos('⚠️ Essa música já foi adicionada antes! 🎵 Quer ouvir agora? 🎧', 'Confirmar').then((confirmed) => {
                    if (confirmed) {
                        Tocar_Musica([musica_ja_adicionada_anteriormente], musica_ja_adicionada_anteriormente)
                        Abrir_Perfil_Artista(Separar_Por_Virgula(musica_ja_adicionada_anteriormente.Autor)[0], musica_ja_adicionada_anteriormente)
                    }
                })

            } else {
                let ja_segue = false
                for (let c = 0; c < User.Social.Artistas.length; c++) {
                    let nome_artista_user = formatarString(User.Social.Artistas[c].Autor)
                    let autores = Separar_Por_Virgula(musica_ja_adicionada_anteriormente.Autor)
                    for (let b = 0; b < autores.length; b++) {
                        let autores_formatado = formatarString(autores[b])
                        if(autores_formatado == nome_artista_user) {
                            ja_segue = true
                            Notificar_Infos(`⚠️ Esta música já foi adicionada, mas o usuário ainda está configurando! 🎵 Assim que ele terminar você será notificado na aba notificações por já seguir o artista ${autores[b]}!🎧📲`, 'Confirmar', 'Ver Artista').then((confirmed) => {
                                if (confirmed) {
                                    Abrir_Perfil_Artista(autores[b], musica_ja_adicionada_anteriormente)
                                }
                            })

                            break
                        }
                    }
                }

                if(!ja_segue) {
                    Notificar_Infos('⚠️ Esta música já foi adicionada, mas o usuário ainda está configurando! 🎵 Quer receber uma notificação quando ele terminar? Enão Siga o autor 🎧📲', 'Confirmar', `Seguir ${Separar_Por_Virgula(musica_ja_adicionada_anteriormente.Autor)[0]}`).then((confirmed) => {
                        if (confirmed) {
                            Tocar_Musica([musica_ja_adicionada_anteriormente], musica_ja_adicionada_anteriormente)
                            Abrir_Perfil_Artista(Separar_Por_Virgula(musica_ja_adicionada_anteriormente.Autor)[0], musica_ja_adicionada_anteriormente)
                        }
                    })
                }
            }
        }


    } else {
        Abrir_Entrar()
    }
}

let adicionando_musicas_pendentes = false
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

                                    if(adicionando_musicas_pendentes) {
                                        Adicionar_Musicas_Pendentes()
                                    }
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

let array_musica_pendentes = []
let contador_add_musicas_pendentes = 0
function Carregar_Musica_Pendentes() {
    array_musica_pendentes = []
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(TodasMusicas[c].Email == User.Email && TodasMusicas[c].Estado == 'Pendente') {
            array_musica_pendentes.push(TodasMusicas[c])
        }
    }

    let data_exedida = false

    for (let c = 0; c < array_musica_pendentes.length; c++) {
        let resp = calcularTempoRestante(getDataAtual(5, 0, 0, array_musica_pendentes[c].Data))
        if(resp != 'A data já passou!') {
            data_exedida = true
        }
        
    }

    if(array_musica_pendentes.length > 0) {
        if(data_exedida) {
            let aviso = `
            <h1>🚨 Atenção! 🚨</h1>
            <p>Sua música 🎵 ainda não foi totalmente cadastrada. Para garantir que ela não seja excluída 🗑️, finalize o preenchimento das informações restantes dentro de <strong>${calcularTempoRestante(getDataAtual(5, 0, 0, array_musica_pendentes[0].Data))}</strong> ⏳. Caso contrário, ela será removida do sistema ❌.</p>`
            Notificar_Infos(aviso, 'Confirmar, Informação, Pequeno', 'Terminar de Adicionar').then((resp) => {
                if(resp) {
                    Adicionar_Musicas_Pendentes(array_musica_pendentes)
                }
            })
        }
    }
}
function Adicionar_Musicas_Pendentes() {
    if(contador_add_musicas_pendentes < array_musica_pendentes.length) {
        Terminar_Adicionar_Musica(array_musica_pendentes[contador_add_musicas_pendentes])
        contador_add_musicas_pendentes++
    } else {
        adicionando_musicas_pendentes = false
    }
}

function Terminar_Adicionar_Musica(Musica) {
    if(Pagina_Atual.Nome != 'adicionarmusicas') {
        Abrir_Pagina('adicionarmusicas')
    }

    let new_obj = {
        videoTitle: Musica.Nome,
        channelName: Musica.Autor,
        audioUrl: Musica.Audio,
        thumbnailUrl: Musica.Img,
        videoURL: Musica.VideoURL,
        uid: Musica.ID
    }

    infos_musica_postada = new_obj

    document.getElementById('input_add_musica_nome').value = new_obj.videoTitle;
    document.getElementById('input_add_musica_autor').value = new_obj.channelName;
    document.getElementById('img_musica_postada').src = new_obj.thumbnailUrl;
    document.getElementById('primeira_parte_postar_musica').style.display = 'none'
    document.getElementById('segunda_parte_postar_musica').style.display = 'flex'
    //! Gerar link
    btn_pesquisar_genero.href = `https://www.google.com/search?q=${formatarTermoPesquisa('Genre of the song ' + new_obj.videoTitle, ' by artist ' + new_obj.channelName)}`
    btn_pesquisar_genero.addEventListener('click', () => {
        sairDaTelaCheia()
    })

    adicionando_musicas_pendentes = true
}