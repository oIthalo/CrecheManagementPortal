import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html'
})
export class ToastComponent implements OnChanges {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() trigger: number = 0;

  visible = false;
  animationClass = '';

  private timeout?: any;

  get bgColor() {
    switch (this.type) {
      case 'success': return 'bg-green-600/80';
      case 'error': return 'bg-red-600/80';
      case 'info': return 'bg-blue-600/80';
      default: return 'bg-gray-600/80';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['trigger'] &&
      !changes['trigger'].firstChange &&
      this.message
    ) {
      this.show();
    }
  }

  private show() {
    clearTimeout(this.timeout);

    this.visible = true;
    this.animationClass = 'toast-enter';

    this.timeout = setTimeout(() => {
      this.animationClass = 'toast-exit';

      setTimeout(() => {
        this.visible = false;
      }, 300);
    }, 3000);
  }
}
