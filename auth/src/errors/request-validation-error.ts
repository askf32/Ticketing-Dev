import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";



export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid Network Request');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  seriallizeErrors() {
    return this.errors.map((error) => {
      if (error.type === "field") {
        // Handle field validation error
        return { message: error.msg, field: error.path };
      } else if (error.type === "alternative") {
        // Handle alternative validation error
        return { message: error.msg, nestedErrors: error.nestedErrors };
      } else {
        // Handle other types of errors if needed
        return { message: "Unknown error type", field: "unknown" };
      }
    });
  }
}
