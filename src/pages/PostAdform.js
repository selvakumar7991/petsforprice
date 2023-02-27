import axios from 'axios';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

let inputValue = new Map();
let imageFiles  = [];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



function ValidationMessage(props) {
  if (!props.valid) {
    return(
      <span className='error-msg'>{props.message}</span>
    )
  }
  return null;
}

class Autocomplete extends Component {
  // static propTypes = {
  //   suggestions: PropTypes.instanceOf(Array)
  // };

  // static defaultProps = {
  //   suggestions: []
  // };

  constructor(props) {
    super(props);

    this.state = {
      suggestions : [],
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",

      countryList : []
    };
  }

  onChange = async e => {

    const value = e.target.value;

  
    this.setState({
      city:value,
      suggestions: []
    });
 
    if(value.length>=3){
    const response = await axios.get("/api/countrysearch/"+value);

    response.data.map((val,key)=>{
      this.setState({
        
      
       suggestions: this.state.suggestions.concat([val.cities[0].name]+", "+[val.name]+" ,"+[val.country_name])
      });

      
      // return (
      //    <li><label onClick={()=>{this.handleSearchChange(val.cities[0].name+", "+val.name+" ,"+val.country_name)}}>{val.cities[0].name+", "+val.name+" ,"+val.country_name}</label></li>
      // );
      
     })


   
    
    } else {
      this.setState({
        suggestions: []
      });
    }

   

    //console.log(this.state.filteredSuggestions)
  

    // const { suggestions } = this.props;
    const userInput = value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = this.state.suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,filteredSuggestions,
      showSuggestions: true,
      userInput: value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    inputValue.set("city",e.currentTarget.innerText);

  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          className="form-control text-truncate"
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}
















class PostAdform extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        name: '',value: '',username:'', usernameValid: false,
        cityvalue:'',
        email: '', emailValid: false,
        phone: '', phoneValid: false,
        price: '', priceValid: false,
        category: '', categoryValid: false,
        passwordConfirm: '', passwordConfirmValid: false,
        query: '',
        data: [],
        city:'',
        searchString:[],
        formValid: false,
        errorMsg: {},
        redirect: false,
        SelectFiles: '',
        fields: {},
        issubmit:true,
        errors: {
          fullName: '',
          email: '',
          password: '',
          
        },
        countryList:[]
      };
      this.fileLoader = {};
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    addNotification() {
        store.addNotification( {
          title: "Success",
          message:"Your Ad has been published. You are redirecting to home page",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },  
          dismissable: { click: true }
        })
        sleep(3000).then(() => { this.props.history.push("/"); });
      }

      




 


      updateUsername = (event) => {
        const username=event.target.value;
        const name=event.target.name;
        const value=event.target.value;
        inputValue.set(name,value);
        // this.setState({username},
        //        fields: {
        //      ...this.state.fields,
        //   [name]: value,
            
        // }, this.validateUsername)
      
        this.setState({
         fields: {
             ...this.state.fields,
             [name]: value,
            
         },username:username,name:[name]
       },this.validateUsername);
      }
      validateUsername = () => {

        //console.log(this.state.target.name)
       // const {name}=;
     //  console.log()
        const {username} = this.state;
        const {name}=this.state;
        let usernameValid = true;
        
        let errorMsg = {...this.state.errorMsg}
        
        if (username.length < 3) {
          usernameValid = false;
          errorMsg = 
          {
            
           [name]: 'Must 3 characters'
        }
        }
    
        this.setState({usernameValid, errorMsg}, this.validateForm)
      }










      



    //   updateUsername = (event) => {
    //     const value =event.target.value;
    //     const name =event.target.name;
    //     this.setState({value,name}, this.handleInputChange)
    //   }


      handleInputChange(event) {
      
        const value =event.target.value;
        const name =event.target.name;

      inputValue.set(name,value);
   
      this.setState({
        fields: {
            ...this.state.fields,
            [name]: value,
            
        }
      });

    }

    //   if (value.length < 3) {
    //     usernameValid = false;
    //     errorMsg.value = 'Must be at least 3 characters long'
    //   }
  
    //   this.setState({usernameValid, errorMsg}, this.validateForm)
    // }


    updateCategory = (category) => {
      inputValue.set("category",category);
      this.setState({category}, this.validateCategory)
    }
    
    validateCategory = () => {
      const {category} = this.state;
      let categoryValid = true;
      let errorMsg = {...this.state.errorMsg}
      var categotyList=["Dogs","Cats","Fishes","Birds","Others","Pet Accessories"]

  
      if ((!(categotyList.includes(category)))) {
        categoryValid = false;
        errorMsg.category = 'Select Category'
      }
  
      this.setState({categoryValid, errorMsg}, this.validateForm)
    }


    updateEmail = (email) => {
      inputValue.set("email",email);
      this.setState({email}, this.validateEmail)
    }
  
    validateEmail = () => {
      const {email} = this.state;
      let emailValid = true;
     
     
     
     
     
     let errorMsg = {...this.state.errorMsg}
  
      // checks for format _@_._
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        emailValid = false;
        errorMsg.email = 'Invalid email format'
      }
  
      this.setState({emailValid, errorMsg}, this.validateForm)
    }



    updatePhone = (phone) => {
      inputValue.set("phone",phone);
      this.setState({phone}, this.validatephone)
    }
  
    validatephone = () => {
      const {phone} = this.state;
      let phoneValid = true;
      let errorMsg = {...this.state.errorMsg}
//console.log(Number.isInteger(parseInt(phone)))
//console.log(phone.length)
//console.log((!(Number.isNaN(parseInt(phone)))))
      if (Number.isInteger(parseInt(phone)) && (phone.length < 10) ) {
      //  console.log("sample")
        phoneValid = false;
        errorMsg.phone = 'Invalid mobile number'
      
      }
      if ( ((Number.isNaN(parseInt(phone))))) {
        //  console.log("sample")
          phoneValid = false;
          errorMsg.phone = 'Invalid mobile number'
        
        }

      this.setState({phoneValid, errorMsg}, this.validateForm)
    }



    updateprice = (price) => {
      inputValue.set("price",price);
      this.setState({price}, this.validateprice)
    }
  
    validateprice = () => {
      const {price} = this.state;
      let priceValid = true;
      let errorMsg = {...this.state.errorMsg}
//console.log(Number.isInteger(parseInt(phone)))
//console.log(phone.length)
      if ( (price.length < 1)   ) {
      //  console.log("sample")
        priceValid = false;
        errorMsg.price = 'Enter price or check with seller'
      
      }
      this.setState({priceValid, errorMsg}, this.validateForm)
    }


    

    // validateForm = () => {
    //   const {usernameValid} = this.state;
    //   this.setState({
    //     formValid: usernameValid
    //   })
    // }


    validateForm = () => {
      const {usernameValid, emailValid, phoneValid, priceValid,categoryValid} = this.state;
      this.setState({
        formValid: usernameValid && emailValid && phoneValid && priceValid && categoryValid
      })
    }

    handleSubmit = async event => {
      this.setState({
        issubmit:false
      })
      

        event.preventDefault();
        const formData = new FormData();
        imageFiles.forEach(file=>{
            formData.append("SelectFiles", file);
          })
         if(imageFiles.length>0)
         {
          inputValue.set("fileCount",imageFiles.length);
         }
         else{
          inputValue.set("fileCount","1");
         }
       // formData.append('SelectFiles', this.state.image);
        for (let [key, value] of inputValue) {
            formData.append(key, value);
          }
       
          let ts = Date.now();

          let date_ob = new Date(ts);
          let date = date_ob.getDate(); 
          let monthint = date_ob.getMonth();
          let year = date_ob.getFullYear();
          var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2]= "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

          formData.append("PublishDate",  month[monthint]+" "+date+", "+ year);
          

        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const response = await axios.post("/api/addpost",formData,config);
        if(response.data['_id']){
            this.addNotification();
           
        }
      
      };

    onFileChange = event => { 
        this.fileLoader = event.target.files[0];
        console.log(event.target.files)
        console.log(event.target.files.length)
       

        // Update the state 
        
        for (let i = 0; i < event.target.files.length; i++) {
            imageFiles.push(event.target.files[i]);

            }
          

        this.setState({ imageFiles: imageFiles })
      //  console.log(event.target.files[0]);
        this.setState({
            fields: {
                
                //...this.state.fields,
                //selectedFile: event.target.files[0]
            },
        }); 
      }; 

      render(){
       //   console.log(this.state.fields)
          return(
            <div className="col-md-9">
                <div className="dashboard_profile_main">
                  <div className="dashboard_heding">
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-7">
                    <div className="profile_detail">
                      <h3>ad detail </h3>
                      <form enctype="multipart/form-data" autoComplete="off">
                        <div className="form-group">
                          
                          <label>Ad Title *&nbsp;< ValidationMessage valid={this.state.usernameValid} message={this.state.errorMsg.adTitle} /></label>
                          <input type="text" className="form-control" name="adTitle"  value={this.state.adTitle}
             onChange={(e) => this.updateUsername(e)}   />
                        </div>
                        <div className="form-group selectdiv">
                          <label>category *&nbsp;< ValidationMessage valid={this.state.categoryValid} message={this.state.errorMsg.category} /></label>
                          <select className="form-control" value={this.state.category}
            onChange={(e) => this.updateCategory(e.target.value)}  name="category">

                            <option>Select a Category of pets</option>
                            <option>Dogs</option>
                            <option>Cats</option>
                            <option>Fishes</option>
                            <option>Birds</option>
                            <option>Others</option>
                            <option>Pet Accessories</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>price *&nbsp;< ValidationMessage valid={this.state.priceValid} message={this.state.errorMsg.price} /></label>
  
                          <input type="text" className="form-control" name="price" value={this.state.price}
            onChange={(e) => this.updateprice(e.target.value)} placeholder="Ad your price or type Check with Seller" />
                        </div>
                        <div className="img_browse">
                          <label>Photos for your Ad</label>
                          <div className="form-group">
                            <div className="tg-fileuploadlabel">
                              <label>Please add images of your ad</label> <span className="hiddenFileInput">
                              <label for="file-upload" className="custom-file-upload"> Choose file</label>
                              <input className="form-control-file text-capitalize"  type="file" name="SelectFiles" onChange={this.onFileChange} multiple/></span>
                              <span>Recommended upload file size: 500 KB</span> </div>
                          </div>
                        </div>
                        <div className="ad_description">
                          <label>Ad Description</label>
                          <div className="form-group">
                            <div className="ad_description_type">
                              <div className="note-editor">
                                <div className="note-toolbar btn-toolbar">
                                  <div className="form-group m-0">
                                  </div>
                                  {/*<div class="note-style btn-group">
                            <button type="button" class="btn btn-default btn-sm btn-small"><i class="fa fa-bold"></i></button>
                            <button type="button" class="btn btn-default btn-sm btn-small"><i class="fa fa-italic"></i></button>
                            <button type="button" class="btn btn-default btn-sm btn-small"><i class="fa fa-underline"></i></button>
                            <button type="button" class="btn btn-default btn-sm btn-small"><i class="fa fa-text-width"></i></button>
                          </div>
                          <div class="note-para btn-group border-left border-right">
                            <button type="button" class="btn btn-default btn-sm btn-small"><i class="fa fa-list-ul"></i></button>
                            <button type="button" class="btn btn-default btn-sm btn-small"><i class="fa fa-list-ol"></i></button>
                          </div>
                          <div class="note-height btn-group">
                            <button type="button" class="btn btn-default btn-sm btn-small"><i class="fa fa-chain-broken"></i></button>
                            <button type="button" class="btn btn-default btn-sm btn-small"><i class="fa fa-link"></i></button>
                          </div> */}
                                </div>
                                <textarea className="note-codable" defaultValue={""} name="Description" value={this.state.Description}
            onChange={this.handleInputChange} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="price_premium">
                          <div className="price_parts mt-4">      
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="change_password">
                      <h3 className="hider">change password</h3>
                      <form  onSubmit={this.handleSubmit} enctype="multipart/form-data" autoComplete="off" method="POST">
                        <div className="form-group">
                          <label>Name *< ValidationMessage valid={this.state.usernameValid} message={this.state.errorMsg.Name} /></label>
                          <input type="text" name="Name" value={this.state.Name}
            onChange={(e) => this.updateUsername(e)} className="form-control"  />
                          
                        </div>
                        <div className="form-group">
                          <label>Mobile Number *< ValidationMessage valid={this.state.phoneValid} message={this.state.errorMsg.phone} /></label>
                          <input type="tel" name="Phone" value={this.state.Phone}
            onChange={(e) => this.updatePhone(e.target.value)} className="form-control" />
            
                        </div>
                        <div className="form-group">
                          <label>Email *< ValidationMessage valid={this.state.emailValid} message={this.state.errorMsg.email} /></label>  
                          <input type="email" name="email" value={this.state.email}
            onChange={(e) => this.updateEmail(e.target.value)} className="form-control" />
             
                        </div>
                        <div className="form-group countrylist ">
                          <label>city *</label>
                          
              <Autocomplete
        suggestions={this.state.countryList}/>
                        </div>
                        {/* <div className="form-group ">
                          <label>state *< ValidationMessage valid={this.state.usernameValid} message={this.state.errorMsg.state} /></label>
                          <input type="state" name="state" value={this.state.state}
            onChange={(e) => this.updateUsername(e)}  className="form-control" />
            
                        </div> */}
                        <div className="form-group ">
                          <label>Location or Area</label>
                          <input type="Location" name="Location" value={this.state.Location}
            onChange={(e) => this.updateUsername(e)}  className="form-control" />
            
                        </div>
                        <center>
                        {this.state.issubmit ? <button className="change_btn mt-2 text-capitalize" type="submit" value="button"  disabled={!this.state.formValid}>ad post</button>
                         :  <button className="change_btn mt-2 text-capitalize" style={{fontSize: '14px'}} type="submit" disabled="true" value="button"  > <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                         Loading.. Pls wait</button>}
                          
                          </center>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
         );
        }
      }
    
      export default withRouter(PostAdform);