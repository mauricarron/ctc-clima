import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  const [consulta, guardarConsulta] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    if (consulta) {
      const consultarApi = async () => {
        const API_KEY = "cc9c8f3792a516cd56ffae95c10a98b6";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}`;
        const fetchData = await fetch(url);
        const responseData = await fetchData.json();
        guardarResultado(responseData);
        guardarConsulta(false);
        if (responseData.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      };
      consultarApi();
    }
  }, [consulta, ciudad, pais]);

  return (
    <Fragment>
      <Header titulo="CLIMA React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsulta={guardarConsulta}
              />
            </div>
            <div className="col m6 s12">
              {error ? (
                <Error mensaje="No se encontraron resultados" />
              ) : (
                <Clima resultado={resultado} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
