function Abrir_PLaylistMix(Array, Nome, svg) {
    let new_array = [...Array]

    document.getElementById('container_svg_mix_daily').style.display = 'flex'
    document.getElementById('nome_mix_playlistmix').innerText = Nome
    document.getElementById('contaier_svg_playlistmix').innerHTML = svg
    document.getElementById('nome_playlistmix').innerText = Nome
    document.getElementById('img_da_playlistmix').src = new_array[new_array.length - 1].Img
    document.getElementById('p_infos_playlistmix').innerHTML = `Feito para ${User.Nome} - ${new_array.length} músicas`

    Retornar_Musica_Linha(new_array.reverse(), document.getElementById('container_playlistmix'), null, 'PlaylistMix')
    Abrir_Pagina('playlistmix', `${formatarString(Nome)}-${new_array[new_array.length - 1].ID}`)
    Trocar_Background(new_array[0].Img, document.body)
}