import HeaderGuri from '../../components/HeaderGuri/HeaderGuri';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{width: '100%'}}>
        <HeaderGuri />
      </div>
      <ProgressBar hide items={3} />
    </div>
  );
}

export default App;
