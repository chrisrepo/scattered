import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
const RouteWrap = ({ children, ws }) => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const to = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(to);
    };
  }, []);
  /*if (ws === null || isLoading) {
    return <LoadingSpinner size={100} />; // TODO: Better load screen
  }*/
  let showLoad = ws === null || isLoading;
  console.log('show load: ', showLoad);
  return (
    <React.Fragment>
      <LoadingSpinner loading={showLoad} size={100} />
      {!showLoad && children}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  ws: state.connection,
});
export default connect(mapStateToProps, {})(RouteWrap);
