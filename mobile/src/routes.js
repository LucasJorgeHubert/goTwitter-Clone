import { createStackNavigator } from 'react-navigation';

import Login from './pages/Login'
import Timeline from './pages/Timeline'
import New from './pages/NewTweet'

const Routes = createStackNavigator({
    Login,
    Timeline,
    New,
});

export default Routes;