var minislide = (function(){
	var number_of_rows = 4;
    var piece_size = 48;
    var numbers;
    
    $('.piece').live('click', function(e){
        
        // Figure out where we are
		var $clicked = $(e.currentTarget)
        var clickedNumber = $clicked.data('number');
		
		// Can't move the empty piece
        if (clickedNumber == 0){
			return;
		}
		
        var index = numbers.indexOf(clickedNumber);
        var emptyIndex = numbers.indexOf(0);
        
        var clickedRow = ~~(index / number_of_rows);
        var clickedCol = (index % number_of_rows);
        var emptyRow = ~~(emptyIndex / number_of_rows);
        var emptyCol = (emptyIndex % number_of_rows);

        var yDiff = clickedRow - emptyRow;
        var xDiff = clickedCol - emptyCol;
        
        if (Math.abs(yDiff) + Math.abs(xDiff) != 1) 
            return;
        
		// Swap in array
        numbers[index] = 0;
        numbers[emptyIndex] = clickedNumber;
		
		// Update the visualization -- clicked is now empty, empty is now clicked
		// Remember that nth-child is 1 based while our numbers are 0-based.
		$('.piece:nth-child(' + (emptyIndex + 1) + ')')
			.css({
				'background-position': $clicked.css('background-position'),
				'background-image': $clicked.css('background-image')
			})
			.data('number', clickedNumber);
		$clicked
			.css('background-image', 'none')
			.data('number', 0);
    });
    
    function shuffle() {
        var pieceCount = number_of_rows * number_of_rows;
        numbers = new Array(pieceCount);
        
        for (var i = 0; i < pieceCount ; i++)
        {
            var position = Math.floor((Math.random()*i));        
            numbers[i] = numbers[position];
            numbers[position] = i;
        }
    }
    
    function render($container) {
		$container.html('');
		
        $.each(numbers, function(i, e){
			var top = "-" + (~~(e / number_of_rows) * piece_size) + "px";
			var left = "-" + ((e % number_of_rows) * piece_size)  + "px";

			$('<div>')
				.addClass('piece')
				.data('number', e)
				.css({
					'background-position': left + ' ' + top
				})
				.appendTo($container);
        });
    }
    
	function updateImage(imgSrc){
		$('.piece')
			.css({
				'background-image': 'url(' + imgSrc + ')',
				'background-size': '192px 192px' // TODO: Normalize the size
			});
			
		var emptyChild = numbers.indexOf(0) + 1; // +1 because of nth-child being 1 based
		$('.piece:nth-child(' + emptyChild + ')')
			.css('background-image', 'none');
	}
    
	function init($container, imgSrc){
        shuffle();
        
		render($container);
		
		if (imgSrc){
			updateImage(imgSrc);
		}
    }

    return {
        init: init,
		updateImage:updateImage
    };
})();