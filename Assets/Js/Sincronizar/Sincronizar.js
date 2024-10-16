const btn_sincronizar_cell = document.getElementById('btn_sincronizar_cell')
const Btn_Sincronizar_Pc = document.getElementById('Btn_Sincronizar_Pc')
const Icon_Dispositivo_Sincronizar = document.getElementById('Icon_Dispositivo_Sincronizar')
const Texto_Dispositivo_Sincronizar = document.getElementById('Texto_Dispositivo_Sincronizar')
const background_container_sincronizar_pc = document.getElementById('background_container_sincronizar_pc')
const Btn_Sincronizar_Dispositivos = document.getElementById('Btn_Sincronizar_Dispositivos')
const span_como_sincronizar_pc = document.getElementById('span_como_sincronizar_pc')
const p_como_sincronizar_pc = document.getElementById('p_como_sincronizar_pc')
const container_volume_sincronizar_cell = document.getElementById('container_volume_sincronizar_cell')
const input_volume_sincronizar = document.getElementById('input_volume_sincronizar')

let User_Sincronizado = false

document.addEventListener('click', (e) => {
    let el = e.target.id
    let el_class = e.target.className

    if(el_class != 'container_sincronizar_pc' && el != 'Btn_Sincronizar_Pc' && el != 'btn_sincronizar_cell') {
        background_container_sincronizar_pc.style.display = 'none'
    }
})

Btn_Sincronizar_Pc.addEventListener('click', () => {
    Abrir_Aba_Sincronizar()
})

btn_sincronizar_cell.addEventListener('click', () => {
    Abrir_Aba_Sincronizar()
})
function Abrir_Aba_Sincronizar() {
    background_container_sincronizar_pc.style.display = 'flex'

    if(User_Sincronizado) {
        p_como_sincronizar_pc.style.display = 'none'
        span_como_sincronizar_pc.style.display = 'none'
        Btn_Sincronizar_Dispositivos.innerHTML = 'Cancelar'
        if(Tipo_Dispositivo.dispositivo == 'Mobile') {
            Icon_Dispositivo_Sincronizar.src = 'Assets/Imgs/PC_Ativo.svg'
            Texto_Dispositivo_Sincronizar.innerHTML = 'Conectado a um computador!'
        } else {
            Icon_Dispositivo_Sincronizar.src = 'Assets/Imgs/Cell_Ativo.svg'
            Texto_Dispositivo_Sincronizar.innerHTML = 'Conectado a um dispositivo móvel!'
        }
 
        Texto_Dispositivo_Sincronizar.style.color = '#1DB954'
        Btn_Sincronizar_Dispositivos.style.backgroundColor = '#1DB954'
        
        if(Tipo_Dispositivo.dispositivo == 'Mobile') {
            container_volume_sincronizar_cell.style.display = 'flex'
        }

    } else if(Ultimo_Dado_Sincronizar.Estado_Sincronizacao == 'Aguardando') {
        if(Tipo_Dispositivo.dispositivo == 'Mobile') {
            Icon_Dispositivo_Sincronizar.src = 'Assets/Imgs/PC_Amarelo.svg'
            Texto_Dispositivo_Sincronizar.innerHTML = 'Aguardando um PC!'
        } else {
            Icon_Dispositivo_Sincronizar.src = 'Assets/Imgs/Cell_Amarelo.svg'
            Texto_Dispositivo_Sincronizar.innerHTML = 'Aguardando um dispositivo móvel!'
        }

        Texto_Dispositivo_Sincronizar.style.color = '#FFC107'
        Btn_Sincronizar_Dispositivos.style.backgroundColor = '#FFC107'
        Btn_Sincronizar_Dispositivos.innerText = 'Cancelar'
        container_volume_sincronizar_cell.style.display = 'none'
        
    } else {
        p_como_sincronizar_pc.style.display = 'block'
        span_como_sincronizar_pc.style.display = 'block'
        Btn_Sincronizar_Dispositivos.innerHTML = 'Sincronizar'

        if(Tipo_Dispositivo.dispositivo == 'Mobile') {
            Icon_Dispositivo_Sincronizar.src = 'Assets/Imgs/PC.svg'
            Texto_Dispositivo_Sincronizar.innerHTML = 'Conecte-se a um computador!'
        } else {
            Icon_Dispositivo_Sincronizar.src = 'Assets/Imgs/Cell.svg'
            Texto_Dispositivo_Sincronizar.innerHTML = 'Conecte-se a um dispositivo móvel!'
        }
 
        Texto_Dispositivo_Sincronizar.style.color = '#fff'

        Btn_Sincronizar_Dispositivos.style.backgroundColor = '#1DB954'
        container_volume_sincronizar_cell.style.display = 'none'
    }
}

