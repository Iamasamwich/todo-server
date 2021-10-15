const sanitiseString = (input : string) : string => {

  const regex = new RegExp('[^a-zA-Z0-9 .,]', 'g');

  return input.replace(regex, '').trim();
};

export default sanitiseString;

