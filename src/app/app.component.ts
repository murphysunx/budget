import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ButtonLoadingComponent } from '@shared/components/stateful/stateful-button/stateful-button-loading/loading.component';
import { EStatefulButtonState } from '@shared/components/stateful/stateful-button/stateful-button.state';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'budget';

  buttonComponents: { [key: string]: Type<any> } = {};

  @ViewChild('statefulButton') statefulButton?: MatButton;

  buttonEffects: { [key in keyof typeof EStatefulButtonState]?: () => void } = {
    // init: () => {},
    loading: () => {
      if (this.statefulButton) {
        this.statefulButton.disabled = true;
      }
    },
    active: () => {
      if (this.statefulButton) {
        this.statefulButton.disabled = false;
      }
    },
    // disabled: () => {},
  };

  btnState$ = new BehaviorSubject<EStatefulButtonState>(
    EStatefulButtonState.init
  );

  ButtonStates = EStatefulButtonState;

  onClick(): void {
    // console.log(`[app component] click`);
    this.btnState$.next(EStatefulButtonState.loading);
    setTimeout(() => {
      this.btnState$.next(EStatefulButtonState.active);
    }, 1000);
  }

  ngOnInit(): void {
    this.buttonComponents[
      EStatefulButtonState.loading
    ] = ButtonLoadingComponent;
  }
}
