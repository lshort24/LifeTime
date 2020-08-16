import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateIsSignedIn } from '../store/actions';
import { signOut } from '../api/GoogleAuth';

const Header = (props) => {
   const handleSignOutClick = () => {
      signOut().then(() => {
          props.updateIsSignedIn(false);
      });
   };

   const displayGreeting = () => {
      if (!props.isSignedIn) {
         return null;
      }

      return (
         <div className="ui secondary menu">
            <div className="item">Welcome {props.name}</div>
            <button className="ui button basic" onClick={handleSignOutClick}>
               Sign Out
            </button>
         </div>
      );
   };

   return (
      <div className="ui secondary menu">
         <Link to="/" className="item">
            <h1 className="ui header">LifeTime</h1>
         </Link>
         <div className="item right">
            {displayGreeting()}
         </div>
      </div>
   );
};

const mapStateToProps = (state) => {
   return {
      isSignedIn: state.auth.isSignedIn,
      name: state.auth.name
   }
};

const mapDispatchToProps = { updateIsSignedIn }
export default connect(mapStateToProps, mapDispatchToProps)(Header);