var minislide = (function(){
    var number_of_rows = 4;
    var piece_size = 50;
    var numbers;
    
    $('.piece').live('click', function(e){
        
        var $clicked = $(e.currentTarget)
        
        // Figure out where we are
        var clickedNumber = $clicked.data('number');
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
        
        numbers[index] = 0;
        numbers[emptyIndex] = clickedNumber;
        $clicked.animate({
            top: '-=' + (yDiff * piece_size), 
            left: '-=' + (xDiff * piece_size)
        });
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
    
    function render(container) {
        $.each(numbers, function(i, e){
            if (e > 0) // No piece for 0
            {        
                $('<div>')
                    .data('number', e)
                    .addClass('piece')
                    .html(e)
                    .offset({
                        top:~~(i / number_of_rows) * piece_size, 
                        left:(i % number_of_rows) * piece_size
                    })
                   .appendTo(container);
            }
        });
    }
    
    function init(container){
        shuffle();
        render(container);
    }

    return {
        init: init
    };
})();