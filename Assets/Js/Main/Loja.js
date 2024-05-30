function Iniciar_Loja(Musica) {
    Abrir_Pagina('loja', `loja_${Musica.ID}`)
}

function Carregar_Infos_Perfil_Loja() {
    document.getElementById('p_quantos_pontos_nav').innerText = User.Loja.Pontos
}