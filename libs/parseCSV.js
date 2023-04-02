import fs from 'fs';
import { parse } from 'csv-parse';

const parseCSV = (filepath, onData, onEnd) => {
  fs.createReadStream(filepath)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', onData)
    .on('end', onEnd)
    .on('error', (err) => {
      console.error(err.message);
    });
};

export default parseCSV;