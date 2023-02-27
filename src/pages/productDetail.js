import React, {Component} from 'react';
import close from '../images/close.png';
import fb from '../images/fb.png';
import google from '../images/google_p.png';
import footer from '../images/logohome.png';
import logo2 from '../images/logohome.png';
import phone from '../images/iphone_6s.png'
import slide1 from '../images/aditya.png'
import $ from 'jquery';
import jquery from 'jquery';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Loader from 'react-loader-spinner'
import {nodeURL,protocol} from '../pages/constantval';
import banner3 from "../images/listingsbanner.jpg"
import { Helmet } from 'react-helmet';
import {jsevent} from '../JsModule/Event';

import '../css/plugins.css';
import '../css/style.css';
import {
   withRouter,
   NavLink,
   Link
} from "react-router-dom";




import '../css/owlcarousel/owl.theme.default.min.css'
import '../css/owlcarousel/owl.carousel.min.css'

window.$ = window.jQuery = jquery;


// const imagesData = (props) => {
//   let peopleToReturn = [];
//   // for (let i = 0; i < (this.state.pageView.finalCount); i++) {
//   for (let i = 0; i < props.finalCount; i++) {
//     peopleToReturn.push(   <figure className="product-gallery__thumb--single">
//     <img src={phone} alt="Products" />
//                               </figure>);
//   }
//   return peopleToReturn;
// }







class productDetail extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      id:'',
      category:'',
      latestAdList:[],
      pageView:[],
      peopleToReturn:[],
      photoIndex: 0,
      isOpen: false,
      isloader: true,
      
    };
  

  }


  handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    this.setState({ backgroundPosition: `${x}% ${y}%` })
  }

  OnClickViewButton =  (val) => {
       
  
    this.props.history.push("/productDetail/"+val.category+'/'+val._id); 
    window.location.reload();
  
  };


   imagesData = () => {
    let peopleToReturn = [];
     for (let i = 0; i < (this.state.pageView.finalCount); i++) {
      peopleToReturn.push(   <figure className="product-gallery__thumb--single">
      <img  src={protocol+'://'+nodeURL+'/api/photo/'+this.state.pageView._id+'/image'+i}  />
                                </figure>);
    }
    return peopleToReturn;
  };


  imagesarray = () => {
    let peopleToReturn = [];
     for (let i = 0; i < (this.state.pageView.finalCount); i++) {
      peopleToReturn.push( '//'+nodeURL+'/api/photo/'+this.state.pageView._id+'/image'+i);
    }
    return peopleToReturn;
  };

  imagesLargeData = () => {
    let peopleToReturn = [];
    for (let i = 0; i < (this.state.pageView.finalCount); i++) {
      peopleToReturn.push(    <figure className="product-gallery__image imageadd">
      <img  onClick={() => this.setState({ isOpen: true })} src={protocol+'://'+nodeURL+'/api/photo/'+this.state.pageView._id+'/image'+i}  className="img-responsive" style={{cursor: 'pointer'}}  />
    </figure> );
    }
    return peopleToReturn;
  };


  receivedData = async ()  => {
    
  
  
    const response =  await axios.get("/api/getrelatedad/"+this.props.match.params.category+"/"+this.props.match.params.id);
    this.setState({
    latestAdList: response.data,
    isloader: false,
    });
   

};

pageViewData = async ()  => {
      
 
  const response =  await axios.get("/api/pageview/"+this.props.match.params.id+"/"+this.props.match.params.category);
  this.setState({
    pageView: response.data[0],
  });
  
  
 
};



componentDidUpdate()
{

 
  
  jsevent();

  const script2 = document.createElement("script");

  script2.src = "js/plugins.js";
  // script2.async = true;

  document.body.appendChild(script2);
  const script3 = document.createElement("script");

  this.script = document.createElement("script");
  this.script.src = "js/main.js";
  // this.script.async = true;
  document.body.appendChild(this.script);

  // script3.src = "js/main.js"; 
  // script3.async = true;

  // document.body.appendChild(script3);
  // script3.onload = () => this.scriptLoaded();
  // this.script.onload = () => this.onScriptLoad();
//   if ($(window).width() < 768) {
//     ///alert('not zoom');
// } else {
   
//    //alert('zoom');
//    $(".imageadd").addClass('zoom');
//    //$('.zoom').zoom();
// }
}





  componentDidMount() {
    this.receivedData()
    this.pageViewData()
    jsevent();
 

   
    const script2 = document.createElement("script");

    script2.src = "js/plugins.js";
    script2.async = true;

    document.body.appendChild(script2);
    const script3 = document.createElement("script");

    script3.src = "js/main.js";
    script3.async = true;

    document.body.appendChild(script3);
  
   

  //   if ($(window).width() < 768) {
  //     ///alert('not zoom');
  // } else {
     
  //    //alert('zoom');
  //    $(".imageadd").addClass('zoom');
  //    //$('.zoom').zoom();
  // }

 

  }




  
 
