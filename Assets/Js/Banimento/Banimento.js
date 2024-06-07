let emoji_do_banimento_e_supensao = document.querySelector('.emoji')
let titulo_do_banimento_e_supensao = document.querySelector('#estado')
let tempo_do_banimento_e_suspensao = document.querySelector('#tempo')
let motivo_do_banomento_e_suspensao = document.querySelector('#motivo')

function Carregar_Banimento() {
    if(!location.href.includes('aviso') && User.Estado_Da_Conta.Estado.includes('Banido') || !location.href.includes('aviso') && User.Estado_Da_Conta.Estado == 'Suspenso') {
        location.href = 'aviso.html'

    } else {
        if(User.Estado_Da_Conta.Tempo != 'Permanente' && jaPassou(User.Estado_Da_Conta.Tempo)) {
            User.Estado_Da_Conta.Estado = 'Ativo'
            User.Estado_Da_Conta.Motivo = ''
            User.Estado_Da_Conta.Tempo = ''
            //console.log('Caiu aki');
            db.collection('Users').doc(User.ID).update({ Estado_Da_Conta: User.Estado_Da_Conta }).then(() => {
                setTimeout(() => {
                    if(location.href.includes('aviso') && User.Estado_Da_Conta.Estado == 'Ativo') {
                        location.href = 'index.html'
                    }
                }, 200)
            })
        } else {
            if (User.Estado_Da_Conta.Estado.includes('Banido')) {
    
                emoji_do_banimento_e_supensao.innerText = '🚷'
                titulo_do_banimento_e_supensao.innerText = 'Você Foi Banido!'
                motivo_do_banomento_e_suspensao.innerHTML = `<strong>Motivo:</strong> ${User.Estado_Da_Conta.Motivo}`
                if (User.Estado_Da_Conta.Tempo == 'Permanente') {
                    tempo_do_banimento_e_suspensao.innerText = User.Estado_Da_Conta.Tempo
                } else {
                    tempo_do_banimento_e_suspensao.innerHTML = '<strong>🚫 Você foi banido por:</strong> ' + calcularTempoRestante(User.Estado_Da_Conta.Tempo)
                }
        
            } else if (User.Estado_Da_Conta.Estado.includes('Suspenso')) {
                emoji_do_banimento_e_supensao.innerText = '⚠'
                titulo_do_banimento_e_supensao.innerText = 'Você Foi Suspenso!'
                motivo_do_banomento_e_suspensao.innerHTML = `<strong>Motivo:</strong> ${User.Estado_Da_Conta.Motivo}`
                if (User.Estado_Da_Conta.Tempo == 'Permanente') {
                    tempo_do_banimento_e_suspensao.innerText = User.Estado_Da_Conta.Tempo
                } else {
                    tempo_do_banimento_e_suspensao.innerHTML = '<strong>🚧 Você foi suspenso por:</strong> ' + calcularTempoRestante(User.Estado_Da_Conta.Tempo)
                }
            } else if(location.href.includes('aviso') && User.Estado_Da_Conta.Estado == 'Ativo') {
                location.href = 'index.html'
            }
        }

        if(location.href.includes('aviso')) {
            closeLoadingScreen()
        }
    }
}

