import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   const googleAuth = window.gapi.auth2.getAuthInstance();
   const googleUser = googleAuth.currentUser.get();
   const profile = googleUser.getBasicProfile();
   const name = profile.getGivenName();

   const handleSignOutClick = () => {
      const googleAuth = window.gapi.auth2.getAuthInstance();
      googleAuth.signOut();
   };

   return (
      <div className="ui secondary pointing menu">
         <Link to="/" className="item">
            LifeTime
         </Link>
         <div className="right menu">
            Welcome {name}
            <a href="#" onClick={handleSignOutClick}>Sign Out</a>
         </div>
      </div>
   );
};

export default Header;