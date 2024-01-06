import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  title: String,
  inputs: [{
    title: String,
    type: { type: String, enum: ['Email', 'Text', 'Password', 'Number', 'Date'] },
    placeholder: String,
  }],
});

const FormModel = mongoose.model('Form', formSchema);

export default FormModel;
