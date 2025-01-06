let musicas_meu_perfil = []
let musicas_meu_perfil_pesquisa = []
function Carregar_Meu_Perfil() {
    document.getElementById('bnt_editar_meu_perfil').style.display = 'block'
    musicas_meu_perfil = []

    for (let c = 0; c < TodasMusicas.length; c++) {
        if(TodasMusicas[c].Email == User.Email) {
            musicas_meu_perfil.push(TodasMusicas[c])
        }
    }

    musicas_meu_perfil_pesquisa = [...musicas_meu_perfil]

    if(User.Perfil.Img_Background) {        
        // Trocar_Background(User.Perfil.Img_Background, document.body)
        Trocar_Background(User.Perfil.Img_Background, document.getElementById('img_artistas_cores_solidas'), `linear-gradient(to bottom, #000, transparent)`, document.getElementById('cor_artista_cores_solidas'))
    }
    
    if(User.Perfil.Img_Perfil) {
        carregarImagem(User.Perfil.Img_Perfil, function(imgEmail) {
            if(imgEmail) {
                document.getElementById('img_foto_meu_perfil').src = User.Perfil.Img_Perfil
            } else {
                carregarImagem(document.getElementById('img_foto_meu_perfil').src = User.Perfil.Img_Email, function(imgEmail) {
                    if(imgEmail) {
                        document.getElementById('img_foto_meu_perfil').src = User.Perfil.Img_Email
                    } else {
                        document.getElementById('img_foto_meu_perfil').src = 'Assets/Imgs/user_anonimo.png'
                    }
                })
            }
        })
    }

    document.getElementById('img_foto_meu_perfil').classList.add('foto_de_perfil_meu_perfil')
    document.getElementById('nome_user_meu_perfil').innerText = User.Nome

    let ouvintes = parseInt(User.Perfil.Ouvintes)

    for (let c = 0; c < musicas_meu_perfil.length; c++) {
        ouvintes += parseInt(musicas_meu_perfil[c].Views)
    }

    let seguindo = User.Social.Seguindo.length
    let seguidores = User.Social.Seguidores.length
    let qtns_seguidores_infos = ''

    if(seguindo > 0) {
        seguindo = `${User.Social.Seguindo.length} seguindo`
        qtns_seguidores_infos += seguindo
    }

    if(seguidores > 0) {
        seguidores = `${User.Social.Seguidores.length} seguidores`

        if(qtns_seguidores_infos != '') {
            qtns_seguidores_infos += ` - ${seguidores}`

        } else {
            qtns_seguidores_infos += seguidores
        }
    }

    if(ouvintes > 0) {
        if(qtns_seguidores_infos != '') {
            qtns_seguidores_infos += ` - ${formatViews(ouvintes, true, 'views')}`

        } else {
            qtns_seguidores_infos += formatViews(ouvintes, true, 'views')
        }
    }

    document.getElementById('numero_seguidores_meu_perfil').innerText = qtns_seguidores_infos

    let new_aray = [...musicas_meu_perfil]
    new_aray.reverse()
    Retornar_Musica_Linha(new_aray.reverse(), document.getElementById('container_musicas_meu_perfil'), 'View, Editar', 'meuperfil')
}

document.getElementById('img_play_musicas_meu_perfil').addEventListener('click', () => {
    let new_array = [...musicas_meu_perfil_pesquisa]
    new_array.reverse()

    Tocar_Musica(new_array, new_array[0], null, User.ID, 'meuperfil')
})

//! Vai trocar a img de perfil do user
const link_nova_img_meu_perfil = document.getElementById('link_nova_img_meu_perfil')
const link_novo_background_meu_perfil = document.getElementById('link_novo_background_meu_perfil')
const input_nome_user_meu_perfil = document.getElementById('input_nome_user_meu_perfil')
let pd_fazer_alteracao_perfil = true
function Abrir_Add_Nova_Img_Meu_Perfil() {
    if(User.Perfil.Img_Background) {
        link_novo_background_meu_perfil.value = User.Perfil.Img_Background
    }

    if(User.Perfil.Img_Perfil) {
        link_nova_img_meu_perfil.value = User.Perfil.Img_Perfil
    }

    input_nome_user_meu_perfil.value = User.Nome

    document.getElementById('container_add_nova_img_meu_perfil').style.display = 'flex'
}

