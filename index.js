import yargs from 'yargs';
import dotenv from 'dotenv'
import parseCSV from './libs/parseCSV.js';

let result = {
  balances: [],
  portfolio: [],
}

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
      console.log(row)
    },
    () => {
      console.log('finished')
    }
  )
};

main();

