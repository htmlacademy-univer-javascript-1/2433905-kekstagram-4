const compareString = (str, maxLength) => str.length <= maxLength;
compareString('строка для проверки', 20);

const isPolindrom = (string) => {
  string = string.replaceAll(' ', '').toUpperCase();
  let reversedString = '';
  for(let i = (string.length - 1); i >= 0; i--){
    reversedString += string[i];
  }
  return reversedString === string;
};
isPolindrom('топот');


const getNumber = (line) => {
  line = line.toString();
  let result = '';
  for(let i = 0; i < line.length; i++){
    const symb = parseInt(line[i], 10);
    if(!isNaN(symb)){
      result += symb;
    }
  }
  return parseInt(result, 10);
};
getNumber('2023 год');
