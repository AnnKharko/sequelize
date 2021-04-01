module.exports = (object) => {
    const hiddenFields = [
        'password',
        'access_token',
        'refresh_token'
    ];

    hiddenFields.forEach((field) => {
        for (let i = 0; i < object.length; i++) {
            delete object[i].dataValues[field];
        }
    });
    return object;
};
