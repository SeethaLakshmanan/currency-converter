import { Currency } from "./models/currency";

function getRequestOptions() {
  const headers = new Headers();
  headers.append("apikey", "");

  return {
    method: "GET",
    headers,
  };
}

// Fetch all the currencies
export async function getAllCurrencies(): Promise<Currency[]> {
  const requestOptions = getRequestOptions();
  let currencies: Currency[] = [{ key: "INR", value: "Indian Rupee" }]; // default value to return if api call fails

  try {
    const response = await fetch(
      "https://api.apilayer.com/currency_data/list",
      requestOptions
    );

    const responseJson: {
      success: boolean;
      currencies: Record<string, string>;
    } = await response.json();

    if (responseJson.success) {
      currencies = [];
      const responseCurrencies = responseJson.currencies;
      Object.entries(responseCurrencies).map(([key, value]) =>
        currencies.push({ key, value })
      );
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return currencies;
}

/**
 * Function to fetch the conversion from one currency to another.
 * @param amount - amount to be converted
 * @param from - currency from which to convert
 * @param to - currency to which to convert
 * @returns - converted amount
 */
export async function convert(
  amount: number,
  from: string,
  to: string
): Promise<number> {
  const requestOptions = getRequestOptions();
  let result = amount; // default to amount so that we return the same value if api calls fails

  try {
    const response = await fetch(
      `https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions
    );
    const responseJson: { success: boolean; result: number } =
      await response.json();
    if (responseJson.success) {
      result = responseJson.result;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  return result;
}
