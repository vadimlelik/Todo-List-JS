const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

const listContainer = document.querySelector('.list-group')
const form = document.querySelector('.card-form')
const inputTitle = form.elements["title"]
const inputBody = form.elements["body"]


form.addEventListener('submit', onFormSabmitHandler)

listContainer.addEventListener(('click'), (event) => {
    const deleteBtn = event.target.closest('.delete-btn')
    if (deleteBtn) {
        const listGroupItem = event.target.closest('.list-group-item')
        const itemId = listGroupItem.dataset.taskId
        const deleteIndex = tasks.findIndex((task) => (task._id === itemId))
        if (deleteIndex >= 0) {
            tasks.splice(deleteIndex, 1)
            const removeItemHtml = document.querySelector(`[data-task-id="${itemId}"]`)
            console.log(removeItemHtml)
            removeItemHtml.remove()
        }
        console.log(deleteIndex)
    }

})

function listItemTemplate({ _id, title, body }) {
    const li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
    li.setAttribute('data-task-id', _id)
    const span = document.createElement('span')
    span.textContent = title
    span.style.fontWeight = 'bold'
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete task'
    deleteBtn.classList.add('btn', 'btn-danger', 'delete-btn');
    deleteBtn.style.marginLeft = 'auto'
    const article = document.createElement('p')
    article.textContent = body
    article.classList.add('mt-2', 'w-100')
    li.appendChild(span)
    li.appendChild(deleteBtn)
    li.appendChild(article)

    return li
}

function onFormSabmitHandler(event) {
    event.preventDefault()
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value
    console.log(bodyValue, 'bodyValue')
    console.log(titleValue, 'titleValue')
    if (!titleValue || !bodyValue || bodyValue.length < 6) {
        alert('Пожалуйста введите сообщение')
        return null
    }

    const newTask = createTask(titleValue, bodyValue)
    const listItemTask = listItemTemplate(newTask)
    listContainer.insertAdjacentElement('afterbegin', listItemTask)
    form.reset()

}

function createTask(body, title) {
    const task = {
        title,
        body,
        completed: false,
        _id: `task-${Math.random()}`
    }
    tasks.push(task)
    return task
}




tasks.forEach((item) => {
    let newTaskItem = listItemTemplate(item)
    listContainer.appendChild(newTaskItem)
})