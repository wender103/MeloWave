let Paginas_Nao_Trocar_Background = ['meuperfil', 'artista', 'adicionarletra', 'perfil']

let Pagina_Atual = {
    Nome: 'home',
    ID: undefined,
    Musicas: []
}

function Abrir_Pagina(Pagina, ID) {
    
    //! Caso já esteja na pág configs ele volta para página anterior
    if(Pagina_Atual.Nome == 'configuracoes' && Pagina == 'configuracoes' && Historico_De_Navegacao.Historico.length > 1) {
        Voltar_Para_Pagina_Anterior()

    } else if(Pagina_Atual.Nome == 'configuracoes' && Pagina == 'configuracoes' && Historico_De_Navegacao.Historico.length <= 1) {
        Abrir_Pagina('home', undefined)
    } else {
        document.querySelector("main").style.overflow = 'auto'
        const Paginas_Sem_Btns_Voltar = ['verpagina', 'adicionarletra', 'verletra']

        Pagina_Atual.Nome = Pagina,
        Pagina_Atual.ID = ID

        if(pode_salvar_navegacao) {
            Salvar_Navegacao(Pagina, ID)
        }

        pode_salvar_navegacao = true

        let pagina_igual = false
        for (let c = 0; c < Paginas_Nao_Trocar_Background.length; c++) {
            if(Paginas_Nao_Trocar_Background[c] == Pagina_Atual.Nome) {
                pagina_igual = true
                break
            }
        }

        if(!User.Configuracoes.Background.Cores_Solidas) {
            animateBackgroundColor('transparent', lista_elementos_mudar_cor_letra, 800)
            animateBackgroundColor('#2e31333f', document.querySelector('nav').querySelectorAll('ul'), 800)
        }
        Fechar_Creditos()
        
        if(Pagina != 'verletra') {
            pd_atualizar_letra_pc = false
            if(reabrir_letra_aba_musica_tocando_agora) {
                Mostrar_Letra_Tela_Tocando_Agora()
            }

            Remover_Opacidade_Das_Cores_Fundo_Interativo()

            if(User.Configuracoes.Background.Cores_Solidas) {
                animateBackgroundColor('#121212', document.querySelector('main'), 500, true)
            }
        }
        
        let tem_btns_voltar = true
        for (let c = 0; c < Paginas_Sem_Btns_Voltar.length; c++) {
            if(Pagina == Paginas_Sem_Btns_Voltar[c]) {
                tem_btns_voltar = false
                document.getElementById('btn_voltar_pagina').style.display = 'none'
                document.getElementById('btn_avancar_pagina').style.display = 'none'
                break
            }
        }

        if(User.Configuracoes.Tema == 'Escuro') {
            mudarTemaParaEscuro()
        } else {
            mudarTemaParaClaro()
        }

        if(tem_btns_voltar) {
            document.getElementById('btn_voltar_pagina').style.display = 'flex'
            document.getElementById('btn_avancar_pagina').style.display = 'flex'
        }

        if(Listas_Prox.MusicaAtual.Img && !pagina_igual) {
            Trocar_Background(Listas_Prox.MusicaAtual.Img, document.body)
            Trocar_Background(Listas_Prox.MusicaAtual.Img, document.getElementById('img_artistas_cores_solidas'), `linear-gradient(to bottom, ${Listas_Prox.MusicaAtual.Cores[0]}, transparent)`, document.getElementById('cor_artista_cores_solidas'))
        }
        
        document.getElementById('bnt_editar_meu_perfil').style.display = 'none'

        atualizarURL(Pagina, ID)
        const Paginas = document.querySelectorAll('.Paginas')

        Paginas.forEach(Pagina_especifica => {
            if(Pagina_especifica.style.opacity = 1 && Pagina_especifica.id != `Pagina_${Pagina}`) {
                Pagina_especifica.style.opacity = 0

                setTimeout(() => {
                    Pagina_especifica.classList.remove('Pagina_Aberta')
                    document.getElementById(`Pagina_${Pagina}`).classList.add('Pagina_Aberta')

                    setTimeout(() => {
                        document.getElementById(`Pagina_${Pagina}`).style.opacity = 1
                    }, 200) 
                }, 200)
            }
        })

        let desativar_blur = false
        if(Pagina == 'pesquisar') {
            document.getElementById('input_pesquisa').style.display = 'flex'
        } else {
            document.getElementById('input_pesquisa').style.display = 'none'

            if(Pagina == 'home') {
                Mostrar_Max_Musicas()
                Artistas_Tocados_Recentemente()
                Retornar_Artistas_Mais_Vistos()
                Retornar_Tocados_Recentemente_Primeira_Parte()

                setTimeout(() => {
                    Mostrar_Max_Musicas()

                    setTimeout(() => {
                        Mostrar_Max_Musicas()
                    }, 500)
                }, 200)

            } else if(Pagina == 'musicascurtidas') {
                Retornar_Musicas_Curtidas()

            } else if(Pagina == 'notificacao') {
                document.getElementById('bolinha_icone_noficacao').style.display = 'none'

            } else if(Pagina == 'meuperfil') {
                // desativar_blur = true
                Carregar_Meu_Perfil()
            } else if(Pagina == 'perfil') {
                // desativar_blur = true
            } else if(Pagina == 'artista') {
                // desativar_blur = true
            } else if(Pagina == 'adicionarletra') {
                if(!Array.isArray(musica_editando_meu_perfil.Letra)) {
                    text_area_add_letra.value = musica_editando_meu_perfil.Letra.Letra_Musica
                } else {
                    text_area_add_letra.value = ''
                }

            } else if(Pagina == 'biblioteca') {
                Carregar_Biblioteca()
            } else if(Pagina == 'criarmatch') {
                Carregar_Criar_Match()

            } else if(Pagina == 'aceitarmatch') {
                Carregar_Infos_Aceitar_Match(ID)

            } else if(Pagina == 'match') {
                Abrir_Match(ID)

            } else if(Pagina == 'criarplaylist')  {
                Carregar_Infos_Criar_Playlist()
                
            } else if(Pagina == 'playlist') {
                Abrir_Playlist(ID)
            } else if(Pagina == 'aceitarplaylist') {
                Checar_Aceitar_Playlist(ID)
            } else {
                Fechar_Add_Letra('Não Voltar a Página')
            }
        }

        if(Pagina != 'artista') {
            Nome_Artista_Pagina_Aberta = undefined
        }

        if(Pagina != 'playlist' && Pagina != 'criarplaylist') {
            Playlist_Aberta = undefined
        }

        if(desativar_blur) {
            setTimeout(() => {
                aplicar_filtros(reset_background, 'Aplicar')
            }, 500)
        } else {
            aplicar_filtros(filtrosAplicados, 'Aplicar')
        }

        //! Limpar Paginas
        if(!Pagina == 'ver_letra') {
            setTimeout(() => {
                Limpar_Paginas()
            }, 800)
        }
    }
}

const reset_background = {
  blur: 0,
  contraste: 100,
  brilho: 100,
  saturacao: 100
}