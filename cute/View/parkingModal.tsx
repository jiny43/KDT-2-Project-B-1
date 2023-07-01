import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export const ParkingModal = () => {
  const [modal, setModal] = useState(true)

  return (
    <Modal
      visible={modal}
      animationType="fade"
      transparent={true}
    >
      <View style={modalStyle.modalSize}>
        <View style={modalStyle.modalText}>
          <Text>인근 주차장을 추천해{'\n'} 드릴까요?</Text>
        </View>
        <View style={modalStyle.modalbuttonView}>
          <TouchableOpacity
            style={modalStyle.madalbutton}
            onPress={() => { setModal(false) }}
          >
            <Text>아니요</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={modalStyle.madalbutton}
            onPress={() => { setModal(false) }}
          >
            <Text>네</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const modalStyle = StyleSheet.create({
  modalSize: {
    width: 400,
    height: 300,
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    zIndex: 5,
    backgroundColor: "#FFF9F9",
    flex:1
  },
  modalText: {
    width: "100%",
    height: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalbuttonView: {
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "row"
  },
  madalbutton: {
    width: "50%",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  }
})