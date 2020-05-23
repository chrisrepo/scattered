import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
const RouteWrap = ({ children, ws }) => {
  // TODO: Maybe we shift this somewhere else
  //    right now it's not generic, it just sits on top..
  //    need to think of a way for individual components to leverage this where they can pass whether or not load should show.
  //    TLDR: THIS COMPONENT SHOULD NOT CONTROL IF THE LOAD STATE SHOWS. It should accept whether to show load, or show children
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
const mapStateToProps = (state) => ({
  ws: state.connection,
});
export default connect(mapStateToProps, {})(RouteWrap);
