let Lsita_Musicas_Artista = []
let Id_Paga_Artistas = undefined
function Abrir_Perfil_Artista(Artista, Musica) {
    Lsita_Musicas_Artista = Pegar_Musicas(Artista, 'Artista').reverse()
    Lsita_Musicas_Artista = Lsita_Musicas_Artista.reverse()
    Retornar_Musica_Linha(Lsita_Musicas_Artista, document.getElementById('container_musicas_pag_artista'), 'Não Inverter, View', 'artista')

    let musica_escolhida = Musica
    let musica_encontrada = false
    let musicas_do_autor = []
    for (let c = 0; c < TodasMusicas.length; c++) {
        let Artista_formatado = formatarString(Artista)
        let autor_formatado = formatarString(TodasMusicas[c].Autor)
        if(Artista_formatado == autor_formatado) {
            musica_encontrada = true
            musicas_do_autor.push(TodasMusicas[c])
        }
    }

    if(!musica_encontrada) {
        for (let c = 0; c < TodasMusicas.length; c++) {
            let Artista_formatado = formatarString(Artista)
            let autor_formatado = formatarString(TodasMusicas[c].Autor)
            if(Artista_formatado.includes(autor_formatado) && TodasMusicas[c].ID != Musica.ID || autor_formatado.includes(Artista_formatado) && TodasMusicas[c].ID != Musica.ID) {
                musicas_do_autor.push(TodasMusicas[c])
            }
            
        }
    }

    if(musicas_do_autor.length > 0) {
        musica_escolhida = musicas_do_autor.sort((a, b) => b.Views - a.Views)[0]
    }
    
    document.getElementById('background_paginas_artista').style.backgroundImage = `url(${musica_escolhida.Img})`
    document.getElementById('nome_artista').innerText = Artista

    const btn_seguir_user = document.getElementById('btn_seguir_user')
    btn_seguir_user.innerText = 'Seguir'

    if(Seguir_Artista(Artista, 'Checar')) {
        btn_seguir_user.innerText = 'Seguindo'
    }

    Abrir_Pagina('artista', musica_escolhida.ID)
    Trocar_Background(musica_escolhida.Img, document.body)
}

//! Random -----------------------
const icon_random_artista = document.getElementById('icon_random_artista')
icon_random_artista.addEventListener('click', () => {
})

const img_play_musicas_artista = document.getElementById('img_play_musicas_artista')
img_play_musicas_artista.addEventListener('click', () => {
    Tocar_Musica(Lsita_Musicas_Artista, Lsita_Musicas_Artista[0])
})

function Seguir_Artista(Artista=null, Comando=null) {
    if(Comando == null || Comando == undefined) {
        Comando = ''
    }

    const btn_seguir_user = document.getElementById('btn_seguir_user')
    let nome_artista = document.getElementById('nome_artista').innerText

    if(Artista) {
        nome_artista = Artista
    }

    let user_seguindo_artista = false
    let num_artista_seguindo = null
    for (let c = 0; c < User.Social.Artistas.length; c++) {
        let artista_formatado = formatarString(Artista)
        let user_autor_formatado = formatarString(User.Social.Artistas[c].Autor)

        if(user_autor_formatado == artista_formatado) {
            user_seguindo_artista = true
            num_artista_seguindo = c
            break
        }
    }

    if(Comando.includes('Checar')) {
        if(!user_seguindo_artista) {
            return false
        } else {
            return true
        }

    } else {
        let artista_encontrado = false
        for (let c = 0; c < TodasMusicas.length; c++) {
            if(TodasMusicas[c].Autor.includes(nome_artista)) {
                artista_encontrado = true
                break
            }
        }

        if(!artista_encontrado) {
            location.reload()

        } else {
            //! Caso ele esteja "SEGUINDO" o Artista
            if(user_seguindo_artista) {
                User.Social.Artistas.splice(num_artista_seguindo, 1)
                btn_seguir_user.innerText = 'Seguir'

            } else {
                const new_artista = {
                    Data: getDataAtual(),
                    Autor: nome_artista,
                    Musicas_Ouvidas: []
                }

                User.Social.Artistas.push(new_artista)

                btn_seguir_user.innerText = 'Seguindo'
            }
        }

        if(User.Estado_Da_Conta != 'Anônima') {
            db.collection('Users').doc(User.ID).update({ Social: User.Social })
            
        } else {
            Salvar_Perfil_Anonimo_User()
        }
        

        Carreagr_Artistas_Seguindo()
    }
}

