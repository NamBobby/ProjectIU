import { StyleSheet } from "react-native";

const RowStyle = StyleSheet.create({
      backmenu: {
        margin: 20,
        width: 55,
        height: 55,
        display: "flex",
        flexDirection: "column",
      },
      rectangleA: {
        width: 55,
        height: 55,
        backgroundColor: "#DBB1D3",
        padding: 5,
        fontSize: 42,
        borderRadius: 100,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
});

export default RowStyle;
