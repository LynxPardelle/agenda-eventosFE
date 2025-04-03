import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';

/* Modules */

/* Components */
import { LoginComponent } from './components/login/login.component';
import { RecoverComponent } from './components/recover/recover.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [LoginComponent, RecoverComponent, AuthRoutingModule, SharedModule],
})
export class AuthModule { }
