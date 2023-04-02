const processData = (data, token, date, result) => {
  let _timestamp = Number(data[0]);
  let _tx_type = data[1];
  let _token = data[2];
  let _amount = Number(data[3]);

  if (token && String(token).toLowerCase() != _token.toLowerCase()) {
    return;
  }

  if (date && Number(date) < _timestamp) {
    return;
  }

  let _balance = result[_token]?.balance ? Number(result[_token].balance) : 0.0;
  if (_tx_type == 'DEPOSIT') {
    _balance += _amount;
  } else if (_tx_type == 'WITHDRAWAL') {
    _balance -= _amount;
  }

  result[_token] ={balance: _balance};
};

export default processData;
