import bcrypt from 'bcrypt';

const makeHash = async (term : string) : Promise<string> => {
  return await bcrypt.hash(term, 10);
};

export default makeHash;