import React from 'react';
import { connect } from 'react-redux';
import { fetchTimeSpans } from '../store/actions';

class TimelineList extends React.Component {
   componentDidMount() {
      this.props.fetchTimeSpans();
   }

   renderList() {
      return this.props.timeSpans.map(timeSpan => {
         return (
            <div className="item" key={`${timeSpan.timeline.id}.${timeSpan.id}`}>
               {timeSpan.name}
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
      timeSpans: state.auth.timeSpans
   }
};

export default connect(mapStateToProps, { fetchTimeSpans })(TimelineList);