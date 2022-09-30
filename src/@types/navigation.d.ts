import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Groups: undefined;
  New: undefined;
  Players: {
    group: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
