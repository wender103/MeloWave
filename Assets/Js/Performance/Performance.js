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
            frames = 0
            ultimoTempo = tempoAtual

            // ! Atualiza a exibição do FPS
            document.getElementById('fps').textContent = `FPS: ${fps.toFixed(1)}`

            // & Se o FPS for menor que 20, consideramos que está travando
            if (fps < 20) {
                document.getElementById('status').textContent = 'Status: Travando'
            } else {
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