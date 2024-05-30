const text_area_add_letra = document.getElementById('text_area_add_letra')
const btn_pesquisar_letra_add = document.getElementById('btn_pesquisar_letra_add')
const preElemento = document.getElementById('local_letra_musica_sincronizar')
const bnt_salvar_letra = document.getElementById('bnt_salvar_letra')
const Btn_Proximo_aAdd_Letra = document.getElementById('Btn_Proximo_aAdd_Letra')
let adicionando_letra_na_musica = false
let pode_salvar_letra = false
const lista_elementos_mudar_cor_letra = [document.querySelector('main'), document.getElementById('container_fila'), document.getElementById('container_barra_musica')]

let linha_atual_sincronizar = 0 
let array_tempo_letra_sincronizar = []

document.getElementById('btn_adicionar_letra_musica_sendo_editada').addEventListener('click', () => {
    Fechar_Container_Editar_Musicas()
    btn_pesquisar_letra_add.href = `https://www.musixmatch.com/es/busqueda?query=${`${Separar_Por_Virgula(musica_editando_meu_perfil.Autor)[0]} ${musica_editando_meu_perfil.Nome}`}`
    btn_pesquisar_letra_add.addEventListener('click', () => {
        sairDaTelaCheia()
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
    }, 1000)
}

function Checar_Proximo_Add_Letra() {
    const lista_palavras_remover = ['verse', 'pre-chorus', 'chorus', 'hook', 'verse', 'pre-chorus', 'outro']
    text_area_add_letra.value = removerPalavrasSozinha(lista_palavras_remover, text_area_add_letra.value)

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
}

//! Sincronizar
const container_btn_comecar_sincronizar_letra = document.getElementById('container_btn_comecar_sincronizar_letra')
const btn_iniciar_sincronizar = document.getElementById('btn_iniciar_sincronizar')

function Iniciar_Sincronizar_Letra() {
    container_btn_comecar_sincronizar_letra.style.bottom = '-100vh'
    container_btns_add_letra_segunda_parte.style.bottom = '30px'
    adicionando_letra_na_musica = true

    Contagem_Regressiva()
}

btn_iniciar_sincronizar.addEventListener('click', () => {
    Iniciar_Sincronizar_Letra()
})

btn_iniciar_sincronizar.addEventListener('keydown', (event) => {
    event.preventDefault()
})

const container_contagem_regressiva_add_letra = document.getElementById('container_contagem_regressiva_add_letra')
const h1_contagem_regressiva_add_letra = document.getElementById('h1_contagem_regressiva_add_letra')
let volume_antigo = 100
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
                            volume_antigo = Volume_Atual

                            if(volume_antigo < 20) {
                                Volume(100)
                            }

                            Tocar_Musica([musica_editando_meu_perfil], musica_editando_meu_perfil, 'Não Ativar Música, Pausar Ao Finalizar', `adicionarletra${musica_editando_meu_perfil.ID}`, 'adicionarletra')

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
        if (linha_atual_sincronizar > linhas.length) {
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

const btn_up_sincronizar = document.getElementById('btn_up_sincronizar')
btn_up_sincronizar.addEventListener('click', () => {
    Voltar_Uma_Linha()
})

btn_up_sincronizar.addEventListener('keydown', (key) => {
    key.preventDefault()
})

let array_historico_keys_add_letra = []
function Voltar_Uma_Linha() {
    let linhas = preElemento.innerText.split('\n')

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
        console.log(key.key);

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

                            User.Loja.Pontos += Pontos_Por_Atividade.Adicionar_Letra

                            db.collection('Musicas').doc(Musicas_firebase.id).update({Musicas: TodasMusicas}).then(() => {
                                db.collection('Users').doc(User.ID).update({ Loja: User.Loja }).then(() => {
                                    Fechar_Add_Letra()
                                    Notificar_Infos(`Parabéns! 🎉 Você adicionou uma nova letra de música 🎶 e ganhou ${Pontos_Por_Atividade.Adicionar_Letra} pontos na sua conta! ✨ Esses pontos poderão ser trocados por brindes na loja 🛍️ futuramente. Continue assim! 🏆🙌`, 'Emojis:💸, 🏆, 🙌, 🛍️')
                                    Atualizar_Infos_Perfil_Loja()
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

//! Mostrar letra na tela
const pre_letra_da_musica = document.getElementById('pre_letra_da_musica')
let linha_atual = -1
let letra_pre_ver_letra = ''

function Voltar_Letra_Ver_Musica(index) {
    index = parseInt(index)
    audio_player.currentTime = Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado[index]
    linha_atual = index
    Atualizar_Letra_PC()
}

function Destacar_linhas() {
    pre_letra_da_musica.innerHTML = Listas_Prox.MusicaAtual.Letra.Letra_Musica
    letra_pre_ver_letra = pre_letra_da_musica.innerText.split('\n')
    let linhas = pre_letra_da_musica.innerHTML.split('\n')
    
    if (linha_atual <= linhas.length) {
        // Atualiza a linha atual com a classe 'linha_pre_em_destaque'
        for (let c = 0; c < linhas.length; c++) {
            if(c == linha_atual) {
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
        for (let c = 0; c < linhas.length; c++) {
            pre_letra_da_musica.innerHTML += linhas[c] + '\n'
            
        }
        //? Faz o scroll para a linha atual
        try {
            document.getElementById('linha_atual_sincronizar_ver_letra').scrollIntoView({ behavior: 'smooth', block: 'center' })
        } catch{}
        
        linha_atual++
    }
}

let pd_atualizar_letra_pc = false
let pagina_anterior_ver_letra = {
    Nome: '',
    ID: ''
}

function Abrir_Ver_Letra_PC() {
    
    if(!pd_atualizar_letra_pc) {
        pagina_anterior_ver_letra.Nome = Pagina_Atual.Nome
        pagina_anterior_ver_letra.ID = Pagina_Atual.ID
        Abrir_Pagina('verletra', `verletra_${Listas_Prox.MusicaAtual.ID}`)
        
        animateBackgroundColor('#0d111f54', lista_elementos_mudar_cor_letra, 1500)
        animateBackgroundColor('#0d111f54', document.querySelector('nav').querySelectorAll('ul'), 1500)
        // decreaseBlur()

        pd_atualizar_letra_pc = true

        if(!Array.isArray(Listas_Prox.MusicaAtual.Letra)) {
            pre_letra_da_musica.innerHTML = Listas_Prox.MusicaAtual.Letra.Letra_Musica
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

    } else {
        pd_atualizar_letra_pc = false
        Fechar_Ver_Letra_PC()
    }
}

function Fechar_Ver_Letra_PC() {
    Abrir_Pagina(pagina_anterior_ver_letra.Nome, pagina_anterior_ver_letra.ID)
    animateBackgroundColor('transparent', lista_elementos_mudar_cor_letra, 1500)
    animateBackgroundColor('#2e31333f', document.querySelector('nav').querySelectorAll('ul'), 1500)

    img_btn_mic_letra.forEach(element => {
        if(!Array.isArray(Listas_Prox.MusicaAtual.Letra)) {
            element.style.display = 'block'

        } else if(!pd_atualizar_letra_pc) {
            element.style.display = 'none'
        }
    })
}

function Zerar_Ver_Letra_Pc() {
    pre_letra_da_musica.innerHTML = '<h1 id="linha_atual_sincronizar_ver_letra">Ainda não aprendi essa :(</h1>'
    document.getElementById('linha_atual_sincronizar_ver_letra').scrollIntoView({ behavior: 'smooth', block: 'center' })
    linha_atual = -1
}

let info_dada_nao_aprendi = false
function Atualizar_Letra_PC() {
    if(!Array.isArray(Listas_Prox.MusicaAtual.Letra)) {
        if(pd_atualizar_letra_pc) {
            info_dada_nao_aprendi = false
            let Tempo = Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado
    
            if(audio_player.currentTime + 0.30 >= Tempo[linha_atual] && audio_player.currentTime < Tempo[linha_atual + 1]) {
                Destacar_linhas()

            } else if(audio_player.currentTime > Tempo[linha_atual + 1]) {
                Atualizar_Linha_Letra_Input()
            }
        }
    } else if(!info_dada_nao_aprendi) {
        info_dada_nao_aprendi = true
        Zerar_Ver_Letra_Pc()
    }
}

let atualizando_linha_dnv = false
function Atualizar_Linha_Letra_Input() {
    let time_atual = audio_player.currentTime
    let Tempo = Listas_Prox.MusicaAtual.Letra.Tempo_Sincronizado

    for (let c = 0; c < Tempo.length; c++) {
        if(time_atual + 0.30 >= Tempo[c] && time_atual < Tempo[c + 1]) {
            linha_atual = c
            Destacar_linhas()
            document.getElementById('linha_atual_sincronizar_ver_letra').scrollIntoView({ behavior: 'smooth', block: 'center' })
            break
        } else if(time_atual + 0.30 < Tempo[c] && time_atual < Tempo[c + 1]) {
            linha_atual = -1
            Destacar_linhas()
            document.getElementById('linha_atual_sincronizar_ver_letra').scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }
}