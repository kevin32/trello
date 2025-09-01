import React, {useEffect, useRef, useState} from 'react';

import {SafeAreaView, Text, useWindowDimensions, View, StyleSheet, TouchableOpacity} from 'react-native';

import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import {useSupabase} from "../context/SupabaseContext";
import {Board, TaskList} from "../types/enums";
import ListStart from "./ListStart";
import ListView from "./ListView";
import {useSharedValue} from "react-native-reanimated";

interface BoardAreaProps {
    board?: Board
}

const BoardArea = ({board}: BoardAreaProps) => {

    const {width, height} = useWindowDimensions();
    const {getBoardLists, addBoardList} = useSupabase();
    const [startListActive, setStartListActive] = useState(false);
    const [lists, setlists] = useState<Array<TaskList>>([])
    const carouselData = [...lists, {isAddButton: true}];
    const ref = useRef<ICarouselInstance>(null);


    const progress = useSharedValue(0);
    const scrolloffsetValue = useSharedValue(0);


    useEffect(() => {
        loadBoardLists();
    }, [board]);

    const onSaveNewList = async (title: any) => {
        if (!board || !addBoardList) return;
        setStartListActive(false);

        try {
            const {data: newItem} = await addBoardList!(board.id, title);

            if (newItem) {
                setlists(prevState => [...prevState, newItem]);
            }
        } catch (error) {
            console.error("Error adding new list: ", error)
        }
    }

    const loadBoardLists = async () => {
        if (!board && !getBoardLists) return;

        const lists = await getBoardLists(board.id);
        setlists(lists || [])
    }

    const onPressPagiantion = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        })
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Carousel
                    width={width}
                    height={height}
                    loop={false}
                    ref={ref}
                    onProgressChange={progress}
                    defaultScrollOffsetValue={scrolloffsetValue}
                    data={carouselData}
                    renderItem={({item}) => (
                        <View style={{flex: 1}}>
                            {'isAddButton' in item ? (
                                <>
                                    {!startListActive && (
                                        <TouchableOpacity onPress={() => setStartListActive(true)}
                                                          style={styles.listAddBtn}>

                                            <Text>Add list</Text>
                                        </TouchableOpacity>
                                    )}
                                    {startListActive && (
                                        <ListStart onCancel={() => setStartListActive(false)} onSave={onSaveNewList}/>
                                    )}
                                </>
                            ) : (<ListView taskList={item}/>)}
                        </View>
                    )}
                />
                <View style={styles.paginationContainer}>
                    <Pagination.Basic progress={progress} data={carouselData}
                                      dotStyle={styles.paginationDot}
                                      size={10}
                                      activeDotStyle={styles.paginationActiveDot}
                                      containerStyle={styles.paginationStyle}
                                      onPress={onPressPagiantion}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    listAddBtn: {
        margin: 10,
        backgroundColor: "#00000047",
        height: 44,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    paginationContainer: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    paginationDot: {
        backgroundColor: "#ffffff5c",
        borderRadius: 40,
        width: 10,
        height: 10,
    },
    paginationActiveDot: {
        backgroundColor: "#fff",
        width: 10,
        height: 10,
    },
    paginationStyle: {
        gap: 10,
        flexDirection: 'row',
    }
});

export default BoardArea;