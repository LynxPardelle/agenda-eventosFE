import { Injectable, WritableSignal, signal } from '@angular/core';
import { AlertIcon, AlertOptions, AlertReturn, TAlertOptionPlusActive } from '../types/alert.type';

@Injectable({
  providedIn: 'root'
})
export class GenericAlertService {
  public alertOptions: TAlertOptionPlusActive = { isActive: false };
  public alertReturn: AlertReturn = {
    isConfirmed: false,
    isDenied: false,
    isDismissed: false
  };
  public alertSignal: WritableSignal<boolean> = signal(false);
  constructor() { }

  launchWitHOptions<T = any>(options: AlertOptions<T>): Promise<AlertReturn<Awaited<T>>> {
    options.showConfirmButton = options.showConfirmButton ? options.showConfirmButton : true;
    this.alertOptions = { ...this.alertOptions, ...options, isActive: true };

    return new Promise((resolve) => {
      this.alertReturn = { ...this.alertReturn, isConfirmed: false, isDenied: false, isDismissed: false, value: undefined };
      this.alertSignal.set(true);
      const interval = setInterval(() => {
        if (this.alertReturn.isConfirmed || this.alertReturn.isDenied || this.alertReturn.isDismissed) {
          clearInterval(interval);
          this.alertOptions = { isActive: false };
          this.alertSignal.set(false);
          resolve(this.alertReturn as AlertReturn<Awaited<T>>);
        }
      }, 100);
      this.alertReturn = { isConfirmed: false, isDenied: false, isDismissed: false };
    });
  }

  launch<T = any>(titleOrOptions: string | AlertOptions<T>, html?: string, icon?: AlertIcon): Promise<AlertReturn<Awaited<T>>> {
    if (typeof titleOrOptions === 'string') {
      return this.launchWitHOptions({ title: titleOrOptions as string, html: html as string, icon: icon as AlertIcon });
    } else {
      return this.launchWitHOptions(titleOrOptions as AlertOptions<T>);
    }
  }
}
