import type { TaxpayerFacts } from "../types/tax";

interface ReviewProps {
  facts: TaxpayerFacts;
  onBack: () => void;
  onEdit: (section: "taxpayer" | "income" | "reliefs") => void;
  onCalculate: () => void;
  calculating: boolean;
  error: string | null;
}

export default function Review({
  facts,
  onBack,
  onEdit,
  onCalculate,
  calculating,
  error,
}: ReviewProps) {
  const { employmentStatus, income, reliefs } = facts;

  return (
    <main className="assessment">
      <div className="assessment-container review-container">
        <header className="assessment-header">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>

          <div className="step-count">4 of 4</div>
        </header>

        <div className="progress">
          <div className="progress-bar" style={{ width: "100%" }} />
        </div>

        <section className="question-section">
          <span className="eyebrow">REVIEW</span>

          <h1>Check your answers.</h1>

          <p className="question-description">
            Make sure the information below is correct before we assess your tax
            position.
          </p>

          <div className="review-list">
            <ReviewSection
              title="How you earn"
              onEdit={() => onEdit("taxpayer")}
            >
              <ReviewRow
                label="Income type"
                value={formatEmploymentStatus(employmentStatus)}
              />
            </ReviewSection>

            <ReviewSection title="Income" onEdit={() => onEdit("income")}>
              {income.grossEmploymentIncome > 0 && (
                <ReviewRow
                  label="Gross employment income"
                  value={formatCurrency(income.grossEmploymentIncome)}
                />
              )}

              {income.selfEmploymentIncome > 0 && (
                <ReviewRow
                  label="Self-employment income"
                  value={formatCurrency(income.selfEmploymentIncome)}
                />
              )}
            </ReviewSection>

            <ReviewSection
              title="Deductions & reliefs"
              onEdit={() => onEdit("reliefs")}
            >
              <ReviewRow
                label="Annual rent paid"
                value={formatOptionalCurrency(reliefs.rentPaid)}
              />

              <ReviewRow
                label="Pension contribution"
                value={formatOptionalCurrency(reliefs.pensionContribution)}
              />

              <ReviewRow
                label="NHF contribution"
                value={formatOptionalCurrency(reliefs.nhfContribution)}
              />

              <ReviewRow
                label="NHIS contribution"
                value={formatOptionalCurrency(reliefs.nhisContribution)}
              />

              <ReviewRow
                label="Life insurance / annuity premium"
                value={formatOptionalCurrency(reliefs.lifeInsurancePremium)}
              />

              <ReviewRow
                label="Owner-occupied home loan interest"
                value={formatOptionalCurrency(
                  reliefs.ownerOccupiedHomeLoanInterest,
                )}
              />
            </ReviewSection>
          </div>

          <div className="review-note">
            <div className="review-note-icon">i</div>

            <div>
              <strong>What happens next?</strong>

              <p>
                Your answers will be assessed against the applicable tax rules.
                We'll show how the result was reached and which rules were used.
              </p>
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <button
            className="continue-button"
            disabled={calculating}
            onClick={onCalculate}
          >
            {calculating ? "Calculating..." : "Calculate my tax position"}

            {!calculating && <span>→</span>}
          </button>
        </section>
      </div>
    </main>
  );
}

interface ReviewSectionProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}

function ReviewSection({ title, onEdit, children }: ReviewSectionProps) {
  return (
    <div className="review-section">
      <div className="review-section-header">
        <h2>{title}</h2>

        <button className="edit-button" onClick={onEdit}>
          Edit
        </button>
      </div>

      <div className="review-section-content">{children}</div>
    </div>
  );
}

interface ReviewRowProps {
  label: string;
  value: string;
}

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className="review-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatEmploymentStatus(status: TaxpayerFacts["employmentStatus"]) {
  switch (status) {
    case "employed":
      return "Employed";

    case "self-employed":
      return "Self-employed";

    case "both":
      return "Employed and self-employed";
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatOptionalCurrency(value: number) {
  if (!value) {
    return "Not provided";
  }

  return formatCurrency(value);
}
