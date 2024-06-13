let volume_tecla_atual = Volume_Atual
let mute_ativado = false
document.addEventListener('keypress', (event) => {
    let key_event = event.key
  
    if(key_event == 'f' && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
  
      if(isFullscreen()) {
        sairTelaCheia()
      } else {
        entrarEmTelaCheia()
      }
    } else if(key_event == 'm' && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      
      if(!mute_ativado) {
        mute_ativado = true
        volume_tecla_atual = Volume_Atual
        Volume(0, input_volume_pc)
        Volume(0, input_volume_pc_fullscreen)
      } else {
        mute_ativado = false
        Volume(volume_tecla_atual, input_volume_pc)
        Volume(volume_tecla_atual, input_volume_pc_fullscreen)
      }
    } else if(key_event == 'p' && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      togglePlayPause()

    } else if(key_event == '+' && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA' || key_event == '=' && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      aumentarVolume()

    } else if(key_event == '-' && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      diminuirVolume()

    } else if(key_event == 'n' && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      Proxima_Musica()

    } else if(key_event == 'b' && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
      event.preventDefault()
      Musica_Anterior()

    } else if(key_event == 'r' && event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'TEXTAREA') {
        event.preventDefault()
        Repetir_Musica()

    }
})