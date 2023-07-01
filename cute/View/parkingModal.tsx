import { Module } from "module";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export const parkingModal = () => {
  const [modal, setModal] = useState(false)

  return(
    <Modal
      // style={}
      visible={modal}
    >
      <View>
        <Text>인근 주차장을 추천해{'\n'} 드릴까요?</Text>
      </View>
      <View>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </Modal>
  )
}

const modalStyle = StyleSheet.create({
  modalSize:{
    width:300,

  }
})