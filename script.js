const url = 'http://localhost:4000/todo';
async function getTasksFromApi() {
    
    let requisicao = await fetch(url, { method: 'GET' })
    let json = await requisicao.json();
    let lista = json.list

    let tasksNormal = lista.filter((item) => item.done == false);
    let tasksDone = lista.filter((item) => item.done == true);

    listarTasks(tasksNormal, 'normal');
    listarTasks(tasksDone, 'completed');
}
function listarTasks(lista, tipo) {
    lista.forEach(item => {
        let taskItem = document.querySelector('.models .task-item').cloneNode(true); 
        taskItem.querySelector('.task-text').innerHTML = item.title;
        
        //
        taskChecks(item, tipo, taskItem);
        
        //Excluir Task
        taskItem.querySelector('.removeTask').addEventListener('click', async () => {
            await fetch(`${url}/${item.id}`, { method: 'DELETE' });
            location.reload();
        })
        

        //Adicionar a lista
        document.querySelector(`.my-tasks.${tipo} .task-list`).append( taskItem );
    });
}
function taskChecks(item, tipo, taskItem) {
    switch (tipo) {
        case 'normal':
            taskItem.querySelector('.checkTask').classList.add('fa-square-o');
            taskItem.querySelector('.checkTask').classList.remove('fa-check-square-o');
            taskItem.querySelector('.checkTask').addEventListener('click', async () => {
                await fetch(`${url}/${item.id}`, {
                    method: 'PUT',
                    body: "done=true",
                    headers: 
                    {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                .then((data)=>{
                    location.reload();
                })
                .catch((error)=> console.log(error))
            })
            break;
        case 'completed':
            taskItem.querySelector('.checkTask').classList.remove('fa-square-o');
            taskItem.querySelector('.checkTask').classList.add('fa-check-square-o');
            taskItem.querySelector('.checkTask').addEventListener('click', async () => {
                await fetch(`${url}/${item.id}`, {
                    method: 'PUT',
                    body: "done=false",
                    headers: 
                    {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                .then((data)=>{
                    location.reload();
                })
                .catch((error)=> console.log(error))
            })
            break;
    }
}
getTasksFromApi();
