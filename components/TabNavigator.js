import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Cinema from '../screens/Cinema';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Movies') {
                    iconName = focused ? 'movie-filter' : 'movie-filter-outline';
                } else if (route.name === 'Cinemas') {
                    iconName = focused ? 'map-marker-account' : 'map-marker-account-outline';
                }
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'yellow',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: [{ 
              display: 'flex', 
              backgroundColor: '#00bfff',
              height: 60
            }]
        })}

    >
        <Tab.Screen name="Movies" component={Home} />
        <Tab.Screen name="Cinemas" component={Cinema} />
    </Tab.Navigator>
);

export default TabNavigator;
