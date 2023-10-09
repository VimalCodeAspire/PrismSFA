import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllMembers} from '../../../api/member/member-api';
import {useDispatch, useSelector} from 'react-redux';
import {removeCredentialAsync} from '../../../functions/asnyc';
import {deleteCredentials} from '../../../redux/reducers';
import {backgroundStyles} from '../../../assets/styling/backgroundstyles';
import {MembersStyles} from '../../../assets/styling/members';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from "react-native-vector-icons/Fontisto"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../constants/colors';
import Modal from "react-native-modal";
import Loading from '../../../components/Loading';

const AllMembers = ({navigation}) => {
  const Cred = useSelector(state => state.Cred);
  const [loading,setloading]=useState(false)
  const [isModal,setIsModal]=useState(false)
  console.log(Cred)
  const [MembersData, setMembersData] = useState([]);
  const Dispatch = useDispatch();
  async function get() {
    setloading(true)
    try {
      const resp = await getAllMembers(Cred.token);
      setMembersData(resp.data);
    } catch (error) {
      await removeCredentialAsync();
      Dispatch(deleteCredentials());
    }
    setloading(false)
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight:(
        {}
      )=>{
        return <Ionicons
        name='add'
        size={25}
        color={colors.prime1}
        style={{padding:10}}
        onPress={()=>setIsModal(true)}
        />
      }
    })
    get();
  }, []);

  function renderItem(data, index) {
    return (
      <View style={MembersStyles.card}>
        <View style={MembersStyles.subCard}>
          <Image
            source={require('../../../assets/images/lg/avatar9.jpg')}
            resizeMode="contain"
            style={{width: 70, height: 70}}
          />
          <Text style={MembersStyles.subCardText}>{data.employeeId}</Text>
        </View>
        <View style={MembersStyles.subCard2}>
          <Text style={MembersStyles.subCard2Text}>
            {data.firstName + ' ' + data.lastName}
          </Text>
          <Text style={MembersStyles.subCard2Text}>
            Joining Date {data.joiningDate}
          </Text>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <TouchableOpacity style={MembersStyles.buttonStyle}>
            <FontAwesome name="edit" color={'white'} size={18} />
            <Text style={MembersStyles.buttonTextStyle}>{" "}Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[MembersStyles.buttonStyle,{left:-15,width:80}]}>
          <Fontisto
          size={16}
          color={"white"}
          name='person'
          />
            <Text style={MembersStyles.buttonTextStyle}>{" "}Profile</Text>
          </TouchableOpacity>
          </View>
          
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[backgroundStyles.whiteBackground]}>
   {loading?<Loading/>:   <FlatList
        data={MembersData}
        renderItem={item => renderItem(item.item, item.index)}
      />}
      <Modal
      isVisible={isModal}
      onBackdropPress={() => setIsModal(false)}
      swipeDirection="down"
      animationIn={"bounceInUp"}
      animationInTiming={1000}
      animationOutTiming={1000}
      >
        <View style={{backgroundColor:"red",height:100,width:100}}>

        <Text >First Modal</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AllMembers;
