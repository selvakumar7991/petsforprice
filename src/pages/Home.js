import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import jquery from 'jquery';
import {jsevent} from '../JsModule/Event';

import logo from "../images/homelogo.png"
import close from "../images/close.png"
import fb from "../images/fb.png"
import google from "../images/google_p.png"
import banner3 from "../images/homebanner.jpg"
import Vehicles from "../images/dogs.png"
import Electronics  from "../images/cats.png"
import Mobiles from "../images/fish2.png"
import Furnitue from "../images/birds2.png"
import Fashion from "../images/others3.png"
import jobs from "../images/accessories2.png"
import footer from "../images/logohome.png"
import ReactPaginate from 'react-paginate'
import Loader from 'react-loader-spinner'
import {nodeURL,protocol} from '../pages/constantval';
import PostAd from './PostAd';
import { Helmet } from 'react-helmet';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import { withRouter } from "react-router-dom";

window.$ = window.jQuery = jquery;


let getCount = new Map();



class Home extends React.Component{
    constructor(props) {
      super(props);
      
      this.state = {
        latestAdList:[],
        countryList: [],
        city:'',
        isViewall : 'sample',
        offset: 0,
        data: [],
        perPage: 16,
        currentPage: 1,
        pageCount:1,
        keyword:'',
        cityname:'',
        category:'',
        isloader: true,
        countofcategory: new Map(),
        
      }
      this.handlePageClick = this.handlePageClick.bind(this);
      this.onChangekeyword = this.onChangekeyword.bind(this);
      this.onChangeCategory = this.onChangeCategory.bind(this);
      this.onChangeCity = this.onChangeCity.bind(this);
    }
  
      handlePageClick = (e) => {
        const selectedPage = (e.selected+1);
        
        this.setState({
            currentPage: selectedPage,
           
        }, () => {
            this.receivedData()
        });
  
      };
  
  
    receivedData = async ()  => {
      
      const response =  await axios.get("/api/getpostadd/"+this.state.currentPage);
    //  console.log(response.data)
      this.setState({
      latestAdList: response.data,
      isloader: false,
       
      });

      
     
  };
  

  onChangekeyword(event) {
      
    const value =event;

  this.setState({
  keyword:value
  });

}

onChangeCategory(value) {

this.setState({
  category:value
});

}


onChangeCity(value) {

  this.setState({
    cityname:value
  });
  
  }
  
  handleSearchChange = value => { 
  
    this.setState({
      city: value,
      countryList: [],
    });
  }
  
  onchangecountrysearch = async()  => {
  
  const response = await axios.get("/api/citylist");
  this.setState({
    countryList: response.data
  });
  

  
  }
  

  OnClickSearchViewButton =  async () => {
   
       
  
    this.props.history.push("/listingSearch?keyword="+ this.state.keyword+"&city="+this.state.cityname+"&category="+this.state.category); 

  };

  OnClickViewButton =  (val) => {
       
  
    this.props.history.push("/productDetail/"+val.category+'/'+val._id); 

  };
  
  
      handleViewall = async event => {
       
  
        this.setState({
          isViewall: false,
        });
  
      };
  
    //   getData =async ()  => {
        
     
     //  const response =  await axios.get("/getpostadd/1");
      
    //   this.setState({
    //     latestAdList: response.data,
  
    //   });
    //   var data1=JSON.parse((response.data[0].data));
     
    // }
  
    getCountData =async ()  => {
      var i;
      const response =  await axios.get("/api/count");
      for ( i = 0; i < parseInt(response.data[0].categories.length); i++) {
        
       // console.log(response.data[0].categories[0]);
        //console.log(response.data[0].categories[0]['_id'])
        getCount.set(response.data[0].categories[i]['_id'],response.data[0].categories[i]['count']);
       
      }
  
      
if (response.data[0].Total[0])
{
      this.setState({
        countofcategory: getCount,
        pageCount: Math.ceil((parseInt(response.data[0].Total[0]['Total']))/ this.state.perPage)
        
    })
  }
  
    //console.log((parseInt(response.data[0].Total[0]['Total'])+""));
      
    
    }
   
  
  componentDidUpdate(){
    jsevent(); 
  }
  
