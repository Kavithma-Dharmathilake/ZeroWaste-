import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, ImageBackground, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Message = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const getCurrentDate = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSubmit = () => {
    if (message.trim() !== "") {
      const currentDate = getCurrentDate();
      setMessages([...messages, { text: message, sender: "user", date: currentDate }]);
      setMessage("");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/jobMarket/background.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <Pressable onPress={() => navigation.navigate("JobMarket")}>
        <Image
          source={require("../../../assets/jobMarket/back-Arrow.png")}
          style={{
            width: 40,
            height: 40,
            marginHorizontal: 10,
            marginVertical: 10,
            marginTop: 60,
            marginBottom: -33,
          }}
        />
      </Pressable>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          style={styles.container1}
          renderItem={({ item }) => (
            <View style={item.sender === "user" ? styles.userMessage : styles.otherMessage}>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    maxWidth: "70%",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    maxWidth: "70%",
  
  },
  messageText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    color: "black",
    fontSize: 12,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  container1: {
    backgroundColor: "white",
    marginBottom: 1,
    borderRadius: 24,
    marginTop: 70,
  },
});

export default Message;
