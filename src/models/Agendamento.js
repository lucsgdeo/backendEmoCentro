const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  hemocentroId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hemocentro',
    required: true
  },
  data: {
    type: String,
    required: true
  },
  horario: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Agendamento', agendamentoSchema);
