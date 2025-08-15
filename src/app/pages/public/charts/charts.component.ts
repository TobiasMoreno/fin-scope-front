import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Gráficos y Estadísticas</h1>
      <div class="bg-white rounded-lg shadow-md p-6">
        <p class="text-gray-600 mb-4">
          Esta página contiene gráficos y estadísticas avanzadas que solo están disponibles para usuarios con roles específicos.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold text-blue-800 mb-2">Gráfico de Ventas</h3>
            <p class="text-blue-600">Análisis detallado de ventas mensuales</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">Estadísticas de Usuarios</h3>
            <p class="text-green-600">Métricas de crecimiento de usuarios</p>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="font-semibold text-purple-800 mb-2">Análisis de Rendimiento</h3>
            <p class="text-purple-600">Indicadores clave de rendimiento</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ChartsComponent {
}
