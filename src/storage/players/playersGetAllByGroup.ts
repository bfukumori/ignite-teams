import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { PLAYERS_COLLECTION } from '@storage/storageConfig';

export async function playersGetAllByGroup(group: string) {
  try {
    const storage = await AsyncStorage.getItem(
      `${PLAYERS_COLLECTION}-${group}`
    );
    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

    return players;
  } catch (error) {
    throw error;
  }
}
