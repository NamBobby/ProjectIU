import { StyleSheet } from 'react-native';

const ChoosingPrefStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
      },
      info: {
        marginTop: 10,
        width: 375,
        height: 75,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      content: {
        flex: 1,
        padding: 10,
      },
      emotionContainer: {
        marginBottom: 10,
        alignItems: "center",
      },
      emotionText: {
        fontSize: 18,
        color: "#4B5563",
        textAlign: "center",
        marginBottom: 8,
      },
      emotionHighlight: {
        fontWeight: "bold",
        fontSize: 20,
      },
      subtitle: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
      },
      section: {
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        color: "#374151",
      },
      radioGroup: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
      radioButton: {
        width: "48%",
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        alignItems: "center",
      },
      radioText: {
        color: "#4B5563",
        fontWeight: "500",
      },
      radioTextSelected: {
        color: "white",
        fontWeight: "600",
      },
      spacer: {
        flex: 1,
      },
      footer: {
        padding: 50,
      },
      startButton: {
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
      },
      startButtonText: {
        fontFamily: 'Montserrat-Bold',
        color: "#000000",
        fontWeight: "600",
        fontSize: 18,
      },
});

export default ChoosingPrefStyle;