import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Cinema from '../screens/Cinema';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route, focused, color) => {
    let iconName;
    let iconSize = focused ? 28 : 24; 

    switch (route.name) {
        case 'Movies':
            iconName = focused ? 'movie-filter' : 'movie-filter-outline';
            break;
        case 'Cinemas':
            iconName = focused ? 'map-marker-radius' : 'map-marker-radius-outline';
            break;
        default:
            iconName = 'question-mark';
            break;
    }

    return <MaterialCommunityIcons name={iconName} size={iconSize} color={color} />;
};

const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => getTabBarIcon(route, focused, color),
            tabBarActiveTintColor: 'yellow',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {
                backgroundColor: 'deepskyblue',
                height: 65, 
                borderTopWidth: 0,
                elevation: 10,
                shadowOpacity: 0.1,
                paddingBottom: 5, 
            },
            tabBarLabelStyle: {
                fontSize: 12,
                marginBottom: 4,
            }
        })}
    >
        <Tab.Screen name="Movies" component={Home} />
        <Tab.Screen name="Cinemas" component={Cinema} />
    </Tab.Navigator>
);


export default TabNavigator;
