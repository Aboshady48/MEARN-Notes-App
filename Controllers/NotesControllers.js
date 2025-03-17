import express from 'express';

export const getAllNotes = (req, res) =>{
    res.json({
        message: "Get all notes"
    })

}

export const getNoteById = (req, res) => {
    res.json({
        message: `Get note by id ${req.params.id}`
    })

}

export const addNote = (req, res) => {
    res.json({
        message: "Add new note"
    })

}

export const updateNote = (req, res) => {
    res.json({
        message: `Update note by id ${req.params.id}`
    })

}

export const deleteNote = (req, res) => {
    res.json({
        message: `Delete note by id ${req.params.id}`
    })

}
