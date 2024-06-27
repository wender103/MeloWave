function Checar_Aceitar_Playlist(ID, Comando='Não Aceitar') {
    let feito = false
    db.collection('Playlists').get().then((snapshot) => {
        snapshot.docs.forEach(Playlists => {
            TodosPlaylists = Playlists.data().Playlists

            if(!feito) {
                feito = true
                let convite_encontrado = false
                let expirou = false
                let ja_faz_parte = false
                let playlist_lotada = false
                let contador_playlist
                
                for (let c = 0; c < TodasPlaylists.length; c++) {
                    if(ID == TodasPlaylists[c].Convites.ID) {
                        convite_encontrado = true
                        contador_playlist = c

                        if(TodasPlaylists[c].Colaboradores.length >= 4) {
                            playlist_lotada = true
                        }
                        
                        if(jaPassou(TodasPlaylists[c].Convites.Data)) {
                            expirou = true
                        }

                        if(User.ID == TodasPlaylists[c].Admin) {
                            ja_faz_parte = true
                        } else {
                            for (let b = 0; b < TodasPlaylists[c].Colaboradores.length; b++) {
                                if(TodasPlaylists[c].Colaboradores[b] == User.ID) {
                                    ja_faz_parte = true
                                }
                            }
                        }
                        break
                    }
                }

                for (let c = 0; c < Todos_Usuarios.length; c++) {
                    if(Todos_Usuarios[c].ID == TodasPlaylists[contador_playlist].Admin) {
                        document.getElementById('img_user_aceitarplaylist').src = Todos_Usuarios[c].Perfil.Img_Perfil
                        break
                    }
                }

                if(!convite_encontrado) {
                    Notificar_Infos('⚠️ O link do convite para a playlist está errado. Por favor, verifique o link ou peça um novo convite. 🎶')
                    Abrir_Pagina('home')

                } else if(expirou) {
                    Notificar_Infos('⏰ O link do convite para a playlist expirou. Por favor, solicite um novo convite para continuar. 🎶')   
                    Abrir_Pagina('home')

                } else if(ja_faz_parte) {
                    Notificar_Infos('🎉 Você já faz parte dessa playlist! Aproveite a música com seus amigos! 🎶🤗')
                    Abrir_Pagina('playlist', TodasPlaylists[contador_playlist].ID)
                    
                } else if(playlist_lotada) {
                    Notificar_Infos('🚫 A playlist já está lotada. Infelizmente, não é possível adicionar mais participantes. 🎶')
                    Abrir_Pagina('home')

                } else if(Comando == 'Aceitar') {
                    //! Vai adicionar o user a playlist
                    TodasPlaylists[contador_playlist].Colaboradores.push(User.ID)
                    db.collection('Playlists').doc(Playlists.id).update({ Playlists: TodasPlaylists }).then(() => {
                        Notificar_Infos('🎉 Bem-vindo à playlist! Estamos felizes em ter você aqui. Aproveite a música e divirta-se com a gente! 🎶🤗', 'Comemorar')
                        Abrir_Pagina('playlist', TodasPlaylists[contador_playlist].ID)

                        Enviar_Notificacao_Tempo_Real(TodasPlaylists[contador_playlist].Admin, 'Playlist', `🎉🎶 Ei! *#00ceff*${User.Nome}*#00ceff* acabou de entrar na playlist! Bora curtir juntos? 😎🔥`, 'Modelo1', `Novo User Abrir Playlist:${TodasPlaylists[contador_playlist].ID}`, User.Perfil.Img_Perfil, null, 'Agora não', 'Ver')

                        for (let f = 0; f < TodasPlaylists[contador_playlist].Colaboradores.length; f++) {
                            if(TodasPlaylists[contador_playlist].Colaboradores[f] != User.ID) {
                                Enviar_Notificacao_Tempo_Real(TodasPlaylists[contador_playlist].Colaboradores[f], 'Playlist', `🎉🎶 Ei! *#00ceff*${User.Nome}*#00ceff* acabou de entrar na playlist! Bora curtir juntos? 😎🔥`, 'Modelo1', `Novo User Abrir Playlist:${TodasPlaylists[contador_playlist].ID}`, User.Perfil.Img_Perfil, null, 'Agora não', 'Ver')
                            }
                        }
                    })
                }
            }
        })
    })
}

const btn__aceitarplaylist = document.getElementById('btn__aceitarplaylist')
btn__aceitarplaylist.addEventListener('click', () => {
    Checar_Aceitar_Playlist(Pagina_Atual.ID, 'Aceitar')
})