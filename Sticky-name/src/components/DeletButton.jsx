import React from 'react'
import Trash from '../icons/Trash'
import { db } from '../appwrite/databases'
import { useContext } from 'react'
import { NoteContext } from '../context/NoteContext'

const DeletButton = ({ noteId}) => {
  const { setNotes } = useContext(NoteContext)

  const handelDelete = async () => {
    db.notes.delet(noteId)

    setNotes((prev) =>
      prev.filter((note) => note.$id !== noteId)
    )
  }

  return (
    <div onClick={handelDelete}>
      <Trash />
    </div>
  )
}

export default DeletButton