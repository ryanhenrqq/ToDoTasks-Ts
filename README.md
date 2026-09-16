# 📃 ToDoTasks - TypeScript Version

- **ToDoTasks** é um projeto simples de navegador, onde seu principal papel é ser facil e intuitivo.

- Este codigo usa um recurso dos navegadores chamado de LocalStorage, onde ele armazena dados em cache para serem persistentes, e assim recuperar esses dados na proxima visita ao site.

---

## 🎯 Funcionalidades & Objetivo

- Ao carregar a pagina inicial (SinglePage), o site deve aparecer com um cabeçalho e um conteudo central, tendo que identificar automaticamente se há alguma chave pré configurada no LocalStorage, e carregar todas as notas salvas dentro dessa chave. É usado features de 'useEffect' para fazer essas verificações

- No cabeçalho, há o botão de Adicionar Tarefa (+) e o botão de Limpar Tudo (=) - visivel apenas após ser criado, no minimo, uma tarefa. Feitos pra deixar a interface bem mais limpa e com foco na sua principal função.

- Ao pressionar o botão Adicionar Tarefa (+), deve surgir um popup pedindo as seguintes informações: Titulo, Descrição, Data e Horario(opcional). após inserir essas informações, um script irá capta-las, processa-las em JSON e salva-las em uma chave unica do LocalStorage (ou salvar na existente, se ja tiver sido criada), após isso, irá recarregar sua atividade principal no centro da pagina, devendo mostrar todas as tarefas organizadas em sua coluna.

- Por fim, a visualização da tarefa no centro da pagina é unica, mostrando todos os proximos eventos. Nela, é possivel ver o Titulo, a descrição, a data e o horario, se tiver. O usuário consegue interagir com essa tarefa, podendo excluí-la.

---

## Typescript - Melhorias

- Este projeto conseguiu se tornar algo muito mais "trabalhável" e organizado com essa mudança de framework, permitiu separar bem cada função em seu devido canto, sem tentar fazer tudo de uma vez. Ele faz bastante uso de Props e Interfaces, para conseguir fazer os componentes se comunicarem.