function Adicionar_Nova_img_Meu_Perfil() {
    let pode_salvar = false

    if(link_nova_img_meu_perfil.value != User.Perfil.Img_Perfil || link_novo_background_meu_perfil.value != User.Perfil.Img_Background || input_nome_user_meu_perfil.value != User.Nome) {
        pode_salvar = true
        toggleLoadingScreen()
    }

    let Checar = {
        Nome: true,
        Perfil: true,
        Background: true
    }
    if(link_nova_img_meu_perfil.value == '') {
        User.Perfil.Img_Perfil = User.Perfil.Img_Email
        Checar.Perfil = false
    }

    if(link_novo_background_meu_perfil.value == '') {
        User.Perfil.Background = Infos_Email.Background
        Checar.Background = false
    }

    if(input_nome_user_meu_perfil.value == '') {
        User.Nome = Infos_Email.Nome
        document.getElementById('nome_user_meu_perfil').innerText = User.Nome
        Checar.Nome = false
    }

    if(link_nova_img_meu_perfil.value == User.Perfil.Img_Perfil && link_novo_background_meu_perfil.value == User.Perfil.Img_Background && input_nome_user_meu_perfil.value != User.Nome || !Checar.Perfil && !Checar.Background) {
        User.Nome = input_nome_user_meu_perfil.value
        document.getElementById('nome_user_meu_perfil').innerText = User.Nome
        Salvar_Edicao_Perfil(pode_salvar)
        Fechar_Adicionar_Img_Meu_Perfil()
    }

    if(link_nova_img_meu_perfil.value.trim() != '' && link_nova_img_meu_perfil.value != User.Perfil.Img_Perfil && Checar.Perfil) {
        pd_fazer_alteracao_perfil = false
        carregarImagem(link_nova_img_meu_perfil.value, function(imgPerfil) {
            if(imgPerfil) {
                validateImage(link_nova_img_meu_perfil.value, 'Perfil')
                .then(imageInfo => {

                    if (imageInfo.isValid && imageInfo.message != 'Ocorreu um erro ao processar a imagem. Por favor, tente novamente mais tarde.') {

                        document.getElementById('img_foto_meu_perfil').src = imgPerfil.src
                        document.getElementById('img_foto_meu_perfil').classList.add('foto_de_perfil_meu_perfil')
                        User.Perfil.Img_Perfil = imgPerfil.src
                        
                        Notificar_Infos(imageInfo.message, imageInfo.emojis)
                        Salvar_Edicao_Perfil(pode_salvar)
                        Fechar_Adicionar_Img_Meu_Perfil()
                    } else if(!imageInfo.isValid && imageInfo.message != 'Ocorreu um erro ao processar a imagem. Por favor, tente novamente mais tarde.') {
                        Fechar_Adicionar_Img_Meu_Perfil()
                        Notificar_Infos(imageInfo.message, 'Link', 'Ver Regras', 'regras.html')
                    } else {
                        Fechar_Adicionar_Img_Meu_Perfil()
                        Notificar_Infos(imageInfo.message)
                    }
                    pd_fazer_alteracao_perfil = true
                })

            } else {
                pode_salvar = false
                Fechar_Adicionar_Img_Meu_Perfil()
                Notificar_Infos('O link da img de perfil não está funcionando 🚫🔗. Por favor, tente outro link! 🔄📸✨', 'Confirmar', 'Tentar Outro').then((resolve) => {
                    if(resolve) {
                        Abrir_Add_Nova_Img_Meu_Perfil()
                    }
                })
            }
        })
    }

    if(link_novo_background_meu_perfil.value != User.Perfil.Img_Background && link_novo_background_meu_perfil.value != User.Perfil.Img_Background && Checar.Background) {
        if(link_novo_background_meu_perfil.value.trim() != '') {
            pd_fazer_alteracao_perfil = false
            carregarImagem(link_novo_background_meu_perfil.value, function(imgBackground) {
                if(imgBackground) {
                    validateImage(link_novo_background_meu_perfil.value, 'Background')
                    .then(imgBackground_safe => {
                        if (imgBackground_safe.isValid && imgBackground_safe.message != 'Ocorreu um erro ao processar a imagem. Por favor, tente novamente mais tarde.') {

                            decreaseBlur()
                            // Trocar_Background(imgBackground.src, document.body)
                            Trocar_Background(imgBackground.src, document.getElementById('img_meuperfil_cores_solidas'), `linear-gradient(to bottom, #000, transparent)`, document.getElementById('cor_meuperfil_cores_solidas'), document.getElementById('background_img_meuperfil_cores_solidas'))
                            User.Perfil.Img_Background = imgBackground.src
                            
                            Notificar_Infos(imgBackground_safe.message, imgBackground_safe.emojis)
                            Salvar_Edicao_Perfil(pode_salvar)
                        } else if(!imgBackground_safe.isValid && imgBackground_safe.message != 'Ocorreu um erro ao processar a imagem. Por favor, tente novamente mais tarde.') {
                            Fechar_Adicionar_Img_Meu_Perfil()
                            Notificar_Infos(imgBackground_safe.message, 'Link', 'Ver Regras', 'regras.html')
                                
                        } else {
                            Fechar_Adicionar_Img_Meu_Perfil()
                            Notificar_Infos(imgBackground_safe.message)
                        }

                        Fechar_Adicionar_Img_Meu_Perfil()
                        pd_fazer_alteracao_perfil = true
                    })
    
                } else {
                    pode_salvar = false
                    Notificar_Infos('O link da imagem de background 🌄 não está funcionando 🚫🔗. Por favor, tente outro! 🔄✨', 'Confirmar', 'Tentar Outro').then((resolve) => {
                        if(resolve) {
                            Abrir_Add_Nova_Img_Meu_Perfil()
                        }
                        })
                    Fechar_Adicionar_Img_Meu_Perfil()
                    pd_fazer_alteracao_perfil = true
                }
            })
        }
    }
}

