const repeat_icons = document.querySelectorAll('.repeat_icons')

repeat_icons.forEach(repeat => {
    repeat.addEventListener('click', () => {
        Repetir_Musica()
    })
})

let repetir_musicas = false
function Repetir_Musica(Repetir=null, Comando='') {
    if(Repetir != null) {
        repetir_musicas = !Repetir
    }

    if(!repetir_musicas) {
        repetir_musicas = true

        repeat_icons.forEach(element => {
            var paths = element.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = 'rgb(0, 255, 213)'
            })
        })

    } else {
        repetir_musicas = false

        repeat_icons.forEach(element => {
            var paths = element.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = '#fff'
            })
        })
    }

    if(!Comando.includes('Não Atualizar')) {
        Atualizar_Sincronizar()
    }
}

//! ------------------------ Random Songs ---------------------------------------------
const icon_random_barra_musica = document.querySelectorAll('.icon_random_barra_musica')

icon_random_barra_musica.forEach(repeat => {
    repeat.addEventListener('click', () => {
        Deixar_Random()
    })
})

let random_musicas = false
function Deixar_Random(Random=null, Comando='') {    
    if(Random != null) {
        random_musicas = !Random
    }

    if(!random_musicas) {
        random_musicas = true

        icon_random_barra_musica.forEach(element => {
            var paths = element.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = 'rgb(0, 255, 213)'
            })
        })

    } else {
        random_musicas = false

        icon_random_barra_musica.forEach(element => {
            var paths = element.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = '#fff'
            })
        })
    }

    if(!Comando.includes('Não Atualizar')) {
        Atualizar_Sincronizar()
    }
}