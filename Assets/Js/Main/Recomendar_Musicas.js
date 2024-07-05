//! Salvar Informações de Recomendação
const maximo_infos_salvas = {
    Musicas: 100,
    Artistas: 15,
    Playlists: 15,
    Gosto_Musical_Artistas: 100,
    Gosto_Musical_Genero: 100
}
function Salvar_Historico() {

    let new_Historico = {
        Musicas: [...User.Historico.Musicas],
        Playlists: [...User.Historico.Playlists],
        Users: [...User.Historico.Users],
        Artistas: [...User.Historico.Artistas],
        Pesquisa: [...User.Historico.Pesquisa],
    }

    let Musicas = []

    for (let c = 0; c < new_Historico.Musicas.length; c++) {
        Musicas.push(new_Historico.Musicas[c].ID)
    }

    let Diferenca_Musicas = Musicas.length - maximo_infos_salvas.Musicas

    if (Diferenca_Musicas > 0) {
        Musicas.splice(0, Diferenca_Musicas)
    }

    let Diferenca_Playlists = new_Historico.Playlists.length - maximo_infos_salvas.Playlists

    if (Diferenca_Playlists > 0) {
        new_Historico.Playlists.splice(0, Diferenca_Playlists)
    }

    let Diferenca_Users = new_Historico.Users.length - maximo_infos_salvas

    if (Diferenca_Users > 0) {
        new_Historico.Users.splice(0, Diferenca_Users)
    }

    let Diferenca_Artistas = new_Historico.Artistas.length - maximo_infos_salvas.Artistas

    if (Diferenca_Artistas > 0) {
        new_Historico.Artistas.splice(0, Diferenca_Artistas)
    }

    let Diferenca_Pesquisa = new_Historico.Pesquisa.length - maximo_infos_salvas

    if (Diferenca_Pesquisa > 0) {
        new_Historico.Pesquisa.splice(0, Diferenca_Pesquisa)
    }

    new_Historico.Musicas = Musicas

    // Remove undefined values from the new_Historico object
    Object.keys(new_Historico).forEach(key => {
        new_Historico[key] = new_Historico[key].filter(item => item !== undefined)
    })
    
    if (User.Estado_Da_Conta != 'Anônima') {
        db.collection('Users').doc(User.ID).update({ Historico: new_Historico })
    } else {
        Salvar_Perfil_Anonimo_User()
    }
}

function Salvar_GostoMusical() {

    if (User.Gosto_Musical.Artistas.length > maximo_infos_salvas) {
        User.Gosto_Musical.Artistas.splice(0, User.Gosto_Musical.Artistas.length - maximo_infos_salvas.Gosto_Musical_Artistas)
    }

    if (User.Gosto_Musical.Generos.length > maximo_infos_salvas) {
        User.Gosto_Musical.Generos.splice(0, User.Gosto_Musical.Generos.length - maximo_infos_salvas.Gosto_Musical_Genero)
    }

    if(User.Estado_Da_Conta != 'Anônima') {
        db.collection('Users').doc(User.ID).update({ Gosto_Musical: User.Gosto_Musical })

    } else {
        Salvar_Perfil_Anonimo_User()
    }
}

//! Recomendar Músicas Para o User
let Todos_Os_Artistas_Historico = [] // Artistas na ordem dos mais ouvidos pelo user
let Todos_Os_Generos_Historico = [] // Gêneros na ordem dos mais ouvidos pelo user
let qts_vezes_chamadaS_feito_pra_voce = 0
let Historico_Musicas = []
let max_feito_pra_voce = 10
let Musicas_Recomendadas = new Set()

