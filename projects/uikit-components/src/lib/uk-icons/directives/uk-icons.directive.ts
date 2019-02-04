import { Directive, ElementRef, Input, OnInit, Inject, Renderer2 } from '@angular/core';
// import { UKBrowser } from '../../helpers/browser';

import { UK_ICONS_PATH } from '../icons-path.token';

export type UKIconAlign = 'left' | 'right';

let isIE = 99; // UKBrowser.detectIE();

@Directive({
  selector: '[ukIcon]'
})
export class UkIconDirective implements OnInit {
  svgns = "http://www.w3.org/2000/svg";
  xlinkns = "http://www.w3.org/1999/xlink";

  @Input('ukIcon') iconName: string;
  @Input('ukIconTitle') iconTitle: string;
  @Input('ukIconPosition') position: UKIconAlign = 'left';
  @Input('ukIconColor') color: string;
  @Input('ukIconRotation') rotation: number;

  constructor(private el: ElementRef, private renderer: Renderer2, @Inject(UK_ICONS_PATH) private svgPath: string) {
  }

  createFontIcon(){
    let icon = document.createElement('i');
    icon.classList.add(`bofi-${this.iconName}`);
    if(this.color){
      if(this.color.indexOf('#') === 0){
        icon.style.color = this.color;
      }
      else{
        icon.classList.add(this.color);
      }
    }
    this.attachImage(icon);
  }

  createIcon(){
    let svg: Element = document.createElementNS(this.svgns, 'svg');
    let icon: Element = document.createElementNS(this.svgns, 'use');
    
    svg.setAttribute('fit', '');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.appendChild(icon);

    icon.setAttributeNS(this.xlinkns, 'href', `${this.svgPath}#bofi-${this.iconName}`);

    if(this.rotation){
      this.renderer.setStyle(svg, 'transform', `rotate(${this.rotation}deg)`);
    }
    
    if(this.color){
      if(this.color.indexOf('#') === 0){
        icon.setAttribute('fill', this.color);
      }
      else{
        svg.classList.add(this.color);
      }
    }
    this.attachImage(svg);
  }

  attachImage(svg: Element){
    // Add Common images
    svg.classList.add('uk-icon');
    if(this.iconTitle){
      svg.setAttribute('title', this.iconTitle);
      svg.setAttribute('role', 'img');
    }
    else{
      svg.setAttribute('aria-hidden', 'true');
      // svg.setAttribute('role', 'presentation');
    }
    // attach Image to DOM
    if(this.position === 'left'){
      this.el.nativeElement.prepend(svg);
    } else {
      this.el.nativeElement.appendChild(svg);
    }
  }

  ngOnInit(): void {
    if(isIE <= 11) {
      this.createFontIcon();
    } else {
      this.createIcon();
    }
  }

}
