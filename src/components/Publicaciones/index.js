import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Comentarios from './Comentarios';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { 
    traerPorUsuarios: publicacionesTraerPorUsuario, 
    abrirCerrar, 
    traerComentarios 
} = publicacionesActions;

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

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key } }
        } = this.props;

        if(!usuarios.length) return;

        if(usuariosReducer.error) return;

        if(publicacionesReducer.cargando){
            return <Spinner />
        }

        if(publicacionesReducer.error){
            return <Fatal mensaje={ publicacionesReducer.error }/>
        }

        if(!publicaciones.length) return;

        if(!('publicaciones_key' in usuarios[key])) return;


        const { publicaciones_key } = usuarios[key];

        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        );
    }


    mostrarInfo = (publicaciones, pub_key) => (
        publicaciones.map((publicacion, com_key) => (
            <div 
            className="pub_titulo" 
            key= { publicacion.id } 
            onClick={ ()=>this.mostrarComentarios(pub_key, com_key, publicacion.comentarios) }
            >
                <h2>
                    { publicacion.title }
                </h2>
                <h3>
                    { publicacion.body }
                </h3>
                {
                    (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios} /> : ''
                }
            </div>
        ))
    );

    mostrarComentarios = (pub_key, com_key, comentarios) => {
        this.props.abrirCerrar(pub_key, com_key);
        // Si comentarios.length no tiene nada entonces voy a ir a buscar los comentarios.
        if(!comentarios.length){
            this.props.traerComentarios(pub_key, com_key);
        }
    }

    render(){
        return(
            <div>
                { this.ponerUsuario() }
                { this.ponerPublicaciones() }
            </div>
        )
    }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return { usuariosReducer, publicacionesReducer };
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);