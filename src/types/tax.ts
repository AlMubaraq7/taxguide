export type EmploymentStatus = "employed" | "self-employed" | "both";

export interface TaxpayerFacts {
  employmentStatus: EmploymentStatus;

  income: {
    grossEmploymentIncome: number;
    selfEmploymentIncome: number;
  };

  reliefs: {
    rentPaid: number;
    pensionContribution: number;
    nhfContribution: number;
    nhisContribution: number;
    lifeInsurancePremium: number;
    ownerOccupiedHomeLoanInterest: number;
  };
}
