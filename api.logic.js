// Allow for hebrew characters to be sent
axios.defaults.headers = {
  "Content-Type": "application/json;charset=UTF-8"
}

// Javscript for some reason won't read hebrew characters properly, so this converts Javscript Hebrew representation
//     to proper Unicode
// hebText: the hebrew text to convert
function ConvertHebrewToUnicode(hebText) {
	var hebDict = {"א": "\u05D0", "ב": "\u05D1", "ג": "\u05D2", "ד": "\u05D3", "ה": "\u05D4", "ו": "\u05D5", 
				   "ז": "\u05D6", "ח": "\u05D7", "ט": "\u05D8", "י": "\u05D9", "כ": "\u05DB", "ך": "\u05DA", 
				   "ל": "\u05DC", "מ": "\u05DE", "ם": "\u05DD", "נ": "\u05E0", "ן": "\u05DF", "ס": "\u05E1", 
				   "ע": "\u05E2", "פ": "\u05E4", "ף": "\u05E3", "צ": "\u05E6", "ץ": "\u05E5", "ק": "\u05E7", 
				   "ר": "\u05E8", "ש": "\u05E9", "ת": "\u05EA", "װ": "\u05F0", "ױ": "\u05F1",  "ײ": "\u05F2",
				   "׳": "\u05F3", "״": "\u05F4", "׆": "\u05C6"};
	var unicodeStr = "";
	
	for (var i = 0; i < hebText.length; i += 2) {
		 hebChar = hebText.charAt(i) + hebText.charAt(i + 1); // Because for some reason Javascript does this
		 
		 if (hebChar in hebDict) {
			unicodeStr += hebDict[hebChar];
		 }
	}
	console.log(hebText);
	console.log(unicodeStr);
	return unicodeStr;
}

// df should be a json-styled dataframe
// returns a dictionary, first item is a list of column names, second item is a list of rows
function ConvertJSONDataFrame(df) {
	var jsonDF = {};
	jsonDF["columns"] = Object.keys(df);
	
	var rowCount = Object.keys(df[jsonDF["columns"][0]]).length; // Get the row count
	var rowsArr = [];
	
	for (var i = 0; i < rowCount; i++){
		var rowDict = {};
		
		for (var j = 0; j < jsonDF["columns"].length; j++){
			var column = jsonDF["columns"][j];
			
			rowDict[column] = df[column][i.toString()];
		}
		rowsArr.push(rowDict);
	}
	
	jsonDF["rows"] = rowsArr;
	console.log(jsonDF["rows"]);
	return jsonDF;
}



function FootprintsSearch(searchData) {
	const masURL = "https://bclkgexdbk.execute-api.eu-central-1.amazonaws.com/dev/api/v1/search"; // Server url
	const masURL2 = "http://127.0.0.1:5000/api/v1/search"; // Local server url (for testing ONLY)

	// Set POST data
	
	//var searchText = ConvertHebrewToUnicode("יהודא");
	var searchText = searchData["search_text"];//ConvertHebrewToUnicode(searchData["search_text"]);
	var searchLang = searchData["lang"];
	var searchTypes = searchData["search_types"];
	postData = {search_text: searchText, lang: searchLang, search_types: searchTypes};
	
	// Make POST request to the server
	axios.post(masURL, postData).then((response) => {
		var finalResults = response["data"]["final_results"];
		var jsonDF = ConvertJSONDataFrame(JSON.parse(finalResults));
		/*var columnData = [];
		jsonDF["columns"].forEach(function(column){
			columnData.push({title: column});
		});*/
		
		/*$("#example").DataTable({
			data: jsonDF["rows"],
			columns: columnData
		)};*/
		var divResults = document.getElementById("divResults");
		dfRows = jsonDF["rows"];

		if (dfRows.length == 0){
			divResults.innerHTML = "(no search results found)";
		} else {
			divResults.innerHTML = ""; // Clear old results
			for (var i = 0; i < dfRows.length; i++){
				divResults.innerHTML += JSON.stringify(dfRows[i]) + "<br>";
			}
		}
		
		
		//document.getElementById("results").innerHTML = jsonDF["rows"];
		console.log(response);
		//return response["data"];
		return jsonDF;
	}).catch(function (error) {
		console.log(error);
	});
	
	return;
}



