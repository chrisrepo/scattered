import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
const RouteWrap = ({ children, ws, lobby, checkLoggedIn }) => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const to = setTimeout(() => {
      setLoading(false);
    }, 10);

    return () => {
      clearTimeout(to);
    };
  }, []);
  let showLoad = ws === null || isLoading;
  return (
    <React.Fragment>
      <LoadingSpinner loading={showLoad} size={100} />
      {!showLoad && children}
    </React.Fragment>
  );
};

/* const roomHasUser = (ws, lobby) => {
  if (lobby.roomId !== undefined && lobby.roomData !== undefined) {
    let users = lobby.roomData[lobby.roomId].users;
    console.log(users, lobby.roomData[lobby.roomId]);
    if (users && users[ws.id] !== undefined) {
      return true;
    }
  }
  return false;
}; */

const mapStateToProps = (state) => ({
  ws: state.connection,
  lobby: state.lobby,
});
export default connect(mapStateToProps, {})(RouteWrap);
