// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');

		var $tempInput = $('<input type="text">');

		function changeToInput() {
			var $input = $tempInput.clone();

			$input.val($(this).text());


			$(this).replaceWith($input);

			$input.blur(function () {
				cardDescription = $('<p class="card-description">'+$(this).val()+'</p>');
				cardDescription.click(changeToInput);
				$(this).replaceWith(cardDescription);

				$.ajax({
					url: baseUrl + '/card/' + self.id,
					method: 'PUT',
					data: {
						id: self.id,
						name: $(this).val(),
						bootcamp_kanban_column_id: self.bootcamp_kanban_column_id

					},
					success: function(response) {

					}
				});
			});

			$input.focus();
		}

		cardDescription.click(changeToInput);

		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      success: function(){
        self.element.remove();
      }
    });
}
}
