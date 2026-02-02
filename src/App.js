import "./App.css";
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
        <br />
      </div>

      <div className="resumeSection">
        <h2>Education</h2>
        <p>Education Placeholder</p>
        <button>Add Education</button>
        <br />
      </div>

      <AddSkillPage />

      <br />
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
