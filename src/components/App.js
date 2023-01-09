const App = function(){
  //Título y descripcion de la página web
  let name = 'Fye Cobain';
  let description = `Portafolio web de ${name}`;
  document.querySelector('meta[name="description"]').content = name;
  document.querySelector('title').innerText = description;

  return(
    <div className="App">
      <h1>{name}</h1>
      <p>Page still in progres...</p>
    </div>
  );
}

export default App;