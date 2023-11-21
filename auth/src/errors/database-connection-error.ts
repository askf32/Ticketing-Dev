import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError{
    statusCode = 500
    reason = 'Error connecting to DB'
    constructor(){
        super("Error connecting DB")
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
    seriallizeErrors(){
        return [{message: this.reason}]
    }
}