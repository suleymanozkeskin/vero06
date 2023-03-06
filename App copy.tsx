// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import React, { useEffect, useState } from 'react';

// export default function App() {
//   const [token, setToken] = useState('');
//   const [data, setData] = useState([]);
  
//   useEffect(() => {
//     getToken();
//   }, []);

//   const getToken = () => {
//     fetch(`https://api.baubuddy.de/index.php/login`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: 'Basic QVBJX0V4cGxvcmVyOjEyMzQ1NmlzQUxhbWVQYXNz',
//       },
//       body: JSON.stringify({
//         username: '365',
//         password: '1',
//       }),
//     })
//       .then(response => response.json())
//       .then(responseJson => {
//         const resToken = responseJson['oauth']['access_token'];
//         setToken(resToken);
//         getTasks('Bearer ' + resToken);
//       })
//       .catch(error => {
//         console.warn('error->', error);
//       });
//   };

//   const getTasks = (resToken: string) => {
//     fetch('https://api.baubuddy.de/dev/index.php/v1/tasks/select', {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: resToken,
//       },
//     })
//       .then(response => response.json())
//       .then(responseJson => {
//         setData(responseJson);
//       })
//       .catch(error => {
//         console.warn('error->', error);
//       });
//   };

//   const renderText = ({ item }: { item: { colorCode: string, task: string, title: string, description: string } }) => {
//     return (
//       <View
//         style={{
//           marginVertical: 5,
//           borderWidth: 1,
//           borderColor: '#ccc',
//           borderRadius: 10,
//           paddingHorizontal: 10,
//           paddingVertical: 5,
//           backgroundColor: item.colorCode, // Set the backgroundColor of the view to the value of the colorCode property
//         }}
//       >
//         <Text style={styles.task}>{item.task}</Text>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.description}>{item.description}</Text>
//       </View>
//     );
//   };

//   const styles = StyleSheet.create({
//     task: {
//       fontWeight: 'bold',
//       color: '#fff', // Use a contrasting color to the background color of the view
//       fontSize: 30,
//     },
//     title: {
//       color: '#fff',
//       fontSize: 22,
//     },
//     description: {
//       color: '#fff',
//       fontSize: 14,
//     },
//   });


//   return (
//     <View>
//       <FlatList
//         data={data}
//         renderItem={renderText}
//         keyExtractor={(item, index) => index.toString()}
//         style={{
//           backgroundColor: '#F5F5F5',
//           marginBottom: 20,
//           borderRadius: 12,
//         }}
//         contentContainerStyle={{
//           padding: 10,
//         }}
//       />
//     </View>
//   );
// }
