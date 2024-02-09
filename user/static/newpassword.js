function updatepass(){
	debugger;
	var newPassword = document.getElementById('newpassword').value;
	console.log(newPassword);
	
	var confpassword = document.getElementById('confpassword').value;
	console.log(confpassword);
	
	if(newPassword == ""){
		console.log("1");
		alert("Entre the new password");
	}
	else if (confpassword != newPassword){
		console.log("2");
		alert("password does not matches");
	}
	
	else{
		var updatePassParam = ({
			"password" : newPassword
		});
		
		var updatepassurl = "http://127.0.0.1:8080/forgetNewPassword";
		
		console.log(updatePassParam);
		console.log(updatepassurl);
		
		$.ajax({
			method : "POST",
			url : updatepassurl,
			data:JSON.stringify(updatePassParam),
			contentType:"application/json",
			dataType : 'json',
			success : 
			function (data, response) {// success callback function
				    console.log(data);
				    console.log("Response-->", response);
				            	window.location = "sign_in";
				    
				            	},
			error : 
					function (data, response) {// success callback function
            //alert(JSON.stringify(data)+" -> "+status);
            console.log("5");
            	    console.log("Response-->", response);
            if(data.responseText == "password change failed"){
				alert("wrong credentials");
				window.location = "setnewpassword";
} else{
	window.location = "sign_in";
}

    			
	 }
		});
	}
}