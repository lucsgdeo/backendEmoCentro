const mongoose = require('mongoose');

const hemocentroSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Hemocentro', hemocentroSchema);
