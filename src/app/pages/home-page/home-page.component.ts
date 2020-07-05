import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Door } from '@shared/models';
import { DoorService } from '@shared/services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  /**
   * Listado de puertas.
   */
  public doors: Array<Door>;

  /**
   * Constructor.
   *
   * @param router Router de angular.
   * @param doorService Servicio de las puertas.
   */
  constructor(
    private readonly router: Router,
    private readonly doorService: DoorService
  ) {}

  ngOnInit(): void {
    this.doorService.clean();
    this.buildDoors();
  }

  /**
   * Abre la puerta seleccionada.
   *
   * @param doorId Id de la puerta seleccionada.
   */
  public openDoor(doorId: string): void {
    this.doorService.setDoorId(doorId);
    this.router.navigateByUrl('content');
  }

  /**
   * Construye el arreglo de las puertas.
   */
  private buildDoors(): void {
    this.doors = [
      { id: 'A', name: 'Puerta A' },
      { id: 'B', name: 'Puerta B' },
      { id: 'C', name: 'Puerta C' },
    ];
  }
}
