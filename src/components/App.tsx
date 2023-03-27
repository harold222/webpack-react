import React, {useEffect} from 'react';
import {fetchUser, setUser} from "../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/useRedux";
import './App.scss';
import {RootState} from "../redux/store";
import {Iinfo} from "../redux/user/IUser";

/**
 *
 * @returns {JSX.Element} Componente principal de nuestra aplicación
 */
const App = () => {

    const currentUser: Iinfo = useAppSelector((state: RootState) => state.user.info);
    const loading: boolean = useAppSelector((state: RootState) => state.user.loading);
    const error: string = useAppSelector((state: RootState) => state.user.error);

    const dispatch = useAppDispatch();

    // hacer una peticion en una carga inicial
    // useEffect(() => {
    //     dispatch(fetchUser());
    // }, [dispatch]);

    const createUser = (): void => {
        dispatch(
            setUser({
                typeOfDocument: 1,
                numberDocument: '123456789',
                phone: '987654321',
                email: 'test@test.co',
            })
        );
    };

    if (loading)
        return <h1>Cargando...</h1>;
    else if (error)
        return <h1>Error: {error}</h1>;
    else {
        return (
            <div>
                <h1>test</h1>
                <button onClick={() => {
                    // setea las propiedades del usuario
                    createUser();
                    // envio al backend, thunk que hace la peticion o la funcion asincrona
                    dispatch(fetchUser());
                }}>
                    propiedades para el usuario
                </button>
                <hr/>
                <ul>
                    <li>tipo de documento = { currentUser.typeOfDocument }</li>
                    <li>numero de documento = { currentUser.numberDocument }</li>
                    <li>telefono = { currentUser.phone }</li>
                    <li>correo = { currentUser.email } </li>
                </ul>
            </div>
        );
    }
};

export default App;
