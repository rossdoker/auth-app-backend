import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/exceptions/AppError.js';
import z, { ZodError } from 'zod';
import { fromError } from 'zod-validation-error';
import { Prisma } from '@prisma/client';

const parseError = (err: AppError) => {
  // Zod Validation
  if (err instanceof ZodError) {
    const validationError = fromError(err);
    const message = validationError.details[0].message || 'Validation Error';
    return {
      statusCode: 400,
      message,
      errors: z.treeifyError(err),
    };
  }

  // Prisma Unique Constraint
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2002'
  ) {
    const target = (err.meta?.target as string[]) || ['field'];
    return {
      statusCode: 409,
      message: `Value for ${target.join(', ')} already exists.`,
    };
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return { statusCode: 401, message: 'Invalid token. Please log in again.' };
  }
  if (err.name === 'TokenExpiredError') {
    return {
      statusCode: 401,
      message: 'Your token has expired. Please log in again.',
    };
  }

  // Google Auth Errors
  const googleErrors = [
    'Invalid token signature',
    'Token used too late',
    'Wrong number of segments',
  ];
  if (googleErrors.some((msg) => err.message?.includes(msg))) {
    return { statusCode: 401, message: 'Invalid Google Token' };
  }

  return {
    statusCode: (err as AppError).statusCode || 500,
    message: err.message || 'Something went wrong',
    errors: undefined,
  };
};

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode, message, errors } = parseError(err);

  const status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

  res.status(statusCode).json({
    status,
    message,
    errors,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
