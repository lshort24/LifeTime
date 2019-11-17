import React from 'react';
import { connect } from 'react-redux';
import { fetchTimelines } from '../store/actions';

class Timeline extends React.Component {
   componentDidMount() {
      this.props.fetchTimelines();
   }

   renderList() {
      return this.props.timelines.map(timeline => {
         return (
            <div className="item" key={timeline.name}>
               {timeline.name}
            </div>
         );
      })
   }

   render() {
      return (
         <div className="ui relaxed divided list">
            {this.renderList()}
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      timelines: state.auth.timelines
   }
};

export default connect(mapStateToProps, { fetchTimelines })(Timeline);