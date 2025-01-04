export class ApiError extends Error {
  readonly code: string;
  readonly description: string;
  errorData?: Record<string, unknown> | undefined;

  constructor(
    code: string,
    description: string,
    errorData?: Record<string, unknown> | undefined,
  ) {
    super(code + " - " + description);
    this.name = "ApiError";
    this.code = code;
    this.description = description;
    this.errorData = errorData;
  }
}
