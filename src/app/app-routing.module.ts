import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from 'src/auth.guard';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  // Register route
  { path: 'register', component: RegisterComponent },
  // Main home route (protected)
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [AuthGuard],
  },
  // Specific page route (protected)
  {
    path: 'home/:id',
    component: DetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
