export interface Investment {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  lastPrice: number;
  dailyVariationPercent: number;
  dailyVariationAmount: number;
  costPerShare: number;
  gainLossPercent: number;
  gainLossAmount: number;
  total: number;
  type: 'CEDEAR' | 'ACCION' | 'CRITPO';
  // Campos adicionales para la tabla
  productDisplay?: string;
  dailyVariationPercentDisplay?: string;
  dailyVariationAmountDisplay?: string;
  costPerShareDisplay?: string;
  gainLossPercentDisplay?: string;
  gainLossAmountDisplay?: string;
  totalDisplay?: string;
}

export interface InvestmentSection {
  type: 'CEDEAR' | 'ACCION' | 'CRITPO';
  total: number;
  investments: Investment[];
}

export interface DashboardData {
  sections: InvestmentSection[];
  totalVariation: {
    daily: number;
    total: number;
  };
  currency: string;
}
