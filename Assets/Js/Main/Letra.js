const text_area_add_letra = document.getElementById('text_area_add_letra')
const btn_pesquisar_letra_add = document.getElementById('btn_pesquisar_letra_add')
const preElemento = document.getElementById('local_letra_musica_sincronizar')
const bnt_salvar_letra = document.getElementById('bnt_salvar_letra')
const Btn_Proximo_aAdd_Letra = document.getElementById('Btn_Proximo_aAdd_Letra')
const Icon_Traduzin = document.querySelectorAll('.Icon_Traduzin')
let adicionando_letra_na_musica = false
let pode_salvar_letra = false
let letre_cell_aberta = false
let Traducao_Ativa = false

const lista_elementos_mudar_cor_letra = [document.querySelector('main'), document.getElementById('container_fila'), document.getElementById('container_barra_musica'), document.getElementById('container_tela_tocando_agora')]

let linha_atual_sincronizar = 0 
let array_tempo_letra_sincronizar = []

document.getElementById('btn_adicionar_letra_musica_sendo_editada').addEventListener('click', () => {
    Fechar_Container_Editar_Musicas()
    btn_pesquisar_letra_add.href = `https://www.musixmatch.com/es/busqueda?query=${`${musica_editando_meu_perfil.Nome}`} ${Separar_Por_Virgula(musica_editando_meu_perfil.Autor)[0]}`
    btn_pesquisar_letra_add.addEventListener('click', () => {
        // sairDaTelaCheia()
    })
})

function Fechar_Add_Letra(Comando='') {
    if(!Comando.includes('Não Voltar a Página')) {
        Abrir_Pagina('meuperfil', `meuperfil_${User.ID}`)
        Pausar()
    }
    adicionando_letra_na_musica = false
    pode_salvar_letra = false
    bnt_salvar_letra.classList.add('btn_bloqueado')
    array_tempo_letra_sincronizar = []
    array_historico_keys_add_letra = []
    setTimeout(() => {
        text_area_add_letra.value = ''
        document.getElementById('primeira_parte_add_letra').style.display = 'block'
        document.getElementById('segunda_parte_add_letra').style.display = 'none'
        container_btn_comecar_sincronizar_letra.style.bottom = '30px'
        container_btns_add_letra_segunda_parte.style.bottom = '-100vh'
    }, 1000)

    document.querySelector('nav').classList.remove('Desabilitada')

    if(document.getElementById('btn_fazer_transicao').classList.contains('active')) {
        User.Configuracoes.Transicoes_De_Faixas = true
    } else {
        User.Configuracoes.Transicoes_De_Faixas = false
    }
}

function Checar_Proximo_Add_Letra() {
    text_area_add_letra.value = limparLetraMusica(text_area_add_letra.value)

    if(text_area_add_letra.value.trim() != '') {
        Btn_Proximo_aAdd_Letra.classList.remove('btn_bloqueado')
    } else {
        Btn_Proximo_aAdd_Letra.classList.add('btn_bloqueado')
    }
}

function Proximo_Passo_Add_Letra() {
    if(text_area_add_letra.value.trim() != '') {
        document.getElementById('primeira_parte_add_letra').style.display = 'none'
        document.getElementById('segunda_parte_add_letra').style.display = 'block'
        preElemento.innerText = text_area_add_letra.value
        Desativar_Musica()
        document.querySelector('nav').classList.add('Desabilitada')
        User.Configuracoes.Transicoes_De_Faixas = false
        
    } else {
        Notificar_Infos('Por favor, insira a letra da música antes de prosseguir! 🚨🎶📝')
    }
}

function Voltar_Editar_Letra() {
    document.getElementById('primeira_parte_add_letra').style.display = 'block'
    document.getElementById('segunda_parte_add_letra').style.display = 'none'
    container_btn_comecar_sincronizar_letra.style.bottom = '30px'
    container_btns_add_letra_segunda_parte.style.bottom = '-100vh'
    adicionando_letra_na_musica = false
    pode_salvar_letra = false
    bnt_salvar_letra.classList.add('btn_bloqueado')
    linha_atual_sincronizar = 0
    array_tempo_letra_sincronizar = []
    array_historico_keys_add_letra = []
    Pausar()
    Volume(Volume_Antigo, input_volume_pc)
    document.querySelector('nav').classList.remove('Desabilitada')

    if(document.getElementById('btn_fazer_transicao').classList.contains('active')) {
        User.Configuracoes.Transicoes_De_Faixas = true
    } else {
        User.Configuracoes.Transicoes_De_Faixas = false
    }
}

//! Sincronizar
const container_btn_comecar_sincronizar_letra = document.getElementById('container_btn_comecar_sincronizar_letra')
const btn_iniciar_sincronizar = document.getElementById('btn_iniciar_sincronizar')

let info_add_letra = null
if(localStorage.getItem('Infos_Add_Letra')) {
    info_add_letra = JSON.parse(localStorage.getItem('Infos_Add_Letra'))
} else {
    info_add_letra = {
        Visto: false,
    }
    localStorage.setItem('Infos_Add_Letra', JSON.stringify(info_add_letra))
}

