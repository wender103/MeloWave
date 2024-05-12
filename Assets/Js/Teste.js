const musica_caixa = document.querySelectorAll('.musica_caixa')

musica_caixa.forEach(musica => {
    musica.addEventListener('click', () => {
        console.log(1111)
        console.log(musica.querySelector('.container_img_musica').querySelector('img').src)
        document.body.style.backgroundImage = `url(${musica.querySelector('.container_img_musica').querySelector('img').src})`
    })
})