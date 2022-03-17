require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DATABASE_URL, NODE_ENV } =
  process.env;

let sequelize;
if (NODE_ENV === "local") {
  sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    {
      logging: false, 
      native: false, 
    }
  );
} else {
  sequelize = new Sequelize(`${DATABASE_URL}`, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false, 
    native: false, 
  });
}

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos 
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Category,Movie } = sequelize.models;

// Aca van las relaciones

Movie.belongsToMany(Category, { through: 'movie_category' });
Category.belongsToMany(Movie, { through: 'movie_category' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Category, Movie } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
