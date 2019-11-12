export default class Task {
  readonly body: string

  constructor({ body }: { body: string }) {
    this.body = body
  }

  updatingBody(newValue: string): Task {
    return new Task({ body: newValue })
  }

  toString(): string {
    return `${this.body}`
  }
}