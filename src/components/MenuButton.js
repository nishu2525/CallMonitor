import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MenuButton = ({ navigation, callLogs = [] }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOptionSelect = (option, filterType) => {
      setModalVisible(false);

      if (callLogs.length > 0) {
        const filteredCalls = callLogs.filter(log => log.type === filterType);
        console.log(`Navigating to ${option} with filtered calls: `, filteredCalls);
        navigation.navigate(option, { filteredCalls});
      } else {
        console.warn('No call logs available to filter.');
      }
    };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{paddingLeft: 5}}>
        <Icon name="menu" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
              <TouchableOpacity onPress={() => handleOptionSelect('IncomingCall', 'INCOMING')}>
  <Text style={styles.modalOption}>Incoming Call</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => handleOptionSelect('OutgoingCall', 'OUTGOING')}>
  <Text style={styles.modalOption}>Outgoing Call</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => handleOptionSelect('MissedCall', 'MISSED')}>
  <Text style={styles.modalOption}>Missed Call</Text>
</TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 55,
    alignItems: 'flex-start',
    width: '100%',
  },
  modalContainer: {
    backgroundColor:'white',
    borderRadius: 8,
    paddingVertical: 2,
    paddingBottom:10,
    paddingHorizontal: 5,
    width: '45%',
    letterSpacing:'30',
    alignItems: 'center',
    borderColor: 'rgba(3, 3, 3, 0.1)',
    borderWidth: 1.5,

  },
  modalOption: {
    fontSize: 21,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    color:"#654E90",
  },

});

export default MenuButton;










// const handleOptionSelect = (option, filterType) => {
//   setModalVisible(false);

//   if (callLogs) {
//     const filteredCalls = callLogs.filter(log => log.type === filterType);
//     console.log(`Navigating to ${option} with filtered calls: `, filteredCalls);
//     navigation.navigate(option, { filteredCalls });
//   } else {
//     console.warn('No call logs available to filter.');
//   }
// };

// <TouchableOpacity onPress={() => handleOptionSelect('IncomingCall', 'INCOMING')}>
//   <Text style={styles.modalOption}>Incoming Call</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => handleOptionSelect('OutgoingCall', 'OUTGOING')}>
//   <Text style={styles.modalOption}>Outgoing Call</Text>
// </TouchableOpacity>

// <TouchableOpacity onPress={() => handleOptionSelect('MissedCall', 'MISSED')}>
//   <Text style={styles.modalOption}>Missed Call</Text>
// </TouchableOpacity>
