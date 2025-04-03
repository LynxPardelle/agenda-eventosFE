import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
/* Modules */
import { SharedModule } from '../../../shared/shared.module';
/* RxJs */
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/* Interfaces */
import { IMainState } from '../../../core/interfaces/main.state';
/* Services */
import { SharedService } from '../../../shared/services/shared.service';
import { GenericAlertService } from '../../../shared/services/generic-alert.service';
/* State */
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { MainSelector } from '../../../state/selectors/main.selector';
import { LoadMain } from '../../../state/actions/main.actions';

@Component({
  selector: 'app-error',
  imports: [RouterLink, SharedModule, AsyncPipe],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  public main$: Observable<IMainState>;
  private _unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private location: Location,
    private _sharedService: SharedService,
    private store: Store<AppState>,
    private _alert: GenericAlertService
  ) {
    this.main$ = this.store.select(MainSelector);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getMain();
    this.store.dispatch(LoadMain());
    this.cssCreate();
  }
  ngOnDestroy() {
    this._unsubscribeAll.complete();
  }
  getMain() {
    this.main$.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (m: IMainState | null) => {
        if (m?.main) {
          this._sharedService.consoleLog(m.main);
          this.cssCreate();
        }
      },
      error: (e) => {
        this._sharedService.consoleLog(e, null, 'padding: 1rem;', 'error');
        this._alert.launch(
          'Error al cargar la información del sitio',
          e.toString(),
          'error'
        );
      },
    });
  }
  returnToPreviousPage() {
    this.location.back();
  }
  cssCreate() {
    this._sharedService.cssCreate();
  }
}
