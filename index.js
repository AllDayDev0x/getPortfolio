import yargs from 'yargs';
import dotenv from 'dotenv'

let result = {
  balances: [],
  portfolio: [],
}

dotenv.config();

const main = () => {
  const args = yargs(process.argv.slice(2)).argv;
  const token = args['token'];
  const date = args['date'];
  console.log(token, date)
};

main();

