const populateCharactersTable = function(){
	$.ajax({
		method: 'GET',
		url: '/characters',
		success:function(res){
			/*
				Part 1. (Get this done before doing the post)

				Retrieve all of the characters from the database
				and populate their information into an HTML Table
			*/
		}
	});
}

populateCharactersTable();

$('#insert-character-form').on('submit', function(e){
	/*
		Part 2

		When the character form is submitted:
		1. make sure all of the inputs are filled in. If not, alert the user
		2. make sure that if the description uses single quotes that they're escaped

		I have created functions below to help with 1 & 2 here

		3. If all inputs are filled, then send all of the input values over to the
		   server side in an object using a Ajax POST
		4. If the server side sends a successful response, then alert the user
		   that the character was added successfully. Once you refresh the page,
			 the table should have a new row in it with the character that was just inputted

			 If the server side sends
			 an error response, alert the user that there was an error.

		Bonus: Have the new character updated in the table without refreshing the page
	*/
	e.preventDefault();

});

String.prototype.isEmptyInput = function(){
	return this === "";
}

function escapeSingleQuotes(string){
	const splitString = string.split("");
	for(var i = 0; i < splitString.length; i++){
		if(splitString[i] === "'"){
			splitString[i] === "\'"
		}
		return splitString.join("");
	}
}
