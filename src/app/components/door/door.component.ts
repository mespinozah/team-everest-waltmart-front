import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Door } from '@shared/models';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.scss'],
})
export class DoorComponent {
  /**
   * Puerta a mostrar.
   */
  @Input() public door: Door;

  /**
   * Emite la puerta seleccionada al componente padre.
   */
  @Output() private doorSelected: EventEmitter<string>;

  /**
   * Constructor.
   */
  constructor() {
    this.doorSelected = new EventEmitter<string>();
  }

  /**
   * Emite Output a componente padre con la puerta seleccionada.
   */
  public selectDoor(): void {
    this.doorSelected.emit(this.door.id);
  }
}
