import { ReversePipe } from './reverse.pipe';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('reverse text: sala to alas', () => {
    const pipe = new ReversePipe();
    const text = 'sala';
    const textTransformed =  pipe.transform(text);

    expect(textTransformed).toEqual('alas');
    
  });

});

/* ---------- */
@Component({
  template: `
      <h5> {{ 'text' | reverse }} </h5>
      <input type="text" [(ngModel)]="text">
      <p>
        {{ text | reverse }}
      </p>

  `
})

class HostComponent {
  text: string = 'pink';
}

describe('Reverse pipe from HostComponent', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, ReversePipe],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should first h5 txet', () => {
    const element: HTMLElement = fixture.debugElement.query(By.css('h5')).nativeElement;
    expect(element.textContent?.trim()).toEqual('txet');
  });

  it('Should apply reverse pipe when typing in the input', () => {
    	const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      const pElement: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;

      expect(pElement.textContent?.trim()).toEqual('knip');

      inputElement.value = 'ANA 2';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(pElement.textContent?.trim()).toEqual('2 ANA');

  });

});
