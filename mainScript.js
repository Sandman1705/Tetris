$(document).ready(function(){
	var height = $("#wrapper").height();
	var width = $("#wrapper").width();		// not used
	var newFigure = true; // true = new tetromino needs to be created; false = tetromino if falling
	
	var numY = 23;
	var numX = 12;



	//var blockHeight = height / (numY - 2);
	//var blockWidth = width / numX;
	var blockSize = height / (numY - 3);
	
	var a = new Array(numY);
	for(var i = 0; i<a.length; i++){
		a[i] = new Array(numX);
	}
	
	for(var i=0; i<a.length - 1; i++){
		for(var j=1; j<a[i].length - 1; j++){
			a[i][j] = 0;
			//console.log("" + i + " " + j + " " + a[i][j] + " ");
			
		}
		//console.log("\n");
	}
	
	// initialize border block
	for(var i=0; i<a[0].length; i++){
		a[numY - 1][i] = 1;
	}
	for(var j=0; j<a.length; j++){
		a[j][0] = 1;
		a[j][a.length] = 1;
	}
	
	//a[7][5] = 1;
	//a[5][8] = 1;
	var t = blockSize + "px";
	
	
	
	// drawing
	function draw(){
		$("div#wrapper").empty();		// clear DA screen
		
		for(var i=2; i<numY - 1; i++){
			for(var j=1; j<numX - 1; j++){
				$("div#wrapper").append(function(){
					var msg;
					if(a[i][j] == 1){
						msg = "<div class='block activeBlock'></div>";
						return msg;
					}
					else{
						msg = "<div class='block inactiveBlock'></div>";
						return msg;
					}
				});
			}
			//$("#wrapper").append("<br />");
		}
	}
	
	draw();


	var figureX = new Array(4);
	var figureY = new Array(4);
	var figureType = 1;
	var figureState = 1;

	// x x
	// x x
	// Tetromino O
	// Color: Yellow
	function createFigure1(){
		figureX[0] = 5; figureY[0] = 1;
		figureX[1] = 6; figureY[1] = 2;
		figureX[2] = 6; figureY[2] = 1;
		figureX[3] = 5; figureY[3] = 2;
		figureType = 1; figureState = 1;
	}

	//    x
	//  x x x
	// Tetromino T
	// Color: Purple
	function createFigure2(){
		figureX[0] = 5; figureY[0] = 1;
		figureX[1] = 6; figureY[1] = 2;
		figureX[2] = 4; figureY[2] = 2;
		figureX[3] = 5; figureY[3] = 2;
		figureType = 2; figureState = 1;
	}

	//	x x
	//    x x
	// Tetromino Z
	// Color: Red
	function createFigure3(){
		figureX[0] = 5; figureY[0] = 1;
		figureX[1] = 6; figureY[1] = 2;
		figureX[2] = 4; figureY[2] = 1;
		figureX[3] = 5; figureY[3] = 2;
		figureType = 3; figureState = 1;
	}
	//	 x x
	// x x
	// Tetromino S
	// Color: Red
	function createFigure4(){
		figureX[0] = 5; figureY[0] = 1;
		figureX[1] = 6; figureY[1] = 1;
		figureX[2] = 4; figureY[2] = 2;
		figureX[3] = 5; figureY[3] = 2;
		figureType = 4; figureState = 1;
	}

	// x x x x
	// Tetromino I
	// Color: Cyan
	function createFigure5(){
		figureX[0] = 4; figureY[0] = 1;
		figureX[1] = 5; figureY[1] = 1;
		figureX[2] = 6; figureY[2] = 1;
		figureX[3] = 7; figureY[3] = 1;
		figureType = 5; figureState = 1;
	}

	//     x
	// x x x
	// Tetromino L
	// Color: Orange
	function createFigure6(){
		figureX[0] = 4; figureY[0] = 1;
		figureX[1] = 5; figureY[1] = 1;
		figureX[2] = 6; figureY[2] = 1;
		figureX[3] = 6; figureY[3] = 2;
		figureType = 6; figureState = 1;
	}

	// x
	// x x x
	// Tetromino J
	// Color: Blue
	function createFigure7(){
		figureX[0] = 4; figureY[0] = 1;
		figureX[1] = 5; figureY[1] = 1;
		figureX[2] = 6; figureY[2] = 1;
		figureX[3] = 4; figureY[3] = 2;
		figureType = 7; figureState = 1;
	}


	createFigure2();
	newFigure = false;


	// writes the figure into screen
	function writeFigure(){
		for(var i=0; i<figureX.length; i++){
			a[figureY[i]][figureX[i]] = 1;
		}
	}

	// deletes the active figure
	function deleteFigure(){
		for(var i=0; i<figureX.length; i++){
			a[figureY[i]][figureX[i]] = 0;
		}
	}
	
	writeFigure();
	
	function collisionDetection(moveX, moveY){
		// moveX = 1 <===> move right
		for (var i=0; i<4; i++){
			if (a[figureY[i] + moveY][figureX[i] + moveX] != 0)
				return false;
		}
		return true;
	}


	// makes the movement of the figure
	function moveMe(direction){
		deleteFigure();

		switch(direction){
			case 'l':			// move block left
				if(collisionDetection(-1, 0)){
					for(var i=0; i<4; i++){
						figureX[i]--;
					}
				}
				break;
			case 'r':			// move block right
				if(collisionDetection(1, 0)){
					for(var i=0; i<4; i++){
						figureX[i]++;
					}
				}
				break;
			case 'd':			// move block down
				if(collisionDetection(0, 1)){
					for(var i=0; i<4; i++){
						figureY[i]++;
					}
				}
				break;
			case 'x':			// makes block fall basically
				if(collisionDetection(0, 1)){
					for(var i=0; i<4; i++){
						figureY[i]++;
					}
				}
				else{
					newFigure = true;
				}
				break;
			case 'z':			// rotate left
				figureState = rotateFigureLeft(a, figureType, figureState, figureX, figureY);
				break;
			case 'c':			// rotate right
				break;
		}


		writeFigure();
		draw();
	}
	
	// TODO maybe temporarily change the speed of interval for pressing DOWN for fancy effect
	
	// MOVEMENT
	setInterval(function(){
		moveMe('x');
		if (newFigure){
			// TODO: Check if a row is filled and delete it;
			createFigure2();
			newFigure = false;
		}
		draw();
		
	}, 800);
	
	// INPUT from keyboard
	$(document).keydown(function(e){
		switch(e.which){
			case 37: 	// left
				moveMe('l');
				break;
			case 38: 	// up
				break;
			case 39:  	// right
				moveMe('r');
				break;
			case 40:	// down
				moveMe('d');
				break;
			case 90:	// z key, rotate left
				moveMe('z');	// NOTE for some keyboards, z is on y button, we should change the bound keys later
				break;
			case 67:	// c key, rotate right
				break;
		}
	})
});