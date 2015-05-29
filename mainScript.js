$(document).ready(function(){
	var selector_wrapper = $("#wrapper"); // variable added to avoid duplicated JQuery selector (for height and width)
	//var height = selector_wrapper.height();	// not used
	//var width = selector_wrapper.width();		// not used
	var newFigure = true; // true = new tetromino needs to be created; false = tetromino if falling
	
	var numY = 23;
	var numX = 12;

	// not used
	//var blockHeight = height / (numY - 2);
	//var blockWidth = width / numX;
	//var blockSize = height / (numY - 3);
	
	var a = new Array(numY);
	var i; var j;
	for(i = 0; i<a.length; i++){
		a[i] = new Array(numX);
	}
	
	for(i=0; i<a.length - 1; i++){
		for(j=1; j<a[i].length - 1; j++){
			a[i][j] = 0;
			//console.log("" + i + " " + j + " " + a[i][j] + " ");
			
		}
		//console.log("\n");
	}
	
	// initialize border block
	for(i=0; i<a[0].length; i++){
		a[numY - 1][i] = 1;
	}
	for(j=0; j<a.length; j++){
		a[j][0] = 1;
		a[j][a.length] = 1;
	}

	// drawing
	function draw(){
		selector_wrapper.empty();		// clear the screen
		
		for(var i=2; i<numY - 1; i++){
			for(var j=1; j<numX - 1; j++){
				$("div#wrapper").append(function(){
					var msg;
					switch (a[i][j]){
						case 1:
							msg = "<div class='block activeBlock tetrominoO'></div>";
							break;
						case 2:
							msg = "<div class='block activeBlock tetrominoT'></div>";
							break;
						case 3:
							msg = "<div class='block activeBlock tetrominoZ'></div>";
							break;
						case 4:
							msg = "<div class='block activeBlock tetrominoS'></div>";
							break;
						case 5:
							msg = "<div class='block activeBlock tetrominoI'></div>";
							break;
						case 6:
							msg = "<div class='block activeBlock tetrominoL'></div>";
							break;
						case 7:
							msg = "<div class='block activeBlock tetrominoJ'></div>";
							break;
						case 0:
						default:
							msg = "<div class='block inactiveBlock'></div>";
							break;
					}
					return msg;

					/* old code */
					/*
					if(a[i][j] == 1){
						msg = "<div class='block activeBlock'></div>";
						return msg;
					}
					else{
						msg = "<div class='block inactiveBlock'></div>";
						return msg;
					}
					/* */
				});
			}
		}
	}
	
	draw();


	createFigure2();
	newFigure = false;





	writeFigure(a);
	


	// makes the movement of the figure
	function moveMe(direction){
		deleteFigure(a);

		switch(direction){
			case 'l':			// move block left
				if(collisionDetectionOnMove(a, -1, 0)){
					figurePosX--;
				}
				break;
			case 'r':			// move block right
				if(collisionDetectionOnMove(a, 1, 0)){
					figurePosX++;
				}
				break;
			case 'd':			// move block down
				if(collisionDetectionOnMove(a, 0, 1)){
					figurePosY++;
				}
				break;
			case 'x':			// makes block fall basically
				if(collisionDetectionOnMove(a, 0, 1)){
					figurePosY++;
				}
				else{
					newFigure = true;
				}
				break;

			case 'z':			// rotate left
				if (figureType == 1)
					break;
				figureRotateLeft();
				if (collisionDetectionOnRotate(a)){
					copyFigure();
				}
				break;
			case 'c':			// rotate right
				if (figureType == 1)
					break;
				figureRotateRight();
				if (collisionDetectionOnRotate(a)){
					copyFigure();
				}
				break;
		}

		writeFigure(a);
		draw();
	}
	
	// TODO maybe temporarily change the speed of interval for pressing DOWN for fancy effect
	
	// MOVEMENT
	setInterval(function(){
		moveMe('x');
		if (newFigure){
			// TODO: Check if a row is filled and delete it;
			var randomFigure = Math.floor((Math.random() * 7) + 1);
			switch (randomFigure){
				case 1:
					createFigure1();
					break;
				case 2:
					createFigure2();
					break;
				case 3:
					createFigure3();
					break;
				case 4:
					createFigure4();
					break;
				case 5:
					createFigure5();
					break;
				case 6:
					createFigure6();
					break;
				case 7:
				default:
					createFigure7();
					break;
			}
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
				//newFigure = true; // FOR QUICK DEBUGING
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
				moveMe('c');
				break;
			default:
				break;
		}
	})
});