import { createContext } from "react";
import { useState, useEffect } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";

export const NoteContext = createContext()

const NoteProvider = ({ Children }) => {
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        init();
    },[])

    const init = async () => {
        const response = await db.notes.list()

        // const response = await databases.listDocuments(
        //     import.meta.env.VITE_DATABASE_ID,
        //     import.meta.env.VITE_COLLECTION_NOTES_ID
        // )

        setNotes(response.documents)
        setLoading(false)
    }

    const contextData = { notes, setNotes, selectedNote, setSelectedNote }

    return (
        <NoteContext.Provider value={contextData}>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div> 
            ) : (
                Children
            )}
        </NoteContext.Provider>
    )
}

export default NoteProvider 