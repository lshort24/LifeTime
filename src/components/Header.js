import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../store/actions';

const Header = (props) => {
   const handleSignOutClick = () => {
      props.signOut();
   };

   const displayGreeting = () => {
      if (!props.isSignedIn) {
         return null;
      }

      return (
         <div>
            Welcome {props.name}
            <button onClick={handleSignOutClick}>Sign Out</button>
         </div>
      );
   };

   return (
      <div className="ui secondary pointing menu">
         <Link to="/" className="item">
            LifeTime
         </Link>
         <div className="right menu">
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

export default connect(mapStateToProps, { signOut })(Header);