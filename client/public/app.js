const populateCharactersTable = function(){
	$.ajax({
		method: 'GET',
		url: '/characters',
		success:function(res){

			console.log(res);
			res.data.forEach((characters) => {
				// console.log(characters);
				console.log(characters.name);

				let characterTd = $("<td>")
				let speciesTd = $("<td>")
				let performedByTd = $("<td>")
				let descriptionTd = $("<td>")

				characterTd.text(characters.name)
				speciesTd.text(characters.species)
				performedByTd.text(characters.performed_by)
				descriptionTd.text(characters.description)

				let tableRow = $("<tr>")
				tableRow.append(characterTd).append(speciesTd).append(performedByTd).append(descriptionTd);

				$(".characters-table").append(tableRow);
			});
		}
	});

}

populateCharactersTable();


$('#insert-character-form').on('submit', function(e){

	e.preventDefault();

	let character = $("#name-input").val()
	let species = $("#species-input").val()
	let performed_by = $("#performed-by-input").val()
	let description = $("#description-input").val()

	console.log(character)

	if(!character.isEmptyInput() && !species.isEmptyInput() && !performed_by.isEmptyInput() && !description.isEmptyInput()){
		let tableInput = {
			name: character,
			species: species,
			performed_by: performed_by,
			description: description
		};

		$.ajax({
			method: 'POST',
			url:'/characters',
			data: JSON.stringify(tableInput),
			contentType: 'application/json',
			success:function(res){
				if(res.success){
					// let characterTd = $("<td>");
					// let speciesTd = $("<td>");
					// let performedByTd = $("<td>");
					// let descriptionTd = $("<td>");
					//
					// characterTd.text(res.data.name);
					// speciesTd.text(res.data.species);
					// performedByTd.text(res.data.performed_by);
					// descriptionTd.text(res.data.description);
					//
					// let tableRow = $("<tr>");
					// tableRow.append(characterTd);
					// tableRow.append(speciesTd);
					// tableRow.append(performedByTd);
					// tableRow.append(descriptionTd);
					//
					// $(".characters-table").append(tableRow);
					$("tbody").empty();
					populateCharactersTable();
				}else{
					alert("Unsuccessful Post");
				}
			}
		})
	}else{
		alert("Please Check All Fields");
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
