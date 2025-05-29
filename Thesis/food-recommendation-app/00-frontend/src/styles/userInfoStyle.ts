import { StyleSheet } from "react-native";

const UserInfoStyle = StyleSheet.create({
    userInfo: {
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        position: "relative",
      },
      signOutButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: "#FFE6EB",
        borderRadius: 12,
        marginTop: 4,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
      username: {
        backgroundColor: '#F2F2EC',
        borderRadius: 15,
        width: 129,
        height: 47,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      userName: {
        color: "#E39F0C",
        fontFamily: 'Montserrat-Bold',
        fontSize: 24,
        lineHeight: 28,
        textAlign: "center",
        paddingHorizontal: 10,
      },
    signOutButtonText: {
        color: "#FF5A63",
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        lineHeight: 14,
        textDecorationLine: 'underline'
    },
});

export default UserInfoStyle;