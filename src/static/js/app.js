
var TUTORIAL_REPOSITORY = 'http://leonsmits.github.io/src/ttl';



$('#messageInput3').on('input', function(e){
	var message = $('#messageInput3').val();
	var lld_autocomplete_url = 'http://linkedlifedata.com/autocomplete.json?callback=?';
	var data = {'q': message, 'limit': 100};
	$.getJSON(lld_autocomplete_url, data=data, function(json){
		var pre = $('<pre></pre>');
		pre.text(JSON.stringify(json));
		$('#linktarget6').html(pre);
	});
});
$('#messageInput7').on('input', function(e){
	var message = $('#messageInput7').val();
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
			a.attr('href',uri);
			li.append(a);
			ul.append(li);
		}
		$('#linktarget7').html(ul);
	});
});
$('#messageInput8').on('input', function(e){
	var message = $('#messageInput8').val();
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
			a.on('click', {'uri': uri}, function(e){
				alert('You clicked '+ e.data.uri);
			});
			li.append(a);
			ul.append(li);
		}
		$('#linktarget8').html(ul);
	});
});
$('#messageInput9').on('input', function(e){
	var message = $('#messageInput9').val();
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
			a.on('click', {'uri': uri}, function(e){
				var clicked_uri = e.data.uri;
				var query = 'DESCRIBE <'+clicked_uri+'>';
				var endpoint = 'http://linkedlifedata.com/sparql.rdf';
				var format = 'RDF';
				$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(json){
					console.log(json);
					var pre = $('<pre></pre>');
					pre.text(JSON.stringify(json));
					$('#linktarget9').html(pre);
				});
			});
			li.append(a);
			ul.append(li);
		}
		$('#linktarget9').html(ul);
	});
});
$('#messageInput10').on('input', function(e){
	var message = $('#messageInput10').val();
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
			console.log(uri);
			a.on('click', {'uri': uri}, function(e){
				var clicked_uri = e.data.uri;
				console.log('Clicked URI: <'+clicked_uri+'>');
				var query = 'DESCRIBE <'+clicked_uri+'>';
				var endpoint = 'http://linkedlifedata.com/sparql.rdf';
				var format = 'RDF';
				$('#linktarget10').html("<div>Querying endpoint...</div>");
				$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format}, function(data){
					console.log(data);
					var pre = $('<pre></pre>');
					pre.text(data);
					$('#linktarget10').html(pre);
					pre.attr('id','pre10');
					$('#link10').toggleClass('disabled');
					$('#link10').on('click',function(e){
						var rdf_data = $('#pre10').text();
						$.post('/store',data={'data': rdf_data}, function(data){
							var pre = $('<pre></pre>');
							pre.text(data);
							$('#linktarget10').html(pre);
							$('#link10').toggleClass('disabled');
						});
					});
				});
			});
			li.append(a);
			ul.append(li);
		}
		$('#linktarget10').html(ul);
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
					pre.attr('id','pre11');
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
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value);
						a.text(v_value);
						li.append(a);
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
