let mediaSession = null
let isCasting = false
let currentTrackIndex = 0
window['__onGCastApiAvailable'] = (isAvailable) => {
if (isAvailable) {
    initializeCastApi()
}
}

let tentativas_cast = 5
function initializeCastApi() {
    try {
        const context = cast.framework.CastContext.getInstance()

        context.setOptions({
            receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
            autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        })

        context.addEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED, (event) => {
            if (event.sessionState === 'SESSION_ENDED') {
                isCasting = false
                mediaSession = null
                Desativar_Casting()
            }
        })

        const Btn_Cast_Google = document.querySelectorAll('.Btn_Cast_Google')

        Btn_Cast_Google.forEach(element => {
            element.addEventListener('click', () => {
                function Transmitir() {
                    let session = context.getCurrentSession()
                    if (!session) {
                        context.requestSession().then(() => {
                            session = context.getCurrentSession()
                            castMedia(session)
                        })
                    } else {
                        castMedia(session)
                    }
                }

                if(!isCasting) {
                    Transmitir()
                } else {
                    Notificar_Infos('Você realmente deseja parar a transmissão? 🤔🎵', 'Confirmar').then(resp => {
                        if(resp) {
                            Stop_Cast()
                        }
                    })
                }
            })    
    }   )
    } catch (error) {
        console.log('Algo deu  errado com o catch')
        console.warn(error)
        setTimeout(() => {
            if(tentativas_cast > 0) {
                tentativas_cast--
                initializeCastApi()
            }
        }, 1000)
    }
}

function Stop_Cast() {
    if (isCasting) {
        const context = cast.framework.CastContext.getInstance()
        let session = context.getCurrentSession()

        if (session) {
            session.endSession(true)
            isCasting = false
            mediaSession = null
            Desativar_Casting()
        }
    }
}

function castMedia(session) {
    const currentTrack = Listas_Prox.MusicaAtual
    const mediaInfo = new chrome.cast.media.MediaInfo(currentTrack.Audio, 'audio/mp4')
    const metadata = new chrome.cast.media.MusicTrackMediaMetadata()
    metadata.title = currentTrack.Nome
    metadata.artist = currentTrack.Autor
    metadata.albumArtist = 'Various Artists'
    metadata.albumName = currentTrack.Nome
    mediaInfo.metadata = metadata
    mediaInfo.streamType = chrome.cast.media.StreamType.BUFFERED
    mediaInfo.metadata.images = [{ url: currentTrack.Img }]
    mediaInfo.metadata.title = currentTrack.Nome
    mediaInfo.metadata.artist = currentTrack.Autor
    mediaInfo.metadata.albumName = currentTrack.Nome

    const request = new chrome.cast.media.LoadRequest(mediaInfo)
    session.loadMedia(request).then(() => {
        mediaSession = session.getMediaSession()
        isCasting = true
        Iniciar_Casting()
    }).catch((error) => {
        console.error('Erro ao carregar mídia: ', error)
    })
}

function nextTrack() {
    const context = cast.framework.CastContext.getInstance()
    let session = context.getCurrentSession()
    if (!session) {
        context.requestSession().then(() => {
        session = context.getCurrentSession()
        castMedia(session)
        })
    } else {
        castMedia(session)
    }
}

function prevTrack() {
    const context = cast.framework.CastContext.getInstance()
    let session = context.getCurrentSession()
    if (!session) {
        context.requestSession().then(() => {
        session = context.getCurrentSession()
        castMedia(session)
        })
    } else {
        castMedia(session)
    }
}

function updateSeekBar() {
    const audioPlayer = document.getElementById('audioPlayer')
    const seekBarInput = document.getElementById('seekBarInput')
    seekBarInput.value = (audioPlayer.currentTime / audioPlayer.duration) * 100
}

function Iniciar_Casting() {
    let audio_certo = audio_player

    let audios = document.querySelectorAll('.audios_transitions')
    audios.forEach(element => {
        if(element.src == Listas_Prox.MusicaAtual.Audio) {
            audio_certo = element
        }  
    })

    Volume_Antigo = audio_certo.volume
    ajustarVolume(audio_certo, 0, 500)

    let seekTime = audio_certo.currentTime

    if (isCasting && mediaSession) {
        const seekRequest = { currentTime: seekTime }
        
        if (typeof mediaSession.seek === 'function') {
            mediaSession.seek(seekRequest)
        } else {
            console.error('Método seek não disponível em mediaSession')
        }
    }

    if(audio_certo.paused) {
        mediaSession.pause()
    }

    const Btn_Cast_Google = document.querySelectorAll('.Btn_Cast_Google')

    Btn_Cast_Google.forEach(element => {
        element.classList.add('active')
    })
}

function Desativar_Casting() {
    let audio_certo = audio_player

    let audios = document.querySelectorAll('.audios_transitions')
    audios.forEach(element => {
        if(element.src == Listas_Prox.MusicaAtual.Audio) {
            audio_certo = element
        }  
    })

    ajustarVolume(audio_certo, Volume_Atual, 500)

    const Btn_Cast_Google = document.querySelectorAll('.Btn_Cast_Google')

    Btn_Cast_Google.forEach(element => {
        element.classList.remove('active')
    })
}