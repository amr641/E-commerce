export class AppError extends Error {
  constructor(messsage, status) {
    super(messsage);
    this.status = status;
  }
}
