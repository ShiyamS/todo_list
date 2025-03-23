import { Directive, ElementRef, Host, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostBinding('style.transition') transition: string = "";
  @HostBinding('style.margin') padding: string = "";

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'margin', "5px 0px");
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', "0.5s");

  }

  @HostListener('mouseleave') onMouseLeave() {
    this.transition = "0.5s";
    this.padding = "0px";
  }

}
