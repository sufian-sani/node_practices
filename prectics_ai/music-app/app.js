// app.js

const express = require('express');
const bodyParser = require('body-parser');
const musicianRoutes = require('./routes/musician');
const albumRoutes = require('./routes/album');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use musician and album routes
app.use('/api/musicians', musicianRoutes);
app.use('/api/albums', albumRoutes);

// Sync Sequelize models with the database
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
