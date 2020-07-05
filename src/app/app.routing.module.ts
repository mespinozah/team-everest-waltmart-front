import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CaptchaPageComponent } from './pages/captcha-page/captcha-page.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';

// Guards
import { CaptchaGuard } from '@shared/guards';

const ROUTES: Routes = [
  { path: 'home', component: HomePageComponent },
  {
    path: 'captcha',
    component: CaptchaPageComponent,
  },
  {
    path: 'content',
    component: ContentPageComponent,
    canActivate: [CaptchaGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
