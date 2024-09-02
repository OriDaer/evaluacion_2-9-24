import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [filtrar,setfiltrar]=useState('');
  const [term2, setTerm2] = useState('');
  const [consejo,setConsejo]=useState('')
  const handleTermChange = (event) => setTerm2(event.target.value);

  const handleChange = () => {
    fetch(`https://api.adviceslip.com/advice`)
    .then(response=>response.json())
    .then(data=>setConsejo(data.slip.advice))
    .catch(error => console.error('Error:', error));
  };
  const handleClick = ()=>{
    fetch(`https://api.adviceslip.com/advice`)
    .then(response=>response.json())
    .then(data=>setConsejo(data.slip.advice))
    .catch(error => console.error('Error:', error));
  };
  const handleClickBoton = () => {
    fetch(`https://api.adviceslip.com/advice/search/${term2}`)
      .then(response => response.json())
      .then(data => {
        if (data.slips) {
          setfiltrar(data.slips.map(slip => slip.advice));
        }
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect (handleClickBoton,[]);
  useEffect (handleClick,[]);

  return (
    <main>
      <h1>Evaluación React - Requests</h1>
      <h1>Consejos de vida</h1>
      <div>
        <h2>Obtener un consejo aleatorio</h2>
        <button onClick={handleClick} >Obtener</button>
        <p className="result-box">{consejo}</p>
      </div>

      <div>
        <h2>Buscar un consejo</h2>
        <input type="text" value={term2} onChange={handleTermChange} />

        <button onClick={handleClickBoton}>Enviar</button>
        <h3>Resultados de búsqueda:</h3>
        <p className="result-box">
        <ul>
        {filtrar.map((advice, index) => (
          <li key={index}>{advice}</li>
        ))}
      </ul>
        </p>
      </div>
    </main>
  );
}

export default App;
