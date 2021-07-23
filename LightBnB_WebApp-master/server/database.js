const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
})

pool.connect().then(() => {
  console.log('connected');
})
.catch(err => {
  console.log(err)
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1;
  `;
  return pool.query(queryString, [email])
  .then((result) => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('error:',err.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1;
  `;
  return pool.query(queryString, [id])
  .then((result) => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('error:',err.message);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `
  const { name, email, password } = user;
  const values = [name, email, password];
  pool.query(queryString, values)
  .then((result) => {
    return result.rows;
  })
  .catch(err => {
    console.log(err.message);
  })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT properties.*, guest_id, start_date, end_date
  FROM properties
  JOIN reservations ON reservations.property_id = properties.id
  JOIN users ON users.id = guest_id
  WHERE guest_id = $1
  LIMIT $2;
  `;
  const values = [guest_id, limit];

  return pool.query(queryString, values)
  .then((result) => {
    console.log('res rows:', result.rows);
    return result.rows
  })
  .catch((err) => {
    console.log('err:', err.message);
  })
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const values = [];

  let queryString = `
  SELECT properties.*, AVG(rating) AS average_rating
  FROM properties
  JOIN property_reviews ON property_id = properties.id
  `;
  if (options.city) {
    values.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${values.length}`;
  }

  if (options.owner_id) {
    values.push(`%${options.owner_id}%`);
    queryString += ` AND owner_id = $${values.length}`;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    values.push(`${options.minimum_price_per_night * 100}`);
    values.push(`${options.maximum_price_per_night * 100}`);
    queryString += ` AND cost_per_night >= $${(values.length - 1)} AND cost_per_night <= $${values.length}`;
    console.log('money', options.minimum_price_per_night)
  }
  
  if (options.minimum_rating) {
    values.push(`${parseInt(options.minimum_rating)}`);
    queryString += ` GROUP BY properties.id HAVING AVG(rating) >= $${values.length}`;
    
    values.push(limit);
    queryString += `
    ORDER BY cost_per_night
    LIMIT $${values.length};
    `;
  } else {
    values.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${values.length};
    `;
  }


  console.log('queryString', queryString, 'values', values);

  return pool.query(queryString, values).then((results) => results.rows)
  .catch(err => console.log(err.message));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
