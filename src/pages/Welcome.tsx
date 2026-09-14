interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <main className="welcome">
      <div className="welcome-content">
        <div className="brand">
          <span className="brand-mark">N</span>
          <span>TaxGuide</span>
        </div>

        <div className="welcome-copy">
          <span className="eyebrow">NIGERIAN TAX COMPLIANCE</span>

          <h1>
            Know what you owe.
            <br />
            Know what you need to file.
          </h1>

          <p>
            Answer a few questions about your income and circumstances. We'll
            help determine the tax obligations, reliefs, and filing requirements
            that may apply to you.
          </p>

          <button className="primary-button" onClick={onStart}>
            Start assessment
            <span>→</span>
          </button>

          <div className="assessment-info">
            <span>○</span>
            <span>Takes about 5 minutes</span>
          </div>
        </div>

        <div className="legal-note">
          Based on Nigeria's tax legislation in force from 1 January 2026.
        </div>
      </div>
    </main>
  );
}
