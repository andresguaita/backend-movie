const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { setCategories } = require("./src/helpers/categories.js");


// Se sincronizan los modelos una sola vez
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT || 3001, async () => {
    
    await setCategories()
    console.log(`Listen in ${process.env.PORT || 3001}`); // eslint-disable-line no-console
  });
});
