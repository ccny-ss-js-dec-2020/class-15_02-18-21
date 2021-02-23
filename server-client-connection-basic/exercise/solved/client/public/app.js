// setting up this client-side get to communicate with the get that we created on the server-side
// receiving the information that we're send to the client from the server
const populateCharactersTable = function(){
	$.ajax({
		method: 'GET',
		url: '/characters',
		success:function(res){
			res.data.forEach((character) => {
				const tr = $("<tr>");
				const nameTd = $("<td>");
				const speciesTd = $("<td>");
				const performedByTd = $("<td>");
				const descriptionTd = $("<td>");

				nameTd.text(character.name);
				speciesTd.text(character.species);
				performedByTd.text(character.performedBy);
				descriptionTd.text(character.description);

				tr.append(nameTd).append(speciesTd).append(performedByTd).append(descriptionTd);
				$(".characters-table").append(tr);
			})
		}
	});
}

// calling the function that i created above to get all of the sesame street characters
populateCharactersTable();

$('#insert-character-form').on('submit', function(e){
	//make sure all of the inputs are filled in
	//make sure if they use single quotes that they're escaped
	e.preventDefault();

	const name = $("#name-input").val();
	const species = $("#species-input").val();
	const performedBy = $("#performed-by-input").val();
	const description = $("#description-input").val();

	if(!name.isEmptyInput() && !species.isEmptyInput() && !performedBy.isEmptyInput() && !description.isEmptyInput()){
		var characterPostBody = {
			name: name,
			species: species,
			performedBy: performedBy,
			description: escapeSingleQuotes(description)
		};

		// setting up this client-side post to communicate with the post that we created on the server-side
		$.ajax({
			method: 'POST',
			url: '/characters',
			data: JSON.stringify(characterPostBody),
			contentType: 'application/json',
			success:function(res){
				if(res.success){
					alert("Character Added Successfully")
					const tr = $("<tr>");
					const nameTd = $("<td>");
					const speciesTd = $("<td>");
					const performedByTd = $("<td>");
					const descriptionTd = $("<td>");

					nameTd.text(res.newCharacter.name);
					speciesTd.text(res.newCharacter.species);
					performedByTd.text(res.newCharacter.performedBy);
					descriptionTd.text(res.newCharacter.description);

					tr.append(nameTd).append(speciesTd).append(performedByTd).append(descriptionTd);
					$(".characters-table").append(tr);
				} else {
					alert("Error in Adding Character")
				}
			}
		})
	} else {
		alert("Please Input Values for All Fields")
	}

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
