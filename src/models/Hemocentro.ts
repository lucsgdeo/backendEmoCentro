import mongoose, { Schema, Document } from 'mongoose';

export interface IHemocentro extends Document {
  nome: string;
  endereco: string;
  telefone: string;
  lat: number;
  lng: number;
  createdAt: Date;
  updatedAt: Date;
}

const hemocentroSchema: Schema = new Schema({
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

export default mongoose.model<IHemocentro>('Hemocentro', hemocentroSchema);
