import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { AccountCreateComponent } from '@app/account-create/account-create.component';
import { AmountTransferComponent } from '@app/amount-transfer/amount-transfer.component';
import { AccountSummaryComponent } from '@app/account-summary/account-summary.component';
import { UserCreateComponent } from '@app/user-create/user-create.component';
import { AgentDashboardComponent } from '@app/pages/agent-dashboard/agent-dashboard.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: 'ai/assistant', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') } },
    {
      path: 'account/create',
      component: AccountCreateComponent,
      data: { title: marker('Account Create') },
    },
    {
      path: 'amount/transfer',
      component: AmountTransferComponent,
      data: { title: marker('Amount Transfer') },
    },
    {
      path: 'account/summary',
      component: AccountSummaryComponent,
      data: { title: marker('Account Summary') },
    },
    {
      path: 'user/create',
      component: UserCreateComponent,
      data: { title: marker('User Create') },
    },
    {
      path: 'ai/assistant',
      component: AgentDashboardComponent,
      data: { title: marker('AI Assistant') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
