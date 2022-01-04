import React from 'react';
import styled from 'styled-components/native';

interface Props {
  variant: string;
}

const TopSmall = styled.View`
  margin-top: ${({ theme }) => theme.Spacing.space[1]};
`;

const TopMedium = styled.View`
  margin-top: ${({ theme }) => theme.Spacing.space[2]};
`;

const TopLarge = styled.View`
  margin-top: ${({ theme }) => theme.Spacing.space[3]};
`;

const LeftSmall = styled.View`
  margin-left: ${({ theme }) => theme.Spacing.space[1]};
`;

const LeftMedium = styled.View`
  margin-left: ${({ theme }) => theme.Spacing.space[2]};
`;

const LeftLarge = styled.View`
  margin-left: ${({ theme }) => theme.Spacing.space[3]};
`;

export default function Spacer({ variant }: Props) {
  if (variant === 'top.small') return <TopMedium />;
  if (variant === 'top.large') return <TopLarge />;
  if (variant === 'left.small') return <LeftSmall />;
  if (variant === 'left.medium') return <LeftMedium />;
  if (variant === 'left.large') return <LeftLarge />;

  return <TopSmall />;
}
