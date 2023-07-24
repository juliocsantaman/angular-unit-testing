import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-observable-test',
  templateUrl: './observable-test.component.html',
  styleUrls: ['./observable-test.component.scss']
})
export class ObservableTestComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.subscription = this.masterService.getNumbers$().subscribe((data) => {
      console.log('data: ', data);
    });

    this.masterService.setNumbers$([4, 5, 6]);

  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
    this.subscription.unsubscribe();
  }

}
