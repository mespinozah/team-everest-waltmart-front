import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoorService, ContentService } from '@shared/services';
import { Router } from '@angular/router';
import { ResponseContent } from '@shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss'],
})
export class ContentPageComponent implements OnInit, OnDestroy {
  /**
   * Reponse del meme service.
   */
  public meme: ResponseContent;

  /**
   * Subscription al MemeService.
   */
  private getMeme$: Subscription;

  /**
   * Indica si se puede habilitar la vista.
   */
  public enabledView: boolean;

  /**
   * Puerta seleccionada.
   */
  public doorSelected: string;

  /**
   * Constructor.
   *
   * @param doorService Servicio de las puertas.
   * @param contentService Servicio del contenido.
   * @param router Router de angular.
   */
  constructor(
    private readonly doorService: DoorService,
    private readonly contentService: ContentService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.doorSelected = `Puerta ${this.doorService.getDoorId()}`;
    this.getMeme();
  }

  ngOnDestroy(): void {
    if (!!this.getMeme$) {
      this.getMeme$.unsubscribe();
    }
  }

  /**
   * Obtiene el meme a mostrar en el contenido.
   */
  private getMeme(): void {
    this.enabledView = false;
    this.getMeme$ = this.contentService
      .getMeme(this.doorService.getDoorId())
      .subscribe(
        (data) => {
          this.meme = data;
          this.enabledView = true;
        },
        (err) => {
          console.error('error al validar el captcha', err);
          this.router.navigateByUrl('/');
        }
      );
  }
}
