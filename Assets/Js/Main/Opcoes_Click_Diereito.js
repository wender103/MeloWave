function Ativar_Opcoes_Click_Direita(Modo, Musica, Indice, Artista_Seguir, ID_Artista, Perfil) {

    //! ---------------- Uls ----------------------
    const opcoes_musica_ul = document.getElementById('opcoes_musica_ul')
    opcoes_musica_ul.innerHTML = ''

    const opcoes_fila_ul = document.getElementById('opcoes_fila_ul')
    opcoes_fila_ul.innerHTML = ''

    const opcoes_musica2_ul = document.getElementById('opcoes_musica2_ul')
    opcoes_musica2_ul.innerHTML = ''

    const opcoes_compartilhar_ul = document.getElementById('opcoes_compartilhar_ul')
    opcoes_compartilhar_ul.innerHTML = ''

    //! ---------------- Buttons ----------------------
    let Add_Playlist = `<li onclick="Adicionar_Playlist_Fila('${Musica.ID}')"<img src="Assets/Imgs/Plus_icos.svg"><p>Adicionar à playlist</p></li>`

    let Remover_Musica_Curtida = `<li onclick="Remover_Musica_Curtida_Opcoes_Click_Direito('${Musica.ID}', 'Fila')"<img src="Assets/Imgs/Like.svg"><p>Remover de Músicas Curtidas</p></li>`

    let Adicionar_Musica_Curtida = `<li onclick="Adicionar_Musica_Curtida_Opcoes_Click_Direito('${Musica.ID}', 'Fila')"<img src="Assets/Imgs/Like_Vazio.svg"><p>Adicionar à Músicas Curtidas</p></li>`

    let Add_Fila = `<li onclick="Adicionar_a_Fila('${Musica.ID}')"><img src="Assets/Imgs/Fila.svg"><p>Adicionar a fila</p></li>`
    let Add_Fila_Seguir = `<li onclick="Adicionar_a_Fila_Seguir('${Musica.ID}')"><img src="Assets/Imgs/Add_Fila.svg"><p>Adicionar a seguir</p></li>`

    let Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('${Modo}', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`

    let Ir_Para_Artista = `<li onclick="Ir_Para_Artista_Opcoes_Click_Direito('${Musica.ID}')"<img src="Assets/Imgs/Ir_Para_Artista.svg"><p>Ir para  o artista</p></li>`

    let About = `<li onclick="Abrir_Creditos('${Musica.ID}')"<img src="Assets/Imgs/About.png"><p>Ver creditos</p></li>`

    let Share = `<li onclick="Comapartilhar_Musica_E_Artista('${Musica.ID}', '${ID_Artista}')"<img src="Assets/Imgs/Share.svg"><p>Compartilhar</p></li>`

    let Btn_Seguir_Artsta
    
    if(Artista_Seguir) {
        if(Seguir_Artista(Artista_Seguir, 'Checar')) {
            Btn_Seguir_Artsta = `<li onclick="Seguir_Artista('${Artista_Seguir}')"<img src="Assets/Imgs/Share.svg"><p>Deixar de seguir</p></li>`
        } else {
            Btn_Seguir_Artsta = `<li onclick="Seguir_Artista('${Artista_Seguir}')"<img src="Assets/Imgs/Share.svg"><p>Seguir artista</p></li>`
        }
    }

    let Btn_Seguir_User = `<li onclick="Seguir_Perfil('${Perfil}')"<img src="Assets/Imgs/Share.svg"><p>Seguir usuário</p></li>`

    let Share_Perfil = `<li onclick="Comapartilhar_Perfil('${Perfil}')"<img src="Assets/Imgs/Share.svg"><p>Compartilhar perfil</p></li>`

    let pode_add_a_fila = true

    for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
        if(Listas_Prox.Lista_Musicas[c].ID == Musica.ID) {
            pode_add_a_fila = false
            break
        }
    }

    function btn_musica_curtida() {
        let tem_nas_musicas_curtidas = false
        for (let c = 0; c < User.Musicas_Curtidas.length; c++) {
            if(Musica.ID == User.Musicas_Curtidas[c].ID) {
                tem_nas_musicas_curtidas = true
                return Remover_Musica_Curtida
            }
        }
        
        if(!tem_nas_musicas_curtidas) {
            return Adicionar_Musica_Curtida
        }
    }

    //! --------------- Ifs -------------------
    if(Modo == 'Fila Próximas') {
        // opcoes_musica_ul.innerHTML += Add_Playlist
        
        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        let musica_ja_em_a_seguir = false
        Listas_Prox.A_Seguir.forEach(Musica_Lista => {
            if(Musica_Lista.ID == Musica.ID) {
                musica_ja_em_a_seguir = true
            }
        })

        if(!musica_ja_em_a_seguir) {
            opcoes_fila_ul.innerHTML += Add_Fila_Seguir
        }

        opcoes_fila_ul.innerHTML += Remover_Musica_Fila
        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share

    } else if(Modo == 'Fila Música Tocando') {
        // opcoes_musica_ul.innerHTML += Add_Playlist
        
        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'
        
        opcoes_fila_ul.innerHTML += Add_Fila_Seguir
        
        if(pode_add_a_fila) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }

        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share

    } else if(Modo == 'Fila a Seguir') {
        // opcoes_musica_ul.innerHTML += Add_Playlist
        
        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        opcoes_fila_ul.innerHTML += Remover_Musica_Fila
        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share

    } else if(Modo == 'Músicas Caixa') {
        // opcoes_musica_ul.innerHTML += Add_Playlist
        
        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        let tem_no_a_seguir = false
        for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
            if(Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                tem_no_a_seguir = true
                break
            }
        }

        if(pode_add_a_fila) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }

        if(Musica.ID != Listas_Prox.MusicaAtual.ID && !tem_no_a_seguir && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila_Seguir
        }

        if(pode_add_a_fila && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }
        
        let tem_na_fila = false
        for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
            if(Musica.ID == Listas_Prox.Lista_Musicas[c].ID) {
                tem_na_fila = true
                Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila Próximas', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                break
            }
        }

        if(!tem_na_fila) {
            for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
                if(Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                    tem_na_fila = true
                    Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila a Seguir', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                    opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                    break
                }
            }
        }

        if(opcoes_fila_ul.innerHTML != '') {
            opcoes_fila_ul.innerHTML += '<hr>'
        }

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share
    } else if(Modo == 'Músicas Linha') {
        // opcoes_musica_ul.innerHTML += Add_Playlist
        
        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        let tem_no_a_seguir = false
        for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
            if(Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                tem_no_a_seguir = true
                break
            }
        }

        if(Musica.ID != Listas_Prox.MusicaAtual.ID && !tem_no_a_seguir && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila_Seguir
        }
        
        if(pode_add_a_fila && Listas_Prox.Indice != undefined) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }

        let tem_na_fila = false
        for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
            if(Musica.ID == Listas_Prox.Lista_Musicas[c].ID) {
                tem_na_fila = true
                Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila Próximas', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                break
            }
        }

        if(!tem_na_fila) {
            for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
                if(Musica.ID == Listas_Prox.A_Seguir[c].ID) {
                    tem_na_fila = true
                    Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('Fila a Seguir', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`
                    opcoes_fila_ul.innerHTML += Remover_Musica_Fila
                    break
                }
            }
        }

        if(opcoes_fila_ul.innerHTML != '') {
            opcoes_fila_ul.innerHTML += '<hr>'
        }

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share

    } else if(Modo == 'Artista') {
        opcoes_musica_ul.innerHTML += Btn_Seguir_Artsta
        opcoes_musica_ul.innerHTML += Share
    } else if(Modo == 'Perfil') {
        opcoes_fila_ul.innerHTML += Btn_Seguir_User
        opcoes_fila_ul.innerHTML += Share_Perfil
    }
}

