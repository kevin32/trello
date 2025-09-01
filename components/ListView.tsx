import React from 'react';

import {Text, View} from 'react-native';
import {TaskList} from "../types/enums";

export interface ListViewProps {
    taskList: TaskList;
}

const ListView = ({taskList}: ListViewProps) => {
    return (
        <View>
            <Text>
                {taskList.title}
            </Text>
        </View>
    );
};

export default ListView;