import { useState } from 'react';
import { Alert } from 'react-native';
import { RootStackScreenProps } from 'src/@types/navigation';
import { Container, Content, Icon } from './styles';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';

export function NewGroup({ navigation }: RootStackScreenProps<'New'>) {
  const [group, setGroup] = useState('');

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da turma');
      }
      await groupCreate(group);
      navigation.navigate('Players', {
        group,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo');
        return console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header backButtonShown />
      <Content>
        <Icon />
        <Highlight
          title='Nova turma'
          subtitle='Crie a turma para adicionar as pessoas'
        />
        <Input placeholder='Nome da turma' onChangeText={setGroup} />
        <Button title='Criar' style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
