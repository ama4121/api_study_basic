import CreateForm from 'components/create';
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
        <CreateForm></CreateForm>
      </div>
    </div>
  );
}

export default App;
