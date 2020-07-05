import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { DoorComponent } from './door/door.component';
import { SolutionComponent } from './solution/solution.component';
import { SparkComponent } from './spark/spark.component';

@NgModule({
  declarations: [DoorComponent, SolutionComponent, SparkComponent],
  imports: [CommonModule],
  exports: [DoorComponent, SolutionComponent, SparkComponent],
})
export class ComponentsModule {}
