import { StyleSheet } from "react-native";

const TrackingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
    color: "#1F2937",
  },
  messageContainer: {
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  todayMessage: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 24,
  },
  highlightText: {
    fontWeight: "bold",
  },
  emotionText: {
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 10,
    textAlign: "center",
  },
  noDataSubText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
  chartContainer: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  chartScrollView: {
    marginLeft: 80, // Space for emotion labels
    marginBottom: 5,
  },
  lineChart: {
    borderRadius: 16,
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  emotionLegend: {
    position: 'absolute',
    left: 16,
    top: 50,
    bottom: 30,
    width: 80,
    zIndex: 10,
  },
  emotionLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  emotionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  emotionLegendText: {
    fontSize: 10,
    color: "#4B5563",
  },
  dotContent: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    zIndex: 2,
  },
  foodNameTag: {
    position: 'absolute',
    width: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
    padding: 2,
    alignItems: 'center',
    zIndex: 2,
  },
  foodNameText: {
    fontSize: 10,
    color: "#1F2937",
    textAlign: 'center',
  },
  scrollHint: {
    textAlign: 'center',
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
    fontStyle: 'italic',
  },
  recentLogsContainer: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recentLogsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  logItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  logHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  logDateText: {
    fontSize: 14,
    color: "#4B5563",
  },
  emotionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  emotionBadgeText: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
  },
  logContent: {
    marginTop: 6,
  },
  logFoodName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  logInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logInfoText: {
    fontSize: 14,
    color: "#6B7280",
  },
  footer: {
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  footerButton: {
    backgroundColor: "#6EA9F7",
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtonText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 8,
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6B7280",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginRight: 6,
  },
  starContainer: {
    flexDirection: "row",
  },
});

export default TrackingStyle;