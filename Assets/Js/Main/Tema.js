let Tema_Atual_Pagina = 'Claro'
function mudarTemaParaClaro(Comando='') {
    Tema_Atual_Pagina = 'Claro'
    
    if(Comando.includes('Salvar Tema')) {
    }

    document.documentElement.style.setProperty('--white', '#ffffff')
    document.documentElement.style.setProperty('--white_transparent', 'rgba(255, 255, 255, 0.541)')
    document.documentElement.style.setProperty('--fonte_meio_transparente', 'rgba(255, 255, 255, 0.555)')
    document.documentElement.style.setProperty('--white_pouco_transparent', 'rgba(255, 255, 255, 0.612)')

    document.getElementById('pre_letra_da_musica').classList.remove('Dark')

    const imagensClasse = document.querySelectorAll('img.icone')
    imagensClasse.forEach(img => {
        img.style.filter = 'brightness(100%)'
    })

    const svgs = document.querySelectorAll('svg.icone')
    svgs.forEach(svg => {
        svg.style.fill = 'white'
        const paths = svg.querySelectorAll('path')
        paths.forEach(path => {
            path.setAttribute('fill', 'white')
        })
    })

    atualizar_cor_progresso_input(document.getElementById('input_range_musica_pc'))
    atualizar_cor_progresso_input(document.getElementById('input_volume_pc'))
}

function mudarTemaParaEscuro(Comando='') {
    Tema_Atual_Pagina = 'Escuro'

    if(Comando.includes('Salvar Tema')) {
    }

    document.documentElement.style.setProperty('--white', '#000')
    document.documentElement.style.setProperty('--white_transparent', '#2e2e2e')
    document.documentElement.style.setProperty('--fonte_meio_transparente', '#0000008e')
    document.documentElement.style.setProperty('--white_pouco_transparent', '#0000009c')

    document.getElementById('pre_letra_da_musica').classList.add('Dark')

    const imagensClasse = document.querySelectorAll('img.icone')
    imagensClasse.forEach(img => {
        img.style.filter = 'brightness(0%)'
    })

    const svgs = document.querySelectorAll('svg.icone')
    svgs.forEach(svg => {
        svg.style.fill = 'black'
        const paths = svg.querySelectorAll('path')
        paths.forEach(path => {
            path.setAttribute('fill', 'black')
        })
    })

    atualizar_cor_progresso_input(document.getElementById('input_range_musica_pc'))
    atualizar_cor_progresso_input(document.getElementById('input_volume_pc'))
}