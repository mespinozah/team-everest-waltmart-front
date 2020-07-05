import { Injectable } from '@angular/core';
import { Door } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class DoorService {
  /**
   * Objeto de la puerta.
   */
  private door: Door;

  constructor() {
    this.clean();
  }

  /**
   * Setea el id de la puerta seleccionada.
   *
   * @param doorId Id de la puerta seleccionada.
   */
  public setDoorId(doorId: string): void {
    this.door.id = doorId;
  }

  /**
   * Obtiene el id de la puerta seleccionada.
   */
  public getDoorId(): string {
    return this.door.id;
  }

  /**
   * Limpia el objeto de la puerta.
   */
  public clean(): void {
    this.door = new Door();

    // TODO: eliminar el seteo de la puerta.
    this.door.id = 'A';
  }
}
