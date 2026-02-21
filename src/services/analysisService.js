/**
 * Generates a combined analytical report from repository and country data.
 *
 * @param {Object} repoData - GitHub repository data
 * @param {number} repoData.stars - Number of stars
 * @param {number} repoData.forks - Number of forks
 * @param {number} repoData.openIssues - Number of open issues
 *
 * @param {Object} countryData - Country information
 * @param {number} countryData.population - Country population
 *
 * @returns {Object} Combined report with calculated metrics
 */
export const generateFullReport = (repoData, countryData) => {

  const starsPerMillion =
    repoData.stars / (countryData.population / 1_000_000);

  const forkRatio =
    repoData.forks / repoData.stars;

  const issuesPerThousandStars =
    (repoData.openIssues / repoData.stars) * 1000;

  const popularityScore =
    (repoData.stars * 2 + repoData.forks) / 1000;

  const activityScore =
    (repoData.openIssues / repoData.stars) * 100;

  return {
    repository: repoData,
    country: countryData,
    analysis: {
      starsPerMillion: Number(starsPerMillion.toFixed(2)),
      forkRatio: Number(forkRatio.toFixed(4)),
      issuesPerThousandStars: Number(issuesPerThousandStars.toFixed(2)),
      popularityScore: Number(popularityScore.toFixed(2)),
      activityScore: Number(activityScore.toFixed(2))
    }
  };
};