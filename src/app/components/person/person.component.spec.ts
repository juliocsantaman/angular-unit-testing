import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('Julio', 'Santaman', 22, 89, 1.4);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Julio"', () => {
    expect(component.person.name).toEqual('Julio');
  });


  it('should have <h3> with text "Hola, Valentina"', () => {
    // Arrange.
    component.person = new Person('Valentina', 'Santaman', 28, 89, 1.4);
    const expectMsg = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;

    // Act.
    fixture.detectChanges();

    // Assert.
    expect(h3Element?.textContent).toEqual(expectMsg);
  });

  it('should have <p> with text "Mi altura es: 1.4"', () => {
    // Arrange.
    component.person = new Person('Valentina', 'Santaman', 28, 89, 1.4);
    const expectMsg = `Mi altura es: ${component.person.height}`;
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;

    // Act.
    fixture.detectChanges();

    // Assert.
    expect(pElement?.textContent).toEqual(expectMsg);
  });

  it('should display a text with IMC when call calculateIMC method', () => {
    // Arrange.
    const expectMsg = 'overweight level 3';
    component.person = new Person('Fernanda', 'Santaman', 30, 120, 1.65);
    const button: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    // Act.
    component.calculateIMC();
    fixture.detectChanges();
    // Assert.
    expect(button.textContent).toContain(expectMsg);
  });


  it('should display a text with IMC when do click', () => {
    // Arrange.
    const expectMsg = 'overweight level 3';
    component.person = new Person('Fernanda', 'Santaman', 30, 120, 1.65);
    const buttonDebug: DebugElement = fixture.debugElement.query(By.css('button'));
    const button: HTMLElement = buttonDebug.nativeElement;
    // Act.
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert.
    expect(button.textContent).toContain(expectMsg);
  });

  it('should raise selected event when do click', () => {
    const expectPerson = new Person('Fernanda', 'Santaman', 30, 120, 1.65);
    component.person = expectPerson;
    const buttonDebug: DebugElement = fixture.debugElement.query(By.css('button.btn-choose'));
    const button: HTMLElement = buttonDebug.nativeElement;

    let selectedPerson: Person | undefined;

    component.onSelected.subscribe((data) => {
      selectedPerson = data;
    });

    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(selectedPerson).toEqual(expectPerson);


  });

});


@Component({
  template: `<app-person [person]="person" (onSelected)="onSelected($event)"> </app-person>`
})

class HostComponent {
  person = new Person('JulioHost', 'Santaman', 12, 40, 1.5);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    const expectMsg = `Hola, ${component.person.name}`;
    const h3Element: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    fixture.detectChanges();
    expect(h3Element.textContent).toEqual(expectMsg);
    expect(h3Element.textContent).toEqual('Hola, JulioHost');
  });

  it('should raise selected event when clicked', () => {
    const buttonElement = fixture.debugElement.query(By.css('app-person .btn-choose'));
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedPerson).toEqual(component.person);
  });

});
