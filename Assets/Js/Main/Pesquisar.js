const input_pesquisar = document.getElementById('input_pesquisar')
let melhor_resultado_encontrado = false

input_pesquisar.addEventListener('keypress', (e) => {
    if(e.key == 'Enter') {
        Pesquisar()
    }
})


function Pesquisar() {
    let array_musicas_pesquisa = []
    let array_artistas_pesquisa = []
    let array_perfis_pesquisa = []
    let array_matchs = []
    let array_playlists = []

    Limpar_Pesquisa()
    let pesquisa = input_pesquisar.value
    let pesquisa_encotrada = false


    if(pesquisa.trim() != '') {
        Pesquisar_Home.style.display = 'none'
        const pesquisa_formatada = formatarString(pesquisa)

        for (let c = 0; c < TodasMusicas.length; c++) {
            if(TodasMusicas[c].Estado == 'Ativo') {
                const nome_formatado = formatarString(TodasMusicas[c].Nome)
                const autor_formatado = formatarString(TodasMusicas[c].Autor)
                const genero_formatado = formatarString(TodasMusicas[c].Genero)
    
                //? Pesquisar Por Nome Da Música
                if(pesquisa_formatada.includes(nome_formatado) || nome_formatado.includes(pesquisa_formatada) || pesquisa_formatada.includes(autor_formatado) || autor_formatado.includes(pesquisa_formatada) || pesquisa_formatada.includes(genero_formatado) || genero_formatado.includes(pesquisa_formatada)) {
                    pesquisa_encotrada = true
                    array_musicas_pesquisa.push(TodasMusicas[c])
                } 
                
                //? Autor
                if(pesquisa_formatada.includes(autor_formatado) || autor_formatado.includes(pesquisa_formatada)) {
                    pesquisa_encotrada = true
                    array_artistas_pesquisa.push(TodasMusicas[c])
                }
            }
        }
        
        for (let c = 0; c < Todos_Usuarios.length; c++) {       
            let nome_user_formatado = formatarString(Todos_Usuarios[c].Nome)
            if(pesquisa_formatada.includes(nome_user_formatado) || nome_user_formatado.includes(pesquisa_formatada)) {
                array_perfis_pesquisa.push(Todos_Usuarios[c])
                pesquisa_encotrada = true
            }
        }

        //! Vai adicionar o nome dos participantes do match para ajudar na pesquisa
        let todos_maths2 = TodosMatchs
        for (let a = 0; a < TodosMatchs.length; a++) {
            for (let b = 0; b < TodosMatchs[a].Participantes.length; b++) {
                for (let c = 0; c < Todos_Usuarios.length; c++) { 
                    if(Todos_Usuarios[c].ID == TodosMatchs[a].Participantes[b].ID) {
                        todos_maths2[a].Participantes[b].Nome = Todos_Usuarios[c].Nome
                        break
                    }
                }
            }
        }

        for (let a = 0; a < todos_maths2.length; a++) {
            let encontrado = false


            for (let b = 0; b < todos_maths2[a].Participantes.length; b++) {
                if(!encontrado) {
                    const nomes_participantes_formatado = formatarString(todos_maths2[a].Participantes[b].Nome)
                    if(nomes_participantes_formatado.includes(pesquisa_formatada) || pesquisa_formatada.includes(nomes_participantes_formatado)) {
                        array_matchs.push(todos_maths2[a])
                        pesquisa_encotrada = true
                        encontrado = true
                        break
                    }
                } else {
                    break
                }
            }
        }
        
        //! Playlists
        for (let c = 0; c < TodasPlaylists.length; c++) {
            let nome_playlist_formatado = formatarString(TodasPlaylists[c].Nome)
            let desc_playlist_formatado = formatarString(TodasPlaylists[c].Descricao)

            let Adm

            for (let n = 0; n < Todos_Usuarios.length; n++) {
                if(Todos_Usuarios[n].ID == TodasPlaylists[c].Admin) {
                    Adm = Todos_Usuarios[n]
                    break
                }
            }

            let nome_adm_formatado = formatarString(Adm.Nome)

            let includes_descricao = false
            let includes_nome = false

            if(nome_adm_formatado.includes(pesquisa_formatada) || pesquisa_formatada.includes(nome_adm_formatado)) {
                includes_nome = true
            }

            if(TodasPlaylists[c].Descricao.trim() != '') {
                if(pesquisa_formatada.includes(desc_playlist_formatado) || desc_playlist_formatado.includes(pesquisa_formatada)) {
                    includes_descricao = true
                }
            }

            if(TodasPlaylists[c].Estado == 'Pública') {
                if(pesquisa_formatada.includes(nome_playlist_formatado) || nome_playlist_formatado.includes(pesquisa_formatada) || includes_descricao || includes_nome) {
                    array_playlists.push(TodasPlaylists[c])
                    pesquisa_encotrada = true
                }

            } else {
                if(pesquisa_formatada.includes(nome_playlist_formatado) || nome_playlist_formatado.includes(pesquisa_formatada) || includes_descricao || includes_nome) {
                    if(User.ID == TodasPlaylists[c].Admin) {
                        array_playlists.push(TodasPlaylists[c])
                    } else {
                        let faz_parte_dos_colaboradores = false
                        for (let b = 0; b < TodasPlaylists[c].Colaboradores.length; b++) {
                            if(TodasPlaylists[c].Colaboradores[b] == User.ID) {
                                faz_parte_dos_colaboradores = true
                                break
                            } 
                        }

                        if(faz_parte_dos_colaboradores) {
                            array_playlists.push(TodasPlaylists[c])
                            pesquisa_encotrada = true
                        }
                    }
                }
            }
        }

        if(pesquisa_encotrada) {
            document.getElementById('Pagina_pesquisar').classList.remove('Pesquisa_Nao_Encontrada')
            document.getElementById('pesquisa_nao_encontrada').style.display = 'none'

        } else {
            document.getElementById('Pagina_pesquisar').classList.add('Pesquisa_Nao_Encontrada')
            document.getElementById('span_pesquisa_nao_encontrada').innerText = pesquisa
            document.getElementById('pesquisa_nao_encontrada').style.display = 'flex'
        }

        if(array_musicas_pesquisa.length > 0) {
            Retornar_Musicas(array_musicas_pesquisa, document.getElementById('container_pesquisa'))
            document.getElementById('h1_pesquisa').innerHTML = `<span>Resultados para:</span> ${pesquisa}`
        }

        if(array_playlists.length > 0) {
            Retornar_Playlists(array_playlists, document.getElementById('container_playlists'))
        }

        if(array_artistas_pesquisa.length > 0) {
            Retornar_Artistas(pesquisa, document.getElementById('container_artistas'), 2)

            if(!melhor_resultado_encontrado) {
                melhor_resultado_encontrado = true

                Retornar_Melhor_Resultado(array_artistas_pesquisa[0], 'Artista')
            }
        }

        if(array_perfis_pesquisa.length > 0) {
            Retornar_Perfis(array_perfis_pesquisa, document.getElementById('container_perfis'))
        }

        if(array_matchs.length > 0) {
            Retornar_Match(array_matchs, document.getElementById('container_matchs'))
        }
        
        setTimeout(() => {
            melhor_resultado_encontrado = false
        }, 1000)
    } else {
        Pesquisar_Home.style.display = 'flex'
    }
}

