import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Services
import { CaptchaService } from './captcha.service';
import { DoorService } from './door.service';
import { ContentService } from './content.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [CaptchaService, DoorService, ContentService],
})
export class ServicesModule {}
