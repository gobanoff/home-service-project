import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface UserPayload {
  id: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).send({ error: 'Not authenticated' });
    return;
  }

  try {
    const token = authHeader.split('')[1];
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    console.log(payload);
    req.currentUser = payload;
  } catch (err) {
    res.status(401).send({ error: 'Not authenticated' });
    return;
  }

  next();
};

export default authMiddleware;
