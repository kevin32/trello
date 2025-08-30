import {Stack, useRouter, useSegments} from "expo-router";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {AuthProvider, useAuth} from "../context/AuthContext";
import {useEffect} from "react";
import {Colors} from "../constants/Colors"
import {ActivityIndicator, View} from "react-native";

const InitialLayout = () => {

    const router = useRouter();

    const {user, loading} = useAuth();
    const segments = useSegments();

    useEffect(() => {
        if (loading) return;

        const isAuthGroup = segments[0] === "(authenticated)";

        if (user && !isAuthGroup) {
            router.replace("/(authenticated)/(tabs)/boards");
        } else if (!user) {
            router.replace("/auth");
        }
    }, [user, loading]);

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        );
    }


    return (
        <Stack>
            <Stack.Screen name="auth" options={{headerShown: false}}/>
            <Stack.Screen name="(authenticated)" options={{headerShown: false}}/>
        </Stack>
    )
}


const RootLayoutNav = () => {
    return (
        <AuthProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                <InitialLayout/>
            </GestureHandlerRootView>
        </AuthProvider>

    );
}

export default RootLayoutNav;