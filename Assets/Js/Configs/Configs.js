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

//! ------------------------------------------- Cores Solidas ------------------------------------------------------
const btn_cores_solidas = document.getElementById('btn_cores_solidas')
const ul_config_background = document.getElementById('ul_config_background')
btn_cores_solidas.addEventListener('click', () => {
    //! Caso esteja ativo
    if(btn_cores_solidas.classList.contains('active')) {
        User.Configuracoes.Background.Cores_Solidas = true
        ul_config_background.style.display = 'none'
        Ativar_Cores_Solidas()

    } else {
        User.Configuracoes.Background.Cores_Solidas = false
        ul_config_background.style.display = 'block'
        Desativar_Cores_Solidas()
    }

    Salvar_Configs()
})

function Ativar_Cores_Solidas() {
    document.body.style.background = 'black'
    document.getElementById('container_background_main').style.display = 'block'
    document.getElementById('container_background_nav1').style.display = 'block'
    document.getElementById('container_background_nav2').style.display = 'block'
    document.querySelector('main').style.background = '#121212'
    document.querySelector('nav').querySelectorAll('ul')[0].style.background = '#121212'
    document.querySelector('nav').querySelectorAll('ul')[1].style.background = '#121212'
    document.getElementById('container_tela_tocando_agora').style.background = '#121212'
    document.getElementById('container_fila').style.background = '#121212'
    document.getElementById('container_barra_musica').style.background = '#121212'
    alterarRoot()

    if(Listas_Prox.Indice) {
        Trocar_Cores_Main(Listas_Prox.MusicaAtual.Cores[2])
    } else {
        Trocar_Cores_Main('#007fb1')
    }
}

function Desativar_Cores_Solidas() {
    document.body.style.background = ''
    document.getElementById('container_background_main').style.display = 'none'
    document.getElementById('container_background_nav1').style.display = 'none'
    document.getElementById('container_background_nav2').style.display = 'none'
    document.querySelector('main').style.background = ''
    document.querySelector('nav').querySelectorAll('ul')[0].style.background = ''
    document.querySelector('nav').querySelectorAll('ul')[1].style.background = ''
    document.getElementById('container_tela_tocando_agora').style.background = ''
    document.getElementById('container_fila').style.background = ''
    document.getElementById('container_barra_musica').style.background = ''
    restaurarRoot()

    if(!Listas_Prox.Indice) {
        document.body.style.backgroundImage = `url(${User.Perfil.Img_Background})`
    } else {
        document.body.style.backgroundImage = `url(${Listas_Prox.MusicaAtual.Img})`
    }
}

function Trocar_Cores_Main(Cor) {
    if(User.Configuracoes.Background.Cores_Solidas) {
        
        const background_main1 = document.querySelectorAll('.background_main')[0]
        const background_main2 = document.querySelectorAll('.background_main')[1]

        const backgrounds_nav1 = document.querySelectorAll('.backgrounds_nav1')[0]
        const backgrounds_nav12 = document.querySelectorAll('.backgrounds_nav1')[1]

        const backgrounds_nav2 = document.querySelectorAll('.backgrounds_nav2')[0]
        const backgrounds_nav22 = document.querySelectorAll('.backgrounds_nav2')[1]

        // Define o background da segunda camada como a nova cor
        background_main2.style.backgroundImage = `linear-gradient(to bottom, ${Cor}, transparent 0%)`
        background_main2.style.opacity = 1
        background_main1.style.opacity = 0

        backgrounds_nav12.style.backgroundImage = `linear-gradient(to bottom, ${Cor}, transparent 0%)`
        backgrounds_nav12.style.opacity = 1
        backgrounds_nav1.style.opacity = 0

        backgrounds_nav22.style.backgroundImage = `linear-gradient(to bottom, ${Cor}, transparent 0%)`
        backgrounds_nav22.style.opacity = 1
        backgrounds_nav2.style.opacity = 0

        setTimeout(() => {
            // Troca a cor do primeiro plano de fundo para a nova cor
            background_main1.style.backgroundImage = `linear-gradient(to bottom, ${Cor}, transparent 0%)`
            background_main1.style.opacity = 1
            background_main2.style.opacity = 0

            // backgrounds_nav1.style.backgroundImage = `linear-gradient(to bottom, ${Cor}, ${alterarTransparencia(Cor, 0.6)})`
            backgrounds_nav1.style.opacity = 1
            backgrounds_nav12.style.opacity = 0

            backgrounds_nav2.style.backgroundImage = `linear-gradient(to bottom, ${alterarTransparencia(Cor, 0.6)}, transparent 0%)`
            backgrounds_nav2.style.opacity = 1
            backgrounds_nav22.style.opacity = 0
        }, 300)
    }
}

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

    if(User.Configuracoes.Background.Cores_Solidas) {
        btn_cores_solidas.classList.add('active')
        ul_config_background.style.display = 'none'
        Ativar_Cores_Solidas()
    }
}