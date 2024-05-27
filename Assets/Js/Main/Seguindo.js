function Carreagr_Artistas_Seguindo() {
    let Artistas_Seguindo = User.Social.Artistas
    let musica_alternativa
    let musica_escolhida
    document.getElementById('container_artistas_seguindo').innerHTML = ''

    for (let a = 0; a < Artistas_Seguindo.length; a++) {
        musica_alternativa = undefined
        musica_escolhida = undefined

        for (let b = 0; b < TodasMusicas.length; b++) {
            if(TodasMusicas[b].Autor.includes(Artistas_Seguindo[a].Autor) || Artistas_Seguindo[a].Autor.includes(TodasMusicas[b].Autor)) {
                musica_alternativa = TodasMusicas[b]
            }
            
            if(TodasMusicas[b].Autor == Artistas_Seguindo[a].Autor) {
                musica_escolhida = TodasMusicas[b]
                break
            }
        }

        if(musica_escolhida == undefined) {
            musica_escolhida = musica_alternativa
        }

        const li = document.createElement('li')
        const img_autor = document.createElement('img')

        img_autor.src = musica_escolhida.Img
        li.title = Artistas_Seguindo[a].Autor
        li.className = 'li_artista_seguindo li_seguindo'

        li.appendChild(img_autor)
        document.getElementById('container_artistas_seguindo').appendChild(li)

        li.addEventListener('click', () => {
            Abrir_Perfil_Artista(li.title, musica_escolhida)
        })
    }
}