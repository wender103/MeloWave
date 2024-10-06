function Execultar_Funcoes_Ao_Carregar() {
    return new Promise((resolve, reject) => {
      try {
        if(User) {
          let tarefas = [];
  
          // Função para adicionar tarefas e lidar com erros
          const adicionarTarefa = (func) => {
            tarefas.push(
              new Promise((res) => {
                try {
                  func();
                } catch (e) {
                  console.warn(e);
                } finally {
                  res();
                }
              })
            );
          };
  
          for (let c = 0; c < TodasMusicas.length; c++) {
            for (let b = 0; b < User.Historico.Musicas.length; b++) {
              if(User.Historico.Musicas[b] == TodasMusicas[c].ID) {
                User.Historico.Musicas[b] = TodasMusicas[c];
              }
            }
  
            for (let b = 0; b < User.Musicas_Curtidas.length; b++) {
              if(User.Musicas_Curtidas[b] == TodasMusicas[c].ID) {
                User.Musicas_Curtidas[b] = TodasMusicas[c];
              }
            }
          }
  
          adicionarTarefa(Retornar_Daily);
          adicionarTarefa(Retornar_Todas_Secoes);
          adicionarTarefa(Checar_Notificacao_Artista_Seguindo);
          adicionarTarefa(Carregar_Banimento);
          adicionarTarefa(Atualizar_Infos_Perfil_Loja);
          
          adicionarTarefa(() => {
            if(Pagina_Atual.Nome == 'home' && User.Perfil.Img_Background) {
              if(Device.Tipo != 'Mobile') {
                Trocar_Background(User.Perfil.Img_Background, document.querySelector('body'))
              }
            }
          });
  
          adicionarTarefa(Carregar_Musica_Pendentes);
          adicionarTarefa(Remover_Musicas_Tempo_Exedido);
          adicionarTarefa(Carregar_Notificacaoes);
          adicionarTarefa(Retornar_Artistas_Mais_Vistos);
          adicionarTarefa(Mostrar_Max_Musicas);
          adicionarTarefa(Artistas_Tocados_Recentemente);
          adicionarTarefa(Carregar_Configuracoes)
          adicionarTarefa(Retornar_Tocados_Recentemente_Primeira_Parte)
          adicionarTarefa(Carregar_Atalhos)
  
          if (['/MeloWave/index.html', '/MeloWave/', '/', '/index.html'].includes(window.location.pathname)) {
            adicionarTarefa(() => {
              setTimeout(() => {
                closeLoadingScreen();
              }, 100);
            });
          }
  
          adicionarTarefa(Recarregar_Infos_Url);
          
          adicionarTarefa(() => {
            Carreagr_Artistas_Seguindo();
            setTimeout(() => {
              Carreagr_Artistas_Seguindo();
            }, 1000);
          });
  
          adicionarTarefa(Carregar_Notificacaoes_Em_Tempo_Real);
          
          adicionarTarefa(checkIfAllLoaded);

          if(User.Gosto_Musical.Generos.length <= 0) {
            adicionarTarefa(Abrir_Selecionar_Generos_Musicais)
          } else {
            adicionarTarefa(Retornar_Artistas_Com_Base_Nos_Generos)

            for (let c = 0; c < User.Gosto_Musical.Generos.length; c++) {
              adicionarTarefa(Retornar_Musicas_Com_Base_Nos_Generos_Musicais(User.Gosto_Musical.Generos[c]))
            }
          }

  
          // Esperar todas as tarefas serem concluídas
          Promise.all(tarefas).then(resolve).catch(reject);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  