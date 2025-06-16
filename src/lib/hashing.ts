
const bcrypt = require('bcrypt')

const saltRounds = 10;

const hash = async (plain: string): Promise<string> => {
    return await bcrypt.hash(plain, saltRounds);
};

const verify = async (plain: string, hashed: string): Promise<boolean> => {
    return await bcrypt.compare(plain, hashed);
};

export { hash, verify };