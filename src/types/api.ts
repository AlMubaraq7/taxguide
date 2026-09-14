export interface TaxCalculationRequest {
  gross_income: number;
  rent_paid: number;
  pension: number;
  nhf: number;
  nhis: number;
  life_insurance: number;
  mortgage_interest: number;
  severance_pay: number;
}

export interface TaxBand {
  band: string;
  rate: string;
  tax: number;
}
export interface ExplanationEntry {
  rule: string;
  description: string;
  source: string;
  lines: string[];
}
export interface TaxCalculationResponse {
  is_exempt: boolean;
  chargeable_income: number;
  eligible_deductions: number;
  rent_relief: number;
  band_breakdown: TaxBand[] | null;
  annual_tax_payable: number;
  monthly_tax: number;
  severance_wht: number | null;
  rules_fired: string[];
  explanation: ExplanationEntry[];
}
