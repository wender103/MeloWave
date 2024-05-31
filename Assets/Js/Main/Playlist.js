function Abrir_PLaylistMix(Array, Nome, svg) {
    let new_array = [...Array]

    document.getElementById('container_svg_mix_daily').style.display = 'flex'
    document.getElementById('nome_mix_playlistmix').innerText = Nome
    document.getElementById('contaier_svg_playlistmix').innerHTML = svg
    document.getElementById('nome_playlistmix').innerText = Nome
    document.getElementById('img_da_playlistmix').src = new_array[new_array.length - 1].Img
    document.getElementById('p_infos_playlistmix').innerText = `Feito para ${User.Nome}`

    somarTempos(new_array).then((Tempo) => {
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
        if(new_array.length == 1) {
            name_msuicas = 'música'
        }
        document.getElementById('p_infos_playlistmix').innerHTML += ` - <span id="quantidade_musicas_playlist_daily">${new_array.length} ${name_msuicas}, ${resultado}</span>`
    })

    Retornar_Musica_Linha(new_array.reverse(), document.getElementById('container_playlistmix'), null, 'PlaylistMix')
    Abrir_Pagina('playlistmix', `${formatarString(Nome)}-${new_array[new_array.length - 1].ID}`)
    Trocar_Background(new_array[0].Img, document.body)
}