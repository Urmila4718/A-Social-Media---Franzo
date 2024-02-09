var globalvar = "";
function PrivateAccount() {
		//console.log(Private_Acc);
		var Private_Acc=document.getElementById('Private_Acc').value;
	    console.log("1");
		var emailId=localStorage.getItem("email");
		console.log("2");
		var params={
			"email" :emailId,
			"is_Private" : Private_Acc,
			};
		if (document.getElementById('Private_Acc').checked){
		    var urlString = "http://127.0.0.1:8080/updatePrivateStatus"
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
		   else {
			 alert("Your Account is Public Now!");
		   }
		  }
		  
		 
    	function TwoFunction(data) 
    	{
    	//alert(JSON.stringify(response));
	    globalvar = data;
	    coonsole.log(globalvar);
    	window.location = "PreferencePage";
    	alert("Your Account is Private Now!");
		}
		
		function errorFunction(){
		alert("Something went wrong");
		}
