let Lsita_Musicas_Artista = []
let Id_Paga_Artistas = undefined
function Abrir_Perfil_Artista(Artista, Musica) {
    Lsita_Musicas_Artista = Pegar_Musicas(Artista, 'Artista').reverse()
    Lsita_Musicas_Artista = Lsita_Musicas_Artista.reverse()
    Retornar_Musica_Linha(Lsita_Musicas_Artista, document.getElementById('container_musicas_pag_artista'), 'Não Inverter', 'artista')

    let musica_escolhida = Musica
    let musica_encontrada = false
    let musicas_do_autor = []
    for (let c = 0; c < TodasMusicas.length; c++) {
        let Artista_formatado = formatarString(Artista)
        let autor_formatado = formatarString(TodasMusicas[c].Autor)
        if(Artista_formatado == autor_formatado) {
            musica_encontrada = true
            musicas_do_autor.push(TodasMusicas[c])
        }
    }

    if(!musica_encontrada) {
        for (let c = 0; c < TodasMusicas.length; c++) {
            let Artista_formatado = formatarString(Artista)
            let autor_formatado = formatarString(TodasMusicas[c].Autor)
            if(Artista_formatado.includes(autor_formatado) && TodasMusicas[c].ID != Musica.ID || autor_formatado.includes(Artista_formatado) && TodasMusicas[c].ID != Musica.ID) {
                musicas_do_autor.push(TodasMusicas[c])
            }
            
        }
    }

    if(musicas_do_autor.length > 0) {
        musica_escolhida = musicas_do_autor[Math.floor(Math.random() * musicas_do_autor.length)]
    }

    Pagina_Interna.Nome = 'artista'
    Pagina_Interna.ID = `artista=${Lsita_Musicas_Artista[0].ID}`

    if(Id_Paga_Artistas != Pagina_Interna.ID) {
        Desativar_Random('Não Zerar')
    } else {
        if(musicas_artista_random) {
            icon_random_artista.style.cursor = 'pointer'
            var paths = icon_random_artista.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = 'rgb(0, 255, 213)'
                path.style.cursor = 'pointer'
            })
        } else {
            if(Id_Paga_Artistas != Pagina_Interna.ID) {
                icon_random_artista.style.cursor = 'pointer'
                var paths = icon_random_artista.querySelectorAll('path')
                icon_random_artista.style.cursor = 'not-allowed'
                paths.forEach(function(path) {
                    path.style.fill = 'rgba(255, 255, 255, 0.438)'
                        path.style.cursor = 'not-allowed'
                })

            } else {
                icon_random_artista.style.cursor = 'pointer'
                var paths = icon_random_artista.querySelectorAll('path')
                paths.forEach(function(path) {
                    path.style.fill = '#fff'
                    path.style.cursor = 'pointer'
                })
            }
        }
    }

    document.getElementById('background_paginas_artista').style.backgroundImage = `url(${musica_escolhida.Img})`
    document.getElementById('nome_artista').innerText = Artista
    Abrir_Pagina('artista')
    Trocar_Background(musica_escolhida.Img, document.body)
}

let musicas_artista_random = false
const icon_random_artista = document.getElementById('icon_random_artista')
icon_random_artista.addEventListener('click', () => {
    if(icon_random_artista.style.cursor == 'pointer') { 
        if(musicas_artista_random) {
            musicas_artista_random = false
            icon_random_artista.style.cursor = 'pointer'
            var paths = icon_random_artista.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = '#fff'
                path.style.cursor = 'pointer'
            })

            Random(Lsita_Musicas_Artista, false)

        } else {
            musicas_artista_random = true

            icon_random_artista.style.cursor = 'pointer'
            var paths = icon_random_artista.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = 'rgb(0, 255, 213)'
                path.style.cursor = 'pointer'
            })

            Random(Lsita_Musicas_Artista, true, 'artista')
        }
    }
})

const img_play_musicas_artista = document.getElementById('img_play_musicas_artista')
img_play_musicas_artista.addEventListener('click', () => {
    if(Id_Paga_Artistas != Pagina_Interna.ID) {
        Desativar_Random()
    }

    icon_random_artista.style.cursor = 'pointer'
    var paths = icon_random_artista.querySelectorAll('path')
    paths.forEach(function(path) {
        path.style.fill = '#fff'
        path.style.cursor = 'pointer'
    })

    Id_Paga_Artistas = `artista=${Lsita_Musicas_Artista[0].ID}`

    Tocar_Musica(Lsita_Musicas_Artista, Lsita_Musicas_Artista[0])
})