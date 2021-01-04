/** @format */

import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import composedAuth from '../middlewares/composedAuth';
import App from '../components/App';
import Details from '../components/Details';
import reducers from '../reducers';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import ListCart from '../components/ListCart';
import ViewCourses from '../components/ViewCourses';
import DetailCourse from '../components/DetailCourse';
import Lecture from '../components/Lecture';
import ViewLecture from '../components/ViewLecture';
import SocialGoogle from '../components/SocialGoogle';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BecomeATeacher from '../components/BecomeATeacher/index';

export const history = createBrowserHistory({
  forceRefresh: true,
});
export const store = createStore(reducers, applyMiddleware(thunk));

export const Routes = () => (
  <Router>
    <Header />
    <div>
      <Route exact path='/' component={App} />
      <Route path='/signup' component={SignUp} />
      <Route path='/signin' component={SignIn} />
      <Route path='/detail' component={Details} />
      <Route path={`/detail/:id`} component={DetailCourse} />
      <Route path='/list-cart' component={composedAuth(ListCart)} />
      <Route path='/lecture' component={Lecture} />
      <Route path={`/view-lecture/:url`} component={ViewLecture} />
      <Route path='/view-courses' component={ViewCourses} />
      <Route path='/social-google' component={SocialGoogle} />
      <Route path='/become-a-teacher' component={BecomeATeacher} />
    </div>
    <Footer />
  </Router>
);
