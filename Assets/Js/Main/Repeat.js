const repeat_icons = document.querySelectorAll('.repeat_icons')

repeat_icons.forEach(repeat => {
    repeat.addEventListener('click', () => {
        Repetir_Musica()
    })
})

let repetir_musicas = false
function Repetir_Musica(Repetir=null) {
    if(!Repetir) {
        if(!repetir_musicas) {
            repetir_musicas = true

            repeat_icons.forEach(element => {
                var paths = element.querySelectorAll('path')
                paths.forEach(function(path) {
                    path.style.fill = 'rgb(0, 255, 213)'
                })
            });

        } else {
            repetir_musicas = false

            repeat_icons.forEach(element => {
                var paths = element.querySelectorAll('path')
                paths.forEach(function(path) {
                    path.style.fill = '#fff'
                })
            })
        }
    }
}