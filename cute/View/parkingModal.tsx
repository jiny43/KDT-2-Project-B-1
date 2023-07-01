import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ParkingModal = () => {
  const [modal, setModal] = useState(true);

  return (
    <Modal visible={modal} animationType="fade" transparent={true}>
      <View style={modalStyle.modalBackground}>
        <View style={modalStyle.modalContainer}>
          <View style={modalStyle.modalText}>
            <Text>인근 주차장을 추천해 드릴까요?</Text>
          </View>
          <View style={modalStyle.modalbuttonView}>
            <TouchableOpacity
              style={modalStyle.madalbutton}
              onPress={() => {
                setModal(false);
              }}
            >
              <Text>아니요</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyle.madalbutton}
              onPress={() => {
                setModal(false);
              }}
            >
              <Text>네</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 200,
    height: 150,
    backgroundColor: "#FFF9F9",
  },
  modalText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalbuttonView: {
    height: "30%",
    flexDirection: "row",
  },
  madalbutton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
