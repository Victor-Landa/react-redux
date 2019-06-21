import React, { Component } from 'react';

class App extends Component {

  ponerFilas = () => [
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

  render(){
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
            { this.ponerFilas() }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;


