import fs from 'fs';
import path from 'path';

export function readJsonData(fileName: string, testName: string): any[] {
  const filePath = path.join(process.cwd(), 'test-data', fileName);

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(fileContent);

  const testData = jsonData[testName];

  if (!testData) {
    throw new Error(`No test data found for test name: ${testName} in file: ${fileName}`);
  }

  return testData;
}