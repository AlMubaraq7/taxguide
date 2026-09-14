import { useState } from "react";
import Welcome from "./pages/Welcome";
import Taxpayer from "./pages/TaxPayer";
import Income from "./pages/Income";
import Deductions from "./pages/Deductions";
import Review from "./pages/Review";
import Results from "./pages/Results";
import type { TaxCalculationResponse } from "./types/api";
import { calculateTax } from "./services/taxApi";
import { createTaxPayload } from "./services/taxPayload";

import type { EmploymentStatus, TaxpayerFacts } from "./types/tax";

type Screen =
  | "welcome"
  | "taxpayer"
  | "income"
  | "deductions"
  | "review"
  | "results";

function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [facts, setFacts] = useState<Partial<TaxpayerFacts>>({});
  const [result, setResult] = useState<TaxCalculationResponse | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmploymentStatus = (status: EmploymentStatus) => {
    setFacts((current) => ({
      ...current,
      employmentStatus: status,
    }));

    setScreen("income");
  };

  const handleIncome = (income: TaxpayerFacts["income"]) => {
    setFacts((current) => ({
      ...current,
      income,
    }));

    setScreen("deductions");
  };

  const handleReliefs = (reliefs: TaxpayerFacts["reliefs"]) => {
    setFacts((current) => ({
      ...current,
      reliefs,
    }));

    setScreen("review");
  };
  const handleCalculate = async () => {
    if (!completeFacts) {
      return;
    }

    setCalculating(true);
    setError(null);

    try {
      const payload = createTaxPayload(completeFacts);

      const response = await calculateTax(payload);

      setResult(response);
      setScreen("results");
    } catch (error) {
      console.error(error);

      setError("We couldn't calculate your tax position. Please try again.");
    } finally {
      setCalculating(false);
    }
  };

  const getCompleteFacts = (): TaxpayerFacts | null => {
    if (!facts.employmentStatus || !facts.income || !facts.reliefs) {
      return null;
    }

    return {
      employmentStatus: facts.employmentStatus,
      income: facts.income,
      reliefs: facts.reliefs,
    };
  };

  const completeFacts = getCompleteFacts();
  if (screen === "results" && result) {
    return (
      <Results
        result={result}
        onStartOver={() => {
          setResult(null);
          setFacts({});
          setError(null);
          setScreen("welcome");
        }}
      />
    );
  }

  if (screen === "review" && completeFacts) {
    return (
      <Review
        facts={completeFacts}
        onBack={() => setScreen("deductions")}
        onEdit={(section) => {
          if (section === "taxpayer") {
            setScreen("taxpayer");
          }

          if (section === "income") {
            setScreen("income");
          }

          if (section === "reliefs") {
            setScreen("deductions");
          }
        }}
        onCalculate={handleCalculate}
        calculating={calculating}
        error={error}
      />
    );
  }

  if (screen === "deductions") {
    return (
      <Deductions onBack={() => setScreen("income")} onNext={handleReliefs} />
    );
  }

  if (screen === "income") {
    return (
      <Income
        employmentStatus={facts.employmentStatus ?? "employed"}
        onBack={() => setScreen("taxpayer")}
        onNext={handleIncome}
      />
    );
  }

  if (screen === "taxpayer") {
    return (
      <Taxpayer
        onBack={() => setScreen("welcome")}
        onNext={handleEmploymentStatus}
      />
    );
  }

  return <Welcome onStart={() => setScreen("taxpayer")} />;
}

export default App;
