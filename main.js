$(document).ready(function(){
	var height = $("#wrapper").height();
	var width = $("#wrapper").width();		// not used
	
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

	// x x
	// x x
	function createFigure1(){
		figureX[0] = 5; figureY[0] = 1;
		figureX[1] = 6; figureY[1] = 2;
		figureX[2] = 6; figureY[2] = 1;
		figureX[3] = 5; figureY[3] = 2;
	}

	//    x
	//  x x x
	function createFigure2(){
		figureX[0] = 5; figureY[0] = 1;
		figureX[1] = 6; figureY[1] = 2;
		figureX[2] = 4; figureY[2] = 2;
		figureX[3] = 5; figureY[3] = 2;
	}

	//	x x
	//    x x
	function createFigure3(){
		figureX[0] = 5; figureY[0] = 1;
		figureX[1] = 6; figureY[1] = 2;
		figureX[2] = 4; figureY[2] = 1;
		figureX[3] = 5; figureY[3] = 2;
	}

	// x x x x
	function createFigure4(){
		figureX[0] = 4; figureY[0] = 1;
		figureX[1] = 5; figureY[1] = 1;
		figureX[2] = 6; figureY[2] = 1;
		figureX[3] = 7; figureY[3] = 1;
	}
	createFigure4();

	function writeFigure(){
		for(var i=0; i<figureX.length; i++){
			a[figureY[i]][figureX[i]] = 1;
		}
	}
	
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
	
	
	function moveMe(direction){
		deleteFigure();
		if(direction == 'l'){
			if(collisionDetection(-1,0)){
				for(var i=0; i<4; i++){
					figureX[i]--;
				}
			}
		}
		else if(direction == 'r'){
			if(collisionDetection(1, 0)){
				for(var i=0; i<4; i++){
					figureX[i]++;
				}
			}
		}
		else if(direction == 'x'){
			if(collisionDetection(0, 1)){
				for(var i=0; i<4; i++){
					figureY[i]++;
				}
			}
		}
		writeFigure();
		draw();
	}
	
	// TODO change speed interval for pressing DOWN
	
	// MOVEMENT
	setInterval(function(){
		moveMe('x');
		draw();
		
	}, 800);
	
	// INPUT
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
				break;
		}
	})
});