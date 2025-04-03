import { NgModule } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* Modules */
import { NgxUploaderModule } from 'ngx-uploader';
import { BootstrapModule } from './bootstrap.module';
/* Services */
import { SharedService } from './services/shared.service';
import { SplashScreenService } from './services/splash-screen.service';
/* Directives */
import { NgInitDirective } from './directives/ng-init.directive';
/* Pipes */
import { HarshifyPipe } from './pipes/harshify.pipe';
import { CuttingTextPipe } from './pipes/cutting-text.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SizeParserPipe } from './pipes/sizeparser.pipe';
import { TableTitleParserPipe } from './pipes/table-title-parser.pipe';
import { LogoShowComponent } from './components/logo-show/logo-show.component';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    /* Common */
    NgFor, NgIf, NgSwitch, NgClass, NgStyle, NgTemplateOutlet, NgSwitchCase, NgSwitchDefault,
    /* Directives */
    NgInitDirective,
    /* Pipes */
    HarshifyPipe,
    CuttingTextPipe,
    SafeHtmlPipe,
    SizeParserPipe,
    TableTitleParserPipe,
    /* Modules */
    NgxUploaderModule,
    BootstrapModule,
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [SharedService, SplashScreenService],
  exports: [
    /* Common */
    NgFor, NgIf, NgSwitch, NgClass, NgStyle, NgTemplateOutlet, NgSwitchCase, NgSwitchDefault,
    /* Modules */
    NgxUploaderModule,
    BootstrapModule,
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule,
    /* Directives */
    NgInitDirective,
    /* Pipes */
    HarshifyPipe,
    CuttingTextPipe,
    SafeHtmlPipe,
    SizeParserPipe,
    TableTitleParserPipe,
  ],
})
export class SharedModule { }
