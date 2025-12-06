import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypewriter]'
})
export class TypewriterDirective implements OnInit {

  @Input() speed = 25;

  constructor(private el: ElementRef) {
    console.log('TypewriterDirective constructor called');
  }

  ngOnInit() {
    const element = this.el.nativeElement;
    const text = element.innerText;
    element.innerText = "";
    let index = 0;
    console.log('TypewriterDirective initialized with text:', text);

    const type = () => {
      if (index < text.length) {
        element.innerText += text[index];
        console.log('Typed character:', text[index]);
        index++;
        setTimeout(type, this.speed);
      }
    };

    type();
  }
}
