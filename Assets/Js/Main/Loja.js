const Pontos_Por_Atividade = {
    Adicionar_Musica: 50
}

function Iniciar_Loja(Musica) {
    Abrir_Pagina('loja', `loja_${Musica.ID}`)
}

function Atualizar_Infos_Perfil_Loja() {
    document.getElementById('p_quantos_pontos_nav').innerText = User.Loja.Pontos
}