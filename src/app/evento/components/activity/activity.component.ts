import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DatePipe } from '@angular/common';
/* Modules */
import { SharedModule } from '../../../shared/shared.module';
/* Environments */
import { environment } from '../../../../environments/environment';
/* Interfaces */
import { IActivity } from '../../interfaces/activity';
import { IOptionDropdown } from '../../../shared/interfaces/optionDropdown';
import { IEvento } from '../../interfaces/evento';
/* Services */
import { SharedService } from '../../../shared/services/shared.service';
import { EventoService } from '../../services/evento.service';
import { GenericAlertService } from '../../../shared/services/generic-alert.service';
/* Components */
import { FileUploaderComponent } from '../../../shared/components/file-uploader/file-uploader.component';
import { GenericInputComponent } from '../../../shared/components/generic-input/generic-input.component';
import { GenericButtonComponent } from '../../../shared/components/generic-button/generic-button.component';

@Component({
  selector: 'activity',
  imports: [SharedModule, DatePipe, FileUploaderComponent, GenericInputComponent, GenericButtonComponent],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit, OnChanges {
  /* Environments */
  public url: string = environment.api + '/evento/';
  /* Input */
  @Input() activity!: IActivity;
  @Input() ticketTypes: number = 1;
  @Input() isEdit: boolean = false;
  @Input() eventoId: string = '';
  @Input() token: string = '';
  @Input() evento!: IEvento;
  /* Output */
  @Output() activityEdited = new EventEmitter<null>();

  public ticketTypesOptions: IOptionDropdown[] = this.getTicketTypesOptions();
  public lockeds: { [key: string]: boolean } = {
    title: this.activity?.title !== '',
  };
  public changers: string[] = [];
  /* Constructor */
  constructor(
    private _sharedService: SharedService,
    private _eventoService: EventoService,
        private _alert: GenericAlertService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cssCreate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (
      !!changes['ticketTypes'] &&
      changes['ticketTypes'].currentValue !==
        changes['ticketTypes'].previousValue
    ) {
      this.ticketTypesOptions = this.getTicketTypesOptions();
      this.cssCreate();
    }
  }
  onSubmit() {
    this._alert.launch({
      title: '¿Quieres guardar los cambios?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
    }).then((result: any) => {
      if (result.isConfirmed) {
        if (this.activity._id !== '') {
          this._eventoService.updateActivity(this.activity).subscribe({
            next: (res: { status: string; activity: IActivity }) => {
              this._sharedService.consoleParser({ thing: res, type: 'log' });
              this.activity = res.activity ? res.activity : this.activity;
              this.activityEdited.emit();
              this.cssCreate();
              this._alert.launch('Se guardaron los cambios', '', 'success');
            },
            error: (err) => {
              this._sharedService.consoleParser({ type: 'error', thing: err });
              this._alert.launch(
                'Error al guardar la información de la actividad.',
                err.toString(),
                'error'
              );
            },
          });
        } else {
          this._eventoService
            .createActivity(this.activity, this.eventoId)
            .subscribe({
              next: (res: { status: string; activity: IActivity }) => {
                this._sharedService.consoleParser({ thing: res, type: 'log' });
                this.activity = res.activity ? res.activity : this.activity;
                this.activityEdited.emit();
                this.cssCreate();
                this._alert.launch('Se guardaron los cambios', '', 'success');
              },
              error: (err) => {
                this._sharedService.consoleParser({
                  type: 'error',
                  thing: err,
                });
                this._alert.launch(
                  'Error al guardar la información de la actividad.',
                  err.toString(),
                  'error'
                );
              },
            });
        }
      } else {
        this._alert.launch('No se guardaron los cambios', '', 'info');
      }
    });
  }
  getTicketTypesOptions(): IOptionDropdown[] {
    // Get the the maximun number in an array of numbers
    // https://stackoverflow.com/questions/1669190/find-the-min-max-element-of-an-array-in-javascript
    // Math.max(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    return Array.from(Array(6).keys())
      .filter((i) => i <= this.ticketTypes)
      .map((i) => {
        return {
          type: 'menuitem',
          option: `${i}`,
          click: `ticketTypes=${i}`,
        };
      });
  }
  clicked(event: IOptionDropdown) {
    switch (true) {
      case event.click.includes('ticketType'):
        this.activity.ticketType = parseInt(event.click.split('=')[1]);
        break;
      default:
        break;
    }
  }
  changeChangers(changer: string) {
    if (!this.isEdit) return;
    if (this.changers.includes(changer)) {
      let index = this.changers.indexOf(changer);
      this.changers.splice(index, 1);
    } else {
      this.changers.push(changer);
    }
  }
  changesInput(thing: any) {
    Object.keys(this.lockeds).forEach((lockedInput) => {
      this.lockeds[lockedInput] = thing[lockedInput]
        ? thing.locked
        : this.lockeds[lockedInput];
    });
    if (this.checkIfFormValid()) this.cssCreate();
  }
  checkIfFormValid() {
    return Object.values(this.lockeds).every((locked) => locked === false);
  }
  cssCreate() {
    this._sharedService.cssCreate();
  }
}