function Salvar_Edicao_Perfil(pode_salvar) {
    if(pode_salvar) {
        if(User.Estado_Da_Conta != 'Anônima') {
            db.collection('Users').doc(User.ID).update({ Nome: User.Nome }).then(() => {
                db.collection('Users').doc(User.ID).update({ Perfil: User.Perfil })
            })
    
        } else {
            Salvar_Perfil_Anonimo_User()
        }
    }
}

function Checar_Adicionar_Nova_Img_Meu_Perfil() {
    let algo_foi_atualizado = false

    if(link_nova_img_meu_perfil.value != User.Perfil.Img_Perfil) {
        algo_foi_atualizado = true
    }

    if(link_novo_background_meu_perfil.value != User.Perfil.Img_Background) {
        algo_foi_atualizado = true
    }

    if(input_nome_user_meu_perfil.value != User.Nome) {
        algo_foi_atualizado = true
    }

    if(!algo_foi_atualizado) {
        document.getElementById('btn_adicionar_nova_img_ao_meu_perfil').classList.add('btn_bloqueado')
    } else {
        document.getElementById('btn_adicionar_nova_img_ao_meu_perfil').classList.remove('btn_bloqueado')
    }
}

function Fechar_Adicionar_Img_Meu_Perfil() {
    // setTimeout(() => {
    //     link_nova_img_meu_perfil.value = ''
    //     input_nome_user_meu_perfil.value = ''
    //     input_nome_user_meu_perfil.value = ''
    // }, 500)
    document.getElementById('container_add_nova_img_meu_perfil').style.display = 'none'
    closeLoadingScreen()
}

