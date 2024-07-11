let Infos_Desempenho = {
    FPS: 0,
    Qtns_Travamentos: 0,
    FPS_Values: [],
    Niveis_Desempenho: 0,
    Media_FPS: 0,
    Status: 'Normal'
}


//! Função para calcular a média de FPS
function calcularMediaFPS() {
    const soma = Infos_Desempenho.FPS_Values.reduce((a, b) => a + b, 0)
    const media = (soma / Infos_Desempenho.FPS_Values.length) || 0
    Infos_Desempenho.Media_FPS = media
    return media.toFixed(1)
}

// ! Função para medir a taxa de quadros por segundo (FPS)
function monitorarDesempenho() {
    let fps = 0
    let frames = 0
    let ultimoTempo = performance.now()

    function checarFPS(tempoAtual) {
        frames++
        const delta = tempoAtual - ultimoTempo
        if (delta >= 1000) {
            fps = (frames * 1000) / delta
            Infos_Desempenho.FPS = fps
            Infos_Desempenho.FPS_Values.push(fps)

            Infos_Desempenho.FPS_Values = limitarTamanhoArray(Infos_Desempenho.FPS_Values, 10, true)

            frames = 0
            ultimoTempo = tempoAtual

            // ! Atualiza a exibição do FPS
            document.getElementById('fps').textContent = `FPS: ${fps.toFixed(1)}`
            document.getElementById('Media_FPS').textContent = `Média de FPS: ${calcularMediaFPS()}`
            document.getElementById('Nivel_Desempenho').textContent = `Nível de Desempenho: ${Infos_Desempenho.Niveis_Desempenho}`
            //! Vai ativar o de desempenho
            Modo_Desempenho()

            // & Se o FPS for menor que 20, consideramos que está travando
            if (fps < 20) {
                Infos_Desempenho.Qtns_Travamentos++
                Infos_Desempenho.Status = 'Travando'
                document.getElementById('status').textContent = 'Status: Travando'
                document.getElementById('Qtns_Travamentos').textContent = `Qtns Travamentos: ${Infos_Desempenho.Qtns_Travamentos}`

            } else {
                Infos_Desempenho.Status = 'Normal'
                document.getElementById('status').textContent = 'Status: Normal'
            }
        }
        requestAnimationFrame(checarFPS)
    }
    requestAnimationFrame(checarFPS)
}

// ? Função para tornar a caixinha movível
function tornarMovivel(elemento) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    elemento.onmousedown = arrastarMouse

    function arrastarMouse(e) {
        e = e || window.event
        e.preventDefault()
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = pararArrastar
        document.onmousemove = elementoArrastado
    }

    function elementoArrastado(e) {
        e = e || window.event
        e.preventDefault()
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        elemento.style.top = (elemento.offsetTop - pos2) + "px"
        elemento.style.left = (elemento.offsetLeft - pos1) + "px"
    }

    function pararArrastar() {
        document.onmouseup = null
        document.onmousemove = null
    }
}

// ? Inicia a monitorização do desempenho
monitorarDesempenho()

// ? Torna a caixinha movível
tornarMovivel(document.getElementById('fpsMonitor'))

//! -------------- Performance -----------------
let ultimo_nivel_desempenho = 0
let ultima_musica_tocando = null
function Modo_Desempenho(Ativar=true) {

    if(Infos_Desempenho.Media_FPS <= 20) {
        Infos_Desempenho.Niveis_Desempenho = 3
        Remover_Background_Animado()
        
    } else if(Infos_Desempenho.Media_FPS > 20 && Infos_Desempenho.Media_FPS <= 30) {
        Infos_Desempenho.Niveis_Desempenho = 2
        Remover_Background_Animado()

    } else if(Infos_Desempenho.Media_FPS > 30) {
        Infos_Desempenho.Niveis_Desempenho = 1
        Retornar_Background_Animado()

    } else {
        Infos_Desempenho.Niveis_Desempenho = 0
        Retornar_Background_Animado()
    }

}

function Retornar_Background_Animado() {
    let tem_cores = false
    if(Listas_Prox.MusicaAtual.Cores != undefined) {
        if(Listas_Prox.MusicaAtual.Cores.length > 0) {
            tem_cores = true
        }
    }

    if(ultimo_nivel_desempenho != Infos_Desempenho.Niveis_Desempenho && tem_cores && ultima_musica_tocando != Listas_Prox.MusicaAtual.ID) {
        const gradients_container = document.querySelectorAll('.gradients-container')
        gradients_container.forEach(gradiente_container => {
            gradiente_container.innerHTML = ''

            for (let c = 0; c < 5; c++) {
                const esferas_animacao_letra = document.createElement('div')
                esferas_animacao_letra.className = 'esferas_animacao_letra'
                gradiente_container.appendChild(esferas_animacao_letra)
            }
        })

        updateColors(Listas_Prox.MusicaAtual.Cores)
        ultimo_nivel_desempenho = Infos_Desempenho.Niveis_Desempenho
        ultima_musica_tocando = Listas_Prox.MusicaAtual.ID
    }
}

function Remover_Background_Animado() {
    if(ultimo_nivel_desempenho != Infos_Desempenho.Niveis_Desempenho) {
        const gradients_container = document.querySelectorAll('.gradients-container')
        gradients_container.forEach(gradiente_container => {
            const esferas_animacao_letra = gradiente_container.querySelectorAll('.esferas_animacao_letra')
            esferas_animacao_letra.forEach(element => {
                element.remove()
            })
        })

        ultimo_nivel_desempenho = Infos_Desempenho.Niveis_Desempenho
    }
}