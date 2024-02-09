//const form = document.getElementById('SignUpForm');
//form.addEventListener('submit',userReg);
//console.log("Inside Script");
var globalvariable = "";
  function userPreference() {
	var email=document.getElementById('Email-id').value;
	console.log("1");
	var old_password = document.getElementById('OldPassword').value;
	console.log("2");
	var new_password = document.getElementById('NewPassword').value;
	console.log("3");
	var confirm_password = document.getElementById('ConfirmPassword').value;
	console.log("4");
	var emailId=localStorage.getItem("email");
	
	if(email=="")
	{
		console.log("5");
		alert("enter email");
	}
	/*else if(email!="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/")
	{
		console.log("6");
		alert("enter valid email.");
	}*/
	else if (!email.match(emailId))
	{
		alert("Invalid Email")
		console.log("7");
	}
	else if(old_password=="")
	{
		console.log("8");
		alert("enter old password.");
	}
	else if(new_password=="")
	{
		console.log("9");
		alert("enter new Password.");
	}
	else if(confirm_password=="")
	{
		console.log("10");
		alert("enter confirm password");
	}
	else if(old_password== new_password)
	{
		console.log("11");
		alert("Old Password and New Password should not be same");
	}
	else if(confirm_password!= new_password)
	{
		console.log("12");
		alert("password doesn't match'.");
	}
	else
	{
		
	
		console.log("13");
		var params={
			"email" :emailId,
			"oldPassword" : old_password,
		   	"newPassword" : new_password,
	};
	
		var urlString = "http://127.0.0.1:8080/changePassword";
       console.log("14");
		console.log(params);
        $.ajax({method:"POST" , 
    	url: urlString,
    	data:JSON.stringify(params) , 
     	contentType:"application/json" ,
     	timeout:6000, 
     	dataType : 'json', 
    	mode:"no-cors", 
     	success:
    	function (data) {// success callback function
    	globalvariable = data;
    	console.log(globalvariable);
            	window.location = "PreferencePage";
            	alert("Password Changed Successfully");
			
    },
    error: function () {// success callback function
            //alert(JSON.stringify(data)+" -> "+status);
           /* if(data.responseText == ""){
				alert("");
}else{*/
		window.location = "PreferencePage";
    		
	
          
    }
    });
  
	}
//	function successFunction(response)
//	{
//		console.log(response);
//		
//      alert(JSON.stringify(response));
//	}
//    
      
  }
  
  function onlyNumberKey(evt){
		var code = (evt.which) ? evt.which : evt.keyCode
			if(code>31 && (code<48 || code>57))
				return false;
			return true;
}
