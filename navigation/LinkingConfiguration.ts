/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: 'login',
      Signin: 'signin',
      TrainerSurvey: 'trainersurvey',
      UserSurvey: 'usersurvey',
      UserDetail: 'userdetail',
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TrainerMyUserScreen: 'two',
            },
          },
          TabThree: {
            screens: {
              TrainerMyPageScreen: 'two',
            },
          },
        },
      },
      UserRoot: {
        screens: {
          UserTabOne: {
            screens: {
              TabTwoScreen: 'userone',
            },
          },
          UserTabTwo: {
            screens: {
              InBody: {
                screens: {
                  InBodyScreen: 'inbody',
                }
              },
              NoonBody: {
                screens: {
                  NoonBodyScreen: 'noonbody',
                }
              },
            },
          },
          UserTabThree: {
            screens: {
              TabTwoScreen: 'userthree',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
