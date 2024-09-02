let Nova_Playlist = undefined
let Valores_Antigos_Playlist = undefined
let musicas_nova_playlist = []
let Editando_Playlist = false
let musicas_ids_anteriores = []

function Gerar_Forma_Playlist() {
    const fomra_nova_playlist = {
        Musicas: [],
        Colaboradores: [],
        Admin: User.ID,
        Data: getDataAtual(),
        Nome: '',
        Descricao: '',
        Img : null,
        ID: gerarId(),
        Estado: 'Pública',
        Banidos: [],
        Convites: {
            Data: getDataAtual(5, 0, 0),
            ID: gerarId()
        }
    }

    musicas_nova_playlist = []
    Nova_Playlist = fomra_nova_playlist
}

const nomes_colaboradores = document.getElementById('nomes_colaboradores')
const img_perfil_user_criar_playlisy = document.getElementById('img_perfil_user_criar_playlisy')
function Carregar_Infos_Criar_Playlist() {
    nomes_colaboradores.innerText = User.Nome
    img_perfil_user_criar_playlisy.src = User.Perfil.Img_Perfil
    Gerar_Forma_Playlist()
}

function Carregar_Editar_Playlist(ID_PLaylist) {
    for (let c = 0; c < TodasPlaylists.length; c++) {
        if(TodasPlaylists[c].ID == ID_PLaylist) {
            Nova_Playlist = TodasPlaylists[c]
            break
        }
    }

    Valores_Antigos_Playlist = Object.assign({}, Nova_Playlist)

    //! Carregar a img dos colaboradores
    let Participantes_PLaylist = []
    for (let c = 0; c < Nova_Playlist.Colaboradores.length; c++) {
        for (let b = 0; b < Todos_Usuarios.length; b++) {
            if(Todos_Usuarios[b].ID == Nova_Playlist.Colaboradores[c]) {
                Participantes_PLaylist.push(Todos_Usuarios[b])
                break
            }
        }
    }

    for (let b = 0; b < Todos_Usuarios.length; b++) {
        if(Todos_Usuarios[b].ID == Nova_Playlist.Admin) {
            Participantes_PLaylist.push(Todos_Usuarios[b])
            break
        }
    }

    Participantes_PLaylist.reverse()
    const container_imgs_header_criarplaylist = document.getElementById('container_imgs_header_criarplaylist')
    container_imgs_header_criarplaylist.innerHTML = ''
    let nomes_participantes_playlist_page = ''
    const nomes_colaboradores = document.getElementById('nomes_colaboradores')
    let z_index_imgs = Participantes_PLaylist.length
    for (let c = 0; c < Participantes_PLaylist.length; c++) {
        const img = document.createElement('img')
        img.loading = 'lazy'
        img.src = Participantes_PLaylist[c].Perfil.Img_Perfil
        img.style.zIndex = z_index_imgs
        container_imgs_header_criarplaylist.appendChild(img)
        z_index_imgs--

        if(c + 1 > Participantes_PLaylist.length && Participantes_PLaylist.length > 1) {
            nomes_participantes_playlist_page += 'e ' + Participantes_PLaylist[c].Nome
        } else {
            if(Participantes_PLaylist.length > 1) {
                nomes_participantes_playlist_page += Participantes_PLaylist[c].Nome + ', '
            } else {

                nomes_participantes_playlist_page += Participantes_PLaylist[c].Nome
            }
        }
    }

    nomes_colaboradores.innerText = nomes_participantes_playlist_page
    //! -----------

    document.getElementById('input_nome_criar_playlist').value = Nova_Playlist.Nome
    document.getElementById('text_area_add_descricao_criar_playlist').value = Nova_Playlist.Descricao
    document.getElementById('estado_playlist_criar_playlist').innerText = 'Playlist ' + Nova_Playlist.Estado

    let ids_musica_playlist = []

    if(Nova_Playlist.Musicas[0] != undefined) {
        for (let c = 0; c < Nova_Playlist.Musicas.length; c++) {        
            delete Nova_Playlist.Musicas[c].Musica
            ids_musica_playlist.push(Nova_Playlist.Musicas[c].ID_Musica)

            for (let b = 0; b < TodasMusicas.length; b++) {
                if(Nova_Playlist.Musicas[c].ID_Musica == TodasMusicas[b].ID) {
                    musicas_nova_playlist.push(TodasMusicas[b])
                    break
                }
            }
        }
    
        musicas_ids_anteriores = [...ids_musica_playlist]

    } else {
        // musicas_ids_anteriores = [...Nova_Playlist.Musicas]
        // for (let b = 0; b < Nova_Playlist.Musicas.length; b++) {
        //     for (let c = 0; c < TodasMusicas.length; c++) {
        //         if(TodasMusicas[c].ID == Nova_Playlist.Musicas[b]) {
        //             musicas_nova_playlist.push(TodasMusicas[c])
        //             break
        //         }
        //     }
        // }
    }

    Incrementar_Musica()
    Atualizar_Infos_Criar_Playlist()

    Retornar_Musicas_Adicionadas_Criar_Playlist()

    somarTempos(musicas_nova_playlist).then((Tempo) => {
        let resultado = ''

        if(Tempo.Horas > 0) {
            resultado += `${Tempo.Horas} horas`
        }

        if(Tempo.Minutos > 0) {
            if(resultado != '') {
                resultado += `, ${Tempo.Minutos} min`

            } else {
                resultado += `${Tempo.Minutos} min`
            }
        }

        if(Tempo.Segundos > 0) {
            if(resultado != '') {
                resultado += ` e ${Tempo.Segundos} s`

            } else {
                resultado += `${Tempo.Segundos} s`
            }
        }

        let name_msuicas = 'músicas'
        if(musicas_nova_playlist.length == 1) {
            name_msuicas = 'música'
        }

        const infos_musica_playlist_criar = document.getElementById('infos_musica_playlist_criar')
        infos_musica_playlist_criar.innerHTML = ` - ${musicas_nova_playlist.length} ${name_msuicas}, ${resultado}`
    })
}

