import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VehiculeAzizValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (!body) return next();
    if (body.year !== undefined && body.year < 2000) {
      throw new BadRequestException('Year must be >= 2000');
    }
    if (body.pricePerDay !== undefined && body.pricePerDay <= 0) {
      throw new BadRequestException('pricePerDay must be positive');
    }
    next();
  }
}
