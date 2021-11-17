import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

const APP_CONFIG = new InjectionToken('Application config')

@NgModule({
  imports: [CommonModule],
  providers: [
    {provide: APP_CONFIG, useValue: environment}
  ]
})
export class TodoAppCoreModule {}
