import { Component, Input } from '@angular/core';
import { CONST } from '@shared/constants/constants';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss'],
})
export class SolutionComponent {
  /**
   * Listado con la solución del captcha.
   */
  @Input() public sparks: Array<number>;

  /**
   * Referencia a las contantes.
   */
  public CONST = CONST;
}
