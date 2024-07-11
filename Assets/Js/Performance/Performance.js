let Modo_Desempenho_Ativado = false
let fpsValues = []
let Qtns_Travamentos = 0


//! Função para calcular a média de FPS
function calcularMediaFPS() {
    const soma = fpsValues.reduce((a, b) => a + b, 0)
    const media = (soma / fpsValues.length) || 0
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
            fpsValues.push(fps)

            fpsValues = limitarTamanhoArray(fpsValues, 10, true)

            frames = 0
            ultimoTempo = tempoAtual

            // ! Atualiza a exibição do FPS
            document.getElementById('fps').textContent = `FPS: ${fps.toFixed(1)}`
            document.getElementById('Media_FPS').textContent = `Média de FPS: ${calcularMediaFPS()}`

            // & Se o FPS for menor que 20, consideramos que está travando
            if (fps < 20) {
                Qtns_Travamentos++
                document.getElementById('status').textContent = 'Status: Travando'
                document.getElementById('Qtns_Travamentos').textContent = `Qtns Travamentos: ${Qtns_Travamentos}`

                //! Vai perguntar se o user quer usar o site no modo de desempenho
                if(Qtns_Travamentos > 2 && !Modo_Desempenho_Ativado) {
                    Notificar_Infos('🚨 Detectamos que o site está tendo um desempenho ruim no seu dispositivo. 🚀 Deseja usar o site no modo de desempenho para evitar travamentos? 😊', 'Confirmar', 'Sim').then(resp => {
                        if(resp) {
                            Modo_Desempenho()
                        }
                    })
                }

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

//! -------------- Performance -----------------
function Modo_Desempenho(Ativar=true) {
    Modo_Desempenho_Ativado = Ativar

    if(Ativar) {

    }
}