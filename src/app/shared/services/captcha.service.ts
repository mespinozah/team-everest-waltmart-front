import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Captcha, ResponseCaptcha } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  /**
   * Indica si el captcha es valido o no.
   */
  private isSuccess: boolean;

  /**
   * Constructor.
   *
   * @param http HttpClient de angular.
   */
  constructor(private readonly http: HttpClient) {
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

  /**
   * Obtiene un captcha de una puerta seleccionada.
   *
   * @param door Puerta del captcha.
   */
  public getCaptcha(door: string): Observable<Captcha> {
    let url = `${environment.captchaService.baseUrl}${environment.captchaService.getCaptcha}`;
    url = url.replace('{door}', door);
    return this.http.get<Captcha>(url);
  }

  /**
   * Llama al servicio para validar el captcha.
   *
   * @param captcha Captcha a validar.
   */
  public validateCaptcha(captcha: Captcha): Observable<ResponseCaptcha> {
    const url = `${environment.captchaService.baseUrl}${environment.captchaService.validate}`;
    return this.http.post<ResponseCaptcha>(url, captcha);
  }
}
