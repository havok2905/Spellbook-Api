import { BadArgumentException, EntityNotFoundException } from '../exceptions/exceptions';
import {
  NextFunction,
  Request,
  Response
} from 'express';

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof BadArgumentException) {
    response.status(400).send();
  }

  if (error instanceof EntityNotFoundException) {
    response.status(404).send();  
  }

  next();
}