function userProfile(){

	debugger;
	var name = localStorage.getItem("name");
	var friendscount = document.getElementById('friendscount').value;
	console.log(friends);
	var location = document.getElementById('location').value;
	console.log(location);
	
		var profileParams = {
			"username" : name,
			"friendscount"  :friendscount,
			"location" : location
		};
		//console.log(profileURL);
		console.log(profileParams);
		$.ajax({
			method : "GET",
			//url: profileURL, 
			data:JSON.stringify(profileURL),
			contentType:"application/json",
			dataType : 'json',
			success :
				    function (data) {// success callback function
				    console.log(data);
					profileparameters = data;
					localStorage.getItem("Name",profileparameters.name);
					localStorage.setItem("Location",profileparameters.location);
					localStorage.setItem("Friendscount", profileparameters.friendscount);
				    window.location = "combine_profile";
				},
	
			            	
			error : function (data) {// success callback function
            //alert(JSON.stringify(data)+" -> "+status);
            console.log("4");
            
            if(data.responseText == "Invalid data"){
				alert("wrong username");
				window.location = "combine_profile";
} else{
	window.location = "franzoohomepage";
}

    			
	 }
		});
	
}
