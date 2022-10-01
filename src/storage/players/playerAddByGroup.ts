import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { PLAYERS_COLLECTION } from '@storage/storageConfig';
import { playersGetAllByGroup } from './playersGetAllByGroup';
import { AppError } from '@utils/AppError';

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetAllByGroup(group);
    const playerAlreadyExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name
    );
    if (playerAlreadyExists.length > 0) {
      throw new AppError('Já existe um jogador cadastrado com esse nome!');
    }
    await AsyncStorage.setItem(
      `${PLAYERS_COLLECTION}-${group}`,
      JSON.stringify([...storedPlayers, newPlayer])
    );
  } catch (error) {
    throw error;
  }
}
