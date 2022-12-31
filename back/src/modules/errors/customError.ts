export class CustomError extends Error {
  constructor(readonly httpStatus: number, readonly message: string) {
    super(message)
    this.message = message,
      this.httpStatus = httpStatus
  }
}