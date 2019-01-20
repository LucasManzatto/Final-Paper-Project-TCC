// Import FirebaseAuth and firebase.
import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'

const uiConfig = {
// Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInSuccessUrl: '/Home',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID, firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID, firebase.auth.GithubAuthProvider.PROVIDER_ID]
}

export default class FireBaseLoginPage extends React.Component {
  render () {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    )
  }
}
