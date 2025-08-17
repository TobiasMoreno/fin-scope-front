import { Component, EventEmitter, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [MatIconModule],
  template: `
    @if (message()) {
      <div class="error-container bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div class="flex items-center">
          <mat-icon class="text-red-500 mr-3">error</mat-icon>
          <div>
            <h3 class="text-red-800 font-medium">{{ title() || 'Error' }}</h3>
            <p class="text-red-600 text-sm mt-1">{{ message() }}</p>
            @if (showRetry()) {
              <button 
                (click)="onRetry.emit()"
                class="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Reintentar
              </button>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .error-container {
      animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ErrorMessageComponent {
  message = input<string | null>(null);
  title = input<string>('Error');
  showRetry = input<boolean>(false);
  onRetry = output<void>();
}
