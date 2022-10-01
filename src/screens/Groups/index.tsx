import { useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackScreenProps } from 'src/@types/navigation';
import { Container } from './styles';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';

export function Groups({ navigation }: RootStackScreenProps<'Groups'>) {
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup() {
    navigation.navigate('New');
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('Players', { group });
  }

  useFocusEffect(
    useCallback(() => {
      async function fetchGroups() {
        try {
          setIsLoading(true);
          const data = await groupsGetAll();
          setGroups(data);
        } catch (error) {
          Alert.alert('Dados', 'Não foi possível carregar os dados!');
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='Jogue com a sua turma' />
      {!isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message='Que tal cadastrar a primeira turma?' />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button title='Criar nova turma' onPress={handleNewGroup} />
    </Container>
  );
}
