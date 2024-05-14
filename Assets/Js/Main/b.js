const icon_random = document.querySelectorAll('.icon_random')
const icon_random_barra_musica = document.querySelectorAll('.icon_random_barra_musica')
let ultomas_infos = {
    Nome: '',
    ID: '',
    Lista: []
}

const img_play_musicas_artista = document.getElementById('img_play_musicas_artista')
img_play_musicas_artista.addEventListener('click', () => {
    Tocar_Musica(Lsita_Musicas_Artista, Lsita_Musicas_Artista[0])
    Listas_Prox.Nome_Album = 'Músicas Artista'
})


const img_play_playlist_mix = document.getElementById('img_play_playlist_mix')
img_play_playlist_mix.addEventListener('click', () => {
    let new_arary = [...Arraay_Playlist_Mix_Random]

    Tocar_Musica(new_arary.reverse(), new_arary[0])
    Ativar_svg_random(document.getElementById('icon_random_playlist_mix'))
})

const icon_random_playlist_mix = document.getElementById('icon_random_playlist_mix')
icon_random_playlist_mix.addEventListener('click', () => {
    // Arraay_Playlist_Mix_Random = [...Random(Arraay_Playlist_Mix)]
    if(icon_random_playlist_mix.style.cursor == 'pointer') {
        Random(icon_random_playlist_mix)
    }
})

//! Tocar Músicas Curtidas
const icon_random_musicascurtidas = document.getElementById('icon_random_musicascurtidas')
icon_random_musicascurtidas.addEventListener('click', () => {
    if(icon_random_musicascurtidas.style.cursor == 'pointer') {
        Random(document.getElementById('icon_random_musicascurtidas'))
    }
})

const img_play_musicas_curtidas = document.getElementById('img_play_musicas_curtidas')
img_play_musicas_curtidas.addEventListener('click', () => {
    Ativar_svg_random(icon_random_musicascurtidas)
    Tocar_Musica(Musicas_Curtidas_Array.reverse(), Musicas_Curtidas_Array[0])
})

document.getElementById('random_barra_musicas').addEventListener('click', () => {
    Random()
})

function Ativar_svg_random(svg, comando=null) {
    const icon_random = document.querySelectorAll('.icon_random')
    icon_random.forEach(element => {
        element.style.cursor = 'not-allowed'
        var paths = element.querySelectorAll('path')
        paths.forEach(function(path) {
            path.style.fill = 'rgba(255, 255, 255, 0.438)'
            path.style.cursor = 'not-allowed'
        })
    })
    
    if(svg) {
        if(comando == 'Verde') {
            svg.style.cursor = 'pointer'
            var paths = svg.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = 'rgb(0, 255, 213)'
                path.style.cursor = 'pointer'
            })
        } else {
            svg.style.cursor = 'pointer'
            var paths = svg.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = '#fff'
                path.style.cursor = 'pointer'
            })
        }
    }
}

let Lista_Original = []
let Modo_Random_Ativo = false
function Random(svg_icon) {
    if(Modo_Random_Ativo) {
        Modo_Random_Ativo = false
        Listas_Prox.Lista_Musicas = [...Lista_Original]
        
    } else {
        Modo_Random_Ativo = true
        Lista_Original = [...Listas_Prox.Lista_Musicas]
        Listas_Prox.Lista_Musicas = [...shuffleArray(Listas_Prox.Lista_Musicas)]
    }

    for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
        if(Listas_Prox.MusicaAtual.ID == Listas_Prox.Lista_Musicas[c].ID) {
            Listas_Prox.Indice = c
        }
    }

    
    if(svg_icon) {
        if(Modo_Random_Ativo) {
            svg_icon.style.cursor = 'pointer'
            let paths = svg_icon.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = 'rgb(0, 255, 213)'
                path.style.cursor = 'pointer'
            })

            Ativar_svg_random(svg_icon, 'Verde')
        } else {
            Ativar_svg_random(svg_icon, '')
        }
    }

    Atualizar_Fila()
}