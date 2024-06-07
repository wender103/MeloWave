function Execultar_Funcoes_Ao_Carregar() {
    if(User) {
        try {
            for (let c = 0; c < TodasMusicas.length; c++) {
                for (let b = 0; b < User.Historico.Musicas.length; b++) {
                    if(User.Historico.Musicas[b] == TodasMusicas[c].ID) {
                        User.Historico.Musicas[b] = TodasMusicas[c]
                    }
                }
        
                for (let b = 0; b < User.Musicas_Curtidas.length; b++) {
                    if(User.Musicas_Curtidas[b] == TodasMusicas[c].ID) {
                        User.Musicas_Curtidas[b] = TodasMusicas[c]
                    }
                }
            }
        } catch{}

        try {
            Retornar_Daily()
        } catch(e){
            console.warn(e)
        }

        try {
            Retornar_Todas_Secoes()
        } catch(e){
            console.warn(e)
        }

        try {
            Carreagr_Artistas_Seguindo()
        } catch(e){
            console.warn(e)
        }

        try {
            Checar_Notificacao_Artista_Seguindo()
        } catch(e){
            console.warn(e)
        }

        try {
            Carregar_Banimento()
        } catch(e){
            console.warn(e)
        }

        try {
            Atualizar_Infos_Perfil_Loja()
        } catch(e){
            // console.warn(e)
        }

        try {
            if(Pagina_Atual.Nome == 'home') {
                if(User.Perfil.Img_Background) {
                    Trocar_Background(User.Perfil.Img_Background, document.querySelector('body'))
                }
            }
        } catch{}

        try {
            Carregar_Musica_Pendentes()
        } catch{}

        try {
            Remover_Musicas_Tempo_Exedido()
        } catch{}

        try {
            Carregar_Notificacaoes()
        } catch{}

        try {
            Artistas_Tocados_Recentemente()
        } catch(e){console.warn(e)}

        try {
            Mostrar_Max_Musicas()
        } catch {}

        try {
            Retornar_Artistas_Mais_Vistos()
        } catch{}

        if(window.location.pathname === '/MeloWave/index.html' || window.location.pathname === '/MeloWave/' || window.location.pathname === '/' || window.location.pathname === '/index.html') {
            try {
                setTimeout(() => {
                    closeLoadingScreen()
                }, 100)
            } catch{}
        }
    }
}