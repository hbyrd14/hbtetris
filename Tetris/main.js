var boxNum = 1; //assigns each box a number on the Grid
var numOfRowsColumns = Number(prompt("How many Rows/Columns? "));



function createGrid() { //Creates the grid for the game
    for (var i=0; i < numOfRowsColumns; i++){
        for (var j=0; j < numOfRowsColumns; j++){
            $("#container").append("<div class='box" +boxNum+ "'</div>"); //ex: box1,box2
            $(".box"+boxNum).addClass("grid");
            boxNum++;
        }
    }
    $(".grid").width(540/numOfRowsColumns);
    $(".grid").height(540/numOfRowsColumns);  
}

function boxShape(){ //creates the box shape
    var boxShapeNum = Math.floor(Math.random() * (numOfRowsColumns - 1) + 1);
    var leftBoxes = boxShapeNum;
    var rightBoxes = boxShapeNum + 1;
    for(var i=0; i<2; i++){
        $( ".box"+ boxShapeNum ).addClass("boxColor");
        $( ".box"+ (boxShapeNum + numOfRowsColumns) ).addClass("boxColor");
        boxShapeNum++;
    }
    
    //THIS MOVES THE BOX
    var moveTheBox = setInterval(function(){
        
        //LEFT SIDE OF THE BOX
        $( ".box"+ leftBoxes ).removeClass("boxColor");
        $( ".box"+ (leftBoxes + numOfRowsColumns) ).removeClass("boxColor");
        $( ".box"+ (leftBoxes += numOfRowsColumns) ).addClass("boxColor");
        $( ".box"+ (leftBoxes + numOfRowsColumns) ).addClass("boxColor");
        
        //RIGHT SIDE OF THE BOX
        $( ".box"+ rightBoxes ).removeClass("boxColor");
        $( ".box"+ (rightBoxes + numOfRowsColumns) ).removeClass("boxColor");
        $( ".box"+ (rightBoxes += numOfRowsColumns) ).addClass("boxColor");
        $( ".box"+ (rightBoxes + numOfRowsColumns) ).addClass("boxColor");
        
        if ((leftBoxes + numOfRowsColumns) >= ((numOfRowsColumns * numOfRowsColumns) - numOfRowsColumns) && (rightBoxes + numOfRowsColumns) >= ((numOfRowsColumns * numOfRowsColumns) - numOfRowsColumns)){ //IF BOTH SIDES OF BOX TOUCH THE BOTTOM...
                clearInterval(moveTheBox);
                shapesArray[ Math.round( Math.random()*2 ) ](); //calls next shape
            }
        
        //IF THERE'S A SHAPE UNDER LEFT SIDE OF BOX, STOP MOVING. CALL THE NEXT SHAPE.
        if ( $( ".box"+ (leftBoxes + numOfRowsColumns*2) ).hasClass("rectangleColor") || $( ".box"+ (leftBoxes + numOfRowsColumns*2) ).hasClass("boxColor") || $( ".box"+ (leftBoxes + numOfRowsColumns*2) ).hasClass("backLColor") || $( ".box"+ (rightBoxes + numOfRowsColumns*2) ).hasClass("rectangleColor") || $( ".box"+ (rightBoxes + numOfRowsColumns*2) ).hasClass("boxColor") || $( ".box"+ (rightBoxes + numOfRowsColumns*2) ).hasClass("backLColor") ) {
            clearInterval(moveTheBox);
            shapesArray[ Math.round( Math.random()*2 ) ](); //calls next shape
            boxShape();
        }
                
    },800);
    
    $("#stop-button").on("click", function(){ //FREEZES THE GAME
        clearInterval(moveTheBox);
    });
}//End function boxShape() 

