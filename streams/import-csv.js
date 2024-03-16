import { parse } from "csv-parse";
import fs from "node:fs";

const csvPath = new URL("./tasks.csv", import.meta.url);

const csvStream = fs.createReadStream(csvPath);

const csvParser = parse({
  columns: true,
  delimeter: ",",
  skipEmptyLines: true,
});

async function postCsvTasks() {
  let csvParse = csvStream.pipe(csvParser);

  for await (const line of csvParse) {
    let { title, description } = line;

    try {
      await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          body: JSON.stringify({
            title,
            description
          })
        }
      })

      console.log('Postado com sucesso via CSV')
    } catch (e) {
      console.log(e)
    }
  }
}

postCsvTasks();
