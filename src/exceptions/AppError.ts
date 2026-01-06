export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  public readonly code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.code = code || this.mapStatusCodeToGraphQLCode(statusCode);

    Error.captureStackTrace(this, this.constructor);
  }

  private mapStatusCodeToGraphQLCode(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'BAD_USER_INPUT';
      case 401:
        return 'UNAUTHENTICATED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }
}
