import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
/* Modules */
import { SharedModule } from '../../../shared/shared.module';
/* Environments */
import { environment } from '../../../../environments/environment';
/* RxJs */
import { Observable, firstValueFrom } from 'rxjs';
/* Interfaces */
import { IEvento } from '../../interfaces/evento';
import { IActivity } from '../../interfaces/activity';
import { IOptionDropdown } from '../../../shared/interfaces/optionDropdown';
import { IUser } from '../../../user/interfaces/user';
import { IOptionButton } from '../../../shared/interfaces/optionButton';
import { ITicket } from '../../interfaces/ticket';
/* Models */
import { Evento } from '../../models/evento';
import { Activity } from '../../models/activity';
import { Ticket } from '../../models/ticket';
import { User } from '../../../user/models/user';
/* Services */
import { SharedService } from '../../../shared/services/shared.service';
import { EventoService } from '../../services/evento.service';
import { UserService } from '../../../user/services/user.service';
import { GenericAlertService } from '../../../shared/services/generic-alert.service';
/* Store */
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import {
  IdentitySelector,
  TokenSelector,
} from '../../../state/selectors/sesion.selector';
import { LoadSesion } from '../../../state/actions/sesion.actions';
/* Components */
import { ActivityComponent } from '../activity/activity.component';
import { GenericButtonComponent } from '../../../shared/components/generic-button/generic-button.component';
import { LogoShowComponent } from '../../../shared/components/logo-show/logo-show.component';
import { FileUploaderComponent } from '../../../shared/components/file-uploader/file-uploader.component';
import { GenericInputComponent } from '../../../shared/components/generic-input/generic-input.component';
@Component({
  selector: 'app-evento',
  imports: [SharedModule, RouterLink, DatePipe, ActivityComponent, GenericButtonComponent, LogoShowComponent, FileUploaderComponent, GenericInputComponent],
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
})
export class EventoComponent implements OnInit {
  /* Environments */
  public url: string = environment.api + '/evento/';
  /* Models */
  public evento: IEvento = new Evento(
    '', // _id: string,
    null, // logo: File | null,
    null, // headerImage: File | null,
    'Descripción del evento.', // description: string,
    'Título del evento', // title: string,
    'Subtítulo del evento', // subtitle: string,
    [], // activities: IActivity[],
    [], // califications: ICalification[],
    [], // witness: IWitness[],
    [], // asistents: IUser[],
    [], // operators: IUser[],
    1, // ticketTypes: number,
    [], // photos: File[],
    new Date(), // date: Date,
    'Lugar del evento', // place: string,
    '', // titleColor: string,
    '', // textColor: string,
    '', // linkColor: string,
    '', // bgColor: string,
    [], // tickets: ITicket[],
    new Date(), // createAt: Date,
    new Date(), // changeDate: Date,
    null, // changeUser: IUser | null,
    'create',
    0, // ver: number,
    false, // isDeleted: boolean,
    [] // changeHistory: IEvento[]
  );
  public newActivity: IActivity = new Activity(
    '', // _id: string,
    0, // ticketType: number,
    'Nueva Actividad', // title: string,
    'Subtítulo de la actividad', // subtitle: string,
    'Descripción de la actividad', // description: string,
    null, // headerImage: File | null,
    [], // photos: File[],
    [], // califications: ICalification[],
    [], // witness: IWitness[],
    new Date(), // date: Date,
    'Lugar de la actividad', // place: string,
    '', // titleColor: string,
    '', // textColor: string,
    '', // linkColor: string,
    '', // bgColor: string,
    new Date(), // createAt: Date,
    new Date(), // changeDate: Date,
    null, // changeUser: IUser | null,
    'create',
    0, // ver: number,
    false, // isDeleted: boolean,
    [] // changeHistory: IActivity[]
  );
  public newTicket: ITicket = new Ticket(
    '', // _id: string,
    0, // ticketType: number,
    null, // evento: IEvento,
    null, // user: IUser,
    'asistente', // role: 'asistente' | 'operador general' | 'operador de actividad' | 'operador de asistentes',
    [], // activitiesAdmin: IActivity[],
    new Date(), // createAt: Date,
    new Date(), // changeDate: Date,
    null, // changeUser: IUser | null,
    'create', // changeType: 'create' | 'update' | 'delete',
    0, // ver: number,
    false, // isDeleted: boolean,
    [] // changeHistory: ITicket[]
  );
  public newTicketUser: IUser = new User(
    '', // _id: string,
    '', // name: string,
    'basic', // role: 'basic' | 'premium' | 'special',
    'asistente', // type: 'asistente' | 'operador' | 'administrador' | 'técnico',
    [], // tickets: ITicket[],
    '', // email: string,
    '', // password: string,
    '', // lastPassword: string,
    '', // passRec: string,
    false, // verified: boolean,
    0, // users: number,
    new Date(), // createAt: Date,
    new Date(), // changeDate: Date,
    null, // changeUser: IUser | null,
    'create', // changeType: 'create' | 'update' | 'delete',
    0, // ver: number,
    false, // isDeleted: boolean,
    [] // changeHistory: IUser[]
  );
  public identity: IUser | undefined;
  public lockeds: { [key: string]: boolean } = {
    title: true,
  };
  public ticketTypesOptions: IOptionDropdown[] = this.getTicketTypesOptions();
  public newOperatorsOptions: IOptionDropdown[] = this.getOperatorsOptions();
  public activities4Tickets: IOptionDropdown[] = this.getActivities4Tickets();
  public ticketTypeOptions: IOptionDropdown[] = this.getTicketTypeOptions();
  public isEdit: boolean = false;
  public changers: string[] = [];
  public showOptions: boolean = false;
  public options: IOptionButton[] = [];
  public token: string = '';
  public token$: Observable<string | undefined>;
  public identity$: Observable<IUser | undefined>;
  public modal: 'ticket' | undefined;
  constructor(
    private location: Location,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sharedService: SharedService,
    private _eventoService: EventoService,
    private _userService: UserService,
    private store: Store<AppState>,
    private _alert: GenericAlertService
  ) {
    this.token$ = store.select(TokenSelector);
    this.token$.subscribe({
      next: (t: string | undefined) => {
        if (!!t) {
          this.token = t;
        }
      },
      error: (e) => console.error(e),
    });
    this.identity$ = this.store.select(IdentitySelector);
    this.options= [
      {
        id: 'edit',
        icon: this.getHTML('edit'),
        show: false,
        text: 'Editar',
        click: 'edit',
      },
      {
        id: 'photos',
        icon: this.getHTML('photos'),
        show: false,
        text: 'Comparte fotos',
        click: 'photos',
      },
      {
        id: 'score',
        icon: this.getHTML('score'),
        show: false,
        text: '¡Califícanos!',
        click: 'score',
      },
    ]
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._route.params.subscribe({
      next: (params) => {
        if (params['id']) {
          /* TODO: Añadir popups de error y éxito. */
          this.getData(params['id']);
        }
      },
      error: (err) => {
        this._sharedService.consoleParser({ thing: err, type: 'error' });
      },
    });
    this.getIdentity();
    this.store.dispatch(LoadSesion());
    this.cssCreate();
  }
  /* Store */
  getIdentity() {
    this.identity$.subscribe({
      next: (i: IUser | undefined) => {
        this.identity = i;
        this.configOptions();
      },
      error: (e) => {
        this.options[1].show = false;
        this.options[2].show = false;
        this.options[3].show = false;
        this._sharedService.consoleParser({ thing: e, type: 'error' });
        this._alert.launch(
          'Error al cargar la información del usuario',
          e.toString(),
          'error'
        );
      },
    });
  }
  getData(id: string) {
    this._eventoService.getEvento(id).subscribe({
      next: (res: { status: string; evento: IEvento }) => {
        if(!res.evento) {
          this._alert.launch(
            'Error al cargar la información del evento',
            'No se encontró el evento',
            'error'
          );
          return;
        }
        this.evento = res.evento ? res.evento : this.evento;
        this.configData();
        this.configOptions();
        this.cssCreate();
      },
      error: (err) => {
        this.configData();
        this.configOptions();
        this._sharedService.consoleParser({ thing: err, type: 'error' });
        this._alert.launch(
          'Error al cargar la información del evento.',
          err.toString(),
          'error'
        );
      },
    });
  }
  configData() {
    if (this.evento.title !== '') this.lockeds['title'] = false;
    this.newActivity = new Activity(
      '', // _id: string,
      0, // ticketType: number,
      'Nueva Actividad', // title: string,
      'Subtítulo de la actividad', // subtitle: string,
      'Descripción de la actividad', // description: string,
      null, // headerImage: File | null,
      [], // photos: File[],
      [], // califications: ICalification[],
      [], // witness: IWitness[],
      new Date(), // date: Date,
      'Lugar de la actividad', // place: string,
      '', // titleColor: string,
      '', // textColor: string,
      '', // linkColor: string,
      '', // bgColor: string,
      new Date(), // createAt: Date,
      new Date(), // changeDate: Date,
      null, // changeUser: IUser | null,
      'create',
      0, // ver: number,
      false, // isDeleted: boolean,
      [] // changeHistory: IActivity[]
    );
    this.newTicketUser = new User(
      '', // _id: string,
      '', // name: string,
      'basic', // role: 'basic' | 'premium' | 'special',
      'asistente', // type: 'asistente' | 'operador' | 'administrador' | 'técnico',
      [], // tickets: ITicket[],
      '', // email: string,
      '', // password: string,
      '', // lastPassword: string,
      '', // passRec: string,
      false, // verified: boolean,
      0, // users: number,
      new Date(), // createAt: Date,
      new Date(), // changeDate: Date,
      null, // changeUser: IUser | null,
      'create', // changeType: 'create' | 'update' | 'delete',
      0, // ver: number,
      false, // isDeleted: boolean,
      [] // changeHistory: IUser[]
    );
    this.newOperatorsOptions = this.getOperatorsOptions();
    this.activities4Tickets = this.getActivities4Tickets();
  }
  configOptions() {
    this.options[0].show =
      !!this.identity &&
      (this.checkRole(
        this.identity.roleType,
        this.identity.generalRole,
        'special'
      ) ||
        (this.checkRole(
          this.identity.roleType,
          this.identity.generalRole,
          'premium'
        ) &&
          !!this.evento.tickets.find(
            (t) => t.user?._id === this.identity?._id && t.role !== 'asistente'
          )));
    this.options[1].show =
      !!this.identity &&
      (this.checkRole(
        this.identity.roleType,
        this.identity.generalRole,
        'special'
      ) ||
        !!this.evento.tickets.find(
          (t) => t.user?._id === this.identity?._id && t.role === 'asistente'
        ));
    this.options[2].show =
      !!this.identity &&
      (this.checkRole(
        this.identity.roleType,
        this.identity.generalRole,
        'special'
      ) ||
        !!this.evento.tickets.find(
          (t) => t.user?._id === this.identity?._id && t.role === 'asistente'
        ));
  }
  /* TODO: Añadir popups de confirmación, error y éxito. */
  onSubmit() {
    this._alert.launch({
      title: '¿Quieres guardar los cambios?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.evento._id !== '') {
          this._eventoService.updateEvento(this.evento).subscribe({
            next: (res: { status: string; evento: IEvento }) => {
              this._sharedService.consoleParser({ thing: res, type: 'log' });
              this.evento = res.evento ? res.evento : this.evento;
              this.configData();
              this.configOptions();
              this.cssCreate();
              this._alert.launch('Se guardaron los cambios', '', 'success');
            },
            error: (err) => {
              this._sharedService.consoleParser({ thing: err, type: 'error' });
              this._alert.launch(
                'Error al guardar la información del evento',
                err.toString(),
                'error'
              );
            },
          });
        } else {
          this._eventoService.createEvento(this.evento).subscribe({
            next: (res: { status: string; evento: IEvento }) => {
              this.evento = res.evento ? res.evento : this.evento;
              this.configData();
              this.configOptions();
              this.cssCreate();
              this._alert.launch(
                'Se creo el evento',
                `El evento ${this.evento.title} ha sido creado.`,
                'success'
              );
              this._alert.launch({
                title: '¿Quieres crear otro evento?',
                icon: 'warning',
                showDenyButton: true,
                confirmButtonText: 'Si',
                denyButtonText: 'No',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.evento = new Evento(
                    '', // _id: string,
                    null, // logo: File | null,
                    null, // headerImage: File | null,
                    'Descripción del evento.', // description: string,
                    'Título del evento', // title: string,
                    'Subtítulo del evento', // subtitle: string,
                    [], // activities: IActivity[],
                    [], // califications: ICalification[],
                    [], // witness: IWitness[],
                    [], // asistents: IUser[],
                    [], // operators: IUser[],
                    1, // ticketTypes: number,
                    [], // photos: File[],
                    new Date(), // date: Date,
                    'Lugar del evento', // place: string,
                    '', // titleColor: string,
                    '', // textColor: string,
                    '', // linkColor: string,
                    '', // bgColor: string,
                    [], // tickets: ITicket[],
                    new Date(), // createAt: Date,
                    new Date(), // changeDate: Date,
                    null, // changeUser: IUser | null,
                    'create',
                    0, // ver: number,
                    false, // isDeleted: boolean,
                    [] // changeHistory: IEvento[]
                  );
                  this.newActivity = new Activity(
                    '', // _id: string,
                    0, // ticketType: number,
                    'Nueva Actividad', // title: string,
                    'Subtítulo de la actividad', // subtitle: string,
                    'Descripción de la actividad', // description: string,
                    null, // headerImage: File | null,
                    [], // photos: File[],
                    [], // califications: ICalification[],
                    [], // witness: IWitness[],
                    new Date(), // date: Date,
                    'Lugar de la actividad', // place: string,
                    '', // titleColor: string,
                    '', // textColor: string,
                    '', // linkColor: string,
                    '', // bgColor: string,
                    new Date(), // createAt: Date,
                    new Date(), // changeDate: Date,
                    null, // changeUser: IUser | null,
                    'create',
                    0, // ver: number,
                    false, // isDeleted: boolean,
                    [] // changeHistory: IActivity[]
                  );
                  this.newTicket = new Ticket(
                    '', // _id: string,
                    0, // ticketType: number,
                    null, // evento: IEvento,
                    null, // user: IUser,
                    'asistente', // role: 'asistente' | 'operador general' | 'operador de actividad' | 'operador de asistentes',
                    [], // activitiesAdmin: IActivity[],
                    new Date(), // createAt: Date,
                    new Date(), // changeDate: Date,
                    null, // changeUser: IUser | null,
                    'create', // changeType: 'create' | 'update' | 'delete',
                    0, // ver: number,
                    false, // isDeleted: boolean,
                    [] // changeHistory: ITicket[]
                  );
                  this.newTicketUser = new User(
                    '', // _id: string,
                    '', // name: string,
                    'basic', // role: 'basic' | 'premium' | 'special',
                    'asistente', // type: 'asistente' | 'operador' | 'administrador' | 'técnico',
                    [], // tickets: ITicket[],
                    '', // email: string,
                    '', // password: string,
                    '', // lastPassword: string,
                    '', // passRec: string,
                    false, // verified: boolean,
                    0, // users: number,
                    new Date(), // createAt: Date,
                    new Date(), // changeDate: Date,
                    null, // changeUser: IUser | null,
                    'create', // changeType: 'create' | 'update' | 'delete',
                    0, // ver: number,
                    false, // isDeleted: boolean,
                    [] // changeHistory: IUser[]
                  );
                } else {
                  this._router.navigate(['/evento/evento', this.evento._id]);
                }
              });
            },
            error: (err) => {
              this._sharedService.consoleParser({ thing: err, type: 'error' });
              this._alert.launch(
                'Error al guardar la información del evento',
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
  async onSubmitTicket() {
    this._alert.launch({
      title: '¿Quieres guardar los cambios?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          if (this.newTicket._id !== '') {
            this._eventoService.updateTicket(this.newTicket).subscribe({
              next: (res: { status: string; ticket: ITicket }) => {
                this._sharedService.consoleParser({ thing: res, type: 'log' });
                this.newTicket = res.ticket ? res.ticket : this.newTicket;
                this.getData(this.evento._id);
                this._alert.launch('Se guardaron los cambios', '', 'success');
              },
              error: (err) => {
                this.getData(this.evento._id);
                this._sharedService.consoleParser({
                  thing: err,
                  type: 'error',
                });
                this._alert.launch(
                  'Error al guardar la información del ticket',
                  err.toString(),
                  'error'
                );
              },
            });
          } else {
            try {
              let user: { user: IUser; status: string } | null =
                await firstValueFrom(
                  this._userService.getUser(this.newTicketUser.email, 'email')
                ).catch((err) => {
                  this._sharedService.consoleParser({
                    thing: err,
                    type: 'error',
                  });
                  return null;
                });
              if (!user?.user) {
                this.newTicketUser.name =
                  this.newTicketUser.name !== ''
                    ? this.newTicketUser.name
                    : this.newTicketUser.email;
                user = await firstValueFrom(
                  this._userService.register(this.newTicketUser)
                );
                if (!user?.user) {
                  throw new Error('No se pudo crear el usuario');
                }
              }
              this.newTicket.evento = this.evento;
              this.newTicket.user = user.user;
              this._sharedService.consoleParser({
                thing: this.newTicket,
                type: 'log',
              });
              let newTicket: ITicket | null = await firstValueFrom(
                this._eventoService.createTicket(
                  this.newTicket,
                  this.newTicket.user._id,
                  this.newTicket.evento._id
                )
              );
              this._sharedService.consoleParser({
                thing: newTicket,
                type: 'log',
              });
              if (!newTicket) throw new Error('No se pudo crear el ticket');
              this._alert.launch('Se guardaron los cambios', '', 'success');
              this.getData(this.evento._id);
            } catch (error: any) {
              this._sharedService.consoleParser({
                thing: error,
                type: 'error',
              });
              this._alert.launch(
                'Error al guardar la información del ticket',
                error.toString(),
                'error'
              );
            }
          }
        })();
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
      .filter(
        (i) =>
          i >=
          (!!this.evento.activities[0]
            ? Math.max(...this.evento.activities.map((a) => a.ticketType))
            : 1)
      )
      .map((i) => {
        return {
          type: 'menuitem',
          option: `${i}`,
          click: `ticketTypes=${i}`,
        };
      });
  }
  getTicketTypeOptions(): IOptionDropdown[] {
    // Get the the maximun number in an array of numbers
    // https://stackoverflow.com/questions/1669190/find-the-min-max-element-of-an-array-in-javascript
    // Math.max(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    return Array.from(Array(6).keys())
      .filter((i) => i <= this.evento.ticketTypes)
      .map((i) => {
        return {
          type: 'menuitem',
          option: `${i}`,
          click: `TICKETTYPE=${i}`,
        };
      });
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
  clickedDropdown(event: IOptionDropdown) {
    switch (true) {
      case event.click.includes('ticketTypes'):
        this.evento.ticketTypes = parseInt(event.click.split('=')[1]);
        break;
      case event.click.includes('TICKETTYPE'):
        this.newTicket.type = parseInt(event.click.split('=')[1]);
        break;
      case event.click.includes('OPERATOR'):
        this._sharedService.consoleParser({ thing: event, type: 'log' });
        let ticket: ITicket | undefined = this.evento.tickets.find(
          (t: ITicket) => t.user?._id === event.click.split('=')[1]
        );
        this.newTicket = !!ticket ? ticket : this.newTicket;
        this.activities4Tickets = this.getActivities4Tickets();
        this.newTicketUser = new User(
          '', // _id: string,
          '', // name: string,
          'basic', // role: 'basic' | 'premium' | 'special',
          'asistente', // type: 'asistente' | 'operador' | 'administrador' | 'técnico',
          [], // tickets: ITicket[],
          '', // email: string,
          '', // password: string,
          '', // lastPassword: string,
          '', // passRec: string,
          false, // verified: boolean,
          0, // users: number,
          new Date(), // createAt: Date,
          new Date(), // changeDate: Date,
          null, // changeUser: IUser | null,
          'create', // changeType: 'create' | 'update' | 'delete',
          0, // ver: number,
          false, // isDeleted: boolean,
          [] // changeHistory: IUser[]
        );
        this.modal = 'ticket';
        break;
      case event.click.includes('TICKETROLE'):
        this.newTicket.role = event.click.split('=')[1] as
          | 'asistente'
          | 'operador general'
          | 'operador de actividad'
          | 'operador de asistentes';
        this.newOperatorsOptions = this.getOperatorsOptions();
        break;
      case event.click.includes('ACTIVITY'):
        let activity: IActivity | undefined = this.evento.activities.find(
          (o: IActivity) => o._id === event.click.split('=')[1]
        );
        if (!!activity) {
          this.activity2Ticket(activity);
        }
        break;
      default:
        break;
    }
  }
  clickedButton(event: string) {
    switch (event) {
      case 'edit':
        this.isEdit = true;
        this.showOptions = false;
        this.cssCreate();
        break;
      case 'photos':
        break;
      case 'score':
        break;
      default:
        break;
    }
  }
  asignTicket2Edit(ticket: ITicket | undefined = undefined): void {
    this.newTicket = !!ticket
      ? ticket
      : new Ticket(
        '', // _id: string,
        0, // ticketType: number,
        null, // evento: IEvento,
        null, // user: IUser,
        'asistente', // role: 'asistente' | 'operador general' | 'operador de actividad' | 'operador de asistentes',
        [], // activitiesAdmin: IActivity[],
        new Date(), // createAt: Date,
        new Date(), // changeDate: Date,
        null, // changeUser: IUser | null,
        'create', // changeType: 'create' | 'update' | 'delete',
        0, // ver: number,
        false, // isDeleted: boolean,
        [] // changeHistory: ITicket[]
      );
    this.newTicketUser = new User(
      '', // _id: string,
      '', // name: string,
      'basic', // role: 'basic' | 'premium' | 'special',
      'asistente', // type: 'asistente' | 'operador' | 'administrador' | 'técnico',
      [], // tickets: ITicket[],
      '', // email: string,
      '', // password: string,
      '', // lastPassword: string,
      '', // passRec: string,
      false, // verified: boolean,
      0, // users: number,
      new Date(), // createAt: Date,
      new Date(), // changeDate: Date,
      null, // changeUser: IUser | null,
      'create', // changeType: 'create' | 'update' | 'delete',
      0, // ver: number,
      false, // isDeleted: boolean,
      [] // changeHistory: IUser[]
    );
    this.modal = 'ticket';
    this.activities4Tickets = this.getActivities4Tickets();
  }
  getOperatorsOptions(): IOptionDropdown[] {
    return this.evento.tickets
      .filter((t: ITicket) => t.role === 'asistente')
      .map((t: ITicket) => {
        return {
          type: 'menuitem',
          option: t.user?.name ? t.user.name : '',
          click: t.user?._id ? `OPERATOR=${t.user?._id}` : '',
        };
      });
  }
  activity2Ticket(activity: IActivity) {
    if (this.newTicket.activitiesAdmin.find((a) => a._id === activity._id)) {
      this.newTicket.activitiesAdmin = this.newTicket.activitiesAdmin.filter(
        (a) => a._id !== activity._id
      );
    } else {
      this.newTicket.activitiesAdmin.push(activity);
    }
    this.activities4Tickets = this.getActivities4Tickets();
  }
  getActivities4Tickets(): IOptionDropdown[] {
    return this.evento.activities
      .filter((a: IActivity) => {
        return !this.newTicket.activitiesAdmin.find((aa) => {
          return aa._id === a._id;
        });
      })
      .map((a: IActivity) => {
        return {
          type: 'menuitem',
          option: a.title,
          click: `ACTIVITY=${a._id}`,
        };
      });
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
  getHTML(type: string): string {
    return this._sharedService.getHTML(type);
  }
  returnToPreviousPage() {
    this.location.back();
  }
  checkRole(
    roleType: 'basic' | 'premium' | 'special',
    generalRole: 'asistente' | 'operador' | 'administrador' | 'técnico',
    role2Check:
      | 'basic'
      | 'premium'
      | 'special'
      | 'asistente'
      | 'operador'
      | 'administrador'
      | 'técnico'
  ) {
    return this._sharedService.checkRole(roleType, generalRole, role2Check);
  }
  checkForOptionsCanShow(): boolean {
    return !!this.options.find((o: any) => !!o.show);
  }
  cssCreate() {
    this._sharedService.cssCreate();
  }
}
