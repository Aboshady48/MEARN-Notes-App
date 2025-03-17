import express from 'express';
import Note from '../Model/NoteScheme.js'

export const getAllNotes = async (req, res) =>{
    try {
        const notes = await Note.find();
        res.status(200).json({
            success: true,
            data: notes
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Error At retriving the notes"
        })
    }

}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({success: false, message: "Note not found"});
        res.status(200).json({
            success: true,
            data: note
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Error At retrieving the note"
        })
        
    }

}

export const addNote = async (req, res) => {
    try {
        const note = new Note(req.body);
        await note.save();
        res.status(201).json({
            success: true,
            data: note
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Error At creating the note"
        })
        
    }

}

export const updateNote =  async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!note) return res.status(404).json({success: false, message: "Note not found"});
        res.status(200).json({
            success: true,
            data: note
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Error At updating the note"
        })
        
    }
}

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if(!note) return res.status(404).json({success: false, message: "Note not found"});
        res.status(200).json({
            success: true,
            data: note
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Error At deleting the note"
        })
        
    }
}
