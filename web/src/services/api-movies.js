// login

const getMoviesFromApi = (props) => {
    console.log(props);
    // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
    return fetch('http://localhost:4000/movies', {
      method: "GET"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      return data;
      });
        // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
    };
  
  const objToExport = {
    getMoviesFromApi: getMoviesFromApi
  };
  
  export default objToExport;