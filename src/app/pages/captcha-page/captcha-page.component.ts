import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoorService, CaptchaService } from '@shared/services';

@Component({
  selector: 'app-captcha-page',
  templateUrl: './captcha-page.component.html',
  styleUrls: ['./captcha-page.component.scss'],
})
export class CaptchaPageComponent implements OnInit {
  /**
   * Id de la puerta seleccionada.
   */
  private doorIdSelected: string;

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
  ) {
    this.validateSelectedDoor();
  }

  ngOnInit(): void {}

  /**
   * Valida que exista un id de la puerta, en caso contrario redirige al home.
   */
  private validateSelectedDoor(): void {
    if (!this.doorService.getDoorId()) {
      console.warn('acceso denegado');
      this.doorService.clean();
      this.router.navigateByUrl('/');
    } else {
      this.doorIdSelected = this.doorService.getDoorId();
    }
  }
}
