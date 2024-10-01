import NoteCard from "../../components/NoteCard";
import Controls from "../../components/Controls";
import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";

const NotesPage = () => {
    const {notes} = useContext(NoteContext)
    return (
        <div>
            {notes.map((e) => (
                <NoteCard note={e} key={e.$id} />
            ))}
            <Controls />
        </div>
    )
}

export default NotesPage 