function Limpar_Paginas() {
    Avisos_Rapidos('Limpar Paginas')
    const Paginas = document.querySelectorAll('.Paginas')

    Paginas.forEach(pagina => {        
        if(pagina.style.opacity == '' || pagina.style.opacity == 0 || pagina.style.opacity == '0') {
            if(pagina.id == 'Pagina_musicascurtidas') {
                document.getElementById('container_musicas_curtidas').innerText = ''

            } else if(pagina.id == 'Pagina_playlist') {
                document.getElementById('container_musicas_playlist_page').innerHTML = ''

            } else if(pagina.id == 'Pagina_artista') {
                document.getElementById('container_musicas_pag_artista').innerHTML = ''

            } else if(pagina.id == 'Pagina_match') {
                document.getElementById('container_match').innerHTML = ''

            } else if(pagina.id == 'Pagina_perfil') {
                document.getElementById('container_musicas_perfil').innerHTML = ''

            } else if(pagina.id == 'Pagina_meuperfil') {
                document.getElementById('container_musicas_meu_perfil').innerHTML = ''
            } 
        }
    })
}