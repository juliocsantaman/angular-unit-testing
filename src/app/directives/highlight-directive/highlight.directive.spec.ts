import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
      <h5 appHighlight>Default</h5>
      <h5 appHighlight="yellow">Yellow</h5>
      <P appHighlight>Parrafo</P>
      <P>Otro parrafo</P>
      <input type="text" [(ngModel)]="color" [appHighlight]="color">

  `
})

class HostComponent {
  color: string = 'pink';
}

describe('HighlightDirective', () => {

  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, HighlightDirective ],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three appHighlight in the elements', () => {
    const elementsWithHighlightDirective = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    const elementsWithoutHighlightDirective = fixture.debugElement.queryAll(By.css('*:not([appHighlight]'));

    expect(elementsWithHighlightDirective.length).toEqual(4);
    expect(elementsWithoutHighlightDirective.length).toEqual(1);
  });

  it('should the elements be match with bgcolor', () => {
    const elementsWithHighlightDirective = fixture.debugElement.queryAll(By.directive(HighlightDirective));

    expect(elementsWithHighlightDirective[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elementsWithHighlightDirective[1].nativeElement.style.backgroundColor).toEqual('yellow');
    
  });

  it('should the first element have default color', () => {
    const h5Default = fixture.debugElement.query(By.css('h5'));
    const directive = h5Default.injector.get(HighlightDirective);

    expect(h5Default.nativeElement.style.backgroundColor).toEqual(directive.defaultColor);
    
  });

  it('should bind <input> and change the bg color', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const nativeElementInput: HTMLInputElement = input.nativeElement;
    

    expect(nativeElementInput.style.backgroundColor).toEqual('pink');

    nativeElementInput.value = 'red';
    nativeElementInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(nativeElementInput.style.backgroundColor).toEqual('red');


  });


});
