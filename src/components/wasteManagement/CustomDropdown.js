import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

const CustomDropdown = ({ items, placeholder, onSelect }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
  
    const toggleDropdown = () => {
      setIsVisible(!isVisible);
    };
  
    const handleSelect = (item) => {
      setSelectedItem(item);
      onSelect(item);
      toggleDropdown();
    };
  
    return (
      <View>
        <TouchableOpacity onPress={toggleDropdown}>
          <Text>{selectedItem || placeholder}</Text>
        </TouchableOpacity>
  
        <Modal visible={isVisible} animationType="slide">
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item.value)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={toggleDropdown}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };
  
  export default CustomDropdown;
  