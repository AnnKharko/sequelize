module.exports = {
    checkIsUserValid: (req, res, next) => {
        try {
            const { body } = req;
            if (body.name.length < 4) {
                throw new Error('NAME MUST BE NOT LESS THEN 4 ');
            }

            next();
        } catch (e) {
            next();
        }
    }
};
