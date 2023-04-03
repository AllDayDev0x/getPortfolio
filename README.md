# GetPortfolio
This is a test project from Propine.
## Installation

  npm install

## Run

Copy .env.example file and paste as .env file, and then input [cryptocompare](https://min-api.cryptocompare.com/) api key in .env file.
After that, run the app with below command
  
  ```sh
  node index.js --token eth --date 2023-03-31
  ```

## Project Structure

This project is developed in node js and start from index.js file in the root directory.

The general structure looks like this:

```
.
├── storage
│   └── transactions.csv
├── libs
│   ├── getPortfolio.js
│   ├── parseCSV.js
│   └── processData.js
├── package.json
├── README.md
└── index.js

2 directories, 7 files
```

## Various designs and some upgradeable points

### Index.js

This project consists 1 main js file and 3 additional js files. Starts from index.js file.

Parse the parameter which is entered by CLI, and control the main workflow of this project.

### Parse CSV

Parsed the csv file by using `csv-parser` node module.

Used stream for reading csv file so there's no issue for memory fault.

> Upgradeable point: can use worker for multi-threaded workflow. I think csv file is not suit for maintainable app, maybe establishing DB would be better than csv file.
> The schema of this data is constant, so we can use relational SQL instead of noSQL.

And passed 2 callback functions(`processData` and `getPortfolio`) during the csv file has being read.

`processData` function will be called when one line is read from csv file.

`getPortfolio` functio will be called when entire csv file is read.

### Process Data

Handled the processing data.

There is one export function called `processData` in `processData.js` file.

This function is used as callback function in `parseCSV` function, will be called every lines of csv file is read.

Once the one line is read from csv file, parse the data with given token and date parameter, add or subtract to calculate the total balance and portfolio of token.

### Get Portfolio

Get the exchange rate of given token and date from [cryptocompare](https://min-api.cryptocompare.com/), used `fetch` module for HTTP Get Request to [cryptocompare](https://min-api.cryptocompare.com/)

After getting the exchange rate, get the portfolio of token with total balance of token which is calculated by `processData` function.
