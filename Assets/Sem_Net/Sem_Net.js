// Função que é chamada quando a conexão é perdida
function handleOffline() {
    document.getElementById("Container_Off_Line").style.display = 'flex'
}

// Função que é chamada quando a conexão é restaurada
function handleOnline() {
    location.reload()
}

window.addEventListener('offline', handleOffline)
window.addEventListener('online', handleOnline)