function Retornar_Feito_Para_Voce() {
    if (qts_vezes_chamadaS_feito_pra_voce < max_feito_pra_voce) {
        Historico_Musicas = User.Historico.Musicas

        let array_generos_historico = []
        for (let c = 0; c < Historico_Musicas.length; c++) {
            array_generos_historico.push(...Separar_Por_Virgula(Historico_Musicas[c].Genero))
        }

        array_generos_historico = ordenarNomesPorFrequencia(array_generos_historico)
        Todos_Os_Generos_Historico = array_generos_historico

        if (qts_vezes_chamadaS_feito_pra_voce < array_generos_historico.length) {
            let genero_principal = array_generos_historico[qts_vezes_chamadaS_feito_pra_voce]
            let outros_generos = array_generos_historico.filter((_, index) => index !== qts_vezes_chamadaS_feito_pra_voce).slice(0, 34)

            let array_recomendacoes = []
            let Array_Todas_Musicas_Embaralhado = shuffleArray([...TodasMusicas])

            for (let musica of Array_Todas_Musicas_Embaralhado) {
                let generos_musica = Separar_Por_Virgula(musica.Genero)
                
                if (generos_musica.includes(genero_principal)) {
                    let generos_comuns = generos_musica.filter(genero => outros_generos.includes(genero))

                    if (generos_comuns.length > 0 && !Musicas_Recomendadas.has(musica)) {
                        array_recomendacoes.push(musica)
                        Musicas_Recomendadas.add(musica) // Adiciona a música ao conjunto de músicas recomendadas
                        if (array_recomendacoes.length >= max_feito_pra_voce) break
                    }
                }
            }

            if (array_recomendacoes.length > 3) {
                let array_autores = []
                for (let recomendacao of array_recomendacoes) {
                    array_autores.push(...Separar_Por_Virgula(recomendacao.Autor))
                }

                array_autores = ordenarNomesPorFrequencia(array_autores)

                qts_vezes_chamadaS_feito_pra_voce++ // Incrementar somente se encontramos recomendações

                const resultado = {
                    Musicas: array_recomendacoes,
                    Autores_Presentes: array_autores,
                }

                return resultado
            } else {
                qts_vezes_chamadaS_feito_pra_voce++ // Incrementar mesmo se não encontramos recomendações
                return null
            }
        } else {
            return null // Sem mais gêneros para processar
        }
    } else {
        return null // Limite de chamadas atingido
    }
}

