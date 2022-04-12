import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          "http://192.168.0.108:4000/api/categories"
        );
        const result = await response.json();

        console.log("result Books:", result.response);

        if (result.success) {
          const categories = result.response;
          console.log("categories:", categories);
          setCategories(categories);
        } else {
          const error = result.message;
        }
      } catch (err) {
        console.log("error:", err);
      }
    };
    getCategories();
  }, []);

  return categories.map((category) => (
    <View key={category._id} style={styles.catView}>
      <Text>title: {category.name}</Text>
      <Text>slug: {category.slug}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  catView: {
    backgroundColor: "pink",
    marginBottom: 10,
    borderColor: "black",
    width: 300,
    borderRadius: 5,
    padding: 10,
  },
});
