import "./App.css";
import NotesApp from "features/Notes/NotesApp";
import Modal from "react-modal";
Modal.setAppElement("#root");

function App() {
  return <NotesApp></NotesApp>;
}

export default App;
