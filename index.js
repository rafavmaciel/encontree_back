const custonExpress = require('./config/custonExpress')
require('dotenv').config();
const port = process.env.PORT || 3003;

const app = custonExpress()

app.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})
 
