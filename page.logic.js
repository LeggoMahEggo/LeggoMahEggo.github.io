$(document).ready(function(){
	
	
	function GetSearchData(){
		// Get search text
		var textToSearch = $("#textToSearch").val();
		
		// Get types of searches to perform
		var searchTypes = [];
		var searchTypeElements = ["#exactSearch", "#levenshteinSearch", "#soundexSearch"];
		for (var i = 0; i < searchTypeElements.length; i++){
			if ($(searchTypeElements[i]).is(":checked")){
				searchTypes.push($(searchTypeElements[i]).val());
			}
		}
		
		// Get the search language
		var searchLang = $("#lang").val();
		
		return {"search_text": textToSearch, "search_types": searchTypes, "lang": searchLang};
	}
	
	//const masURL = "https://bclkgexdbk.execute-api.eu-central-1.amazonaws.com/dev/api/v1/search";
	
	$("#btn").click(function(){
		var searchData = GetSearchData();
		
		var divElement = document.getElementById("divResults");
		divElement.innerHTML = "(searching...)"
		
		var searchResults = FootprintsSearch(searchData);
		
		/*$("#example").DataTable({
			data: ConvertFootprintsResults(footprintsData),
			columns: [
					{title: "id"},
					{title: "name"},
					{title: "type"},
					{title: "score"}
				]
		});*/
	})
	
	
})