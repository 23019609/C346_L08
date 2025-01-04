import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SectionList,
    Button,
    Image,
    Pressable,
} from "react-native";
import { datasource } from "./Data.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    opacityStyle: {
        borderWidth: 1,
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#c8d3f566",
    },
    textContainer: {
        margin: 10,
        textAlign: "left",
        textAlignVertical: "top",
        flex: 1,
    },
    headerText: {
        fontSize: 17,
        fontWeight: "bold",
        fontVariant: "small-caps",
    },
    textStyle: {
        fontSize: 15,
    },
    imageStyle: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        alignSelf: "center",
        flex: 1,
    },
});

const Home = ({ navigation }) => {
    const [mydata, setMydata] = useState([]);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem("bookdata");
        if (datastr != null) {
            jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        } else {
            setMydata(datasource);
        }
    };

    getData();

    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    let datastr = JSON.stringify(mydata);
                    navigation.navigate("Edit", {
                        index: index,
                        type: section.title,
                        key: item.key,
                        title: item.title,
                        img: item.img,
                        qty: item.qty,
                        datastring: datastr,
                    });
                }}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>{item.title}</Text>
                    <Text style={styles.textStyle}>ISBN: {item.key}</Text>
                    <Text style={styles.textStyle}>
                        Copies Owned: {item.qty}
                    </Text>
                </View>
                <Image
                    source={{
                        uri: `${item.img}`,
                    }}
                    style={styles.imageStyle}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ margin: 20, marginBottom: 125 }}>
            <StatusBar />
            <View style={{ marginBottom: 20 }}>
                <Button
                    title="New Book"
                    onPress={() => {
                        let datastr = JSON.stringify(mydata);
                        navigation.navigate("Add", { datastring: datastr });
                    }}
                />
            </View>
            <View>
                <SectionList
                    sections={mydata}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title } }) => {
                        return null;
                    }}
                />
            </View>
        </View>
    );
};

export default Home;
