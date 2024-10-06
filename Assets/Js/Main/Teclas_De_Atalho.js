let volume_tecla_atual = Volume_Atual
let mute_ativado = false

// Event Listener para atalhos de teclado
document.addEventListener('keypress', (event) => {
  if(document.getElementById('Container_Alterar_Atalhos').style.display != 'flex') {

    let key_event = event.key

    if(key_event == User.Configuracoes.Mapeamento_De_Teclas.Tela_Cheia && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      isFullscreen() ? sairTelaCheia() : entrarEmTelaCheia()

    } else if(key_event == User.Configuracoes.Mapeamento_De_Teclas.Mute && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      
      mute_ativado = !mute_ativado
      mute_ativado ? Volume(0, input_volume_pc) : Volume(volume_tecla_atual, input_volume_pc)

    } else if(key_event == User.Configuracoes.Mapeamento_De_Teclas.Play_Pause && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      togglePlayPause()

    } else if((key_event == User.Configuracoes.Mapeamento_De_Teclas.Aumentar_Volume || key_event == '=') && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      aumentarVolume()

    } else if(key_event == User.Configuracoes.Mapeamento_De_Teclas.Diminuir_Volume && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      diminuirVolume()

    } else if(key_event == User.Configuracoes.Mapeamento_De_Teclas.Proxima_Musica && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      Proxima_Musica()

    } else if(key_event == User.Configuracoes.Mapeamento_De_Teclas.Musica_Anterior && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      Musica_Anterior()

    } else if(key_event == User.Configuracoes.Mapeamento_De_Teclas.Repetir_Musica && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      Repetir_Musica()

    } else if(key_event == User.Configuracoes.Mapeamento_De_Teclas.Alternar_Fullscreen && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      fullscreen_aberta ? Destivar_Fullscreen() : Ativar_Fullscreen()

    } else if(key_event == User.Configuracoes.Mapeamento_De_Teclas.Ver_Letra && event.target.nodeName != 'INPUT' && event.target.nodeName != 'TEXTAREA') {
      if(Listas_Prox.MusicaAtual.ID) {
        Abrir_Ver_Letra_PC()
      }
    }
  }
})