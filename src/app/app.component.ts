import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EStatefulButtonState } from '@shared/components/stateful/stateful-button/stateful-button.state';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'budget';

  @ViewChild('statefulButton') statefulButton?: MatButton;

  buttonEffects: { [key: string]: () => void } = {};

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
    this.buttonEffects[EStatefulButtonState.loading] = () => {
      if (this.statefulButton) {
        this.statefulButton.disabled = true;
      }
    };
    this.buttonEffects[EStatefulButtonState.active] = () => {
      if (this.statefulButton) {
        this.statefulButton.disabled = false;
      }
    };
  }
}
