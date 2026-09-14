import type {
  TaxCalculationRequest,
  TaxCalculationResponse,
} from "../types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function calculateTax(
  payload: TaxCalculationRequest,
): Promise<TaxCalculationResponse> {
  const response = await fetch(`${API_BASE_URL}/calculate`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Tax calculation failed: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
}
