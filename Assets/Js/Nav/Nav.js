//* Vai mostrar o nome dos lis
const li_icon = document.querySelectorAll('.li_icon')

li_icon.forEach(li => {
    li.addEventListener('click', () => {
        let nomes = formatarString(li.title)
        if(nomes == 'musicascurtidas') {
            Abrir_Pagina(formatarString(li.title), `musicascurtidas=${User.ID}`)

        } else {
            Abrir_Pagina(formatarString(li.title))
        }
    })
})

