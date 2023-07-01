import {StyleSheet, Text, View} from 'react-native';

function OpenModalToClickMarker() {
  return (
    <>
      <View
        style={[
          ModalStyle.container,
          ModalStyle.backgroundColor,
          ModalStyle.height100,
        ]}>
        <Text>일단 크기를 좀 보자</Text>
      </View>
    </>
  );
}

const ModalStyle = StyleSheet.create({
  container: {
    width: '60%',
  },
  height100: {
    height: '100%',
  },
  height30: {
    height: '30%',
  },
  backgroundColor: {
    backgroundColor: '#ccc',
  },
});

export default OpenModalToClickMarker;
