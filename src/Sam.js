import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
/*import './App.css';*/

function Sam() {
  return (

    <div className="topbar"> 
    {/* Header  */}
    <div className="header">
      <div className="container po-relative">
        <nav className="navbar navbar-expand-lg hover-dropdown header-nav-bar"> <a href="01-Home-Page.html" className="navbar-brand"><img src="images/logo.png" alt="Classified Plus" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#h5-info" aria-expanded="false" aria-label="Toggle navigation"><i className="fa fa-bars" /></button>
          <div className="collapse navbar-collapse" id="h5-info">
            {/*  <ul class="navbar-nav">
        <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="03-Home-Page.html#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Home </a>
          <ul class="b-none dropdown-menu font-14 animated fadeInUp">
            <li><a class="dropdown-item" href="01-Home-Page.html">Home1 </a></li>
            <li><a class="dropdown-item" href="02-Home-Page.html">Home2</a></li>
            <li><a class="dropdown-item" href="03-Home-Page.html">Home3</a></li>
          </ul>
        <li class="nav-item"> <a class="nav-link"  href="04-Category-Page.html">Category</a></li>
        <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="03-Home-Page.html#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Classified</a>
          <ul class="b-none dropdown-menu font-14 animated fadeInUp">
            <li><a class="dropdown-item" href="08-Listing_Top_serch-Page.html">Listing Top serch</a></li>
            <li><a class="dropdown-item" href="09-Listing_left-sidebar-Page.html">Listing left sidebar</a></li>
            <li><a class="dropdown-item" href="10-Listing_Top_serchbar-Page.html">Listing Top serchbar</a></li>
            
            <li><a class="dropdown-item" href="11-List_View_Listing-Page.html">List View Listing</a></li>
            <li><a class="dropdown-item" href="12-Datile_banner-Page.html">Datile Banner</a></li>
            <li><a class="dropdown-item" href="13-Datile_Without_banner-Page.html">Datile Without Banner</a></li>
            
                            <li><a class="dropdown-item" href="14-Datile_banner_in_slider-Page.html">Datile banner In slider</a></li>
          </ul>
        </li>
        
        <li class="nav-item"> <a class="nav-link"  href="28-Contact_Us-Page.html">Help/Support</a></li>
        <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="03-Home-Page.html#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
          <ul class="b-none dropdown-menu font-14 animated fadeInUp">
          <li><a class="dropdown-item" href="05-About_Us-Page.html">About Us</a></li>
            <li><a class="dropdown-item" href="06-Blog-Page.html">Blog </a></li>
            <li><a class="dropdown-item" href="07-Blog_Detail-Page.html">Blog Detail</a></li>
            <li><a class="dropdown-item" href="03-Home-Page.html#" data-toggle="modal" data-target="#login">Register/Sign In</a></li>
            <li><a class="dropdown-item" href="26-Faq-Page.html">Faq</a></li>
            <li><a class="dropdown-item" href="27-Faq_Right-Category-Page.html">Faq Right Category</a></li>
            <li><a class="dropdown-item" href="29-404-Page.html">404</a></li>
            <li><a class="dropdown-item" href="30-404_With_Banner-Page.html">404 With Banner</a></li>
          </ul>
        </li>
      </ul>  --*/}
            <div className="header_r d-flex">
              <div className="loin"> <a className="nav-link" href="03-Home-Page.html#" data-toggle="modal" data-target="#login"><i className="fa fa-user m-r-5" />Register/Sign In</a></div>
              <ul className="ml-auto post_ad">
                <li className="nav-item search"><a className="nav-link" href="20-Post_Ad-Page.html">Post Your Ad</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
    {/* Modal */}
    <div className="modal fade" id="login" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login to Classifieds Plus</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true"><img src="images/close.png" alt="Classified Plus" /></span> </button>
          </div>
          <div className="modal-body">
            <div className="list-unstyled list-inline social-login">
              <a href="03-Home-Page.html#" className="facebook"> <img src="images/fb.png" alt="Classified Plus" />Continue wiith Facbook</a>
              <a href="03-Home-Page.html#" className="google"> <img src="images/google_p.png" alt="Classified Plus" /> <span>Continue with Google</span></a>
            </div>
            <div className="or-divider">
              <h6>or</h6>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group has-feedback">
                  <input type="text" className="form-control" name="log_username" placeholder="Email/Username" />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group has-feedback">
                  <input type="password" className="form-control" name="log_password" placeholder="Password" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="buttons login_btn" name="login" value="Login">
                Continue 
              </button>
            </div>
            <div className="form-info">
              <div className="md-checkbox">
                <input type="checkbox" name="rememberme" id="rememberme" defaultValue="forever" />
                <label htmlFor="rememberme" className>Remember me</label>
              </div>
              <div className="forgot-password">
                <a href="03-Home-Page.html#">Forgot password?</a>
              </div>
            </div>
          </div>
          <div className="register text-center">Not a member yet? <a href="03-Home-Page.html#" data-toggle="modal" data-target="#register">Register</a></div>
        </div>
      </div>
    </div>
    {/* Modal */}
    <div className="modal fade" id="register" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login to Classifieds Plus</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true"><img src="images/close.png" alt="Classified Plus" /></span> </button>
          </div>
          <div className="modal-body">
            <div className="list-unstyled list-inline social-login">
              <a href="03-Home-Page.html#" className="facebook"> <img src="images/fb.png" alt="Classified Plus" />Continue wiith Facbook</a>
              <a href="03-Home-Page.html#" className="google"> <img src="images/google_p.png" alt="Classified Plus" /> <span>Continue with Google</span></a>
            </div>
            <div className="or-divider">
              <h6>or</h6>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group has-feedback">
                  <input type="text" className="form-control" name="log_username" placeholder="Name" />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group has-feedback">
                  <input type="number" className="form-control" id="Phone_No" name="log_password" placeholder="Number" />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group has-feedback">
                  <input type="Email" className="form-control" id="Email" name="Email" placeholder="Email" />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group has-feedback">
                  <input type="password" className="form-control" name="log_password" placeholder="Password" />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group has-feedback">
                  <input type="password" className="form-control" id="Confirm_password" name="Confirm_password" placeholder="Confirm Password" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="buttons login_btn" name="login" value="Login">
                Continue 
              </button>
            </div>
            <div className="form-info">
              <p className="text-center p-b-10">By Register I agree to receive emails.</p>
            </div>
          </div>
          <div className="register text-center">Already a member? <a href="03-Home-Page.html#">Login</a></div>
        </div>
      </div>
    </div>
    {/* End Header  */} 
  </div>
  );
}

export default Sam;