//! Mostrar na tela
const container_musicas_home = document.getElementById('container_musicas_home')
let nome_do_mix = ''
let Arraay_PlaylistMix = []
let nome_daily = ''
let contador_feito_pra_voce = 0
function Retornar_Daily() {
    if(contador_feito_pra_voce == 0) {
        Historico_Musicas = User.Historico.Musicas
    }

    contador_feito_pra_voce++

    const container_mixes_daily = document.createElement('section')
    container_mixes_daily.classList.add('container_mixes_daily')

    const h1 = document.createElement('h1')
    h1.innerText = `Feito para ${User.Nome}`
    container_mixes_daily.appendChild(h1)

    const container_playlits_daily = document.createElement('article')
    container_playlits_daily.classList.add('container_playlits_daily')

    for (let c = 0; c < Math.ceil(Historico_Musicas.length / max_feito_pra_voce); c++) {
        
        if(qts_vezes_chamadaS_feito_pra_voce <= Math.ceil(Historico_Musicas.length / max_feito_pra_voce)) {
            const resultado = Retornar_Feito_Para_Voce()

            let array_daily = []

            if(resultado) {
                array_daily = [...resultado.Musicas]
            }

            if(array_daily != null && array_daily.length > 0) {
    
                const daily_caixa = document.createElement('div')
                const container_img_musica = document.createElement('div')
                const img = document.createElement('img')
                const contaier_svg_daily = document.createElement('div')
                const p_daily = document.createElement('p')
                const texto_musica = document.createElement('div')
                const p = document.createElement('p')
                const span = document.createElement('span')
    
                //! Classes
                daily_caixa.classList.add('daily_caixa')
                container_img_musica.classList.add('container_img_musica')
                contaier_svg_daily.className = 'contaier_svg_daily'
                texto_musica.classList.add('texto_musica')
                p.className = 'Nome_musicas_caixa'
                img.className = 'Img_daily_caixa'    

                //! Valores
                img.src = array_daily[array_daily.length -1].Img
                p.innerText = `Seu Mix ${Todos_Os_Generos_Historico[qts_vezes_chamadaS_feito_pra_voce - 1]}`
                p_daily.innerText = `Mix ${Todos_Os_Generos_Historico[qts_vezes_chamadaS_feito_pra_voce - 1]}`

                const p_container_span = document.createElement('p')
                for (let h = 0; h < resultado.Autores_Presentes.length; h++) {
                    const span_com_nome = document.createElement('span')
                    span_com_nome.className = 'nome_autores_daily'

                    if(h >= resultado.Autores_Presentes.length - 1) {
                        span_com_nome.innerText = `${resultado.Autores_Presentes[h]}`
                        p_container_span.appendChild(span_com_nome)
                    } else {
                        span_com_nome.innerText = `${resultado.Autores_Presentes[h]}`
                        p_container_span.appendChild(span_com_nome)
                        p_container_span.innerHTML += ', '
                    }

                    if(h + 1 >= resultado.Autores_Presentes.length) {
                        
                    }
                }

                let spans = p_container_span.querySelectorAll('span')
                spans.forEach(element => {
                    element.addEventListener('click', () => {
                        let autor_encontrado = false
                        for (let c = 0; c < TodasMusicas.length; c++) {
                            const autor_formatado = Separar_Por_Virgula(formatarString(TodasMusicas[c].Autor))
                            const Autor2_formatado = formatarString(element.innerText)

                            if(!autor_encontrado) {
                                for (let b = 0; b < autor_formatado.length; b++) {
                                    if(Autor2_formatado == autor_formatado[b]) {
                                        Abrir_Perfil_Artista(element.innerText, TodasMusicas[c])
                                        autor_encontrado = true
                                        break
                                    }
                                }
                            } else {
                                break
                            }
                        }
                    })  
                })                

                span.appendChild(p_container_span)
                span.className = 'nome_autores_daily'
                p_container_span.className = 'nome_autores_daily'

                contaier_svg_daily.style.backgroundImage = `linear-gradient(to top, ${gerarCorAleatoria(false)}, transparent)`
                let Cor_svg = gerarCorAleatoria()

                if(qts_vezes_chamadaS_feito_pra_voce % 2 != 0) {
                    // Criar o elemento SVG com a cor aleatória correspondente
                    contaier_svg_daily.innerHTML = `
                    <svg width="144" height="59" viewBox="0 0 144 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 15C0 15 13.4746 19.6021 28 21C52.3421 23.3426 65.2079 4.31478 89.5 1.5C104.323 -0.217548 113.667 -0.0966148 127.5 5.5C134.393 8.2887 144 15 144 15V64H0V15Z" fill="${Cor_svg}"/>
                    </svg>
                `
                } else {
                    // Criar o elemento SVG com a cor aleatória correspondente
                    contaier_svg_daily.innerHTML = `
                    <svg width="144" height="59" viewBox="0 0 144 59" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: scaleX(-1);">
                        <path d="M0 15C0 15 13.4746 19.6021 28 21C52.3421 23.3426 65.2079 4.31478 89.5 1.5C104.323 -0.217548 113.667 -0.0966148 127.5 5.5C134.393 8.2887 144 15 144 15V64H0V15Z" fill="${Cor_svg}"/>
                    </svg>
                `
                }
    
                //! AppendChild
                container_img_musica.appendChild(img)
                contaier_svg_daily.appendChild(p_daily)
                container_img_musica.appendChild(contaier_svg_daily)
                texto_musica.appendChild(p)
                texto_musica.appendChild(span)
                daily_caixa.appendChild(container_img_musica)
                daily_caixa.appendChild(texto_musica)
                container_playlits_daily.appendChild(daily_caixa)

                //! Funções
                daily_caixa.addEventListener('click', (e) => {
                    let el = e.target.className
                    
                    if(el != 'nome_autores_daily') {
                        nome_do_mix = formatarString(p_daily.innerText)
                        Abrir_PLaylistMix(array_daily, p_daily.innerText, contaier_svg_daily.innerHTML, )
                        nome_daily = p_daily.innerText
                        Arraay_PlaylistMix = [...array_daily]
                    }
                })
            } else {
                break
            }

        
        } else {
            break
        }
    }

    if(container_playlits_daily.innerHTML != '') {
        container_mixes_daily.appendChild(container_playlits_daily)
        document.getElementById('container_musicas_home').appendChild(container_mixes_daily)
    }
}

