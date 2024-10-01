import DeletButton from "./DeletButton"
import { useRef, useEffect, useState } from "react"
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils"
import { db } from "../appwrite/databases"
import Spinner from "../icons/Spinner"
import { useContext } from "react"
import { NoteContext } from "../context/NoteContext"

const NoteCard = ({ note, setNotes }) => {

    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);

    const {setSelectedNote} = useContext(NoteContext)

    const body = bodyParser(note.body)
    const color_bg = JSON.parse(note.colors)
    const [position, setPosition] = useState(JSON.parse(note.position))

    let mouseStartPos = { x: 0, y: 0 }
    const cardRef = useRef(null)

    //using ref to refer the notes textarea height so that it could automatically take the heigt of the note in it hence we use use ref ans it dont change on component rerender like useState do 
    const textareaRef = useRef(null)

    //this function will take starting position of the cursor(card) and put it in the mouse starting 
    const mouseDown = (e) => {
        if (e.target.className === "card-header"){
            mouseStartPos.x = e.clientX
            mouseStartPos.y = e.clientY
    
            document.addEventListener("mousemove", mouseMove) //attaching a mouseMove fn to the DOM
            document.addEventListener("mouseup", mouseUp) //attaching a mouseMove fn to the DOM
    
            setZIndex(cardRef.current)
            setSelectedNote(note)
        }
    }

    //The mouse move event will capture EVERY movement of the users mouse, and will be responsible for updating our card position.
    const mouseMove = (e) => {
        //Calculate mouse movement 
        let mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY
        }

        //Updating the new mouse value 
        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir)

        //now seting the card position to the new position 
        // setPosition({
        //     x:cardRef.current.offsetLeft - mouseMoveDir.x,
        //     y:cardRef.current.offsetTop - mouseMoveDir.y,
        // })
        setPosition(newPosition)
    }

    //Calling the autogrow at starting of rendering 
    useEffect(() => {
        autoGrow(textareaRef)
        setZIndex(cardRef.current)
    }, [])

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPosition = setNewOffset(cardRef.current)
        saveData('position', newPosition)
        // db.notes.update(note.$id, { position: JSON.stringify(newPosition)})
    };

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) }

        try {
            await db.notes.update(note.$id, payload)
        } catch (error) {
            console.log("Error")
        }

        setSaving(false)
    }

    const handleKeyUp = () => {
        setSaving(true)

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current)
        }

        //3 - Set timer to trigger save in 2 seconds
        keyUpTimer.current = setTimeout(() => {
            saveData("body", textareaRef.current.value);
        }, 2000)
    }

    return (
        <div className="card"
            ref={cardRef}
            style={{
                backgroundColor: color_bg.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}>
            <div className="card-header"
                style={{ backgroundColor: color_bg.colorHeader }}
                onMouseDown={mouseDown}
            >
                <DeletButton noteId={note.$id}/>
                {
                    saving && (
                        <div className="card-saving">
                            <Spinner color={color_bg.colorText}/>
                            <span style={{ color: color_bg.colorText }}>Saving...</span>
                        </div>
                    )
                }
            </div>

            <div className="card-body">
                <textarea
                    onKeyUp={handleKeyUp}
                    ref={textareaRef}
                    defaultValue={body}
                    style={{ color: color_bg.colorText }}
                    onInput={() => {
                        autoGrow(textareaRef)
                    }}
                    onFocus={() => {
                        setZIndex(cardRef.current)
                        setSelectedNote(note);
                    }}
                ></textarea>
            </div>
        </div>
    )
}

export default NoteCard