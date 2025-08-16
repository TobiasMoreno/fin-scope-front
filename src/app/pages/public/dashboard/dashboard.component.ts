import { Component, inject, OnInit } from '@angular/core';
import { InvestmentService } from '../../../core/services/investment.service';
import { Investment, DashboardData } from '../../../core/interfaces/investment.interface';
import { TableComponent, TableConfig } from '../../../shared/components/table/table.component';
import { CardComponent, CardConfig } from '../../../shared/components/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-dashboard',
  imports: [TableComponent, CardComponent, MatProgressSpinnerModule, SkeletonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  investments: Investment[] = [];
  loading = true;

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
    value: 'USD 1.281,04',
    subtitle: '5 posiciones',
    icon: 'folder',
    iconColor: 'purple',
    size: 'md',
    variant: 'default'
  };

  accionesCard: CardConfig = {
    title: 'Acciones',
    value: 'USD 69,58',
    subtitle: '1 posición',
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
    showPaginator: true,
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
    this.investmentService.getAllInvestments().subscribe({
      next: (investments) => {
        this.investments = investments;
        this.loading = false;
        this.updateCardData();
      },
      error: (error) => {
        console.error('Error loading investments:', error);
        this.loading = false;
      }
    });
  }

  updateCardData(): void {
    // Calcular totales reales basados en los datos usando el servicio
    const totalInvested = this.investmentService.calculateTotalInvested(this.investments);
    const totalCurrent = this.investmentService.calculateTotalCurrent(this.investments);
    const totalGain = this.investmentService.calculateTotalGain(this.investments);
    const gainPercentage = this.investmentService.calculateGainPercentage(this.investments);
    const dailyVariation = this.investmentService.calculateDailyVariation(this.investments);

    // Actualizar configuración de tarjetas con datos reales
    this.totalInvestedCard = {
      title: 'Total Invertido',
      value: this.formatCurrency(totalInvested),
      subtitle: `Total Actual: ${this.formatCurrency(totalCurrent)}`,
      icon: 'folder',
      iconColor: 'purple',
      loading: false,
      trend: {
        value: `${gainPercentage >= 0 ? '+' : ''}${gainPercentage.toFixed(2)}%`,
        isPositive: gainPercentage >= 0
      }
    };

    this.variationCard = {
      title: 'Variación Diaria',
      value: this.formatCurrency(dailyVariation),
      icon: 'trending_down',
      iconColor: dailyVariation >= 0 ? 'green' : 'red',
      valueColor: dailyVariation >= 0 ? 'green' : 'red',
      loading: false,
      trend: {
        value: `${dailyVariation >= 0 ? '+' : ''}${dailyVariation.toFixed(2)}`,
        isPositive: dailyVariation >= 0
      }
    };

    this.gainCard = {
      title: 'Ganancia/Pérdida Total',
      value: this.formatCurrency(totalGain),
      icon: 'trending_up',
      iconColor: gainPercentage >= 0 ? 'green' : 'red',
      valueColor: gainPercentage >= 0 ? 'green' : 'red',
      loading: false,
      trend: {
        value: `${gainPercentage >= 0 ? '+' : ''}${gainPercentage.toFixed(2)}%`,
        isPositive: gainPercentage >= 0
      }
    };
  }

  onRowClick(investment: Investment): void {
    console.log('Investment clicked:', investment);
    // Aquí puedes agregar lógica para mostrar detalles de la inversión
  }

  onCustomActionClick(event: { action: string; item: Investment }): void {
    console.log('Custom action clicked:', event);
    // Aquí puedes agregar lógica para las acciones personalizadas
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
}