//! --------------- Funções -------------------
function Adicionar_Playlist_Fila(ID) {}

function Remover_Musica_Curtida_Opcoes_Click_Direito(ID) {
    for (let c = 0; c < User.Musicas_Curtidas.length; c++) {
        if(ID == User.Musicas_Curtidas[c].ID) {
            Curtir_Musica_Descurtir(User.Musicas_Curtidas[c])
            break
        }
    }
}

function Adicionar_Musica_Curtida_Opcoes_Click_Direito(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(ID == TodasMusicas[c].ID) {
            Curtir_Musica_Descurtir(TodasMusicas[c])
            break
        }
    }
}

function Adicionar_a_Fila_Seguir(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(TodasMusicas[c].ID == ID) {
            Listas_Prox.A_Seguir.push(TodasMusicas[c])
            Atualizar_Fila('Adicionando Fila a Seguir') 
            break
        }
    }
}

function Adicionar_a_Fila(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(TodasMusicas[c].ID == ID) {            
            let ja_tem_na_lista = false
            for (let a = 0; a < Listas_Prox.Lista_Musicas.length; a++) {
                if(Listas_Prox.Lista_Musicas[a].ID == ID) {
                    ja_tem_na_lista = true
                    break
                }
            }

            if(!ja_tem_na_lista) {
                Listas_Prox.Lista_Musicas.push(TodasMusicas[c])
                Atualizar_Fila() 
            }
            break
        }
    }
}

function Remover_Da_Fila(Modo, ID) {
    if (Modo == 'Fila Próximas') {
        for (let c = 0; c < Listas_Prox.Lista_Musicas.length; c++) {
            if(Listas_Prox.Lista_Musicas[c].ID == ID) {
                Animacao_Adicionando_Lista('Remover Próximas', c)
                break
            }
        }
    } else if (Modo == 'Fila a Seguir') {
        for (let c = 0; c < Listas_Prox.A_Seguir.length; c++) {
            if(Listas_Prox.A_Seguir[c].ID == ID) {
                Animacao_Adicionando_Lista('Remover a Seguir', c)
                break
            }
        }
    }
}

function Ir_Para_Artista_Opcoes_Click_Direito(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(ID == TodasMusicas[c].ID) {
            Abrir_Perfil_Artista(Separar_Por_Virgula(TodasMusicas[c].Autor)[0], TodasMusicas[c])
        }
    }
}

function Comapartilhar_Musica_E_Artista(ID_Musica, ID_Artista) {
    var url = window.location.href
    var baseUrl = url.split('?')[0]

    let link
    if(ID_Artista != null && ID_Artista != undefined && ID_Artista != 'undefined') {
        link = `${baseUrl}?Page=artista_${ID_Artista}`

    } else {
        link = `${baseUrl}?Musica=${ID_Musica}`
    }

    Copiar_Para_Area_Tranferencia(link)
}

function Comapartilhar_Perfil(ID) {
    var url = window.location.href
    var baseUrl = url.split('?')[0]
    let link = `${baseUrl}?Page=perfil_${ID}`
    Copiar_Para_Area_Tranferencia(link)
}