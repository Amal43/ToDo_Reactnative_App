import { Request, Response, NextFunction } from 'express';
import { CustomError ,HttpCode} from '../errors/customError';
import { Prisma } from '@prisma/client'

const errorHandler= (err: Error, req:Request, res:Response, next:NextFunction) => {

    let customError = {
        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong try again later',
    }

    if (err instanceof CustomError) {
        customError.message = err.message;
        customError.statusCode = err.statusCode;
    };

    
    if (err instanceof Prisma.PrismaClientValidationError) {
        console.log(err)
        customError.message = Object.values(err.message)
        .map((item:any) => item.message)
        .join(',')
        customError.statusCode = 400
    }

    return res.status(customError.statusCode)
                .json({
                    sucess:false, 
                    message: customError.message,
                    statusCode:customError.statusCode, 
                    data:null
                });
};

export default errorHandler;
