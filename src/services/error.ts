class ServerError extends Error {
  public status: number

  constructor(message: string, status: number, options?: ErrorOptions) {
    super(message, options)
    this.status = status
  }
}

export { ServerError }
