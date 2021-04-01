const { Op } = require('sequelize');
const db = require('../dataBase').getInstance();
const { queryBuilder, normalizer } = require('../helper');

module.exports = {
    findAll: async (query = {}) => {
        const User = db.getModel('User');

        // ?&ageGte=18&ageLte=25&gender=female
        const {
            filters, keys, limit, page, skip
        } = queryBuilder(query);
        const filterObject = {};
        const age = [];

        keys.forEach((key) => {
            switch (key) {
                //   age: { [Op.between]: [18, 35]}
                case 'ageGte':
                    age.push(+filters.ageGte);
                    break;
                case 'ageLte':
                    age.push(+filters.ageLte);
                    filterObject.age = { ...filterObject.age, [Op.between]: age };

                    break;
                // case 'name':
                //     filterObject.name = { $regex: filters.name, $options: 'i' };   //  треба переробити
                //     break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const findUsers = await User.findAll({ where: filterObject }, { offset: skip, limit: +limit });
        const users = normalizer(findUsers);

        return {
            data: users,
            page,
            limit,
        };
    },
    findOne: (userId) => {
        const User = db.getModel('User');

        return User.findAll({ where: { id: userId } });
    },
    createOne: (userObject, transaction) => {
        const User = db.getModel('User');

        return User.create(userObject, { transaction });
    },
    deleteOne: (id) => {
        const User = db.getModel('User');

        return User.destroy({ where: { id } });
    }
};
