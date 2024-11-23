import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as LucideIcons from 'lucide-react-native';

export default function CustomButton({
  title,
  icon,
  onPress,
  textColor = '#FFFFFF',
  bgColor = '#007AFF',
  loading = false,
  spinnerColor = '#FFFFFF',
}) {
  const buttonStyle = {
    ...styles.button,
    backgroundColor: bgColor,
    opacity: loading ? 0.7 : 1,
  };

  const textStyle = {
    ...styles.text,
    color: textColor,
  };

  const IconComponent = icon ? LucideIcons[icon] : null;

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={loading ? null : onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} style={styles.icon} />
      ) : (
        <>
          {IconComponent && <IconComponent color={textColor} size={24} style={styles.icon} />}
          {title && <Text style={textStyle}>{title}</Text>}
        </>
      )}
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

});
