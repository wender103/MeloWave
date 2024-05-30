function Curtir_Musica_Descurtir(Musica, Elemento=undefined, Comando) {
    if(!Elemento) {
        Elemento = document.createElement('img')
    }

    let Musica_Ja_Curtida = false
    for (let c = 0; c <= User.Musicas_Curtidas.length; c++) {
        try {
            if(Musica.ID == User.Musicas_Curtidas[c].ID) {
                Musica_Ja_Curtida = true
    
                if(Comando == 'Checar') {
                    Elemento.src = 'Assets/Imgs/Like.svg'
                    return true
    
                    // ! Vai descurtir
                } else {
                    Elemento.src = 'Assets/Imgs/Like_Vazio.svg'
                    User.Musicas_Curtidas.splice(c, 1)
                    Checar_Musica_Atual_Is_Curtida()
                    Atualizar_Likes_Musica(Musica, 'Descurtir')
                    Salvar_Musica_Curtida()
                    return false
                }
    
                break
            }
            
        } catch {}
    }

    if(!Musica_Ja_Curtida) {
        
        if(Comando != 'Checar') {
            User.Musicas_Curtidas.push(Musica)
            Elemento.src = 'Assets/Imgs/Like.svg'
            Checar_Musica_Atual_Is_Curtida()
            Atualizar_Likes_Musica(Musica)
            Salvar_Musica_Curtida()
            return true

        } else {
            Elemento.src = 'Assets/Imgs/Like_Vazio.svg'
            return false
        }
    }
}

function Atualizar_Likes_Musica(Musica, Comando) {
    const musicas_linha = document.querySelectorAll('.musica_linha')

    musicas_linha.forEach(musica_linha => {
        if(musica_linha.classList.contains(`Musica_Linha_${Musica.ID}`)) {
            Curtir_Musica_Descurtir(Musica, musica_linha.querySelector('.like_musicas_linha'), 'Checar')
        }  
    })

    if(Pagina_Atual.Nome == 'musicascurtidas' && Comando != 'Não Atualizar') {
        if(Comando == 'Descurtir') {
            Descurtir_Remover_Da_Tela(Musica)
        } else {
            Retornar_Musicas_Curtidas()
        }
    }
}

//! Retoranr Músicas
let Musicas_Curtidas_Array = []
let musicas_curtidas_convertidas = false
function Retornar_Musicas_Curtidas(Array_Musicas = undefined, Comando = undefined) {
    Musicas_Curtidas_Array = [...User.Musicas_Curtidas]

    if(!Array_Musicas) {
        Array_Musicas = [...User.Musicas_Curtidas]
    }

    const Local = document.getElementById('container_musicas_curtidas')
    Local.innerHTML = ''
    Retornar_Musica_Linha(Array_Musicas, Local, null, 'Músicas Curtidas')

    let name_msuicas = 'músicas'
    if(Array_Musicas.length == 1) {
        name_msuicas = 'música'
    }

    if(Comando != 'Não Atualizar') {
        document.getElementById('p_infos_musicas_curtidas').innerText = `${User.Nome}`
        document.getElementById('p_infos_musicas_curtidas').innerHTML += ` - <span id="quantidade_musicas_playlist_musicas_curtidas">${Array_Musicas.length} ${name_msuicas}</span>`
    }

    Musicas_Curtidas_Array = [...Array_Musicas]
}

function Descurtir_Remover_Da_Tela(Musica) {
    for (let c = 0; c < Musicas_Curtidas_Array.length; c++) {
        if(Musicas_Curtidas_Array[c].ID == Musica.ID) {
            Musicas_Curtidas_Array.splice(c, 1)
        }
    }

    const Local = document.getElementById('container_musicas_curtidas')
    Local.querySelectorAll('.musica_linha').forEach(m_linha => {
        if(m_linha.classList.contains(`Musica_Linha_${Musica.ID}`)) {
            m_linha.remove()
        }  
    })

    Atualizar_Likes_Musica(Musica, 'Não Atualizar')
}

const icons_like_barra_musica = document.querySelectorAll('.icons_like_barra_musica')
let like_add = false
function Checar_Musica_Atual_Is_Curtida() {
    icons_like_barra_musica.forEach(btn => {
        Curtir_Musica_Descurtir(Listas_Prox.MusicaAtual, btn, 'Checar')

        if(!like_add) {
            btn.addEventListener('click', () => {
                Curtir_Musica_Descurtir(Listas_Prox.MusicaAtual, btn)
            })
        }
    })

    if(!like_add) {
        like_add = true
    }
}

function Salvar_Musica_Curtida(Comando) {
    let IDs_Musicas_Curtidas = []

    User.Musicas_Curtidas.forEach(IDs => {
        IDs_Musicas_Curtidas.push(IDs.ID)
    })

    if(Comando != 'Não Salvar') {
        if(User.Estado_Da_Conta != 'Anônima') {
            db.collection('Users').doc(User.ID).update({ Musicas_Curtidas: IDs_Musicas_Curtidas })

        } else {
            Salvar_Perfil_Anonimo_User()
        }
    }
}

//! Pesquisar Músicas Curtidas -------------------------
function Pesquisar_Musicas_Curtidas(Pesquisa) {
    let pesquisa_formadata = formatarString(Pesquisa)

    let array_musicas_encontradas = []

    if(pesquisa_formadata.trim() != '') {
        let M_Curtidas = User.Musicas_Curtidas
        for (let c = 0; c < M_Curtidas.length; c++) {
            let nome = formatarString(M_Curtidas[c].Nome)
            let autor = formatarString(M_Curtidas[c].Autor)
            let genero = formatarString(M_Curtidas[c].Genero)

            if(pesquisa_formadata.includes(nome) || pesquisa_formadata.includes(autor) || pesquisa_formadata.includes(genero) || nome.includes(pesquisa_formadata) || autor.includes(pesquisa_formadata) || genero.includes(pesquisa_formadata)) {
                array_musicas_encontradas.push(M_Curtidas[c])
            }
        }

        Retornar_Musicas_Curtidas(array_musicas_encontradas, 'Não Atualizar')
    } else {
        Retornar_Musicas_Curtidas()
    }
}

//! Tocar Músicas Curtidas
let musica_curtida_random = false
let musica_curtidas_id_page = undefined
const icon_random_musicascurtidas = document.getElementById('icon_random_musicascurtidas')
icon_random_musicascurtidas.addEventListener('click', () => {
    let new_arrey = [...Musicas_Curtidas_Array]

    if(icon_random_musicascurtidas.style.cursor == 'pointer') { 
        if(musica_curtida_random) {
            musica_curtida_random = false
            icon_random_musicascurtidas.style.cursor = 'pointer'
            var paths = icon_random_musicascurtidas.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = '#fff'
                path.style.cursor = 'pointer'
            })

            Random(new_arrey.reverse(), false)


        } else {
            musica_curtida_random = true

            icon_random_musicascurtidas.style.cursor = 'pointer'
            var paths = icon_random_musicascurtidas.querySelectorAll('path')
            paths.forEach(function(path) {
                path.style.fill = 'rgb(0, 255, 213)'
                path.style.cursor = 'pointer'
            })

            Random(new_arrey.reverse(), true, 'musicascurtidas')
        }
    }
})

const img_play_musicas_curtidas = document.getElementById('img_play_musicas_curtidas')
img_play_musicas_curtidas.addEventListener('click', () => {
    let new_arrey = [...Musicas_Curtidas_Array]
    Tocar_Musica(new_arrey.reverse(), Musicas_Curtidas_Array[Musicas_Curtidas_Array.length - 1])
})