export interface Investment {
  id: number;
  userId: number;
  symbol: string;
  name: string;
  quantity: string; // BigDecimal como string desde Spring Boot
  lastPrice: string;
  dailyVariationPercent: string;
  dailyVariationAmount: string;
  costPerShare: string;
  gainLossPercent: string;
  gainLossAmount: string;
  total: string;
  type: 'CEDEAR' | 'ACCION' | 'CRIPTO';
  createdAt: string; // Formato: "dd/MM/yyyy HH:mm:ss"
  updatedAt: string;
  // Campos adicionales para la tabla (calculados en el frontend)
  productDisplay?: string;
  dailyVariationPercentDisplay?: string;
  dailyVariationAmountDisplay?: string;
  costPerShareDisplay?: string;
  gainLossPercentDisplay?: string;
  gainLossAmountDisplay?: string;
  totalDisplay?: string;
}

export interface InvestmentSection {
  type: 'CEDEAR' | 'ACCION' | 'CRIPTO';
  total: string;
  investments: Investment[];
}

export interface DashboardData {
  sections: InvestmentSection[];
  totalVariation: {
    daily: string;
    total: string;
  };
  currency: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface InvestmentSummary {
  totalInvested: string;
  totalCurrent: string;
  totalGain: string;
  gainPercentage: string;
  dailyVariation: string;
  currency: string;
}

export interface CreateInvestmentRequest {
  symbol: string;
  name: string;
  quantity: string;
  lastPrice: string;
  dailyVariationPercent?: string;
  dailyVariationAmount?: string;
  costPerShare: string;
  type: 'CEDEAR' | 'ACCION' | 'CRIPTO';
}

export interface UpdateInvestmentRequest {
  symbol?: string;
  name?: string;
  quantity?: string;
  lastPrice?: string;
  dailyVariationPercent?: string;
  dailyVariationAmount?: string;
  costPerShare?: string;
  type?: 'CEDEAR' | 'ACCION' | 'CRIPTO';
}

export interface InvestmentFilters {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  type?: 'CEDEAR' | 'ACCION' | 'CRIPTO';
  search?: string;
}
