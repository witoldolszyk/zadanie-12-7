// OGÓLNA FUNKCJA

// ZMIENNE
	var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
	var myHeaders = {
	  'X-Client-Id': '2315',
	  'X-Auth-Token': 'caafbea0f629d5011743e93031f7bb36'
	};

// KONFIGURACJA NAGŁÓWKÓW DO ZAPYTAŃ
	$.ajaxSetup({
		headers: myHeaders
	});

	$.ajax({
		url: baseUrl + '/board',
		method: 'GET',
		success: function(response) {
			setupColumns(response.columns);
		}
	});

	function setupColumns(columns) {
		columns.forEach(function (column) {
			var col = new Column(column.id, column.name);
			board.createColumn(col);
			setupCards(col, column.cards);
		});
	}

	function setupCards(col, cards) {
		cards.forEach(function (card) {
			var card = new card(card.id, card.name, card.bootcamp_kanban_column_id);
			col.createCard(card);
		});
	}