let musicas_notificacao_random = false
let musicas_notificacao_id = undefined
const container_novos_lancamentos_dos_artistas = document.getElementById('container_novos_lancamentos_dos_artistas')
const container_antigos_lancamentos_dos_artistas = document.getElementById('container_antigos_lancamentos_dos_artistas')
function Checar_Notificacao_Artista_Seguindo() {
    container_novos_lancamentos_dos_artistas.innerHTML = ''
    container_antigos_lancamentos_dos_artistas.innerHTML = ''
    let artistas_que_user_segue = User.Social.Artistas

    let array_novidades = []
    let array_antiguidades = []

    
    for (let b = 0; b < artistas_que_user_segue.length; b++) {
        let array_musicas_novas = []
        let array_musicas_antigas = []
        
        for (let a = 0; a < TodasMusicas.length; a++) {
            if(TodasMusicas[a].Autor.includes(artistas_que_user_segue[b].Autor)) {
                //? Vai checar se a música foi adicionada depois que o user começou a seguir
                let adicionada_depois = verificarDataDepois(TodasMusicas[a].Data, artistas_que_user_segue[b].Data)
                if(!adicionada_depois) {
                    //? Vai verificar se o user já ouviu a música
                    let ja_ouviu = false
                    for (let c = 0; c < artistas_que_user_segue[b].Musicas_Ouvidas.length; c++) {
                        if(artistas_que_user_segue[b].Musicas_Ouvidas[c] == TodasMusicas[a].ID) {
                            ja_ouviu = true
                            break
                        }
                    }

                    if(!ja_ouviu) {
                        array_musicas_novas.push(TodasMusicas[a])
                    }
                } else {
                    //? Vai verificar se o user já ouviu a música
                    let ja_ouviu = false
                    for (let c = 0; c < artistas_que_user_segue[b].Musicas_Ouvidas.length; c++) {
                        if(artistas_que_user_segue[b].Musicas_Ouvidas[c] == TodasMusicas[a].ID) {
                            ja_ouviu = true
                            break
                        }
                    }

                    if(!ja_ouviu) {
                        array_musicas_antigas.push(TodasMusicas[a])
                    }
                }
            }
        }

        const novidade = {
            Musicas: array_musicas_novas,
            Autor: artistas_que_user_segue[b].Autor
        }

        array_novidades.push(novidade)

        const antiguidade = {
            Musicas: array_musicas_antigas,
            Autor: artistas_que_user_segue[b].Autor
        }

        array_antiguidades.push(antiguidade)
    }
    
    for (let c = 0; c < array_novidades.length; c++) {
        const section = document.createElement('section')
        const h1 = document.createElement('h1')
        const article = document.createElement('article')
        
        h1.innerText = array_novidades[c].Autor
        array_novidades[c].Musicas.reverse()
    
        for (let b = 0; b < array_novidades[c].Musicas.length; b++) {
            const musica_linha = document.createElement('div')
            const primeira_parte_musica_linha = document.createElement('div')
            const img = document.createElement('img')
            const p_contador = document.createElement('p')
            const texto_musica_linha = document.createElement('div')
            const p = document.createElement('p')
            const span = document.createElement('span')
            const segunda_parte_musica_linha = document.createElement('div')
            const like = document.createElement('img')
            const tempo = document.createElement('p')

            //! Classes
            musica_linha.classList.add('musica_linha')
            musica_linha.classList.add('Musica_Linha_' + array_novidades[c].Musicas[b].ID)
            primeira_parte_musica_linha.className = 'primeira_parte_musica_linha'
            texto_musica_linha.className = 'texto_musica_linha'
            segunda_parte_musica_linha.className = 'segunda_parte_musica_linha'
            img.className = 'Img_musica_linha'
            p.className = 'Nome_musica_linha'
            p_contador.className = 'p_contador_musica_curtida'
            like.className = 'like_musicas_linha'

            //! Valores
            img.src = array_novidades[c].Musicas[b].Img
            p.innerText = array_novidades[c].Musicas[b].Nome
            span.appendChild(Retornar_Artistas_Da_Musica(array_novidades[c].Musicas[b]))
            p_contador.innerText = b + 1

            Curtir_Musica_Descurtir(array_novidades[c].Musicas[b], like, 'Checar')

            const audio = new Audio(array_novidades[c].Musicas[b].Audio)

            audio.addEventListener('loadedmetadata', function() {
                const durationInSeconds = audio.duration;
                const minutes = Math.floor(durationInSeconds / 60)
                const seconds = Math.floor(durationInSeconds % 60)
                const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`
                tempo.innerText = formattedDuration
            })


            //! AppendChild
            primeira_parte_musica_linha.appendChild(p_contador)
            primeira_parte_musica_linha.appendChild(img)
            texto_musica_linha.appendChild(p)
            texto_musica_linha.appendChild(span)
            primeira_parte_musica_linha.appendChild(texto_musica_linha)
            segunda_parte_musica_linha.appendChild(like)
            segunda_parte_musica_linha.appendChild(tempo)
            musica_linha.appendChild(primeira_parte_musica_linha)
            musica_linha.appendChild(segunda_parte_musica_linha)
            article.appendChild(musica_linha)

            //! Funções de click
            like.addEventListener('click', () => {
                let Musicas_Recebidas = [...array_novidades[c].Musicas]
                Curtir_Musica_Descurtir(Musicas_Recebidas[b], like)
            })

            musica_linha.addEventListener('click', (e) => {
                let Musicas_Recebidas = [...array_novidades[c].Musicas]
                let el = e.target.className
    
                if(el != 'span_nomes_artistas' && el != 'like_musicas_linha') {
                    Tocar_Musica(Musicas_Recebidas, Musicas_Recebidas[b], undefined, `${'notificacao'}-${Musicas_Recebidas[0].ID}`, 'notificacao')
                }
            })
            
        }   
        
        if(article.innerHTML != '') {
            section.appendChild(h1)
            section.appendChild(article)
            container_novos_lancamentos_dos_artistas.appendChild(section)

            document.getElementById('nehuma_novidade').style.display = 'none'
            document.getElementById('h2_novos').style.display = 'block'
            document.getElementById('container_novos_lancamentos_dos_artistas').style.display = 'block'
            document.getElementById('bolinha_icone_noficacao').style.display = 'block'
        }
    }

    for (let c = 0; c < array_antiguidades.length; c++) {
        const section = document.createElement('section')
        const h1 = document.createElement('h1')
        const article = document.createElement('article')

        h1.innerText = array_antiguidades[c].Autor
        array_antiguidades[c].Musicas.reverse()

        for (let b = 0; b < array_antiguidades[c].Musicas.length; b++) {
            const musica_linha = document.createElement('div')
            const primeira_parte_musica_linha = document.createElement('div')
            const img = document.createElement('img')
            const p_contador = document.createElement('p')
            const texto_musica_linha = document.createElement('div')
            const p = document.createElement('p')
            const span = document.createElement('span')
            const segunda_parte_musica_linha = document.createElement('div')
            const like = document.createElement('img')
            const tempo = document.createElement('p')

            //! Classes
            musica_linha.classList.add('musica_linha')
            musica_linha.classList.add('Musica_Linha_' + array_antiguidades[c].Musicas[b].ID)
            primeira_parte_musica_linha.className = 'primeira_parte_musica_linha'
            texto_musica_linha.className = 'texto_musica_linha'
            segunda_parte_musica_linha.className = 'segunda_parte_musica_linha'
            img.className = 'Img_musica_linha'
            p.className = 'Nome_musica_linha'
            p_contador.className = 'p_contador_musica_curtida'
            like.className = 'like_musicas_linha'

            //! Valores
            img.src = array_antiguidades[c].Musicas[b].Img
            p.innerText = array_antiguidades[c].Musicas[b].Nome
            span.appendChild(Retornar_Artistas_Da_Musica(array_antiguidades[c].Musicas[b]))
            p_contador.innerText = b + 1

            Curtir_Musica_Descurtir(array_antiguidades[c].Musicas[b], like, 'Checar')

            const audio = new Audio(array_antiguidades[c].Musicas[b].Audio)

            audio.addEventListener('loadedmetadata', function() {
                const durationInSeconds = audio.duration;
                const minutes = Math.floor(durationInSeconds / 60)
                const seconds = Math.floor(durationInSeconds % 60)
                const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`
                tempo.innerText = formattedDuration
            })


            //! AppendChild
            primeira_parte_musica_linha.appendChild(p_contador)
            primeira_parte_musica_linha.appendChild(img)
            texto_musica_linha.appendChild(p)
            texto_musica_linha.appendChild(span)
            primeira_parte_musica_linha.appendChild(texto_musica_linha)
            segunda_parte_musica_linha.appendChild(like)
            segunda_parte_musica_linha.appendChild(tempo)
            musica_linha.appendChild(primeira_parte_musica_linha)
            musica_linha.appendChild(segunda_parte_musica_linha)
            article.appendChild(musica_linha)

            //! Funções de click
            like.addEventListener('click', () => {
                let Musicas_Recebidas = [...array_antiguidades[c].Musicas]
                Curtir_Musica_Descurtir(Musicas_Recebidas[b], like)
            })

            musica_linha.addEventListener('click', (e) => {
                let Musicas_Recebidas = [...array_antiguidades[c].Musicas]
                let el = e.target.className

                if(el != 'span_nomes_artistas' && el != 'like_musicas_linha') {
                    Tocar_Musica(Musicas_Recebidas, Musicas_Recebidas[b], undefined, `${'notificacao'}-${Musicas_Recebidas[0].ID}`, 'notificacao')
                }
            })
            
        }   
        
        if(article.innerHTML != '') {
            section.appendChild(h1)
            section.appendChild(article)
            container_antigos_lancamentos_dos_artistas.appendChild(section)

            document.getElementById('nehuma_novidade').style.display = 'none'
            document.getElementById('h2_antigos').style.display = 'block'
            document.getElementById('container_antigos_lancamentos_dos_artistas').style.display = 'block'
        }
    }
}

function Salvar_Musicas_Ouvidas_Artista_Seguindo(infos_artistas) {
    User.Social.Artistas = infos_artistas   
    if(User.Estado_Da_Conta != 'Anônima') {
        db.collection('Users').doc(User.ID).update({ Social: User.Social })

    } else {
        Salvar_Perfil_Anonimo_User()
    }
}