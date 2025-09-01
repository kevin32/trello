import React, {useCallback, useState} from 'react';

import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Link, Stack, useFocusEffect} from "expo-router";
import DropDownList from "../../../../components/DropDownList";
import {useSupabase} from "../../../../context/SupabaseContext";
import {Board} from "../../../../types/enums";
import {Colors} from "../../../../constants/Colors";

const Boards = () => {

    const {getBoards} = useSupabase();
    const [boards, setBoards] = useState<Board[]>([]);
    const [refreshing, setRefreshing] = useState(false);


    useFocusEffect(useCallback(() => {
        loadBoards();
    }, []));

    const ListItem = ({item}: { item: Board }) => (
        <Link href={`/(authenticated)/board/${item.id}?bg=${encodeURIComponent(item.background)}`}
              style={styles.listItem}
              key={item.id}
              asChild
        >
            <TouchableOpacity>
                <View style={[styles.colorBlock, {backgroundColor: item.background}]}/>
                <Text style={{fontSize: 16}}>{item.title}</Text>
            </TouchableOpacity>

        </Link>

    )


    const loadBoards = async () => {
        const data = await getBoards();
        setBoards(data);
    }

    return (
        <View>
            <Stack.Screen
                options={{headerRight: () => <DropDownList/>}}
            />
            <FlatList
                style={styles.list}
                data={boards}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => (
                    <View style={{height: 1, backgroundColor: Colors.grey, marginHorizontal: 50}}>
                    </View>
                )}
                renderItem={ListItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadBoards}/>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        flex: 1,
    },
    list: {
        borderColor: Colors.grey,
        borderWidth: 1,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        gap: 10,
    },
    colorBlock: {
        width: 30,
        height: 30,
        borderRadius: 4,
    }
})

export default Boards;