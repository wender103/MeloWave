//* Vai mostrar o nome dos lis
const li_icon = document.querySelectorAll('.li_icon')

li_icon.forEach(li => {
    li.addEventListener('mouseenter', () => {
        li.querySelector('p').style.display = 'block'
        setTimeout(() => {
            li.querySelector('p').style.opacity = '1'
        }, 600)
    })
    
    li.addEventListener('mouseleave', () => {
        li.querySelector('p').style.display = 'none'
        li.querySelector('p').style.opacity = '0'

        setTimeout(() => {
            li.querySelector('p').style.opacity = '0'
        }, 600)
    })

    li.addEventListener('click', () => {
        Abrir_Pagina(formatarString(li.querySelector('p').innerText))
    })
})

