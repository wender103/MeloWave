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
        if(Listas_Prox.MusicaAtual.ID) {
            Ativar_Barra_Musica_Cell()
        }

    } else if(largura > 700 && versao_mobile_ativada) {
        versao_mobile_ativada = false
        Desativar_Barra_Musica_Cell()
        if(Listas_Prox.MusicaAtual.ID) {
            Ativar_Musica()
        }

        if(aba_aberta == 'Tela Tocando Agora') {
            Abrir_Tela_Tocando_Agora()
        } else if(aba_aberta == 'Fila') {
            Abrir_Fila()
        }
    }
})