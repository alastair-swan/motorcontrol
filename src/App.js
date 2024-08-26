import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Motor />
      </header> 
    </div>
  );
}

function Motor(){
  return (
    <div>
      <MotorSpeed />
      <MotorPhase />
      <MotorControl />
    </div>
  );
}

function MotorControl(){
  return (
    <div className="MotorControl">
      <button>Faster</button>
      <button>Slower</button>
    </div>
  )
}

function MotorSpeed(){
  return (
    <div className="MotorSpeed">
        Speed will be here
    </div>
  );
}

function MotorPhase(){
  return (
    <div className="MotorPhase">
      Phase will be here
    </div>
  )
}

export default App;