function Pesquisar_Musicas_Meu_Perfil(Pesquisa) {
    let pesquisa_formadata = formatarString(Pesquisa)

    let array_musicas_encontradas = []
    musicas_meu_perfil_pesquisa = []

    if(pesquisa_formadata.trim() != '') {
        let M_pesquisar = [...musicas_meu_perfil]
        for (let c = 0; c < M_pesquisar.length; c++) {
            let nome = formatarString(M_pesquisar[c].Nome)
            let autor = formatarString(M_pesquisar[c].Autor)
            let genero = formatarString(M_pesquisar[c].Genero)

            if(pesquisa_formadata.includes(nome) || pesquisa_formadata.includes(autor) || pesquisa_formadata.includes(genero) || nome.includes(pesquisa_formadata) || autor.includes(pesquisa_formadata) || genero.includes(pesquisa_formadata)) {
                array_musicas_encontradas.push(M_pesquisar[c])
            }
        }

        Retornar_Musica_Linha(array_musicas_encontradas, document.getElementById('container_musicas_meu_perfil'), 'View, Editar', 'meuperfil')
        musicas_meu_perfil_pesquisa = [...array_musicas_encontradas]

    } else {
        musicas_meu_perfil_pesquisa = [...musicas_meu_perfil]
        Retornar_Musica_Linha(musicas_meu_perfil, document.getElementById('container_musicas_meu_perfil'), 'View, Editar', 'meuperfil')
    }
}

//! Editar músicas meu perfil
const img_musicas_sendo_editada = document.getElementById('img_musicas_sendo_editada')
const input_autor_musica_sendo_editada = document.getElementById('input_autor_musica_sendo_editada')
const input_nome_musica_sendo_editada = document.getElementById('input_nome_musica_sendo_editada')
const input_genero_musica_sendo_editada = document.getElementById('input_genero_musica_sendo_editada')
const Btn_Adicionar_Traducao_Letra_Musica = document.getElementById('Btn_Adicionar_Traducao_Letra_Musica')

let musica_editando_meu_perfil
function Abrir_Container_Editar_Musicas(Musica) {
    musica_editando_meu_perfil = Musica
    document.getElementById('container_editar_musica').style.display = 'flex'

    img_musicas_sendo_editada.src = Musica.Imagens[2]
    input_autor_musica_sendo_editada.value = Musica.Autor
    input_nome_musica_sendo_editada.value = Musica.Nome
    input_genero_musica_sendo_editada.value = Musica.Genero

    if(!Array.isArray(Musica.Letra)) {
        Btn_Adicionar_Traducao_Letra_Musica.style.display = 'block'
    }
    
}

function Fechar_Container_Editar_Musicas() {
    document.getElementById('container_editar_musica').style.display = 'none'

    img_musicas_sendo_editada.src = 'Assets/Imgs/music1.png'
    // input_autor_musica_sendo_editada.value = ''
    // input_nome_musica_sendo_editada.value = ''
    // input_genero_musica_sendo_editada.value = ''
    document.getElementById('btn_salvar_musica_editando').classList.add('btn_bloqueado')
}

function Checar_Pode_Salvar_Musica_Editada() {
    if(img_musicas_sendo_editada.src != musica_editando_meu_perfil.Img || input_autor_musica_sendo_editada.value != musica_editando_meu_perfil.Autor || input_nome_musica_sendo_editada.value != musica_editando_meu_perfil.Nome || input_genero_musica_sendo_editada.value != musica_editando_meu_perfil.Genero) {
        document.getElementById('btn_salvar_musica_editando').classList.remove('btn_bloqueado')

    } else {
        document.getElementById('btn_salvar_musica_editando').classList.add('btn_bloqueado')
    }
}

