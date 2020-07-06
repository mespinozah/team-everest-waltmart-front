import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DoorService, CaptchaService } from '@shared/services';
import { Captcha, SparkEvent } from '@shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-captcha-page',
  templateUrl: './captcha-page.component.html',
  styleUrls: ['./captcha-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptchaPageComponent implements OnInit, OnDestroy {
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
   * Valida si se debe mostrar la vista.
   */
  public enabledView: boolean;

  /**
   * Observable del captcha.
   */
  private getCaptcha$: Subscription;

  /**
   * Observable del captcha.
   */
  private validateCaptcha$: Subscription;

  /**
   * Constructor.
   *
   * @param router Router de angular.
   * @param doorService Servicio de las puertas.
   * @param captchaService Servicio del captcha.
   * @param formBuilder FormBuilder de angular.
   * @param cdr ChangeDetention de angular.
   */
  constructor(
    private readonly router: Router,
    private readonly doorService: DoorService,
    private readonly captchaService: CaptchaService,
    private readonly formBuilder: FormBuilder,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.validateSelectedDoor();
  }

  ngOnInit(): void {
    this.getCaptcha();
    this.buildForm();
    this.captchaService.failed();
  }

  ngOnDestroy(): void {
    if (!!this.getCaptcha$) {
      this.getCaptcha$.unsubscribe();
    }

    if (!!this.validateCaptcha$) {
      this.validateCaptcha$.unsubscribe();
    }
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

  /**
   * Obtiene el captcha desde el servicio.
   */
  private getCaptcha(): void {
    this.enabledView = false;
    this.getCaptcha$ = this.captchaService
      .getCaptcha(this.doorIdSelected)
      .subscribe(
        (captcha) => {
          this.captcha = captcha;
          this.enabledView = true;
          this.cdr.detectChanges();
        },
        (err) => {
          console.error('error al traer el captcha', err);
          this.router.navigateByUrl('/');
        }
      );
  }

  /**
   * Envia el captcha para validarlo.
   */
  public sendCaptchaForValidate(): void {
    let i = 0;
    const captcha: Captcha = new Captcha();
    captcha.alternative = this.captcha.alternative;
    captcha.door = this.captcha.door;
    captcha.sparks = new Array<number>(4);

    while (i < 4) {
      captcha.sparks[i] = this.sparks.controls[i].value;
      i++;
    }

    this.validateCaptcha$ = this.captchaService
      .validateCaptcha(captcha)
      .subscribe(
        () => {
          this.router.navigateByUrl('/content');
        },
        (err) => {
          console.error('error al validar el captcha', err);
          this.router.navigateByUrl('/');
        }
      );
  }

  /**
   * Nos indica si el captcha es válido.
   */
  public validateCaptcha(): boolean {
    const spark1 = this.captcha.sparks[0] === this.sparks.controls[0].value;
    const spark2 = this.captcha.sparks[1] === this.sparks.controls[1].value;
    const spark3 = this.captcha.sparks[2] === this.sparks.controls[2].value;
    const spark4 = this.captcha.sparks[3] === this.sparks.controls[3].value;

    if (spark1 && spark2 && spark3 && spark4) {
      this.captchaService.success();
      return true;
    } else {
      this.captchaService.failed();
      return false;
    }
  }
}
