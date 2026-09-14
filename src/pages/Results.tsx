import type { TaxCalculationResponse } from "../types/api";

interface ResultsProps {
  result: TaxCalculationResponse;
  onStartOver: () => void;
}

export default function Results({ result, onStartOver }: ResultsProps) {
  return (
    <main className="results-page">
      <div className="results-container">
        <header className="results-header">
          <div>
            <span className="eyebrow">TAX ASSESSMENT</span>

            <h1>Your tax position</h1>

            <p>
              Here's the result of applying the applicable tax rules to the
              information you provided.
            </p>
          </div>

          <div className="status-badge">
            {result.is_exempt ? "Exempt" : "Assessment complete"}
          </div>
        </header>

        {/* Main result */}
        <section className="tax-result-card">
          <div>
            <span className="result-label">ANNUAL TAX PAYABLE</span>

            <div className="tax-amount">
              {formatCurrency(result.annual_tax_payable)}
            </div>

            {!result.is_exempt && (
              <p className="tax-monthly">
                Approximately{" "}
                <strong>{formatCurrency(result.monthly_tax)}</strong> per month
              </p>
            )}
          </div>

          <div className="result-icon">₦</div>
        </section>

        {result.is_exempt ? (
          <ExemptNotice />
        ) : (
          <>
            <CalculationSummary result={result} />

            <TaxBands bands={result.band_breakdown} />
          </>
        )}

        {result.severance_wht !== null && (
          <SeveranceWHT amount={result.severance_wht} />
        )}

        <Explanation
          explanation={result.explanation}
          rules={result.rules_fired}
        />

        <div className="results-footer">
          <button className="secondary-button" onClick={onStartOver}>
            Start a new assessment
          </button>
        </div>
      </div>
    </main>
  );
}

interface CalculationSummaryProps {
  result: TaxCalculationResponse;
}

function CalculationSummary({ result }: CalculationSummaryProps) {
  return (
    <section className="results-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CALCULATION</span>

          <h2>How your tax was calculated</h2>
        </div>
      </div>

      <div className="calculation-card">
        <CalculationRow
          label="Eligible deductions"
          value={formatCurrency(result.eligible_deductions)}
        />

        <CalculationRow
          label="Rent relief"
          value={formatCurrency(result.rent_relief)}
        />

        <CalculationRow
          label="Chargeable income"
          value={formatCurrency(result.chargeable_income)}
          emphasized
        />

        <div className="calculation-divider" />

        <CalculationRow
          label="Annual tax payable"
          value={formatCurrency(result.annual_tax_payable)}
          emphasized
        />
      </div>
    </section>
  );
}

interface CalculationRowProps {
  label: string;
  value: string;
  emphasized?: boolean;
}

function CalculationRow({
  label,
  value,
  emphasized = false,
}: CalculationRowProps) {
  return (
    <div
      className={`calculation-row ${
        emphasized ? "calculation-row-emphasized" : ""
      }`}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

// TAX BAND BREAKDOWN
interface TaxBandsProps {
  bands: TaxCalculationResponse["band_breakdown"];
}

function TaxBands({ bands }: TaxBandsProps) {
  if (!bands || bands.length === 0) {
    return null;
  }

  return (
    <section className="results-section">
      <div className="section-heading">
        <span className="eyebrow">TAX BANDS</span>

        <h2>How the tax was applied</h2>

        <p>
          Your chargeable income was assessed across the applicable graduated
          tax bands.
        </p>
      </div>

      <div className="tax-band-list">
        {bands.map((band, index) => (
          <div className="tax-band" key={`${band.band}-${index}`}>
            <div className="tax-band-main">
              <strong>{band.band}</strong>

              <span className="tax-rate">{band.rate}</span>
            </div>

            <strong className="tax-band-value">
              {formatCurrency(band.tax)}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}

// EXPLANATION SECTION
interface ExplanationProps {
  explanation: string[];
  rules: string[];
}

function Explanation({ explanation, rules }: ExplanationProps) {
  return (
    <section className="explanation-card">
      <details>
        <summary>
          <div className="explanation-summary">
            <div className="explanation-icon">↳</div>

            <div>
              <strong>How did we arrive at this result?</strong>

              <span>View the expert system's reasoning trace</span>
            </div>
          </div>

          <span className="details-arrow">↓</span>
        </summary>

        <div className="explanation-content">
          <div className="trace-intro">
            <span className="trace-dot" />

            <p>
              The following rules were triggered while evaluating your
              assessment.
            </p>
          </div>

          <div className="reasoning-trace">
            {explanation.map((step, index) => (
              <div className="reasoning-step" key={`${step}-${index}`}>
                <div className="step-number">{index + 1}</div>

                <p>{formatExplanation(step)}</p>
              </div>
            ))}
          </div>

          {rules.length > 0 && (
            <div className="rules-fired">
              <span className="rules-label">RULES FIRED</span>

              <div className="rule-tags">
                {rules.map((rule) => (
                  <span className="rule-tag" key={rule}>
                    {rule}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </details>
    </section>
  );
}

// EXEMPT RESULT
function ExemptNotice() {
  return (
    <section className="exempt-card">
      <div className="exempt-icon">✓</div>

      <div>
        <span className="eyebrow">TAX STATUS</span>

        <h2>No annual tax payable</h2>

        <p>
          The assessment determined that you are exempt based on the information
          provided.
        </p>
      </div>
    </section>
  );
}

// SEVERANCE WHT
interface SeveranceWHTProps {
  amount: number;
}

function SeveranceWHT({ amount }: SeveranceWHTProps) {
  return (
    <section className="severance-card">
      <div>
        <span className="eyebrow">SEVERANCE WHT</span>

        <h2>Severance withholding tax</h2>

        <p>
          A separate withholding tax amount was calculated for the severance
          payment provided.
        </p>
      </div>

      <strong>{formatCurrency(amount)}</strong>
    </section>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatExplanation(text: string) {
  return text.replace(/^(\s*)/, "");
}
