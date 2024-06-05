let emoji_do_banimento_e_supensao = document.querySelector('.emoji')
let titulo_do_banimento_e_supensao = document.querySelector('#estado')
let tempo_do_banimento_e_suspensao = document.querySelector('#tempo')
let motivo_do_banomento_e_suspensao = document.querySelector('#motivo')

function Carregar_Banimento() {
    if(!location.href.includes('aviso') && User.Estado_Da_Conta.Estado.includes('Banido') || !location.href.includes('aviso') && User.Estado_Da_Conta.Estado == 'Suspenso') {
        location.href = 'aviso.html'

    } else {
        if (User.Estado_Da_Conta.Estado.includes('Banido')) {
            emoji_do_banimento_e_supensao.innerText = '🚷'
            titulo_do_banimento_e_supensao.innerText = 'Você Foi Banido!'
            motivo_do_banomento_e_suspensao.innerHTML = `<strong>Motivo:</strong> ${User.Estado_Da_Conta.Motivo}`
            if (User.Estado_Da_Conta.Tempo == 'Permanente') {
                tempo_do_banimento_e_suspensao.innerText = User.Estado_Da_Conta.Tempo
            } else {
                tempo_do_banimento_e_suspensao.innerHTML = '<strong>🚫 Você foi banido por:</strong> ' + calcularTempoRestante(User.Estado_Da_Conta.Tempo)
            }
    
        } else if (User.Estado_Da_Conta.Estado.includes('Suspenso')) {
            emoji_do_banimento_e_supensao.innerText = '⚠'
            titulo_do_banimento_e_supensao.innerText = 'Você Foi Suspenso!'
            motivo_do_banomento_e_suspensao.innerHTML = `<strong>Motivo:</strong> ${User.Estado_Da_Conta.Motivo}`
            if (User.Estado_Da_Conta.Tempo == 'Permanente') {
                tempo_do_banimento_e_suspensao.innerText = User.Estado_Da_Conta.Tempo
            } else {
                tempo_do_banimento_e_suspensao.innerHTML = '<strong>🚧 Você foi suspenso por:</strong> ' + calcularTempoRestante(User.Estado_Da_Conta.Tempo)
            }
        } else if(location.href.includes('aviso') && User.Estado_Da_Conta.Estado == 'Ativo') {
            location.href = 'index.html'
        }
    }
    
}