//console.log()


    render() {
      
      const imagesData = this.imagesData();
      const imagesLargeData = this.imagesLargeData();
      const images = this.imagesarray();
      const { photoIndex, isOpen } = this.state;
      const adTitle ="Pets for sale - "+ (this.state.pageView.category)+" for sale - " +(this.state.pageView.adTitle);
      const Description ="Pets for sale - " +(this.state.pageView.category)+" for sale - " +(this.state.pageView.Description);
      const CanURL ="https://petsforprice.com"+this.props.match.url+"";
      const nextURL ="https://www.petsforprice.com"+this.props.match.url+"";

      
      return(

<div>
{this.state.isloader ?  <Loader type="Circles" className="loader-fixed" visible={this.state.isloader}  color="#00a651" height={120} width={120} timeout={12000} />   : 
   <React.Fragment>
  <Helmet>
   <title>{adTitle} </title>
   <meta name="title" content={adTitle} />
<meta name="description" content={Description} />
<meta name="keywords" content={Description}  />
<link rel="canonical" href={CanURL}/> 
<link rel="next" href={nextURL}/>



   </Helmet>
  <div>      
<div class="iner_page listing_left_sidebar">
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
              <li><a className="dropdown-item" >About Us</a></li>
              <li><a className="dropdown-item">Blog </a></li>
              <li><a className="dropdown-item" >Blog Detail</a></li>
              <li><a className="dropdown-item"  data-toggle="modal" data-target="#login">Register/Sign In</a></li>
              <li><a className="dropdown-item" >Faq</a></li>
              <li><a className="dropdown-item">Faq Right Category</a></li>
              <li><a className="dropdown-item" >404</a></li>
              <li><a className="dropdown-item" >404 With Banner</a></li>
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
            <a className="google"> <img src={google} alt="Classified Plus" /> <span>Continue with Google</span></a>
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
{/* banner */}





            <section className="slider">
              <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner mobileonly">
                  <div className="carousel-item active"> <img src={banner3} alt="Classified Plus" className="slide-image" />
                    <div className="slide-text">
                    



                    </div>
                  </div>
                
                </div>
                <a className="carousel-control-prev"  role="button" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true" /> <span className="sr-only">Previous</span> </a> <a className="carousel-control-next"  role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true" /> <span className="sr-only">Next</span> </a> </div>
            </section>
{/* End banner */} 


    {/* breadcrumb */}
    <div className="iner_breadcrumb p-t-20 p-b-20">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a >Home</a></li>
                <li className="breadcrumb-item"><a >Detail</a></li>
    <li className="breadcrumb-item active" aria-current="page">{this.state.pageView.category}</li>
              </ul>
            </nav>
          </div>
        </div>
        {/* End breadcrumb */}
        {/* Detail_part */}


        { this.state.pageView._id  ?



        <section className="detail_part m-t-50">
          <div className="container">
            <div className="row">

            {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <div className="detail_box"> <img className="img-fluid" src={phone} alt="Classified Plus" />
          <div className="m-t-20">
            <ul className="owl-carousel list-unstyled m-b-0" id="product_slider">
              <li> <img className="img-fluid" src={phone} alt="slide 1" /> </li>
              <li> <img className="img-fluid" src={slide1} alt="slide 2" /> </li>
            </ul>
          </div>
        </div>
      </div> */}

<div className="col-md-6 product-main-image">
        <input type="hidden" defaultValue={0} id="outstock" />
        <div className="product-image">
          <div className="product-gallery vertical-slide-nav">
            <div className="product-gallery__thumb">
               <div className="product-gallery__thumb--image">
                <div className="nav-slider slick-vertical" data-options="{
                                            &quot;vertical&quot;: true,   
                                            &quot;vertical_md&quot;: false, 
                                            &quot;infinite_md&quot;: false, 
                                            &quot;slideToShow_sm&quot;: 4,
                                            &quot;slideToShow_xs&quot;: 3,
                                            &quot;arrows&quot;: true,
                                            &quot;arrowPrev&quot;: &quot;fa fa-angle-up&quot;,
                                            &quot;arrowNext&quot;: &quot;fa fa-angle-down&quot;,
                                            &quot;arrowPrev_md&quot;: &quot;dl-icon-left&quot;,
                                            &quot;arrowNext_md&quot;: &quot;dl-icon-right&quot;
                                            }">

   {imagesData}
                                             
                    {/* <div className="product-gallery__thumb--single">
                    
                                              </div>   */}
                

                </div>
              </div> 
            </div>
            <div className="product-gallery__large-image">
              { <div className="gallery-with-thumbs">
                <div className="product-gallery__wrapper">
                  <div className="main-slider product-gallery__full-image image-popup">
                      {/* { <figure className="product-gallery__image imageadd">
                      <img src={slide1} alt="Product" className="img-responsive" />
                    </figure> }   */}
                 {imagesLargeData} 

                 {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length
              })
            }
          />
        )}
                  </div>
                </div>
              </div> }
            </div>
          </div>
        </div>
      </div>


              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="detail_box">
                  <div className="detail_head">
                    <h3> {this.state.pageView.adTitle}
                       </h3>
                    <ul className="list-unstyled text-capitalize m-b-0 m-t-15">
                      <li className="d-inline-block p-r-20"><a > <i className="fa fa-clock-o" /> <span> {this.state.pageView.PublishDate} </span></a> </li>
                    </ul>
                  </div>
                  <ul className="list-unstyled d-inline-block float-left detail_left m-b-0">
                    <li>Name :</li>
                    <li>Mobile Number :</li>
                    <li>City :</li>
                    <li>Location :</li>
                    <li>Transporation :</li>
                  </ul>
                  <ul className="list-unstyled d-inline-block m-l-40 detail_right  m-b-0">
                    <li>{this.state.pageView.Name}</li>
                    <li>{this.state.pageView.phone}</li>
                    <li>{this.state.pageView.city}</li>
                    <li>{this.state.pageView.Location}</li>
                    <li>Check with Seller</li>
                  </ul>
                  <div className="detail_prize p-t-10">
                    <ul className="list-unstyled">
                      <li className="d-inline-block pr-3"> Deal Price Price : </li>
                      <li className="d-inline-block Price_m"> <li>{this.state.pageView.priceInt}{this.state.pageView.priceStr}</li> </li>
                    </ul>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section> :