function Salvar_Edicao_Musica() {
    let feito = false
    if(img_musicas_sendo_editada.src != musica_editando_meu_perfil.Img || input_autor_musica_sendo_editada.value != musica_editando_meu_perfil.Autor || input_nome_musica_sendo_editada.value != musica_editando_meu_perfil.Nome || input_genero_musica_sendo_editada.value != musica_editando_meu_perfil.Genero) {
        if(User.Estado_Da_Conta != 'Anônima') {
            db.collection('Musicas').get().then((snapshot) => {
                snapshot.docs.forEach(Musicas_firebase => {
                    TodasMusicas = Musicas_firebase.data().Musicas
        
                    if(!feito) {
                        feito = true

                        for (let c = 0; c < TodasMusicas.length; c++) {
                            if(TodasMusicas[c].ID == musica_editando_meu_perfil.ID) {
                                TodasMusicas[c].Autor = input_autor_musica_sendo_editada.value
                                TodasMusicas[c].Nome = input_nome_musica_sendo_editada.value
                                TodasMusicas[c].Genero = input_genero_musica_sendo_editada.value

                                db.collection('Musicas').doc(Musicas_firebase.id).update({Musicas: TodasMusicas}).then(() => {
                                    Fechar_Container_Editar_Musicas()
                                    Notificar_Infos('Música editada com sucesso! 🎶✅✨🔥🙌', 'Comemorar')
                                })

                                const musica_linha = document.querySelectorAll('.musica_linha')
                                musica_linha.forEach(element => {
                                    if(element.classList.contains(`Musica_Linha_${musica_editando_meu_perfil.ID}`)) {
                                        const primeira_parte = element.querySelector('.primeira_parte_musica_linha')
                                        const texto_musica_linha = primeira_parte.querySelector('.texto_musica_linha')
                                        primeira_parte.querySelector('.Img_musica_linha').src = TodasMusicas[c].Imagens[0]
                                        texto_musica_linha.querySelector('.Nome_musica_linha').innerText = TodasMusicas[c].Nome
                                        texto_musica_linha.querySelector('.Autor_Musica_Linha').innerHTML = ''
                                        texto_musica_linha.querySelector('.Autor_Musica_Linha').appendChild(Retornar_Artistas_Da_Musica(TodasMusicas[c]))
                                    }
                                })

                                for (let b = 0; b < musicas_meu_perfil.length; b++) {
                                    if(musicas_meu_perfil[b].ID == musica_editando_meu_perfil.ID) {
                                        musicas_meu_perfil[b] = TodasMusicas[c]
                                        musicas_meu_perfil_pesquisa = [...musicas_meu_perfil]
                                        Pesquisar_Musicas_Meu_Perfil('')
                                        break
                                    }
                                }

                                Fechar_Container_Editar_Musicas()
                                break
                            }
                        }
                    }
                })
            })

        } else {
            Abrir_Entrar()
        }
        
    }
}

//* Tradução
async function Comparar_Letra() {
  // Letra da música no perfil
  const letra_original = musica_editando_meu_perfil.Letra.Letra_Musica
  
  // Normalizar letra do perfil removendo espaços extras e quebras de linha
  const letra_normalizada_original = letra_original.replace(/\s+/g, ' ').trim()

  // Checar o texto da área de transferência
  const letra_area_transferencia = await Checar_Ultima_Coisa_Area_Transferencia()

  // Normalizar o texto da área de transferência da mesma forma
  const letra_normalizada_transferencia = letra_area_transferencia.replace(/\s+/g, ' ').trim()

  // Comparar as duas letras
  if (letra_normalizada_original === letra_normalizada_transferencia) {
    return true
  } else {
    return false
  }
}

Btn_Adicionar_Traducao_Letra_Musica.addEventListener('click', () => {
    Abrir_Pagina('adicionartraducao', `adicionartraducao_${musica_editando_meu_perfil.ID}`)

    Checar_Ultima_Coisa_Area_Transferencia().then(result => {
        console.log('Resultado:', result)
        if(Comparar_Letra()) {
            Avisos_Rapidos('🎶 A letra da música já foi copiada para a área de transferência! 😊📋')
        } else {
            Copiar_Para_Area_Tranferencia(musica_editando_meu_perfil.Letra.Letra_Musica, '🎶 A letra da música foi copiada para a área de transferência! 😊📝')
        }
    })
    setTimeout(() => {
        Notificar_Infos('Por favor, traduza a letra apenas para o seu idioma. Isso garantirá que a tradução fique mais precisa e que todos possam entender melhor! 🌍✨')
    }, 1000)
    Fechar_Container_Editar_Musicas()

})

