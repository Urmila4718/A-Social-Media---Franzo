var dataparameter="";
function userSignIn(){
	//debugger;
	var EmailId = document.getElementById('EmailId').value;
	console.log(mobile);
	var Password = document.getElementById('Password').value;
	console.log(Password);
	
	if(EmailId == ""){
		console.log("1");
		alert("Enter the valid EmailId");
		
	}
	else if(Password == ""){
		console.log("2");
		alert("please enter the password");
	}
	else {
		console.log("3")
		var signInParams = {
			"email" : EmailId,
			"password" : Password
		};
		var signInURL =  "http://127.0.0.1:8080/";
		console.log(signInURL);
		console.log(signInParams);
		$.ajax({
			method : "POST",
			url: signInURL, 
			data:JSON.stringify(signInParams),
			contentType:"application/json",
			dataType : 'json',
			success :
				    function (data, response) {// success callback function
				    console.log("This is data");
				    console.log(data);
				    console.log("This is response");
				    console.log(response);
				  //  if(data.responseText == "Login Successful"){
					
					alert("Logged In Successful");
					dataparameter = data;
					console.log(data)
					console.log("this is data parameter");
					console.log(dataparameter);
					localStorage.setItem("Name",dataparameter.name);
					localStorage.setItem("Name",dataparameter.name);
					localStorage.setItem("Location", dataparameter.location);
					localStorage.setItem("Friendscount",dataparameter.friendscount);
				    window.location = "franzoohomepage";
			},	            	
			error : function (data, response) {// success callback function
            //alert(JSON.stringify(data)+" -> "+status);
            console.log("5");
            console.log("This is data");
				    console.log(data);
				   // console.log("This is response");
				    console.log(response);
            	    console.log("Response-->", response);
           
				alert("wrong credentials");
				window.location = "sign_in";


    			
	 }
		});
	}
}

  function onlyNumberKey(evt){
		var code = (evt.which) ? evt.which : evt.keyCode
			if(code>31 && (code<48 || code>57))
				return false;
			return true;
}
