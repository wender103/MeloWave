//! Salvar Informações de Recomendação
const maximo_infos_salvas = 100
function Salvar_Historico() {

    let Musicas = []

    for (let c = 0; c < User.Historico.Musicas.length; c++) {
        Musicas.push(User.Historico.Musicas[c].ID)
    }

    let Diferenca_Musicas = Musicas.length - maximo_infos_salvas

    if(Diferenca_Musicas > 0) {
       Musicas.splice(0, Diferenca_Musicas)
    }

    let Diferenca_Playlists = User.Historico.Playlists.length - maximo_infos_salvas

    if(Diferenca_Playlists > 0) {
        User.Historico.Playlists.splice(0, Diferenca_Playlists)
    }

    let Diferenca_Users = User.Historico.Users.length - maximo_infos_salvas

    if(Diferenca_Users > 0) {
        User.Historico.Users.splice(0, Diferenca_Users)
    }

    let Diferenca_Artistas = User.Historico.Artistas.length - maximo_infos_salvas

    if(Diferenca_Artistas > 0) {
        User.Historico.Artistas.splice(0, Diferenca_Artistas)
    }

    let Diferenca_Pesquisa = User.Historico.Pesquisa.length - maximo_infos_salvas

    if(Diferenca_Pesquisa > 0) {
        User.Historico.Pesquisa.splice(0, Diferenca_Pesquisa)
    }

    db.collection('Users').doc(User.ID).update({ Historico: User.Historico })
}

function Salvar_GostoMusical() {

    if (User.Gosto_Musical.Artistas.length > maximo_infos_salvas) {
        User.Gosto_Musical.Artistas.splice(0, User.Gosto_Musical.Artistas.length - maximo_infos_salvas)
    }

    if (User.Gosto_Musical.Generos.length > maximo_infos_salvas) {
        User.Gosto_Musical.Generos.splice(0, User.Gosto_Musical.Generos.length - maximo_infos_salvas)
    }

    db.collection('Users').doc(User.ID).update({ Gosto_Musical: User.Gosto_Musical })
}

//! Recomendar Músicas Para o User
let Todos_Os_Artistas_Historico = [] //! Artistas na ordem do mais ouvidos pelo user
let Todos_Os_Generos_Historico = [] //! Generos na ordem do mais ouvidos pelo user
let contador_feito_pra_voce = 0
let qts_vezes_chamadaS_feito_pra_voce = 0
let Historico_Musicas = []
let max_feito_pra_voce = 10
function Retornar_Feito_Para_Voce() {
    if(qts_vezes_chamadaS_feito_pra_voce <= max_feito_pra_voce) {
        qts_vezes_chamadaS_feito_pra_voce++

        Historico_Musicas = User.Historico.Musicas

        let array_generos_historico = []
        let array_autores_historico = ordenarNomesPorFrequencia(User.Historico.Artistas)

        for (let c = 0; c < Historico_Musicas.length; c++) {
            array_generos_historico.push(...separarArtistas(Historico_Musicas[c].Genero))
        }

        array_generos_historico = ordenarNomesPorFrequencia(array_generos_historico)

        let array_recomendacoes = []
        for (let c = 0; c < TodasMusicas.length; c++) {
            let genero_formatado = formatarString(TodasMusicas[c].Genero)
            let genero_historico_formatado = formatarString(array_generos_historico[qts_vezes_chamadaS_feito_pra_voce - 1])

            if(genero_formatado.includes(genero_historico_formatado) || genero_historico_formatado.includes(genero_formatado)) {
                if(array_recomendacoes.length < max_feito_pra_voce) {
                    array_recomendacoes.push(TodasMusicas[c])
                }
            }
        }

        console.log(array_recomendacoes.length)

        if(array_recomendacoes.length > 5) {
            let array_autores = []
    
            for (let c = 0; c < array_recomendacoes.length; c++) {
                array_autores.push(...separarArtistas(array_recomendacoes[c].Autor))
            }
    
            array_autores = ordenarNomesPorFrequencia(array_autores)
    
            const resultado = {
                Musicas: array_recomendacoes,
                Autores_Presentes: array_autores,
            }
    
            return resultado
        } else {
            return null
        }

    }
}

//! Mostrar na tela
const container_musicas_home = document.getElementById('container_musicas_home')

function Retornar_Daily() {
    if(contador_feito_pra_voce == 0) {
        Historico_Musicas = User.Historico.Musicas
    }

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
                array_daily = resultado.Musicas
            }

            console.log(resultado)

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
                p.innerText = `Seu Mix Diário ${qts_vezes_chamadaS_feito_pra_voce}`
                p_daily.innerText = `Mix Diário ${qts_vezes_chamadaS_feito_pra_voce}`
                

                for (let h = 0; h < resultado.Autores_Presentes.length; h++) {
                    if(h >= resultado.Autores_Presentes.length - 1) {
                        span.innerText += `${resultado.Autores_Presentes[h]}`
                    } else {
                        span.innerText += `${resultado.Autores_Presentes[h]}, `
                    }
                }

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
                daily_caixa.addEventListener('click', () => {
                    Abrir_PLaylist_Mix(array_daily, p_daily.innerText, contaier_svg_daily.innerHTML, )
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