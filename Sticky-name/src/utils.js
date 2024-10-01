export const setNewOffset = (card,mouseMoveDir = { x:0, y:0}) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x
    const offsetTop = card.offsetTop - mouseMoveDir.y

    return{
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop
    }
}

export const autoGrow = (textareaRef) => {
    const {current} = textareaRef // as it save the dom element in it 

    current.style.height = "auto" // now reset the height to auto so in auto scrollbar dont show 
    current.style.height = current.scrollHeight + "px"  // now to saving the height for that dom element 
}

export const setZIndex = (currCard) => {
    currCard.style.zIndex = 999,
    
    Array.from(document.getElementsByClassName("card")).forEach((e) =>{
        if (e !== currCard) {
            e.style.zIndex = currCard.style.zIndex - 1;
        }
    })
}

export const bodyParser = (value) => {
    try {
       return JSON.parse(value)
    } catch (error) {
        return value
    }
}