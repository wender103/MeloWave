let aba_aberta = ''
let versao_mobile_ativada = false

window.addEventListener('resize', () => {
    const largura = window.innerWidth
    const altura = window.innerHeight

    if(largura <= 700 && !versao_mobile_ativada) {
        versao_mobile_ativada = true
        if(tela_tocando_agora_aberta) {
            aba_aberta = 'Tela Tocando Agora'

        } else if(fila_aberta) {
            aba_aberta = 'Fila'

        } else {
            aba_aberta = ''
        }
        Desativar_Musica()
        Ativar_Barra_Musica_Cell()
        console.log('Mobile')
    } else if(largura > 700 && versao_mobile_ativada) {
        versao_mobile_ativada = false
        Desativar_Barra_Musica_Cell()
        Ativar_Musica()

        if(aba_aberta == 'Tela Tocando Agora') {
            Abrir_Tela_Tocando_Agora()
        } else if(aba_aberta == 'Fila') {
            Abrir_Fila()
        }
    }
})