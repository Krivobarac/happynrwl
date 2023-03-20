import '@happynrwl/ui';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'happynrwl-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent {
  @Input() title?: string;
}
