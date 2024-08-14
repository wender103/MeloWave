const btn_marcar_config = document.querySelectorAll('.btn_marcar_config')
btn_marcar_config.forEach(element => {
    element.addEventListener('click', () => {
        if(element.classList.contains('active')) {
            element.classList.remove('active')

        } else {
            element.classList.add('active')
        }
    })  
})

//! ------------------------------------------- Transições de faixas --------------------------------
const btn_fazer_transicao = document.getElementById('btn_fazer_transicao')
btn_fazer_transicao.addEventListener('click', () => {
    //! Caso esteja ativo
    if(btn_fazer_transicao.classList.contains('active')) {
        User.Configuracoes.Transicoes_De_Faixas = true

    } else {
        User.Configuracoes.Transicoes_De_Faixas = false
    }

    Salvar_Configs()
})

//! ----------------------------------------- Salvar Configurações -----------------------------------
function Salvar_Configs() {
    db.collection('Users').doc(User.ID).update({ Configuracoes: User.Configuracoes }).then(() => {
        Avisos_Rapidos('🔧 Configurações salvas com sucesso! ✅✨')
    })
}

//! ---------------------------------- Criar Transições ------------------------------
function Criar_Transicao(proximaMusica) {
    em_transicao = true
    const audio_player = document.getElementById('audio_player')
    Volume_Antigo = Volume_Atual

    ajustarVolume(audio_player, 0, 2000).then(() => {
        audio_player.src = proximaMusica
        Play('Sem Transição')
        ajustarVolume(audio_player, Volume_Antigo, 2000).then(() => {
            em_transicao = false
        })
    })
}

//! ------------------------------------ Modificar Backgrounds ---------------------------------------

const inputs_config_background = document.querySelectorAll('.inputs_config_background')
let filtrosAplicados = {
  blur: 0,
  contraste: 100,
  brilho: 100,
  saturacao: 100
}

let time_salvar_confings_background
function aplicar_filtros(filtros, comando='') {
    const elementos = [
        document.querySelector('main'),
        document.querySelector('#container_tela_tocando_agora'),
        document.querySelector('#container_fila'),
        document.querySelector('nav').querySelectorAll('ul')[0],
        document.querySelector('nav').querySelectorAll('ul')[1],
        document.getElementById('container_barra_musica'),
        document.querySelector('body')
    ]

    const filtro = `blur(${filtros.blur}px) contrast(${filtros.contraste}%) brightness(${filtros.brilho}%) saturate(${filtros.saturacao}%)`

    elementos.forEach(elemento => {
        // Adiciona a transição suave
        elemento.style.transition = 'backdrop-filter 1s ease'
        elemento.style.backdropFilter = filtro
    })

    if(comando == 'Aplicar') {
        inputs_config_background.forEach(element => {
            if (element.id == 'input_blur_config') {
                element.value = filtrosAplicados.blur
            } else if (element.id == 'input_contraste_config') {
                element.value = filtrosAplicados.contraste
            } else if (element.id == 'input_brilho_config') {
                element.value = filtrosAplicados.brilho
            } else if (element.id == 'input_saturacao_config') {
                element.value = filtrosAplicados.saturacao
            }

            atualizar_cor_progresso_input(element)
        })
    } else {
        if (time_salvar_confings_background) {
            clearTimeout(time_salvar_confings_background)
        }

        // Define um novo timeout para logar na tela após 2 segundos
        time_salvar_confings_background = setTimeout(() => {
            User.Configuracoes.Background = filtrosAplicados
            Salvar_Configs()
        }, 2000)
    }
}

inputs_config_background.forEach(element => {
    atualizar_cor_progresso_input(element)

    element.addEventListener('input', () => {
        atualizar_cor_progresso_input(element)
        // Atualize o valor do filtro no objeto filtrosAplicados
        if (element.id == 'input_blur_config') {
            filtrosAplicados.blur = parseInt(element.value)
        } else if (element.id == 'input_contraste_config') {
            filtrosAplicados.contraste = parseInt(element.value)
        } else if (element.id == 'input_brilho_config') {
            filtrosAplicados.brilho = parseInt(element.value)
        } else if (element.id == 'input_saturacao_config') {
            filtrosAplicados.saturacao = parseInt(element.value)
        }

        // Aplique os filtros atualizados
        aplicar_filtros(filtrosAplicados)
    })  
})

//! --------------------------------------------- Animação Detalhada ---------------------------------------------
const btn_animacao_detalhada = document.getElementById('btn_animacao_detalhada')
btn_animacao_detalhada.addEventListener('click', () => {
    //! Caso esteja ativo
    if(btn_animacao_detalhada.classList.contains('active')) {
        User.Configuracoes.Animacao_Detalhada = true

    } else {
        User.Configuracoes.Animacao_Detalhada = false
    }

    Salvar_Configs()
})




//! ----------------------------------------- Carregar Configs ---------------------------------------
function Carregar_Configuracoes() {
    if(User.Configuracoes.Background) {
        filtrosAplicados = User.Configuracoes.Background
        aplicar_filtros(filtrosAplicados, 'Aplicar')
    }

    if(User.Configuracoes.Transicoes_De_Faixas) {
        btn_fazer_transicao.classList.add('active')
    }

    if(User.Configuracoes.Animacao_Detalhada) {
        btn_animacao_detalhada.classList.add('active')
    }
}