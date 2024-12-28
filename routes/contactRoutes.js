import express from 'express';
import {getContacts,createContact,getContact,UpdateContact,PatchContact,deleteContact} from '../controllers/contactController.js'
import validateToken from '../middleware/validateTokenHandler.js';
const router = express.Router();

//validate token for all routes
router.use(validateToken)

router.route('/').get(getContacts).post(createContact)
router.route('/:id').get(getContact).put(UpdateContact).patch(PatchContact).delete(deleteContact)

export default router;
