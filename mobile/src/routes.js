import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login';
import Dev from './pages/Dev';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Dev,
    })
);