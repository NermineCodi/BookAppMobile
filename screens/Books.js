import { StyleSheet, Text, View, Image, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";

const Books = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch("http://192.168.0.108:4000/api/books");
        const result = await response.json();

        console.log("result Books:", result.response);

        if (result.success) {
          const books = result.response;
          console.log("categories:", books);
          setBooks(books);
        } else {
          const error = result.message;
        }
      } catch (err) {
        console.log("error:", err);
      }
    };
    getBooks();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Go to Categories"
        onPress={() => navigation.navigate("Categories")}
      ></Button>
      <FlatList
        style={{ width: "100%", backgroundColor: "red" }}
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          let url =
            item.image && item.image.name
              ? "http://192.168.0.108:4000/uploads/" + item.image.name
              : null;
          return (
            <View style={styles.bookView}>
              <View
                style={{ flex: 0.6, display: "flex", flexDirection: "column" }}
              >
                {url && (
                  <Image style={styles.bookImg} source={{ uri: url }}></Image>
                )}
                <Text>Title: {item.title}</Text>
                <Text> Desc: {item.description}</Text>
                {item.author && (
                  <Text>
                    Author: {item.author.firstName + item.author.lastName}
                  </Text>
                )}
              </View>
              <View style={{ flex: 0.4 }}>
                {item.category &&
                  item.category.map((category) => (
                    <Text style={styles.catText}>{category.name}</Text>
                  ))}
              </View>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default Books;

const styles = StyleSheet.create({
  bookView: {
    flexDirection: "row",
    backgroundColor: "white",

    padding: 10,
    width: "90%",
  },
  bookImg: {
    height: 100,
    width: 80,
    resizeMode: "contain",
    marginLeft: 10,
  },
  catText: {
    backgroundColor: "lightblue",
    marginBottom: 5,
    marginRight: 5,
  },
});
