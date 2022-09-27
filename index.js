const custonExpress = require('./src/config/custonExpress')
const anuncio = require('./src/controllers/anuncio')
require('dotenv').config();
const port = process.env.PORT || 3003;

const app = custonExpress()

app.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})

app.get("/", (req, res) => {
    res.send("Home");
  });
app.use(anuncio);

 
