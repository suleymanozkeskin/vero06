import { View, FlatList, TouchableOpacity, RefreshControl, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getToken, getTasks } from './services/api';
import TaskItem from './components/TaskItem';
import { Searchbar } from 'react-native-paper';
import Scanner from './components/Scanner';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // searchButtonWrapper: {
  //   borderWidth: 2,
  //   borderColor: '#000',
  //   borderRadius: 12,
  //   overflow: 'hidden',
  // },
});


export default function App() {
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScannerVisible, setIsScannerVisible] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const resToken = await getToken();
      setToken(resToken);
      const responseJson = await getTasks('Bearer ' + resToken);
      setData(responseJson);
    };

    // Fetch data on mount
    fetchData();

    // Fetch data every 60 minutes
    const intervalId = setInterval(fetchData, 60 * 60 * 1000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const filterData = (data, query) => {
    if (!query) {
      return data;
    }

    return data.filter(item => {
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      const task = item.task.toLowerCase();
      const colorCode = item.colorCode.toLowerCase();
      const searchTerm = query.toLowerCase();

      return title.includes(searchTerm)
         description.includes(searchTerm)
         task.includes(searchTerm)
        || colorCode.includes(searchTerm);
    });
  };

  const filteredData = filterData(data, searchQuery);

  const handleScan = (data) => {
    console.warn("log->", data)
    setSearchQuery(data);
    setIsScannerVisible(true);
  };
  const onSuccess = (e) => {
    console.log('QR code scanned:', e.data);
    setSearchQuery(e.data)
    setIsScannerVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {isScannerVisible && (
        <QRCodeScanner onRead={onSuccess} cameraType='back' showMarker={true} />
      )}
      {!isScannerVisible && (
        <>
          <Searchbar
            placeholder="Search with Text"
            onChangeText={query => setSearchQuery(query)}
            value={searchQuery}
            style={{
              marginVertical: 10,
              marginHorizontal: 20,
            }}
          />

          <View style={styles.searchButtonWrapper}>
          <TouchableOpacity
            style={[styles.searchButton, styles.searchButtonText]}
            onPress={() => setIsScannerVisible(true)}>
            <Text style={styles.searchButtonText}>Search with QR Code</Text>
          </TouchableOpacity>
          </View>


          

          <FlatList
            data={filteredData}
            renderItem={({ item }) => <TaskItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
            style={{
              backgroundColor: '#F5F5F5',
              marginBottom: 20,
              borderRadius: 12,
            }}
            contentContainerStyle={{
              padding: 10,
            }}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => console.log('Refresh')}
              />
            }
          />
        </>
      )}
    </View>
  );
}