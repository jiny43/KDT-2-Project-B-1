import React, {useState} from 'react';
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

const InputTest = () => {
  const [text, setText] = useState<string>('');
  const Server_URL = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://${Server_URL}:3000/inputData`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          value: text,
        }),
      });
      const data = await response.json();
      Alert.alert('데이터 보내기 성공', data.status);
    } catch (error) {
      Alert.alert('데이터를 보내기 실패', String(error));
    }
  };

  return (
    <View>
      <TextInput
        placeholder="테스트합니다. 지나갑니다."
        value={text}
        onChangeText={setText}
        style={style.TextInputStyle}
      />
      <Button title="입력했다!" onPress={handleSubmit} />
    </View>
  );
};

const style = StyleSheet.create({
  TextInputStyle: {
    backgroundColor: '#ccc',
  },
});

export default InputTest;
