import { useState, useEffect, useRef } from 'react';
import { FlatList, Alert, TextInput } from 'react-native';
import { RootStackScreenProps } from 'src/@types/navigation';
import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';
import { playerAddByGroup } from '@storage/players/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/players/playersGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/players/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { AppError } from '@utils/AppError';
import { Loading } from '@components/Loading';

export function Players({
  route,
  navigation,
}: RootStackScreenProps<'Players'>) {
  const [isLoading, setIsLoading] = useState(false);
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const { group } = route.params;
  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    try {
      if (newPlayerName.trim().length === 0) {
        return Alert.alert('Criar Jogador', 'Informe o nome do jogador');
      }
      const newPlayer = {
        name: newPlayerName,
        team,
      };
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      fetchPlayersByTeam();
      setNewPlayerName('');
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Criar Jogador', error.message);
      } else {
        Alert.alert('Criar Jogador', 'N??o foi poss??vel criar o jogador!');
        return console.log(error);
      }
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Remover jogador', 'N??o foi poss??vel remover o jogador!');
      return console.log(error);
    }
  }

  async function removeGroup() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('Groups');
    } catch (error) {
      Alert.alert('Remover grupo', 'N??o foi poss??vel remover o grupo!');
      return console.log(error);
    }
  }

  async function handleRemoveGroup() {
    Alert.alert('Remover', 'Deseja remover o grupo?', [
      { text: 'N??o', style: 'cancel' },
      { text: 'Sim', onPress: () => removeGroup() },
    ]);
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const data = await playersGetByGroupAndTeam(group, team);
      setPlayers(data);
    } catch (error) {
      Alert.alert('Dados', 'N??o foi poss??vel carregar os dados!');
      return console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header backButtonShown />
      <Highlight title={group} subtitle='Adicione a galera e separe os times' />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon icon='add' onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={team === item}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message='N??o h?? pessoas nesse time.' />
          )}
          contentContainerStyle={[
            players.length === 0 && { flex: 1 },
            { paddingBottom: 100 },
          ]}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button
        title='Remover turma'
        type='SECONDARY'
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
