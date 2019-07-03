import React from 'react';
import '../../stylesheets/_HomePage.scss';
import { Link } from 'react-router-dom';

const HomePage = props => {
  return (
    <section className="HomePage">
      Welcome to SecArmy Eduaction!
      <Link to="/mcq" className="next-btn">
        Take Test
      </Link>
    </section>
  );
};

export default HomePage;