const Texto_Info_Add_Letra = `<h1>🎉 Bem-vindo ao Tutorial de Sincronização de Letras! 🎉</h1>
<h3>🔑 Tecla Enter: Avançar uma Linha</h3>
<ul class="li_primeira_parte_infos_add_letra">
  <li><strong>Quando usar?</strong> Use a tecla <strong>Enter</strong> para avançar uma linha da letra quando a música chegar na próxima linha.</li>
  <li><strong>Como funciona?</strong> Cada vez que você pressionar <strong>Enter</strong>, a linha atual será destacada e você passará para a próxima linha.</li>
  <li><strong>Exemplo:</strong> Quando o cantor termina de cantar uma linha e começa a próxima, pressione <strong>Enter</strong> para acompanhar.</li>
</ul>
<h3>🔑 Tecla Shift: Avançar Condicionalmente</h3>
<ul class="li_primeira_parte_infos_add_letra">
  <li><strong>Quando usar?</strong> Use a tecla <strong>Shift</strong> quando você quiser avançar uma linha, mas com uma condição especial.</li>
  <li><strong>Como funciona?</strong> Pressionar <strong>Shift</strong> faz você avançar uma linha, mas se a próxima linha estiver vazia, você avança duas linhas.</li>
  <li><strong>Exemplo:</strong> Se a letra tem um espaço em branco entre os versos e você quer pular direto para a próxima linha com texto, pressione <strong>Shift</strong>.</li>
</ul>
<h3>🔑 Tecla Backspace: Retroceder uma Linha</h3>
<ul class="li_primeira_parte_infos_add_letra">
  <li><strong>Quando usar?</strong> Use a tecla <strong>Backspace</strong> para corrigir um erro de sincronização, retrocedendo uma linha.</li>
  <li><strong>Como funciona?</strong> Pressionar <strong>Backspace</strong> faz você voltar uma linha, permitindo ajustar a sincronização.</li>
  <li><strong>Exemplo:</strong> Se você avançou acidentalmente para a próxima linha antes da hora, pressione <strong>Backspace</strong> para voltar e corrigir.</li>
</ul>
<h2>Resumo Rápido</h2>
<ul>
  <li><strong>Enter</strong> ➡️ Avança uma linha.</li>
  <li><strong>Shift</strong> ⬇️ Avança uma linha, ou duas se a próxima estiver vazia.</li>
  <li><strong>Backspace</strong> ⬅️ Retrocede uma linha.</li>
</ul>
<h2>Dicas de Uso</h2>
<ul>
  <li><strong>Pratique Antes:</strong> Tente usar as teclas algumas vezes para pegar o jeito antes de sincronizar com a música real.</li>
  <li><strong>Fique Atento ao Ritmo:</strong> Preste atenção no ritmo da música e nas mudanças de linha para manter a sincronização perfeita.</li>
  <li><strong>Ajuste Sempre que Precisar:</strong> Não tenha medo de usar o <strong>Backspace</strong> se errar. É melhor corrigir do que deixar fora de sincronia.</li>
</ul>
<p>Pronto! Agora você está preparado para sincronizar a letra da música como um profissional 🎶✨. Se divirta e qualquer dúvida, estamos aqui para ajudar! 🎵😊</p>
`


function Iniciar_Sincronizar_Letra(Iniciar_Sem_Perguntar = false) {
    if(info_add_letra.Visto == true || Iniciar_Sem_Perguntar) {
        container_btn_comecar_sincronizar_letra.style.bottom = '-100vh'
        container_btns_add_letra_segunda_parte.style.bottom = '30px'
        adicionando_letra_na_musica = true
    
        Contagem_Regressiva()
        Volume_Antigo = Volume_Atual

        if(Volume_Antigo < 20) {
            Volume(100, input_volume_pc)
        }

        setTimeout(() => {
            Play()
        }, 5000)

    } else if(info_add_letra.Visto == false || info_add_letra == null) {
        Notificar_Infos(Texto_Info_Add_Letra, 'Informação, Confirmar, Grande', 'Entendi').then(()=> {
            info_add_letra.Visto = true
            localStorage.setItem('Infos_Add_Letra', JSON.stringify(info_add_letra))

            container_btn_comecar_sincronizar_letra.style.bottom = '-100vh'
            container_btns_add_letra_segunda_parte.style.bottom = '30px'
            adicionando_letra_na_musica = true
        
            Contagem_Regressiva()
            Volume_Antigo = Volume_Atual

            if(Volume_Antigo < 20) {
                Volume(100, input_volume_pc)
            }

            setTimeout(() => {
                Play()
            }, 5000)
        })
    }
}

btn_iniciar_sincronizar.addEventListener('click', () => {
    Iniciar_Sincronizar_Letra()
})

btn_iniciar_sincronizar.addEventListener('keydown', (event) => {
    event.preventDefault()
})

const container_contagem_regressiva_add_letra = document.getElementById('container_contagem_regressiva_add_letra')
const h1_contagem_regressiva_add_letra = document.getElementById('h1_contagem_regressiva_add_letra')
let Volume_Antigo = Volume_Atual
function Contagem_Regressiva(Comando = 'Tocar') {
    return new Promise((resolve, reject) => {
        let contador = 3
        animateBackgroundColor('rgba(0, 0, 0, 0.411)', lista_elementos_mudar_cor_letra, 500)
        animateBackgroundColor('rgba(0, 0, 0, 0.411)', document.querySelector('nav').querySelectorAll('ul'), 500)
        
        h1_contagem_regressiva_add_letra.innerText = contador
        container_contagem_regressiva_add_letra.style.display = 'flex'

        function Contar() {
            h1_contagem_regressiva_add_letra.innerText = contador
            
            setTimeout(() => {
                if(contador > 0) {
                    Contar()
                } else {
                    container_contagem_regressiva_add_letra.style.display = 'none'
                    animateBackgroundColor('#0d111f54', lista_elementos_mudar_cor_letra, 1500)
                    animateBackgroundColor('#0d111f54', document.querySelector('nav').querySelectorAll('ul'), 1500)

                    if(Comando == 'Tocar') {
                        setTimeout(() => {
                            Tocar_Musica([musica_editando_meu_perfil], musica_editando_meu_perfil, 'Não Ativar Música 2, Pausar Ao Finalizar', `adicionarletra${musica_editando_meu_perfil.ID}`, 'adicionarletra')

                            resolve(true)
                        }, 1000)
                    } else {
                        resolve(true)
                    }
                }
            }, 1000)

            contador -= 1
        }
        Contar()  
    })
}

function Voltar_Sincronizar_Musica(index) {
    index = parseInt(index)
    audio_player.currentTime = array_tempo_letra_sincronizar[index]
    linha_atual_sincronizar = index
    array_tempo_letra_sincronizar.length = index + 1
    array_historico_keys_add_letra.length = index + 1
    Destacar_linhas_Sincronizar()
    Pausar()
    Contagem_Regressiva('Não Tocar').then(() => {
        Play()
    })
}

