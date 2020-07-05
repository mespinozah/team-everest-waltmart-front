import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DoorService, CaptchaService } from '@shared/services';
import { Captcha, SparkEvent } from '@shared/models';

@Component({
  selector: 'app-captcha-page',
  templateUrl: './captcha-page.component.html',
  styleUrls: ['./captcha-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptchaPageComponent implements OnInit {
  /**
   * Id de la puerta seleccionada.
   */
  private doorIdSelected: string;

  /**
   * Solución del captcha.
   */
  public captcha: Captcha;

  /**
   * Formulario reactivo para los captcha.
   */
  public form: FormGroup;

  /**
   * Constructor.
   *
   * @param router Router de angular.
   * @param doorService Servicio de las puertas.
   * @param captchaService Servicio del captcha.
   * @param formBuilder FormBuilder de angular.
   */
  constructor(
    private readonly router: Router,
    private readonly doorService: DoorService,
    private readonly captchaService: CaptchaService,
    private readonly formBuilder: FormBuilder
  ) {
    this.validateSelectedDoor();
  }

  ngOnInit(): void {
    this.buildForm();

    // TODO: eliminar
    this.buildCapchaDummy();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      alternative: [null],
      sparks: this.formBuilder.array(this.buildCaptchaRandom()),
    });
  }

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

  /**
   * Construye un array aleatorio para inicializar los captcha.
   */
  private buildCaptchaRandom(): Array<number> {
    const randomSpark = new Array<number>(4);
    let i = 0;

    while (i < 4) {
      const random = Math.floor(Math.random() * 4);
      randomSpark[i] = random;
      i++;
    }
    return randomSpark;
  }

  /**
   * Referencia al FormArray de los sparks.
   */
  public get sparks(): FormArray {
    return this.form.get('sparks') as FormArray;
  }

  /**
   * Modifica el valor de un spark del captcha.
   *
   * @param sparkEvent Evento del spark.
   */
  public modifiedSpark(sparkEvent: SparkEvent): void {
    this.sparks.controls[sparkEvent.index].setValue(sparkEvent.value);
  }

  // TODO: eliminar
  private buildCapchaDummy() {
    this.captcha = new Captcha();
    this.captcha.id = '5f011d09b34eb01311efd28a';
    this.captcha.door = this.doorIdSelected;
    this.captcha.sparks = [0, 1, 2, 3];
    this.captcha.alternative = 'DOOR-A-0';
  }

  /**
   * Nos indica si el captcha es válido.
   */
  public validateCaptcha() {
    const spark1 = this.captcha.sparks[0] === this.sparks.controls[0].value;
    const spark2 = this.captcha.sparks[1] === this.sparks.controls[1].value;
    const spark3 = this.captcha.sparks[2] === this.sparks.controls[2].value;
    const spark4 = this.captcha.sparks[3] === this.sparks.controls[3].value;
    return spark1 && spark2 && spark3 && spark4;
  }
}
