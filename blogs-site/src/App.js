import './App.css';

function App() {
  return (
    <div className="App">
      <header className="top-nav">
        <a
          className="top-link top-left"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = 'http://localhost:3000/';
          }}
        >
          Home
        </a>

        <a
          className="top-link top-right"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = 'http://localhost:3001/';
          }}
        >
          Projects
        </a>
      </header>

      <main className="content">
        <div className="card">
          <h1>
            Currently working on this page <span className="emoji">✍️🛠️</span>
          </h1>
          <p className="sub">Check back soon! <span className="emoji">⏳</span></p>
        </div>
      </main>
    </div>
  );
}

export default App;