import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Login from './pages/Login'
import Dev from './pages/Dev'
import Auth from './pages/Auth'

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Dev,
        Auth,
    })
)