import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stateDir = path.join(__dirname, "../../state");

const writeToFile = (file: string, data: string) => {
  try {
    writeFileSync(`${stateDir}/${file}`, data);
  } catch (error) {
    console.error(error);
  }
};

const readFromFile = (file: string) => {
  try {
    return readFileSync(`${stateDir}/${file}`, "utf8");
  } catch (error) {
    console.error(error);
  }
};

export const saveLastSync = () => {
  writeToFile("lastSync.txt", Date.now().toString());
};

export const getLastSync = () => {
  const lastSync = readFromFile("lastSync.txt");
  if (lastSync) {
    return new Date(Number(lastSync));
  }
  return null;
};