const container_editar_perfil_header_criar_plylist = document.getElementById('container_editar_perfil_header_criar_plylist')

function Fechar_Editar_Header_CriarPlaylist() {
    container_editar_perfil_header_criar_plylist.style.display = 'none'
}

function Abrir_Editar_Header_CriarPlaylist() {
    container_editar_perfil_header_criar_plylist.style.display = 'flex'
}

const container_iconeidtar_editar_criar_playlist = document.getElementById('container_iconeidtar_editar_criar_playlist')
const container_img_editar_criar_playlist = document.getElementById('container_img_editar_criar_playlist')
const opcs_editar_criar_playlist = document.getElementById('opcs_editar_criar_playlist')
const p_mudar_foto_editar_criarplaylist = document.getElementById('p_mudar_foto_editar_criarplaylist')
const p_remover_foto_editar_criarplaylist = document.getElementById('p_remover_foto_editar_criarplaylist')
const input_link_img_playlist_criar_playlist = document.getElementById('input_link_img_playlist_criar_playlist')
const container_imgs_criar_playlist = document.querySelectorAll('.container_imgs_criar_playlist')

container_iconeidtar_editar_criar_playlist.addEventListener('click', () => {
    if(opcs_editar_criar_playlist.style.display == 'flex') {
        opcs_editar_criar_playlist.style.display = 'none'
        container_imgs_criar_playlist[1].style.opacity = '1'

    } else {
        opcs_editar_criar_playlist.style.display = 'flex'
        container_imgs_criar_playlist[1].style.opacity = '0.1'

        if(input_link_img_playlist_criar_playlist.value.trim() != '') {
            p_remover_foto_editar_criarplaylist.style.display = 'flex'
        } else {
            p_remover_foto_editar_criarplaylist.style.display = 'none'
        }
    }
})

p_remover_foto_editar_criarplaylist.addEventListener('click', () => {
    Nova_Playlist.Img = null
    Incrementar_Musica()
})

