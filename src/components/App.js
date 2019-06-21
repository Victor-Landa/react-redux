import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state = {
      usuarios: []
    }
  }

  async componentDidMount(){
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users')
    console.log('respuesta: ', respuesta)
    this.setState({
      usuarios: [
        {
          nombre: 'Víctor',
          correo: 'victorlanda1915@gmail.com',
          enlace: 'https://github.com/Victor-Landa'
        },
        {
          nombre: 'Paola',
          correo: 'paola_huerta@gmail.com',
          enlace: 'https://paolahuerta.com'
        }
      ]
    })
  }

  ponerFilas = () => (
    this.state.usuarios.map((usuario) => (
      <tr>
        <td>
          { usuario.nombre }
        </td>
        <td>
          { usuario.correo }
        </td>
        <td>
          { usuario.enlace }
        </td>
      </tr>
    ))
  );

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


