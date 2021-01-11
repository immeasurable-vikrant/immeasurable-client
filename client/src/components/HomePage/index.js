import _ from 'lodash';
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CourseDetail from '../../common-components/courseDetail/courseDetail.component';
import Loader from '../../common-components/loader/loader.component';
import './index.scss';
import '../../index.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  text: {
    fontStyle: 'helvetica',
    fontSize: '24px',
    lineHeight: '29px',
    color: '#3c3b37',
    fontWeight: '700',
    padding: '16px',
  },
}));

const HomePage = ({ isLoading, courses, hasError }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <Fragment>
      <h1 className={classes.text}>Browse All Courses</h1>
      <div className={classes.root}>
        {hasError ? (
          <div className='alert alert-danger'>
            <div style={{ textAlign: 'center' }}>
              <strong>There was a loading error</strong>
            </div>
          </div>
        ) : matches ? (
          <Fragment>
            <Carousel breakPoints={breakPoints}>
              {_.map(courses, (course, i) => {
                return <CourseDetail key={course.id} course={course} />;
              })}
            </Carousel>
          </Fragment>
        ) : (
          <div className='horizontal_slider'>
            <div className='slider_container'>
              {_.map(courses, (course, i) => {
                return (
                  <div key={i} className='item'>
                    <CourseDetail key={course.id} course={course} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div>{isLoading && <Loader />}</div>
    </Fragment>
  );
};

HomePage.propTypes = {
  isLoading: PropTypes.bool,
  hasError: PropTypes.string,
  courses: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    hasError: state.paginate.error,
    isLoading: state.paginate.loading,
    courses: state.paginate.courses,
  };
};

export default withRouter(connect(mapStateToProps, null)(HomePage));
