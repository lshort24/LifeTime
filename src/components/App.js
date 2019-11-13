import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SignIn from './SignIn';
import Header from './Header';
import Timeline from "./Timeline";

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: true,
         isSignedIn: false
      }
   }

   componentDidMount() {
      // Determine if the user is logged in or not
      window.gapi.load('auth2', () => {
         window.gapi.auth2.init({
            clientId: '224787910667-sreuueohouh5b97buebkr3gpvp63d5lp.apps.googleusercontent.com'
         }).then(() => {
            const googleAuth = window.gapi.auth2.getAuthInstance();
            const signedIn = googleAuth.isSignedIn.get();
            this.setState({
               isSignedIn: signedIn,
               loading: false
            });

            // Listen for sign in changes
            googleAuth.isSignedIn.listen((signedIn) => {
               this.setState({
                  isSignedIn: signedIn
               })
            });
         });
      });
   }

   render() {
      if (this.state.loading) {
         return <div>Loading...</div>
      }

      if (!this.state.isSignedIn) {
         return <SignIn />
      }

      return (
         <div className="ui container">
            <BrowserRouter>
               <div>
                  <Header />
                  <Route path="/" exact component={Timeline} />
               </div>
            </BrowserRouter>
         </div>
      );
   }
}

export default App;