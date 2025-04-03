import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
/* Modules */
import { SharedModule } from '../../../shared/shared.module';
/* Interfaces */
/* Services */
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';
import { GenericAlertService } from '../../../shared/services/generic-alert.service';
/* Store */
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { SesionLoaded } from '../../../state/actions/sesion.actions';
/* Components */
import { GenericButtonComponent } from '../../../shared/components/generic-button/generic-button.component';
import { LogoShowComponent } from '../../../shared/components/logo-show/logo-show.component';
import { GenericInputComponent } from '../../../shared/components/generic-input/generic-input.component';

@Component({
  selector: 'app-login',
  imports: [SharedModule, RouterLink, GenericButtonComponent, LogoShowComponent, GenericInputComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  public lockeds: { [key: string]: boolean } = { email: true, password: true };

  constructor(
    private location: Location,
    private _router: Router,
    private _sharedService: SharedService,
    private _authService: AuthService,
    private store: Store<AppState>,
    private _alert: GenericAlertService
  ) { }
  onSubmit() {
    this._authService
      .login({ email: this.email, password: this.password, gettoken: true })
      .subscribe({
        next: (response: any) => {
          if (!!response.user && !!response.token) {
            this.store.dispatch(
              SesionLoaded({
                sesion: {
                  active: true,
                  identity: response.user,
                  token: response.token,
                },
              })
            );
            this._router.navigate(['/home']);
            this._alert.launch(
              'Sesión iniciada correctamente',
              'Recomendamos cambiar la contraseña si no se ha hecho recientemente.',
              'success'
            );
          } else {
            this._sharedService.consoleParser({
              thing:
                'Hubo un error al iniciar sesión: No se pudo traer al usuario o las llaves de autenticación.',
              type: 'error',
            });
            this._alert.launch(
              'Hubo un error al iniciar sesión: No se pudo traer al usuario o las llaves de autenticación.',
              '',
              'error'
            );
          }
        },
        error: (error) => {
          this._sharedService.consoleParser({ thing: error, type: 'error' });
          this._alert.launch(
            'Hubo un error al iniciar sesión: No se pudo traer al usuario o las llaves de autenticación.',
            error.toString(),
            'error'
          );
        },
      });
  }
  changesInput(thing: any) {
    Object.keys(this.lockeds).forEach((lockedInput) => {
      this.lockeds[lockedInput] = thing[lockedInput]
        ? thing.locked
        : this.lockeds[lockedInput];
    });
    switch (true) {
      case !!thing['email']:
        this.email = thing['email'];
        break;
      case !!thing['password']:
        this.password = thing['password'];
        break;
      default:
        break;
    }
    if (this.checkIfFormValid()) this.cssCreate();
  }
  checkIfFormValid() {
    return Object.values(this.lockeds).every((locked) => locked === false);
  }
  getHTML(type: string): string {
    return this._sharedService.getHTML(type);
  }
  returnToPreviousPage() {
    this.location.back();
  }
  cssCreate() {
    this._sharedService.cssCreate();
  }
}
