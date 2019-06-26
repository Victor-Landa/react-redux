import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuarios: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends Component{

    async componentDidMount(){
        // Destructurar las cosas que no tengan que ver con el estado
        // No sacamos usuariosReducer porque como el reducer es el estado, el estado se actualiza y el componentDidMount se ejecuta una vez después del render, entonces ese estado puede variar, no lo podemos destructurar.
        const{
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: { params: { key } }
        } = this.props;

        if(!this.props.usuariosReducer.usuarios.length){
            await usuariosTraerTodos();
        }

        if(this.props.usuariosReducer.error){
            return;
        }

        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
            publicacionesTraerPorUsuario(this.props.match.params.key);            
        }
    }

    ponerUsuario = () => {
        const { 
            usuariosReducer, 
            match: { params: { key } } 
        } = this.props;

        if(usuariosReducer.error){
            return <Fatal mensaje={ usuariosReducer.error }/>
        }

        if(!usuariosReducer.usuarios.length || usuariosReducer.cargando){
            return <Spinner />
        }

        const nombre = usuariosReducer.usuarios[key].name;

        return (
            <h1>
                Publicaciones de { nombre }
            </h1>
        )
    };

    render(){
        return(
            <div>
                { this.props.match.params.key }
                { this.ponerUsuario() }
            </div>
        )
    }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return { usuariosReducer, publicacionesReducer };
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);