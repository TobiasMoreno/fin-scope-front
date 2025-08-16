import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonComponent } from '../skeleton/skeleton.component';

export interface CardConfig {
  title: string;
  value: string;
  subtitle?: string;
  icon?: string;
  iconColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
  valueColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'black';
  trend?: {
    value: string;
    isPositive: boolean;
  };
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'elevated';
  loading?: boolean; // Nueva propiedad para estado de carga
}

@Component({
  selector: 'app-card',
  imports: [MatIconModule, SkeletonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  config = input.required<CardConfig>();
  
  getIconColorClass(): string {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
      gray: 'bg-gray-100 text-gray-600'
    };
    return colorMap[this.config().iconColor || 'blue'];
  }

  getValueColorClass(): string {
    const colorMap = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      red: 'text-red-600',
      yellow: 'text-yellow-600',
      purple: 'text-purple-600',
      gray: 'text-gray-600',
      black: 'text-gray-900'
    };
    return colorMap[this.config().valueColor || 'black'];
  }

  getSizeClasses(): string {
    const sizeMap = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };
    return sizeMap[this.config().size || 'md'];
  }

  getVariantClasses(): string {
    const variantMap = {
      default: 'bg-white shadow-lg border border-gray-200',
      outlined: 'bg-white border-2 border-gray-200',
      elevated: 'bg-white shadow-xl border border-gray-200'
    };
    return variantMap[this.config().variant || 'default'];
  }

  getTrendColorClass(): string {
    return this.config().trend?.isPositive ? 'text-green-600' : 'text-red-600';
  }
}
