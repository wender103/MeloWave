let emoji_do_banimento_e_supensao = document.querySelector('.emoji')
let titulo_do_banimento_e_supensao = document.querySelector('#estado')
let tempo_do_banimento_e_suspensao = document.querySelector('#tempo')
let motivo_do_banomento_e_suspensao = document.querySelector('#motivo')

function calcularTempoRestante(data) {
    const [dia, mes, ano] = data.split('/').map(Number);
    const dataFutura = new Date(ano, mes - 1, dia);
    const dataAtual = new Date();

    console.log(data)

    if (dataFutura < dataAtual) {
        return 'A data já passou!';
    }

    let anos = dataFutura.getFullYear() - dataAtual.getFullYear();
    let meses = dataFutura.getMonth() - dataAtual.getMonth();
    let dias = dataFutura.getDate() - dataAtual.getDate();

    if (dias < 0) {
        meses--;
        dias += new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).getDate();
    } else if (meses < 0) {
        anos--;
        meses += 12;
    }

    let texto_ano = ''
    let texto_meses = ''
    let texto_dias = ''
    if (anos == 1) {
        texto_ano = `${anos} ano`
    } else if (anos > 1) {
        texto_ano = `${anos} anos`
    }
    
    if (meses == 1) {
        texto_meses = `${meses} mes`
    } else if (meses > 1) {
        texto_meses = `${meses} meses`
    }
    
    if (dias == 1) {
        texto_dias = `${dias} dia`
    } else if (dias > 1) {
        texto_dias = `${dias} dias`
    }

    let resultado = ''
    if (anos > 0) {
        resultado += texto_ano
    }

    if (meses > 0 && resultado != '' && dias > 0) {
        resultado += `, ` + texto_meses
    } else if (dias <= 0 && resultado != '' && meses > 0) {
        resultado += ' e ' + texto_meses
    } else if (meses > 0 && resultado == '') {
        resultado += texto_meses
    }

    if (dias > 0 && resultado != '') {
        resultado += ` e ` + texto_dias
    } else if (dias > 0 && resultado == '') {
        resultado += texto_dias
    }

    return resultado
}

function Carregar_Banimento() {
    if(!location.href.includes('aviso') && User.Estado_Da_Conta.Estado == 'Banido' || !location.href.includes('aviso') && User.Estado_Da_Conta.Estado == 'Suspenso') {
        location.href = 'aviso.html'

    } else {
        if (User.Estado_Da_Conta.Estado == 'Banido') {
            emoji_do_banimento_e_supensao.innerText = '🚷'
            titulo_do_banimento_e_supensao.innerText = 'Você Foi Banido!'
            motivo_do_banomento_e_suspensao.innerHTML = `<strong>Motivo:</strong> ${User.Estado_Da_Conta.Motivo}`
            if (User.Estado_Da_Conta.Tempo == 'Permanente') {
                tempo_do_banimento_e_suspensao.innerText = User.Estado_Da_Conta.Tempo
            } else {
                tempo_do_banimento_e_suspensao.innerHTML = '<strong>🚫 Você foi banido por:</strong> ' + calcularTempoRestante(User.Estado_Da_Conta.Tempo)
            }
    
        } else if (User.Estado_Da_Conta.Estado == 'Suspenso') {
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