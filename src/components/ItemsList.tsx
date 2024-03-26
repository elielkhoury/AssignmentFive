import React, {useState, useEffect} from 'react';
import {
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Item {
  id: number;
  name: string;
}

const ItemsList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadItemsFromStorage = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) setItems(JSON.parse(storedItems));
      } catch (error) {
        console.error('Failed to load items from storage:', error);
      }
    };

    loadItemsFromStorage();
  }, []);

  const handleAddItem = async () => {
    const newItem: Item = {
      id: Date.now(), // Use current timestamp as a simple unique id
      name: newItemName,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setNewItemName(''); // Reset input field

    try {
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Failed to save items:', error);
    }
  };

  const fetchMoreItems = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    // Simulate fetching more data
    setTimeout(async () => {
      const moreItems: Item[] = Array.from({length: 10}, (_, index) => ({
        id: Date.now() + index,
        name: `Item ${items.length + index + 1}`,
      }));
      setItems(prevItems => [...prevItems, ...moreItems]);
      setLoadingMore(false);
    }, 1500);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  return (
    <>
      <FlatList
        data={items}
        renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={fetchMoreItems}
        onEndReachedThreshold={0.5}
      />
      <TextInput
        placeholder="Enter new item name"
        value={newItemName}
        onChangeText={setNewItemName}
        style={styles.input}
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default ItemsList;
