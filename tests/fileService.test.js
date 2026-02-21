import fs from "fs/promises";
import { saveToJSON } from "../src/services/fileService.js";
import { jest } from "@jest/globals";

jest.unstable_mockModule("fs/promises", () => ({
  default: {
    writeFile: jest.fn()
  }
}));

describe("saveToJSON", () => {

  test("should call writeFile", async () => {

    fs.writeFile = jest.fn().mockResolvedValue();

    await saveToJSON("test.json", { test: true });

    expect(fs.writeFile).toHaveBeenCalled();

  });

  test("should throw error when write fails", async () => {

  fs.writeFile = jest.fn().mockRejectedValue(new Error("fail"));

  await expect(
    saveToJSON("fail.json", {})
  ).rejects.toThrow("Error saving file");

  });

});