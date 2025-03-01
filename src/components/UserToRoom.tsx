import { setDoc, doc, collection, updateDoc, addDoc, getDoc, onSnapshot, where, limit, query } from "firebase/firestore"
import { db } from "../services/firebase"


export function AddingUserToRoom(
  displayName: string,
  roomCode: string,
  callback: () => void
){
  
  const userInfoCollection = collection(db, 'users'); 
  //Add info of users to firebase!
  async function addingUserinfo() {
    const newDoc = await addDoc(userInfoCollection,{
      DisplayName: displayName,
      RoomCode: roomCode,
    })
    try {
      await addDoc(userInfoCollection, newDoc)
      callback() 
    } catch (error) {
      console.debug(error)
    }
  }

  addingUserinfo()
  void usersToLobby()  
 /*
  const Rooms = doc(db, 'users/uyCAmbuMT34UTRzmXmu4')

  async function writeUserToRoom() {
    const docData = {
      DisplayName: displayName,
      RoomCode: roomCode,
    }
    try {
      await setDoc(Rooms, docData)
      callback()
    } catch (error) {
      console.debug(error)
    }
  }
  void writeUserToRoom();
  */
}


function usersToLobby(){
  const userInfoCollection = collection(db, 'users'); 
  const lobbyRoom = doc(db, 'lobby/P4janotZxKGC7LLPIwls');

  async function lobbyDoc() {
    const docData = {
      host: 'John Doe',
      RoomCode: '111111',
      users: 'd',
    }
    try {
      await setDoc(lobbyRoom, docData)
    } catch (error) {
      console.debug(error)
    }
  }
  void lobbyDoc()

  
 // function  cancelL
  //gets lobby if any
  function queryForLobbyDoc(){
    const usersLobbyquery = query(
      collection(db, 'users'),
      where('Roomcode', '==', '111111'),
      limit(300),
    )
    onSnapshot(usersLobbyquery, (querySnapshot) =>{
      console.log('Document ${snap.id} contains ${JSON.Stringify(snap.data())}')
    })
    const querySnapshot = getDocs(usersLobbyquery)
    querySnapshot.forEach((snap) => {
      console.log('Document ${snap.id} contains ${JSON.Stringify(snap.data())}')
    })
  }

  async function lobbycheck() {
    const lobbySnaphot = await getDoc(lobbyRoom)
    if(lobbySnaphot.exists()){
      const docData = lobbySnaphot.data()
    }
  }
  async function getUserID() {
    onSnapshot(userInfoCollection,(doco) => {
      
    }
    )


  }



  function listenToLobby(){
    onSnapshot(lobbyRoom, (docSnapshot) => {
      if(docSnapshot.exists()){
        const docData = docSnapshot.data()
      }
    })
  }
}






/*
export function AddingUserToRoom(
  displayName: string,
  roomCode: string,
  callback: () => void
){
  const userInfo = collection(db, 'users');
  async function getUserinfo() {
    const newDoc = await addDoc(userInfo, {
      DisplayName: displayName,
      RoomCode: roomCode,
    });
    try {
      await addDoc(userInfo, newDoc)
      callback() 
    } catch (error) {
      console.debug(error)
    }
  }
  void getUserinfo()
}
/*
function queryForLobbyDoc(){
  const UserOrderQuery = query(
    collection(db, 'user'),
    where('drink', '==', 'latte')

  );
  getDocs(cus)

}

*/


/*
export function AddingUserToRoom(
  displayName: string,
  roomCode: string,
  callback: () => void
) {
  const Rooms = doc(db, "poll/P7m8QPNrZzi5v29BpjJm")

  async function writeUserToRoom() {
    const docData = {
      DisplayName: displayName,
      RoomCode: roomCode,
      points: 15,
      Email: null,
      ID: 1101,
    }
    try {
      await setDoc(Rooms, docData)
      callback()
    } catch (error) {
      console.debug(error)
    }
  }
  void writeUserToRoom()
}


what a user needs 
            DisplayName: "John",
            RoomCode: '123456'
            points:
            Email:
            ID:
                try{
        const RoomDoc = await addDoc(collection(db, "rooms"), {
            DisplayName: "John",
            RoomCode: '123456',
            points: 15
        });
        console.log("Document written with ID: ", RoomDoc.id);
    } catch (e){
        console.log("Error adding document", e);
    }

*/
