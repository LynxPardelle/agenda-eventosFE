import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Modules */
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
/* Components */
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [],
  imports: [UserComponent, UserListComponent, CommonModule, UserRoutingModule, SharedModule],
  exports: [UserComponent, UserListComponent],
})
export class UserModule {}
