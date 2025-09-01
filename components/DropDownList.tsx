import React, {useState} from 'react';

import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import Constants from "expo-constants";

const DropDownList = () => {

    const [isMenuVisible, setMenuVisible] = useState(false);
    const router = useRouter();

    const menuItems = [
        {
            key: "board",
            title: "Create a board",
            icon: "grid-outline",
            action: () => {
                router.push("/(authenticated)/(tabs)/boards/new-board");
            },
        },
        {
            key: "card",
            title: "Create a card",
            icon: "card-outline",
            action: () => {
                // You can add navigation for creating a card here
                console.log("Create a card selected");
            },
        },
        {
            key: "templates",
            title: "Browse Templates",
            icon: "albums-outline",
            action: () => {
                router.push("/(authenticated)/(tabs)/boards/templates");
            },
        },
    ];

    const handleSelect = (action: () => void) => {
        setMenuVisible(false);
        action();
    }

    return (
        <>
            <TouchableOpacity onPress={() => {
                console.log(isMenuVisible);
                setMenuVisible(true);
            }}>
                <Ionicons name="add" size={32}/>
            </TouchableOpacity>

            <Modal
                visible={isMenuVisible}
                transparent={true}
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={styles.menuContainer}>
                            {menuItems.map((item, index) => (
                                <TouchableOpacity
                                    key={item.key}
                                    style={[styles.menuItem, index === menuItems.length - 1 && styles.lastMenuItem]}
                                    onPress={() => handleSelect(item.action)}>
                                    <Text style={styles.menuItemText}>{item.title}</Text>
                                    <Ionicons name={item.icon as any} size={20} color="#333"/>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

        </>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
    },
    menuContainer: {
        position: "absolute",
        top: Constants.statusBarHeight + 30, // Position below the header
        right: 0,
        backgroundColor: "white",
        borderRadius: 12,
        width: 250,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#e0e0e0",
    },
    lastMenuItem: {
        borderBottomWidth: 0,
    },
    menuItemText: {
        fontSize: 16,
        color: "#333",
    },
});

export default DropDownList;