import { render, html } from 'lit-html'
import Task from './Task';

export const TaskListItem = (
  task: Task,
  onRemoveTask: (task: Task) => void
) => html`
<li>${task}<button @click=${() => onRemoveTask(task)}>-</button></li>
`;

export class TaskListItemElement extends HTMLElement {

  get task(): Task {
    return this._task;
  }

  set task(newValue: Task) {
    this._task = newValue;
    this.render();
  }

  _task!: Task

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  get template() {
    return TaskListItem(this.task, () => this.remove())
  }

  render() {
    render(this.template, this.shadowRoot!)
  }

  remove() {
    this.dispatchEvent(new CustomEvent('remove-task', {
      detail: this.task
    }))
  }
}