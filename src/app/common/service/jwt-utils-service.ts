import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtUtilsService {
  
  getUserNameFromToken(token: string): string | null {
    if (!token) {
      return null;
    }

    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) {
      return null;
    }

    try {
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.sub || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
