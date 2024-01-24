import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  private readonly secretKey = 'secret-key'; 

  generateToken(email: string): string {
    const payload = { email };
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }
  

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      throw new Error(`Failed to verify token: ${error.message}`);
    }
  }
}
