let lista_seguindo
const container_itens_biblioteca = document.getElementById('container_itens_biblioteca')
//! Organizar por ordem dos vistos e não por ordem de seguidos
function Carregar_Biblioteca() {
    container_itens_biblioteca.innerHTML = `<div class="container_item_biblioteca" id="musicas_curtidas_biblioteca" onclick="Abrir_Pagina('musicascurtidas', 'musicascurtidas_${User.ID}')"><div class="container_img_item_biblioteca"><img src="Assets/Imgs/Musicas curtidas.svg"></div><div class="container_texto_item_biblioteca"><span>Playlist</span><p>Músicas Curtidas</p></div></div>

    
    <div class="container_item_biblioteca" id="criar_match_biblioteca" onclick="Abrir_Pagina('criarmatch')"><div class="container_img_item_biblioteca"><img src="Assets/Imgs/cubo_match.svg"></div><div class="container_texto_item_biblioteca"><span>Playlist</span><p>Criar Match</p></div></div>`

    lista_seguindo = []

    for (let c = 0; c < TodosMatchs.length; c++) {
        for (let b = 0; b < TodosMatchs[c].Participantes.length; b++) {
            if(TodosMatchs[c].Participantes[b].ID == User.ID) {
                lista_seguindo.push(TodosMatchs[c])
                break
            }
        }
    }

    lista_seguindo.push(...User.Social.Artistas)
    lista_seguindo.push(...User.Social.Seguindo)
    lista_seguindo = [...organizarPorDataDescendente(lista_seguindo)]

    for (let c = 0; c < lista_seguindo.length; c++) {
        if(lista_seguindo[c].Email != undefined) {

        } else if(lista_seguindo[c].Participantes != undefined) {
            Match_Biblioteca(lista_seguindo[c])            

        } else {
            //? Caso for um artista
            Artistas_Biblioteca(lista_seguindo[c].Autor)
        }
    }
}

function Match_Biblioteca(Match_Carregar) {
    const container_item_biblioteca = document.createElement('div')
    const container_img_match_item_biblioteca = document.createElement('div')
    const container_container_header_match = document.createElement('div')
    const container_esferas = document.createElement('div')
    const p_match = document.createElement('p')
    const traco_match = document.createElement('div')
    const container_texto_item_biblioteca = document.createElement('div')
    const span = document.createElement('span')
    const p = document.createElement('p')

    container_container_header_match.className = 'container_container_header_match'
    container_esferas.className = 'container_esferas'
    traco_match.className = 'traco_match'
    container_item_biblioteca.classList.add('container_item_biblioteca')
    container_item_biblioteca.classList.add('container_item_biblioteca_match')
    container_img_match_item_biblioteca.classList.add('container_img_match_item_biblioteca')
    container_texto_item_biblioteca.classList.add('container_texto_item_biblioteca')

    let cor_adm
    let nomes_participantes = ''
    let array_participantes = []
    for (let c = 0; c < Match_Carregar.Participantes.length; c++) {
        const esfera = document.createElement('div')
        esfera.className = 'esferas'
        esfera.style.background = Match_Carregar.Participantes[c].Cor
        container_esferas.appendChild(esfera)

        if(Match_Carregar.Participantes[c].ID == Match_Carregar.Admin) {
            cor_adm = Match_Carregar.Participantes[c].Cor
        }

        for (let a = 0; a < Todos_Usuarios.length; a++) {
            if(Todos_Usuarios[a].ID == Match_Carregar.Participantes[c].ID) {
                array_participantes.push(Todos_Usuarios[a])

                if(c + 1 >= Match_Carregar.Participantes.length) {
                    nomes_participantes += Todos_Usuarios[a].Nome

                } else {
                    nomes_participantes += `${Todos_Usuarios[a].Nome} + `
                }
                break
            }
        }
    }

    container_img_match_item_biblioteca.style.background = Match_Carregar.Background
    traco_match.style.background = cor_adm
    p.innerText= nomes_participantes

    span.innerText = 'Match'
    p_match.innerHTML = 'Match'

    container_container_header_match.appendChild(container_esferas)
    container_container_header_match.appendChild(p_match)
    container_container_header_match.appendChild(traco_match)
    container_img_match_item_biblioteca.appendChild(container_container_header_match)
    container_texto_item_biblioteca.appendChild(span)
    container_texto_item_biblioteca.appendChild(p)
    container_item_biblioteca.appendChild(container_img_match_item_biblioteca)
    container_item_biblioteca.appendChild(container_texto_item_biblioteca)
    document.getElementById('container_itens_biblioteca').appendChild(container_item_biblioteca)

    container_item_biblioteca.addEventListener('click', () => {
        Abrir_Pagina('match', Match_Carregar.ID)
    })
}

