function userVerify() {
console.log("1");
var otp = document.getElementById('SignUpOtp').value;
var email = localStorage.getItem("email");
console.log("otp");
if (otp == "") {
console.log("3");
alert("Enter the OTP please..!")
}
else {
console.log("4");
var param_otp = {
"email": email,
"otp": otp
}
console.log(param_otp);
var otpverifyurl = "http://127.0.0.1:8080/otpauth";
$.ajax({
method: "POST",
url: otpverifyurl,
data: JSON.stringify(param_otp),
contentType: "application/json",
timeout: 6000,
dataType: "json",
mode: "no-cors",
success: successFunction,
error: errorFunction
});
}
}
function errorFunction(data, response) {// success callback function
console.log(data);
console.log(response);
if(data.responseText == "OTP Verification Failed"){
alert("Otp Verification Failed");
}
else if (data.responseText == "Wrong Email"){
alert("otp not associated to this email");
}
else{
window.location = "sign_in";
}
}function successFunction(response) {
console.log("13");
console.log(response);
alert(JSON.stringify(response));
window.location = "sign_in";
}function onlyNumberKey(evt){
var code = (evt.which) ? evt.which : evt.keyCode
if(code>31 && (code<48 || code>57))
return false;
return true;
}

