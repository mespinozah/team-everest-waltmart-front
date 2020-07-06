import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DoorService, CaptchaService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class CaptchaGuard implements CanActivate {
  /**
   * Constructor.
   *
   * @param router Router de angular.
   * @param doorService Servicio de las puertas.
   * @param captchaService Servicio del captcha.
   */
  constructor(
    private readonly router: Router,
    private readonly doorService: DoorService,
    private readonly captchaService: CaptchaService
  ) {}

  public canActivate() {
    this.validateSelectedDoor();

    if (!this.captchaService.getState()) {
      console.warn('acceso denegado');
      this.router.navigate(['captcha']);
      return false;
    }

    return true;
  }

  /**
   * Valida que exista un id de la puerta, en caso contrario redirige al home.
   */
  private validateSelectedDoor(): void {
    if (!this.doorService.getDoorId()) {
      console.warn('acceso denegado');
      this.doorService.clean();
      this.router.navigateByUrl('/');
    }
  }
}
