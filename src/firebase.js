import Firebase from 'firebase'
export const init = () => {
    Firebase.initializeApp({
        apiKey: "AIzaSyDHY9IPIaTKPVcrOrTRbKm1tOQag4jk-xE",
        authDomain: "projeto-tcc-333d6.firebaseapp.com",
        databaseURL: "https://projeto-tcc-333d6.firebaseio.com",
        projectId: "projeto-tcc-333d6",
        storageBucket: "projeto-tcc-333d6.appspot.com",
        messagingSenderId: "264938431096",
        appId: "1:264938431096:web:02052e939a0b09ac65c38d"
    })
}
export const getUserData = async () => {
    let ref = Firebase.database().ref('/')
    return ref.once('value').then(snapshot => snapshot.val())
}

export const setUserData = userState => {
    Firebase.database().ref('/').set(userState)
}