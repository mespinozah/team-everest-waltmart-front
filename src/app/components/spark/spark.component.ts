import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CONST } from '@shared/constants/constants';
import { SparkEvent } from '@app/shared/models';

@Component({
  selector: 'app-spark',
  templateUrl: './spark.component.html',
  styleUrls: ['./spark.component.scss'],
})
export class SparkComponent {
  /**
   * Posición de entrada del captcha.
   */
  @Input() spark: FormGroup;

  /**
   * Indice del FormArray.
   */
  @Input() index: number;

  /**
   * Emite el cambio de posición del spark.
   */
  @Output() changePosition: EventEmitter<SparkEvent>;

  /**
   * Referencia a las contantes.
   */
  public CONST = CONST;

  constructor() {
    this.changePosition = new EventEmitter<SparkEvent>();
  }

  public changePositionEvent(type: string) {
    const ARROW_LEFT = 'left';
    const index = this.index;
    let value: number = this.spark.value;

    if (type === ARROW_LEFT) {
      value = value !== CONST.sparks.pos.up ? value - 1 : CONST.sparks.pos.left;
    } else {
      value = value !== CONST.sparks.pos.left ? value + 1 : CONST.sparks.pos.up;
    }

    this.changePosition.emit({ index, value });
  }
}
