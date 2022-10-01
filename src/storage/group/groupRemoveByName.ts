import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUPS_COLLECTION, PLAYERS_COLLECTION } from '@storage/storageConfig';
import { groupsGetAll } from './groupsGetAll';

export async function groupRemoveByName(groupName: string) {
  try {
    const storedGroups = await groupsGetAll();
    const filteredGroups = storedGroups.filter((group) => group !== groupName);

    await AsyncStorage.setItem(
      `${GROUPS_COLLECTION}`,
      JSON.stringify(filteredGroups)
    );
    await AsyncStorage.removeItem(`${PLAYERS_COLLECTION}-${groupName}`);
  } catch (error) {
    throw error;
  }
}
