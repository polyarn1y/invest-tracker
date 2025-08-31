export default class ApiError extends Error {
  public status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }
  
  static badRequest(message = "Bad Request") {
    return new ApiError(400, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "Not Found") {
    return new ApiError(404, message);
  }

  static conflict(message = "Already exists") {
    return new ApiError(409, message);
  }
}