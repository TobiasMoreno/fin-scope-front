import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { 
  Investment,   
  DashboardData, 
  PaginatedResponse, 
  InvestmentSummary,
  CreateInvestmentRequest,
  UpdateInvestmentRequest,
  InvestmentFilters
} from '../interfaces/investment.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private readonly apiService = inject(ApiService);

  getDashboardData(): Observable<DashboardData> {
    return this.apiService.get<DashboardData>('/investments/dashboard');
  }

  getAllInvestments(filters?: InvestmentFilters): Observable<PaginatedResponse<Investment>> {
    return this.apiService.get<PaginatedResponse<Investment>>('/investments', filters);
  }

  getInvestmentById(id: number): Observable<Investment> {
    return this.apiService.get<Investment>(`/investments/${id}`);
  }

  createInvestment(investment: CreateInvestmentRequest): Observable<Investment> {
    return this.apiService.post<Investment>('/investments', investment);
  }

  updateInvestment(id: number, investment: UpdateInvestmentRequest): Observable<Investment> {
    return this.apiService.put<Investment>(`/investments/${id}`, investment);
  }

  deleteInvestment(id: number): Observable<{ success: boolean; message: string }> {
    return this.apiService.delete<{ success: boolean; message: string }>(`/investments/${id}`);
  }

  getInvestmentSummary(): Observable<InvestmentSummary> {
    return this.apiService.get<InvestmentSummary>('/investments/summary');
  }

  getInvestmentsByType(type: 'CEDEAR' | 'ACCION' | 'CRIPTO'): Observable<Investment[]> {
    return this.apiService.get<Investment[]>(`/investments/type/${type}`);
  }

  recalculateInvestment(id: number): Observable<Investment> {
    return this.apiService.post<Investment>(`/investments/${id}/recalculate`, {});
  }

  recalculateAllInvestments(): Observable<{ success: boolean; message: string }> {
    return this.apiService.post<{ success: boolean; message: string }>('/investments/recalculate-all', {});
  }

  // Métodos auxiliares para formateo y cálculos en el frontend
  prepareInvestmentForTable(investment: Investment): Investment {
    return {
      ...investment,
      productDisplay: `${investment.symbol} (${investment.name})`,
      dailyVariationPercentDisplay: this.formatPercentage(parseFloat(investment.dailyVariationPercent || '0')),
      dailyVariationAmountDisplay: this.formatCurrency(parseFloat(investment.dailyVariationAmount || '0')),
      costPerShareDisplay: this.formatCurrency(parseFloat(investment.costPerShare || '0')),
      gainLossPercentDisplay: this.formatPercentage(parseFloat(investment.gainLossPercent || '0')),
      gainLossAmountDisplay: this.formatCurrency(parseFloat(investment.gainLossAmount || '0')),
      totalDisplay: this.formatCurrency(parseFloat(investment.total || '0'))
    };
  }

  prepareInvestmentsForTable(investments: Investment[]): Investment[] {
    return investments.map(investment => this.prepareInvestmentForTable(investment));
  }

  // Métodos de cálculo (mantenidos para compatibilidad)
  calculateTotalInvested(investments: Investment[]): number {
    return investments.reduce((sum, inv) => {
      return sum + (parseFloat(inv.costPerShare || '0') * parseFloat(inv.quantity || '0'));
    }, 0);
  }

  calculateTotalCurrent(investments: Investment[]): number {
    return investments.reduce((sum, inv) => {
      return sum + parseFloat(inv.total || '0');
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
      return sum + parseFloat(inv.dailyVariationAmount || '0');
    }, 0);
  }

  // Métodos de formateo
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

  // Método para obtener todas las inversiones como array simple (para compatibilidad)
  getAllInvestmentsAsArray(): Observable<Investment[]> {
    return this.getAllInvestments({ limit: 1000 }).pipe(
      map(response => response.content)
    );
  }
}
