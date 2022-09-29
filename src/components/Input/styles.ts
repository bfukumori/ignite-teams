import { TextInput, TextInputProps } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled(
  TextInput as new (props: TextInputProps) => TextInput
)`
  ${({ theme }) => css`
    flex: 1;
    min-height: 56px;
    max-height: 56px;
    background-color: ${theme.COLORS.GRAY_700};
    color: ${theme.COLORS.WHITE};
    background-color: ${theme.COLORS.GRAY_700};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};
    border-radius: 6px;
    padding: 16px;
  `}
`;