let Ultimo_Dado_Sincronizar = {}
function Atualizar_Sincronizar(Comando='') {
    if(User_Sincronizado) {        
        const New_Lista_Musicas = []
        for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
            New_Lista_Musicas.push(Listas_Prox.Lista_Musicas[c].ID)
        }

        const New_A_Seguir = []
        for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
            New_A_Seguir.push(Listas_Prox.A_Seguir[c].ID)
        }

        const New_Lista = {
            Nome_Album: Listas_Prox.Nome_Album ? Listas_Prox.Nome_Album : 'Nenhum',
            MusicaAtual: Listas_Prox.MusicaAtual.ID ? Listas_Prox.MusicaAtual.ID : {},
            Lista_Musicas: New_Lista_Musicas,
            Indice: Listas_Prox.Indice ? Listas_Prox.Indice : 'Nenhum',
            A_Seguir: New_A_Seguir,
            Tocando: {
                Nome: '',
                ID: Listas_Prox.Tocando.ID ? Listas_Prox.Tocando.ID : 'Nenhum',
            }
        }

        let New_Volume = Tipo_Dispositivo.dispositivo == 'PC' ? Volume_Atual : Ultimo_Dado_Sincronizar.Musica.Volume

        let Trocar_Current_Time = false
        
        if(Comando.includes('Zerar Current_Time') || New_Lista.MusicaAtual != Ultimo_Dado_Sincronizar.Lista_Prox.MusicaAtual) {
            Trocar_Current_Time = true
        }

        const Dados_Sincronizar = {
            User_ID: Ultimo_Dado_Sincronizar.User_ID,
            Estado_Sincronizacao: 'Ativo',
            Dispositivo_Chefe: Ultimo_Dado_Sincronizar.Dispositivo_Chefe,
            Data_Sincronizacao: Ultimo_Dado_Sincronizar.Data_Sincronizacao,
            Data_Ultima_Alteracao: Date.now(),
            Lista_Prox: New_Lista,
            Ultimo_Dispositivo_A_Atualizar: Tipo_Dispositivo.dispositivo,
            Musica: {
                Pausado: Musica_Pausada,
                Repetir: repetir_musicas,
                Random: random_musicas,
                Current_Time: Trocar_Current_Time ? 0 : audio_player.currentTime,
                Volume: New_Volume,
                Curtida: Listas_Prox.MusicaAtual.ID ? Curtir_Musica_Descurtir(Listas_Prox.MusicaAtual, undefined, 'Checar') : false
            }
        }

        if(!Comando.includes('Não Atualizar')) {          
            db.collection('Dispositivos_Sincronizados').doc(User.ID).update(Dados_Sincronizar)
        }
    }
}

