import type { EmploymentStatus } from "../types/tax";

interface TaxpayerProps {
  onNext: (status: EmploymentStatus) => void;
  onBack: () => void;
}

export default function Taxpayer({ onNext, onBack }: TaxpayerProps) {
  const options: {
    value: EmploymentStatus;
    title: string;
    description: string;
  }[] = [
    {
      value: "employed",
      title: "I'm employed",
      description: "I earn income from an employer.",
    },
    {
      value: "self-employed",
      title: "I'm self-employed",
      description: "I earn income from my own business or independent work.",
    },
    {
      value: "both",
      title: "I'm employed and self-employed",
      description:
        "I have employment income as well as business or independent income.",
    },
  ];

  return (
    <main className="assessment">
      <div className="assessment-container">
        <header className="assessment-header">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>

          <div className="step-count">1 of 4</div>
        </header>

        <div className="progress">
          <div className="progress-bar" style={{ width: "25%" }} />
        </div>

        <section className="question-section">
          <span className="eyebrow">ABOUT YOU</span>

          <h1>How do you earn your income?</h1>

          <p className="question-description">
            This helps us ask only the questions that are relevant to your
            situation.
          </p>

          <div className="option-list">
            {options.map((option) => (
              <button
                key={option.value}
                className="option"
                onClick={() => onNext(option.value)}
              >
                <div>
                  <strong>{option.title}</strong>
                  <span>{option.description}</span>
                </div>

                <span className="option-arrow">→</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
