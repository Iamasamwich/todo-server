import bcrypt from 'bcrypt';

const compareHash = async (hash : string, query : string) => {
  return await bcrypt.compare(query, hash);
};


export default compareHash;