function Artistas_Biblioteca(Autor) {
    let musica_mais_view = Retornar_Musicas_Mais_View_Artista(Autor)[0]

    const container_item_biblioteca = document.createElement('div')
    const container_img_item_biblioteca = document.createElement('div')
    const img = document.createElement('img')
    const container_texto_item_biblioteca = document.createElement('div')
    const span = document.createElement('span')
    const p = document.createElement('p')

    container_item_biblioteca.classList.add('container_item_biblioteca')
    container_item_biblioteca.classList.add('container_item_biblioteca_artista')
    container_img_item_biblioteca.classList.add('container_img_item_biblioteca')
    container_texto_item_biblioteca.classList.add('container_texto_item_biblioteca')

    img.src = musica_mais_view.Img
    span.innerText = 'Artista'
    p.innerText = Autor

    container_img_item_biblioteca.appendChild(img)
    container_texto_item_biblioteca.appendChild(span)
    container_texto_item_biblioteca.appendChild(p)
    container_item_biblioteca.appendChild(container_img_item_biblioteca)
    container_item_biblioteca.appendChild(container_texto_item_biblioteca)
    document.getElementById('container_itens_biblioteca').appendChild(container_item_biblioteca)

    container_item_biblioteca.addEventListener('click', () => {
        Abrir_Perfil_Artista(Autor, musica_mais_view)
    })

    container_item_biblioteca.addEventListener('contextmenu', (event) => {
        Ativar_Opcoes_Click_Direita('Artista', [musica_mais_view], 0, Autor, musica_mais_view.ID)
        posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
    })
}

function Retornar_User_Seguindo(Email) {
    for (let c = 0; c < Todos_Usuarios.length; c++) {
        if(Todos_Usuarios[c].Email == Email) {
            const div_container_perfil_usuario = document.createElement('div')
            const div_container_img = document.createElement('div')
            const img = document.createElement('img')
            const div_container_texto = document.createElement('div')
            const nome_user = document.createElement('p')
            const span = document.createElement('span')

            //! Classes
            div_container_perfil_usuario.classList.add('container_artista_caixa')
            div_container_perfil_usuario.classList.add('div_container_perfil_usuario_historico')
            div_container_img.className = 'div_container_img_historico'
            div_container_texto.className = 'div_container_texto_historico'

            //! Valores
            nome_user.innerText = Todos_Usuarios[c].Nome
            span.innerText = 'Perfil'
            img.src = Todos_Usuarios[c].Perfil.Img_Perfil

            //! AppendChild
            div_container_img.appendChild(img)
            div_container_texto.appendChild(span)
            div_container_texto.appendChild(nome_user)
            div_container_perfil_usuario.appendChild(div_container_img)
            div_container_perfil_usuario.appendChild(div_container_texto)
            
            div_container_perfil_usuario.addEventListener('click', () => {
                Carregar_Perfil(Todos_Usuarios[c])
            })

            div_container_perfil_usuario.addEventListener('contextmenu', (event) => {
                Ativar_Opcoes_Click_Direita('Perfil', TodasMusicas[0], undefined, undefined, undefined, Todos_Usuarios[c].ID)
                posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
            })

            return div_container_perfil_usuario
        }
    }
}