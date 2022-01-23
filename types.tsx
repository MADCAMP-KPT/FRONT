/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Login: undefined;
  Signin: undefined;
  TrainerSurvey: {trainerId: String, trainerPw: String};
  UserSurvey: {userId: String ,userPw: String};
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  UserRoot: NavigatorScreenParams<UserTabParamList> | undefined;
  Modal: undefined;
  UserDetail: {userId: number};
  UserCommunityDetail: {trainerId: number};
  UserCommunityTrainer: {gymId: number};
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type UserTabParamList = {
  UserTabOne: undefined;
  UserTabTwo: NavigatorScreenParams<GalleryTabParamList> | undefined;
  UserTabThree: undefined;
}

export type GalleryTabParamList = {
  InBody: undefined;
  NoonBody :undefined;
}

export type GalleryTabScreenProps<Screen extends keyof GalleryTabParamList> = CompositeScreenProps<
  MaterialTopTabScreenProps<GalleryTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type UserTabScreenProps<Screen extends keyof UserTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<UserTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;