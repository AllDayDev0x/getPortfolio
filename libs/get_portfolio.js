import fetch from 'node-fetch';
const cc_api_endpoint_history = `https://min-api.cryptocompare.com/data/pricehistorical`;
const cc_api_endpoint_latest = `https://min-api.cryptocompare.com/data/price`;

const getExchangeRateFromCC = async (token, date) => {
  const cc_api_key = process.env.CRYPTOCOMPARE_APIKEY;
  let api_endpoint_params = `fsym=` + token + '&tsyms=USD';
  let api_endpoint_url = '';

  if (date) {
    api_endpoint_params += '&ts=' + String(date);
    api_endpoint_url = cc_api_endpoint_history + '?' + api_endpoint_params;
  } else {
    api_endpoint_url = cc_api_endpoint_latest + '?' + api_endpoint_params;
  }

  api_endpoint_url += '&api_key=' + cc_api_key;
  let resp = await fetch(api_endpoint_url);

  return new Promise((resolve) => {
    resolve(resp.json());
  });
};

export const getPortfolio = async (date, result) => {
  let _tokens = Object.keys(result);

  await Promise.all(_tokens.map((_token) => new Promise(async (resolve) => {
        let _rateObj = await getExchangeRateFromCC(_token, date);
    
        if (date) {
          _rateObj = _rateObj[_token];
        }
    
        const _rate = _rateObj['USD'];
    
        result[_token].portfolio = (_rate * result[_token].balance).toPrecision(15);
        resolve();
  })))
};
