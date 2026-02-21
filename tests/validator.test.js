import { validateRepoInput, validateCountryInput } from "../src/services/validator.js";

describe("validateRepoInput", () => {

  test("should validate correct repo input", () => {
    const input = { owner: "facebook", repo: "react" };
    const result = validateRepoInput(input);
    expect(result.owner).toBe("facebook");
    expect(result.repo).toBe("react");
  });

  test("should throw error for invalid repo input", () => {
    expect(() =>
      validateRepoInput({ owner: "", repo: "" })
    ).toThrow("Validation Error");
  });

});

describe("validateCountryInput", () => {

  test("should validate correct country input", () => {
    const input = { name: "Argentina" };
    const result = validateCountryInput(input);
    expect(result.name).toBe("Argentina");
  });

  test("should throw error for empty country name", () => {
    expect(() =>
      validateCountryInput({ name: "" })
    ).toThrow("Validation Error");
  });

  test("should throw error for missing country name", () => {
    expect(() =>
      validateCountryInput({})
    ).toThrow("Validation Error");
  });

});