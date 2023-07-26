import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {

  defaultColor = 'gray';
  @Input('appHighlight') bgColor = '';

  constructor(
    private element: ElementRef
  ) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
   }

   ngOnChanges(changes: SimpleChanges): void {
       this.element.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
   }

}