const text_area_add_traducao_letra = document.getElementById('text_area_add_traducao_letra')
const Btn_Salvar_Traducao = document.getElementById('Btn_Salvar_Traducao')
function Checar_Salvar_Traducao_Letra(Traducao, Comando='') {
    const Linhas_Letra_Original = musica_editando_meu_perfil.Letra.Letra_Musica.split('\n').length
    const Linhas_Letra_Traducao = Traducao.split('\n').length

    if(Linhas_Letra_Original == Linhas_Letra_Traducao) {
        Btn_Salvar_Traducao.classList.add('Active')
        return true
    } else {
        Btn_Salvar_Traducao.classList.remove('Active')
        return false
    }
}

function Fechar_Adicionar_Traducao() {
    text_area_add_traducao_letra.value = ''
    Voltar_Para_Pagina_Anterior()
}

function Salvar_Traducao_Letra() {
    let feito = false
    if(Checar_Salvar_Traducao_Letra(text_area_add_traducao_letra.value, 'Checar')) {

        db.collection('Musicas').get().then((snapshot) => {
                snapshot.docs.forEach(Musicas_firebase => {
                    TodasMusicas = Musicas_firebase.data().Musicas
        
                    if(!feito) {
                        feito = true

                        for (let c = 0; c < TodasMusicas.length; c++) {
                            if(TodasMusicas[c].ID == musica_editando_meu_perfil.ID) {
                                const Nova_Traducao = {
                                    Idioma: navigator.language || navigator.userLanguage,
                                    Traducao: text_area_add_traducao_letra.value
                                }

                                let Ja_Tem_Traducao_Esse_Idioma = false

                                if(TodasMusicas[c].Letra.Traducao) {
                                    try {
                                        for (let c = 0; c < TodasMusicas[c].Letra.Traducao.length; c++) {
                                            if(TodasMusicas[c].Letra.Traducao[c].Idioma == Nova_Traducao.Idioma) {
                                                Ja_Tem_Traducao_Esse_Idioma = true
                                                break
                                            }
                                        }
                                    } catch{}
                                }

                                if(!Ja_Tem_Traducao_Esse_Idioma) {
                                    TodasMusicas[c].Letra.Traducao = [] 
                                    TodasMusicas[c].Letra.Traducao.push(Nova_Traducao)

                                    db.collection('Musicas').doc(Musicas_firebase.id).update({Musicas: TodasMusicas}).then(() => {
                                        Fechar_Adicionar_Traducao()
                                    })

                                } else {
                                    Notificar_Infos('Já existe uma tradução disponível nesse idioma. Por favor, verifique antes de adicionar uma nova! Obrigado! 😊✨', 'Confirmar', 'Substituir').then((resp) => {
                                        if(resp) {
                                            for (let c = 0; c < TodasMusicas[c].Letra.Traducao.length; c++) {
                                                if(TodasMusicas[c].Letra.Traducao[c].Idioma == Nova_Traducao.Idioma) {
                                                    TodasMusicas[c].Letra.Traducao[c].Traducao = text_area_add_traducao_letra.value

                                                    db.collection('Musicas').doc(Musicas_firebase.id).update({Musicas: TodasMusicas}).then(() => {
                                                        Fechar_Adicionar_Traducao()
                                                    })
                                                    break
                                                }
                                            }
                                        }
                                    })
                                }
                                break
                            }
                        }
                    }
                })
        })
    } else {
        Notificar_Infos('⚠️ A tradução não tem o mesmo número de linhas que a letra original. Por favor, ajuste para manter a sincronia.') 
    }
}