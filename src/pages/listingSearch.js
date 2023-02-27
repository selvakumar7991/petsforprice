import React, {Component} from 'react';

import $ from 'jquery';
import jquery from 'jquery';
import close from '../images/close.png';
import fb from '../images/fb.png';
import google from '../images/google_p.png';
import feather1 from '../images/Featured-img-1.png';
import footer from '../images/logohome.png';
import logo2 from '../images/logohome.png';
import Autocomplete from '../pages/Autocomplete';
import axios from 'axios';
import ReactPaginate from 'react-paginate'
import Loader from 'react-loader-spinner'
import {nodeURL,protocol} from '../pages/constantval';
import banner3 from "../images/listingsbanner.jpg"
import {jsevent} from '../JsModule/Event';

import { withRouter,Link,useLocation,NavLink } from "react-router-dom";


let getCount = new Map();


window.$ = window.jQuery = jquery;


class listingSearch extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
     keyword:'',
     category:'',
     city:'',
     minPrice:'',
     maxPrice:'',
     isapply:false,
     picture:false,
     latestAdList:[],
     countryList: [],
     city:'',
     isViewall : 'sample',
     offset: 0,
     data: [],
     perPage: 15,
     currentPage: 1,
     pageCount:1,
     totalCount:'',
     sort:'',
     ispaginationview: false,
     isAdView:false,
     countofcategory: new Map(),
     selectedOption:'',
     isloader: true,
    };
    this.onChangekeyword = this.onChangekeyword.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);
    this.onChangeMinPrice = this.onChangeMinPrice.bind(this);
    this.onChangeMaxPrice = this.onChangeMaxPrice.bind(this);
    this.onclickSubmitButton=this.onclickSubmitButton.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.axiosSearch = this.axiosSearch.bind(this);
    this.onClickAdvViewHR = this.onClickAdvViewHR.bind(this);
    this.onClickAdvViewLR = this.onClickAdvViewLR.bind(this);

  }

  OnClickViewButton =  (val) => {
       
  
    this.props.history.push("/productDetail/"+val.category+'/'+val._id); 
  
  };



  onChangekeyword(event) {
      
    const value =event;

  this.setState({
  keyword:value
  });

}

onChangeCategory(event) {

  const id = event.target.id;
  const value = event.target.value;

this.setState({
  category:id,
  selectedOption:value
});

}
onClickAdvViewHR(value) {

  this.setState({
    isAdView:true
  });
  
  }
  onClickAdvViewLR(value) {

    this.setState({
      isAdView:false
    });
    
    }


updateSort = (sort) => {
  
  this.setState({sort},this.axiosSearch);
}
  


onclickSubmitButton(e)
{

  
  e.preventDefault();
  this.setState({
    isapply:true,
    },() => { this.axiosSearch() })

 
}




axiosSearch = () => {
  let currentComponent = this;
 
  

  axios.post('/api/search', {
    pageNo:this.state.currentPage,
    keyword:this.state.keyword,
    category:this.state.category,
    city:this.state.city,
    minPrice:this.state.minPrice,
    maxPrice:this.state.maxPrice,
    picture: this.state.picture,
    sort:this.state.sort,
    apply:this.state.isapply
  })
  .then(function (response) {
    currentComponent.setState({
      latestAdList: [],
      });
    
    currentComponent.setState({
      latestAdList: response.data,
      });
  })
  .catch(function (error) {
    console.log(error)
  });

}




onChangeCity(event) {
      
  const value =event;

this.setState({
city:value
});

}
onChangeMinPrice(event) {
      
  const value =event;

this.setState({
  minPrice:value
});

}
onChangeMaxPrice(event) {
      
  const value =event;

this.setState({
  maxPrice:value
});

}


onChangePicture(event) {

 this.setState({
  picture: !this.state.picture
 })
 
  
}

citySetState = (city) => {
  this.setState({
    city: city,
  })
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

  const search = this.props.location.search; // could be '?foo=bar'
const params = new URLSearchParams(search);

let currentComponent = this;

axios.post('/api/getpostaddsearch', {
  keyword:params.get('keyword'),
  category:params.get('category'),
  city:params.get('city'),
  page:this.state.currentPage
 })
.then(function (response)
{
  currentComponent.setState({
 latestAdList: []
 });


  currentComponent.setState({
    isloader: false,
    keyword:params.get('keyword'),
    selectedOption:params.get('category'),
    category:params.get('category'),
 latestAdList: response.data,
 })
})
.catch(function (error) {
  console.log(error)
});

 // console.log(params.get('keyword'))
// const response =  await axios.get("/getpostaddsearch/"+this.state.currentPage);


};


