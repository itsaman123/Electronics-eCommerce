import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyAtR8y7bzNKkVlAMMvjdELUT3SFzjiuuuo",
  authDomain: "electronic-shop-ef112.firebaseapp.com",
  projectId: "electronic-shop-ef112",
  storageBucket: "electronic-shop-ef112.appspot.com",
  messagingSenderId: "735870806682",
  appId: "1:735870806682:web:bf8392ac3603e4c81c0d23",
  measurementId: "G-44XE9ZRJEQ"
};


// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;


export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth){
        return 
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName,email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('Error Creating User ',error.message);
        }
    }
    return userRef;
}


//Store Order data in All Transaction Collection 
export const AllTransactionData =async (DataObject) => {

    const userRef = firestore.collection('all_transaction');
    try {
      await userRef.add({
        username : DataObject.card.name,
        email:DataObject.email,
        method:DataObject.card.object,
        price:`${DataObject.price}₹`,
        items:DataObject.cartItems,
        address:DataObject.card.address_line1,
        city:DataObject.card.address_city,
        zipcode:DataObject.card.address_zip,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.log('error adding Data to firebase', error.message);
    }
  
  
  }
  
  //Creating function for storing order data in users data
  export const UserOrder = (DataObject) => {
    var user = firebase.auth().currentUser;
    const userid = user.uid;
    const userRef = firestore.collection('users').doc(userid).collection('Orders');
    try{
      userRef.add({
        username : DataObject.card.name,
          email:DataObject.email,
          method:DataObject.card.object,
          price:`${DataObject.price}₹`,
          items:DataObject.cartItems,
          address:DataObject.card.address_line1,
          city:DataObject.card.address_city,
          zipcode:DataObject.card.address_zip,
          timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
    }catch(error){
      console.log('error adding Data to firebase', error.message);
    }
  
  
  }
