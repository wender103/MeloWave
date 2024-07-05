let cores_musica_atual = []
function Carregar_Cores_Imgs(image_url, cores_ja_salvas = false) {
    return new Promise(async (resolve, reject) => {
        if(!cores_ja_salvas) {
            try {
                const response = await fetch('http://localhost:3000/extract-colors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image_url })
                })
    
                if (!response.ok) {
                    throw new Error('Failed to extract colors')
                }
    
                const data = await response.json()
                cores_musica_atual = data.colors
    
                const colorsDiv = document.getElementById('cores_imgs')
                colorsDiv.innerHTML = ''
                colorsDiv.style.display = 'block'
    
                data.colors.forEach(color => {
                    const colorBox = document.createElement('div')
                    colorBox.className = 'color-box'
                    colorBox.style.backgroundColor = color
                    colorsDiv.appendChild(colorBox)
                })
    
                resolve(data.colors)
            } catch (error) {
                reject(error)
            }
        } else {
            const data = cores_ja_salvas
            cores_musica_atual = data
            resolve(data)
        }
    })
}

function Salvar_Cores_Imgs_Musica(ID_Musica, Cores) {
    return new Promise((resolve, reject) => {
        let feito = false
        db.collection('Musicas').get().then((snapshot) => {
            snapshot.docs.forEach(Musicas => {
                TodasMusicas = Musicas.data().Musicas
                
                if(!feito) {
                    for (let c = 0; c < TodasMusicas.length; c++) {
                        if(TodasMusicas[c].ID == ID_Musica && feito != true) {
                            feito = true
                            TodasMusicas[c].Cores = Cores
                
                            db.collection('Musicas').doc(Musicas.id).update({Musicas: TodasMusicas}).then(() => {
                                console.log('Cores da música salva com sucesoo! ' + TodasMusicas[c].Nome)
                                resolve(true)
                            })
                            break
                        }
                    }
                }
            })
        })
    })
}



function Atualizar_Cores_Partes_Site() {
    const container_tela_tocando_agora = document.querySelector('#container_tela_tocando_agora article')
    const gradient_bg_tela_tocando_agora = document.getElementById('gradient_bg_tela_tocando_agora')
    gradient_bg_tela_tocando_agora.style.height = `${container_tela_tocando_agora.scrollHeight + 40}px`
    const container_fila = document.querySelector('#container_fila article')
    const gradient_bg_container_fila = document.getElementById('gradient_bg_container_fila')
    gradient_bg_container_fila.style.height = `${container_fila.scrollHeight}px`
}

function Remover_Opacidade_Das_Cores_Fundo_Interativo() {
    const gradient_bg = document.querySelectorAll('.gradient-bg')

    gradient_bg.forEach(container_graditente => {
        container_graditente.style.opacity = 0
    })
}

function Adicionar_Opacidade_Das_Cores_Fundo_Interativo() {
    const gradient_bg = document.querySelectorAll('.gradient-bg')

    gradient_bg.forEach(container_graditente => {
        container_graditente.style.opacity = 1
    })
}

function Montar_Cores_Na_Tela(MusicaAtual) {
    if(MusicaAtual.Cores.length <= 0 ) {
        // Carregar_Cores_Imgs(MusicaAtual.Img).then((resp) => {
        //     if(resp) {
        //         Salvar_Cores_Imgs_Musica(MusicaAtual.ID, resp)
        //         updateColors(resp)
        //     }
        // })
    } else {
        Carregar_Cores_Imgs(MusicaAtual.Img, MusicaAtual.Cores).then((resp) => {
            if(resp) {
                updateColors(resp)
            }
        })
    }
}

//! ---------------------- Background Letra Animada ---------------------------
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('.interactive')

    interactiveElements.forEach((interBubble) => {
        let curX = 0
        let curY = 0
        let tgX = 0
        let tgY = 0

        function move() {
            curX += (tgX - curX) / 10
            curY += (tgY - curY) / 10
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
            requestAnimationFrame(move)
        }

        window.addEventListener('mousemove', (event) => {
            tgX = event.clientX
            tgY = event.clientY
        })

        move()
    })
})

// Função para atualizar as cores das bolinhas
function updateColors(Todas_Cores) {
    let colors_backgrounds = Todas_Cores.slice(0, 2)
    let colors = Todas_Cores.slice(1, 7)

    // if (colors.length !== 4) {
    //     console.error('Array deve conter exatamente 5 cores.')
    //     return
    // }

    const gradient_bg = document.querySelectorAll('.gradient-bg')

    gradient_bg.forEach((element, index) => {
        let color = hexToRgb(colors_backgrounds[0])
        let color2 = hexToRgb(colors_backgrounds[1])
        const rgbaColor1 = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`
        const rgbaColor2 = `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 1)`
        element.style.background = `linear-gradient(40deg, ${rgbaColor1}, ${rgbaColor1})`
    })


    //! Esferas --------------

    function getRandomDuration() {
        return `${Math.floor(Math.random() * 40) + 10}s`
    }
    
    // Função para selecionar uma animação aleatória
    function getRandomAnimation() {
        const animations = ['moveVertical', 'moveInCircle', 'moveHorizontal']
        return animations[Math.floor(Math.random() * animations.length)]
    }

    const esferas_animacao_letra = document.querySelectorAll('.esferas_animacao_letra')
    esferas_animacao_letra.forEach((element, index) => {
        if (colors.length > 0) {
            const colorIndex = index % colors.length
            const color = hexToRgb(colors[colorIndex])
    
            const rgbaColor1 = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.8)`
            const rgbaColor2 = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`
            element.style.background = `radial-gradient(circle at center, ${rgbaColor1} 0, ${rgbaColor2} 50%) no-repeat`
    
            // Aplicar duração e animação aleatórias
            const randomDuration = getRandomDuration()
            const randomAnimation = getRandomAnimation()
            element.style.animation = `${randomAnimation} ${randomDuration} ease infinite`
        }
    })

    const interactive = document.querySelectorAll('.interactive')
    let core_interactive = hexToRgb(Todas_Cores[1])

    interactive.forEach((element) => {
        const rgbaColor1 = `rgba(${core_interactive[0]}, ${core_interactive[1]}, ${core_interactive[2]}, 0.8)`
        const rgbaColor2 = `rgba(${core_interactive[0]}, ${core_interactive[1]}, ${core_interactive[2]}, 0)`
        element.style.background = `radial-gradient(circle at center, ${rgbaColor1} 0, ${rgbaColor2} 50%) no-repeat`
    })
}