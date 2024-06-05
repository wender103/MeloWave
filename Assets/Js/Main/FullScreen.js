let timeoutId;

document.addEventListener('mousemove', () => {
    // Quando o mouse se move, definimos a opacidade como 1 e redefinimos o temporizador
    document.getElementById('container_barra_musica_fullscreen').style.bottom = '50px'
    setTimeout(() => {
        document.getElementById('contaier_controles_fullscreen').style.opacity = 1
    }, 500)

    clearTimeout(timeoutId) // Limpa o temporizador anterior
    timeoutId = setTimeout(() => {
        // Depois de 2 segundos com o mouse parado, definimos a opacidade como 0
        document.getElementById('contaier_controles_fullscreen').style.opacity = 0
        setTimeout(() => {
            document.getElementById('container_barra_musica_fullscreen').style.bottom = '-70px'
        }, 500)
    }, 2000)
})

let fullscreen_aberta = false
function Ativar_Fullscreen() {
    fullscreen_aberta = true
    const container_fullscreen = document.getElementById('container_fullscreen')
    container_fullscreen.style.display = 'block'
    Atualizar_Fullscreen()

    setTimeout(() => {
        container_fullscreen.style.opacity = 1
    }, 500)
}

function Atualizar_Fullscreen() {
    entrarEmTelaCheia()
    document.getElementById('img_musica_fullscreen').src = Listas_Prox.MusicaAtual.Img
    document.getElementById('nome_musica_fullscreen').innerText = Listas_Prox.MusicaAtual.Nome
    document.getElementById('nome_autor_fullscreen').innerText = Listas_Prox.MusicaAtual.Autor

    let musica_escolhida = Listas_Prox.MusicaAtual
    let musica_encontrada = false
    let musicas_do_autor = []
    for (let c = 0; c < TodasMusicas.length; c++) {
        let Artista_formatado = formatarString(Separar_Por_Virgula(Listas_Prox.MusicaAtual.Autor)[0])
        let autor_formatado = formatarString(TodasMusicas[c].Autor)
        if(Artista_formatado == autor_formatado) {
            musica_encontrada = true
            musicas_do_autor.push(TodasMusicas[c])
        }
    }

    if(!musica_encontrada) {
        for (let c = 0; c < TodasMusicas.length; c++) {
            let Artista_formatado = formatarString(Separar_Por_Virgula(Listas_Prox.MusicaAtual.Autor)[0])
            let autor_formatado = formatarString(TodasMusicas[c].Autor)
            if(Artista_formatado.includes(autor_formatado) && TodasMusicas[c].ID != Listas_Prox.MusicaAtual.ID || autor_formatado.includes(Artista_formatado) && TodasMusicas[c].ID != Listas_Prox.MusicaAtual.ID) {
                musicas_do_autor.push(TodasMusicas[c])
            }
        }
    }

    if(musicas_do_autor.length > 1) {
        musica_escolhida = musicas_do_autor.sort((a, b) => b.Views - a.Views)[1]
    }

    Trocar_Background(musica_escolhida.Img, document.getElementById('background_fullscreen'))
}

function Destivar_Fullscreen() {
    fullscreen_aberta = false
    const container_fullscreen = document.getElementById('container_fullscreen')

    container_fullscreen.style.opacity = 0
    setTimeout(() => {
        container_fullscreen.style.display = 'none'
    }, 800)
}

input_volume_pc_fullscreen.onmouseenter = function() {
    // cor_input_agora = 'rgb(0, 255, 255)'
    atualizar_cor_progresso_input(this)
}

input_volume_pc_fullscreen.oninput = function() {
    // cor_input_agora = 'rgb(0, 255, 255)'
    Volume(this.value, input_volume_pc)
    atualizar_cor_progresso_input(this)
}

// Evento quando o mouse sai do input
input_volume_pc_fullscreen.onmouseleave = function() {
    cor_input_agora = '#fff'
    atualizar_cor_progresso_input(this)
}

const container_input_volume_fullscreen = document.getElementById('container_input_volume_fullscreen')

let pd_diminuir_volume_full_screen = false
container_input_volume_fullscreen.addEventListener('mouseenter', () => {
    pd_diminuir_volume_full_screen = false
    input_volume_pc_fullscreen.style.width = '100%'
})

container_input_volume_fullscreen.addEventListener('mouseleave', () => {
    pd_diminuir_volume_full_screen = true

    setTimeout(() => {
        if(pd_diminuir_volume_full_screen) {
            input_volume_pc_fullscreen.style.width = '0%'
        }
    }, 500)
})