/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LoginScreen from '../screens/LoginScreen'
import TrainerSurveyScreen from '../screens/TrainerSurveyScreen'
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TrainerMyPageScreen from '../screens/TrainerMyPageScreen'
import SigninScreen from '../screens/SigninScreen';
import UserSurveyScreen from '../screens/UserSurveyScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { UserTabParamList, UserTabScreenProps } from '../types'; // Tab types for users
import LinkingConfiguration from './LinkingConfiguration';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, title: 'Login Screen'}}/>
      <Stack.Screen name="Signin" component={SigninScreen} options={{headerShown: false}}/>
      <Stack.Screen name="TrainerSurvey" component={TrainerSurveyScreen} options={{headerShown: false}}/>
      <Stack.Screen name="UserSurvey" component={UserSurveyScreen} options={{headerShown: false}} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="UserRoot" component={UserBottomTabNavigator} options={{headerShown: false}} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: '시간표',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="timetable" size={24} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: '회원관리',
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TrainerMyPageScreen}
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color }) => <Feather name="info" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const UserBottomTab = createBottomTabNavigator<UserTabParamList>();

function UserBottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <UserBottomTab.Navigator
      initialRouteName="UserTabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <UserBottomTab.Screen
        name="UserTabOne"
        component={TabTwoScreen}
        options={({ navigation }: UserTabScreenProps<'UserTabOne'>) => ({
          title: 'Timetable',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <UserBottomTab.Screen
        name="UserTabTwo"
        component={TabTwoScreen}
        options={{
          title: '회원관리',
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />,
        }}
      />
      <UserBottomTab.Screen
        name="UserTabThree"
        component={TabTwoScreen}
        options={{
          title: '내 정보',
          tabBarIcon: ({ color }) => <Feather name="info" size={24} color={color} />,
        }}
      />
    </UserBottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
