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

const container_config_email = document.getElementById('container_config_email')
const user_email_icon = document.getElementById('user_email_icon')

let pd_fehcar_container_config_email = false
user_email_icon.addEventListener('click', () => {
    if(container_config_email.style.display == 'flex') {
        pd_fehcar_container_config_email = false

    } else {
        pd_fehcar_container_config_email = true
    }
})

document.addEventListener('click', () => {
    if(pd_fehcar_container_config_email) {
        if(Pagina_Atual.Nome == 'meuperfil') {
            document.getElementById('btn_nav_meu_perfil').style.display = 'none'
        } else {
            document.getElementById('btn_nav_meu_perfil').style.display = 'flex'
        }

        container_config_email.style.display = 'flex'
        pd_fehcar_container_config_email = false

    } else {
        container_config_email.style.display = 'none'
    }
})