function Limpar_Pesquisa() {
    const Container_Musicas_Caixa = document.querySelectorAll('.Container_Musicas_Caixa')
    
    Container_Musicas_Caixa.forEach(element => {
        element.querySelector('article').innerHTML = ''
        element.style.display = 'none'
    })

    const Container_Autor_Caixa = document.querySelectorAll('.Container_Autor_Caixa')
    
    Container_Autor_Caixa.forEach(element => {
        element.querySelector('article').innerHTML = ''
        element.style.display = 'none'
    })

    document.getElementById('container_melhor_resultado').style.display = 'none'

    document.getElementById('container_matchs').style.display = 'none'
    document.getElementById('container_playlists').style.display = 'none'

    Mostrar_Max_Musicas()
}

function Retornar_Musicas(Musicas_Recebidas, Local) {
    const article = Local.querySelector('article')
    article.innerHTML = ''

    let Musicas = Musicas_Recebidas.reverse()

    for (let c = 0; c < Musicas.length; c++) {
        if(Musicas[c].Estado == 'Ativo') {
            const musica_caixa = document.createElement('div')
            const container_img_musica = document.createElement('div')
            const img = document.createElement('img')
            const texto_musica = document.createElement('div')
            const p = document.createElement('p')
            const span = document.createElement('span')
    
            //! Classes
            musica_caixa.classList.add('musica_caixa')
            container_img_musica.classList.add('container_img_musica')
            texto_musica.classList.add('texto_musica')
            p.className = 'Nome_musicas_caixa'
            img.className = 'Img_musica_caixa'
    
            //! Valores
            img.src = Musicas[c].Img
            p.innerText = Musicas[c].Nome
            span.appendChild(Retornar_Artistas_Da_Musica(Musicas[c]))
    
            //! AppendChild
            container_img_musica.appendChild(img)
            texto_musica.appendChild(p)
            texto_musica.appendChild(span)
            musica_caixa.appendChild(container_img_musica)
            musica_caixa.appendChild(texto_musica)
            article.appendChild(musica_caixa)
    
            musica_caixa.addEventListener('click', (e) => {
                let Musicas_Recebidas = [...Musicas]
                let el = e.target.className
    
                if(el == 'musica_caixa' || el == 'Nome_musicas_caixa' || el == 'Img_musica_caixa') {
                    Tocar_Musica(Musicas_Recebidas, Musicas_Recebidas[c])
                }
            })
            musica_caixa.addEventListener('contextmenu', (event) => {
                Ativar_Opcoes_Click_Direita('Músicas Caixa', Musicas_Recebidas[c], c)
                posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
            })
        }

    }

    if(article.innerHTML != '') {
        Local.appendChild(article)
        Local.style.display = 'block'
    }

    Mostrar_Max_Musicas()
}

