import axios from 'axios';
import { ACTUALIZAR, CARGANDO, ERROR } from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;


export const traerPorUsuarios = (key) => async (dispatch, getState) => {
    
    dispatch({
        type: CARGANDO,
    })

    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const usuario_id = usuarios[key].id;


    try{
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);


        const nuevas = respuesta.data.map((publicacion) => ({
            ...publicacion,
            comentarios: [],
            abierto: false
        }))


        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas
        ];
        
        dispatch({
            type: ACTUALIZAR,
            payload: publicaciones_actualizadas
        })

        const publicaciones_key = publicaciones_actualizadas.length - 1;
        const usuarios_actualizados = [...usuarios];
        usuarios_actualizados[key] = {
            ...usuarios[key],
            publicaciones_key
        }
        
        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        })
    }
    catch(error){
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Publicaciones no disponibles.'
        })
    }

}


export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key];

    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    };

    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ];

    publicaciones_actualizadas[pub_key][com_key] = actualizada;
    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    })
}

// Aquí vamos a ir a buscar nuestros comentarios para luego ponerlos en donde corresponden
export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key];

    const respuesta = await axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`);

    const actualizada = {
        ...seleccionada,
        comentarios: respuesta.data
    };

    //publicaciones_actualizadas es todo lo que publicaciones tiene y después como estamos yéndonos a uno en específico, en publicaciones_actualizadas de esa casilla en específico le vamos a poner todo lo que tiene las publicaciones originales de esa casilla en específico, ya que hicimos eso, vamos a ir un nivel más adentro y la otra casilla donde está esa única publicación a la que le dimos click la vamos a actualizar con nuestra constante que es actualizada en donde ya cambié los comentarios. Como ya tenemos las publicaciones actualizadas podemos correr el dispatch y se van a actualizar mis comentarios.
    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ];

    publicaciones_actualizadas[pub_key][com_key] = actualizada;

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    })
}