function Listner_Sicronizacoes() {
    db.collection('Dispositivos_Sincronizados').doc(User.ID)
    .onSnapshot((snapshot) => {
        if (snapshot.exists) {
            Ultimo_Dado_Sincronizar = snapshot.data()            

            if(Ultimo_Dado_Sincronizar.Ultimo_Dispositivo_A_Atualizar != Tipo_Dispositivo.dispositivo) {
                Aceitar_Sincronizar(Ultimo_Dado_Sincronizar)
            }

            if(Ultimo_Dado_Sincronizar.Estado_Sincronizacao == 'Ativo') {
                User_Sincronizado = true

                if(Tipo_Dispositivo.dispositivo == 'Mobile') {
                    Volume(0, document.getElementById('input_volume_pc'), 'Não Atualizar')
                }

                if(background_container_sincronizar_pc.style.display == 'flex') {
                    Abrir_Aba_Sincronizar()
                }

            } else {
                User_Sincronizado = false

                if(Ultimo_Dado_Sincronizar.Estado_Sincronizacao == 'Cancelado' && Tipo_Dispositivo.dispositivo == 'Mobile') {
                    Volume(100, document.getElementById('input_volume_pc'), 'Não Atualizar')
                }

                if(background_container_sincronizar_pc.style.display == 'flex') {
                    Abrir_Aba_Sincronizar()
                }
            }
        } else {
            console.log("Sincronização excluída ou não encontrada.")
            // Lógica para lidar com a exclusão
        }
    }, (error) => {
        console.error("Erro ao escutar mudanças: ", error)
    })
}

function Criar_Sincronizacao() {
    let Estado_Sincronizacao = Ultimo_Dado_Sincronizar.Estado_Sincronizacao ? Ultimo_Dado_Sincronizar.Estado_Sincronizacao : undefined

    if(!User_Sincronizado && Estado_Sincronizacao == 'Cancelado' ||!User_Sincronizado && Estado_Sincronizacao == undefined) {

        let Todos_Dispositivos_Sincronizados = []
        const New_Lista_Musicas = []
        for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
            New_Lista_Musicas.push(Listas_Prox.Lista_Musicas[c].ID)
        }

        const New_A_Seguir = []
        for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
            New_A_Seguir.push(Listas_Prox.A_Seguir[c].ID)
        }

        const New_Lista = {
            Nome_Album: Listas_Prox.Nome_Album ? Listas_Prox.Nome_Album : 'Nenhum',
            MusicaAtual: Listas_Prox.MusicaAtual.ID ? Listas_Prox.MusicaAtual.ID : {},
            Lista_Musicas: New_Lista_Musicas,
            Indice: Listas_Prox.Indice ? Listas_Prox.Indice : 'Nenhum',
            A_Seguir: New_A_Seguir,
            Tocando: {
                Nome: '',
                ID: Listas_Prox.Tocando.ID ? Listas_Prox.Tocando.ID : 'Nenhum',
            }
        }

        const Dados_Sincronizar = {
            User_ID: User.ID,
            Estado_Sincronizacao: 'Aguardando',
            Dispositivo_Chefe: Tipo_Dispositivo.dispositivo,
            Data_Sincronizacao: Date.now(),
            Data_Ultima_Alteracao: Date.now(),
            Lista_Prox: New_Lista,
            Ultimo_Dispositivo_A_Atualizar: Tipo_Dispositivo.dispositivo,
            Musica: {
                Pausado: Musica_Pausada,
                Repetir: repetir_musicas,
                Random: random_musicas,
                Current_Time: audio_player.currentTime,
                Volume: Volume_Atual,
                Curtida: Listas_Prox.MusicaAtual.ID ? Curtir_Musica_Descurtir(Listas_Prox.MusicaAtual, undefined, 'Checar') : false
            }
        }

        if(!User_Sincronizado) {
            db.collection('Dispositivos_Sincronizados').get().then((snapshot) => {
                snapshot.docs.forEach(Dispositivos => {
                    Todos_Dispositivos_Sincronizados = Dispositivos.data()
                })

                let Ja_Tem_Dados_Salvos = false

                for (let c = 0; c < Todos_Dispositivos_Sincronizados.length; c++) {
                    if(Todos_Dispositivos_Sincronizados[c].User_ID == User.ID) {
                        Ja_Tem_Dados_Salvos = true

                        if(Todos_Dispositivos_Sincronizados[c].Estado_Sincronizacao == 'Desativado') {
                            Atualizar_Sincronizar() 
                        }
                        break
                    }
                }

                if(!Ja_Tem_Dados_Salvos) {                    
                    db.collection('Dispositivos_Sincronizados').doc(User.ID).set(Dados_Sincronizar)
                }
            })
        }
    }
}

