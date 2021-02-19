// setting up this client-side get to communicate with the get that we created on the server-side
// receiving the information that we're send to the client from the server
const populateDogsList = function(){
	$.ajax({
		method: 'GET',
		url: '/dogs',
		success:function(res){
			console.log(res)

			res.data.forEach((dog) => {
				//populating dogs in the unordered list
				let dogBreedLi = $("<li>");
				dogBreedLi.text(dog.breed);
				$(".dogs-list").append(dogBreedLi);
			})
		}
	});
}

// calling the function that i created above to get all of the dog breeds
populateDogsList();

$('#insert-dog-breed-form').on('submit', function(e){
	e.preventDefault();

	// storing all of the input values into this object
	var dogBreedPostBody = {
		breed: $("#breed-input").val(),
		origin: $("#origin-input").val(),
		size: $("#size-input").val(),
		average_life_span: $("#average-life-span-input").val()
	};

	// setting up this client-side post to communicate with the post that we created on the server-side
	// putting the dogBreedPostBody in the data field to be sent over to the server as req.body
	$.ajax({
		method: 'POST',
		url: '/dogs',
		data: JSON.stringify(dogBreedPostBody),
		contentType: 'application/json',
		success:function(res){
			$("#successful-post").empty();
			$("#error-message").empty();
			// this is the callback on the client side
			// this is where the response from the server will end up
			console.log(res)
			if(res.success){
				// if res.success is equal to true
				$("#successful-post").text("YES!")
			} else {
				// if res.success is equal to false
				$("#successful-post").text("NO :(")
				if(res.error.sqlMessage === "Column 'breed' cannot be null"){
					$("#error-message").text("Error: Can not leave 'Breed' input Empty")
				}
			}
		}
	})
});

$.ajax({
	method: 'GET',
	url: '/whatever',
	success:function(res){
		console.log(res)
		$(".random-additional-message").text(res.message)
	}
});
