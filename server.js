const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const codegenRoutes = require('./routes/codegen');
app.use('/api/code', codegenRoutes);

app.get('/', (req, res) => {
  res.send('AutoWeb AI Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
