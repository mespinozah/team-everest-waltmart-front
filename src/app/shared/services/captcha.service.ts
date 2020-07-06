import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  /**
   * Indica si el captcha es valido o no.
   */
  private isSuccess: boolean;

  constructor() {
    this.isSuccess = false;
  }

  /**
   * Marca el captcha como aprobado.
   */
  public success(): void {
    this.isSuccess = true;
  }

  /**
   * Marca el captcha como fallido.
   */
  public failed(): void {
    this.isSuccess = false;
  }

  /**
   * Devuelve el estado del captcha.
   */
  public getState(): boolean {
    return this.isSuccess;
  }
}
