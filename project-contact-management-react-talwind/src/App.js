import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App flex flex-row">
      <Sidebar />
      <div className="w-2/5">Sub Sidebar</div>
      <div className="flex-1">Content</div>
    </div>
  );
}

export default App;
