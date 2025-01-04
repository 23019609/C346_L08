import React, { useState } from "react";
import { TextInput, View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Add({ navigation, route }) {
    const [key, setKey] = useState("");
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [qty, setQty] = useState("");

    const setData = async (value) => {
        AsyncStorage.setItem("bookdata", value);
        navigation.navigate("Home");
    };

    return (
        <View style={{ margin: 20 }}>
            <Text style={{ paddingBottom: 5 }}>Title:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                onChangeText={(text) => setTitle(text)}
            />

            <Text style={{ paddingBottom: 5 }}>ISBN:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                onChangeText={(text) => setKey(text)}
            />

            <Text style={{ paddingBottom: 5 }}>Image URL:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                onChangeText={(text) => setImg(text)}
            />

            <Text style={{ paddingBottom: 5 }}>Copies Owned:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                onChangeText={(text) => setQty(text)}
            />

            <View style={{ marginTop: 10 }}>
                <Button
                    title="Add"
                    onPress={() => {
                        let mydata = JSON.parse(route.params.datastring);
                        let item = {
                            key: key,
                            title: title,
                            img: img,
                            qty: qty,
                        };
                        mydata[0].data.push(item);
                        let stringdata = JSON.stringify(mydata);
                        setData(stringdata);
                    }}
                />
            </View>
        </View>
    );
}

export default Add;
