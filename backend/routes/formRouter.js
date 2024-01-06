import express from 'express';
import { getAllForms, createForm,editForm,viewForm,deleteForm} from '../controllers/formControllers.js'


const router = express.Router();

router.get("/", getAllForms);
router.post("/create", createForm);
router.put('/:id/edit', editForm);
router.get('/:id', viewForm);
router.delete('/:id',deleteForm)


export default router;
