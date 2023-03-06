import React from 'react';
import { View, Text, StyleSheet } from 'react-native';




const TaskItem = ({ item }) => {
  const styles = StyleSheet.create({
    task: {
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 30,
    },
    title: {
      color: '#fff',
      fontSize: 22,
    },
    description: {
      color: '#fff',
      fontSize: 14,
    },
  });

  return (
    <View
      style={{
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: item.colorCode,
      }}
    >
      <Text style={styles.task}>{item.task}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

export default TaskItem;
