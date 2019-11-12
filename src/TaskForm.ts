import { render, html } from 'lit-html'
import Task from './Task';

class TaskForm extends HTMLElement {

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
    return html`
    <form @submit=${(e) => { e.preventDefault(); this.submit() }}>
      <input
        .value=${this.task.body}
        @input=${(e) => this.updateBody(e.currentTarget.value)}
      >
      </input>
      <button>+</button>
    </form>
    `
  }

  render() {
    render(this.template, this.shadowRoot!)
  }

  updateBody(newValue: string) {
    const updating = this.task.updatingBody(newValue)
    const event = new CustomEvent('update', {
      detail: updating
    })
    this.dispatchEvent(event)
  }

  submit() {
    const event = new CustomEvent('add', {
      detail: this.task
    })
    this.dispatchEvent(event)
    this.updateBody('')
  }
}

window.customElements.define('task-form', TaskForm);