import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';
import { Person } from '../../models/person.model';
import { By } from '@angular/platform-browser';

describe('PeopleComponent', () => {
  let peopleComponent: PeopleComponent;
  let personComponent: PersonComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    peopleComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(peopleComponent).toBeTruthy();
  });

  it('should have a list of app-person components', () => {
    // Arrange.
    peopleComponent.people = [
      new Person('Julio', 'Santaman', 22, 80, 1.67),
      new Person('Valentina', 'Santaman', 22, 80, 1.67),
      new Person('Laura', 'Santaman', 22, 80, 1.67)
    ];

    fixture.detectChanges();

    // Act.
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));

    // Assert.
    expect(debugElement.length).toEqual(3);

  });

  it('should have a selected person when do click', () => {
    // Arrange.
    peopleComponent.people = [
      new Person('Julio', 'Santaman', 22, 80, 1.67),
      new Person('Valentina', 'Santaman', 22, 80, 1.67),
      new Person('Laura', 'Santaman', 22, 80, 1.67)
    ];

    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.queryAll(By.css('app-person .btn-choose'));
    buttonElement[2].triggerEventHandler('click', null);
    fixture.detectChanges();

    //expect(peopleComponent.selectedPerson).toEqual(new Person('Julio', 'Santaman', 22, 80, 1.67));
    //expect(peopleComponent.selectedPerson).toEqual(new Person('Valentina', 'Santaman', 22, 80, 1.67));
    expect(peopleComponent.selectedPerson).toEqual(new Person('Laura', 'Santaman', 22, 80, 1.67));
  });


  it('should have an element li with name Laura', () => {
    // Arrange.
    peopleComponent.people = [
      new Person('Julio', 'Santaman', 22, 80, 1.67),
      new Person('Valentina', 'Santaman', 22, 80, 1.67),
      new Person('Laura', 'Santaman', 22, 80, 1.67)
    ];

    fixture.detectChanges();

    const buttonElement = fixture.debugElement.queryAll(By.css('app-person .btn-choose'));
    buttonElement[2].triggerEventHandler('click', null);
    fixture.detectChanges();

    const liElement: HTMLElement = fixture.debugElement.query(By.css('.selected-person ul > li')).nativeElement;

    expect(liElement.textContent).toContain(peopleComponent.people[2].name);

  });

});
