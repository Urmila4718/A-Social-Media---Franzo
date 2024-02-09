var forgemail = "";
console.log("Inside Forget Email Script");
function forgetEmail(){
	var email = document.getElementById('EmailId').value;
	console.log(forgemail);
	
	if(email == ""){
		console.log("1");
		alert("Enter the Email");
	}
	else{
		console.log("2");
		
		var forgetEmailParmas = {
			"email" : email
		};
		var frogEmailString = "http://127.0.0.1:8080/forgetPasswordEmail"
		console.log(forgetEmailParmas);
		console.log(frogEmailString);
		
		$.ajax({
			method :"POST",
			url: frogEmailString, 
			data:JSON.stringify(forgetEmailParmas),
			contentType:"application/json",
			dataType : 'json',
			success :  function (data,response) {// success callback function
			console.log(data);
			forgemail = response.email;
			localStorage.setItem("forgetEmail",forgemail);
            	window.location = "forgetmailverify";
			
    },
    error : function (data, response) {// success callback function
            //alert(JSON.stringify(data)+" -> "+status);
           if(data.responseText == "failed"){
	alert("invalid otp");
	window.location = "forgetPassword";
}
else if (data.responseText == "Email not found"){
	alert("Email Id does not Exsist");
	window.location = "forgetPassword";
}
else if (data.responseText == "Invalid Data"){
	alert("Wrong Credentials");
	window.location = "forgetPassword";
}
else{
	window.location = "forgetmailverify";
}
    			
	
            /*if(data.responseText=="Success")
            {
				window.location.url = "SignUp_OTP";
			}*/
    }
		});
	}
	
}