import { jest } from "@jest/globals";

jest.unstable_mockModule("axios", () => ({
  default: {
    get: jest.fn()
  }
}));

const axios = (await import("axios")).default;
const { getCountryData } = await import("../src/api/countryService.js");

describe("getCountryData", () => {

  test("should return formatted country data", async () => {

    axios.get.mockResolvedValue({
      data: [{
        name: { common: "Argentina" },
        capital: ["Buenos Aires"],
        region: "Americas",
        population: 10000000,
        area: 500000,
        currencies: {
          ARS: { name: "Argentine peso" }
        }
      }]
    });

    const result = await getCountryData("Argentina");

    expect(result).toEqual({
      name: "Argentina",
      capital: "Buenos Aires",
      region: "Americas",
      population: 10000000,
      area: 500000,
      currency: "Argentine peso"
    });

  });

  test("should handle API error", async () => {

    axios.get.mockRejectedValue({
      response: {
        status: 404,
        statusText: "Not Found"
      }
    });

    await expect(
      getCountryData("FakeCountry")
    ).rejects.toThrow("Country API Error: 404 - Not Found");

  });

  test("should handle missing capital and currency", async () => {

    axios.get.mockResolvedValue({
      data: [{
        name: { common: "Nowhere" },
        region: "Unknown",
        population: 5000,
        area: 100
      }]
    });

    const result = await getCountryData("Nowhere");

    expect(result.capital).toBe("N/A");
    expect(result.currency).toBe("N/A");

  });

  test("should throw network error", async () => {

  axios.get.mockRejectedValue({});

  await expect(
    getCountryData("Argentina")
  ).rejects.toThrow("Network error while fetching country data");

  });

});