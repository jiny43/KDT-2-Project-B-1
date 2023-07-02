import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export const GooglePlacesInput = () => {

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        minLength={2}
        placeholder="장소를 검색해보세요!"
        query={{
          key: 'AIzaSyDnL9nWVwuhGkiNqgVyH48iw4YQTXyCh2o',
          language: 'ko',
          components: 'country:kr',
        }}
        keyboardShouldPersistTaps={'handled'}
        fetchDetails={true}
        onPress={(data, details) => {
          console.log(data, details);
        }}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log('no results')}
        keepResultsAfterBlur={true}
        enablePoweredByContainer={false}
        styles={styles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '5%',
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 1,
  },
  textInput: {
    height: '100%',
  },
});