function Cancelar_Sincronizacao() {
    if(User_Sincronizado || Ultimo_Dado_Sincronizar.Estado_Sincronizacao == 'Aguardando') {
        User_Sincronizado = false
        Ultimo_Dado_Sincronizar.Estado_Sincronizacao = 'Cancelado'
        Ultimo_Dado_Sincronizar.Ultimo_Dispositivo_A_Atualizar = Tipo_Dispositivo.dispositivo
        Ultimo_Dado_Sincronizar.Data_Ultima_Alteracao = Date.now()
        Ultimo_Dado_Sincronizar.Lista_Prox = {}

        db.collection('Dispositivos_Sincronizados').doc(User.ID).update(Ultimo_Dado_Sincronizar)
    }
}

function Aceitar_Sincronizar(Dados) {
    if(Dados.User_ID == User.ID) {
        if(Dados.Estado_Sincronizacao == 'Aguardando' && Dados.Dispositivo_Chefe != Tipo_Dispositivo.dispositivo) {
            Dados.Estado_Sincronizacao = 'Ativo'
            db.collection('Dispositivos_Sincronizados').doc(User.ID).update(Dados).then(() => {
                Avisos_Rapidos('🔗 Aparelho sincronizado com sucesso! 😊')
            })

            if(Tipo_Dispositivo.dispositivo == 'Mobile') {
                Volume(0, document.getElementById('input_volume_pc'), 'Não Atualizar')
            }
            User_Sincronizado = true
        } else if(Dados.Estado_Sincronizacao == 'Ativo') {
            
            Execultar_Sincronizacoes()

            if(Tipo_Dispositivo.dispositivo == 'Mobile') {
                Volume(0, document.getElementById('input_volume_pc'), 'Não Atualizar')
            }
        } else {
            User_Sincronizado = false
        }
    }
}

