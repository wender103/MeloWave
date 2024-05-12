let Lsita_Musicas_Artista = []

function Abrir_Perfil_Artista(Artista, Musica) {
    Lsita_Musicas_Artista = Pegar_Musicas(Artista, 'Artista').reverse()
    Lsita_Musicas_Artista = Lsita_Musicas_Artista.reverse()
    Retornar_Musica_Linha(Lsita_Musicas_Artista, document.getElementById('container_musicas_pag_artista'), 'Não Inverter')

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

    document.getElementById('background_paginas_artista').style.backgroundImage = `url(${musica_escolhida.Img})`
    document.getElementById('nome_artista').innerText = Artista
    Abrir_Pagina('artista')
    Trocar_Background(musica_escolhida.Img, document.body)
}

document.getElementById('img_play_musicas_artista').addEventListener('click', () => {
    Tocar_Musica(Lsita_Musicas_Artista, Lsita_Musicas_Artista[0])
    Listas_Prox.Nome_Album = 'Músicas Artista'
})