import { Component } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-unit-testing-services';

  ngOnInit() {
    const calculator = new Calculator();

    const response = calculator.multiply(4, 5);
  }
}
