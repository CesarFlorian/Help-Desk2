const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/HelpDesk', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB local'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));