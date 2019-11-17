import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, updateName } from '../store/actions';

import { BrowserRouter, Route } from 'react-router-dom';

import SignIn from './SignIn';
import Header from './Header';
import Timeline from "./TimelineList";

class App extends React.Component {
   constructor() {
      super();
      this.googleAuth = null;
   }

   componentDidMount() {
      // Determine if the user is logged in or not
      window.gapi.load('auth2', () => {
         window.gapi.auth2.init({
            clientId: '224787910667-sreuueohouh5b97buebkr3gpvp63d5lp.apps.googleusercontent.com'
         }).then(() => {
            this.googleAuth = window.gapi.auth2.getAuthInstance();

            // Listen for sign in changes
            this.googleAuth.isSignedIn.listen((isSignedIn) => {
               this.onAuthChange(isSignedIn);
            });

            this.onAuthChange(this.googleAuth.isSignedIn.get());
         });
      });
   }

   onAuthChange(isSignedIn) {
      if (isSignedIn) {
         const googleUser = this.googleAuth.currentUser.get();
         const profile = googleUser.getBasicProfile();
         const name = profile.getGivenName();
         this.props.signIn();
         this.props.updateName(name);
      }
      else {
         this.props.signOut();
      }
   };

   display_content() {
      if (this.props.isSignedIn === null) {
         return (
            <div className="ui segment">
               <div className="ui active inverted dimmer">
                  <div className="ui text loader">Loading</div>
               </div>
               <div className="ui placeholder">
                  <div className="paragraph">
                     <div className="line">&nbsp;</div>
                     <div className="line">&nbsp;</div>
                     <div className="line">&nbsp;</div>
                     <div className="line">&nbsp;</div>
                     <div className="line">&nbsp;</div>
                  </div>
               </div>
            </div>
         );
      }

      if (!this.props.isSignedIn) {
         return <SignIn />
      }

      return (
         <Route path="/" exact component={Timeline} />
      );
   };

   render() {
      return (
         <div className="ui container">
            <BrowserRouter>
               <div>
                  <Header />
                  <div className="ui divider"></div>
                  {this.display_content()}
               </div>
            </BrowserRouter>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isSignedIn: state.auth.isSignedIn
   }
};

export default connect(mapStateToProps, { signIn, signOut, updateName })(App);