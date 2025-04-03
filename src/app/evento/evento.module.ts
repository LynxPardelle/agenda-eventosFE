import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Modules */
import { EventoRoutingModule } from './evento-routing.module';
/* Componets */
import { EventoComponent } from './components/evento/evento.component';
import { EventoListComponent } from './components/evento-list/evento-list.component';
import { ActivityComponent } from './components/activity/activity.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [EventoComponent, EventoListComponent, ActivityComponent, CommonModule, EventoRoutingModule, SharedModule],
  exports: [EventoComponent, EventoListComponent],
})
export class EventoModule {}
