import React from 'react';

const App = () => {

  const ponerFilas = () => [
    <tr>
      <td>
        Víctor
      </td>
      <td>
        victorlanda1915@gmail.com
      </td>
      <td>
        https://github.com/Victor-Landa
      </td>
    </tr>,
    <tr>
      <td>
        Paola
      </td>
      <td>
        paola_huerta@gmail.com
      </td>
      <td>
        https://paolahuerta.com
      </td>
    </tr>
  ];

  return (
    <div className="margen">
      <table className="tabla">
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Correo
            </th>
            <th>
              Enlace
            </th>
          </tr>
        </thead>
        <tbody>
          { ponerFilas() }
        </tbody>
      </table>
    </div>
  );
}

export default App;


