import { generateFullReport } from "./services/analysisService.js";
import { Command } from "commander";
import { getRepoData } from "./api/githubService.js";
import { getCountryData } from "./api/countryService.js";
import { validateRepoInput } from "./services/validator.js";
import { saveToJSON } from "./services/fileService.js";

const program = new Command();

program
  .name("data-cli")
  .description("CLI for GitHub and Country analysis")
  .version("1.0.0");

/* ======================
   GitHub Repo Command
====================== */

program
  .command("repo")
  .description("Fetch GitHub repository data")
  .requiredOption("--owner <owner>", "Repository owner")
  .requiredOption("--repo <repo>", "Repository name")
  .option("--save", "Save output to JSON file")
  .action(async (options) => {
    try {
      const validated = validateRepoInput(options);
      const data = await getRepoData(validated.owner, validated.repo);

      console.log("Repository Data:");
      console.log(data);

      if (options.save) {
        await saveToJSON("repo-data.json", data);
      }

    } catch (error) {
      console.error("Error:", error.message);
    }
  });

/* ======================
   Country Command
====================== */

program
  .command("country")
  .description("Fetch country information")
  .requiredOption("--name <name>", "Country name")
  .option("--save", "Save output to JSON file")
  .action(async (options) => {
    try {
      const data = await getCountryData(options.name);

      console.log("Country Data:");
      console.log(data);

      if (options.save) {
        await saveToJSON("country-data.json", data);
      }

    } catch (error) {
      console.error("Error:", error.message);
    }
  });
program
  .command("full-report")
  .description("Combine GitHub and Country data with analysis")
  .requiredOption("--owner <owner>", "Repository owner")
  .requiredOption("--repo <repo>", "Repository name")
  .requiredOption("--country <country>", "Country name")
  .option("--save", "Save report to JSON file")
  .action(async (options) => {
    try {
      const repoData = await getRepoData(options.owner, options.repo);
      const countryData = await getCountryData(options.country);

      const report = generateFullReport(repoData, countryData);

      console.log("Full Report:");
      console.log(report);

      if (options.save) {
        await saveToJSON("full-report.json", report);
      }

    } catch (error) {
      console.error("Error:", error.message);
    }
  });
program.parse(process.argv);