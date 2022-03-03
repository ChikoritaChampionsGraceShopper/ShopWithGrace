import React from 'react';

const HomePage = () => {
  return (
    <div>
      <div className='header'>
        <div className='home-menu pure-menu pure-menu-horizontal pure-menu-fixed'>
          <a className='pure-menu-heading' href=''>
            Your Site
          </a>

          <ul className='pure-menu-list'>
            <li className='pure-menu-item pure-menu-selected'>
              <a href='#' className='pure-menu-link'>
                Home
              </a>
            </li>
            <li className='pure-menu-item'>
              <a href='#' className='pure-menu-link'>
                Tour
              </a>
            </li>
            <li className='pure-menu-item'>
              <a href='#' className='pure-menu-link'>
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='splash-container'>
        <div className='splash'>
          <h1 className='splash-head'>Big Bold Text</h1>
          <p className='splash-subhead'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
          <p>
            <a
              href='http://purecss.io'
              className='pure-button pure-button-primary'
            >
              Get Started
            </a>
          </p>
        </div>
      </div>

      <div className='content-wrapper'>
        <div className='content'>
          <h2 className='content-head is-center'>
            Excepteur sint occaecat cupidatat.
          </h2>

          <div className='pure-g'>
            <div className='l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4'>
              <h3 className='content-subhead'>
                <i className='fa fa-rocket'></i>
                Get Started Quickly
              </h3>
              <p>
                Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse
                sodales pellentesque elementum.
              </p>
            </div>
            <div className='l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4'>
              <h3 className='content-subhead'>
                <i className='fa fa-mobile'></i>
                Responsive Layouts
              </h3>
              <p>
                Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse
                sodales pellentesque elementum.
              </p>
            </div>
            <div className='l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4'>
              <h3 className='content-subhead'>
                <i className='fa fa-th-large'></i>
                Modular
              </h3>
              <p>
                Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse
                sodales pellentesque elementum.
              </p>
            </div>
            <div className='l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4'>
              <h3 className='content-subhead'>
                <i className='fa fa-check-square-o'></i>
                Plays Nice
              </h3>
              <p>
                Phasellus eget enim eu lectus faucibus vestibulum. Suspendisse
                sodales pellentesque elementum.
              </p>
            </div>
          </div>
        </div>

        <div className='ribbon l-box-lrg pure-g'>
          <div className='l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5'>
            <img
              width='300'
              alt='File Icons'
              className='pure-img-responsive'
              src='/img/common/file-icons.png'
            />
          </div>
          <div className='pure-u-1 pure-u-md-1-2 pure-u-lg-3-5'>
            <h2 className='content-head content-head-ribbon'>
              Laboris nisi ut aliquip.
            </h2>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
            </p>
          </div>
        </div>

        <div className='content'>
          <h2 className='content-head is-center'>
            Dolore magna aliqua. Uis aute irure.
          </h2>

          <div className='pure-g'>
            <div className='l-box-lrg pure-u-1 pure-u-md-2-5'>
              <form className='pure-form pure-form-stacked'>
                <fieldset>
                  <label for='name'>Your Name</label>
                  <input id='name' type='text' placeholder='Your Name ' />

                  <label for='email'>Your Email</label>
                  <input id='email' type='email' placeholder='Your Email' />

                  <label for='password'>Your Password</label>
                  <input
                    id='password'
                    type='password'
                    placeholder='Your Password'
                  />

                  <button type='submit' className='pure-button'>
                    Sign Up
                  </button>
                </fieldset>
              </form>
            </div>

            <div className='l-box-lrg pure-u-1 pure-u-md-3-5'>
              <h4>Contact Us</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <h4>More Information</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className='footer l-box is-center'>
          View the source of this layout to learn more. Made with love by the
          Pure Team.
        </div>
      </div>
    </div>
  );
};

export default HomePage;