function Retornar_Artistas(Artista, Local, min) {
    let Artista_formatado = formatarString(Artista)
    const article = Local.querySelector('article')
    article.innerHTML = ''

    let TodosArtistas = Nome_Artistas()

    let artistas_complo = []
    let msm_artista = false
    for (let c = 0; c < TodasMusicas.length; c++) {
        let autor_formatado = formatarString(TodasMusicas[c].Autor)
        if(autor_formatado.includes(Artista_formatado) || Artista_formatado.includes(autor_formatado)) {
            let resultado = Separar_Por_Virgula(TodasMusicas[c].Autor)

            resultado.forEach(element => {
                let element_formatado = formatarString(element)
                let ja_tem_este_artista = false
                
                if(!msm_artista || element_formatado != Artista_formatado) {
                    for (let b = 0; b < artistas_complo.length; b++) {
                        if(artistas_complo[b] == element_formatado && !ja_tem_este_artista) {
                            ja_tem_este_artista = true
                        }
                    }
                    
                    if(!ja_tem_este_artista) {

                        if(element_formatado == Artista_formatado) {
                            msm_artista = true
                        }
                        artistas_complo.push(element_formatado)
                    }
                }
                    
            })
        }   
    }

    if(artistas_complo.length >= min) {
        for (let b = 0; b < artistas_complo.length; b++) {
            let autor_encontrado = false
            
            for (let c = 0; c < TodasMusicas.length; c++) {
                let autor_formatado = formatarString(TodasMusicas[c].Autor)
                
                if(autor_formatado.includes(artistas_complo[b]) && !autor_encontrado || artistas_complo[b].includes(autor_formatado) && !autor_encontrado) {
                    autor_encontrado = true
                    const artista_caixa = document.createElement('div')
                    const container_img_musica = document.createElement('div')
                    const img = document.createElement('img')
                    const texto_musica = document.createElement('div')
                    const p = document.createElement('p')
                    const span = document.createElement('span')
                
                    //! Classes
                    artista_caixa.classList.add('artista_caixa')
                    container_img_musica.classList.add('container_img_musica')
                    texto_musica.classList.add('texto_musica')
                
                    //! Valores
                    img.src = TodasMusicas[c].Img

                    let musica_atual = TodasMusicas[c]
                    let number = c
    
                    for (let d = 0; d < TodosArtistas.length; d++) {
                        let formatado_artista = formatarString(TodosArtistas[d])
    
                        if(formatado_artista.includes(artistas_complo[b]) || artistas_complo[b].includes(formatado_artista)) {
                            let nome_autor = encontrarArtistas(Separar_Por_Virgula(TodasMusicas[c].Autor), TodosArtistas[d])
                            p.innerText = nome_autor.nomeMaisProximo
                            break
                        }   
                    }
    
                    span.innerText = 'Artista'
                
                    //! AppendChild
                    container_img_musica.appendChild(img)
                    texto_musica.appendChild(span)
                    texto_musica.appendChild(p)
                    artista_caixa.appendChild(container_img_musica)
                    artista_caixa.appendChild(texto_musica)
                    article.appendChild(artista_caixa)

                    artista_caixa.addEventListener('click', () => {
                        Abrir_Perfil_Artista(p.innerText, musica_atual)
                    })

                    artista_caixa.addEventListener('contextmenu', (event) => {
                        Ativar_Opcoes_Click_Direita('Artista', musica_atual, number, p.innerText, musica_atual.ID)
                        posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
                    })
                    break
                }
            }
        }
    
    
        if(article.innerHTML != '') {
            Local.appendChild(article)
            Local.style.display = 'block'
        }
    }

    Mostrar_Max_Musicas()
} 

