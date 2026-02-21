import { Command } from "commander";
import { getRepoData } from "./api/githubService.js";
import { getCountryData } from "./api/countryService.js";
import { generateFullReport } from "./services/analysisService.js";
import { saveToJSON } from "./services/fileService.js";
import { validateRepoInput } from "./services/validator.js";
import { generateMarkdownReport } from "./services/markdownService.js";

const program = new Command();

program
  .name("data-cli")
  .description("CLI for GitHub and Country data analysis")
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
        console.log("File generated: repo-data.json");
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
      // Validate input
      const validated = validateCountryInput(options);

      const data = await getCountryData(validated.name);

      console.log("Country Data:");
      console.log(data);

      if (options.save) {
        await saveToJSON("country-data.json", data);
        console.log("File generated: country-data.json");
      }

    } catch (error) {
      console.error("[ERROR]", error.message);
    }
  });
/* ======================
   Full Report Command
====================== */

program
  .command("full-report")
  .description("Combine GitHub and Country data with statistical analysis")
  .requiredOption("--owner <owner>", "Repository owner")
  .requiredOption("--repo <repo>", "Repository name")
  .requiredOption("--country <country>", "Country name")
  .option("--save", "Save report to JSON and Markdown file")
  .action(async (options) => {
    try {
      const repoData = await getRepoData(options.owner, options.repo);
      const countryData = await getCountryData(options.country);

      const report = generateFullReport(repoData, countryData);

      console.log("Full Report:");
      console.log(report);

      if (options.save) {
        await saveToJSON("full-report.json", report);
        await generateMarkdownReport("report.md", report);

        console.log("Files generated:");
        console.log("- full-report.json");
        console.log("- report.md");
      }

    } catch (error) {
      console.error("Error:", error.message);
    }
  });

program.parse(process.argv);