getCountData =async ()  => {
  var i;
  const response =  await axios.get("/api/count");
  for ( i = 0; i < parseInt(response.data[0].categories.length); i++) {
    
   // console.log(response.data[0].categories[0]);
    //console.log(response.data[0].categories[0]['_id'])
    getCount.set(response.data[0].categories[i]['_id'],response.data[0].categories[i]['count']);
   
  }

  

 
  this.setState({
    totalCount:(parseInt(response.data[0].Total[0]['Total'])),
    countofcategory: getCount,
    pageCount: Math.ceil((parseInt(response.data[0].Total[0]['Total']))/ this.state.perPage)
    
})

//console.log((parseInt(response.data[0].Total[0]['Total'])+""));
  

}

componentDidUpdate(){
  jsevent(); 
}

componentDidMount(){
  this.receivedData();
  this.getCountData();
  jsevent();
}



    render() {
      
      
      return(


        
<div>
{this.state.isloader ?  <Loader type="Circles" className="loader-fixed" visible={this.state.isloader}  color="#00a651" height={120} width={120} timeout={12000} />   : 
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
              <li><a className="dropdown-item" >Blog </a></li>
              <li><a className="dropdown-item" >Blog Detail</a></li>
              <li><a className="dropdown-item"  data-toggle="modal" data-target="#login">Register/Sign In</a></li>
              <li><a className="dropdown-item" >Faq</a></li>
              <li><a className="dropdown-item" >Faq Right Category</a></li>
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
{/* listing_left_sidebar */}
<section className={`top_listings ${this.state.isAdView ? "list_view_listing" : ""}`}>
  <div className="container"> 
    <div className="row m-t-40 margin_top">
      <div className="col-md-3 col-sm-12 col-xs-12">
        <div className="sidebar-wrapper">
          <div className="single-sidebar">
            <div className="sec-title">
                <h3 className="condition mb-2">Your Search</h3>
              <input placeholder="Keywords"  className="form-control text-truncate" value={this.state.keyword}
            onChange={(e) => this.onChangekeyword(e.target.value)} type="text" />
           </div>
       
          </div>
          <div className="single-sidebar">
            <div className="sec-title">
              <h3 className="all-categories">All Category</h3>
            
              <div className="form-group form-check post-slide">
              
              
                <input type="radio" className="form-check-input" value={this.state.category}
            onChange={(e) => this.onChangeCategory(e)}  id="Dogs" name="Category" value="Dogs" checked={this.state.selectedOption === 'Dogs'} />
        <label className="form-check-label">Dogs({this.state.countofcategory.get("Dogs") ? this.state.countofcategory.get("Dogs") :0})</label> 
                    
                
              </div>
              <div className="form-group form-check post-slide">
                <input type="radio" className="form-check-input" value={this.state.category}
            onChange={(e) => this.onChangeCategory(e)} id="Cats" name="Category" value="Cats"  checked={this.state.selectedOption === 'Cats'}/>
                <label className="form-check-label">Cats({this.state.countofcategory.get("Cats") ? this.state.countofcategory.get("Cats") :0})</label>
              </div>
              <div className="form-group form-check post-slide">
                <input type="radio" className="form-check-input" value={this.state.category}
            onChange={(e) => this.onChangeCategory(e)} id="Fishes" name="Category" value="Fishes" checked={this.state.selectedOption === 'Fishes'} />
                <label className="form-check-label">Fishes({this.state.countofcategory.get("Fishes") ? this.state.countofcategory.get("Fishes") :0})</label>
              </div>
              <div className="form-group form-check post-slide">
              
                <input type="radio" className="form-check-input" value={this.state.category}
            onChange={(e) => this.onChangeCategory(e)} id="Birds" name="Category" value="Birds" checked={this.state.selectedOption === 'Birds'}  />
                <label className="form-check-label">Birds({this.state.countofcategory.get("Birds") ? this.state.countofcategory.get("Birds") :0})</label>
              </div>
              <div className="form-group form-check post-slide">
              
                <input type="radio" className="form-check-input" value={this.state.category}
            onChange={(e) => this.onChangeCategory(e)} id="Others" name="Category" value="Others" checked={this.state.selectedOption === 'Others'} />
                <label className="form-check-label">Others({this.state.countofcategory.get("Others") ? this.state.countofcategory.get("Others") :0})</label>
              </div>
              <div className="form-group form-check post-slide">
              
                <input type="radio" className="form-check-input" value={this.state.category}
            onChange={(e) => this.onChangeCategory(e)}  id="Accessories" name="Category" value="Accessories" checked={this.state.selectedOption === 'Accessories'} />
                <label className="form-check-label">Accessories({this.state.countofcategory.get("Pet Accessories") ? this.state.countofcategory.get("Pet Accessories") :0})</label>
              </div>
            </div>
            <div className="single-sidebar">
              <div className="sec-title">
                <h3 className="condition mb-2">City</h3>
            
                <Autocomplete citySetState={this.citySetState}/>

              </div>
            </div>
            <div className="single-sidebar">
              <div className="sec-title">
                <h3 className="post-by mb-2">Show only</h3>
                <div className="form-group form-check post-slide">
                
                  <input type="checkbox" className="form-check-input" value={this.state.picture}
            onChange={(e) => this.onChangePicture(e.target.value)} />
                  
              
                  <label className="form-check-label">Listing with Pictures </label>
                </div>
              </div>
            </div>
            <div className="single-sidebar">
              <div className="sec-title">
                <h3 className="price_r mb-2">Price Range</h3>
                <div className="price-range-block">
                  <div className="m-t-20 m-b-20">
                    <input type="text" placeholder="Min"  id="min_price" className="price-range-field" value={this.state.minPrice}
            onChange={(e) => this.onChangeMinPrice(e.target.value)} />
                    <input type="text" placeholder="Max"  id="max_price" className="price-range-field price-range-field2" value={this.state.maxPrice}
            onChange={(e) => this.onChangeMaxPrice(e.target.value)}  />
                  </div>
                  <center><button type="submit" onClick={(e) => this.onclickSubmitButton(e)} class="change_btn mt-2 text-capitalize" value="button">Apply</button></center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-9 col-sm-12 col-xs-12">   
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 m-b-10">
            <div className="listing-select-parts d-flex justify-content-between">
              <div className="listing-select-head-left d-inline-block">
                <h3> Showing ( 1 - {this.state.latestAdList.length}  products of {this.state.totalCount} products  ) </h3>
              </div>
              <div className="listing-select-head-right d-inline-block ">
                <span className="d-inline-block bars px-2"><a className={this.state.isAdView ? "active" : ""} onClick={(e) => this.onClickAdvViewHR(e)} ><i className="fa fa-list" /></a></span>
                <span className="d-inline-block bars px-2"><a className={this.state.isAdView ? "" : "active"} onClick={(e) => this.onClickAdvViewLR(e)}><i className="fa fa-th" /></a></span> 
                <div className="sort_by d-inline-block pl-3">
                  <form>
                    <div className="form-group">
                      <select className="form-control"  onChange={(e) => this.updateSort(e.target.value)}>
                        <option>Newly Listed</option>
                        <option>Sort with Low price</option>
                        <option>Sort with High price</option>
                      </select>
                    </div>
                  </form>
                </div> </div>
            </div>
          </div>
          <React.Fragment>
          {this.state.isAdView ?this.state.latestAdList && this.state.latestAdList.length ?
                        this.state.latestAdList.map((val,key)=>{
  
                       
                         return (
                        
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <div className="featured-parts rounded m-t-30 d-flex">
                            <div className="featured-img"> <img className="img-fluid rounded-top" src={protocol+'://'+nodeURL+'/api/photo/'+val._id+'/image0'}  /> </div>
                            <div className="featured-text">
                              <div className="text-top d-flex justify-content-between ">
                              <div className="heading"><p> <a > {val.priceInt}{val.priceStr}  </a>- {val.city}</p> </div>
                              </div>
                              <div className=" m-t-5">
                                <p>{val.adTitle}</p>
                                <div className="featured-bottum m-t-30">
                                  <ul className="d-flex justify-content-between list-unstyled m-b-20">
                                    <li><a >{val.PublishDate}</a></li>
                                    <li><button type="button" className="btn btn-outline-primary" onClick={this.OnClickViewButton.bind(this,val)} style={{fontWeight: 'bold', fontSize: '13px'}}><bold>VIEW</bold></button> </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
  );
  }):
  <h3> No Latest Advertisement with your search values... Please try it latter</h3>
  : 
  this.state.latestAdList && this.state.latestAdList.length ?
                        this.state.latestAdList.map((val,key)=>{
  
                       
                         return (
                        
                          //  <li><label onClick={()=>{this.handleSearchChange(val.cities[0].name+", "+val.name+" ,"+val.country_name)}}>{val.cities[0].name+", "+val.name+" ,"+val.country_name}</label></li>
                            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
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
  <h3> No Latest Advertisement with your search values... Please try it latter</h3>
  }
          </React.Fragment>
          <div className="clearfix" />
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
        </div>
      </div>
    </div>
  </div>
</section>
{/* End listing_left_sidebar */} 
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
}
</div>
      )
    }
  }

export default withRouter(listingSearch);