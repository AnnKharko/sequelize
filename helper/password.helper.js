const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: (password, hashPassword) => {
        const isPasswordEquals = bcrypt.compare(password, hashPassword);

        if (!isPasswordEquals) {
            throw new Error('WRONG EMAIL OR PASSWORD');
        }
    }
};
