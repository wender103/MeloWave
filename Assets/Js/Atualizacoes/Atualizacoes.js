let Array_Atualizacoes = []
function Carregar_Atualizacoes() {
    Array_Atualizacoes = []
    db.collection('Admin').get().then((snapshot) => {
        snapshot.docs.forEach(Admin_Infos => {
            Array_Atualizacoes = Admin_Infos.data().Atualizacoes

            Carregar_Na_Tela()
        })
    })
} Carregar_Atualizacoes()

function Carregar_Na_Tela() {
    let pre = document.querySelector('pre')
    pre.innerHTML = ''

    for (let c = 0; c < Array_Atualizacoes.length; c++) {
        let resp = `
        <div class='container_notificacao'>
        <span>${Array_Atualizacoes[c].Data}</span>
        <h1>${Array_Atualizacoes[c].Titulo}</h1>
        ${Array_Atualizacoes[c].Mensagem}
        </div>
        `

        if(c + 1 != Array_Atualizacoes.length) {
            resp += `<hr>`
        }
    
        pre.innerHTML += resp
    }
}

let btn_home = document.querySelector('#ir_para_o_home')

btn_home.addEventListener('click', () => {
    location.href = 'index.html'
})