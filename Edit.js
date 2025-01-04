import React, { useState } from "react";
import { TextInput, View, Text, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Edit({ navigation, route }) {

    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;

    const [key, setKey] = useState(route.params.key);
    const [title, setTitle] = useState(route.params.title);
    const [img, setImg] = useState(route.params.img);
    const [qty, setQty] = useState(route.params.qty);

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
                value={title}
            />

            <Text style={{ paddingBottom: 5 }}>ISBN:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                onChangeText={(text) => setKey(text)}
                value={key}
            />

            <Text style={{ paddingBottom: 5 }}>Image URL:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                onChangeText={(text) => setImg(text)}
                value={img}
            />

            <Text style={{ paddingBottom: 5 }}>Copies Owned:</Text>
            <TextInput
                style={{ borderWidth: 1, marginBottom: 10 }}
                onChangeText={(text) => setQty(text)}
                value={qty}
            />

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ flex: 1, margin: 10 }}>
                    <Button
                        title="Save"
                        onPress={() => {
                            mydata[0].data[myindex].key = key;
                            mydata[0].data[myindex].title = title;
                            mydata[0].data[myindex].img = img;
                            mydata[0].data[myindex].qty = qty;
                            let stringdata = JSON.stringify(mydata);
                            setData(stringdata);
                            navigation.navigate("Home");
                        }}
                    />
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    <Button
                        title="Delete"
                        onPress={() => {
                            Alert.alert("Are you sure?", "", [
                                {
                                    text: "Yes",
                                    onPress: () => {
                                        mydata[0].data.splice(
                                            route.params.index,
                                            1,
                                        );
                                        let stringdata = JSON.stringify(mydata);
                                        setData(stringdata);
                                        navigation.navigate("Home");
                                    },
                                },
                                { text: "No" },
                            ]);
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

export default Edit;
