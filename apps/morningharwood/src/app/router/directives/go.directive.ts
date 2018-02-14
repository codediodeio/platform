import { Directive, HostListener, Input } from '@angular/core';

import { EventType } from '@suite/event-type';
import { StoreNavigateService } from '../service';

@Directive({
  selector: '[mhNavigate]'
})
export class NavigateDirective {
  @Input() route: string;

  constructor(private navigate: StoreNavigateService) {}

  @HostListener(EventType.CLICK)
  public click(): void {
    this.navigate.go(this.route);
  }
}
