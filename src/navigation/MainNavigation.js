import React from 'react';
import { Details } from "../pages/Details";
import { PickBarCode } from "../pages/PickBarCode";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {CheckView} from '../pages/CheckView';

export const MainNavigation = () =>{
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator
        initialRouteName={"Picker"}
        screenOptions={({route, navigation}) => ({
          headerLeft: () => route.name === "CheckView"?(
              <TouchableOpacity
                style={{padding:10}}
                onPress={() => {
                  navigation.navigate("Picker");
                }}
              >
                <Icon name="camera" size={25} />
              </TouchableOpacity>
            ):route.name!=="Picker"?
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(null)
                }}
              >
                <Icon name="arrowleft" size={25} style={{padding:10}}/>
              </TouchableOpacity>
            :null,
          headerRight: () => route.name !== "CheckView"?(
            <TouchableOpacity
              style={{padding:10}}
              onPress={()=>{
                navigation.navigate("CheckView");
              }}
            >
            <Icon name="bars" size={25} />
            </TouchableOpacity>):null
        })}
      >
        <Stack.Screen name={"Picker"} component={PickBarCode} />
        <Stack.Screen name={"Details"} component={Details} />
        <Stack.Screen name={"CheckView"} component={CheckView} options={{title:'Historique'}}/>
      </Stack.Navigator>
  );
};
