let Array_Musicas_Playlist = []

function Abrir_PLaylist_Mix(Array, Nome, svg) {
    Array_Musicas_Playlist = Array

    document.getElementById('container_svg_mix_daily').style.display = 'flex'
    document.getElementById('nome_mix_playlist').innerText = Nome
    document.getElementById('contaier_svg_playlist').innerHTML = svg
    document.getElementById('nome_playlist').innerText = Nome
    document.getElementById('img_da_playlist').src = Array[Array.length -1].Img
    document.getElementById('p_infos_playlist').innerHTML = `Feito para ${User.Nome} - ${Array.length} músicas`

    Retornar_Musica_Linha(Array, document.getElementById('container_playlist'))
    Abrir_Pagina('playlist')
    Trocar_Background(Array[Array.length -1].Img, document.body)
}

document.getElementById('img_play_playlist').addEventListener('click', () => {
    Array_Musicas_Playlist = Array_Musicas_Playlist.reverse()
    Tocar_Musica(Array_Musicas_Playlist, Array_Musicas_Playlist[0])
})