function Destacar_linhas_Sincronizar() {
    let linhas = preElemento.innerText.split('\n')
    
    if (linha_atual_sincronizar <= linhas.length) {
        // Atualiza a linha atual com a classe 'linha_pre_em_destaque'
        let linhasAtualizadas = linhas.map(function(linha, index) {

        if(index < linha_atual_sincronizar) {
            return `<span class="linha_pre_anterior_add_letra" onclick="Voltar_Sincronizar_Musica(${index})">` + linha + '</span>'
        } else if (index === linha_atual_sincronizar) {
                return '<span class="linha_pre_em_destaque_add_letra" id="linha_atual_sincronizar_editar_letra">' + linha + '</span>'
            } else {
                return linha
            }
        })
        
        // Atualiza o conteúdo do <pre> com as linhas modificadas
        preElemento.innerHTML = linhasAtualizadas.join('\n')

        //? Faz o scroll para a linha atual
        try {
            document.getElementById('linha_atual_sincronizar_editar_letra').scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch{}
        
        linha_atual_sincronizar++
        if (linha_atual_sincronizar >= linhas.length) {
            bnt_salvar_letra.classList.remove('btn_bloqueado')
            pode_salvar_letra = true
        } else {
            bnt_salvar_letra.classList.add('btn_bloqueado')
            pode_salvar_letra = false
        }
    } else {
        bnt_salvar_letra.classList.remove('btn_bloqueado')
        pode_salvar_letra = true
    }
}

const btn_comecar_dnv_letra_sincronizar = document.getElementById('btn_comecar_dnv_letra_sincronizar')
btn_comecar_dnv_letra_sincronizar.addEventListener('click', () => {
    Voltar_Uma_Linha('Zerar')
})

btn_comecar_dnv_letra_sincronizar.addEventListener('keydown', (key) => {
    key.preventDefault()
})

const btn_up_sincronizar = document.getElementById('btn_up_sincronizar')
btn_up_sincronizar.addEventListener('click', () => {
    Voltar_Uma_Linha()
})

btn_up_sincronizar.addEventListener('keydown', (key) => {
    key.preventDefault()
})

let array_historico_keys_add_letra = []
function Voltar_Uma_Linha(Comando='') {
    let linhas = preElemento.innerText.split('\n')

    if(array_tempo_letra_sincronizar.length <= 1 || Comando.includes('Zerar')) {
        linha_atual_sincronizar = -1
        array_historico_keys_add_letra = []
        array_tempo_letra_sincronizar = []
        Pausar()
        Destacar_linhas_Sincronizar()
        audio_player.currentTime = 0
        Iniciar_Sincronizar_Letra(true)
        Contagem_Regressiva('Não Tocar')

    } else {
    
        if(array_historico_keys_add_letra[array_historico_keys_add_letra.length - 1] == 'Shift' && linhas[linha_atual_sincronizar - 2].trim() == '') {
            linha_atual_sincronizar = linha_atual_sincronizar - 3
            array_tempo_letra_sincronizar.pop()
            array_tempo_letra_sincronizar.pop()
            
        } else {
            linha_atual_sincronizar = linha_atual_sincronizar - 2
            array_tempo_letra_sincronizar.pop()
        }
        
        array_historico_keys_add_letra.pop()

        Destacar_linhas_Sincronizar()
        audio_player.currentTime = array_tempo_letra_sincronizar[array_tempo_letra_sincronizar.length - 1]
        Pausar()
        Contagem_Regressiva('Não Tocar').then(() => {
            Play()
        })
    }


}

const btn_pausar_letra_sincronizar = document.getElementById('btn_pausar_letra_sincronizar')
btn_pausar_letra_sincronizar.addEventListener('click', () => {
    if(!Musica_Pausada) {
        Pausar()
    } else {
        Play()
    }
})

btn_pausar_letra_sincronizar.addEventListener('keydown', (key) => {
    key.preventDefault()
})

const btn_duplo_down_sincronizar = document.getElementById('btn_duplo_down_sincronizar')
btn_duplo_down_sincronizar.addEventListener('click', () => {
    Avancar_Uma_Linha('Shift')
})

btn_duplo_down_sincronizar.addEventListener('keydown', (key) => {
    key.preventDefault()
})


const btn_down_sincronizar = document.getElementById('btn_down_sincronizar')
btn_down_sincronizar.addEventListener('click', () => {
    Avancar_Uma_Linha('Click')
})


btn_down_sincronizar.addEventListener('keydown', (key) => {
    key.preventDefault()
})

function Avancar_Uma_Linha(Key_Press) {
    array_historico_keys_add_letra.push(Key_Press)

    let linhas = preElemento.innerText.split('\n')
    try {
        if(Key_Press == 'Shift' && linhas[linha_atual_sincronizar].trim() == '' && linha_atual_sincronizar + 1 < linhas.length) {
            Destacar_linhas_Sincronizar()
            array_tempo_letra_sincronizar.push(audio_player.currentTime)
    
            Destacar_linhas_Sincronizar()
            array_tempo_letra_sincronizar.push(audio_player.currentTime)
    
        } else {
            Destacar_linhas_Sincronizar()
            array_tempo_letra_sincronizar.push(audio_player.currentTime)
        }   
    } catch(e) {
        console.error(e)
        Destacar_linhas_Sincronizar()
        array_tempo_letra_sincronizar.push(audio_player.currentTime)
    }
}

document.addEventListener('keydown', (key) => {
    if(adicionando_letra_na_musica) {

        if(key.key == 'Enter') {
            Avancar_Uma_Linha('Enter')
    
        } else if(key.key == 'Shift') {
            Avancar_Uma_Linha('Shift')

        } else if(key.key == 'Backspace') {
            Voltar_Uma_Linha()
        }
    }
})

function Salvar_Letra() {
    if(pode_salvar_letra) {
        let feito = false
        let letra_add = false

        db.collection('Musicas').get().then((snapshot) => {
            snapshot.docs.forEach(Musicas_firebase => {
                TodasMusicas = Musicas_firebase.data().Musicas
    
                if(!feito) {
                    feito = true

                    for (let c = 0; c < TodasMusicas.length; c++) {
                        if(TodasMusicas[c].ID == musica_editando_meu_perfil.ID && !letra_add) {
                            letra_add = true
                            TodasMusicas[c].Letra = {
                                Letra_Musica: text_area_add_letra.value,
                                Tempo_Sincronizado: array_tempo_letra_sincronizar,
                                Data: getDataAtual()
                            }

                            let pontos = text_area_add_letra.value.split('\n').length
                            User.Loja.Pontos += pontos

                            db.collection('Musicas').doc(Musicas_firebase.id).update({Musicas: TodasMusicas}).then(() => {
                                db.collection('Users').doc(User.ID).update({ Loja: User.Loja }).then(() => {
                                    Notificar_Infos(`Parabéns! 🎉 Você adicionou uma nova letra de música 🎶 e ganhou ${pontos} pontos na sua conta! ✨ Esses pontos poderão ser trocados por brindes na loja 🛍️ futuramente. Continue assim! 🏆🙌`, 'Emojis:💸, 🏆, 🙌, 🛍️')
                                    Volume(Volume_Antigo, input_volume_pc)
                                    Atualizar_Infos_Perfil_Loja()
                                    Fechar_Add_Letra()
                                })
                            })

                            break
                        }
                    }
                }
            })
        })
    }
}

//! Mostrar letra na tela -------------------------------------------------
const pre_letra_da_musica = document.getElementById('pre_letra_da_musica')
const pre_letra_fullscreen = document.getElementById('pre_letra_fullscreen')
const pre_letra_cell = document.getElementById('pre_letra_cell')
let linha_atual = -1
let letra_pre_ver_letra = ''

function Voltar_Letra_Ver_Musica(index) {
    index = parseInt(index)
    audio_player.currentTime = Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado[index]
    linha_atual = index
    Atualizar_Linha_Letra_Input()
}

let pode_atualizar_letra_fullscreen = false
function Destacar_linhas() {
    if(linha_atual == -1 || linha_atual == 0) {
        Pagina_verletra.classList.add('Tem_Letra')
        pre_letra_da_musica.style.padding = '500px 10px 500px'
    }
    
    // let duracao_transicao = 50

    if(Device.Tipo != 'Mobile') {
        if(pd_atualizar_letra_pc) {
            pre_letra_da_musica.innerHTML = Listas_Prox.MusicaAtual.Letra.Letra_Musica
            letra_pre_ver_letra = pre_letra_da_musica.innerText.split('\n')
            let linhas = pre_letra_da_musica.innerHTML.split('\n')
            let duracao_transicao = 1
            
            if (linha_atual <= linhas.length) {
                // Atualiza a linha atual com a classe 'linha_pre_em_destaque'
                for (let c = 0; c < linhas.length; c++) {
                    if(c == linha_atual) {
                        duracao_transicao = Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado[c + 1] - Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado[c]
                        duracao_transicao = duracao_transicao * 1000

                        linhas[c] = '<span class="linha_pre_em_destaque_add_letra" id="linha_atual_sincronizar_ver_letra">' + letra_pre_ver_letra[c] + '</span>'

                    } else if(c < linha_atual) {
                        linhas[c] = `<span class="linha_pre_anterior_add_letra" onclick="Voltar_Letra_Ver_Musica(${c})">` + letra_pre_ver_letra[c] + '</span>'
                    } else {
                        if(c == 0) {
                            linhas[c] = `<span class="linha_pre_posterior_add_letra" onclick="Voltar_Letra_Ver_Musica(${c})" id="linha_atual_sincronizar_ver_letra">` + letra_pre_ver_letra[c] + '</span>'
                        } else {
                            linhas[c] = `<span class="linha_pre_posterior_add_letra" onclick="Voltar_Letra_Ver_Musica(${c})">` + letra_pre_ver_letra[c] + '</span>'
                        }
                    }
                }

                // Atualiza o conteúdo do <pre> com as linhas modificadas
                pre_letra_da_musica.innerHTML = ''
                let Tem_Traducao = false
                for (let a = 0; a < linhas.length; a++) {
                    if(Checar_Tem_Traducao(Listas_Prox.MusicaAtual) && Traducao_Ativa) {
                        Tem_Traducao = true
                        let Traducao_Musica

                        for (let b = 0; b < Listas_Prox.MusicaAtual.Letra.Traducao.length; b++) {
                            if(Listas_Prox.MusicaAtual.Letra.Traducao[b].Idioma == Idioma_User()) {
                                Traducao_Musica = Listas_Prox.MusicaAtual.Letra.Traducao[b].Traducao.split('\n')

                                break
                            }
                        }

                        const div_container_letra_traducao = document.createElement('div')
                        div_container_letra_traducao.classList.add('div_container_letra_traducao')

                        if(a == linha_atual) {
                            div_container_letra_traducao.classList.add('Active')
                            div_container_letra_traducao.id = 'Div_Atual_Sincronizar_Letra'
                        } else {
                            div_container_letra_traducao.classList.remove('Active')
                        }

                        div_container_letra_traducao.innerHTML = `${linhas[a]} <p class="linha_pre_traducao_add_letra">${Traducao_Musica[a]}</p>`
                        pre_letra_da_musica.appendChild(div_container_letra_traducao)


                    } else {
                        pre_letra_da_musica.innerHTML += linhas[a] + '\n'
                    }

                }

                if(Infos_Desempenho.Niveis_Desempenho < 3 && User.Configuracoes.Animacao_Detalhada) {
                    const text = document.getElementById('linha_atual_sincronizar_ver_letra')
                    const letters = text.textContent.split('')
                    text.innerHTML = ''

                    const tempoPorLetra = duracao_transicao / letters.length - 7

                    letters.forEach((letter, index) => {
                        const span = document.createElement('span')
                        if (letter === ' ' && text.lastElementChild) {
                            text.lastElementChild.textContent += letter
                        } else {
                            span.textContent = letter
                            span.className = 'animated-span'
                            text.appendChild(span)
                        }                        
                    })

                    let contador_animacoes = 0
                    function Animar() {
                        if(contador_animacoes < letters.length && !audio_player.paused) {
                            try {
                                text.getElementsByTagName('span')[contador_animacoes].classList.add('animated')
                                contador_animacoes++

                                setTimeout(() => {
                                    Animar()
                                }, tempoPorLetra)
                            } catch (error) {
                                
                            }
                        }
                    } Animar()

                    audio_player.addEventListener('play', () => {
                        Animar()
                    })
                } else {
                    const text = document.getElementById('linha_atual_sincronizar_ver_letra')
                    const span = document.createElement('span')
                    span.innerText = text.innerText
                    span.className = 'animated-span'
                    text.innerHTML = ''
                    text.appendChild(span)
                    setTimeout(() => {
                        span.classList.add('animated')
                    }, 100)
                }
                //? Faz o scroll para a linha atual
                try {
                    if(Tem_Traducao) {
                        document.getElementById('Div_Atual_Sincronizar_Letra').scrollIntoView({ behavior: 'smooth', block: 'center' })
                        
                    } else {
                        document.getElementById('linha_atual_sincronizar_ver_letra').scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                } catch{}
            }
        } else if(pode_atualizar_letra_tela_tocando_agora) {
            pre_letra_tocando_agora.innerHTML = Listas_Prox.MusicaAtual.Letra.Letra_Musica
            letra_pre_ver_letra = pre_letra_tocando_agora.innerText.split('\n')
            let linhas = pre_letra_tocando_agora.innerHTML.split('\n')
            let duracao_transicao = 1
            
            if (linha_atual <= linhas.length) {
                // Atualiza a linha atual com a classe 'linha_pre_em_destaque'
                for (let c = 0; c < linhas.length; c++) {
                    if(c == linha_atual) {
                        try {
                            duracao_transicao = Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado[c + 1] - Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado[c]
                            duracao_transicao = duracao_transicao * 1000
                            
                        } catch (error) {
                            console.warn('Erro calcular o tempo de transação das letras: ' + error)
                        }

                        linhas[c] = '<span class="linha_pre_em_destaque_add_letra" id="linha_atual_sincronizar_aba_musica_tocando_agora">' + letra_pre_ver_letra[c] + '</span>'
                    } else if(c < linha_atual) {
                        linhas[c] = `<span class="linha_pre_anterior_add_letra" onclick="Voltar_Letra_Ver_Musica(${c})">` + letra_pre_ver_letra[c] + '</span>'
                    } else {
                        if(c == 0) {
                            linhas[c] = `<span class="linha_pre_posterior_add_letra" onclick="Voltar_Letra_Ver_Musica(${c})" id="linha_atual_sincronizar_aba_musica_tocando_agora">` + letra_pre_ver_letra[c] + '</span>'
                        } else {
                            linhas[c] = `<span class="linha_pre_posterior_add_letra" onclick="Voltar_Letra_Ver_Musica(${c})">` + letra_pre_ver_letra[c] + '</span>'
                        }
                    }
                }

                // Atualiza o conteúdo do <pre> com as linhas modificadas
                pre_letra_tocando_agora.innerHTML = ''
                for (let a = 0; a < linhas.length; a++) {
                    if(Checar_Tem_Traducao(Listas_Prox.MusicaAtual) && Traducao_Ativa) {                        
                        let Traducao_Musica

                        for (let b = 0; b < Listas_Prox.MusicaAtual.Letra.Traducao.length; b++) {
                            if(Listas_Prox.MusicaAtual.Letra.Traducao[b].Idioma == Idioma_User()) {
                                Traducao_Musica = Listas_Prox.MusicaAtual.Letra.Traducao[b].Traducao.split('\n')

                                break
                            }
                        }

                        const div_container_letra_traducao = document.createElement('div')
                        div_container_letra_traducao.classList.add('div_container_letra_traducao')

                        if(a == linha_atual) {
                            div_container_letra_traducao.classList.add('Active')
                        } else {
                            div_container_letra_traducao.classList.remove('Active')
                        }

                        div_container_letra_traducao.innerHTML = `${linhas[a]} <p class="linha_pre_traducao_add_letra">${Traducao_Musica[a]}</p>`
                        pre_letra_tocando_agora.appendChild(div_container_letra_traducao)


                    } else {
                        pre_letra_tocando_agora.innerHTML += linhas[a] + '\n'
                    }

                }

                if(Infos_Desempenho.Niveis_Desempenho < 3 && User.Configuracoes.Animacao_Detalhada) {
                    const text = document.getElementById('linha_atual_sincronizar_aba_musica_tocando_agora')                        
                    const letters = text.textContent.split('')
                    text.innerHTML = ''

                    const tempoPorLetra = duracao_transicao / letters.length  - 7

                    text.innerHTML = ''

                    letters.forEach((letter, index) => {
                        const span = document.createElement('span')
                        if (letter === ' ' && text.lastElementChild) {
                            text.lastElementChild.textContent += letter
                        } else {
                            span.textContent = letter
                            span.className = 'animated-span'
                            text.appendChild(span)
                        }                        
                    })

                    let contador_animacoes = 0
                    function Animar() {
                        if(contador_animacoes < letters.length && !audio_player.paused) {
                            try {
                                text.getElementsByTagName('span')[contador_animacoes].classList.add('animated')
                                contador_animacoes++

                                setTimeout(() => {
                                    Animar()
                                }, tempoPorLetra)
                            } catch (error) {
                                
                            }
                        }
                    } Animar()

                    audio_player.addEventListener('play', () => {
                        Animar()
                    })
                } else {
                    const text = document.getElementById('linha_atual_sincronizar_aba_musica_tocando_agora')
                    const span = document.createElement('span')
                    span.innerText = text.innerText
                    span.className = 'animated-span'
                    text.innerHTML = ''
                    text.appendChild(span)
                    setTimeout(() => {
                        span.classList.add('animated')
                    }, 100)
                }
                //? Faz o scroll para a linha atual
                try {
                    document.getElementById('linha_atual_sincronizar_aba_musica_tocando_agora').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
                } catch{}
                
            }

        } else if(pode_atualizar_letra_fullscreen) {
            pre_letra_fullscreen.innerHTML = Listas_Prox.MusicaAtual.Letra.Letra_Musica
            letra_pre_ver_letra = pre_letra_fullscreen.innerText.split('\n')
            let linhas = pre_letra_fullscreen.innerHTML.split('\n')
            let duracao_transicao = 1
            
            if (linha_atual <= linhas.length) {
                // Atualiza a linha atual com a classe 'linha_pre_em_destaque'
                for (let c = 0; c < linhas.length; c++) {
                    if(c == linha_atual) {
                        duracao_transicao = Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado[c + 1] - Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado[c]
                        duracao_transicao = duracao_transicao * 1000

                        linhas[c] = '<span class="linha_pre_em_destaque_add_letra" id="linha_atual_sincronizar_fullscreen">' + letra_pre_ver_letra[c] + '</span>'
                    } else if(c < linha_atual) {
                        linhas[c] = `<span class="linha_pre_anterior_add_letra" onclick="Voltar_Letra_Ver_Musica(${c})">` + letra_pre_ver_letra[c] + '</span>'
                    } else {
                        if(c == 0) {
                            linhas[c] = `<span class="linha_pre_posterior_add_letra" onclick="Voltar_Letra_Ver_Musica(${c})" id="linha_atual_sincronizar_fullscreen">` + letra_pre_ver_letra[c] + '</span>'
                        } else {
                            linhas[c] = `<span class="linha_pre_posterior_add_letra" onclick="Voltar_Letra_Ver_Musica(${c})">` + letra_pre_ver_letra[c] + '</span>'
                        }
                    }
                }

                // Atualiza o conteúdo do <pre> com as linhas modificadas
                pre_letra_fullscreen.innerHTML = ''
                for (let a = 0; a < linhas.length; a++) {
                    if(Checar_Tem_Traducao(Listas_Prox.MusicaAtual) && Traducao_Ativa) {                        
                        let Traducao_Musica

                        for (let b = 0; b < Listas_Prox.MusicaAtual.Letra.Traducao.length; b++) {
                            if(Listas_Prox.MusicaAtual.Letra.Traducao[b].Idioma == Idioma_User()) {
                                Traducao_Musica = Listas_Prox.MusicaAtual.Letra.Traducao[b].Traducao.split('\n')

                                break
                            }
                        }

                        const div_container_letra_traducao = document.createElement('div')
                        div_container_letra_traducao.classList.add('div_container_letra_traducao')

                        if(a == linha_atual) {
                            div_container_letra_traducao.classList.add('Active')
                        } else {
                            div_container_letra_traducao.classList.remove('Active')
                        }

                        div_container_letra_traducao.innerHTML = `${linhas[a]} <p class="linha_pre_traducao_add_letra">${Traducao_Musica[a]}</p>`
                        pre_letra_fullscreen.appendChild(div_container_letra_traducao)


                    } else {
                        pre_letra_fullscreen.innerHTML += linhas[a] + '\n'
                    }

                }

                if(Infos_Desempenho.Niveis_Desempenho < 3 && User.Configuracoes.Animacao_Detalhada) {

                    const text = document.getElementById('linha_atual_sincronizar_fullscreen')
                    const letters = text.textContent.split('')
                    text.innerHTML = ''

                    const tempoPorLetra = duracao_transicao / letters.length  - 12

                    letters.forEach((letter, index) => {
                        const span = document.createElement('span')
                        if (letter === ' ' && text.lastElementChild) {
                            text.lastElementChild.textContent += letter
                        } else {
                            span.textContent = letter
                            span.className = 'animated-span'
                            text.appendChild(span)
                        }                        
                    })

                    let contador_animacoes = 0
                    function Animar() {
                        if(contador_animacoes < letters.length && !audio_player.paused) {
                            try {
                                text.getElementsByTagName('span')[contador_animacoes].classList.add('animated')
                                contador_animacoes++

                                setTimeout(() => {
                                    Animar()
                                }, tempoPorLetra)
                            } catch (error) {
                                
                            }
                        }
                    } Animar()

                    audio_player.addEventListener('play', () => {
                        Animar()
                    })
                } else {
                    const text = document.getElementById('linha_atual_sincronizar_fullscreen')
                    const span = document.createElement('span')
                    span.innerText = text.innerText
                    span.className = 'animated-span'
                    text.innerHTML = ''
                    text.appendChild(span)
                    setTimeout(() => {
                        span.classList.add('animated')
                    }, 100)
                }
                //? Faz o scroll para a linha atual
                try {
                    document.getElementById('linha_atual_sincronizar_fullscreen').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
                } catch{}
                
            }
        }
    } else {
        if(letre_cell_aberta) {
            pre_letra_cell.innerHTML = Listas_Prox.MusicaAtual.Letra.Letra_Musica
            letra_pre_ver_letra = pre_letra_cell.innerText.split('\n')
            let linhas = pre_letra_cell.innerHTML.split('\n')
            
            if (linha_atual <= linhas.length) {
                // Atualiza a linha atual com a classe 'linha_pre_em_destaque'
                for (let c = 0; c < linhas.length; c++) {
                    if(c == linha_atual) {
                        linhas[c] = '<span class="linha_pre_em_destaque_cell" id="linha_atual_sincronizar_cell">' + letra_pre_ver_letra[c] + '</span>'
                    } else if(c < linha_atual) {
                        linhas[c] = `<span class="linha_pre_anterior_cell" onclick="Voltar_Letra_Ver_Musica(${c})">` + letra_pre_ver_letra[c] + '</span>'
                    } else {
                        if(c == 0) {
                            linhas[c] = `<span class="linha_pre_posterior_cell" onclick="Voltar_Letra_Ver_Musica(${c})" id="linha_atual_sincronizar_cell">` + letra_pre_ver_letra[c] + '</span>'
                        } else {
                            linhas[c] = `<span class="linha_pre_posterior_cell" onclick="Voltar_Letra_Ver_Musica(${c})">` + letra_pre_ver_letra[c] + '</span>'
                        }
                    }
                }

                // Atualiza o conteúdo do <pre> com as linhas modificadas
                pre_letra_cell.innerHTML = ''
                for (let a = 0; a < linhas.length; a++) {
                    if(Checar_Tem_Traducao(Listas_Prox.MusicaAtual) && Traducao_Ativa) {                        
                        let Traducao_Musica

                        for (let b = 0; b < Listas_Prox.MusicaAtual.Letra.Traducao.length; b++) {
                            if(Listas_Prox.MusicaAtual.Letra.Traducao[b].Idioma == Idioma_User()) {
                                Traducao_Musica = Listas_Prox.MusicaAtual.Letra.Traducao[b].Traducao.split('\n')

                                break
                            }
                        }

                        const div_container_letra_traducao = document.createElement('div')
                        div_container_letra_traducao.classList.add('div_container_letra_traducao')

                        if(a == linha_atual) {
                            div_container_letra_traducao.classList.add('Active')
                        } else {
                            div_container_letra_traducao.classList.remove('Active')
                        }

                        div_container_letra_traducao.innerHTML = `${linhas[a]} <p class="linha_pre_traducao_add_letra">${Traducao_Musica[a]}</p>`
                        pre_letra_cell.appendChild(div_container_letra_traducao)


                    } else {
                        pre_letra_cell.innerHTML += linhas[a] + '\n'
                    }

                }

                const text = document.getElementById('linha_atual_sincronizar_cell')
                const span = document.createElement('span')
                span.innerText = text.innerText
                span.className = 'animated-span'
                text.innerHTML = ''
                text.appendChild(span)
                setTimeout(() => {
                    span.classList.add('animated')
                }, 100)
                //? Faz o scroll para a linha atual
                try {
                    document.getElementById('linha_atual_sincronizar_cell').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
                } catch{}
                
            }
        }

        //! ------------------------------
        // if(letre_cell_aberta) {
        //     pre_letra_cell.innerHTML = Listas_Prox.MusicaAtual.Letra.Letra_Musica
        //     letra_pre_ver_letra = pre_letra_cell.innerText.split('\n')
        //     let linhas = pre_letra_cell.innerHTML.split('\n')
        //     let duracao_transicao = 1
            
        //     if (linha_atual <= linhas.length) {
        //         // Atualiza a linha atual com a classe 'linha_pre_em_destaque'
        //         for (let c = 0; c < linhas.length; c++) {
        //             if(c == linha_atual) {
        //                 try {
        //                     duracao_transicao = Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado[c + 1] - Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado[c]
        //                     duracao_transicao = duracao_transicao * 1000
                            
        //                 } catch (error) {
        //                     console.warn('Erro calcular o tempo de transação das letras: ' + error)
        //                 }

        //                 linhas[c] = '<span class="linha_pre_em_destaque_cell" id="linha_atual_sincronizar_cell">' + letra_pre_ver_letra[c] + '</span>'
        //             } else if(c < linha_atual) {
        //                 linhas[c] = `<span class="linha_pre_anterior_cell" onclick="Voltar_Letra_Ver_Musica(${c})">` + letra_pre_ver_letra[c] + '</span>'
        //             } else {
        //                 if(c == 0) {
        //                     linhas[c] = `<span class="linha_pre_posterior_cell" onclick="Voltar_Letra_Ver_Musica(${c})" id="linha_atual_sincronizar_cell">` + letra_pre_ver_letra[c] + '</span>'
        //                 } else {
        //                     linhas[c] = `<span class="linha_pre_posterior_cell" onclick="Voltar_Letra_Ver_Musica(${c})">` + letra_pre_ver_letra[c] + '</span>'
        //                 }
        //             }
        //         }

        //         // Atualiza o conteúdo do <pre> com as linhas modificadas
        //         pre_letra_cell.innerHTML = ''
        //         for (let a = 0; a < linhas.length; a++) {
        //             if(Checar_Tem_Traducao(Listas_Prox.MusicaAtual) && Traducao_Ativa) {                        
        //                 let Traducao_Musica

        //                 for (let b = 0; b < Listas_Prox.MusicaAtual.Letra.Traducao.length; b++) {
        //                     if(Listas_Prox.MusicaAtual.Letra.Traducao[b].Idioma == Idioma_User()) {
        //                         Traducao_Musica = Listas_Prox.MusicaAtual.Letra.Traducao[b].Traducao.split('\n')

        //                         break
        //                     }
        //                 }

        //                 const div_container_letra_traducao = document.createElement('div')
        //                 div_container_letra_traducao.classList.add('div_container_letra_traducao')

        //                 if(a == linha_atual) {
        //                     div_container_letra_traducao.classList.add('Active')
        //                 } else {
        //                     div_container_letra_traducao.classList.remove('Active')
        //                 }

        //                 div_container_letra_traducao.innerHTML = `${linhas[a]} <p class="linha_pre_traducao_add_letra">${Traducao_Musica[a]}</p>`
        //                 pre_letra_fullscreen.appendChild(div_container_letra_traducao)


        //             } else {
        //                 pre_letra_fullscreen.innerHTML += linhas[a] + '\n'
        //             }

        //         }
                

        //         if(Infos_Desempenho.Niveis_Desempenho < 3 && User.Configuracoes.Animacao_Detalhada) {
        //             const text = document.getElementById('linha_atual_sincronizar_cell')                        
        //             const letters = text.textContent.split('')
        //             text.innerHTML = ''

        //             const tempoPorLetra = duracao_transicao / letters.length  - 7

        //             text.innerHTML = ''

        //             letters.forEach((letter, index) => {
        //                 const span = document.createElement('span')
        //                 if (letter === ' ' && text.lastElementChild) {
        //                     text.lastElementChild.textContent += letter
        //                 } else {
        //                     span.textContent = letter
        //                     span.className = 'animated-span'
        //                     text.appendChild(span)
        //                 }                        
        //             })

        //             let contador_animacoes = 0
        //             function Animar() {
        //                 if(contador_animacoes < letters.length && !audio_player.paused) {
        //                     try {
        //                         text.getElementsByTagName('span')[contador_animacoes].classList.add('animated')
        //                         contador_animacoes++

        //                         setTimeout(() => {
        //                             Animar()
        //                         }, tempoPorLetra)
        //                     } catch (error) {
                                
        //                     }
        //                 }
        //             } Animar()

        //             audio_player.addEventListener('play', () => {
        //                 Animar()
        //             })
        //         } else {
        //             const text = document.getElementById('linha_atual_sincronizar_cell')
        //             const span = document.createElement('span')
        //             span.innerText = text.innerText
        //             span.className = 'animated-span'
        //             text.innerHTML = ''
        //             text.appendChild(span)
        //             setTimeout(() => {
        //                 span.classList.add('animated')
        //             }, 100)
        //         }
        //         //? Faz o scroll para a linha atual
        //         try {
        //             document.getElementById('linha_atual_sincronizar_cell').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
        //         } catch{}
                
        //     }
        // }
    }
}

let pd_atualizar_letra_pc = false
let pagina_anterior_ver_letra = {
    Nome: '',
    ID: ''
}

let reabrir_letra_aba_musica_tocando_agora = false
let letra_pc_aberta = false
function Abrir_Ver_Letra_PC(id_musica=undefined) {

    if(!letra_pc_aberta) {
        letra_pc_aberta = true
        if(pode_atualizar_letra_tela_tocando_agora) {
            Fechar_Letra_Tela_Tocando_Agora('Reabrir')
        }

        pagina_anterior_ver_letra.Nome = Pagina_Atual.Nome
        pagina_anterior_ver_letra.ID = Pagina_Atual.ID

        let musica_do_musica_id = Listas_Prox.MusicaAtual

        if(id_musica) {
            for (let c = 0; c < TodasMusicas.length; c++) {
                if(TodasMusicas[c].ID == id_musica) {
                    musica_do_musica_id = TodasMusicas[c]
                    break
                }
            }
        }

        Abrir_Pagina('verletra', musica_do_musica_id.ID)
        Montar_Cores_Na_Tela(musica_do_musica_id)

        if(musica_do_musica_id.Cores.length > 0) {
            
            Atualizar_Cores_Partes_Site()
            Adicionar_Opacidade_Das_Cores_Fundo_Interativo()
            animateBackgroundColor(Listas_Prox.MusicaAtual.Cores[2], document.getElementById('background_ver_letra'), 500, true)
            if(corEhClara(Listas_Prox.MusicaAtual.Cores[2])) {
                document.getElementById('pre_letra_da_musica').classList.add('Dark')
            } else {
                document.getElementById('pre_letra_da_musica').classList.remove('Dark')
            }
        }

        document.querySelector('main').style.overflow = 'hidden'

        pd_atualizar_letra_pc = true

        if(!Array.isArray(musica_do_musica_id.Letra)) {
            pre_letra_da_musica.innerHTML = musica_do_musica_id.Letra.Letra_Musica
            letra_pre_ver_letra = pre_letra_da_musica.innerText.split('\n')

            if(linha_atual == -1) {
                Destacar_linhas()
            } else if (linha_atual == 0) {
                linha_atual = -1
                Destacar_linhas()
            }

        } else {
            Zerar_Ver_Letra_Pc()
        }

        setTimeout(() => {
            Atualizar_Linha_Letra_Input()
        }, 500)

    } else {
        pd_atualizar_letra_pc = false
        Fechar_Ver_Letra_PC()
    }
}

function Fechar_Ver_Letra_PC(Comando='') {
    letra_pc_aberta = false
    if(reabrir_letra_aba_musica_tocando_agora && !Comando.includes('Não Abrir Letra Tela Tocando Agora')) {
        Mostrar_Letra_Tela_Tocando_Agora()
    }

    if(pagina_anterior_ver_letra.ID != 'verletra_undefined') {
        Abrir_Pagina(pagina_anterior_ver_letra.Nome, pagina_anterior_ver_letra.ID)
    } else {
        Abrir_Pagina('home', '')
    }

    if(Listas_Prox.MusicaAtual.Cores.length > 0) {
        Atualizar_Cores_Partes_Site()
    }
    
    if(!User.Configuracoes.Background.Cores_Solidas) {
        animateBackgroundColor('transparent', lista_elementos_mudar_cor_letra, 1500)
        animateBackgroundColor('#2e31333f', document.querySelector('nav').querySelectorAll('ul'), 1500)

    } else {
        animateBackgroundColor('#121212', document.querySelector('main'), 500, true)
    }
    document.querySelector('main').style.overflow = 'auto'

    Remover_Opacidade_Das_Cores_Fundo_Interativo()

    if(User.Configuracoes.Tema == 'Claro') {
        mudarTemaParaClaro()
    }

    img_btn_mic_letra.forEach(element => {
        if(!Array.isArray(Listas_Prox.MusicaAtual.Letra)) {
            element.style.display = 'block'

        } else if(!pd_atualizar_letra_pc) {
            element.style.display = 'none'
        }
    })
}

function Zerar_Ver_Letra_Pc() {
    pre_letra_da_musica.style.padding = '0px 10px 0px'
    Pagina_verletra.classList.remove('Tem_Letra')
    pre_letra_da_musica.innerHTML = '<h1 id="linha_atual_sincronizar_ver_letra">Ainda não aprendi essa :(</h1>'
    try {
        document.getElementById('linha_atual_sincronizar_ver_letra').scrollIntoView({ behavior: 'smooth', block: 'center' })
    } catch{}
    linha_atual = -1
}

// Variáveis para armazenar os valores antigos
let valores_antigos = {
    pode_atualizar_letra_tela_tocando_agora: false,
    pd_atualizar_letra_pc: false
}

function Pausar_Atualizar_Letra() {
    valores_antigos.pode_atualizar_letra_tela_tocando_agora = pode_atualizar_letra_tela_tocando_agora
    valores_antigos.pd_atualizar_letra_pc = pd_atualizar_letra_pc

    pode_atualizar_letra_tela_tocando_agora = false
    pd_atualizar_letra_pc = false
}

function Despausar_Atualizar_Letra() {
    pode_atualizar_letra_tela_tocando_agora = valores_antigos.pode_atualizar_letra_tela_tocando_agora
    pd_atualizar_letra_pc = valores_antigos.pd_atualizar_letra_pc
}

let info_dada_nao_aprendi = false
function Atualizar_Letra_PC() {
    if(!Array.isArray(Listas_Prox.MusicaAtual.Letra)) {
        if(pd_atualizar_letra_pc || pode_atualizar_letra_tela_tocando_agora || pode_atualizar_letra_fullscreen || letre_cell_aberta) {
            info_dada_nao_aprendi = false
            let Tempo = Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado

            if(audio_player.currentTime + 0.30 >= parseFloat(Tempo[linha_atual + 1])) {
                linha_atual++
                Destacar_linhas()
            }
        }
    } else if(!info_dada_nao_aprendi) {
        info_dada_nao_aprendi = true
        Zerar_Ver_Letra_Pc()
    }
}

let atualizando_linha_dnv = false
function Atualizar_Linha_Letra_Input() {
    if(!Array.isArray(Listas_Prox.MusicaAtual.Letra)) {
        let time_atual = audio_player.currentTime
        let Tempo = Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado
    
        for (let c = 0; c < Tempo.length; c++) {
            if(time_atual + 0.30 >= Tempo[c] && time_atual < Tempo[c + 1]) {
                linha_atual = c
                Destacar_linhas()
                try {
                    document.getElementById('linha_atual_sincronizar_ver_letra').scrollIntoView({ behavior: 'smooth', block: 'center' })
                } catch{}
                break
            } else if(time_atual + 0.30 < Tempo[c] && time_atual < Tempo[c + 1]) {
                linha_atual = -1
                Destacar_linhas()
                try {
                    document.getElementById('linha_atual_sincronizar_ver_letra').scrollIntoView({ behavior: 'smooth', block: 'center' })
                } catch{}
            }
        }
    }
}

//! Letra Fullscreen
function Abrir_Ver_Letra_FullScreen() {
    if(pode_atualizar_letra_fullscreen) {
        Fechar_Ver_Letra_FullScreen()

    } else {
        pode_atualizar_letra_fullscreen = true
        pre_letra_fullscreen.innerHTML = ''
        document.getElementById('letra_fullscreen').style.display = 'block'
    }
}

function Fechar_Ver_Letra_FullScreen() {
    pode_atualizar_letra_fullscreen = false
    document.getElementById('letra_fullscreen').style.display = 'none'
}

//! Cell -----------------------
const btn_mostrar_letra_cell = document.getElementById('btn_mostrar_letra_cell')
const container_letra_cell = document.getElementById('container_letra_cell')
btn_mostrar_letra_cell.addEventListener('click', () => {
    if(Device.Tipo == 'Mobile') {
        if(!letre_cell_aberta) {
            Mostrar_Letra_Cell()
        } else {
            Fechar_Letra_Cell()
        }
    } else {
        Fechar_Letra_Cell()
    }
})

function Mostrar_Letra_Cell() {
    letre_cell_aberta = true
    container_letra_cell.style.height = '350px'
    btn_mostrar_letra_cell.innerText = 'Fechar Letra'
    
    pre_letra_cell.innerHTML = Listas_Prox.MusicaAtual.Letra.Letra_Musica
}

function Fechar_Letra_Cell() {
    letre_cell_aberta = false
    container_letra_cell.style.height = '48px'
    btn_mostrar_letra_cell.innerText = 'Mostrar Letra'
}

//* Traducao 
Icon_Traduzin.forEach(element => {
    element.addEventListener('click', () => {
        Traducao_Ativa = !Traducao_Ativa

        if(Traducao_Ativa) {
            element.classList.add('Active')
            element.querySelector('img').src = 'Assets/Imgs/Tradutor_Active.svg'
        } else {
            element.classList.remove('Active')       
            element.querySelector('img').src = 'Assets/Imgs/Tradutor.svg'
        }
    })
})

function Checar_Tem_Traducao(Musica) {
    let Tem_Traducao = false
    if(Musica.Letra.Traducao) {
        for (let c = 0; c < Musica.Letra.Traducao.length; c++) {
            if(Musica.Letra.Traducao[c].Idioma == Idioma_User()) {
                Tem_Traducao = true
                Icon_Traduzin.forEach(element => {
                    element.style.display = 'flex'
                })
                break
            }
        }
    }

    if(!Tem_Traducao) {
        Icon_Traduzin.forEach(element => {
            element.style.display = 'none'
        })
    }

    return Tem_Traducao
}