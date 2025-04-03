import { Component, effect, OnInit } from '@angular/core';
import { GenericAlertService } from '../../services/generic-alert.service';
import { TAlertOptionPlusActive } from '../../types/alert.type';
import { SharedService } from '../../services/shared.service';
import { NgxBootstrapExpandedFeaturesService } from 'ngx-bootstrap-expanded-features';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'generic-alert',
  imports: [SafeHtmlPipe],
  templateUrl: './generic-alert.component.html',
  styleUrl: './generic-alert.component.scss'
})
export class GenericAlertComponent implements OnInit {
  public alertOptions: TAlertOptionPlusActive = { isActive: false };
  public rendered: boolean = false;
  public boxClass: string = 'bef-position-absolute bef-top-calcSD50vh__MIN__150pxED bef-start-calcSD50vw__MIN__8remED bef-bg-light bef-textAlign-center bef-text-dark bef-w-16rem bef-h-300px bef-zIndex-2000 bef-rounded-0_5rem bef-boxShadow-1px__1px__7px__gray bef-pb-1_25rem';
  public combos = {
    "back-drop-alert": "bef-w-100vw bef-h-100vh bef-bg-dark bef-opacity-0_5 bef-position-fixed bef-top-0 bef-start-0 bef-zIndex-1000 bef-cursor-pointer",
  }
  constructor(
    private _genericAlertService: GenericAlertService,
    private _sharedService: SharedService,
    private _befService: NgxBootstrapExpandedFeaturesService
  ) {
    effect(() => {
      this.alertOptions = this._genericAlertService.alertOptions;
      if (this._genericAlertService.alertSignal()) {
        if (this.alertOptions.isActive) {
          this.rendered = true;
          setTimeout(() => {
          this._sharedService.cssCreate();
          }, 100);
        } else {
          this.rendered = false;
        }
      }
    });
  }

  ngOnInit() {
    this._befService.pushCombos(this.combos);
  }

  backDropClicked() {
    this._genericAlertService.alertReturn = { ...this._genericAlertService.alertReturn, isDismissed: true, dismiss: 'backdrop' };

  }
  confirmClicked() {
    this._genericAlertService.alertReturn = { ...this._genericAlertService.alertReturn, isConfirmed: true };

  }
  denyClicked() {
    this._genericAlertService.alertReturn = { ...this._genericAlertService.alertReturn, isDenied: true, dismiss: 'cancel' };
    ;
  }
  closeClicked() {
    this._genericAlertService.alertReturn = { ...this._genericAlertService.alertReturn, isDismissed: true, dismiss: 'close' };

  }

}
