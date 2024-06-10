let User_Tocando_Agora = undefined
function Carregar_Perfil(User_Carregar) {
    Abrir_Pagina('perfil', `perfil_${User_Carregar.ID}`)

    Atualizar_Perfil(User_Carregar)
}

let array_postadas_pelo_user_carregar = []
let musicas_perfil_pesquisa = []
let infos_user_carregar = {}
const img_perfil_zoom = document.getElementById('img_perfil_zoom')
function Atualizar_Perfil(User_Carregar) {
    array_postadas_pelo_user_carregar = []
    musicas_perfil_pesquisa = []
    infos_user_carregar = User_Carregar
    document.getElementById('input_pesquisar_musicas_perfil').value = ''
    const img_foto_perfil = document.getElementById('img_foto_perfil')

    for (let c = 0; c < TodasMusicas.length; c++) {
        if(TodasMusicas[c].Estado == 'Ativo' && TodasMusicas[c].Email == User_Carregar.Email) {
            array_postadas_pelo_user_carregar.push(TodasMusicas[c])
        }
    }

    musicas_perfil_pesquisa = array_postadas_pelo_user_carregar

    document.getElementById('nome_user_perfil').innerText = User_Carregar.Nome

    //! Carregar img do perfil
    carregarImagem(User_Carregar.Perfil.Img_Perfil, function(imgPerfil) {
        if(imgPerfil) {
            img_foto_perfil.src = User_Carregar.Perfil.Img_Perfil
            img_perfil_zoom.src = User_Carregar.Perfil.Img_Perfil
            img_foto_perfil.classList.add('foto_de_perfil')

        } else {
            if(User_Carregar.Perfil.Img_Email) {
                carregarImagem(User_Carregar.Perfil.Img_Email, function(imgEmail) {
                    if(imgEmail) {
                        img_foto_perfil.src = User_Carregar.Perfil.Img_Email
                        img_perfil_zoom.src = User_Carregar.Perfil.Img_Email
                        img_foto_perfil.classList.add('foto_de_perfil')
                    } else {
                        img_foto_perfil.src = 'Assets/Imgs/user_anonimo.png'
                        img_perfil_zoom.src = 'Assets/Imgs/user_anonimo.png'
                        img_foto_perfil.classList.remove('foto_de_perfil')
                    }
                })
            }
        }
    })

    carregarImagem(User_Carregar.Perfil.Img_Background, function(imgPerfil) {
        if(imgPerfil) {
            Trocar_Background(User_Carregar.Perfil.Img_Background, document.querySelector('body'))
        }
    })

    const numero_seguidores_perfil = document.getElementById('numero_seguidores_perfil')

    // let ouvintes = parseInt(User.Perfil.Ouvintes)
    let ouvintes = 0

    for (let c = 0; c < musicas_perfil_pesquisa.length; c++) {
        ouvintes += parseInt(musicas_perfil_pesquisa[c].Views)
    }

    let seguindo = User_Carregar.Social.Seguindo.length
    let seguidores = User_Carregar.Social.Seguidores.length
    let qtns_seguidores_infos = ''

    if(seguindo > 0) {
        seguindo = `${User_Carregar.Social.Seguindo.length} seguindo`
        qtns_seguidores_infos += seguindo
    }

    if(seguidores > 0) {
        seguidores = `${User_Carregar.Social.Seguidores.length} seguidores`

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


    if(qtns_seguidores_infos != '') {
        qtns_seguidores_infos += ' - '
    }

    somarTempos(array_postadas_pelo_user_carregar).then((Tempo) => {
        let resultado = ''

        if(Tempo.Horas > 0) {
            resultado += `${Tempo.Horas} horas`
        }

        if(Tempo.Minutos > 0) {
            if(resultado != '') {
                resultado += `, ${Tempo.Minutos} min`

            } else {
                resultado += `${Tempo.Minutos} min`
            }
        }

        if(Tempo.Segundos > 0) {
            if(resultado != '') {
                resultado += ` e ${Tempo.Segundos} s`

            } else {
                resultado += `${Tempo.Segundos} s`
            }
        }

        let name_msuicas = 'músicas'
        if(array_postadas_pelo_user_carregar.length == 1) {
            name_msuicas = 'música'
        }

        if(qtns_seguidores_infos != '') {
            numero_seguidores_perfil.innerHTML = `${qtns_seguidores_infos}<span id="quantidade_musicas_perfil">${array_postadas_pelo_user_carregar.length} ${name_msuicas}, ${resultado}</span>`
        } else {
            numero_seguidores_perfil.innerHTML = `${qtns_seguidores_infos}<span id="quantidade_musicas_perfil">${array_postadas_pelo_user_carregar.length} ${name_msuicas} ${resultado}</span>`
        }
    })
    
    document.getElementById('container_musicas_perfil').innerHTML = ''

    if(array_postadas_pelo_user_carregar.length <= 0 ) {
        document.getElementById('h1_postadas_por_perfil').innerText = 'Nehuma música ainda...'
        document.getElementById('h1_postadas_por_perfil').classList.add('h1_nehuma_musica_perfil')
    } else {
        document.getElementById('h1_postadas_por_perfil').classList.remove('h1_nehuma_musica_perfil')
        document.getElementById('h1_postadas_por_perfil').innerHTML = 'Postadas Por: <span id="nome_user_musicas_postadas_perfil"></span>'
        document.getElementById('nome_user_musicas_postadas_perfil').innerText = User_Carregar.Nome
        Retornar_Musica_Linha(array_postadas_pelo_user_carregar, document.getElementById('container_musicas_perfil'), 'View', 'perfil')
    }
}

img_foto_perfil.addEventListener('click', () => {
    if(img_perfil_zoom.src != 'Assets/Imgs/user_anonimo.png') {
        Abrir_Img_Perfil_Zoom()
    }
})

function Abrir_Img_Perfil_Zoom() {
    const container = document.getElementById('container_img_perfil_zoom')
    container.style.display = 'flex'

    // Adiciona uma pequena pausa para garantir que o display flex tenha sido aplicado antes de iniciar a animação
    setTimeout(() => {
        container.classList.add('active')
    }, 10)
}

function fecharImagemZoom() {
    const container = document.getElementById('container_img_perfil_zoom')
    container.classList.remove('active')

    // Aguarda o fim da animação antes de ocultar o elemento
    setTimeout(() => {
        container.style.display = 'none'
    }, 500) // Corresponde ao tempo da transição
}

document.getElementById('img_play_musicas_perfil').addEventListener('click', () => {
    let new_array = [...musicas_perfil_pesquisa]
    User_Tocando_Agora = infos_user_carregar.Email
    Tocar_Musica(new_array.reverse(), musicas_perfil_pesquisa[musicas_perfil_pesquisa.length - 1], `perfil_${infos_user_carregar.ID}`, 'perfil')
    
})

function Pesquisar_Musicas_Perfil(Pesquisa) {
    let pesquisa_formadata = formatarString(Pesquisa)

    let array_musicas_encontradas = []
    musicas_perfil_pesquisa = []

    if(pesquisa_formadata.trim() != '') {
        let M_pesquisar = [...array_postadas_pelo_user_carregar]
        for (let c = 0; c < M_pesquisar.length; c++) {
            let nome = formatarString(M_pesquisar[c].Nome)
            let autor = formatarString(M_pesquisar[c].Autor)
            let genero = formatarString(M_pesquisar[c].Genero)

            if(pesquisa_formadata.includes(nome) || pesquisa_formadata.includes(autor) || pesquisa_formadata.includes(genero) || nome.includes(pesquisa_formadata) || autor.includes(pesquisa_formadata) || genero.includes(pesquisa_formadata)) {
                array_musicas_encontradas.push(M_pesquisar[c])
            }
        }

        Retornar_Musica_Linha(array_musicas_encontradas, document.getElementById('container_musicas_perfil'), 'View', 'perfil')
        musicas_perfil_pesquisa = [...array_musicas_encontradas]

    } else {
        musicas_perfil_pesquisa = [...array_postadas_pelo_user_carregar]
        Retornar_Musica_Linha(musicas_perfil_pesquisa, document.getElementById('container_musicas_perfil'), 'View', 'perfil')
    }
}