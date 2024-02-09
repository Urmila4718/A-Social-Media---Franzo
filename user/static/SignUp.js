	var globalvar = "";
	function userReg() {
	var name=document.getElementById('Name').value;
	var mob = document.getElementById('mobilenumber').value;
	var email = document.getElementById('Emailid').value;
	var pass = document.getElementById('inputpassword').value;
	var confpass = document.getElementById('ConfirmPassword').value;
	
	if(name=="")
	{
	alert("enter name");
	}
	else if(mob=="")
	{
	alert("enter mob_no.");
	}
	else if(email=="")
	{
	alert("enter email.");
	}
	else if(pass=="")
	{
	alert("enter pass.");
	}
	else if(confpass!= pass)
	{
	alert("password doesn't match'.");
	}
	else
	{
	var params={
	"name":name,
	"email" :email,
	"mob" : mob,
	"password" : pass,
	"created_at": "",
	"is_Private" : false
	};
	var urlString = "http://127.0.0.1:8080/process_register";
	$.ajax({
	method:"POST",
	url: urlString,
	data:JSON.stringify(params),
	contentType:"application/json",
	timeout:6000,
	dataType : 'json',
	mode:"no-cors",
	success: successFunction,
	error: errorFunction
	})
	}
	}
	function successFunction(response)
	{
	console.log(response);
	alert(JSON.stringify(response));
	globalvar = response;
	localStorage.setItem("email",globalvar.email);
	window.location = "signUpOtp";
	}
	function errorFunction(){
	alert("Something went wrong");
	}
	
	function onlyNumberKey(evt){
	var code = (evt.which) ? evt.which : evt.keyCode
	if(code>31 && (code<48 || code>57))
	return false;
	return true;
	}