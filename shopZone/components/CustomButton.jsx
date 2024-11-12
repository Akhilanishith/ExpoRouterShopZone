import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as LucideIcons from 'lucide-react-native';

export default function CustomButton({
  title,
  icon,
  onPress,
  textColor = '#FFFFFF',
  bgColor = '#007AFF'
}) {
  const buttonStyle = {
    ...styles.button,
    backgroundColor: bgColor,
  };

  const textStyle = {
    ...styles.text,
    color: textColor,
  };

  const IconComponent = icon ? LucideIcons[icon] : null;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {IconComponent && <IconComponent color={textColor} size={24} style={styles.icon} />}
      {title && <Text style={textStyle}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    width: 'auto',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
  },
});
