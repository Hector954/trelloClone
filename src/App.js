import Appbar from "./components/AppBar/Appbar";
import BoardBar from "./components/BoardBar/BoardBar";
import BoardContent from "./components/BoardContent/BoardContent";

function App() {
  return (
    <div className="trello-master">
      <Appbar />
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default App;
