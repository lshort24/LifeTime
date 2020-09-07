import React from 'react';
import { connect } from 'react-redux';
import { updateIsSignedIn, updateName, updateAuthError } from '../store/actions';
import { googleApiInit, isSignedIn, authenticate, getName } from '../api/googleAuth';
import { googleClientId } from '../secrets';
import { BrowserRouter, Route } from 'react-router-dom';

import SignIn from './SignIn';
import Header from './Header';
import TimelineList from "./TimelineList";

class App extends React.Component {
   componentDidMount() {
      googleApiInit(googleClientId).then(() => {
         if (isSignedIn()) {
            authenticate().then((response) => {
               if (response.authenticated) {
                  this.props.updateIsSignedIn(true);
                  this.props.updateName(getName());
               }
               else {
                  this.props.updateIsSignedIn(false);
                  this.props.updateAuthError(response.failReason);
               }
            }).catch((error) => {
               console.log("Not authenticated", error);
               this.props.updateIsSignedIn(false)
            })
         }
         else {
            this.props.updateIsSignedIn(false);
         }
      }, (error) => {
         console.log("Could not initialize Google authentication.", error);
      });
   }

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
          <React.Fragment>
             <Route path="/" exact component={TimelineList} />
             <Route path="/lifetime" exact component={TimelineList} />
          </React.Fragment>
      );
   };

   render() {
      return (
         <div className="ui container">
            <BrowserRouter>
               <div>
                  <Header />
                  <div className="ui divider">&nbsp;</div>
                  {this.display_content()}
               </div>
            </BrowserRouter>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isSignedIn: state.auth.isSignedIn,
      authError: state.auth.authError
   }
};

const mapDispatchToProps = {
   updateIsSignedIn,
   updateName,
   updateAuthError
}
export default connect(mapStateToProps, mapDispatchToProps)(App);