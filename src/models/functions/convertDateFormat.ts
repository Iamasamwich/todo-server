const convertDateFormat = (date : string) : string => {
  const splitDate = date.split('-');

  const twoDigits = (str : string) : string => {
    const num = Number(str);
    return num < 10 ? '0' + num : num.toString();
  };

  return [splitDate[0], twoDigits(splitDate[1]), twoDigits(splitDate[2])].join('-');
};

export default convertDateFormat;
