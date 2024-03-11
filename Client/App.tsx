import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './src/components/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/nav';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import Home from './src/components/Home';



export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
          <Stack.Screen  name="Welcome" component={Welcome} /> 
          <Stack.Screen  name="Login" component={Login} />    
          <Stack.Screen  name="Signup" component={SignUp}/>
          <Stack.Screen  name="Home" component={Home}/>
        </Stack.Navigator>
        <StatusBar style='light' />
      </NavigationContainer>
    </Provider>  
  );
}

const styles = StyleSheet.create({
});
