import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Investment, InvestmentSection, DashboardData } from '../interfaces/investment.interface';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  getDashboardData(): Observable<DashboardData> {
    // Datos de ejemplo basados en la imagen
    const cedears: Investment[] = [
      {
        id: '1',
        symbol: 'AAPL',
        name: 'CEDEAR APPLE INC',
        quantity: 31.00,
        lastPrice: 11.72,
        dailyVariationPercent: -0.81,
        dailyVariationAmount: -2.97,
        costPerShare: 10.22,
        gainLossPercent: 14.61,
        gainLossAmount: 46.29,
        total: 363.21,
        type: 'CEDEAR'
      },
      {
        id: '2',
        symbol: 'BABA',
        name: 'CEDEAR ALIBABA',
        quantity: 6.00,
        lastPrice: 13.67,
        dailyVariationPercent: -4.42,
        dailyVariationAmount: -3.80,
        costPerShare: 13.24,
        gainLossPercent: 3.25,
        gainLossAmount: 2.59,
        total: 82.03,
        type: 'CEDEAR'
      },
      {
        id: '3',
        symbol: 'MCD',
        name: 'CEDEAR MCDONALDS CORPORATION',
        quantity: 2.00,
        lastPrice: 12.96,
        dailyVariationPercent: 0.45,
        dailyVariationAmount: 0.12,
        costPerShare: 11.35,
        gainLossPercent: 14.21,
        gainLossAmount: 3.23,
        total: 25.93,
        type: 'CEDEAR'
      },
      {
        id: '4',
        symbol: 'MELI',
        name: 'CEDEAR MERCADOLIBRE INC',
        quantity: 30.00,
        lastPrice: 19.43,
        dailyVariationPercent: -1.46,
        dailyVariationAmount: -8.63,
        costPerShare: 19.85,
        gainLossPercent: -2.16,
        gainLossAmount: -12.84,
        total: 582.75,
        type: 'CEDEAR'
      },
      {
        id: '5',
        symbol: 'SPY',
        name: 'CEDEAR SPDR S&P 500',
        quantity: 7.00,
        lastPrice: 32.45,
        dailyVariationPercent: -0.76,
        dailyVariationAmount: -1.74,
        costPerShare: 29.78,
        gainLossPercent: 8.95,
        gainLossAmount: 18.66,
        total: 227.12,
        type: 'CEDEAR'
      }
    ];

    const acciones: Investment[] = [
      {
        id: '6',
        symbol: 'LOMA',
        name: 'LOMA NEGRA',
        quantity: 32.00,
        lastPrice: 2.17,
        dailyVariationPercent: -1.73,
        dailyVariationAmount: -1.23,
        costPerShare: 2.44,
        gainLossPercent: -10.88,
        gainLossAmount: -8.50,
        total: 69.58,
        type: 'ACCION'
      }
    ];

    const sections: InvestmentSection[] = [
      {
        type: 'CEDEAR',
        total: 1281.04,
        investments: cedears
      },
      {
        type: 'ACCION',
        total: 69.58,
        investments: acciones
      }
    ];

    const dashboardData: DashboardData = {
      sections,
      totalVariation: {
        daily: -18.26,
        total: 49.42
      },
      currency: 'USD'
    };

    return of(dashboardData);
  }

  getAllInvestments(): Observable<Investment[]> {
    return this.getDashboardData().pipe(
      map(data => {
        const allInvestments: Investment[] = [];
        
        data.sections.forEach(section => {
          section.investments.forEach(investment => {
            // Preparar los datos para la tabla
            const preparedInvestment: Investment = {
              ...investment,
              productDisplay: `${investment.symbol} (${investment.name})`,
              dailyVariationPercentDisplay: this.formatPercentage(investment.dailyVariationPercent),
              dailyVariationAmountDisplay: this.formatCurrency(investment.dailyVariationAmount),
              costPerShareDisplay: this.formatCurrency(investment.costPerShare),
              gainLossPercentDisplay: this.formatPercentage(investment.gainLossPercent),
              gainLossAmountDisplay: this.formatCurrency(investment.gainLossAmount),
              totalDisplay: this.formatCurrency(investment.total)
            };
            allInvestments.push(preparedInvestment);
          });
        });
        
        return allInvestments;
      })
    );
  }

  calculateTotalInvested(investments: Investment[]): number {
    return investments.reduce((sum, inv) => {
      return sum + (inv.costPerShare * inv.quantity);
    }, 0);
  }

  calculateTotalCurrent(investments: Investment[]): number {
    return investments.reduce((sum, inv) => {
      return sum + inv.total;
    }, 0);
  }

  calculateTotalGain(investments: Investment[]): number {
    const totalInvested = this.calculateTotalInvested(investments);
    const totalCurrent = this.calculateTotalCurrent(investments);
    return totalCurrent - totalInvested;
  }

  calculateGainPercentage(investments: Investment[]): number {
    const totalInvested = this.calculateTotalInvested(investments);
    const totalGain = this.calculateTotalGain(investments);
    return totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;
  }

  calculateDailyVariation(investments: Investment[]): number {
    return investments.reduce((sum, inv) => {
      return sum + inv.dailyVariationAmount;
    }, 0);
  }

  formatCurrency(amount: number): string {
    const sign = amount > 0 ? '+' : '';
    return `USD ${sign}${amount.toFixed(2).replace('.', ',')}`;
  }

  formatPercentage(value: number): string {
    return `${value > 0 ? '+' : ''}${value.toFixed(2).replace('.', ',')}%`;
  }

  formatNumber(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  getVariationClass(value: number): string {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  }
}
