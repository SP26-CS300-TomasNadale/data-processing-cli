import { validateRepoInput } from "../src/services/validator.js";

describe("validateRepoInput", () => {

  test("should validate correct input", () => {
    const result = validateRepoInput({
      owner: "facebook",
      repo: "react"
    });

    expect(result.owner).toBe("facebook");
  });

  test("should throw error for missing owner", () => {
    expect(() =>
      validateRepoInput({ repo: "react" })
    ).toThrow("Validation Error");
  });

  test("should throw error for missing repo", () => {
    expect(() =>
      validateRepoInput({ owner: "facebook" })
    ).toThrow("Validation Error");
  });

});