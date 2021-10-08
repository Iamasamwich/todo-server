import bcrypt from 'bcrypt';

const getHash = async (term : string) : Promise<string> => {
  return await bcrypt.hash(term, 10);
};

export default getHash;