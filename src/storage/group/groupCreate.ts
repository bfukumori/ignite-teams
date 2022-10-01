import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUPS_COLLECTION } from '../storageConfig';
import { groupsGetAll } from './groupsGetAll';
import { AppError } from '@utils/AppError';

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll();
    const groupAlreadyExists = storedGroups.includes(newGroup);
    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo cadastrado com esse nome!');
    }
    await AsyncStorage.setItem(
      GROUPS_COLLECTION,
      JSON.stringify([...storedGroups, newGroup])
    );
  } catch (error) {
    throw error;
  }
}
