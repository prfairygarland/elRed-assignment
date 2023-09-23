import Bio from './components/Bio'
import Ratings from './components/Ratings'
// import Skills from './components/Skills'

function App() {
  return (
    <div className="App">
      <Bio/>
      <hr style={{height: "1px", width: "100%", color: "gray", backgroundColor: "gray"}}></hr>
      <Ratings/>
      {/* <Skills/> */}
    </div>
  );
}

export default App;