document.addEventListener('click', (e) => {
    let el = e.target.className
    let id_elementos = e.target.id
    if(el != 'container_iconeidtar_editar_criar_playlist' && id_elementos != 'input_link_img_playlist_criar_playlist') {
        opcs_editar_criar_playlist.style.display = 'none'

        if(id_elementos != 'p_mudar_foto_editar_criarplaylist') {
            input_link_img_playlist_criar_playlist.style.display = 'none'
            container_imgs_criar_playlist[1].style.opacity = '1'
        }
    }
})

function Atualizar_Infos_Criar_Playlist() {
    const input_nome_criar_playlist = document.getElementById('input_nome_criar_playlist')
    const text_area_add_descricao_criar_playlist = document.getElementById('text_area_add_descricao_criar_playlist')

    const nome_criarplaylist = document.getElementById('nome_criarplaylist')
    const desc_playlist_criar_playlist = document.getElementById('desc_playlist_criar_playlist')

    if(input_nome_criar_playlist.value.trim() != '') {
        nome_criarplaylist.innerText = input_nome_criar_playlist.value
        Nova_Playlist.Nome = input_nome_criar_playlist.value

    } else {
        nome_criarplaylist.innerText = 'Minha Playlisy'
        Nova_Playlist.Nome = ''
    }

    if(text_area_add_descricao_criar_playlist.value.trim() != '') {
        desc_playlist_criar_playlist.innerText = text_area_add_descricao_criar_playlist.value
        Nova_Playlist.Descricao = text_area_add_descricao_criar_playlist.value

    } else {
        desc_playlist_criar_playlist.innerText = ''
        Nova_Playlist.Descricao = ''
    }

    Checar_Postar()
}

let ultimo_link_img
let typingTimer
const typingDelay = 1000
function Checar_Img_CriarPlaylist() {
    if(input_link_img_playlist_criar_playlist.value.trim() != '' && ultimo_link_img != input_link_img_playlist_criar_playlist.value) {
        ultimo_link_img = input_link_img_playlist_criar_playlist.value

        clearTimeout(typingTimer)

        typingTimer = setTimeout(() => {
            if(isValidURL(input_link_img_playlist_criar_playlist.value)) {
                carregarImagem(input_link_img_playlist_criar_playlist.value, function(img_playlist) {
                    if(img_playlist) {
                        validateImage(input_link_img_playlist_criar_playlist.value)
                        .then(img_playlist_safe => {
                            if (img_playlist_safe.isValid && img_playlist_safe.message != 'Ocorreu um erro ao processar a imagem. Por favor, tente novamente mais tarde.') {
                                Notificar_Infos(img_playlist_safe.message, img_playlist_safe.emojis)
                                Nova_Playlist.Img = img_playlist.src
                                Incrementar_Musica()
        
                            } else if(!img_playlist_safe.isValid && img_playlist_safe.message != 'Ocorreu um erro ao processar a imagem. Por favor, tente novamente mais tarde.') {
                                Notificar_Infos(img_playlist_safe.message, 'Link', 'Ver Regras', 'regras.html')
                                    
                            } else {
                                Notificar_Infos(img_playlist_safe.message)
                            }
                        })
        
                    } else {
                        Notificar_Infos('O link da imagem 🌄 não está funcionando 🚫🔗. Por favor, tente outro! 🔄✨')
                    }
                })
            } else {
                input_link_img_playlist_criar_playlist.value = ''
                Notificar_Infos('Oi! 😃 Parece que o link que você tentou adicionar não é válido. 😕 Por favor, verifique o link e tenta de novo. Se precisar de ajuda, estamos aqui! 👍🔗')
            }
        }, typingDelay)

    }
}

p_mudar_foto_editar_criarplaylist.addEventListener('click', () => {
    input_link_img_playlist_criar_playlist.style.display = 'block'
    container_imgs_criar_playlist[1].style.opacity = '0.1'
})

//! Pesquisar Música
const container_musicas_criar_playlist = document.getElementById('container_musicas_criar_playlist')
const pesquisa_criar_playlist = document.getElementById('pesquisa_criar_playlist')

