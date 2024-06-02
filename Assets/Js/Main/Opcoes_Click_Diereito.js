function Ativar_Opcoes_Click_Direita(Modo, Musica, Indice) {

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

    let Add_Fila = `<li onclick="Adicionar_a_Fila('${Musica.ID}')"><img src="Assets/Imgs/Add_Fila.svg"><p>Adicionar a seguir</p></li>`

    let Remover_Musica_Fila = `<li onclick="Remover_Da_Fila('${Modo}', '${Musica.ID}')"><img src="Assets/Imgs/Hide song.svg" id="remover_da_fila"><p>Remover da fila</p></li>`

    let Ir_Para_Artista = `<li onclick="Ir_Para_Artista_Opcoes_Click_Direito('${Musica.ID}')"<img src="Assets/Imgs/Ir_Para_Artista.svg"><p>Ir para  o artista</p></li>`

    let About = `<li onclick="Abrir_Creditos('${Musica.ID}')"<img src="Assets/Imgs/About.png"><p>Ver creditos</p></li>`

    let Share = `<li onclick="Comapartilhar_Musica_Fila('${Musica.ID}')"<img src="Assets/Imgs/Share.svg"><p>Compartilhar</p></li>`

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
            opcoes_fila_ul.innerHTML += Add_Fila
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

        opcoes_fila_ul.innerHTML += Add_Fila
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

        if(!tem_na_fila) {
            opcoes_fila_ul.innerHTML += Add_Fila
        }

        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share
    } else if(Modo == 'Músicas Linha') {
        // opcoes_musica_ul.innerHTML += Add_Playlist
        
        //* Musicas Curtidas
        opcoes_musica_ul.innerHTML += btn_musica_curtida()
        opcoes_musica_ul.innerHTML += '<hr>'

        if(Musica.ID != Listas_Prox.MusicaAtual.ID) {
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

        opcoes_fila_ul.innerHTML += '<hr>'

        opcoes_musica2_ul.innerHTML += Ir_Para_Artista
        opcoes_musica2_ul.innerHTML += About
        opcoes_musica2_ul.innerHTML += '<hr>'

        opcoes_compartilhar_ul.innerHTML += Share
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

function Adicionar_a_Fila(ID) {
    for (let c = 0; c < TodasMusicas.length; c++) {
        if(TodasMusicas[c].ID == ID) {
            Listas_Prox.A_Seguir.push(TodasMusicas[c])
            Atualizar_Fila('Adicionando Fila a Seguir') 
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

function Creditos_Fila(ID) {}

function Comapartilhar_Musica_Fila(ID) {}