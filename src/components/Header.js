import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
   const handleSignOutClick = () => {
      const googleAuth = window.gapi.auth2.getAuthInstance();
      googleAuth.signOut();
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

export default Header;