function rectangleShape() { //creates the long rectangle shape
    var recShapeNum = Math.floor(Math.random() * (numOfRowsColumns - 1) + 1);
    var topOfRec = recShapeNum;
    for(var i=0; i<3; i++){
       $( ".box"+ recShapeNum ).addClass("rectangleColor");
        recShapeNum += numOfRowsColumns;
    }
    var bottomOfRec = recShapeNum;
   
    //THIS MOVES THE RECTANGLE
    var moveTheRec = setInterval(function(){
        $( ".box"+ bottomOfRec ).addClass("rectangleColor");
        $( ".box"+ topOfRec ).removeClass("rectangleColor"); 
        topOfRec += numOfRowsColumns;
        
        
        if ( $( ".box"+ (bottomOfRec + numOfRowsColumns) ).hasClass("rectangleColor") || $( ".box"+ (bottomOfRec + numOfRowsColumns) ).hasClass("boxColor") || $( ".box"+ (bottomOfRec + numOfRowsColumns) ).hasClass("backLColor") ) {
            clearInterval(moveTheRec);
            shapesArray[ Math.round( Math.random()*2 ) ](); //calls next shape
        }
        
        
        if (bottomOfRec >= ((numOfRowsColumns * numOfRowsColumns) - numOfRowsColumns)){
            clearInterval(moveTheRec);
            shapesArray[ Math.round( Math.random()*2 ) ](); //calls next shape
        }
        
        bottomOfRec += numOfRowsColumns;
    }, 800); 
   
    $("#stop-button").on("click", function(){ //FREEZES THE GAME
        clearInterval(moveTheRec);
    });    
    
} //END FUNCTION rectangleShape() 

function backLShape(){
    var backLShapeNum = Math.round(Math.random() * ((numOfRowsColumns*3-1)-(numOfRowsColumns*2+1)) + (numOfRowsColumns*2+1) );
    
    var frontofBackL = backLShapeNum; //sets value of front of L
    
    $( ".box"+ backLShapeNum ).addClass("backLColor");
    $( ".box"+ (backLShapeNum+=1) ).addClass("backLColor");
    var bottomOfBackL = backLShapeNum; //sets value of bottom of L
    for(var i=0; i<2; i++){
        $( ".box"+ (backLShapeNum -= numOfRowsColumns) ).addClass("backLColor");
    }
    var topOfBackL = backLShapeNum; //sets value of top of L
    
    //THIS MOVES THE BACKWARDS L
        var moveTheL = setInterval(function(){
             
            //THIS MOVES THE LITTLE BOX OF THE BACKWARDS L 
            $( ".box"+ frontofBackL ).removeClass("backLColor");
            frontofBackL += numOfRowsColumns;
            $( ".box"+ frontofBackL ).addClass("backLColor");
        
            //THIS MOVES THE TALL PART OF THE BACKWARDS L
            bottomOfBackL += numOfRowsColumns;
            $( ".box"+ topOfBackL ).removeClass("backLColor");
            $( ".box"+ bottomOfBackL ).addClass("backLColor"); 
            topOfBackL += numOfRowsColumns;
            
         
        
            if (bottomOfBackL >= ((numOfRowsColumns * numOfRowsColumns) - numOfRowsColumns)){
                clearInterval(moveTheL);
                shapesArray[ Math.round( Math.random()*2 ) ](); //calls next shape
            }
            
            //CONTINUE HERE
 
        }, 800);
    
    $("button").on("click", function(){ //FREEZES THE GAME
        clearInterval(moveTheL);
    });

} //End function backLShape() 

var shapesArray = [ function() {boxShape();},
                    function() {rectangleShape();},
                    function() {backLShape();}
                  ];

$(document).ready(function(){
   
   createGrid();
  // shapesArray[ Math.round( Math.random()*2 ) ]();
    boxShape();
    
    //RESTARTS THE GAME
    $("#play-button").on("click", function(){
        $(".grid").removeClass("boxColor").removeClass("rectangleColor").removeClass("backLColor"); 
        shapesArray[ Math.round( Math.random()*2 ) ]();
    });    
    
    //CLEARS ALL PIECES FROM THE GRID
    $("#clear-button").on("click", function(){
        $(".grid").removeClass("boxColor").removeClass("rectangleColor").removeClass("backLColor"); 
    });
    
});


