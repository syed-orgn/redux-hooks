import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { decNumber, incNumber } from './actions';

function App() {
  const myState = useSelector((state) => state.changeTheNumber)
  const dispatch = useDispatch();
  return (
    <div className="App">
      <input value={myState} />
      <button onClick={() => {
        dispatch(incNumber(5))
      }}>Increment</button>
      <button onClick={() => {
        dispatch(decNumber())
      }}
      >Decrement</button>

    </div>
  );
}

export default App;
