import { jest } from "@jest/globals";


jest.unstable_mockModule("axios", () => ({
  default: {
    get: jest.fn()
  }
}));

const axios = (await import("axios")).default;
const { getRepoData } = await import("../src/api/githubService.js");

describe("getRepoData", () => {

  test("should return formatted repository data", async () => {

    axios.get.mockResolvedValue({
      data: {
        name: "react",
        stargazers_count: 1000,
        forks_count: 200,
        open_issues_count: 50,
        watchers_count: 1000
      }
    });

    const result = await getRepoData("facebook", "react");

    expect(result).toEqual({
      name: "react",
      stars: 1000,
      forks: 200,
      openIssues: 50,
      watchers: 1000
    });

  });

  test("should throw error on API failure", async () => {

    axios.get.mockRejectedValue({
      response: {
        status: 404,
        statusText: "Not Found"
      }
    });

    await expect(
      getRepoData("fake", "repo")
    ).rejects.toThrow("GitHub API Error: 404 - Not Found");

  });

  test("should throw network error", async () => {

  axios.get.mockRejectedValue({});

  await expect(
    getRepoData("facebook", "react")
  ).rejects.toThrow("Network error while fetching GitHub data");

  });

});