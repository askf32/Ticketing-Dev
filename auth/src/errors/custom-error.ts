export abstract class CustomError extends Error{
    abstract statusCode: number;
    constructor(mesaage: string){
        super(mesaage);
        Object.setPrototypeOf(this, CustomError.prototype)
    }
    abstract seriallizeErrors():{message: string; field?: string}[]
}