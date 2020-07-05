import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app.routing.module';
import { ServicesModule } from './shared/services/services.module';

// Components
import { AppComponent } from './app.component';

// Pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CaptchaPageComponent } from './pages/captcha-page/captcha-page.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CaptchaPageComponent,
    ContentPageComponent,
  ],
  imports: [BrowserModule, ComponentsModule, AppRoutingModule, ServicesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
