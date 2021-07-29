import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';
import './user-agent';
import io from 'socket.io-client';
import serverAddress from './server-address.json';

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const socket = io(serverAddress);
    socket.on('connect', () => {
      socket.emit('getPeople');
    });

    socket.on('receiveAllPeople', (allPeople) => {
      setPeople(allPeople);
    });

    socket.on('trigger', () => {
      socket.emit('getPeople');
    });

    return () => socket.close();
  }, []);

  return (
    <View>
      <FlatList
        data={people}
        keyExtractor={({ name, age }, index) => `key:${name}${age}${index}`}
        renderItem={(person) => <Text>{`name: ${person.item.name} age: ${person.item.age}`}</Text>}
        ListHeaderComponent={<Text>App Two Awesome</Text>}
        ListFooterComponent={<Text>Have a nice day!</Text>}
      />
    </View>
  );
};

export default App;
