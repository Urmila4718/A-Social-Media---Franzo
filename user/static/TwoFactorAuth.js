var globalvar = "";
function twoFactorAuth() {
	    var TWO_FA=document.getElementById('TwoFA').value;
	    console.log("1");
		var emailId=localStorage.getItem("email");
		console.log("2");
		var params={
			"email" :emailId,
			"twoFA" : TWO_FA
			}
		if (document.getElementById('TWO_FA').checked){
		console.log("3");
		var urlString = "http://127.0.0.1:8080/updateTwoFAStatus"
		$.ajax({
		method:"POST", 
    	url: urlString,
    	data:JSON.stringify(params) , 
     	contentType:"application/json" ,
     	timeout:6000, 
     	dataType : 'json', 
    	mode:"no-cors", 
     	success: TwoFunction,
	    error: errorFunction
	    })
	    }
	    else
	    {
		alert("Two Factor Authentication is OFF Now!");
		
	}
	}
    	function TwoFunction(data) 
    	{
    	//alert(JSON.stringify(response));
	    globalvar = data;
	    coonsole.log(globalvar);
    	window.location = "PreferencePage";
    	alert("Two Factor Authentication is ON");
		}	
		
		function errorFunction(){
		alert("Something went wrong");
		}