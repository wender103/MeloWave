function Abrir_PLaylistMix(Array, Nome, svg) {
    let new_array = [...Array]

    document.getElementById('container_svg_mix_daily').style.display = 'flex'
    document.getElementById('nome_mix_playlistmix').innerText = Nome
    document.getElementById('contaier_svg_playlistmix').innerHTML = svg
    document.getElementById('nome_playlistmix').innerText = Nome
    document.getElementById('img_da_playlistmix').src = new_array[new_array.length - 1].Img
    document.getElementById('p_infos_playlistmix').innerHTML = `Feito para ${User.Nome} - ${new_array.length} músicas`

    Retornar_Musica_Linha(new_array.reverse(), document.getElementById('container_playlistmix'), null, 'PlaylistMix')
    Abrir_Pagina('playlistmix')
    Pagina_Interna.ID = `${formatarString(Nome)}-${new_array[new_array.length - 1].ID}`
    Trocar_Background(new_array[0].Img, document.body)

    if(playlistmix_ID != Pagina_Interna.ID) {
        Desativar_Random('Não Zerar')
    } else {
        const icon_random_playlistmix = document.getElementById('icon_random_playlistmix')
        icon_random_playlistmix.style.cursor = 'pointer'
        var paths = icon_random_playlistmix.querySelectorAll('path')
        paths.forEach(function(path) {
            path.style.fill = 'rgb(0, 255, 213)'
            path.style.cursor = 'pointer'
        })
    }
}