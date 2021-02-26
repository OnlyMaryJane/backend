const db = require('../database/connection');

module.exports = {
    findAllStrains,
    findStrainById,
    findFavoriteStrains,
    removeFavoriteStrain,
    addFavoriteStrain,
    // findStrainsBySymptoms
};

// retrieve all strains in db
function findAllStrains() {
    return db('strains')
};

// retrieve strain by its id
function findStrainById(id) {
    return db('strains')
    .where({ id })
    .first();
};

// retrieve user's favorite strains
function findFavoriteStrains(userId) {
    return db('favorite_strains')
    .where({ userId })
};

// remove strain from user's favorites
function removeFavoriteStrain(strainId, userId) {
    return db('favoite_strains')
    .where({ strainId, userId })
    .del()
};

// let's user add strain to favorites
function addFavoriteStrain(info) {
    return db('favorite_strains')
    .insert(info)
    .then(() => {
        return findFavoriteStrains(info.user_id)
    })
}
