import { render, html } from 'lit-html'
import './TaskForm'
import './TaskList'
import Task from './Task';

type Store = {
  task: Task
  tasks: Task[]
}

class App extends HTMLElement {
  store: Store = {
    task: new Task({body: ''}),
    tasks: []
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  get template() {
    return html`
    <h1>Todo App</h1>
    <task-form
      .task=${this.store.task}
      @update=${e => this.updateTask(e.detail)}
      @add=${e => this.addTask(e.detail)}
    >
    </task-form>

    <div>
      <task-list
        .tasks=${this.store.tasks}
        @remove-task=${(e) => this.removeTask(e.detail)}
      ></task-list>
    </div>
    `
  }

  render() {
    render(this.template, this.shadowRoot!)
  }

  updateTask(task: Task) {
    this.store.task = task;
    this.render();
  }

  addTask(task: Task) {
    this.store.tasks.push(task);
    this.render();
  }

  removeTask(task: Task) {
    const index = this.store.tasks.indexOf(task)
    this.store.tasks.splice(index, 1);
    this.render();
  }
}

window.customElements.define('my-app', App);