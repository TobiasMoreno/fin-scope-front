import { Component, inject, OnInit } from '@angular/core';
import { InvestmentService } from '../../../core/services/investment.service';
import { Investment, DashboardData, PaginatedResponse, InvestmentSummary } from '../../../core/interfaces/investment.interface';
import { TableComponent, TableConfig } from '../../../shared/components/table/table.component';
import { CardComponent, CardConfig } from '../../../shared/components/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    TableComponent, 
    CardComponent, 
    MatProgressSpinnerModule, 
    MatIconModule,
    SkeletonComponent,
    ErrorMessageComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  investments: Investment[] = [];
  loading = true;
  error: string | null = null;

  private investmentService = inject(InvestmentService);

  totalInvestedCard: CardConfig = {
    title: 'Total Invertido',
    value: 'Cargando...',
    subtitle: 'Calculando totales...',
    icon: 'folder',
    iconColor: 'purple',
    loading: true,
    trend: {
      value: '0.00%',
      isPositive: true
    }
  };

  variationCard: CardConfig = {
    title: 'Variación Diaria',
    value: 'Cargando...',
    icon: 'trending_down',
    iconColor: 'gray',
    valueColor: 'gray',
    loading: true,
    trend: {
      value: '0.00',
      isPositive: false
    }
  };

  gainCard: CardConfig = {
    title: 'Ganancia/Pérdida Total',
    value: 'Cargando...',
    icon: 'trending_up',
    iconColor: 'gray',
    valueColor: 'gray',
    loading: true,
    trend: {
      value: '0.00%',
      isPositive: true
    }
  };

  cedearsCard: CardConfig = {
    title: 'Cedears',
    value: 'USD 0,00',
    subtitle: '0 posiciones',
    icon: 'folder',
    iconColor: 'purple',
    size: 'md',
    variant: 'default'
  };

  accionesCard: CardConfig = {
    title: 'Acciones',
    value: 'USD 0,00',
    subtitle: '0 posiciones',
    icon: 'bar_chart',
    iconColor: 'yellow',
    size: 'md',
    variant: 'default'
  };

  tableConfig: TableConfig = {
    columns: [
      { name: 'productDisplay', header: 'Producto', type: 'text', sortable: true, visible: true, order: 1 },
      { name: 'quantity', header: 'Cantidad', type: 'number', sortable: true, visible: true, order: 2 },
      { name: 'lastPrice', header: 'Último Precio', type: 'currency', sortable: true, visible: true, order: 3 },
      { name: 'dailyVariationPercentDisplay', header: 'Var % Diaria', type: 'text', sortable: false, visible: true, order: 4, showColorIndicator: true },
      { name: 'dailyVariationAmountDisplay', header: 'Var $ Diaria', type: 'text', sortable: false, visible: true, order: 5, showColorIndicator: true },
      { name: 'costPerShareDisplay', header: 'PPC', type: 'text', sortable: false, visible: true, order: 6 },
      { name: 'gainLossPercentDisplay', header: 'Gan-Per %', type: 'text', sortable: false, visible: true, order: 7, showColorIndicator: true },
      { name: 'gainLossAmountDisplay', header: 'Gan.-Per $', type: 'text', sortable: false, visible: true, order: 8, showColorIndicator: true },
      { name: 'totalDisplay', header: 'Total', type: 'text', sortable: false, visible: true, order: 9 }
    ],
    showActions: true,
    showColumnSelector: true,
    showPaginator: false, // No necesitamos paginación ya que usamos todos los datos del dashboard
    showAddButton: true,
    title: 'Mis Inversiones',
    defaultSort: { active: 'productDisplay', direction: 'asc' },
    customActions: [
      {
        name: 'details',
        icon: 'info',
        tooltip: 'Ver detalles',
        color: 'primary'
      },
      {
        name: 'chart',
        icon: 'show_chart',
        tooltip: 'Ver gráfico',
        color: 'accent'
      }
    ]
  };

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = null;

    // Cargar datos del dashboard
    this.investmentService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.updateCardData();
        this.prepareInvestmentsForTable();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.error = error.message || 'Error al cargar el dashboard';
        this.loading = false;
      }
    });
  }

  private prepareInvestmentsForTable(): void {
    if (!this.dashboardData) return;

    // Obtener todas las inversiones de todas las secciones
    const allInvestments: Investment[] = [];
    
    this.dashboardData.sections.forEach(section => {
      allInvestments.push(...section.investments);
    });

    // Preparar las inversiones para la tabla
    this.investments = this.investmentService.prepareInvestmentsForTable(allInvestments);
  }

  updateCardData(): void {
    if (!this.dashboardData) return;

    // Actualizar tarjetas con datos del dashboard
    this.totalInvestedCard = {
      title: 'Total Invertido',
      value: this.formatCurrency(parseFloat(this.dashboardData.totalVariation.total)),
      subtitle: `Variación total`,
      icon: 'folder',
      iconColor: 'purple',
      loading: false,
      trend: {
        value: this.formatPercentage(parseFloat(this.dashboardData.totalVariation.total)),
        isPositive: parseFloat(this.dashboardData.totalVariation.total) >= 0
      }
    };

    this.variationCard = {
      title: 'Variación Diaria',
      value: this.formatCurrency(parseFloat(this.dashboardData.totalVariation.daily)),
      icon: 'trending_down',
      iconColor: parseFloat(this.dashboardData.totalVariation.daily) >= 0 ? 'green' : 'red',
      valueColor: parseFloat(this.dashboardData.totalVariation.daily) >= 0 ? 'green' : 'red',
      loading: false,
      trend: {
        value: this.formatCurrency(parseFloat(this.dashboardData.totalVariation.daily)),
        isPositive: parseFloat(this.dashboardData.totalVariation.daily) >= 0
      }
    };

    // Actualizar tarjetas por sección
    this.dashboardData.sections.forEach(section => {
      if (section.type === 'CEDEAR') {
        this.cedearsCard = {
          title: 'Cedears',
          value: this.formatCurrency(parseFloat(section.total)),
          subtitle: `${section.investments.length} posiciones`,
          icon: 'folder',
          iconColor: 'purple',
          size: 'md',
          variant: 'default'
        };
      } else if (section.type === 'ACCION') {
        this.accionesCard = {
          title: 'Acciones',
          value: this.formatCurrency(parseFloat(section.total)),
          subtitle: `${section.investments.length} posiciones`,
          icon: 'bar_chart',
          iconColor: 'yellow',
          size: 'md',
          variant: 'default'
        };
      }
    });

    // Cargar resumen para la tarjeta de ganancia
    this.loadSummary();
  }

  loadSummary(): void {
    this.investmentService.getInvestmentSummary().subscribe({
      next: (summary) => {
        this.gainCard = {
          title: 'Ganancia/Pérdida Total',
          value: this.formatCurrency(parseFloat(summary.totalGain)),
          icon: 'trending_up',
          iconColor: parseFloat(summary.totalGain) >= 0 ? 'green' : 'red',
          valueColor: parseFloat(summary.totalGain) >= 0 ? 'green' : 'red',
          loading: false,
          trend: {
            value: this.formatPercentage(parseFloat(summary.gainPercentage)),
            isPositive: parseFloat(summary.gainPercentage) >= 0
          }
        };
      },
      error: (error) => {
        console.error('Error loading summary:', error);
      }
    });
  }

  onRowClick(investment: Investment): void {
    console.log('Investment clicked:', investment);
    // Aquí puedes agregar lógica para mostrar detalles de la inversión
  }

  onCustomActionClick(event: { action: string; item: Investment }): void {
    console.log('Custom action clicked:', event);
    
    switch (event.action) {
      case 'details':
        this.showInvestmentDetails(event.item);
        break;
      case 'chart':
        this.showInvestmentChart(event.item);
        break;
      default:
        console.log('Action not implemented:', event.action);
    }
  }

  onAddClick(): void {
    console.log('Add investment clicked');
    // Aquí puedes agregar lógica para abrir modal de nueva inversión
  }

  onSortChange(event: any): void {
    const { active, direction } = event;
    // Implementar ordenamiento local si es necesario
    console.log('Sort changed:', event);
  }

  private showInvestmentDetails(investment: Investment): void {
    console.log('Showing details for:', investment);
    // Implementar modal de detalles
  }

  private showInvestmentChart(investment: Investment): void {
    console.log('Showing chart for:', investment);
    // Implementar gráfico de la inversión
  }

  formatCurrency(amount: number): string {
    return this.investmentService.formatCurrency(amount);
  }

  formatPercentage(value: number): string {
    return this.investmentService.formatPercentage(value);
  }

  formatNumber(value: number): string {
    return this.investmentService.formatNumber(value);
  }

  getVariationClass(value: number): string {
    return this.investmentService.getVariationClass(value);
  }

  // Método para recargar datos
  refreshData(): void {
    this.loadDashboardData();
  }
}
