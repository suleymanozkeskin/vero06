// import {View, FlatList, StyleSheet, RefreshControl} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {getToken, getTasks} from './services/api';
// import TaskItem from './components/TaskItem';
// import {Searchbar} from 'react-native-paper';
// import Scanner from './components/Scanner';

// export default function App() {
//   const [token, setToken] = useState('');
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isScannerVisible, setIsScannerVisible] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const resToken = await getToken();
//       setToken(resToken);
//       const responseJson = await getTasks('Bearer ' + resToken);
//       setData(responseJson);
//     };

//     // Fetch data on mount
//     fetchData();

//     // Fetch data every 60 minutes
//     const intervalId = setInterval(fetchData, 60 * 60 * 1000);

//     // Clean up interval on unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const filterData = (data, query) => {
//     if (!query) {
//       return data;
//     }

//     return data.filter(item => {
//       const title = item.title.toLowerCase();
//       const description = item.description.toLowerCase();
//       const task = item.task.toLowerCase();
//       const colorCode = item.colorCode.toLowerCase();
//       const searchTerm = query.toLowerCase();

//       return (
//         title.includes(searchTerm) ||
//         description.includes(searchTerm) ||
//         task.includes(searchTerm) ||
//         colorCode.includes(searchTerm)
//       );
//     });
//   };

//   const filteredData = filterData(data, searchQuery);

//   const handleScan = data => {
//     setSearchQuery(data);
//     setIsScannerVisible(false);
//   };

//   return (
//     <View>
//       <Searchbar
//         placeholder="Search"
//         onChangeText={query => setSearchQuery(query)}
//         value={searchQuery}
//         style={{
//           marginVertical: 10,
//           marginHorizontal: 20,
//         }}
//       />

//       <Scanner
//         isVisible={isScannerVisible}
//         onClose={() => setIsScannerVisible(false)}
//         onScan={handleScan}
//       />

//       <FlatList
//         data={filteredData}
//         renderItem={({item}) => <TaskItem item={item} />}
//         keyExtractor={(item, index) => index.toString()}
//         style={{
//           backgroundColor: '#F5F5F5',
//           marginBottom: 20,
//           borderRadius: 12,
//         }}
//         contentContainerStyle={{
//           padding: 10,
//         }}
//         refreshControl={
//           <RefreshControl
//             refreshing={false}
//             onRefresh={() => console.log('Refresh')}
//           />
//         }
//       />
//     </View>
//   );
// }
