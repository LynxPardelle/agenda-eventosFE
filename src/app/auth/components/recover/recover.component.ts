import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
/* Modules */
import { SharedModule } from '../../../shared/shared.module';
/* Services */
import { SharedService } from '../../../shared/services/shared.service';
import { GenericAlertService } from '../../../shared/services/generic-alert.service';
/* Components */
import { GenericButtonComponent } from '../../../shared/components/generic-button/generic-button.component';
import { LogoShowComponent } from '../../../shared/components/logo-show/logo-show.component';
import { GenericInputComponent } from '../../../shared/components/generic-input/generic-input.component';

@Component({
  selector: 'app-recover',
  imports: [SharedModule, RouterLink, GenericButtonComponent, LogoShowComponent, GenericInputComponent],
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss'],
})
export class RecoverComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public passwordRe: string = '';
  /* FIXME: change this when we change the type of the page that we are. */
  public lockeds: { [key: string]: boolean } = {
    email: true,
    /* password: true,
    passwordRe: true, */
  };
  public recoverCode: string = '';
  public userId: string = '';

  constructor(
    private location: Location,
    private _router: Router,
    private _route: ActivatedRoute,
    private _sharedService: SharedService,
    private _alert: GenericAlertService
  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._route.params.subscribe((params) => {
      this.userId = params['userId'] ? params['userId'] : '';
      this.recoverCode = params['recoverCode'] ? params['recoverCode'] : '';
      this.lockeds =
        this.userId !== '' && this.recoverCode !== ''
          ? {
            password: true,
            passwordRe: true,
          }
          : {
            email: true,
          };
    });
    this.cssCreate();
  }
  onSubmit() {
    this._sharedService.consoleLog('onSubmit');
    this._alert.launch(
      'Error: Función no disponible',
      'Actualmente esta función no está disponible, contacte al administrador del sitio.',
      'error'
    );
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