function Pesquisar_Musica_Incrementar(Pesquisa='') {
    let pesquisa_formatada = formatarString(Pesquisa)
    pesquisa_criar_playlist.innerHTML = ''

    if(pesquisa_formatada != '') {
        let array_musicas_encontradas = []
        for (let c = 0; c < TodasMusicas.length && array_musicas_encontradas.length < 21; c++) {
            if(TodasMusicas[c].Estado == 'Ativo') {
                let nome = formatarString(TodasMusicas[c].Nome)
                let autor = formatarString(TodasMusicas[c].Autor)
                let genero = formatarString(TodasMusicas[c].Genero)
        
                if(pesquisa_formatada.includes(nome) || pesquisa_formatada.includes(autor) || pesquisa_formatada.includes(genero) || nome.includes(pesquisa_formatada) || autor.includes(pesquisa_formatada) || genero.includes(pesquisa_formatada)) {
                    array_musicas_encontradas.push(TodasMusicas[c])
                }
            }
        }

        array_musicas_encontradas = removeDuplicatesById(array_musicas_encontradas, musicas_nova_playlist)

        if(array_musicas_encontradas.length > 0) {
            for (let c = 0; c < array_musicas_encontradas.length; c++) {
                const musica_linha = document.createElement('div')
                const primeira_parte_musica_linha = document.createElement('div')
                const img = document.createElement('img')
                const p_contador = document.createElement('p')
                const texto_musica_linha = document.createElement('div')
                const p = document.createElement('p')
                const span = document.createElement('span')
                const segunda_parte_musica_linha = document.createElement('div')
                const adicionar_remover = document.createElement('button')
        
                //! Classes
                musica_linha.classList.add('musica_linha')
                musica_linha.classList.add('Musica_Linha_' + array_musicas_encontradas[c].ID)
                primeira_parte_musica_linha.className = 'primeira_parte_musica_linha'
                texto_musica_linha.className = 'texto_musica_linha'
                segunda_parte_musica_linha.className = 'segunda_parte_musica_linha'
                img.className = 'Img_musica_linha'
                p.className = 'Nome_musica_linha'
                p_contador.className = 'p_contador_musica_curtida'
                span.className = 'Autor_Musica_Linha'
                adicionar_remover.className = 'adicionar_remover_musica_criarplaylist'
        
                //! Valores
                img.loading = 'lazy'
                img.src = array_musicas_encontradas[c].Imagens[0]
                p.innerText = array_musicas_encontradas[c].Nome
                span.appendChild(Retornar_Artistas_Da_Musica(array_musicas_encontradas[c]))
                p_contador.innerText = c + 1
                adicionar_remover.innerText = 'Adicionar Música'
        
        
                //! AppendChild
                primeira_parte_musica_linha.appendChild(img)
                texto_musica_linha.appendChild(p)
                texto_musica_linha.appendChild(span)
                primeira_parte_musica_linha.appendChild(texto_musica_linha)
                musica_linha.appendChild(primeira_parte_musica_linha)
        
                segunda_parte_musica_linha.appendChild(adicionar_remover)
                musica_linha.appendChild(segunda_parte_musica_linha)
                pesquisa_criar_playlist.appendChild(musica_linha)

                //! Funções de click
                adicionar_remover.addEventListener('click', () => {
                    Incrementar_Musica(array_musicas_encontradas[c])
                    musica_linha.remove()

                    if(pesquisa_criar_playlist.innerHTML == '') {
                        input_pesquisar_criarplaylist.value = ''
                        container_musicas_criar_playlist.style.display = 'flex'
                        Retornar_Musicas_Adicionadas_Criar_Playlist()
                    }
                })
            }

            pesquisa_criar_playlist.classList.remove('active')
            pesquisa_criar_playlist.style.display = 'flex'
            container_musicas_criar_playlist.style.display = 'none'

        } else {
            pesquisa_criar_playlist.classList.add('active')
            pesquisa_criar_playlist.innerHTML = '<h1>Ops, não encontramos nenhuma música.</h1>'
            // container_musicas_criar_playlist.style.display = 'flex'
            // Retornar_Musicas_Adicionadas_Criar_Playlist()
        }
    } else {
            pesquisa_criar_playlist.classList.remove('active')
        pesquisa_criar_playlist.style.display = 'none'
        container_musicas_criar_playlist.style.display = 'flex'
        Retornar_Musicas_Adicionadas_Criar_Playlist()
    }
}

