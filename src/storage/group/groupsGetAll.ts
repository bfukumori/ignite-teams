import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUPS_COLLECTION } from '../storageConfig';

export async function groupsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GROUPS_COLLECTION);
    const groups: string[] = storage ? JSON.parse(storage) : [];
    return groups;
  } catch (error) {
    throw error;
  }
}
