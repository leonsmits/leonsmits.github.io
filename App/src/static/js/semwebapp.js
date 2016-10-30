
/*
// #############
// CONFIGURATION
// #############
*/

var REPOSITORY = 'http://localhost:5820/zootology';

// Autocompletion from Linked Life Data

// http://linkedlifedata.com/autocomplete.json?
// Parameters are 'q' for query and some limit.
// Note that we have to add a 'callback=?' suffix to the URI, to make sure the call is a JSONP request.
$('#messageInput').on('input', function(e){
	var message = $('#messageInput').val();

	var lld_autocomplete_url = 'http://linkedlifedata.com/autocomplete.json?callback=?';

	var data = {'q': message, 'limit': 25};

	$.getJSON(lld_autocomplete_url, data=data, function(json){

		var ul = $('<ul></ul>');
		ul.addClass('list-group');
		for (var i in json.results) {
			var r = json.results[i];

			var uri = r.uri.namespace + r.uri.localName;
			var label = r.label;

			var li = $('<li></li>');
			li.addClass('list-group-item');
			var a = $('<a></a>');
			a.html(label);

			console.log(uri);

			a.on('click', {'label': label}, function(e){
				var label = e.data.label;
				var query = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\nCONSTRUCT {	?s rdfs:label "'+label+'" .\n ?s ?p1 ?o1 . ?o1 ?p2 ?o2 . } WHERE { ?s rdfs:label "'+label+'"@en;\n ?p1 ?o1 .\n ?o1 ?p2 ?o2 .}';
				var clicked_uri = e.data.uri;
				var descriptive = 'DESCRIBE <'+clicked_uri+'>';
				var endpoint = REPOSITORY + '/query';
				var format = 'RDF';
				var rdf_data = $('#schema').val();

				$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(data){
					var pre = $('<pre></pre>');
					pre.text(JSON.stringify(json));
					$('#linktarget').html(pre);

					// New, set an identifier on our <pre> tag

					pre.attr('id','pre');

					// New, enable the button, and add a click handler

					$('#link').toggleClass('disabled');

					$('#link').on('click',function(e){
						var rdf_data = $('#pre').text();
						var message = $('#messageInput1').val();

						$.post('/store',data={'data': rdf_data}, function(data){
							var pre = $('<pre></pre>');
							pre.text(data);
							$('#linktarget').html(pre);
							$('#link').toggleClass('disabled');
						});
							$.get('/show',data={'message': message}, function(data){
								// If successful, add the data to the DOM tree.
								$('#linktarget').html(data);
							});

					});

				});

			});

			li.append(a);
			ul.append(li);
		}

		$('#linktarget').html(ul);
	});
});

$('#messageInput11').on('input', function(e){
	var message = $('#messageInput11').val();

	var lld_autocomplete_url = 'http://linkedlifedata.com/autocomplete.json?callback=?';

	var data = {'q': message, 'limit': 100};

	$.getJSON(lld_autocomplete_url, data=data, function(json){

		var ul = $('<ul></ul>');
		ul.addClass('list-group');
		for (var i in json.results) {
			var r = json.results[i];

			var uri = r.uri.namespace + r.uri.localName;
			var label = r.label;

			var li = $('<li></li>');
			li.addClass('list-group-item');
			var a = $('<a></a>');
			a.html(label);

			a.on('click', {'label': label}, function(e){
				var label = e.data.label;
				var query = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\nCONSTRUCT {	?s rdfs:label "'+label+'" .\n ?s ?p1 ?o1 . ?o1 ?p2 ?o2 . } WHERE { ?s rdfs:label "'+label+'"@en;\n ?p1 ?o1 .\n ?o1 ?p2 ?o2 .}';
				var endpoint = 'http://live.dbpedia.org/sparql';
				var format = 'RDF';

				$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(data){
					var pre = $('<pre></pre>');
					pre.text(data);
					$('#linktarget11').html(pre);

					// New, set an identifier on our <pre> tag

					pre.attr('id','pre11');

					// New, enable the button, and add a click handler

					$('#link11').toggleClass('disabled');

					$('#link11').on('click',function(e){
						var rdf_data = $('#pre11').text();

						$.post('/store',data={'data': rdf_data}, function(data){
							var pre = $('<pre></pre>');
							pre.text(data);
							$('#linktarget11').html(pre);
							$('#link11').toggleClass('disabled');
						});

					});

				});

			});

			li.append(a);
			ul.append(li);
		}

		$('#linktarget11').html(ul);
	});
});

$('#link12').on('click',function(e){
	var rdf_data = $('#schema').val();

	$.post('/store',data={'data': rdf_data}, function(data){
		var pre = $('<pre></pre>');
		pre.text(data);
		$('#linktarget12').html(pre);
	});

});


/*
// ############
//    STEP 13
// ############
*/

$('#link13').on('click', function(e){

	var query = $('#query13').text();
	var endpoint = TUTORIAL_REPOSITORY + '/query';
	var format = 'JSON';

	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(json){
		var pre = $('<pre></pre>');
		pre.text(JSON.stringify(json));
		$('#linktarget13').html(pre);
	});

});


/*
// ############
//    STEP 14
// ############
*/

$('#link14').on('click', function(e){

	var query = $('#query14').val();
	var endpoint = TUTORIAL_REPOSITORY + '/query';
	var format = 'JSON';

	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(json){
		console.log(json);

		try {
			var vars = json.head.vars;

			var ul = $('<ul></ul>');
			ul.addClass('list-group');

			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');

				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];

					li.append('<strong>'+v+'</strong><br/>');

					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						a.text(v_value);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');

				});
				ul.append(li);

			});

			$('#linktarget14').html(ul);
		} catch(err) {
			$('#linktarget14').html('Something went wrong!');
		}



	});

});

