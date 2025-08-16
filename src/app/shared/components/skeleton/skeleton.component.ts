import { Component, input } from '@angular/core';

export interface SkeletonConfig {
  type: 'text' | 'title' | 'subtitle' | 'value' | 'icon' | 'trend' | 'card' | 'table-row' | 'button';
  width?: string;
  height?: string;
  className?: string;
}

@Component({
  selector: 'app-skeleton',
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent {
  config = input.required<SkeletonConfig>();
  
  getSkeletonClasses(): string {
    const baseClasses = 'animate-pulse bg-gray-300 rounded';
    const typeClasses = this.getTypeClasses();
    const customClasses = this.config().className || '';
    
    return `${baseClasses} ${typeClasses} ${customClasses}`;
  }
  
  private getTypeClasses(): string {
    const type = this.config().type;
    
    switch (type) {
      case 'text':
        return 'h-4 w-24';
      case 'title':
        return 'h-6 w-32';
      case 'subtitle':
        return 'h-3 w-28';
      case 'value':
        return 'h-8 w-20';
      case 'icon':
        return 'w-6 h-6 rounded-full';
      case 'trend':
        return 'h-4 w-16';
      case 'card':
        return 'h-32 w-full';
      case 'table-row':
        return 'h-12 w-full';
      case 'button':
        return 'h-10 w-24';
      default:
        return 'h-4 w-20';
    }
  }
  
  getCustomStyles(): string {
    const config = this.config();
    const styles: string[] = [];
    
    if (config.width) {
      styles.push(`width: ${config.width}`);
    }
    
    if (config.height) {
      styles.push(`height: ${config.height}`);
    }
    
    return styles.join('; ');
  }
}
