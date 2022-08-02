import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  tooltip: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) { this.show(); }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) { this.hide(); }
  }

  @HostListener('document:click') onMouseClick() {
    if (this.tooltip) { this.hide(); }
  }

  ngOnDestroy() {
    if (this.tooltip) { this.hide(); }
  }


  private show() {
    this.create();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
    // this.renderer.addClass
  }

  private hide() {
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    this.renderer.removeChild(document.body, this.tooltip);
    this.tooltip = null;
  }

  private create() {
    // https://stackblitz.com/edit/angular-tooltip-directive-9cf6fg?file=app%2Ftooltip.directive.ts,app%2Fapp.component.ts

    this.tooltip = this.renderer.createElement('span');

    this.renderer.appendChild(this.tooltip, this.renderer.createText('siema xd'));

    this.renderer.appendChild(document.body, this.tooltip);

    this.renderer.addClass(this.tooltip, 'ng-tooltip');

    // set position
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();

    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top = hostPos.top - tooltipPos.height + 65;
    let left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

}
