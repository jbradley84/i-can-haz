import React from "react";
import CollectionList from '../components/CollectionList';
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';


const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }


  if (!user?.username) {
    return (
      <h4 className="prof-warning">
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  
  return (
    <div>
      <div>
        <h2>
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
      </div>

      <div>
        <div>
          <CollectionList
            collections={user.collections}
            title={`${user.username}'s collections...`}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;