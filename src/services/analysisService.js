export const generateFullReport = (repoData, countryData) => {

  const starsPerMillion =
    repoData.stars / (countryData.population / 1_000_000);

  const forkRatio =
    repoData.forks / repoData.stars;

  const issuesPerThousandStars =
    (repoData.openIssues / repoData.stars) * 1000;

  const popularityScore =
    (repoData.stars * 2 + repoData.forks) / 1000;

  return {
    repository: repoData,
    country: countryData,
    analysis: {
      starsPerMillion: Number(starsPerMillion.toFixed(2)),
      forkRatio: Number(forkRatio.toFixed(4)),
      issuesPerThousandStars: Number(issuesPerThousandStars.toFixed(2)),
      popularityScore: Number(popularityScore.toFixed(2))
    }
  };
};