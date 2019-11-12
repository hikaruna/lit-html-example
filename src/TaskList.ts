import { render, html } from 'lit-html'
import Task from './Task';
import { TaskListItem } from './TaskListItem'

class TaskList extends HTMLElement {

  get tasks(): Task[] {
    return this._tasks;
  }

  set tasks(newValue: Task[]) {
    this._tasks = newValue;
    this.render();
  }

  _tasks!: Task[]

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  get template() {
    return html`
    <ul>
      ${this.tasks.map((task) => html`
      ${TaskListItem(task, (e) => this.removeTask(e))}
      `)}
    </ul>
    `
  }

  render() {
    render(this.template, this.shadowRoot!)
  }

  removeTask(task: Task) {
    this.dispatchEvent(new CustomEvent('remove-task', {
      detail: task
    }))
  }
}

window.customElements.define('task-list', TaskList);