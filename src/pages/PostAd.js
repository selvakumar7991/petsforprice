import React, {Component} from 'react';
import fb from '../images/fb.png';
import logo2 from '../images/logohome.png';
import close from '../images/close.png';
import google from '../images/google_p.png';
import dashbackground from '../images/dash-background.png';
import avatar from '../images/avatar.png';
import PostAdform from './PostAdform.js';
import footerlogo from '../images/logohome.png';
import ReactNotifications from 'react-notifications-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import '../css/price_range_style.css';
import '../css/jquery-ui.css'
import '../css/font-awesome.min.css'
import '../css/custom.css'
import 'react-notifications-component/dist/theme.css'
import '../css/owlcarousel/owl.theme.default.min.css'
import '../css/owlcarousel/owl.carousel.min.css'
import $ from 'jquery';
import jquery from 'jquery';
import {jsevent} from '../JsModule/Event';
import { withRouter,Link,useLocation,NavLink } from "react-router-dom";

window.$ = window.jQuery = jquery;

class PostAd extends React.Component{


  componentDidUpdate(){
    jsevent(); 
  }
  
  componentDidMount(){
   
    jsevent();
  }

    render() {
        return(
            <div>


{/* {alertmessage &&
                            <div className="alert alert-danger">{alertmessage}</div>
                        } */}
              <div class="iner_page">
            <div className="topbar"> 
          {/* Header  */}
          <div className="header">
            <div className="container po-relative">
              <nav className="navbar navbar-expand-lg hover-dropdown header-nav-bar"> <a  className="navbar-brand"><Link to="/"><img src={logo2} alt="Classified Plus" /></Link></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#h5-info" aria-expanded="false" aria-label="Toggle navigation"><i className="fa fa-bars" /></button>
                <div className="collapse navbar-collapse" id="h5-info">
                  <ul className="navbar-nav">
                    {/*-  <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="20-Post_Ad-Page.html#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Home </a>
              <ul class="b-none dropdown-menu font-14 animated fadeInUp">
                <li><a class="dropdown-item" href="01-Home-Page.html">Home1 </a></li>
                <li><a class="dropdown-item" href="02-Home-Page.html">Home2</a></li>
                <li><a class="dropdown-item" href="03-Home-Page.html">Home3</a></li>
              </ul>
            <li class="nav-item"> <a class="nav-link"  href="04-Category-Page.html">Category</a></li>
            <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="20-Post_Ad-Page.html#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Classified</a>
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
            <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="20-Post_Ad-Page.html#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a> -*/}
                    <ul className="b-none dropdown-menu font-14 animated fadeInUp">
                      <li><a className="dropdown-item" href="05-About_Us-Page.html">About Us</a></li>
                      <li><a className="dropdown-item" href="06-Blog-Page.html">Blog </a></li>
                      <li><a className="dropdown-item" href="07-Blog_Detail-Page.html">Blog Detail</a></li>
                      <li><a className="dropdown-item" href="20-Post_Ad-Page.html#" data-toggle="modal" data-target="#login">Register/Sign In</a></li>
                      <li><a className="dropdown-item" href="26-Faq-Page.html">Faq</a></li>
                      <li><a className="dropdown-item" href="27-Faq_Right-Category-Page.html">Faq Right Category</a></li>
                      <li><a className="dropdown-item" href="29-404-Page.html">404</a></li>
                      <li><a className="dropdown-item" href="30-404_With_Banner-Page.html">404 With Banner</a></li>
                    </ul>
                  </ul>
                  <div className="header_r d-flex">
                    <div className="loin hider"> <a className="nav-link"  data-toggle="modal" data-target="#login">Register/Sign In</a></div>
                    <ul className="ml-auto post_ad">
                      <li className="nav-item search"><NavLink className="nav-link" to="/postad">Post Your Ad</NavLink></li>
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
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true"><img src={close} alt="Classified Plus" /></span> </button>
                </div>
                <div className="modal-body">
                  <div className="list-unstyled list-inline social-login">
                    <a  className="facebook"> <img src={fb} alt="Classified Plus" />Continue wiith Facbook</a>
                    <a  className="google"> <img src={google} alt="Classified Plus" /> <span>Continue with Google</span></a>
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
                      <a >Forgot password?</a>
                    </div>
                  </div>
                </div>
                <div className="register text-center">Not a member yet? <a  data-toggle="modal" data-target="#register">Register</a></div>
              </div>
            </div>
          </div>
          {/* Modal */}
          <div className="modal fade" id="register" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Login to Classifieds Plus</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true"><img src={close} alt="Classified Plus" /></span> </button>
                </div>
                <div className="modal-body">
                  <div className="list-unstyled list-inline social-login">
                    <a  className="facebook"> <img src={fb} alt="Classified Plus" />Continue wiith Facbook</a>
                    <a  className="google"> <img src={google} alt="Classified Plus" /> <span>Continue with Google</span></a>
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
                <div className="register text-center">Already a member? <a >Login</a></div>
              </div>
            </div>
          </div>
          {/* End Header  */} 
        </div>
        <div className="iner_breadcrumb bg-light p-t-20 p-b-20">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a >Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Post Your Ad</li>
              </ol>
            </nav>
          </div>
        </div>
        <section className="dashboard_sec m-t-50">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="dashboard_menu">
                  <div className="dashbord_img">
                    <div className="dashboard_back"> <img className="img-fluid w-100" src={dashbackground} alt="Classified Plus" /> </div>
                    <div className="rounded_img"> <img className="img-fluid" src={avatar} alt="Avatar" /> </div>
                    <div className="aditya">Avatar </div>
                  </div>
                  {/*  <ul class="list-unstyled  m-t-20">
            <li><span><i class="fa fa-sliders"></i></span><a href="17-Dashboard-Page.html"> Dashboard </a></li>
            <li><span><i class="fa fa-cog"></i></span><a href="18-Profile-Page.html"> Profile Settings </a></li>
            <li class="active"><span><i class="fa fa-database"></i></span><a href="19-My_Ads-Page.html"> My Ads </a></li>
            <li><span><i class="fa fa-envelope"></i></span><a href="22-Offers_Messages-Page.html"> Offers/Messages </a></li>
            <li><span><i class="fa fa-shopping-cart"></i></span><a href="23-Payments-Page.html"> Payments </a></li>
            <li><span><i class="fa fa-heart"></i></span><a href="24-My_Favorits-Page.html"> My Favourites </a></li>
            <li><span><i class="fa fa-star"></i></span><a href="25-Prvacy_settings-Page.html"> Privacy Settings </a></li>
            <li><span><i class="fa fa-sign-in"></i></span><a href="20-Post_Ad-Page.html#"> Logout </a></li>
          </ul>*/}
                </div>
              </div>
              <ReactNotifications />
<PostAdform/>
              
            </div>
          </div>
        </section>
        {/* End Dashboard_sec */}
        {/* Footer */}
        <footer className="footer_all m-t-50">
          <div className="footer footer p-t-40">
            <div className="container spacer b-t">
              <div className="row">
                <div className="col-lg-4 col-md-4 m-b-30">
                  <h3 className="mb-3"> <img className="img-fluid" src={footerlogo} alt="footer-logo" /></h3>
                  <p> <p class="font-italic"> This site may help the need of pets breeder and pets lovers... , we would need your support by sharing your valuable feedback for further improvement </p></p>
                  {/* <ul class="list-unstyled d-flex p-0 soical-icon m-t-20">
            <li class="mr-2"><a href="20-Post_Ad-Page.html#"><i class="fa fa-facebook-f"></i> </a></li>
            <li class="mr-2"><a href="20-Post_Ad-Page.html#"><i class="fa fa-twitter"></i> </a></li>
            <li class="mr-2"><a href="20-Post_Ad-Page.html#"><i class="fa fa-pinterest"></i> </a></li>
            <li class="mr-2"><a href="20-Post_Ad-Page.html#"><i class="fa fa-google-plus"></i> </a></li>
            <li class="active"><a href="20-Post_Ad-Page.html#"><i class="fa fa-linkedin"></i> </a></li>
          </ul>*/}
                </div>
                <div className="col-lg-2 col-md-2 m-b-30">
                  <h3 className="mb-3">Quik Links </h3>
                  <ul className="p-0">
                    <li><a >Disclaimer</a></li>
                    {/* <li><a href="20-Post_Ad-Page.html#">Contact Us</a></li>
            <li><a href="20-Post_Ad-Page.html#">Careers</a></li>
            <li><a href="20-Post_Ad-Page.html#">All Cities</a></li>
            <li><a href="20-Post_Ad-Page.html#">Help & Support</a></li>
            <li><a href="20-Post_Ad-Page.html#">Advertise With Us</a></li>
            <li><a href="20-Post_Ad-Page.html#">Blog</a></li> */}
                  </ul>
                </div>
                <div className="col-lg-4 col-md-4 m-b-30">
                  <h3 className="mb-3">Subscribe us</h3>
                  {/*<p>We have over 15 years of experience </p>*/}
                  {/*<p>Our suppoer available to help you 24 hours a day, seven days week </p>*/}
                  <div className="input-group m-t-20">
                    <input className="form-control" placeholder="Enter email" aria-label="Recipient's username" type="text" />
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button"><i className="fa fa-check" /></button>
                    </div>
                  </div>
                  <p className="font-italic">We respect your privacy</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div class="top_awro pull-right" id="back-to-top" data-original-title="" title=""><i class="fa fa-chevron-up" aria-hidden="true"></i> </div>
        </div>
      

        </div>
      
        )
    }
  }

export default PostAd;