function Retornar_Melhor_Resultado(Musica, Tipo) {
    let contador = 0
    const max = 4
    document.getElementById('container_melhor_resultado').style.display = 'flex'
    document.getElementById('musicas_linha_melhor_resultado').innerHTML = ''

    const resultado = encontrarArtistas(Separar_Por_Virgula(Musica.Autor), input_pesquisar.value)
    document.getElementById('img_melhor_resultado').src = Musica.Img
    document.getElementById('nome_melhor_resultado').innerText = resultado.nomeMaisProximo
    document.getElementById('tipo_melhor_resultado').innerText = Tipo

    let Musicas = TodasMusicas.reverse()

    for (let c = 0; c < Musicas.length; c++) {
        if(Musicas[c].Estado == 'Ativo') {
            let Autor = formatarString(Musicas[c].Autor)
            let pesquisa = formatarString(resultado.nomeMaisProximo)
            
            if(Autor.includes(pesquisa) && contador < max || pesquisa.includes(Autor) && contador < max) {
                contador++
                const musica_linha = document.createElement('div')
                const primeira_parte_musica_linha = document.createElement('div')
                const img = document.createElement('img')
                const texto_musica_linha = document.createElement('div')
                const p = document.createElement('p')
                const span = document.createElement('span')
                const segunda_parte_musica_linha = document.createElement('div')
                const like = document.createElement('img')
                const tempo = document.createElement('p')
    
                //! Classes
                musica_linha.classList.add('musica_linha')
                musica_linha.classList.add('Musica_Linha_' + Musicas[c].ID)
                primeira_parte_musica_linha.className = 'primeira_parte_musica_linha'
                texto_musica_linha.className = 'texto_musica_linha'
                segunda_parte_musica_linha.className = 'segunda_parte_musica_linha'
                like.className = 'like_musicas_linha'
    
                //! Valores
                img.src = Musicas[c].Img
                p.innerText = Musicas[c].Nome
                span.appendChild(Retornar_Artistas_Da_Musica(Musicas[c]))
    
                Curtir_Musica_Descurtir(Musicas[c], like, 'Checar')
    
                const audio = new Audio(Musicas[c].Audio)
    
                audio.addEventListener('loadedmetadata', function() {
                    const durationInSeconds = audio.duration;
                    const minutes = Math.floor(durationInSeconds / 60)
                    const seconds = Math.floor(durationInSeconds % 60)
                    const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`
                    tempo.innerText = formattedDuration
                })
    
    
                //! AppendChild
                primeira_parte_musica_linha.appendChild(img)
                texto_musica_linha.appendChild(p)
                texto_musica_linha.appendChild(span)
                primeira_parte_musica_linha.appendChild(texto_musica_linha)
                segunda_parte_musica_linha.appendChild(like)
                segunda_parte_musica_linha.appendChild(tempo)
                musica_linha.appendChild(primeira_parte_musica_linha)
                musica_linha.appendChild(segunda_parte_musica_linha)
                document.getElementById('musicas_linha_melhor_resultado').appendChild(musica_linha)
    
                //! Funções de click
                like.addEventListener('click', () => {
                    let Musicas_Recebidas = [...Musicas]
                        Curtir_Musica_Descurtir(Musicas_Recebidas[c], like)
                })
    
                musica_linha.addEventListener('click', (e) => {
                    let Musicas_Recebidas = [...Musicas]
                    let el = e.target.classList
                    if(el.contains('musica_linha')) {
                        Tocar_Musica(Musicas_Recebidas, Musicas_Recebidas[c])
                    }
                })
            }    
        }
    }

    document.getElementById('article_melhor_resultado').addEventListener('click', () => {
        Abrir_Perfil_Artista(resultado.nomeMaisProximo, Musica)

    })

    Mostrar_Max_Musicas()
}

function Retornar_Todas_Secoes() {
    let Todos_Os_Generos = []

    for (let c = 0; c < TodasMusicas.length; c++) {
        Todos_Os_Generos.push(...Separar_Por_Virgula(TodasMusicas[c].Genero))
    }

    Todos_Os_Generos = ordenarNomesPorFrequencia(Todos_Os_Generos)
    Todos_Os_Generos.sort()

    
    for (let c = 0; c < Todos_Os_Generos.length; c++) {
        let musica_encontrada = false
        for (let b = 0; b < TodasMusicas.length; b++) {
            if(!musica_encontrada && TodasMusicas[b].Estado == 'Ativo') {
                if(TodasMusicas[b].Genero.includes(Todos_Os_Generos[c]) || Todos_Os_Generos[c].includes(TodasMusicas[b].Genero)) {
                    musica_encontrada = true
    
                    const container_genero_secao = document.createElement('div')
                    const h1_genero = document.createElement('h1')
                    const img = document.createElement('img')
    
                    container_genero_secao.className = 'container_genero_secao'
                    container_genero_secao.style.background = gerarCorAleatoria(true, 0.7)
    
                    h1_genero.innerText = Todos_Os_Generos[c]
                    img.src = TodasMusicas[b].Img
    
                    container_genero_secao.appendChild(h1_genero)
                    container_genero_secao.appendChild(img)
                    document.getElementById('container_todas_as_secoes').appendChild(container_genero_secao)

                    container_genero_secao.addEventListener('click', () => {
                        Trocar_Background(img.src, document.body)
                        document.getElementById('input_pesquisar').value = h1_genero.innerText
                        Pesquisar()
                    })
                }
            } else if(musica_encontrada) { 
                break
            }
        }
    }
}

function Retornar_Perfis(Lista, Local) {
    for (let c = 0; c < Lista.length; c++) {
        const div_container_perfil_usuario = document.createElement('div')
        const div_container_img = document.createElement('div')
        const img = document.createElement('img')
        const div_container_texto = document.createElement('div')
        const nome_user = document.createElement('p')
        const span = document.createElement('span')

        //! Classes
        div_container_perfil_usuario.className = 'div_container_perfil_usuario'
        div_container_img.className = 'div_container_img'
        div_container_texto.className = 'div_container_texto'

        //! Valores
        nome_user.innerText = Lista[c].Nome
        span.innerText = 'Perfil'
        img.src = Lista[c].Perfil.Img_Perfil

        //! AppendChild
        div_container_img.appendChild(img)
        div_container_texto.appendChild(span)
        div_container_texto.appendChild(nome_user)
        div_container_perfil_usuario.appendChild(div_container_img)
        div_container_perfil_usuario.appendChild(div_container_texto)
        Local.querySelector('article').appendChild(div_container_perfil_usuario)

        div_container_perfil_usuario.addEventListener('click', () => {
            Carregar_Perfil(Lista[c])
        })

        div_container_perfil_usuario.addEventListener('contextmenu', (event) => {
            Ativar_Opcoes_Click_Direita('Perfil', TodasMusicas[0], undefined, undefined, undefined, Lista[c].ID)
            posicionarElemento(event, document.getElementById('opcoes_click_direito'), array_locais_opcoes)
        })
    }

    Local.style.display = 'block'
}

function Retornar_Match(Lista, Local) {
    for (let a = 0; a < Lista.length; a++) {
        const container_match = document.createElement('div')
        const container_img_match_match = document.createElement('div')
        const container_container_header_match = document.createElement('div')
        const container_esferas = document.createElement('div')
        const p_match = document.createElement('p')
        const traco_match = document.createElement('div')
        const container_texto_match = document.createElement('div')
        const span = document.createElement('span')
        const p = document.createElement('p')

        container_container_header_match.className = 'container_container_header_match'
        container_esferas.className = 'container_esferas'
        traco_match.className = 'traco_match'
        container_match.classList.add('container_match')
        container_match.classList.add('container_match_match')
        container_img_match_match.classList.add('container_img_match_match')
        container_texto_match.classList.add('container_texto_match')

        let cor_adm
        let nomes_participantes = ''
        let array_participantes = []
        for (let c = 0; c < Lista[a].Participantes.length; c++) {

            const esfera = document.createElement('div')
            esfera.className = 'esferas'
            esfera.style.background = Lista[a].Participantes[c].Cor
            container_esferas.appendChild(esfera)

            if(Lista[a].Participantes[c].ID == Lista[a].Admin) {
                cor_adm = Lista[a].Participantes[c].Cor
            }

            if(c + 1 >= Lista[a].Participantes.length) {
                nomes_participantes += Lista[a].Participantes[c].Nome

            } else {
                nomes_participantes += `${Lista[a].Participantes[c].Nome} + `
            }
        }

        container_img_match_match.style.background = Lista[a].Background
        traco_match.style.background = cor_adm
        p.innerText= nomes_participantes

        span.innerText = 'Playlist'
        p_match.innerHTML = 'Match'

        container_container_header_match.appendChild(container_esferas)
        container_container_header_match.appendChild(p_match)
        container_container_header_match.appendChild(traco_match)
        container_img_match_match.appendChild(container_container_header_match)
        container_texto_match.appendChild(span)
        container_texto_match.appendChild(p)
        container_match.appendChild(container_img_match_match)
        container_match.appendChild(container_texto_match)
        Local.querySelector('article').appendChild(container_match)

        container_match.addEventListener('click', () => {
            Abrir_Pagina('match', Lista[a].ID)
        })
    }

    Local.style.display = 'block'
}

function Retornar_Playlists(Lista, Local) {    
    let musicas_playlist = []
    for (let c = 0; c < Lista.length; c++) {
        for (let b = 0; b < Lista[c].Musicas.length; b++) {
            for (let a = 0; a < TodasMusicas.length; a++) {
                if(TodasMusicas[a].ID == Lista[c].Musicas[b].ID_Musica) {
                    musicas_playlist.push(TodasMusicas[a])
                    break
                }
            }
        }

        let user_adm
        for (let b = 0; b < Todos_Usuarios.length; b++) {
            if(Todos_Usuarios[b].ID == Lista[c].Admin) {
                user_adm = Todos_Usuarios[b]
                break
            }
        }
        
        const container_playlist = document.createElement('div')
        const container_img_playlist_playlist = document.createElement('div')
        const container_texto_playlist = document.createElement('div')
        const img_so = document.createElement('img')
        const span = document.createElement('span')
        const p = document.createElement('p')
        const qm_postou_playlist = document.createElement('span')
    
        container_playlist.classList.add('container_playlist')
        container_playlist.classList.add('container_playlist_playlist')
        container_img_playlist_playlist.classList.add('container_img_playlist_playlist')
        container_texto_playlist.classList.add('container_texto_playlist')
        qm_postou_playlist.className = 'qm_postou_playlist'
    
        p.innerText = Lista[c].Nome
        qm_postou_playlist.innerText = 'De ' + user_adm.Nome
    
        span.innerText = 'Playlist'
    
        if(Lista[c].Img != null) {
            img_so.src = Lista[c].Img
            container_img_playlist_playlist.appendChild(img_so)

        } else if(musicas_playlist.length <= 3) {
            img_so.src = musicas_playlist[0].Img
            container_img_playlist_playlist.appendChild(img_so)

        } else {

            for (let b = 0; b < 4; b++) {
                const img = document.createElement('img')
                img.src = musicas_playlist[b].Img
                container_img_playlist_playlist.classList.add('active')
                container_img_playlist_playlist.appendChild(img)
            }
        }
    
        container_texto_playlist.appendChild(span)
        container_texto_playlist.appendChild(p)
        container_texto_playlist.appendChild(qm_postou_playlist)
        container_playlist.appendChild(container_img_playlist_playlist)
        container_playlist.appendChild(container_texto_playlist)
        Local.querySelector('article').appendChild(container_playlist)
    
        container_playlist.addEventListener('click', () => {
            Abrir_Pagina('playlist', Lista[c].ID)
        })
    }

    Local.style.display = 'block'
}