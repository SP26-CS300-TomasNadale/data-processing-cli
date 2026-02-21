import fs from "fs/promises";

export const saveToJSON = async (filename, data) => {
  try {
    await fs.writeFile(
      filename,
      JSON.stringify(data, null, 2)
    );
    console.log(`Data saved to ${filename}`);
  } catch (error) {
    throw new Error("Error saving file");
  }
};