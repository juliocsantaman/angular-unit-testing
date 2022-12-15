import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() person: Person = new Person('', '', 0, 0, 0);
  @Output() onSelected = new EventEmitter<Person>();
  imc: string = '';

  constructor() { }

  ngOnInit(): void {
  }


  calculateIMC(): void {
    this.imc = this.person.calcIMC();
  }

  onClick(): void {
    this.onSelected.emit(this.person);
  }
  

}
