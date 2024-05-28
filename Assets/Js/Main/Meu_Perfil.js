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
        Trocar_Background(User.Perfil.Img_Background, document.body)
        setTimeout(() => {
            decreaseBlur()
        }, 1000)
    }
    
    if(User.Perfil.Img_Perfil) {
        document.getElementById('img_foto_meu_perfil').src = User.Perfil.Img_Perfil
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
        ouvintes = `${ouvintes} views`
        if(qtns_seguidores_infos != '') {
            qtns_seguidores_infos += ` - ${ouvintes}`

        } else {
            qtns_seguidores_infos += ouvintes
        }
    }

    document.getElementById('numero_seguidores_meu_perfil').innerText = qtns_seguidores_infos

    Retornar_Musica_Linha(musicas_meu_perfil, document.getElementById('container_musicas_meu_perfil'))
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
function Abrir_Add_Nova_Img_Meu_Perfil() {
    if(User.Perfil.Img_Background) {
        link_novo_background_meu_perfil.value = User.Perfil.Img_Background
    }

    if(User.Perfil.Img_Perfil) {
        link_nova_img_meu_perfil.value = User.Perfil.Img_Perfil
    }

    document.getElementById('container_add_nova_img_meu_perfil').style.display = 'flex'
}

function Adicionar_Nova_img_Meu_Perfil() {
    let pode_salvar = false

    if(link_nova_img_meu_perfil.value != User.Perfil.Img_Perfil || link_novo_background_meu_perfil.value != User.Perfil.Img_Background || input_nome_user_meu_perfil.value != User.Nome) {
        pode_salvar = true
    }


    if(link_nova_img_meu_perfil.value.trim() != '') {
        carregarImagem(link_nova_img_meu_perfil.value, function(imgPerfil) {
            if(imgPerfil) {
                Fechar_Adicionar_Img_Meu_Perfil()
                console.log(imgPerfil)
                document.getElementById('img_foto_meu_perfil').src = imgPerfil.src
                document.getElementById('img_foto_meu_perfil').classList.add('foto_de_perfil_meu_perfil')
                User.Perfil.Img_Perfil = imgPerfil.src

            } else {
                pode_salvar = false
                Fechar_Adicionar_Img_Meu_Perfil()
                Notificar_Infos('O link da img de perfil não está funcionando 🚫🔗. Por favor, tente outro link! 🔄📸✨', 'Confirmar', 'Tentar Outro').then((resolve) => {
                    if(resolve) {
                        Abrir_Add_Nova_Img_Meu_Perfil()
                    }
                })
            }

            if(link_novo_background_meu_perfil.value.trim() != '') {
                carregarImagem(link_novo_background_meu_perfil.value, function(imgBackground) {
                    link_novo_background_meu_perfil.value = ''
                    Fechar_Adicionar_Img_Meu_Perfil()
                    if(imgBackground) {
                        Fechar_Adicionar_Img_Meu_Perfil()
                        decreaseBlur()
                        Trocar_Background(imgBackground.src, document.body)
                        User.Perfil.Img_Background = imgBackground.src
        
                    } else {
                        pode_salvar = false
                        link_novo_background_meu_perfil.value = ''
                        Fechar_Adicionar_Img_Meu_Perfil()
                        Notificar_Infos('O link da imagem de background 🌄 não está funcionando 🚫🔗. Por favor, tente outro! 🔄✨', 'Confirmar', 'Tentar Outro').then((resolve) => {
                            if(resolve) {
                                Abrir_Add_Nova_Img_Meu_Perfil()
                            }
                        })
                    }
                })
            }
        })

        if(input_nome_user_meu_perfil.value.trim() != '') {
            document.getElementById('nome_user_meu_perfil').innerText = input_nome_user_meu_perfil.value
            User.Nome = input_nome_user_meu_perfil.value
        }

        setTimeout(() => {
            if(pode_salvar) {
                pode_salvar = false
                if(User.Estado_Da_Conta != 'Anônima') {
                    db.collection('Users').doc(User.ID).update({ Perfil: User.Perfil })
                    db.collection('Users').doc(User.ID).update({ Nome: User.Nome })

                } else {
                    Salvar_Perfil_Anonimo_User()
                }
            }
        }, 500)
    } else {
        Fechar_Adicionar_Img_Meu_Perfil()
        Notificar_Infos('Ei, você precisa informar o link da nova imagem antes de tentar alterar o perfil! 🖼️🚫📲🔗', 'Confirmar', 'Entendi').then((resolve) => {
            if(resolve) {
                Abrir_Add_Nova_Img_Meu_Perfil()
            }
        })
    }
}

function Fechar_Adicionar_Img_Meu_Perfil() {
    link_nova_img_meu_perfil.value = ''
    input_nome_user_meu_perfil.value = ''
    document.getElementById('container_add_nova_img_meu_perfil').style.display = 'none'
}

function Pesquisar_Musicas_Meu_Perfil(Pesquisa) {
    let pesquisa_formadata = formatarString(Pesquisa)

    let array_musicas_encontradas = []
    musicas_meu_perfil_pesquisa = []

    if(pesquisa_formadata.trim() != '') {
        let M_Curtidas = User.Musicas_Curtidas
        for (let c = 0; c < M_Curtidas.length; c++) {
            let nome = formatarString(M_Curtidas[c].Nome)
            let autor = formatarString(M_Curtidas[c].Autor)
            let genero = formatarString(M_Curtidas[c].Genero)

            if(pesquisa_formadata.includes(nome) || pesquisa_formadata.includes(autor) || pesquisa_formadata.includes(genero) || nome.includes(pesquisa_formadata) || autor.includes(pesquisa_formadata) || genero.includes(pesquisa_formadata)) {
                array_musicas_encontradas.push(M_Curtidas[c])
            }
        }

        Retornar_Musica_Linha(array_musicas_encontradas, document.getElementById('container_musicas_meu_perfil'), null, 'meuperfil')
        musicas_meu_perfil_pesquisa = [...array_musicas_encontradas]

    } else {
        musicas_meu_perfil_pesquisa = [...musicas_meu_perfil]
        Retornar_Musica_Linha(musicas_meu_perfil, document.getElementById('container_musicas_meu_perfil'), null, 'meuperfil')
    }
}