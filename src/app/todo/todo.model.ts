export class Todo {
  constructor(public name: string, public id?: number) {
    if (!id) {
      this.id = Math.floor(Date.now() * Math.random());
    }
  }
}
