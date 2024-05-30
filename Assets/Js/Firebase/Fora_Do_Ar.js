function Checar_Fora_Do_Ar() {
    let Admin_Infos
    let email_user

    auth.onAuthStateChanged((val) => {
        if(val) {
            email_user = val.email
        }
    })

    db.collection('Admin').onSnapshot(
        (snapshot) => {
            Admin_Infos = snapshot.docs.map((doc) => doc.data())[0]
            // console.log('Admin_Infos atualizado:', Admin_Infos);

            let email_igual = false
            for (let c = 0; c < Admin_Infos.Admins.length; c++) {
                if(Admin_Infos.Admins[c] == email_user) {
                    email_igual = true
                }
            }
    
            if(!Admin_Infos.Fora_Do_Ar && location.href.includes('fora_do_ar.html')) {
                location.href = 'index.html'

            } else {
                if(!email_igual && Admin_Infos.Fora_Do_Ar && !location.href.includes('fora_do_ar.html')) {
                location.href = 'fora_do_ar.html'
        
                } else if(email_igual && location.href.includes('fora_do_ar.html')) {
                location.href = 'index.html'
                }
            }
        },
        (error) => {
            console.error('Erro ao atualizar Admin_Infos:', error)
        }
    )
} Checar_Fora_Do_Ar()

function fazer_login() {
    auth.signInWithPopup(provider)

    auth.onAuthStateChanged((val) => {
        Checar_Fora_Do_Ar()
    })
}