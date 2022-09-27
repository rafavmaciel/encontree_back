const custonExpress = require('./src/config/custonExpress')
const anuncio = require('./src/controllers/anuncio')
const imovel = require('./src/controllers/imovel')
const user = require('./src/controllers/user')
require('dotenv').config();
const port = process.env.PORT || 3003;

const app = custonExpress()

app.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})

app.get("/", (req, res) => {
    res.send("Home");
  });

//gambiarra para o consign com o vercel
app.use(anuncio);
app.use(imovel);
app.use(user);

 
