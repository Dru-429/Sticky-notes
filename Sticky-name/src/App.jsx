import NotesPage from "./pages/pages/NotesPage.jsx"
import "./index.css"
import NoteProvider from "./context/NoteContext.jsx"

function App() {

  return (
    <div id="app">
      <NoteProvider>
        <NotesPage />
      </NoteProvider>
    </div>
  )
}

export default App
