const Paginas_Nao_Salvar_No_Historico = ['verletra', 'adicionarletra']
const btn_voltar_pagina = document.getElementById('btn_voltar_pagina')
const btn_avancar_pagina = document.getElementById('btn_avancar_pagina')

let Historico_De_Navegacao = {
    Indice: 0,
    Historico: []
}
let pode_salvar_navegacao = true
function Salvar_Navegacao(Pagina, ID) {
    let Pode_Salvar_Pagina = true
    for (let c = 0; c < Paginas_Nao_Salvar_No_Historico.length; c++) {
        if(Pagina == Paginas_Nao_Salvar_No_Historico[c]) {
            Pode_Salvar_Pagina = false
            break
        }
    }
    
    if(Pode_Salvar_Pagina) {
        if(Historico_De_Navegacao.Historico.length <= 0 || Pagina != Historico_De_Navegacao.Historico[Historico_De_Navegacao.Historico.length - 1].Pagina || ID != Historico_De_Navegacao.Historico[Historico_De_Navegacao.Historico.length - 1].ID) {
            const Nova_Pagina = {
                Pagina,
                ID,
            }
    
            if(Historico_De_Navegacao.Indice != Historico_De_Navegacao.Historico.length - 1) {
                Historico_De_Navegacao.Historico = Historico_De_Navegacao.Historico.slice(0, Historico_De_Navegacao.Indice + 1)
            }
    
            Historico_De_Navegacao.Historico.push(Nova_Pagina)
            Historico_De_Navegacao.Indice = Historico_De_Navegacao.Historico.length - 1
        }
    }

    Checar_Btns_Navegacao()
}

function Checar_Btns_Navegacao() {
    //! Caso estejá na ultima casa
   if(Historico_De_Navegacao.Indice == Historico_De_Navegacao.Historico.length - 1 && Historico_De_Navegacao.Historico.length > 1) {
        btn_voltar_pagina.className = 'active'
        btn_avancar_pagina.className = ''

    //! Caso esteja na primeira casa
   } else if(Historico_De_Navegacao.Indice == 0  && Historico_De_Navegacao.Historico.length > 1) {
        btn_voltar_pagina.className = ''
        btn_avancar_pagina.className = 'active'
   } else if(Historico_De_Navegacao.Indice != 0 && Historico_De_Navegacao.Indice != Historico_De_Navegacao.Historico.length - 1 && Historico_De_Navegacao.Historico.length > 2) {
        btn_avancar_pagina.className = 'active'
        btn_voltar_pagina.className = 'active'
   }
}

function Voltar_Para_Pagina_Anterior() {
    if(Historico_De_Navegacao.Indice > 0) {
        pode_salvar_navegacao = false
        let Novo_Indice = Historico_De_Navegacao.Indice - 1
        Historico_De_Navegacao.Indice = Novo_Indice


        atualizarURL(Historico_De_Navegacao.Historico[Novo_Indice].Pagina, Historico_De_Navegacao.Historico[Novo_Indice].ID)
        Recarregar_Infos_Url()
    }

    Checar_Btns_Navegacao()
}

function Avancar_Para_Proxima_Pagina() {
    if(Historico_De_Navegacao.Indice < Historico_De_Navegacao.Historico.length - 1) {
        pode_salvar_navegacao = false
        let Novo_Indice = Historico_De_Navegacao.Indice + 1
        Historico_De_Navegacao.Indice = Novo_Indice


        atualizarURL(Historico_De_Navegacao.Historico[Novo_Indice].Pagina, Historico_De_Navegacao.Historico[Novo_Indice].ID)
        Recarregar_Infos_Url()
    }

    Checar_Btns_Navegacao()
}