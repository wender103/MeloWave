let Infos_Random = {
    Nome: undefined,
}

const random_barra_musicas = document.getElementById('random_barra_musicas')
function Random(Array, Random_Ativo=true, Qm_Chamou=undefined) {
    let new_array = [...Array]
    if(Random_Ativo) {
        new_array = shuffleArray(new_array)

        if(Qm_Chamou) {
            Infos_Random.Nome = formatarString(Qm_Chamou)
        }

        random_barra_musicas.style.cursor = 'pointer'
        var paths = random_barra_musicas.querySelectorAll('path')
        paths.forEach(function(path) {
            path.style.fill = 'rgb(0, 255, 213)'
            path.style.cursor = 'pointer'
        })
    } else { 
        random_barra_musicas.style.cursor = 'pointer'
        var paths = random_barra_musicas.querySelectorAll('path')
        paths.forEach(function(path) {
            path.style.fill = '#fff'
            path.style.cursor = 'pointer'
        })
    }

    Listas_Prox.Lista_Musicas = new_array

    for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
        if(Listas_Prox.Lista_Musicas[c].ID == Listas_Prox.MusicaAtual.ID) {
            Listas_Prox.Indice = c
        }
    }

    Atualizar_Fila()
}

function Desativar_Random(Comando='Zerar') {
    if(Comando == 'Zerar') {
        Infos_Random.Nome = undefined
        musica_curtida_random = false
        musicas_artista_random = false
        musica_playlistmix_random = false
        playlistmix_ID = undefined
        Id_Paga_Artistas = undefined
        musicas_caixa_random = false

        random_barra_musicas.style.cursor = 'pointer'
        var paths = random_barra_musicas.querySelectorAll('path')
        paths.forEach(function(path) {
            path.style.fill = '#fff'
            path.style.cursor = 'pointer'
        })
    }

    const icon_random = document.querySelectorAll('.icon_random')
    icon_random.forEach(element => {
        element.style.cursor = 'not-allowed'
        var paths = element.querySelectorAll('path')
        paths.forEach(function(path) {
            path.style.fill = 'rgba(255, 255, 255, 0.438)'
            path.style.cursor = 'not-allowed'
        })
    })
}

let musicas_caixa_random = false
let array_musicas_caixa = []
random_barra_musicas.addEventListener('click', () => {
    let nome_fomatado = formatarString(Pagina_Interna.Nome)
    
    if(Infos_Random.Nome != undefined) {
        nome_fomatado = formatarString(Infos_Random.Nome)
    }

    let modo_ativo = false

    if(nome_fomatado == 'playlistmix') {

        if(musica_playlistmix_random) {
            musica_playlistmix_random = false
            Random(Arraay_PlaylistMix, false)

        } else { 
            musica_playlistmix_random = true
            Random(Arraay_PlaylistMix, true, 'playlistmix')
            modo_ativo = true
        }

    } else if(nome_fomatado == 'artista') {
        if(musicas_artista_random) {
            musicas_artista_random = false
            Random(Lsita_Musicas_Artista, false)

        } else {
            musicas_artista_random = true
            Random(Lsita_Musicas_Artista, true, 'artista')
            modo_ativo = true
        }

    } else if(nome_fomatado == 'musicascurtidas') {
        let new_arrey = [...Musicas_Curtidas_Array]
        
        if(musica_curtida_random) {
            musica_curtida_random = false
            Random(new_arrey.reverse(), false)

        } else {
            icon_random_musicascurtidas.style.cursor = 'pointer'
            var paths = icon_random_musicascurtidas.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = 'rgb(0, 255, 213)'
                path.style.cursor = 'pointer'
            })

            musica_curtida_random = true
            Random(new_arrey.reverse(), true, 'musicascurtidas')
            modo_ativo = true
        }
    } else if(nome_fomatado == 'musicascaixa') {
        if(!musicas_caixa_random) {
            musicas_caixa_random = true
            array_musicas_caixa = [...Listas_Prox.Lista_Musicas]
            Random(Listas_Prox.Lista_Musicas, true, 'musicascaixa')

        } else {
            musicas_caixa_random = false 
            Random(array_musicas_caixa, false, 'musicascaixa')
        }
    }

    const icon_random = document.querySelectorAll('.icon_random')
    icon_random.forEach(element => {
        if(element.id == `icon_random_${nome_fomatado}` || nome_fomatado == formatarString(Pagina_Interna.Nome)) {
            element.style.cursor = 'cursor'

        } else {
            element.style.cursor = 'not-allowed'
        }
        var paths = element.querySelectorAll('path')
        paths.forEach(function(path) {
            if(element.id == `icon_random_${nome_fomatado}` && modo_ativo) {
                path.style.fill = 'rgb(0, 255, 213)'
                path.style.cursor = 'cursor'
    
            } else if(nome_fomatado == formatarString(Pagina_Interna.Nome)) {
                path.style.cursor = 'cursor'
                path.style.fill = '#fff'

            } else {
                element.style.cursor = 'not-allowed'
                path.style.fill = 'rgba(255, 255, 255, 0.438)'
            }
        })
    })
})