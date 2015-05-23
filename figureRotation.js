/**
 * Created by skazzi on 23.5.15..
 */

/* figure type:
1       x x
        x x

2         x
        x x x

3
        x x
          x x

4       x x
      x x

5       x x x x         */


// rotates the figure to the left
function rotateFigureLeft(a, figureType, figureState, figureX, figureY){
   switch(figureType){
       case 1:
           return;
       case 2:
           var blockToMove = getFigure2BlockToMove(figureX, figureY, figureState, 'l');
           var blockX = figureX[blockToMove]; var blockY = figureY[blockToMove];

           // 1 ----> 2
           if(figureState == 1 && collisionDetectionForBlock(a, -1, 1, blockX, blockY)){
               figureX[blockToMove]--;
               figureY[blockToMove]++;
               return 2;    // we return the new figure state
           }

           // 2 ----> 3
           else if(figureState == 2 && collisionDetectionForBlock(a, 1, 1, blockX, blockY)){
               figureX[blockToMove]++;
               figureY[blockToMove]++;
               return 3;
           }

           // 3 ----> 4
           else if(figureState == 3 && collisionDetectionForBlock(a, 1, -1, blockX, blockY)){
               figureX[blockToMove]++;
               figureY[blockToMove]--;
               return 4;
           }

           // 4 ---- 1
           else if(figureState == 4 && collisionDetectionForBlock(a, -1, -1, blockX, blockY)){
               figureX[blockToMove]--;
               figureY[blockToMove]--;
               return 1;
           }
           break;
       case 3:
           break;
       case 4:
           break;
       case 5:
           break;
   }
}

// TODO implement this once rotateFigureRight is done
function rotateFigureLeft(a, figureType, figureState, figureX, figureY){

}

// returns the index of figure block that needs to be moved in order for rotation to be done
// figure2 requires only 1 block to be moved to archive the effect
function getFigure2BlockToMove(figureX, figureY, figureState, rotation){
    var index;
    if(rotation == 'l'){
        switch(figureState){
            case 1:
                var maxX = 0;
                for(var i=1; i < figureX.length; i++){
                    if(figureX[i] > figureX[maxX]){
                        maxX = i;
                    }
                }
                return maxX;
                break;

            case 2:
                var minY = 0;
                for(var i = 1; i < figureY.length; i++){
                    if(figureY[i] < figureY[minY]){
                        minY = i;
                    }
                }
                return minY;
                break;

            case 3:
                var minX = 0;
                for(var i = 1; i < figureX.length; i++){
                    if(figureX[i] < figureX[minX]){
                        minX = i;
                    }
                }
                return minX;
                break;

            case 4:
                var maxY = 0;
                for(var i = 1; i < figureY.length; i++){
                    if(figureY[i] > figureY[maxY]){
                        maxY = i;
                    }
                }
                return maxY;
                break;
        }
    }
    else if(rotation == 'r'){

    }
}

// simple collision detection for single block
function collisionDetectionForBlock(a, moveX, moveY, blockX, blockY){
    if(a[blockY + moveY][blockX + moveX] != 0)
        return false;
    return true;
}
