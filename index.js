import yargs from 'yargs';
import dotenv from 'dotenv'
import parseCSV from './libs/parseCSV.js';
import processData from './libs/process_data.js';
import { getPortfolio } from './libs/get_portfolio.js';

let result =[];

dotenv.config();

const main = () => {
  const args = yargs(process.argv.slice(2)).argv;
  const token = args['token'];
  const date = args['date'];
  let timestamp;
  if (date) {
    const dateTime = new Date(date);
    timestamp = dateTime.getTime()/1000;
  }

  parseCSV('./storage/transactions.csv',
    (row) => {
      if (row === undefined || row.length < 4) {
        return;
      }
      processData(row, token, timestamp, result);
    },
    async () => {
      await getPortfolio(timestamp, result);
      console.table(result)
    }
  )
};

main();