const btn_postar_nova_playlist = document.getElementById('btn_postar_nova_playlist')
const btn_cancelar_nova_playlist = document.getElementById('btn_cancelar_nova_playlist')
function Incrementar_Musica(Musica=undefined) {

    if(Musica != undefined) {
        const new_music = {
            ID_Musica: Musica.ID,
            Adicionada_Por: User.ID,
            Data: getDataAtual()
        }
        Nova_Playlist.Musicas.push(new_music)
        musicas_nova_playlist.push(Musica)
    }

    if(musicas_nova_playlist.length > 0) {
        somarTempos(musicas_nova_playlist).then((Tempo) => {
            let resultado = ''
    
            if(Tempo.Horas > 0) {
                resultado += `${Tempo.Horas} horas`
            }
    
            if(Tempo.Minutos > 0) {
                if(resultado != '') {
                    resultado += `, ${Tempo.Minutos} min`
    
                } else {
                    resultado += `${Tempo.Minutos} min`
                }
            }
    
            if(Tempo.Segundos > 0) {
                if(resultado != '') {
                    resultado += ` e ${Tempo.Segundos} s`
    
                } else {
                    resultado += `${Tempo.Segundos} s`
                }
            }
    
            let name_msuicas = 'músicas'
            if(musicas_nova_playlist.length == 1) {
                name_msuicas = 'música'
            }
    
            const infos_musica_playlist_criar = document.getElementById('infos_musica_playlist_criar')
            infos_musica_playlist_criar.innerHTML = ` - ${musicas_nova_playlist.length} ${name_msuicas}, ${resultado}`
        })
    }

    if(Nova_Playlist.Img == null) {
        if(musicas_nova_playlist.length < 4 && musicas_nova_playlist.length > 0) {
            const img = document.createElement('img')
            img.loading = 'lazy'
            img.className = 'active'
            img.src = musicas_nova_playlist[0].Imagens[1]
            container_imgs_criar_playlist[0].innerHTML = ''
            container_imgs_criar_playlist[0].classList.remove('active')
            container_imgs_criar_playlist[0].appendChild(img)
            
            const img2 = document.createElement('img')
            img2.loading = 'lazy'
            img2.className = 'active'
            img2.src = musicas_nova_playlist[0].Imagens[1]
            container_imgs_criar_playlist[1].innerHTML = ''
            container_imgs_criar_playlist[1].classList.remove('active')
            container_imgs_criar_playlist[1].appendChild(img2)

        } else if(musicas_nova_playlist.length >= 4) {
            container_imgs_criar_playlist[0].innerHTML = ''
            for (let c = 0; c < 4; c++) {
                const img = document.createElement('img')
                img.loading = 'lazy'
                img.className = 'active2'
                img.src = musicas_nova_playlist[c].Imagens[1]
                container_imgs_criar_playlist[0].classList.add('active')
                container_imgs_criar_playlist[0].appendChild(img)
            }

            container_imgs_criar_playlist[1].innerHTML = ''
            for (let c = 0; c < 4; c++) {
                const img = document.createElement('img')
                img.loading = 'lazy'
                img.className = 'active2'
                img.src = musicas_nova_playlist[c].Imagens[1]
                container_imgs_criar_playlist[1].classList.add('active')
                container_imgs_criar_playlist[1].appendChild(img)
            }

        } else {
            const img = document.createElement('img')
            img.loading = 'lazy'
            img.src = 'Assets/Imgs/Faixas.png'
            container_imgs_criar_playlist[0].innerHTML = ''
            container_imgs_criar_playlist[0].classList.remove('active')
            container_imgs_criar_playlist[0].appendChild(img)
            
            const img2 = document.createElement('img')
            img2.loading = 'lazy'
            img2.src = 'Assets/Imgs/Faixas.png'
            container_imgs_criar_playlist[1].classList.remove('active')
            container_imgs_criar_playlist[1].innerHTML = ''
            container_imgs_criar_playlist[1].appendChild(img2)
        }
    } else { 
        const img = document.createElement('img')
        img.loading = 'lazy'
        img.className = 'active'
        img.src = Nova_Playlist.Imagens[1]
        container_imgs_criar_playlist[0].classList.remove('active')
        container_imgs_criar_playlist[0].innerHTML = ''
        container_imgs_criar_playlist[0].appendChild(img)
        
        const img2 = document.createElement('img')
        img2.loading = 'lazy'
        img2.className = 'active'
        img2.src = Nova_Playlist.Imagens[1]
        container_imgs_criar_playlist[1].classList.remove('active')
        container_imgs_criar_playlist[1].innerHTML = ''
        container_imgs_criar_playlist[1].appendChild(img2)
    }

    Checar_Postar()
}

