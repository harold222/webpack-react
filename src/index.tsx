import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { Provider } from 'react-redux'
import { store } from "./redux/store";
import './styles/index.scss'

const rootApp = document.getElementById('root');

if (!rootApp) throw new Error('No se encontró el elemento root')

ReactDOM.createRoot(rootApp)
    .render(
        <Provider store={store}>
            <App />
        </Provider>
    );
