let Pagina_Atual = {
    Nome: 'home',
    ID: undefined,
    Musicas: []
}

function Abrir_Pagina(Pagina, ID) {
    Pagina_Atual.Nome = Pagina,
    Pagina_Atual.ID = ID
    console.log(Pagina_Atual)
    if(Listas_Prox.MusicaAtual.Img) {
        Trocar_Background(Listas_Prox.MusicaAtual.Img, document.body)
    }

    atualizarURL(Pagina)

    const Paginas = document.querySelectorAll('.Paginas')

    Paginas.forEach(Pagina_especifica => {
        if(Pagina_especifica.style.opacity = 1 && Pagina_especifica.id != `Pagina_${Pagina}`) {
            Pagina_especifica.style.opacity = 0

            setTimeout(() => {
                Pagina_especifica.classList.remove('Pagina_Aberta')
                document.getElementById(`Pagina_${Pagina}`).classList.add('Pagina_Aberta')

                setTimeout(() => {
                    document.getElementById(`Pagina_${Pagina}`).style.opacity = 1
                }, 200) 
            }, 500)
        }
    })

    if(Pagina == 'pesquisar') {
        document.getElementById('input_pesquisa').style.display = 'flex'
    } else {
        document.getElementById('input_pesquisa').style.display = 'none'

        if(Pagina == 'home') {
            Mostrar_Max_Musicas()
        } else if(Pagina == 'musicascurtidas') {
            Retornar_Musicas_Curtidas()

        } else if(Pagina == 'notificacao') {
            document.getElementById('bolinha_icone_noficacao').style.display = 'none'
        }
    }
}