function Checar_Postar() {
    let pd_postar = false
    let musica_adicionada = false
    if(Editando_Playlist) {
        for (let c = 0; c < Nova_Playlist.Musicas.length; c++) {
            if(musicas_ids_anteriores[c] != Nova_Playlist.Musicas[c].ID_Musica || musicas_ids_anteriores.length != Nova_Playlist.Musicas.length) {
                musica_adicionada = true
                break
            }
        }

        if(Nova_Playlist.Nome != Valores_Antigos_Playlist.Nome || Nova_Playlist.Descricao != Valores_Antigos_Playlist.Descricao || Nova_Playlist.Img != Valores_Antigos_Playlist.Img || Nova_Playlist.Estado != Valores_Antigos_Playlist.Estado || Nova_Playlist.Musicas.length != Valores_Antigos_Playlist.Musicas.length || musica_adicionada) {
            musica_adicionada = true
        }
    } else {
        musica_adicionada = true
    }

    if(musicas_nova_playlist.length > 0 && Nova_Playlist.Nome != '' && musica_adicionada) {
        btn_postar_nova_playlist.style.display = 'block'
        pd_postar = true
    } else {
        btn_postar_nova_playlist.style.display = 'none'
    }

    if(musicas_nova_playlist.length > 0 || Nova_Playlist.Nome != '' || Nova_Playlist.Descricao != '' || Nova_Playlist.Img != undefined) {
        btn_cancelar_nova_playlist.style.display = 'block'
    } else {
        btn_cancelar_nova_playlist.style.display = 'none'
    }

    return pd_postar
}

btn_cancelar_nova_playlist.addEventListener('click', () => {
    if(Editando_Playlist) {
        Abrir_Pagina('playlist', Nova_Playlist.ID)
    }

    setTimeout(() => {
        Zerar_Nova_playlist()
    }, 1500)
})

function Zerar_Nova_playlist() {
    text_area_add_descricao_criar_playlist.value = ''
    input_nome_criar_playlist.value = ''
    pesquisa_criar_playlist.innerHTML = ''
    container_musicas_criar_playlist.innerHTML = ''
    document.getElementById('container_pesquisar_criarplaylist').value = ''
    document.getElementById('infos_musica_playlist_criar').innerHTML = ''
    document.getElementById('estado_playlist_criar_playlist').innerText = 'Playlist Pública'
    atualizarURL('criarplaylist')

    musicas_nova_playlist = []
    Editando_Playlist = false
    musicas_ids_anteriores = []

    Gerar_Forma_Playlist()
    Atualizar_Infos_Criar_Playlist()
    Checar_Postar()
    Incrementar_Musica()
    TornarPlaylist_Publica()
}

