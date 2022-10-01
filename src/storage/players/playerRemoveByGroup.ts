import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYERS_COLLECTION } from '@storage/storageConfig';
import { playersGetAllByGroup } from './playersGetAllByGroup';

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await playersGetAllByGroup(group);
    const filtered = storage.filter((player) => player.name !== playerName);

    await AsyncStorage.setItem(
      `${PLAYERS_COLLECTION}-${group}`,
      JSON.stringify(filtered)
    );
  } catch (error) {
    throw error;
  }
}
