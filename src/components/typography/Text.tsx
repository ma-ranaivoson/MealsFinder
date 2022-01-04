import styled, { DefaultTheme } from 'styled-components/native';

const defaultTextStyles = (theme: DefaultTheme) => `
  font-family: ${theme.Font.fonts.body};
  font-weight: ${theme.Font.fontWeights.regular};
  color: ${theme.Color.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme: DefaultTheme) => `
    font-size: ${theme.Font.fontSizes.body};
`;

const hint = (theme: DefaultTheme) => `
    font-size: ${theme.Font.fontSizes.body};
`;

const error = (theme: DefaultTheme) => `
    color: ${theme.Color.text.error};
`;

const caption = (theme: DefaultTheme) => `
    font-size: ${theme.Font.fontSizes.caption};
    font-weight: ${theme.Font.fontWeights.bold};
`;

const label = (theme: DefaultTheme) => `
    font-family: ${theme.Font.fonts.heading};
    font-size: ${theme.Font.fontSizes.body};
    font-weight: ${theme.Font.fontWeights.medium};
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
};

const TextTypo = styled.Text<{ variant?: string}>`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

TextTypo.defaultProps = {
  variant: 'body',
};

export default TextTypo;
