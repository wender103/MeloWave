const Container_Selecionar_Generos = document.getElementById('Container_Selecionar_Generos')
const container_article_selecionar_generos = document.getElementById('container_article_selecionar_generos')
const btn_pronto_selecionar_generos = document.getElementById('btn_pronto_selecionar_generos')


function Abrir_Selecionar_Generos_Musicais() {
    Container_Selecionar_Generos.style.display = 'block'

    Retornar_Generos_Musicais()
}

function Fechar_Selecionar_Generos_Musicais() {
    Container_Selecionar_Generos.style.display = 'none'
}

let Array_Generos_Selecionados = []
function Retornar_Generos_Musicais() {
    Array_Generos_Selecionados = []
    container_article_selecionar_generos.innerHTML = ''

    let Todos_Os_Generos = []
    let generosMap = {}

    // Extrair gêneros e agrupar músicas por gênero
    for (let c = 0; c < TodasMusicas.length; c++) {
        let generos = Separar_Por_Virgula(TodasMusicas[c].Genero)
        generos.forEach(genero => {
            Todos_Os_Generos.push(genero)
            if (TodasMusicas[c].Estado == 'Ativo') {
                if (!generosMap[genero]) {
                    generosMap[genero] = []
                }
                generosMap[genero].push(TodasMusicas[c])
            }
        })
    }

    Todos_Os_Generos = ordenarNomesPorFrequencia(Todos_Os_Generos)
    Todos_Os_Generos = [...new Set(Todos_Os_Generos)].sort() // Remove duplicatas e ordena

    // Encontrar o maior e o menor número de views para normalizar o tamanho
    let viewsMin = Infinity
    let viewsMax = -Infinity

    Todos_Os_Generos.forEach(genero => {
        let views = Views_Por_Genero(genero)
        if (views < viewsMin) viewsMin = views
        if (views > viewsMax) viewsMax = views
    })

    for (let c = 0; c < Todos_Os_Generos.length; c++) {
        let genero = Todos_Os_Generos[c]

        // Obter o número de views para o gênero
        let views = Views_Por_Genero(genero)

        // Definir o tamanho da div com base nas views, normalizando o tamanho entre 150px e 300px
        let tamanho = 150 + (150 * (views - viewsMin) / (viewsMax - viewsMin)) + 'px'

        if (generosMap[genero] && generosMap[genero].length > 0) {
            const container_div_escolher_genero = document.createElement('div')
            container_div_escolher_genero.className = 'container_div_escolher_genero'
            container_div_escolher_genero.style.width = tamanho
            container_div_escolher_genero.style.height = tamanho

            const img = document.createElement('img')
            img.src = generosMap[genero][0].Imagens[1]
            img.style.width = '100%'
            img.style.height = 'auto'

            const nome_genero = document.createElement('p')
            nome_genero.innerText = genero
            nome_genero.style.textAlign = 'center'

            container_div_escolher_genero.appendChild(img)
            container_div_escolher_genero.appendChild(nome_genero)
            container_article_selecionar_generos.appendChild(container_div_escolher_genero)

            container_div_escolher_genero.addEventListener('click', () => {
                if(img.style.opacity != 1) {
                    img.style.opacity = 1
                    Array_Generos_Selecionados.push(genero)

                    if(Array_Generos_Selecionados.length > 4) {
                        btn_pronto_selecionar_generos.classList.add('Active')
                    } else {
                        btn_pronto_selecionar_generos.classList.remove('Active')
                    }
                } else {
                    img.style.opacity = 0.5
                    
                    for (let c = 0; c < Array_Generos_Selecionados.length; c++) {
                        if(Array_Generos_Selecionados[c] == genero) {
                            Array_Generos_Selecionados.splice(c, 1)
                            if(Array_Generos_Selecionados.length > 4) {
                                btn_pronto_selecionar_generos.classList.add('Active')
                            } else {
                                btn_pronto_selecionar_generos.classList.remove('Active')
                            }
                            break
                        }
                    }
                }
            })
        }
    }
}

btn_pronto_selecionar_generos.addEventListener('click', () => {
    if(Array_Generos_Selecionados.length > 4) {
        
        User.Gosto_Musical.Generos = [...Array_Generos_Selecionados]
        User.Gosto_Musical.Generos.sort()
        db.collection('Users').doc(User.ID).update({
            Gosto_Musical: User.Gosto_Musical
        }).then(() => {
            Fechar_Selecionar_Generos_Musicais()
            Array_Generos_Selecionados = []
            Retornar_Artistas_Com_Base_Nos_Generos()

            for (let c = 0; c < User.Gosto_Musical.Generos.length; c++) {
              Retornar_Musicas_Com_Base_Nos_Generos_Musicais(User.Gosto_Musical.Generos[c])
            }
        })
    }
})