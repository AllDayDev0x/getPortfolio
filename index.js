import yargs from 'yargs';
import dotenv from 'dotenv'
import parseCSV from './libs/parseCSV.js';
import processData from './libs/process_data.js';

let result =[];

dotenv.config();

const main = () => {
  const args = yargs(process.argv.slice(2)).argv;
  const token = args['token'];
  const date = args['date'];
  parseCSV('./storage/transactions.csv',
    (row) => {
      if (row === undefined || row.length < 4) {
        return;
      }
      processData(row, token, date, result)
    },
    () => {
      console.table(result)
      console.log('finished')
    }
  )
};

main();

