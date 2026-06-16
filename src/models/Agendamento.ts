import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAgendamento extends Document {
  userEmail: string;
  hemocentroId?: Types.ObjectId;
  hemocentroNome: string;
  data: string;
  horario: string;
  createdAt: Date;
  updatedAt: Date;
}

const agendamentoSchema: Schema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  hemocentroId: {
    type: Schema.Types.ObjectId,
    ref: 'Hemocentro',
    required: false
  },
  hemocentroNome: {
    type: String,
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

export default mongoose.model<IAgendamento>('Agendamento', agendamentoSchema);
