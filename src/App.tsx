import Profile from 'components/profile';

function App() {
  return (
    <div className="App">
      <header>
        <a href="/" className="logo">
          <i></i>
          Rachel's API Study
        </a>
      </header>
      <div className="content">
        <Profile />
      </div>
    </div>
  );
}

export default App;
