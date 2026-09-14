import type { TaxpayerFacts } from "../types/tax";
import type { TaxCalculationRequest } from "../types/api";

export function createTaxPayload(facts: TaxpayerFacts): TaxCalculationRequest {
  return {
    gross_income:
      facts.income.grossEmploymentIncome + facts.income.selfEmploymentIncome,

    rent_paid: facts.reliefs.rentPaid,

    pension: facts.reliefs.pensionContribution,

    nhf: facts.reliefs.nhfContribution,

    nhis: facts.reliefs.nhisContribution,

    life_insurance: facts.reliefs.lifeInsurancePremium,

    mortgage_interest: facts.reliefs.ownerOccupiedHomeLoanInterest,

    severance_pay: 0,
  };
}
