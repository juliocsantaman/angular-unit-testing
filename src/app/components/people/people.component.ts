import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  // person: Person = new Person('Julio', 'Santaman', 22, 80, 1.67);
  people: Person[] = [
    new Person('Julio', 'Santaman', 22, 80, 1.67),
    new Person('Valentina', 'Santaman', 22, 80, 1.67)
  ];
  selectedPerson: Person | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  selected(person: Person) {
    this.selectedPerson = person;
  }

}
