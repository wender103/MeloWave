function Execultar_Funcoes_Ao_Carregar() {
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

    Retornar_Daily()
    Retornar_Todas_Secoes()
    Carreagr_Artistas_Seguindo()
}