function Aplicar_Ban(User_Recebido, Comando='Banir', Infracao) {
    if(Comando == '') {
        Comando = 'Banir'
    }

    const Penalidades_E_Tolerancia = [
        {
            Nome: 'Imagens de Perfil e Background',
            Avisos: 2,
            Suspensao: null,
            Ban: 'Permanente',
            Motivo_Ban: 'Sua conta foi banida permanentemente por tentar usar: imagens inapropriadas. 🚫 Tal comportamento é inaceitável e demonstra total desrespeito pelas regras e pela comunidade. 😠 Reflita sobre suas ações e suas consequências. 😢'
        },
        {
            Nome: 'Comportamento Abusivo',
            Avisos: 3,
            Suspensao: [
                {
                    Tempo: {
                        Dias: 0,
                        Meses: 0,
                        Anos: 0
                    }
                },
                {
                    Tempo: {
                        Dias: 7,
                        Meses: 0,
                        Anos: 0
                    },
                    Motivo_Suspenso: 'Sua conta foi suspensa por 7 dias, motivo: comportamento abusivo. ⏳ Este é um aviso sério. Reflita sobre suas ações. ⚠️'
                },
                {
                    Tempo: {
                        Dias: 30,
                        Meses: 0,
                        Anos: 0
                    },
                    Motivo_Suspenso: 'Sua conta foi suspensa por 30 dias, motivo: comportamento abusivo. ⏳ Este é um aviso sério. Reflita sobre suas ações. ⚠️'
                }
            ],
            Ban: 'Permanente',
            Motivo_Ban: 'Sua conta foi banida permanentemente por ter um: comportamento abusivo. 🚫 Tal comportamento é inaceitável e demonstra total desrespeito pelas regras e pela comunidade. 😠 Reflita sobre suas ações e suas consequências. 😢'
        },
        {
            Nome: 'Nomes Inapropriados',
            Avisos: 2,
            Suspensao: [
                {
                    Tempo: {
                        Dias: 0,
                        Meses: 0,
                        Anos: 0
                    }
                },
                {
                    Tempo: {
                        Dias: 7,
                        Meses: 0,
                        Anos: 0
                    },
                    Motivo_Suspenso: 'Sua conta foi suspensa por 7 dias, motivo: nomes inapropriados. ⏳ Por favor, respeite as regras da comunidade para evitar penalidades futuras. 🙏'
                }
            ],
            Ban: 'Permanente',
            Motivo_Ban: 'Sua conta foi banida permanentemente por usar: nomes inapropriados. 🚫 Tal comportamento é inaceitável e demonstra total desrespeito pelas regras e pela comunidade. 😠 Reflita sobre suas ações e suas consequências. 😢'
        },
        {
            Nome: 'Descrições Ofensivas ou Racistas',
            Avisos: 3,
            Suspensao: [
                {
                    Tempo: {
                        Dias: 0,
                        Meses: 0,
                        Anos: 0
                    }
                },
                {
                    Tempo: {
                        Dias: 7,
                        Meses: 0,
                        Anos: 0
                    },
                    Motivo_Suspenso: 'Sua conta foi suspensa por 7 dias, motivo: descrições ofensivas ou racistas. ⏳ Por favor, respeite as regras da comunidade para evitar penalidades futuras. 🙏'
                },
                {
                    Tempo: {
                        Dias: 0,
                        Meses: 1,
                        Anos: 0
                    },
                    Motivo_Suspenso: 'Sua conta foi suspensa por 1 mês, motivo: descrições ofensivas ou racistas. ⏳ Por favor, respeite as regras da comunidade para evitar penalidades futuras. 🙏'
                }
            ],
            Ban: 'Permanente',
            Motivo_Ban: 'Sua conta foi banida permanentemente por fazer: descrições ofensivas ou racistas. 🚫 Tal comportamento é inaceitável e demonstra total desrespeito pelas regras e pela comunidade. 😠 Reflita sobre suas ações e suas consequências. 😢'
        },
    ]

    Todos_Usuarios = []
    let feito = false

    db.collection('Users').get().then((snapshot) => {
        let contador = 0

        snapshot.docs.forEach(Users => {
            const InfoUsers = Users.data()

            Todos_Usuarios.push(InfoUsers)

            Todos_Usuarios[contador].ID = Users.id
            contador++
        })

        if(!feito) {
            feito = true

            for (let c = 0; c < Todos_Usuarios.length; c++) {
                if(Todos_Usuarios[c].ID == User_Recebido.ID) {
                    if(Comando.includes('Banir')) {
                        User_Recebido.Estado_Da_Conta.Historico_De_Infracoes.push(Infracao)
                    }

                    let Todas_Infracoes_User = User_Recebido.Estado_Da_Conta.Historico_De_Infracoes
                    function contarInfracoes(Todas_Infracoes_User) {
                        let contagemInfracoes = {}
                    
                        Todas_Infracoes_User.forEach(infracao => {
                            if (contagemInfracoes[infracao]) {
                                contagemInfracoes[infracao]++
                            } else {
                                contagemInfracoes[infracao] = 1
                            }
                        })
                    
                        return contagemInfracoes
                    } 

                    const numero_infracoes = contarInfracoes(Todas_Infracoes_User)


                    if(Comando.includes('Analizar')) {
                        //console.log(`-=-=-= Infos Ban User ${User.Nome} -=-=--=`)

                        //console.log('Número De Infrações Cometidas:')
                        if(numero_infracoes.length > 0) {
                            //console.log(numero_infracoes)
                        } else {
                            //console.log('Nehuma infração cometida')
                        }

                        //console.log('Historico De Infrações:')
                        //console.log(User.Estado_Da_Conta.Historico_De_Infracoes)

                        //console.log('Historico De Penalidades:')
                        //console.log(User.Estado_Da_Conta)
                        //console.log('-=-=--=-==--=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-')
                        } 
                        
                    if(Comando.includes('Banir')){
                        for (let c = 0; c < Penalidades_E_Tolerancia.length; c++) {
                            if(Penalidades_E_Tolerancia[c].Nome == Infracao) {
                                if(numero_infracoes[Infracao] - 1 >= Penalidades_E_Tolerancia[c].Avisos) {
                                    //! Vai banier o user
                                    User_Recebido.Estado_Da_Conta.Estado = 'Banido'
                                    User_Recebido.Estado_Da_Conta.Motivo = Penalidades_E_Tolerancia[c].Motivo_Ban
                                    User_Recebido.Estado_Da_Conta.Tempo = 'Permanente'
                                    //console.log('-=-=-=-=-=-=-')
                                    //console.log('User Banido ❌🤬')
                                    //console.log('-=-=-=-=-=-=-')
                                    break

                                } else {
                                    //! Vai Suspender o user
                                    if(Penalidades_E_Tolerancia[c].Suspensao != null && tmp.Tempo.Dias != 0 || Penalidades_E_Tolerancia[c].Suspensao != null && tmp.Tempo.Meses != 0 || Penalidades_E_Tolerancia[c].Suspensao != null && tmp.Tempo.Anos != 0) {
                                        let tmp = Penalidades_E_Tolerancia[c].Suspensao[numero_infracoes[Infracao] - 1]
                                        //console.log(tmp)
                                        //console.log(numero_infracoes)
                                        //console.log(numero_infracoes[Infracao])
                                        //console.log(Infracao)
                                        let tmp_formatado = [tmp.Tempo.Dias, tmp.Tempo.Meses, tmp.Tempo.Anos]

                                        if(getDataAtual(tmp_formatado[0], tmp_formatado[1], tmp_formatado[2]) != getDataAtual()) {
                                            //console.log('-=-=-=-=-=-=-')
                                            //console.log('Data diferente 🟨🟡')
                                            //console.log(getDataAtual(tmp_formatado[0], tmp_formatado[1], tmp_formatado[2]), getDataAtual())
                                            //console.log('-=-=-=-=-=-=-')
        
                                            User_Recebido.Estado_Da_Conta.Estado = 'Suspenso'
                                            User_Recebido.Estado_Da_Conta.Motivo = Penalidades_E_Tolerancia[c].Suspensao[numero_infracoes[Infracao] - 1].Motivo_Suspenso
                                            User_Recebido.Estado_Da_Conta.Tempo = getDataAtual(tmp_formatado[0], tmp_formatado[1], tmp_formatado[2])
        
                                        } else {
                                            //console.log('-=-=-=-=-=-=-')
                                            //console.log('Data igual 🟩❇')
                                            //console.log('-=-=-=--=-=-=-')
                                        }
                                    }
                                    break
                                }
                            }
                        }
                    }
                    break
                }
            }

            db.collection('Users').doc(User_Recebido.ID).update({ Estado_Da_Conta: User_Recebido.Estado_Da_Conta }).then(() => {
                if(User_Recebido.ID == User.ID) {
                    User = User_Recebido
                }

                for (let c = 0; c < Todos_Usuarios.length; c++) {
                    if(Todos_Usuarios[c].ID == User_Recebido) {
                        Todos_Usuarios[c] = User_Recebido
                    }
                }

                Carregar_Banimento()
            })
        }
    })
}