    componentDidMount(){
      this.receivedData()
      this.getCountData();
      this.onchangecountrysearch();
      jsevent();  
    }
    render() {

      
        return (
      <div>
{this.state.isloader ?  <Loader type="Circles" className="loader-fixed" visible={this.state.isloader}  color="#00a651" height={120} width={120} timeout={12000} />   : 
         <React.Fragment>
         <Helmet>
        <title>Free Online Classifieds for Pets - Petsforprice| Buy and Sell | Pets for sale </title>
        <link rel="canonical" href="https://petsforprice.com"/> 
    <link rel="next" href="https://www.petsforprice.com"/> 
    <meta name="title" content="Pets for Sale -  Free Online Classifieds for Pets - Petsforprice| Buy and Sell" />
    <meta name="description" content="Petsforprice| - Post Free Ads related to Pets and Pet Supplies. Buy and Sell Pets(Dogs, Cats, Birds, Fishes) and Pet Accessories. Find Pets Near You!!!    - Find Puppies food, medicines, accessories, toys price and sale in India. One stop shop with wide range of  pet products with offers &amp; discounts. Free delivery. International shipping. COD available" />
    <meta name="keywords" content="Classifieds, Dogs, Cats, Birds, Fishes, Other Pets, Buy/Sell, Find Puppies food, medicines, accessories, toys price and sale in India. One stop shop with wide range of  pet products with offers &amp; discounts. Free delivery. International shipping. COD available, Pet Food, Royal canin Food, Dog Food, Pet supplies, Pet Accessories, Pet clothing, Pet beds, Dog Beds, Dog clothing, Buy dog food online,cute puppies,pets for, Buy pets Online in India at Best Price from Only4Pets. In today's age almost every household has a pet. Having a pet can make your leisure time fun and reduce stress,Sell pets online, pet selling website, Sale pets online, online pets for sale, Adopt pets online, Buy pets online, Adopt pet online in India, Buy pets, Buy pet online in India, Adopt Pet, Dogs for sale near me, Adopt dogs near me, Adopt cat near me, only4pets, www.only4pets.com, Sell Dog online, Buy Dog online, Sell Dog, Buy Dog, Buy Dog near me, Sell Dog near me "/>
    
        </Helmet>

            <div class="home3">
               
            <div className="topbar"> 
              {/* Header  */}
              <div className="header">
                <div className="container po-relative">
                  <nav className="navbar navbar-expand-lg hover-dropdown header-nav-bar"> <a  className="navbar-brand"><img src={logo} alt="HomeBanner" /></a>
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
                    <li><a class="dropdown-item" href="10-Listing_Top_serchbar-Page.html">Listing Top srchbar</a></li>
                    
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
                        <div className="loin hider"> <a className="nav-link"  data-toggle="modal" data-target="#login"><i className="fa fa-user m-r-5" />Register/Sign In</a></div>
                        <ul className="ml-auto post_ad">
                          <li className="nav-item search">
                          <NavLink className="nav-link" to="/postad">Post Your Ad</NavLink>
                            
                            
                            
                            </li>
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
                        <a className="google"> <img src={google} alt="Classified Plus" /> <span>Continue with Google</span></a>
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
            {/* Slider */}
            <section className="slider">
              <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner mobileonly">
                  <div className="carousel-item active"> <img src={banner3} alt="Classified Plus" className="slide-image" />
                    <div className="slide-text">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            <h1>Free Online Classifieds for Pets</h1>
                            <h2><p>Find your pets near you & Buy and Sell pets  </p></h2>
                            <div>
                              <form className="book-now-home">
                                <div className="form-group">
                                  <input type="email" onChange={(e) => this.onChangekeyword(e.target.value)} className="form-control text-truncate" placeholder="What are you looking for" />
                                </div>
                                <div className="form-group">
  
                                {/* <select value='' className="form-control border-right-0 text-truncate">
                                  <option>Location</option>
                                   {this.state.countryList && this.state.countryList.length ?
                                    this.state.countryList.map((val,key) => {
                                      return val.cities.map((city,key) => {
                                      return (
                                        <option>{city.name}</option>
                                      )
                                  })
                                })
                                :'' } 
                                </select> */}
                                <input type="email" className="form-control text-truncate" placeholder="Enter city or state" onChange={(e) => this.onChangeCity(e.target.value)} />
                                </div>
                                <div className="form-group selectdiv">
                                  <select className="form-control border-right-0 text-truncate" onChange={(e) => this.onChangeCategory(e.target.value)}>
                                    <option>Select Category</option>
                                    <option>Dogs</option>
                              <option>Cats</option>
                              <option>Fishes</option>
                              <option>Birds</option>
                              <option>Others</option>
                              <option>Pet-Accessories</option>
                                  </select>
                                </div>
                                <button type="submit" onClick={this.OnClickSearchViewButton} className="btn btn-primary booknow btn-skin">Search Now</button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  <div class="carousel-item"> <img src="images/banner3.png" alt="Classified Plus" class="slide-image">
            <div class="slide-text">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <h1>World's Largest Classifieds Site</h1>
                    <p>Search from over 15,00,000 classifieds & Post unlimited classifieds free!</p>
                    <div>
                      <form class="book-now-home">
                        <div class="form-group">
                          <input type="email" class="form-control text-truncate" placeholder="What are you looking for">
                        </div>
                        <div class="form-group selectdiv">
                          <select class="form-control text-truncate">
                            <option>Your Location</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                        <div class="form-group selectdiv">
                          <select class="form-control border-right-0 text-truncate">
                            <option>Select Category</option>
                            <option>Vehicles</option>
                            <option>Electronics</option>
                            <option>Mobiles</option>
                            <option>Furniture</option>
                            <option>Fashion</option>
                            <option>Real Estate</option>
                            <option>Animals</option>
                            <option>Education</option>
                            <option>Baby products</option>
                            <option>Services</option>
                            <option>Furniture</option>
                          </select>
                        </div>
                        <button type="submit" class="btn btn-primary booknow btn-skin">Search Now</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  */}
                  {/*  <div class="carousel-item"> <img src="images/banner3.png" alt="Classified Plus" class="slide-image">
            <div class="slide-text">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <h1>World's Largest Classifieds Site</h1>
                    <p>Search from over 15,00,000 classifieds & Post unlimited classifieds free!</p>
                    <div>
                      <form class="book-now-home">
                        <div class="form-group">
                          <input type="email" class="form-control text-truncate" placeholder="What are you looking for">
                        </div>
                        <div class="form-group selectdiv">
                          <select class="form-control text-truncate">
                            <option>Your Location</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                        <div class="form-group selectdiv">
                          <select class="form-control border-right-0 text-truncate">
                            <option>Select Category</option>
                            <option>Vehicles</option>
                            <option>Electronics</option>
                            <option>Mobiles</option>
                            <option>Furniture</option>
                            <option>Fashion</option>
                            <option>Real Estate</option>
                            <option>Animals</option>
                            <option>Education</option>
                            <option>Baby products</option>
                            <option>Services</option>
                            <option>Furniture</option>
                          </select>
                        </div>
                        <button type="submit" class="btn btn-primary booknow btn-skin">Search Now</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
                </div>
                <a className="carousel-control-prev"  role="button" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true" /> <span className="sr-only">Previous</span> </a> <a className="carousel-control-next"  role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true" /> <span className="sr-only">Next</span> </a> </div>
            </section>
            {/* End Slider */} 
            {/* Categories */}
            <section className="categories">
              <div className="container"> 
                {/* Row  */}
                <div className="row justify-content-center">
                  <div className="col-md-7 text-center">
                    <h2 className="title">Categories</h2>
                  </div>
                </div>
                {/* Row  */}
                <div className="row">
                  <div className="col-md-12">
                  
                    <ul className="list-unstyled text-center p-t-40">
                      <li><a ><img src={Vehicles} alt="Classified Plus" />
                      <p>  {this.state.countofcategory.get("Dogs") ? this.state.countofcategory.get("Dogs") :0} </p>
                          <p> Dogs </p>
                        </a> </li>
                      <li><a ><img src={Electronics} alt="Classified Plus" />
                      <p>  {this.state.countofcategory.get("Cats") ? this.state.countofcategory.get("Cats") :0} </p>
                          <p> Cats </p>
                        </a> </li>
                      <li><a ><img src={Mobiles} alt="Classified Plus" />
                      <p>  {this.state.countofcategory.get("Fishes") ? this.state.countofcategory.get("Fishes") :0} </p>
                          <p>Fishes </p>
                        </a> </li>
                      <li><a ><img src={Furnitue} alt="Classified Plus" />
                      <p> {this.state.countofcategory.get("Birds") ? this.state.countofcategory.get("Birds") :0} </p>
                          <p> Birds</p>
                        </a> </li>
                      <li><a ><img src={Fashion} alt="Classified Plus" />
                      <p> {this.state.countofcategory.get("Others") ? this.state.countofcategory.get("Others") :0}</p>
                          <p> Others </p>
                        </a> </li>
                      <li><a ><img src={jobs} alt="Classified Plus" />
                      <p> {this.state.countofcategory.get("Pet Accessories") ? this.state.countofcategory.get("Pet Accessories") :0}</p>
                          <p>Accessories</p>
                        </a> </li>
                
                      {/*- <li><a ><img src="images/02-Home-Page/Real-Estate.png" alt="Classified Plus"/>
                <p> Real Estate </p>
                </a> </li>
              <li><a >
                <p> Animals </p>
                </a> </li>
              <li><a ><img src="images/02-Home-Page/Education.png" alt="Classified Plus"/>
                <p>Education </p>
                </a> </li>
              <li><a ><img src="images/02-Home-Page/Baby-products.png" alt="Classified Plus"/>
                <p>Baby</p>
                </a> </li>
              <li><a > <img src="images/02-Home-Page/Services.png" alt="Classified Plus"/>
                <p>Services </p>
                </a> </li>
              <li><a > <img src="images/02-Home-Page/matrimony.png" alt="Classified Plus"/>
                <p>Matrimony </p>
                </a> </li> -*/}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            {/* End Categories */} 
            {/* Featured_ads */}
            {/* <section class="featured_ads bg-light">
      <div class="container"> 
        <!-- Row  */}
            {/*  <div class="row justify-content-center">
          <div class="col-md-7 text-center">
            <h2 class="title">Featured Ads</h2>
            <h6 class="subtitle">Explore the greates places in the city.</h6>
          </div>
        </div>
        <!-- Row  */}
            {/*   <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
            <div class="featured-parts rounded m-t-30">
              <div class="featured-img"> <img class="img-fluid rounded-top" src="images/Featured-img-1.png"  alt="Classified Plus"/>
                <div class="featured-new"> <a href="03-Home-Page.html#"> New </a> </div>
              </div>
              <div class="featured-text">
                <div class="text-top d-flex justify-content-between ">
                  <div class="heading"> <a href="03-Home-Page.html#">Mobile</a> </div>
                  <div class="book-mark"><a href="03-Home-Page.html#"><i class="fa fa-bookmark"></i></a></div>
                </div>
                <div class="text-stars m-t-5">
                  <p>Smartphone for sele</p>
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
                <div class="featured-bottum m-t-30">
                  <ul class="d-flex justify-content-between list-unstyled m-b-20">
                    <li><a href="03-Home-Page.html#"><i class="fa fa-map-marker"></i> East 7th street 98 </a></li>
                    <li><a href="03-Home-Page.html#"><i class="fa fa-heart-o"></i> view</a> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
            <div class="featured-parts rounded m-t-30">
              <div class="featured-img"> <img class="img-fluid rounded-top" src="images/Featured-img-2.png" alt="Classified Plus"/> </div>
              <div class="featured-text">
                <div class="text-top d-flex justify-content-between ">
                  <div class="heading"> <a href="03-Home-Page.html#">Fashion</a> </div>
                  <div class="book-mark"><a href="03-Home-Page.html#"><i class="fa fa-bookmark-o"></i></a></div>
                </div>
                <div class="text-stars m-t-5">
                  <p>Cloth for sele</p>
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
                <div class="featured-bottum m-t-30">
                  <ul class="d-flex justify-content-between list-unstyled m-b-20">
                    <li><a href="03-Home-Page.html#"><i class="fa fa-map-marker"></i> East 7th street 98 </a></li>
                    <li><a href="03-Home-Page.html#"><i class="fa fa-heart-o"></i> view</a> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
            <div class="featured-parts rounded m-t-30">
              <div class="featured-img"> <img class="img-fluid rounded-top" src="images/Featured-img-3.png" alt="Classified Plus"/>
                <div class="discount"> <a href="03-Home-Page.html#"> Discount 30% </a> </div>
                <div class="featured-price"> <a href="03-Home-Page.html#"> $550.00 </a> </div>
              </div>
              <div class="featured-text">
                <div class="text-top d-flex justify-content-between ">
                  <div class="heading"> <a href="03-Home-Page.html#">Matrimony</a> </div>
                  <div class="book-mark"><a href="03-Home-Page.html#"><i class="fa fa-bookmark"></i></a></div>
                </div>
                <div class="text-stars m-t-5">
                  <p>jewellery for sele</p>
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
                <div class="featured-bottum m-t-30">
                  <ul class="d-flex justify-content-between list-unstyled m-b-20">
                    <li><a href="03-Home-Page.html#"><i class="fa fa-map-marker"></i> East 7th street 98 </a></li>
                    <li><a href="03-Home-Page.html#"><i class="fa fa-heart-o"></i> view</a> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
            <div class="featured-parts rounded m-t-30">
              <div class="featured-img"> <img class="img-fluid rounded-top" src="images/Featured-img-4.png" alt="Classified Plus"/> </div>
              <div class="featured-text">
                <div class="text-top d-flex justify-content-between ">
                  <div class="heading"> <a href="03-Home-Page.html#">Animals</a> </div>
                  <div class="book-mark"><a href="03-Home-Page.html#"><i class="fa fa-bookmark"></i></a></div>
                </div>
                <div class="text-stars m-t-5">
                  <p>Greyhounds Dogs for sales</p>
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
                <div class="featured-bottum m-t-30">
                  <ul class="d-flex justify-content-between list-unstyled m-b-20">
                    <li><a href="03-Home-Page.html#"><i class="fa fa-map-marker"></i> East 7th street 98 </a></li>
                    <li><a href="03-Home-Page.html#"><i class="fa fa-heart-o"></i> view</a> </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button class="view-btn hvr-pulse-grow" type="submit" value="button">View all</button>
        </div>
      </div>
    </section>  -*/}
            {/* End Featured_ads */} 
            {/* Trending_ads */}
            <section className="trending_ads">
              <div className="container"> 
                <div className="row justify-content-center">
                  <div className="col-md-7 text-center">
                    <h2 className="title">Latest Ads</h2>
                  </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">   
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
                              <img className="img-fluid rounded-top" src={protocol+'://'+nodeURL+'/api/photo/'+val._id+'/image0'} alt="Classified Plus" />
                             
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
                            
                                    <li>
                                    
                                  <button type="button"  renderAs="button" onClick={this.OnClickViewButton.bind(this,val)} className="btn btn-outline-primary"  style={{fontWeight: 'bold', fontSize: '13px'}}><bold>VIEW</bold></button> 

                                      </li>
                                  </ul>
                                </div>			
                              </div>
                            </div>
                            </div>
  );
  }):
  <h3> No Latest Advertisement... Please try it latter</h3>
   }
   <div className="clearfix" ></div>
  
   {this.state.isViewall
          ?   
          <div className={`col-md-12 ${(this.state.latestAdList && this.state.latestAdList.length) ? "" : "hider"}`}>
            <button className="view-btn hvr-pulse-grow" onClick={this.handleViewall} type="submit" value="button">View all</button>
          </div>      
          : 
          <div className={`col-md-12 ${(this.state.latestAdList && this.state.latestAdList.length) ? "" : "hider"}`}>
             <nav aria-label="Page navigation example" >
          <ul className="pagination justify-content-center"></ul>
         <div>
                  {this.state.postData}
                  <ReactPaginate
                      previousLabel={"<"}
                      nextLabel={">"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      previousLinkClassName={"page-link"}
                      nextLinkClassName={"page-link"}
                      marginPagesDisplayed={2}
                      pageLinkClassName={"page-link"}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination justify-content-center"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}/>
              </div>
              
              </nav>
        </div>
      
          }  
                  </div>
                </div>	
              </div>
            </section>
            {/* End Trending_ads */} 
            {/* Trusted */}
            {/*<section class="trusted p-b-10">
      <div class="container">
        <div class="row">
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <div class="trusted_parts text-center">
              <h3> 1238+ </h3>
              <p class="p-t-20">Completed Project</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <div class="trusted_parts text-center mr-auto">
              <h3> 1238+ </h3>
              <p class="p-t-20">Happy Client</p>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <div class="trusted_parts text-center mr-auto">
              <h3>1238+ </h3>
              <p class="p-t-20">Award Winner</p>
            </div>
          </div>
        </div>
      </div>
    </section> */}
            {/* End Trusted */} 
            {/* We_Bes */}
            {/* <section class="we_bes p-b-45">
      <div class="container"> 
        <div class="row justify-content-center">
          <div class="col-md-7 text-center">
            <h2 class="title">Why We Are Best</h2>
            <h6 class="subtitle">Explore the greates places in the city.</h6>
          </div>
        </div>
    
        <div class="row">
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="d-flex m-t-40">
              <div class="counter_icon mr-3"><i class="fa fa-eye"></i> </div>
              <div class="counter_number">
                <h3> Eye on Quality </h3>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's. </p>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="d-flex m-t-40 justify-content-between">
              <div class="counter_icon mr-3"><i class="fa fa-lock"></i> </div>
              <div class="counter_number">
                <h3> Protection Guaranteed </h3>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's. </p>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="d-flex m-t-40">
              <div class="counter_icon mr-3"><i class="fa fa-comments"></i></div>
              <div class="counter_number">
                <h3> 24/7 Support </h3>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's. </p>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="d-flex m-t-40">
              <div class="counter_icon mr-3"><i class="fa fa-laptop"></i></div>
              <div class="counter_number">
                <h3> Prompt Complaint Response </h3>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's. </p>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="d-flex m-t-40 d-flex">
              <div class="counter_icon mr-3"><i class="fa fa-check-square-o"></i></div>
              <div class="counter_number">
                <h3> Verified Ads </h3>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's. </p>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
            <div class="d-flex m-t-40 d-flex">
              <div class="counter_icon mr-3"><i class="fa fa-leaf"></i></div>
              <div class="counter_number">
                <h3> Secure Payment Gateway </h3>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End We_Bes */} 
            {/* App_Store */}
            {/*<section class="app_store">
      <div class="container"> 
        
        <div class="row justify-content-center">
          <div class="col-md-10 text-center">
            <h2 class="title">Download on App Store</h2>
            <div class="clearfix"></div>
            <h6 class="subtitle">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</h6>
          </div>
        </div>
        
        <div class="row">
          <div class="app_parts ">
            <button class="app-btn btn" type="submit" value="butten"><i class="fa fa-apple app-icon "></i> Apple Store </button>
            <button class="app-btn btn" type="submit" value="butten"><i class="fa fa-android app-icon"></i> Apple Store </button>
            <button class="app-btn btn" type="submit" value="butten"><i class="fa fa-windows app-icon"></i> Apple Store </button>
          </div>
        </div>
      </div>
    </section>*/}
            {/* End App_Store */}
            {/* Testimonial */}
            {/*-<section class="testimonials">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center">
            <h2 class="title">Testimonials</h2>
            <h6 class="subtitle">What Our Clients Says</h6>
          </div>
        </div>
        <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carouse2">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators2" data-slide-to="0" class=""><img class="testimonial-image" src="images/testimonials_2.png"  alt="Classified Plus"></li>
           <!-- <li data-target="#carouselExampleIndicators2" data-slide-to="1" class="active"><img class="testimonial-image" src="images/testimonials_1.png"  alt="Classified Plus"></li>
            <li data-target="#carouselExampleIndicators2" data-slide-to="2"><img class="testimonial-image" src="images/testimonials_3.png"  alt="Classified Plus"></li>  
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's<br>
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to<br>
                make a type specimen book. It has survived not only five centuries, </p>
              <h3>Williams Sherry</h3>
              <h4>User</h4>
            </div>
            <div class="carousel-item active">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's<br>
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to<br>
                make a type specimen book. It has survived not only five centuries, </p>
              <h3>Williams Sherry</h3>
              <h4>User</h4>
            </div>
            <div class="carousel-item">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's<br>
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to<br>
                make a type specimen book. It has survived not only five centuries, </p>
              <h3>Williams Sherry</h3>
              <h4>User</h4>
            </div>
          </div>
        </div>
      </div>
    </section>*/}
            {/* End Testimonial */}
            {/* Footer */}
            <footer className="footer_all m-t-50">
              <div className="footer footer p-t-40">
                <div className="container spacer b-t">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 m-b-30">
                      <h3 className="mb-3"> <img className="img-fluid" src={footer} alt="footer-logo" /></h3>
                      <p class="font-italic"> This site may help the need of pets breeder and pets lovers... , we would need your support by sharing your valuable feedback for further improvement </p>
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
  <div className="top_awro pull-right" id="back-to-top" data-original-title="" title=""><i className="fa fa-chevron-up" aria-hidden="true"></i> </div>
          </div>
          </React.Fragment>
    }
              </div>
          )
        }
    }

    export default withRouter(Home);