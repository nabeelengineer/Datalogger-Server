const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/devices', deviceRoutes);

// Global Error Handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Sync DB
(async () => {
  await sequelize.sync();
  console.log("Database Synced");
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
