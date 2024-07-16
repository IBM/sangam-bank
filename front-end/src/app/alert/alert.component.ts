import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Alert, AlertType } from './alert.model';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
      // subscribe to new alert notifications
      this.alertSubscription = this.alertService.onAlert(this.id)
          .subscribe(alert => {
              // clear alerts when an empty alert is received
              if (!alert.message) {
                  // filter out alerts without 'keepAfterRouteChange' flag
                  this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                  // remove 'keepAfterRouteChange' flag on the rest
                  this.alerts.forEach(x => delete x.keepAfterRouteChange);
                  return;
              }

              // add alert to array
              this.alerts.push(alert);

              // auto close alert if required
              if (alert.autoClose) {
                  setTimeout(() => this.removeAlert(alert), 3000);
              }
         });

      // clear alerts on location change
      this.routeSubscription = this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              this.alertService.clear(this.id);
          }
      });
  }

  ngOnDestroy() {
      // unsubscribe to avoid memory leaks
      this.alertSubscription.unsubscribe();
      this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
      // check if already removed to prevent error on auto close
      if (!this.alerts.includes(alert)) return;

      // fade out alert if this.fade === true
      const timeout = this.fade ? 250 : 0;
      alert.fade = this.fade;

      setTimeout(() => {
          // filter alert out of array
          this.alerts = this.alerts.filter(x => x !== alert);
      }, timeout);
  }

  cssClass(alert: Alert) {
      if (!alert) return;

      const classes = ['alert', 'alert-dismissible'];
              
      const alertTypeClass = {
          [AlertType.Success]: 'alert-success',
          [AlertType.Error]: 'alert-danger',
          [AlertType.Info]: 'alert-info',
          [AlertType.Warning]: 'alert-warning'
      }

      if (alert.type !== undefined) {
          classes.push(alertTypeClass[alert.type]);
      }

      if (alert.fade) {
          classes.push('fade');
      }

      return classes.join(' ');
  }

}
