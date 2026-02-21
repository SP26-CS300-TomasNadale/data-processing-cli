import { generateFullReport } from "../src/services/analysisService.js";

describe("generateFullReport", () => {

  const mockRepo = {
    name: "react",
    stars: 100000,
    forks: 20000,
    openIssues: 500,
    watchers: 100000
  };

  const mockCountry = {
    name: "Testland",
    capital: "Test City",
    region: "Test Region",
    population: 10000000,
    area: 500000,
    currency: "Test Dollar"
  };

  test("should calculate stars per million correctly", () => {
    const report = generateFullReport(mockRepo, mockCountry);
    expect(report.analysis.starsPerMillion).toBe(10000);
  });

  test("should calculate fork ratio correctly", () => {
    const report = generateFullReport(mockRepo, mockCountry);
    expect(report.analysis.forkRatio).toBe(0.2);
  });

  test("should calculate issues per thousand stars correctly", () => {
    const report = generateFullReport(mockRepo, mockCountry);
    expect(report.analysis.issuesPerThousandStars).toBe(5);
  });

  test("should include repository data", () => {
    const report = generateFullReport(mockRepo, mockCountry);
    expect(report.repository.name).toBe("react");
  });

  test("should include country data", () => {
    const report = generateFullReport(mockRepo, mockCountry);
    expect(report.country.name).toBe("Testland");
  });

});