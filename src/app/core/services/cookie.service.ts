import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  // Nombres crípticos para las cookies - no revelan su contenido
  private readonly COOKIE_NAMES = {
    AUTH_TOKEN: '_Secure-1PLSID',
    USER_DATA: '_Host-1PSID', 
    TOKEN_EXPIRY: 'ACCOUNT_CHOOSER',
    SESSION_ID: 'g_state'
  };

  /**
   * Establece una cookie con configuraciones seguras
   * @param name Nombre de la cookie
   * @param value Valor de la cookie
   * @param days Días de expiración (por defecto 1 día)
   * @param secure Si debe ser segura (solo HTTPS)
   */
  setCookie(name: string, value: string, days: number = 1, secure: boolean = true): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    let cookieString = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
    
    // Agregar Secure flag si estamos en HTTPS o si se especifica
    if (secure && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
      cookieString += '; Secure';
    }
    
    document.cookie = cookieString;
  }

  /**
   * Obtiene el valor de una cookie
   * @param name Nombre de la cookie
   * @returns Valor de la cookie o null si no existe
   */
  getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const value = decodeURIComponent(c.substring(nameEQ.length, c.length));
        return value;
      }
    }
    
    return null;
  }

  /**
   * Elimina una cookie específica
   * @param name Nombre de la cookie a eliminar
   */
  deleteCookie(name: string): void {
    // Establecer la cookie con fecha de expiración en el pasado
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
  }

  /**
   * Elimina todas las cookies de la aplicación
   */
  clearAllCookies(): void {
    Object.values(this.COOKIE_NAMES).forEach(cookieName => {
      this.deleteCookie(cookieName);
    });
  }

  /**
   * Verifica si una cookie existe
   * @param name Nombre de la cookie
   * @returns true si la cookie existe
   */
  hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }

  /**
   * Obtiene todas las cookies como un objeto
   * @returns Objeto con todas las cookies
   */
  getAllCookies(): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      const cookie = ca[i];
      const eqPos = cookie.indexOf('=');
      if (eqPos > -1) {
        const name = cookie.substr(0, eqPos).trim();
        const value = decodeURIComponent(cookie.substr(eqPos + 1).trim());
        cookies[name] = value;
      }
    }
    
    return cookies;
  }

  /**
   * Establece una cookie con datos JSON
   * @param name Nombre de la cookie
   * @param data Datos a guardar
   * @param days Días de expiración
   */
  setJsonCookie(name: string, data: any, days: number = 1): void {
    const jsonString = JSON.stringify(data);
    this.setCookie(name, jsonString, days);
  }

  /**
   * Obtiene y parsea una cookie JSON
   * @param name Nombre de la cookie
   * @returns Datos parseados o null si no existe o es inválido
   */
  getJsonCookie(name: string): any | null {
    const value = this.getCookie(name);
    if (!value) return null;
    
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }

  // Métodos específicos para autenticación con nombres crípticos
  setAuthToken(token: string, days: number = 1): void {
    this.setCookie(this.COOKIE_NAMES.AUTH_TOKEN, token, days);
  }

  getAuthToken(): string | null {
    return this.getCookie(this.COOKIE_NAMES.AUTH_TOKEN);
  }

  setUserData(userData: any, days: number = 1): void {
    this.setJsonCookie(this.COOKIE_NAMES.USER_DATA, userData, days);
  }

  getUserData(): any | null {
    return this.getJsonCookie(this.COOKIE_NAMES.USER_DATA);
  }

  setTokenExpiry(expiry: string, days: number = 1): void {
    this.setCookie(this.COOKIE_NAMES.TOKEN_EXPIRY, expiry, days);
  }

  getTokenExpiry(): string | null {
    return this.getCookie(this.COOKIE_NAMES.TOKEN_EXPIRY);
  }

  clearAuthCookies(): void {
    this.deleteCookie(this.COOKIE_NAMES.AUTH_TOKEN);
    this.deleteCookie(this.COOKIE_NAMES.USER_DATA);
    this.deleteCookie(this.COOKIE_NAMES.TOKEN_EXPIRY);
    this.deleteCookie(this.COOKIE_NAMES.SESSION_ID);
  }
}
