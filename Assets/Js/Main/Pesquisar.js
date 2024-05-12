const input_pesquisar = document.getElementById('input_pesquisar')
let melhor_resultado_encontrado = false

input_pesquisar.addEventListener('keypress', (e) => {
    if(e.key == 'Enter') {
        Pesquisar()
    }
})


function Pesquisar() {
    let array_musicas_pesquisa = []
    let array_playlists_pesquisa = []
    let array_artistas_pesquisa = []
    let array_perfis_pesquisa = []

    Limpar_Pesquisa()
    let pesquisa = input_pesquisar.value
    let pesquisa_encotrada = false


    if(pesquisa.trim() != '') {
        for (let c = 0; c < TodasMusicas.length; c++) {
            const nome_formatado = formatarString(TodasMusicas[c].Nome)
            const autor_formatado = formatarString(TodasMusicas[c].Autor)
            const genero_formatado = formatarString(TodasMusicas[c].Genero)
            const pesquisa_formatada = formatarString(pesquisa)

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

        if(array_playlists_pesquisa.length > 0) {
            // Retornar_Playlists(array_playlists, document.getElementById('container_playlists'))
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
        
        setTimeout(() => {
            melhor_resultado_encontrado = false
        }, 1000)
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

    Mostrar_Max_Musicas()
}

function Retornar_Musicas(Musicas_Recebidas, Local) {
    const article = Local.querySelector('article')
    article.innerHTML = ''

    let Musicas = Musicas_Recebidas.reverse()

    for (let c = 0; c < Musicas.length; c++) {
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
            let resultado = separarArtistas(TodasMusicas[c].Autor)

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
    
                    for (let d = 0; d < TodosArtistas.length; d++) {
                        let formatado_artista = formatarString(TodosArtistas[d])
    
                        if(formatado_artista.includes(artistas_complo[b]) || artistas_complo[b].includes(formatado_artista)) {
                            let nome_autor = encontrarArtistas(separarArtistas(TodasMusicas[c].Autor), TodosArtistas[d])
                            p.innerText = nome_autor.nomeMaisProximo
                        }
                        
                    }
    
                    span.innerText = 'Artista'
                
                    //! AppendChild
                    container_img_musica.appendChild(img)
                    texto_musica.appendChild(p)
                    texto_musica.appendChild(span)
                    artista_caixa.appendChild(container_img_musica)
                    artista_caixa.appendChild(texto_musica)
                    article.appendChild(artista_caixa)
    
                    artista_caixa.addEventListener('click', () => {
                        Abrir_Perfil_Artista(p.innerText, TodasMusicas[c])
                    })
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

    const resultado = encontrarArtistas(separarArtistas(Musica.Autor), input_pesquisar.value)
    document.getElementById('img_melhor_resultado').src = Musica.Img
    document.getElementById('nome_melhor_resultado').innerText = resultado.nomeMaisProximo
    document.getElementById('tipo_melhor_resultado').innerText = Tipo

    let Musicas = TodasMusicas.reverse()

    for (let c = 0; c < Musicas.length; c++) {
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

    document.getElementById('article_melhor_resultado').addEventListener('click', () => {
        Abrir_Perfil_Artista(resultado.nomeMaisProximo, Musica)

    })

    Mostrar_Max_Musicas()
}