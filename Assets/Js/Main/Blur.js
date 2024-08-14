let blurAmount = 0;
const maxBlur = 20; // Ajuste o valor máximo de blur aqui
const tempo_mudar_blur = 30
// const main = document.querySelector('main')
const nav_ul = document.querySelector('nav').querySelectorAll('ul')

function increaseBlur() {
    if (blurAmount < maxBlur) {
    blurAmount += 1
    main.style.backdropFilter = `blur(${blurAmount}px)`
    container_tela_tocando_agora.style.backdropFilter = `blur(${blurAmount}px)`
    nav_ul.forEach(ul => {
        ul.style.backdropFilter = `blur(${blurAmount}px)`
    })

    container_barra_musica.style.backdropFilter = `blur(${blurAmount}px)`
    container_fila.style.backdropFilter = `blur(${blurAmount}px)`
    setTimeout(increaseBlur, tempo_mudar_blur) // Ajuste o tempo aqui para um efeito mais rápido ou mais lento
    }
} increaseBlur()

function decreaseBlur() {
    if(!User.Configuracoes.Background.Cores_Solidas) {
        if (blurAmount > 0) {
        blurAmount -= 1
        main.style.backdropFilter = `blur(${blurAmount}px)`
        document.querySelector('body').style.backdropFilter = `blur(${blurAmount}px)`
        container_tela_tocando_agora.style.backdropFilter = `blur(${blurAmount}px)`
        nav_ul.forEach(ul => {
            ul.style.backdropFilter = `blur(${blurAmount}px)`
        })
        container_barra_musica.style.backdropFilter = `blur(${blurAmount}px)`
        container_fila.style.backdropFilter = `blur(${blurAmount}px)`
        setTimeout(decreaseBlur, tempo_mudar_blur) // Ajuste o tempo aqui para um efeito mais rápido ou mais lento
        }
    }
}