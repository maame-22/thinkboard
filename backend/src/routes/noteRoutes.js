import express from 'express';
import { getAllNotes , createNote  , updateNote , deleteNote , getNoteById } from '../controllers/noteController.js';

const router = express.Router();

router.get("/" , getAllNotes )
router.get("/:id" , getNoteById )
router.post("/" ,createNote )
router.put("/:id" , updateNote)
router.delete("/:id" , deleteNote)

// pRThUki7XABPBBJj

export default router;
