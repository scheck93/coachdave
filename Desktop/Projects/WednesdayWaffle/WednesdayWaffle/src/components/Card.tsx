import React from 'react';
import { View, ViewProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <StyledView 
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </StyledView>
  );
};

export const CardContent = ({ children, className = '', ...props }: CardProps) => {
  return (
    <StyledView 
      className={`p-4 ${className}`}
      {...props}
    >
      {children}
    </StyledView>
  );
};
