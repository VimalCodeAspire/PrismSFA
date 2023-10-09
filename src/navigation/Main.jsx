import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllMembers from '../screens/Main/Members/AllMembers';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {colors} from '../constants/colors';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Main = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="AllMembers"
        component={AllMembers}
        options={{
          drawerIcon: ({color}) => {
            return <Fontisto size={30} color={color} name="persons" />;
          },

          title: 'Members',
          headerStyle: {borderBottomWidth: 1, borderBottomColor: colors.prime2},
          headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
          },
        
        }}
      />
    </Drawer.Navigator>
  );
};

export default Main;
