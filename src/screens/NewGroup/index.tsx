import { useState } from 'react';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { RootStackScreenProps } from 'src/@types/navigation';
import { Container, Content, Icon } from './styles';

export function NewGroup({ navigation }: RootStackScreenProps<'New'>) {
  const [group, setGroup] = useState('');

  function handleNew() {
    navigation.navigate('Players', {
      group,
    });
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
