let Paginas_Nao_Trocar_Background = ['meuperfil', 'artista', 'adicionarletra', 'verletra']

let Pagina_Atual = {
    Nome: 'home',
    ID: undefined,
    Musicas: []
}

function Abrir_Pagina(Pagina, ID) {
    Pagina_Atual.Nome = Pagina,
    Pagina_Atual.ID = ID

    let pagina_igual = false
    for (let c = 0; c < Paginas_Nao_Trocar_Background.length; c++) {
        if(Paginas_Nao_Trocar_Background[c] == Pagina_Atual.Nome) {
            pagina_igual = true
            break
        }
    }

    pd_atualizar_letra_pc = false
    animateBackgroundColor('transparent', lista_elementos_mudar_cor_letra, 1500)
    animateBackgroundColor('#2e31333f', document.querySelector('nav').querySelectorAll('ul'), 1500)

    if(Listas_Prox.MusicaAtual.Img && !pagina_igual) {
        Trocar_Background(Listas_Prox.MusicaAtual.Img, document.body)
    }
    
    document.getElementById('bnt_editar_meu_perfil').style.display = 'none'

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

    let desativar_blur = false
    if(Pagina == 'pesquisar') {
        document.getElementById('input_pesquisa').style.display = 'flex'
    } else {
        document.getElementById('input_pesquisa').style.display = 'none'

        if(Pagina == 'home') {
            Mostrar_Max_Musicas()
        } else if(Pagina == 'musicascurtidas') {
            desativar_blur = true
            Retornar_Musicas_Curtidas()

        } else if(Pagina == 'notificacao') {
            document.getElementById('bolinha_icone_noficacao').style.display = 'none'

        } else if(Pagina == 'meuperfil') {
            desativar_blur = true
            Carregar_Meu_Perfil()
        } else if(Pagina == 'artista') {
            desativar_blur = true
        } else if(Pagina == 'adicionarletra') {
            if(!Array.isArray(musica_editando_meu_perfil.Letra)) {
                text_area_add_letra.value = musica_editando_meu_perfil.Letra.Lerta_Musica
            } else {
                text_area_add_letra.value = ''
            }

        } else {
            Fechar_Add_Letra('Não Voltar a Página')
        }
    }

    if(desativar_blur) {
        decreaseBlur()
    } else {
        increaseBlur()
    }
}