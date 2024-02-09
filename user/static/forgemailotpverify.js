
	function userVerify(){
		console.log("1");
		var otp=document.getElementById('forgetOtp').value;
		var email=localStorage.getItem("forgetEmail");
		
		console.log("2");
		if(otp == ""){
			console.log("3");
			alert("Enter the OTP please..!")
		}
		else{	
			console.log("4");	
			var param_otp = {
				"email": email,
				"otp" : otp
			}
			console.log("5");
		var otpvrifyurl = "http://127.0.0.1:8080/forgetPasswordOtp";
    $.ajax({
			method:"POST", 
    		url: otpvrifyurl, 
    		data:JSON.stringify(param_otp),
     		contentType:"application/json",
     		timeout:6000, 
     		dataType : 'json',
      mode:"no-cors",
      success:
	    function () {// success callback function
	    	alert("Success");
	            	window.location = "sign_in";			
	    },
    error: function (data) {// success callback function
           if(data.responseText=="OTP Verification Failed")
           {
		alert("Invalid OTP Entered");
	
	
		   }else
		   {
			        	window.location = "sign_in";
	
			
		}
           //alert("OTP is Invalid!");
    			//window.location = "/SignUp_OTP";
	
            /*if(data.responseText=="Success")
            {
				window.location.url = "SignUp_OTP";
			}*/
    }
    });
    //console.log("14");	
	}
//	function successFunction(response)
//	{
//		console.log("13");
//		
//      alert(JSON.stringify(response));
//	}
    
	}
	
		function onlyNumberKey(evt){
		var code = (evt.which) ? evt.which : evt.keyCode
			if(code>31 && (code<48 || code>57))
				return false;
			return true;
	}
	
