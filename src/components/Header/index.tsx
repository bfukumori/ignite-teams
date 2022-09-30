import { useNavigation } from '@react-navigation/native';
import { BackButton, BackIcon, Container, Logo } from './styles';
import logoImg from '@assets/logo.png';

interface HeaderProps {
  backButtonShown?: boolean;
}

export function Header({ backButtonShown = false }: HeaderProps) {
  const navigation = useNavigation();
  function handleGoBackToHome() {
    navigation.navigate('Groups');
  }
  return (
    <Container>
      {backButtonShown && (
        <BackButton onPress={handleGoBackToHome}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  );
}
