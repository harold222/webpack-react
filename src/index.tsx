import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './styles/index.scss'

const rootApp = document.getElementById('root')

if (!rootApp)
    throw new Error('No se encontró el elemento root')

ReactDOM.render(
    <App />,
    rootApp
)
