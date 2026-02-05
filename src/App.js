import "./App.css";
import AddEducationPage from "./components/AddEducationPage";
import ContactSection from "./components/ContactSection";
import AddSkillPage from "./components/AddSkillPage";

function App() {
  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <ContactSection />
      <div className="resumeSection">
        <h2>Experience</h2>
        <p>Experience Placeholder</p>
        <button>Add Experience</button>
        <br></br>
      </div>
      <AddEducationPage />
      <AddSkillPage />
      <br></br>
      <button>Export</button>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
}

export default App;
