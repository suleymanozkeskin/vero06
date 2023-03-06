import { View, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getToken, getTasks } from './services/api';
import TaskItem from './components/TaskItem';

export default function App() {
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getToken().then(resToken => {
      setToken(resToken);
      getTasks('Bearer ' + resToken).then(responseJson => {
        setData(responseJson);
      });
    });
  }, []);

  return (
    <View>
      <FlatList
        data={data}
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
      />
    </View>
  );
}
