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
        } catch{}

        try {
            Retornar_Todas_Secoes()
        } catch{}

        try {
            Carreagr_Artistas_Seguindo()
        } catch{}

        try {
            Checar_Notificacao_Artista_Seguindo()
        } catch{}

        try {
            Carregar_Banimento()
        } catch{}

        try {
            Carregar_Infos_Perfil_Loja()
        } catch{}

        if(Pagina_Atual.Nome == 'home') {
            if(User.Perfil.Img_Background) {
                Trocar_Background(User.Perfil.Img_Background, document.querySelector('body'))
            }
        }
    }
}