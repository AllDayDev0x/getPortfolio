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
  let tokenIndex = result.findIndex((val) => val.token.toLowerCase() == _token.toLowerCase());
  if (tokenIndex == -1) {
    tokenIndex = result.length;
    result.push({token: _token});
  }

  let _balance = result[tokenIndex].balance ? Number(result[tokenIndex].balance) : 0.0;
  if (_tx_type == 'DEPOSIT') {
    _balance += _amount;
  } else if (_tx_type == 'WITHDRAWAL') {
    _balance -= _amount;
  }

  result[tokenIndex].balance =  _balance;
};

export default processData;
