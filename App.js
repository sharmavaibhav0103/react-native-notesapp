import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  function noteHandler(note) {
    setNote(note);
  }
  function addNote() {
    setNotes((currentNotes) => [
      ...currentNotes,
      {
        id: Date.now().toString(),
        text: note,
      },
    ]);
    console.log(notes);
    setNote("");
  }
  function deleteItem(id) {
    setNotes(notes.filter((note) => note.id !== id));
    console.log("delete");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.noteContainer}>
        <TextInput
          value={note}
          placeholder="Add Note ..."
          onChangeText={noteHandler}
          style={{
            fontSize: 18,
            flex: 1,
          }}
        />
        <Button title="Add Note" onPress={addNote} />
      </View>

      <View style={styles.notesContainer}>
        <ScrollView alwaysBouncevertical={true}>
          {notes ? (
            notes.map((item) => (
              <Pressable
                android_ripple={{ color: "#dddddd" }}
                key={item.id}
                onPress={() => deleteItem(item.id)}
              >
                <Text style={styles.le}>{item.text}</Text>
              </Pressable>
            ))
          ) : (
            <Text style={styles.elt}>List Empty !!!</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  noteContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    marginLeft: 25,
    marginRight: 10,
  },
  notesContainer: {
    marginTop: 50,
    display: "flex",
    // backgroundColor: "orange",
    flex: 5,
  },
  elt: {
    color: "gray",
    textAlign: "center",
    fontSize: 20,
    marginTop: 50,
  },
  le: {
    // borderWidth: 2,
    marginBottom: 5,
    borderRadius: 7,
    backgroundColor: "#fafafa",
    fontSize: 16,
    fontWeight: 300,
    textAlign: "left",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
  },
});
