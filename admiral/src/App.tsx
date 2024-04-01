import React from 'react'
import { Admin, createRoutesFrom } from '@devfamily/admiral'
import menu from './config/menu'
import dataProvider from './config/dataProvider'
import authProvider from './config/authProvider'
import '@devfamily/admiral/style.css'
import { multiDataProvider } from './config/multiDataProvider'
import { replayDataProvider } from './crud/replays/dataProvider'
import { errorsDataProvider } from './crud/errors/dataProvider'
import { dvrDataProvider } from './crud/sessions'
// import themeLight from './config/theme/themeLight'
// import themeDark from './config/theme/themeDark'

const apiUrl = import.meta.env.VITE_ADMIN_API_URL || '/api'
const dvrApiUrl = import.meta.env.VITE_DVR_API_URL || 'https://dvr.timing71.org';

const Routes = createRoutesFrom(import.meta.globEager('../pages/**/*'))

const usersDataProvider = dataProvider(apiUrl);
const replaysDataProvider = replayDataProvider;

const mdp = multiDataProvider({
    'users': usersDataProvider,
    'replays': replaysDataProvider,
    'errors': errorsDataProvider,
    'sessions': dvrDataProvider(dvrApiUrl)
})

function App() {
    return (
        <Admin
            dataProvider={mdp}
            authProvider={authProvider(apiUrl)}
            menu={menu}
            // themePresets={{ light: themeLight, dark: themeDark }}
        >
            <Routes />
        </Admin>
    )
}

export default App
