import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export const MembersStyles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: 'white',
    elevation: 7,
    alignSelf: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    padding: 10,
    height: 150,
    borderRadius: 10,
    shadowColor: colors.prime1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  subCard: {
    borderRightWidth: 0.5,
    borderRightColor: 'grey',
    marginVertical: 5,
    paddingRight: 10,
  },
  subCardText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  subCard2: {
    padding: 10,
  },
  subCard2Text: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: '#494D7E',
    width: 70,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  buttonTextStyle: {
    fontSize: 16,
    color: 'white',
  },
});
