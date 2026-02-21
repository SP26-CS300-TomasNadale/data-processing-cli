import axios from "axios";

export const getRepoData = async (owner, repo) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );

    return {
      name: response.data.name,
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
      openIssues: response.data.open_issues_count,
      watchers: response.data.watchers_count,
    };

  } catch (error) {
    if (error.response) {
      throw new Error(
        `GitHub API Error: ${error.response.status} - ${error.response.statusText}`
      );
    }

    throw new Error("Network error while fetching GitHub data");
  }
};