<h3><center> No advertisement is available.. Please go to homepage </center></h3>
   }



{this.state.pageView._id  ?

       
        <section className="description">
          <div className="container"> 
            {/* Row  */}
            <div className="row justify-content-left">
              <div className="col-md-7 text-left">
                <h2 className="title">Description</h2>
              </div>
            </div>
            {/* Row  */}
            <div className="row">
              <div className="col-md-9">
                <div className="description_box">
                  <p>{this.state.pageView.Description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

:''
   }

      {this.state.pageView._id  ? 
        <section className="top_listings">
          <div className="container"> 
            {/* Row  */}
            <div className="row justify-content-center">
              <div className="col-md-7 text-center m-b-10">
                <h2 className="title">Related Ads</h2>
              </div>
            </div>
            {/* Row  */}
            <div className="row">
            {this.state.latestAdList && this.state.latestAdList.length ?
                        this.state.latestAdList.map((val,key)=>{
  
                         // var datacontent=JSON.parse((val.data));
                      //     var i;
                      //    //console.log(datacontent)
                      //    for ( i = 0; i < parseInt(datacontent.fileCount); i++) {
                      //  imagesdata.push('http://localhost:5000/photo/'+val._id+'/image'+i )
                      //   }
                      //   imagesdata=[];
                      //   console.log(imagesdata)
                         return (
                        
                          //  <li><label onClick={()=>{this.handleSearchChange(val.cities[0].name+", "+val.name+" ,"+val.country_name)}}>{val.cities[0].name+", "+val.name+" ,"+val.country_name}</label></li>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                            <div className="featured-parts rounded m-t-30">
                              <div className="featured-img">
                              <img className="img-fluid rounded-top" src={protocol+'://'+nodeURL+'/api/photo/'+val._id+'/image0'}  />
                             
                              </div>
                              <div className="featured-text">
                                <div className="text-top d-flex justify-content-between ">
                                  <div className="heading"><p> <a > {val.priceInt}{val.priceStr}  </a>- {val.city}</p> </div>
                                </div>
                                <div className="text-stars m-t-5">
                                  <p>{val.adTitle}</p>
                                </div>
                                <div className="featured-bottum m-t-30">
                                  <ul className="d-flex justify-content-between list-unstyled m-b-20">
                                    <li><a > {val.PublishDate} </a></li>
                                    <li><button type="button" onClick={this.OnClickViewButton.bind(this,val)} className="btn btn-outline-primary" style={{fontWeight: 'bold', fontSize: '13px'}}><bold>VIEW</bold></button> </li>
                                  </ul>
                                </div>			
                              </div>
                            </div>
                            </div>
  );
  }):
  <h3> No Latest Advertisement... Please try it latter</h3>
   }







            </div>
          </div>
        </section>

:''
}
        {/* End top_listings */}










{/* Footer */}
<footer className="footer_all">
  <footer className="footer_all m-t-50">
    <div className="footer footer p-t-40">
      <div className="container spacer b-t">
        <div className="row">
          <div className="col-lg-4 col-md-4 m-b-30">
            <h3 className="mb-3"> <img className="img-fluid" src={footer} alt="footer-logo" /></h3>
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
</footer>
</div>
<div className="top_awro pull-right" id="back-to-top" data-original-title="" title=""><i class="fa fa-chevron-up" aria-hidden="true"></i> </div>
   </div>
   </React.Fragment>
    }
</div>
      )
    }
  }

export default withRouter(productDetail);