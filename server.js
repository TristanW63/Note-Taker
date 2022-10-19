const express = require('express');
// const htmlRoute = require('./routes/htmlRoute');
// const apiRoute = require('./routes/apiRoutes');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
// app.use('/api', apiRoute);
// create route for html route
// app.use('/', htmlRoute);

app.use(require('./routes/apiRoutes'));

   
app.listen(PORT, () =>
console.log(`App listening at  http://localhost:${PORT} 🚀`)
);