function Execultar_Sincronizacoes() {
    Volume_Sincronizar(Ultimo_Dado_Sincronizar.Musica.Volume, 'Não Atualizar') 
    //* Descompactar Listas De Músicas
    let New_A_Seguir = []
    for (let c = 0; c < Ultimo_Dado_Sincronizar.Lista_Prox.A_Seguir.length; c++) {
        for (let b = 0; b < TodasMusicas.length; b++) {
            if(Ultimo_Dado_Sincronizar.Lista_Prox.A_Seguir[c] == TodasMusicas[b].ID) {
                New_A_Seguir.push(TodasMusicas[b])
                break
            }
        }
    }

    let New_Lista_Musicas = []
    for (let c = 0; c < Ultimo_Dado_Sincronizar.Lista_Prox.Lista_Musicas.length; c++) {
        for (let b = 0; b < TodasMusicas.length; b++) {
            if(Ultimo_Dado_Sincronizar.Lista_Prox.Lista_Musicas[c] == TodasMusicas[b].ID) {
                New_Lista_Musicas.push(TodasMusicas[b])
                break
            }
        }
    }

    let New_Musica_Atual = undefined
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(TodasMusicas[c].ID == Ultimo_Dado_Sincronizar.Lista_Prox.MusicaAtual) {
            New_Musica_Atual = TodasMusicas[c]
        }
    }

    const New_Lista_Prox = {
        Nome_Album: Ultimo_Dado_Sincronizar.Lista_Prox.Nome_Album == 'Nenhum' ? undefined : Ultimo_Dado_Sincronizar.Lista_Prox.Nome_Album,
        MusicaAtual: New_Musica_Atual,
        Lista_Musicas: New_Lista_Musicas,
        Indice: Ultimo_Dado_Sincronizar.Lista_Prox.Indice == 'Nenhum' ? undefined : Ultimo_Dado_Sincronizar.Lista_Prox.Indice,
        A_Seguir: New_A_Seguir,
        Tocando: {
            Nome: Ultimo_Dado_Sincronizar.Lista_Prox.Tocando.Nome,
            ID: Ultimo_Dado_Sincronizar.Lista_Prox.Tocando.ID == 'Nenhum' ? undefined : Ultimo_Dado_Sincronizar.Lista_Prox.Tocando.ID,
        }
    }

    let Ja_Esta_Tocando = false    

    try {
        if(New_Lista_Prox.MusicaAtual.ID == Listas_Prox.MusicaAtual.ID) {
            Ja_Esta_Tocando = true
        }
    } catch{}

    Listas_Prox = New_Lista_Prox
    if(!Ja_Esta_Tocando) {
        Tocar_Musica(Listas_Prox.Lista_Musicas, Listas_Prox.MusicaAtual, Ultimo_Dado_Sincronizar.Musica.Pausado? 'Pausar, Não Atualizar Sincronizar' : 'Não Atualizar Sincronizar') 

    }

    if(Ultimo_Dado_Sincronizar.Musica.Pausado) {
        Pausar('Não Atualizar')
        audio_player.pause()
    } else {
        Play('Não Atualizar')
    }

    audio_player.currentTime = Ultimo_Dado_Sincronizar.Musica.Current_Time

    if(Ultimo_Dado_Sincronizar.Musica.Repetir != repetir_musicas) {
        Repetir_Musica(null, 'Não Atualizar')
    }

    if(Ultimo_Dado_Sincronizar.Musica.Random != random_musicas) {
        Deixar_Random(null, 'Não Atualizar')
    }

    if(Tipo_Dispositivo.dispositivo == 'PC') {
        if(Ultimo_Dado_Sincronizar.Musica.Volume != Volume_Atual) {
            Volume(Ultimo_Dado_Sincronizar.Musica.Volume, document.getElementById('input_volume_pc'), 'Não Atualizar')

            setTimeout(() => {
                Volume(Ultimo_Dado_Sincronizar.Musica.Volume, document.getElementById('input_volume_pc'), 'Não Atualizar')
            }, 300)
        }

    } else {
        Volume(0, document.getElementById('input_volume_pc'), 'Não Atualizar')
    }

    if(Ultimo_Dado_Sincronizar.Musica.Curtida != Curtir_Musica_Descurtir(Listas_Prox.MusicaAtual, undefined, 'Checar')) {
        Curtir_Musica_Descurtir(Listas_Prox.MusicaAtual)
    }
}

Btn_Sincronizar_Dispositivos.addEventListener('click', () => {
    if(User_Sincronizado || Ultimo_Dado_Sincronizar.Estado_Sincronizacao == 'Aguardando') {
        Cancelar_Sincronizacao()
    } else {
        Criar_Sincronizacao()
    }
})

//* Atualizar Volume
input_volume_sincronizar.oninput = function() {
    Volume_Sincronizar(this.value)
    atualizar_cor_progresso_input(this)
}

let Time_Volume_Sincronizar
function Volume_Sincronizar(volume, Comando='') {
    input_volume_sincronizar.value = volume
    atualizar_cor_progresso_input(input_volume_sincronizar)
    
    clearTimeout(Time_Volume_Sincronizar)
    let img_icone_som
    if(volume > 0 && volume < 50) {
        img_icone_som = 'Assets/Imgs/Som1.svg'
    } else if(volume >= 50 && volume <= 99) {
        img_icone_som = 'Assets/Imgs/Som2.svg'
    } else if(volume > 99) {
        img_icone_som = 'Assets/Imgs/Som3.svg'
    } else {
        img_icone_som = 'Assets/Imgs/Som.svg'
    }

    document.getElementById('icone_som_sincornizar_cell').src = img_icone_som
    
    if(!Comando.includes('Não Atualizar')) {
    Time_Volume_Sincronizar = setTimeout(() => {
        Ultimo_Dado_Sincronizar.Musica.Volume = volume
        Atualizar_Sincronizar()
        Avisos_Rapidos('Volume alterado')
    }, 300) 

    }
}
