import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Todo } from './todo';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  @Input('tooltipDateDone') tooltipDateDone?: number;
  tooltip: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  /**
   * Listeners
   */
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

  /**
   * Tooltip functions
   */
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
    // https://javascript.plainenglish.io/creating-a-tooltip-directive-in-angular-abfc607d52f3s

    this.tooltip = this.renderer.createElement('span');

    // tooltip text
    let timestamp = this.tooltipDateDone || null;
    let text = "Nie zrobione";
    if (timestamp) {
      text = "Zrobione dnia "+ new Date(timestamp).toLocaleDateString("pl-PL");
    }
    this.renderer.appendChild(this.tooltip, this.renderer.createText(text));

    // add tooltip to document
    this.renderer.appendChild(document.body, this.tooltip);
    // add class to tooltip
    this.renderer.addClass(this.tooltip, 'ng-tooltip');

    // tansition
    let delay = 500;
    this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity ${delay}ms`);
    this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity ${delay}ms`);
    this.renderer.setStyle(this.tooltip, '-o-transition', `opacity ${delay}ms`);
    this.renderer.setStyle(this.tooltip, 'transition', `opacity ${delay}ms`);

    // set position
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();
    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top = hostPos.bottom;
    let left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

}
