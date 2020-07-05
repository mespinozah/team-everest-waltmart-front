import { NgModule } from '@angular/core';

// Services
import { CaptchaService } from './captcha.service';
import { DoorService } from './door.service';

@NgModule({
  providers: [CaptchaService, DoorService],
})
export class ServicesModule {}
