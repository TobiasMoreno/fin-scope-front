import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  /** Tamaño del botón */
  size = input.required<
    'small' | 'medium' | 'large' | 'square' | 'ultra-large' | 'ultra-large-minor-height'
  >();

  /** Variante del botón */
  variant = input.required<'primary' | 'secondary' | 'outline' | 'ghost'>();

  /** Estado del botón */
  disabled = input<boolean>();

  /** Estado de carga del botón */
  loading = input<boolean>(false);

  /** Color del botón */
  color = input.required<
    | 'default'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'dark'
    | 'green'
    | 'red'
    | 'gray'
  >();

  /** Estado del botón */
  bgWhite = input<boolean>(false);

  getButtonClasses(): string {
    const sizeClasses = this.getSizeClasses();
    const colorClasses = this.getColorClasses();
    const variantClasses = this.getVariantClasses();
    
    return `${sizeClasses} ${colorClasses} ${variantClasses}`.trim();
  }

  private getSizeClasses(): string {
    const sizeMap = {
      'small': 'px-2 py-1 text-xs',
      'medium': 'px-4 py-2 text-sm',
      'large': 'px-6 py-3 text-base',
      'square': 'p-3 text-base',
      'ultra-large': 'px-6 py-4 text-lg',
      'ultra-large-minor-height': 'px-6 py-3 text-lg'
    };
    return sizeMap[this.size()] || sizeMap.medium;
  }

  private getColorClasses(): string {
    const colorMap = {
      'default': 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white focus:ring-blue-500',
      'success': 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white focus:ring-green-500',
      'error': 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white focus:ring-red-500',
      'warning': 'bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white focus:ring-yellow-500',
      'info': 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white focus:ring-blue-400',
      'dark': 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800 text-white focus:ring-gray-700',
      'green': 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white focus:ring-green-500',
      'red': 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white focus:ring-red-500',
      'gray': 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white focus:ring-gray-500'
    };
    return colorMap[this.color()] || colorMap.default;
  }

  private getVariantClasses(): string {
    const variantMap = {
      'primary': '',
      'secondary': 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white focus:ring-gray-500',
      'outline': 'bg-transparent border-2 border-current text-current hover:bg-current hover:text-white dark:hover:bg-current dark:hover:text-white',
      'ghost': 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500'
    };
    return variantMap[this.variant()] || variantMap.primary;
  }
}
