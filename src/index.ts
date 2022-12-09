import { v4 as uuidV4 } from 'uuid'

// console.log(uuidV4())

// constants
type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

//variables
const tasks: Task[] = loadTasks()

//cached element ref
const list = document.querySelector<HTMLUListElement>('#list')
const form = document.querySelector<HTMLFormElement>('#new-task-form')
const input = document.querySelector<HTMLInputElement>('#new-task-title')

//initialization
tasks.forEach(addListItem)


form?.addEventListener('submit', event => {
  event.preventDefault()

  if (input?.value == '' || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask)

  addListItem(newTask)
  input.value = ''
})

function addListItem(task: Task){
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.addEventListener('change', ()=>{
    task.completed = checkbox.checked
    console.log(tasks)
    saveTasks()
  })
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
  saveTasks()
  
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks))
}

function loadTasks(): Task[]{
  const taskJSON = localStorage.getItem('TASKS')
  if (taskJSON == null) 
    return []
  else
  return JSON.parse(taskJSON)
}

