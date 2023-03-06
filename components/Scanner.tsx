import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

interface ScannerProps {
  onScan: (data: any) => void;
  isVisible: boolean;
  onClose: () => void;
}

const Scanner = ({ onScan, isVisible, onClose }: ScannerProps) => {
  const onSuccess = e => {
    onScan(e.data);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        containerStyle={styles.scannerContainer}
        cameraStyle={styles.scannerCamera}
        showMarker={true}
        checkAndroid6Permissions={true}
        reactivateTimeout={5000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerCamera: {
    height: '100%',
  },
});

export default Scanner;
