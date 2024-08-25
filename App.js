import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Image, useWindowDimensions } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const { width, height } = useWindowDimensions();

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const isPortrait = height > width;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.pc}>
          <View style={styles.imgbox}>
            <Image source={require('./android/app/src/main/res/drawable/icon_i.jpg')} style={styles.img1} />
          </View>
          <View style={styles.pendingbox}>
            <Text style={styles.pendingedit}></Text>
          </View>
        </View>
        <View style={[styles.todo, isPortrait ? styles.todoPortrait : styles.todoLandscape]}>
          <Text style={styles.sectionTitle}>ToDo...⏳</Text>
        </View>
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task...'}
          placeholderTextColor={'#777'} // Ensures the placeholder text is visible
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.b1} onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 70,
    paddingHorizontal: 20,
    alignItems: 'stretch',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#333', // Ensures text is visible on a light background
  },
  items: {
    marginTop: 20,
  },
  writeTaskWrapper: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    paddingVertical: 15,
    paddingLeft: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '70%',
    color: '#000'
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#55BCF6',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 22,
    color: '#FFF', // Ensures the "+" text is visible
  },
  b1: {},
  pendingedit: {
    fontSize: 28,
    paddingBottom: 10,
    // backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    color: '#333', // Ensures text is visible on a white background
  },
  img1: {
    width: 20,
    height: 35,
    marginVertical: -7
  },
  pc: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: '#55BCF6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    height: 50
  },
  todo: {
    marginVertical: 40,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    backgroundColor: 'lightgrey',
    borderTopLeftRadius: 90,
    borderBottomLeftRadius: 90,
    borderTopRightRadius: 90,
    borderBottomRightRadius: 90,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    color: '#333', // Ensures text is visible on a lightgrey background
  },
  todoPortrait: {
    marginLeft: 'auto',
    marginRight: 20,
  },
  todoLandscape: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  imgbox: {
    backgroundColor: 'black',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    padding: 10,
    width: 40,
    height: 40
  },
  pendingbox: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
