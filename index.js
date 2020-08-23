const express =  require('express');
const genres = require('./routers/genres');
const app = express();
app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`Listening on port ${port}`));
