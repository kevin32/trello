import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from "../constants/Colors";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import * as WebBrowser from "expo-web-browser";

import EmailAuthModal from "../components/EmailAuthModal"
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {useMemo, useRef, useState} from "react";
import {ModalType} from "../types/enums";

const Auth = () => {

    const {top} = useSafeAreaInsets();
    const modalRef = useRef<BottomSheetModal>(null);
    const [authType, setAuthType] = useState<ModalType | null>(null);
    const snapPoints = useMemo(() => ["70%"], []);

    const openLink = async () => {
        await WebBrowser.openBrowserAsync("https://www.google.com")
    }


    const showModal = (type: ModalType) => {
        setAuthType(type);
        modalRef.current?.present();
    }

    const closeModal = () => {
        modalRef.current?.close();
    }

    return (
        <BottomSheetModalProvider>
            <View style={[styles.container, {paddingTop: top + 30}]}>
                <Image source={require("../assets/images/login/trello.png")}
                       style={styles.image}
                />
                <Text style={styles.introText}>
                    Meie lahe rakendus
                </Text>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: "white"}]}
                        onPress={() => showModal(ModalType.Login)}>
                        <Text style={[styles.btnText]}>Log in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => showModal(ModalType.SignUp)}>
                        <Text style={[styles.btnText, {color: "white"}]}>Register</Text>
                    </TouchableOpacity>

                    <Text style={styles.description}>
                        By signing up, you agree to the {" "}
                        <Text style={styles.link} onPress={openLink}>
                            User Notice
                        </Text>{" "}
                        and{" "}
                        <Text style={styles.link} onPress={openLink}>
                            Privacy Policy
                        </Text>
                        .
                    </Text>

                </View>
            </View>

            <BottomSheetModal
                ref={modalRef}
                snapPoints={snapPoints}
            >

                <EmailAuthModal authType={authType} onBack={closeModal}/>

            </BottomSheetModal>
        </BottomSheetModalProvider>

    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        alignItems: "center",
    },
    image: {
        height: 500,
        paddingHorizontal: 40,
        resizeMode: "contain",
    },
    introText: {
        fontWeight: "600",
        color: "white",
        fontSize: 17,
        padding: 30,
    },
    bottomContainer: {
        width: "100%",
        paddingHorizontal: 40,
        gap: 10,
    },
    button: {
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        borderColor: "#000",
        borderWidth: 1,
    },
    btnText: {
        fontSize: 18,
    },
    description: {
        fontSize: 12,
        textAlign: "center",
        color: "#fff",
        marginHorizontal: 60,
    },
    link: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
        textDecorationLine: "underline",
    }
})

export default Auth;