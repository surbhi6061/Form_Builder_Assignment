import FormModel from '../models/formModels.js';

export const getAllForms = async (req, res) => {
  try {
    const data = await FormModel.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ success: false, message: "Error fetching forms" });
  }
};

export const createForm = async (req, res) => {
  try {
    const formData = req.body;
    const data = new FormModel(formData);
    await data.save();
    res.json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    console.error("Error creating form:", error);
    res.status(500).json({ success: false, message: "Error creating form" });
  }
};


export const editForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;
    const updatedForm = await FormModel.findOneAndUpdate(
      req.params.id,
      { title, inputs },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    res.json({ success: true, message: 'Form updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating form' });
  }
};


export const viewForm = async (req, res) => {
  try {
    const form = await FormModel.findById(req.params.id);
    
    res.json({
      title: form.title,
      inputs: form.inputs,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching form' });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const deletedForm = await FormModel.deleteOne({_id:req.params.id});
    console.log('Form deleted successfully:', deletedForm);
    res.json({ success: true, message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ error: 'Error deleting form' });
  }
};

