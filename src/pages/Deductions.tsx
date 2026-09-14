import { useState } from "react";
import type { TaxpayerFacts } from "../types/tax";
import { formatNumber } from "../utils";

interface DeductionsProps {
  onNext: (reliefs: TaxpayerFacts["reliefs"]) => void;
  onBack: () => void;
}

export default function Deductions({ onNext, onBack }: DeductionsProps) {
  const [rentPaid, setRentPaid] = useState("");
  const [pensionContribution, setPensionContribution] = useState("");
  const [nhfContribution, setNhfContribution] = useState("");
  const [nhisContribution, setNhisContribution] = useState("");
  const [lifeInsurancePremium, setLifeInsurancePremium] = useState("");
  const [ownerOccupiedHomeLoanInterest, setOwnerOccupiedHomeLoanInterest] =
    useState("");

  const handleNext = () => {
    onNext({
      rentPaid: Number(rentPaid.replace(/,/g, "")) || 0,

      pensionContribution: Number(pensionContribution.replace(/,/g, "")) || 0,

      nhfContribution: Number(nhfContribution.replace(/,/g, "")) || 0,

      nhisContribution: Number(nhisContribution.replace(/,/g, "")) || 0,

      lifeInsurancePremium: Number(lifeInsurancePremium.replace(/,/g, "")) || 0,

      ownerOccupiedHomeLoanInterest:
        Number(ownerOccupiedHomeLoanInterest.replace(/,/g, "")) || 0,
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
          <div className="step-count">3 of 4</div>
        </header>
        <div className="progress">
          <div className="progress-bar" style={{ width: "75%" }} />
        </div>
        <section className="question-section">
          <span className="eyebrow">DEDUCTIONS & RELIEFS</span>

          <h1>Tell us about your deductions.</h1>

          <p className="question-description">
            These are optional. Enter the amount you paid during the year where
            applicable. We'll determine which items qualify under the applicable
            rules.
          </p>

          <div className="form-fields">
            <MoneyField
              id="rentPaid"
              label="Annual rent paid"
              description="Your total rent paid during the year."
              value={rentPaid}
              onChange={setRentPaid}
            />

            <MoneyField
              id="pensionContribution"
              label="Annual pension contribution"
              description="Your total pension contribution during the year."
              value={pensionContribution}
              onChange={setPensionContribution}
            />

            <MoneyField
              id="nhfContribution"
              label="Annual NHF contribution"
              description="Your total National Housing Fund contribution during the year."
              value={nhfContribution}
              onChange={setNhfContribution}
            />

            <MoneyField
              id="nhisContribution"
              label="Annual NHIS contribution"
              description="Your total National Health Insurance contribution during the year."
              value={nhisContribution}
              onChange={setNhisContribution}
            />

            <MoneyField
              id="lifeInsurancePremium"
              label="Annual life insurance / annuity premium"
              description="The amount paid during the year."
              value={lifeInsurancePremium}
              onChange={setLifeInsurancePremium}
            />

            <MoneyField
              id="ownerOccupiedHomeLoanInterest"
              label="Interest paid on an owner-occupied home loan"
              description="Annual interest paid on a loan used for your owner-occupied home."
              value={ownerOccupiedHomeLoanInterest}
              onChange={setOwnerOccupiedHomeLoanInterest}
            />
          </div>

          <button className="continue-button" onClick={handleNext}>
            Review answers
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
      <label htmlFor={id}>
        {label} <span>(optional)</span>{" "}
      </label>
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