const img_play_playlistmix = document.getElementById('img_play_playlistmix')
img_play_playlistmix.addEventListener('click', () => {
    Tocar_Musica(Arraay_PlaylistMix, Arraay_PlaylistMix[0])
})

//! Tocadas Recentemente
let Artistas_Tocados_Recentemente_ja_carregados = false
function Artistas_Tocados_Recentemente() {
    let artistas = User.Historico.Artistas

    const section = document.createElement('section')
    const h1 = document.createElement('h1')
    let article = document.createElement('article')

    if(Artistas_Tocados_Recentemente_ja_carregados) {
        article = document.getElementById('container_artistas_playlist_tocadas_recentemente')
        article.innerHTML = ''
    } else {
        section.id = 'container_tocados_recentemente'
        article.id = 'container_artistas_playlist_tocadas_recentemente'
    }

    for (let c = artistas.length - 1; c >=0 ; c--) {
        if(typeof artistas[c] == 'string') {
            if(!validarEmail(artistas[c])) {
                article.appendChild(Retornar_Artistas_Caixa(artistas[c]))
            } else {
                article.appendChild(Retornar_User_Historico(artistas[c]))
            }
        }

    }

    if(article.innerHTML != '' && !Artistas_Tocados_Recentemente_ja_carregados) {
        h1.innerText = 'Tocados Recentemente'
        section.appendChild(h1)
        section.appendChild(article)
        document.getElementById('Pagina_home').appendChild(section)
        Artistas_Tocados_Recentemente_ja_carregados = true
    }

}

function Retornar_Artistas_Caixa(Artista) {
    let musicas_artista = Retornar_Musicas_Mais_View_Artista(Artista, true)

    const container_artista_caixa = document.createElement('div')
    const container_img = document.createElement('div')
    const img = document.createElement('img')
    const container_texto = document.createElement('div')
    const span = document.createElement('span')
    const p = document.createElement('p')

    container_artista_caixa.classList.add('container_artista_caixa')
    container_img.className = 'container_img_artista_caixa'
    container_texto.className = 'container_texto_artista_caixa'

    span.innerText = 'Artista'
    p.innerText = Artista
    try {
        img.src = musicas_artista[0].Img
        
    } catch{}
        

    container_img.appendChild(img)
    container_texto.appendChild(span)
    container_texto.appendChild(p)
    container_artista_caixa.appendChild(container_img)
    container_artista_caixa.appendChild(container_texto)

    container_artista_caixa.addEventListener('click', () => {
        Abrir_Perfil_Artista(Artista, musicas_artista[0])
    })

    container_artista_caixa.addEventListener('contextmenu', (event) => {
        Ativar_Opcoes_Click_Direita('Artista', musicas_artista[0], 0, p.innerText, musicas_artista[0].ID)
        posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
    })

    return container_artista_caixa
}

function Retornar_User_Historico(Email) {
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

let artistas_favoritos_retornados = false
function Retornar_Artistas_Mais_Vistos() {
    const section = document.createElement('section')
    const h1 = document.createElement('h1')
    let article = document.createElement('article')
    const artistas = ordenarNomesPorFrequencia(User.Gosto_Musical.Artistas)

    section.id = 'container_artistas_favoritos'
    article.id = 'container_artistas_favoritos_article'

    if(artistas_favoritos_retornados) {
        article = document.getElementById('container_artistas_favoritos_article')
        article.innerHTML = ''
    }

    for (let c = 0; c < artistas.length; c++) {
        article.appendChild(Retornar_Artistas_Caixa(artistas[c]))
    }

    if(article.innerHTML != '' && !artistas_favoritos_retornados) {
        h1.innerText = 'Seus artistas favoritos'
        section.appendChild(h1)
        section.appendChild(article)
        document.getElementById('Pagina_home').appendChild(section)
        artistas_favoritos_retornados = true
    }

}