import { Response, Request, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

    if(err instanceof CustomError){       
return res.status(400).send({errors: err.seriallizeErrors()})
    }

    // console.log('Something went wrong', err)
    res.send({
        msg: err.message
    })
};