btn_postar_nova_playlist.addEventListener('click', () => {
    if(Checar_Postar()) {
        let feito = false

        db.collection('Playlists').get().then((snapshot) => {
            snapshot.docs.forEach(Playlists => {
                TodasPlaylists = Playlists.data().Playlists

                if(!feito) {
                    feito = true

                    if(!Editando_Playlist) {
                        TodasPlaylists.push(Nova_Playlist)
                        db.collection('Playlists').doc(Playlists.id).update({ Playlists: TodasPlaylists }).then(() => {
                            Notificar_Infos('Playlist criada com sucesso! 🎉🎶', 'Comemorar')
                            Abrir_Pagina('playlist', Nova_Playlist.ID)
                            setTimeout(() => {
                                Zerar_Nova_playlist()
                            }, 1500)
                        })
                    } else {
                        for (let c = 0; c < TodasPlaylists.length; c++) {
                            if(TodasPlaylists[c].ID == Nova_Playlist.ID) {
                                TodasPlaylists[c] = Nova_Playlist

                                db.collection('Playlists').doc(Playlists.id).update({ Playlists: TodasPlaylists }).then(() => {
                                    Avisos_Rapidos('Playlist editada com sucesso! 🎉🎶')
                                    Carreagr_Artistas_Seguindo()
                                    Abrir_Pagina('playlist', Nova_Playlist.ID)
                                    setTimeout(() => {
                                        Zerar_Nova_playlist()
                                    }, 1500)
                                })
                                break
                            }
                        }
                    }
                }
            })
        })
    }
})

function Retornar_Musicas_Adicionadas_Criar_Playlist() {
    container_musicas_criar_playlist.innerHTML = ''

    if(musicas_nova_playlist.length > 0) {
        for (let c = musicas_nova_playlist.length - 1; c >= 0 ; c--) {
            const musica_linha = document.createElement('div')
            const primeira_parte_musica_linha = document.createElement('div')
            const img = document.createElement('img')
            const p_contador = document.createElement('p')
            const texto_musica_linha = document.createElement('div')
            const p = document.createElement('p')
            const span = document.createElement('span')
            const segunda_parte_musica_linha = document.createElement('div')
            const adicionar_remover = document.createElement('button')
    
            //! Classes
            musica_linha.classList.add('musica_linha')
            musica_linha.classList.add('Musica_Linha_' + musicas_nova_playlist[c].ID)
            primeira_parte_musica_linha.className = 'primeira_parte_musica_linha'
            texto_musica_linha.className = 'texto_musica_linha'
            segunda_parte_musica_linha.className = 'segunda_parte_musica_linha'
            img.className = 'Img_musica_linha'
            p.className = 'Nome_musica_linha'
            p_contador.className = 'p_contador_musica_curtida'
            span.className = 'Autor_Musica_Linha'
            adicionar_remover.className = 'adicionar_remover_musica_criarplaylist'
    
            //! Valores
            img.loading = 'lazy'
            img.src = musicas_nova_playlist[c].Imagens[0]
            p.innerText = musicas_nova_playlist[c].Nome
            span.appendChild(Retornar_Artistas_Da_Musica(musicas_nova_playlist[c]))
            p_contador.innerText = c + 1
            adicionar_remover.innerText = 'Remover Música'
    
    
            //! AppendChild
            primeira_parte_musica_linha.appendChild(img)
            texto_musica_linha.appendChild(p)
            texto_musica_linha.appendChild(span)
            primeira_parte_musica_linha.appendChild(texto_musica_linha)
            musica_linha.appendChild(primeira_parte_musica_linha)
    
            segunda_parte_musica_linha.appendChild(adicionar_remover)
            musica_linha.appendChild(segunda_parte_musica_linha)
            container_musicas_criar_playlist.appendChild(musica_linha)

            //! Funções de click
            adicionar_remover.addEventListener('click', () => {
                Nova_Playlist.Musicas.splice(c, 1)
                musicas_nova_playlist.splice(c, 1)
                musica_linha.remove()
                Incrementar_Musica()
            })
        }
    }
}

//! Configs
const btn_config_criarplaylist = document.getElementById('btn_config_criarplaylist')
btn_config_criarplaylist.addEventListener('click', (event) => {
    Ativar_Opcoes_Click_Direita('Criar Playlist', TodasMusicas[0], 0)
    posicionarElemento(event, document.getElementById('opcoes_click_direito'))
})

//! -------------------------------- Convidar Colaborador -----------------------------------------------------