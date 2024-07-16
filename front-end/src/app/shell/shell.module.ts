import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

// bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// carbon-components-angular default imports
import { IconModule, IconService, ThemeModule, UIShellModule, GridModule, ButtonModule, TableModule, ProgressBarModule } from 'carbon-components-angular';

// Icons
// @ts-ignore
import Notification20 from '@carbon/icons/es/notification/20';
// @ts-ignore
import UserAvatar20 from '@carbon/icons/es/user--avatar/20';
// @ts-ignore
import Search20 from '@carbon/icons/es/search/20';
// @ts-ignore
import RadioButton20 from '@carbon/icons/es/radio-button/20';
// @ts-ignore
import CheckMarkFilled20 from '@carbon/icons/es/checkmark--filled/20';
// @ts-ignore
import PopUp20 from '@carbon/icons/es/popup/20';
// @ts-ignore
import Send20 from '@carbon/icons/es/send/20';
// @ts-ignore
import Headset20 from '@carbon/icons/es/headset/20';
// @ts-ignore
import User20 from '@carbon/icons/es/user/20';

import { I18nModule } from '@app/i18n';
import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { AgentDashboardComponent } from '@app/pages/agent-dashboard/agent-dashboard.component';
import { AlertComponent } from '@app/alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    FormsModule,
    IconModule,
    ThemeModule,
    UIShellModule,
    GridModule,
    ButtonModule,
    TableModule,
    ProgressBarModule,
    AuthModule,
    I18nModule,
    RouterModule,
  ],
  declarations: [
    AgentDashboardComponent, 
    HeaderComponent, 
    ShellComponent
  ],
  providers: [
    DatePipe
  ]
})

export class ShellModule {
  constructor(protected iconService: IconService) {
		iconService.registerAll([
			Notification20,
			UserAvatar20,
      RadioButton20,
      Search20,
      CheckMarkFilled20,
      PopUp20,
      Send20,
      Headset20,
      User20
		]);
	}
}
