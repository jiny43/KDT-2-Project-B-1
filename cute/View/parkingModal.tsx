import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ParkingModal = () => {

  // useState로 모달창 on/off 조절
  const [modal, setModal] = useState(true);


  return (
    <Modal
      visible={modal}
      animationType="fade"
      transparent={true}
    >
      <View style={modalStyle.modalBackground}>
        <View style={modalStyle.modalContainer}>
          <View style={modalStyle.modalText}>
            <Text>인근 주차장을 추천해 드릴까요?</Text>
          </View>
          <View style={modalStyle.modalbuttonView}>
            <TouchableOpacity
              style={modalStyle.madalbutton}
              onPress={() => {
                // 클릭 시 모달 제거
                setModal(false);
              }}
            >
              <Text>아니요</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyle.madalbutton}
              onPress={() => {
                // 클릭 시 모달 제거.
                // 여기서 주차장으로 이동될 함수 추가하면 됨.
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
    backgroundColor:"#F0D6D6"
  },
});
