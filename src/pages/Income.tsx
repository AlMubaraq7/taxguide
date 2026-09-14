import { useState } from "react";
import type { EmploymentStatus, TaxpayerFacts } from "../types/tax";
import { formatNumber } from "../utils";

interface IncomeProps {
  employmentStatus: EmploymentStatus;
  onNext: (income: TaxpayerFacts["income"]) => void;
  onBack: () => void;
}

export default function Income({
  employmentStatus,
  onNext,
  onBack,
}: IncomeProps) {
  const [grossEmploymentIncome, setGrossEmploymentIncome] = useState("");

  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState("");

  const hasEmployment =
    employmentStatus === "employed" || employmentStatus === "both";

  const hasSelfEmployment =
    employmentStatus === "self-employed" || employmentStatus === "both";

  const canContinue =
    (!hasEmployment || grossEmploymentIncome !== "") &&
    (!hasSelfEmployment || selfEmploymentIncome !== "");

  const handleNext = () => {
    onNext({
      grossEmploymentIncome:
        Number(grossEmploymentIncome.replace(/,/g, "")) || 0,

      selfEmploymentIncome: Number(selfEmploymentIncome.replace(/,/g, "")) || 0,
    });
  };
  return (
    <main className="assessment">
      {" "}
      <div className="assessment-container">
        {" "}
        <header className="assessment-header">
          {" "}
          <button className="back-button" onClick={onBack}>
            ← Back{" "}
          </button>
          <div className="step-count">2 of 4</div>
        </header>
        <div className="progress">
          <div className="progress-bar" style={{ width: "50%" }} />
        </div>
        <section className="question-section">
          <span className="eyebrow">YOUR INCOME</span>

          <h1>How much do you earn?</h1>

          <p className="question-description">
            Enter your approximate annual gross income before deductions.
          </p>

          <div className="form-fields">
            {hasEmployment && (
              <MoneyField
                id="grossEmploymentIncome"
                label="Annual gross employment income"
                description="Your total annual income from employment before deductions."
                value={grossEmploymentIncome}
                onChange={setGrossEmploymentIncome}
              />
            )}

            {hasSelfEmployment && (
              <MoneyField
                id="selfEmploymentIncome"
                label="Annual self-employment income"
                description="Your approximate annual income from your business or independent work."
                value={selfEmploymentIncome}
                onChange={setSelfEmploymentIncome}
              />
            )}
          </div>

          <button
            className="continue-button"
            disabled={!canContinue}
            onClick={handleNext}
          >
            Continue
            <span>→</span>
          </button>
        </section>
      </div>
    </main>
  );
}

interface MoneyFieldProps {
  id: string;
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
}

function MoneyField({
  id,
  label,
  description,
  value,
  onChange,
}: MoneyFieldProps) {
  return (
    <div className="field">
      {" "}
      <label htmlFor={id}>{label}</label>
      <p className="field-help">{description}</p>
      <div className="money-input">
        <span>₦</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(formatNumber(e.target.value))}
        />
      </div>
    </div>
  );
}
