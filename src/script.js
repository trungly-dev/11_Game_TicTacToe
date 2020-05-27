//Game Tic Tac Toe
// Author by : Kien Ly
// 2020 - 14, May
 

// Define object store all value of types of program

    const styleBoard = {
        width                       : "300"         , 
        height                      : "300"         ,
        color                       : "#00FF5C"     ,
        borderColor                 : "#29385f"     ,
        bgColor                     : "#1b182b"     , // closed the MidnightBlue

        separatedLine_borderWidth   : 3                 ,
        separatedLine_color         : "#29385f"          ,

        eleX_borderWidth            : 6                 , 
        eleX_color                  : "MediumVioletRed"      , 

        eleO_boderWidth             : 6             ,
        eleO_color                  : "PaleGreen" 


    }
    var context2D 
    var availableArea = [2,7,6,    9,5,1,   4,3,8]


// Define coordinators
    const   oneThird = Math.round( parseInt(styleBoard.width) / 3),
            gap = 10

    const   P_00 = new point( 0                  , 0                  ),
            P_10 = new point( oneThird           , 0                  ),
            P_20 = new point( oneThird * 2       , 0                  ),
            P_30 = new point( oneThird * 3       , 0                  ),
            P_01 = new point( 0                  , oneThird           ),
            P_31 = new point( oneThird * 3       , oneThird           ),
            P_02 = new point( gap                , oneThird * 2       ),
            P_32 = new point( oneThird * 3       , oneThird * 2       ),
            P_03 = new point( 0                  , oneThird * 3       ),
            P_13 = new point( oneThird           , oneThird * 3       ),
            P_23 = new point( oneThird * 2       , oneThird * 3       )

    /* var map for drawing the board =  [
    (P_00,)   P_10,    P_20,   P_30
     P_01,   (P_11,)  (P_21,)  P_31,   
     P_02,   (P_12,)  (P_22)   P_32,
    (P_03,)   P_13,    P_23,  (P_33)
    ]
console.log(map)

    var Map of number algorithm
      +-----+-----+-----+
      |  2  |  7  |  6  | 
      +-----+-----+-----+
      |  9  |  5  |  1  |
      +-----+-----+-----+
      |  4  |  3  |  8  |
      +-----+-----+-----+

    */

// Array of move

// Initialize a new player
    var challenger = new player("1_Challenger", [null])
    var machinePlayer = new player("Eva", [null])

 
    var inTurn = false

/////////////////////------ End of Initial ------////////////////////////////


// Main function call when load page

    // Making up the body tag
    var bodyTag = document.getElementsByTagName("body")[0]
    bodyTag.style.backgroundColor = styleBoard.bgColor

    bodyTag.style.width = "100vw"
    bodyTag.style.height = "100vh"
    bodyTag.style.display = "flex"
    bodyTag.style.flexDirection = "column"
    bodyTag.style.justifyContent = "start"
    bodyTag.style.alignItems = "center"
    bodyTag.style.marginTop = "10vh"


// Define a canvas area
    var canv = document.getElementsByTagName("canvas")[0]

    canv.setAttribute("width", styleBoard.width )
    canv.setAttribute("height", styleBoard.height )

//Draw a frame
    var frame = document.getElementById("mainFrame")  
    frame.style.border = "1px solid"
    frame.style.borderColor = styleBoard.borderColor
    // Creating a context 2D
    context2D = frame.getContext("2d")


// Print out the TITLE of Game in the initialized color
    document.getElementById("title").style.color = styleBoard.color
    document.getElementById("title").style.fontFamily = "Raleway"
    document.getElementById("title").style.fontSize = "30px"
    document.getElementById("title").style.fontWeight = "900"


// Draw 2 vertical lines
    drawLine( P_10.x , P_10.y + gap , P_13.x, P_13.y - gap , 
            styleBoard.separatedLine_borderWidth, styleBoard.separatedLine_color)
    drawLine( P_20.x , P_20.y + gap , P_23.x, P_23.y - gap , 
        styleBoard.separatedLine_borderWidth, styleBoard.separatedLine_color)

// Draw 2 horizontal lines
    drawLine( P_01.x + gap , P_01.y , P_31.x - gap, P_31.y, 
        styleBoard.separatedLine_borderWidth, styleBoard.separatedLine_color )
    drawLine( P_02.x , P_02.y , P_32.x - gap, P_32.y, 
        styleBoard.separatedLine_borderWidth, styleBoard.separatedLine_color)

    
    // load ( [1,2] , [3,4] ) 


// Listening Event and Draw X or O when user click
    canv.addEventListener("click", playerClick  )
    inTurn = true


////////////////////////////////////////////////////////////
///////-------   All functions declerating   ----///////////
////////////////////////////////////////////////////////////

    function load(xMoves, oMoves){

         var i, length

        length = xMoves.length
        for( i=0; i < length; i++ ) {
            
            // Assign to data
            challenger.moves.push( xMoves[i] )
            machinePlayer.moves.push( oMoves[i] )
            
            deleteValueInArray(xMoves[i],availableArea)

            // Draw X + O in data
            draw_X( getAreaFromValue(xMoves[i]) ) 
            draw_O(getAreaFromValue(oMoves[i]) )
            deleteValueInArray(oMoves[i],availableArea)

        }
 


     } 

    // Main  function running when user click
    function playerClick(mouseEvent){

        canv.removeEventListener("click", playerClick  )
        
        // Get the value (X, Y) of mouse click in the Canvas 
        var mousePos  = {
            x : mouseEvent.offsetX,
            y : mouseEvent.offsetY
        }

        //define the point which draw X from the center
        var drawPoint = defineArea(mousePos)

        // Get Value of the area
        value = getValueOfArea(drawPoint)
        
        // check and ignore when click the not available area
        if (isValidArea(value) === true && inTurn === true ) {

 
            // 1 - Draw X and get value of this cell
            draw_X(drawPoint)

            // 2 - Add a data of object Challenger
            challenger.moves.unshift(value)
        
            // 3 - checking win
            if (isWin(challenger.moves) === true) {          
                
                // canv.removeEventListener("click", playerClick  )
                window.setTimeout(()=>{
                    inTurn = false
                    msgBtn('<p>!!! Congratulation !!!</p> <p style="text-align:center">You WON !</p>') 
                },1000)
                return;
           }

            // // 3.2 - checking tie

            if (challenger.moves.length > 4){

                // canv.removeEventListener("click", playerClick  )
                window.setTimeout(()=>{
                    msgBtn("<p>!!! You Tie !!!</p>")
                },1000)
            }
            // 4 - Delete that data out of available area
            deleteValueInArray(value, availableArea) 
 
        //----  RANDOM CHOICE   -------
            // 5.1 - Machine play by draw O in a random area.
            // var randomIndex = getRandom_Index(availableArea)

            // 6.1 - Add the value from random Index to machine.move[]
            // machinePlayer.move.unshift(availableArea[randomIndex])

            // 8.1 - delete this value from 
            // deleteValueInArray(availableArea[randomIndex], availableArea)  

        //----  AI CHOICE   -------
        
            // 5.2 - Machine calculate using AI and export a certain area.
            var AI_Index = getAI_Index()

            // 6.2 - Add the value from random Index to machine.move[]
            machinePlayer.moves.unshift(availableArea[AI_Index])

            // 8.2 - delete this value from 
            deleteValueInArray(availableArea[AI_Index], availableArea) 
        
        //-------------------------------
            // // 3.1 - checking lost
            if (isWin(machinePlayer.moves) === true) {          
                
                // canv.removeEventListener("click", playerClick  )
                window.setTimeout( () => {
                    msgBtn('<p>!!! Unforturnately !!! </p><p style="text-align: center">You Lost. </p>')
                },1000)
            }
            // 7 - Draw O if not end game
            if (challenger.moves.length < 5){
                // canv.removeEventListener("click", playerClick  )

                var areaOfMachine = getAreaFromValue(machinePlayer.moves[0])
                
                window.setTimeout(function(){
                    drawO_ANI(areaOfMachine)
                    // Listening Event and Draw X or O when user click
                    canv.addEventListener("click", playerClick  )   
                }, 500)
            }   
        }else{
            canv.addEventListener("click", playerClick  )   
        }
    }
/////////////////////////////////////////////////////////////
//-----------------------------------------------------------


// get AI index from available list of choices

    function getAI_Index(){
        let i=0, 
            length = availableArea.length,
            idChoice = -1, 
            choice = new AI_Weight(null,null)
 
            bestWeight = -1000, 
            
            minDepth = 1000
 
        choice.weight = -1
        choice.depth = 0

 
        for (i=0; i<length; i++) {

console.log("AAAA --- availableArea = " + availableArea)

            choice = minimax(availableArea[i] ,choice.depth , true)
 
console.log("Weigth + Best " + choice.weight + ", "+ bestWeight)

            if (bestWeight < choice.weight){
                bestWeight = choice.weight

console.log("Best = "+ bestWeight)

//                 if(minDepth > choice.depth ){
//                     minDepth = choice.depth
                    
// console.log("depth, MinDepth = "+ choice.depth + "; " + minDepth)
// console.log("idChoice = "+ i)


//                 }
                if (bestWeight==1){
                    return i
                }
                idChoice = i
            }
        }
console.log("idChoice = "+ idChoice)

         return idChoice
    }




    function minimax(value, depth, isMaximazing){
        depth = depth + 1
console.log("depth  = "+ depth )

        let weight,
            bestWeight,
            id_Checked,
            l2

        let choice = new AI_Weight(null,null),
            innerChoice = new AI_Weight(null,null),
            weightCheck = new AI_Weight(null, null)

        innerChoice.depth = depth


        if (isMaximazing == true){
            bestWeight = -1000
            maxDepth = 0
            id_Checked =  availableArea.indexOf(value)

console.log("Value_O = " + value)
console.log("id_Checked = " + id_Checked)


console.log("machinePlayer.moves = " + machinePlayer.moves)             
            
            machinePlayer.moves.unshift(value)
            availableArea.splice(id_Checked,1)

console.log("machinePlayer.moves = " + machinePlayer.moves)   

            l2 = availableArea.length
        
console.log("l2 = " + l2)

//////////// -----  Checking WIN and get weight ----- ///////////////////////////

                    if (isWin(challenger.moves) === true ){ 
                         
                                    machinePlayer.moves.shift()
                                    availableArea.splice(id_Checked, 0, value)

                                    weightCheck.weight = -1
                                    weightCheck.depth = depth
console.log("*** *** *** return = - 1" , weightCheck)   

                                    return weightCheck
                    }else if (isWin(machinePlayer.moves) === true ){
                         
                                    machinePlayer.moves.shift()
                                    availableArea.splice(id_Checked, 0, value)
 
                                    weightCheck.weight = 1
                                    weightCheck.depth = depth
console.log("*** *** *** return = + 1" , weightCheck)   

                                    return weightCheck   
                    }  
///////////////------------------------------------///////////////////////////
            
            innerChoice.depth = depth

            for (i = 0; i< l2; i++){
               innerChoice = minimax( availableArea[i], depth, false)

console.log("MACHINE Weight, best = " + innerChoice.weight + " ; " + bestWeight) 

               bestWeight = (innerChoice.weight > bestWeight) ? innerChoice.weight : bestWeight
                maxDepth = (innerChoice.depth > maxDepth) ? innerChoice.depth : maxDepth
            }

            machinePlayer.moves.shift()
            availableArea.splice(id_Checked, 0, value)
 
console.log("AAAA --- availableArea = " + availableArea)  

            choice.weight = bestWeight
            choice.depth = depth

            return choice  

        }else{

            bestWeight = 1000
            maxDepth = 0
            id_Checked =  availableArea.indexOf(value)

console.log("Value_X = " + value)
console.log("id_Checked = " + id_Checked)
 
console.log("challenger.moves = " + challenger.moves)             
            
            challenger.moves.unshift(value)
            availableArea.splice(id_Checked,1)

console.log("challenger.moves = " + challenger.moves)

            l2 = availableArea.length

console.log("l2 = " + l2)
            let choice = new AI_Weight(null,null)    ,

                 weightCheck = new AI_Weight(null, null)

//////////// -----  Checking WIN and get weight ----- ///////////////////////////

                    if (isWin(challenger.moves) === true ){ 
                         
                                    challenger.moves.shift()
                                    availableArea.splice(id_Checked, 0, value)

                                    weightCheck.weight = -1
                                    weightCheck.depth = depth
console.log("*** *** *** return = - 1", weightCheck)   

                                    return weightCheck

                    }else if (isWin(machinePlayer.moves) === true ){
                         
                                    challenger.moves.shift()
                                    availableArea.splice(id_Checked, 0, value)
                                    
 
                                    weightCheck.weight = 1
                                    weightCheck.depth = depth
console.log("*** *** *** return = + 1" , weightCheck)   

                                    return weightCheck

                    } else if (challenger.moves.length > 4){
                         
                                    challenger.moves.shift()
                                    availableArea.splice(id_Checked, 0, value)
 
                                    weightCheck.weight = 0
                                    weightCheck.depth = depth
console.log("*** *** *** return = 0" , weightCheck)   

                                    return weightCheck
                    }
///////////////------------------------------------///////////////////////////
            
               

            for (i = 0; i< l2; i++){

                innerChoice = minimax( availableArea[i], depth, true)

console.log("CHALLENGER Weight, best = " + innerChoice.weight + " ; " + bestWeight) 

                bestWeight = (innerChoice.weight < bestWeight) ? innerChoice.weight : bestWeight
                maxDepth = (innerChoice.depth > maxDepth) ? innerChoice.depth : maxDepth

            }

            challenger.moves.shift()
            availableArea.splice(id_Checked, 0, value)

console.log("AAAA --- availableArea = " + availableArea)  

            choice.weight = bestWeight
            choice.depth = depth

            return choice 

        } 


    }



//-----------------------------------------------------------
/////////////////////////////////////////////////////////////
    function getIndexOfStandard(value){
        var aStandard = [2,7,6,9,5,1,4,3,8]
        return aStandard.indexOf(value)
    }
    function isWin(moves){
        var num_1, num_2,
            length = moves.length
        if (length > 2) { 
            for ( num_1 = 1; num_1 < length-1; num_1++){
                for ( num_2 = num_1+1; num_2 < length; num_2++){
                    if(moves[0] + moves[num_1] + moves[num_2] == 15){
                        return true
                    }
                }
            }
        }
        return false
    }
 
    function msgBtn(htmlText){
        
        // var text_P = document.createTextNode(htmlText)

        // var tag_P = document.createElement("p")
        // tag_P.appendChild(text_P)

        var div_btn = document.createElement("div")
        div_btn.setAttribute("id","btn")
        // div_btn.appendChild(tag_P)
        div_btn.innerHTML = htmlText        

        var div_popup_bg = document.createElement("div")
        div_popup_bg.setAttribute("id","popup_bg")
        div_popup_bg.appendChild(div_btn)

        document.getElementsByTagName("body")[0].appendChild(div_popup_bg)
 
        // Styling the div of popup background
        var popupBg = document.getElementById("popup_bg")
        
        popupBg.style.position = "absolute"
        popupBg.style.top = "0"        
        popupBg.style.left = "0"
        popupBg.style.width = "100vw"
        popupBg.style.height = "100vh"
        popupBg.style.backgroundColor = "rgb(0,0,0,.5)"
        
        
        popupBg.style.display = "flex"
        popupBg.style.flexDirection = "column"
        popupBg.style.justifyContent = "center"
        popupBg.style.alignItems = "center"

        // Styling the div button.
        var btn = document.getElementById("btn")
        btn.style.display = "block"

        btn.style.backgroundColor = "#01FF70"
        btn.style.padding = "14px 52px"

        btn.style.border = "none"
        btn.style.borderRadius = "12px"

        btn.style.color = "#003B15"
        btn.style.fontSize = "21px"
        btn.style.fontWeight = "700"
        btn.style.cursor = "pointer"

 
        btn.style.zIndex = "10"
        btn.style.outline = "none"


        btn.addEventListener("click", reloadPage)

    }
 
  

    function deleteValueInArray(value, availableArea) {
        var i, 
            length = availableArea.length
        for ( i = 0; i< length; i++){
            if (availableArea[i] == value){
                availableArea.splice(i,1)
            }
        }
    }

    function isValidArea (value){
        var i, 
            length = availableArea.length
        for( i=0;i<length; i++)
            if(value === availableArea[i]){
                return true
            }

        return false
    }

    function getRandom_Index(availableArea){
        var max = availableArea.length-1,
            min = 0
        return Math.floor(Math.random() * (max - min + 1)) + min
    }




    function draw_O(area) {
        // Get the value (X, Y) of mouse click in the Canvas 
         
        const radius = 30
        context2D.beginPath()

        context2D.arc(area.x , area.y , radius,  0 * Math.PI, 2 * Math.PI)

        context2D.strokeStyle = styleBoard.eleO_color
        context2D.stroke()
        
         
 
    }


    function drawO_ANI(area) {
        // Get the value (X, Y) of mouse click in the Canvas 
        
        const radius = 30

        ///////////
        var travelTime = 300

        var distance = 2
        
        var obj_animation = {
            duration: travelTime,
            timing: makeEaseOut(functionalGraph),
            draw: function (progress){

                context2D.beginPath();
 
                context2D.arc(area.x , area.y , radius,    1.5 * Math.PI,  (1.5-distance*progress) * Math.PI,true);
        
                context2D.strokeStyle = styleBoard.eleO_color
                context2D.stroke();
        
        
            }
        }
        animateWithEaseOut(obj_animation)

 
    }


    
    function reloadPage () {
        window.location.reload()
    }

    function point(x,y) {
        this.x = x
        this.y = y
    }
     
    function player(name, []) {
        this.name = name  
         this.moves = [] 
    }

    function AI_Weight(weight, depth) {
        this.weight = weight
        this.depth = depth

    }

    function draw_X(drawPoint) { 
        const radius = 30

        drawLine_ANI(drawPoint.x + radius, drawPoint.y - radius,
            drawPoint.x - radius, drawPoint.y +radius , 
            styleBoard.eleX_borderWidth, styleBoard.eleX_color)
        window.setTimeout( ()=>{
            drawLine_ANI(drawPoint.x - radius, drawPoint.y - radius,
                    drawPoint.x + radius, drawPoint.y +radius , 
                    styleBoard.eleX_borderWidth, styleBoard.eleX_color)
            }
        , 200)
     }

    function getAreaFromValue(value){
        var area = {x:0,y:0}
        switch (value) {
            case 2:
                area = {x: Math.round(P_10.x /2) , y: Math.round(P_01.y /2) }
                break
            case 7:
                area = {x: Math.round(P_10.x /2) * 3, y: Math.round(P_01.y /2) }
                 break
            case 6:
                area = {x: Math.round(P_10.x /2) * 5, y: Math.round(P_01.y /2)}
                break

            case 9:
                area = {x: Math.round(P_10.x /2) , y: Math.round(P_01.y /2) *3 }
                break
            case 5:
                area = {x: Math.round(P_10.x /2) *3 , y: Math.round(P_01.y /2) *3 }
                 break
            case 1:
                area = {x: Math.round(P_10.x /2) * 5, y: Math.round(P_01.y /2)*3 }
                break

            case 4:
                area = {x: Math.round(P_10.x /2) , y: Math.round(P_01.y /2) *5 }
                break
            case 3:
                area = {x: Math.round(P_10.x /2) *3 , y: Math.round(P_01.y /2) *5 }
                 break
            case 8:
                area = {x: Math.round(P_10.x /2) *5 , y: Math.round(P_01.y /2) *5 }
                break
        }

        return area
    }

    function defineArea (mousePos) {
        var area = {x:0,y:0}
        
        if      (mousePos.x < P_10.x){
            area.x = Math.round(P_10.x /2)
        }else if(mousePos.x < P_20.x){
            area.x = Math.round(P_10.x /2) * 3
        }else if(mousePos.x < P_30.x){
            area.x = Math.round(P_10.x /2) * 5   
        }


        if      (mousePos.y < P_01.y){
            area.y = Math.round(P_01.y /2)
        }else if(mousePos.y < P_02.y){
            area.y = Math.round(P_01.y /2) * 3
        }else if(mousePos.y < P_03.y){
            area.y = Math.round(P_01.y /2) * 5   
        }
 
        return area

    } 

    function getValueOfArea(area){
        var value = 0
        if          (area.x < P_10.x ){

            if          (area.y < P_01.y ){   value = 2 }
            else if     (area.y < P_02.y ){   value = 9 }
            else if     (area.y < P_03.y ){   value = 4 }

        } else if   (area.x < P_20.x ){

            if          (area.y < P_01.y ){   value = 7 }
            else if     (area.y < P_02.y ){   value = 5 }
            else if     (area.y < P_03.y ){   value = 3 }

        } else if   (area.x < P_30.x ){
            
            if          (area.y < P_01.y ){   value = 6 }
            else if     (area.y < P_02.y ){   value = 1 }
            else if     (area.y < P_03.y ){   value = 8 }

        }
        return value
    }
    
    function drawLine(x1,y1,x2,y2, borderWidth, color){
        
        context2D.beginPath()

        context2D.moveTo(x1,y1) 
        context2D.lineTo(x2, y2)
        
        context2D.lineWidth = borderWidth
        context2D.strokeStyle = color
        context2D.stroke()

    }

 

    function drawLine_ANI(x1,y1,x2,y2, borderWidth, color){
         
        var travelTime = 150
    
        var ANI_x2 , 
            ANI_y2
 
        var object = { 
                     duration: travelTime,
                     timing: makeEaseOut(functionalGraph),
                     draw: function(progress){
                        ANI_x2 = x1 + (progress * (x2-x1))
                        ANI_y2 = y1 + (progress * (y2 - y1))

                        context2D.beginPath()
                        context2D.moveTo(x1,y1) 
            
            // console.log("ANI_x2,ANI_y2 = " +ANI_x2 +", "+ ANI_y2 )

                        context2D.lineTo(ANI_x2, ANI_y2)
                    
                        context2D.lineWidth = borderWidth
                        context2D.strokeStyle = color
                        context2D.stroke()
                     }
                  }
            
        animateWithEaseOut(object)  
            
  
    }

 


///// ----- The Functions supporting Animation with Ease out ------ /////


//      the object animation must be define before calling function animateWithEaseOut()
//      var object = { 
//          duration: 1000,
//          timing: makeEaseOut(functionalGraph),
//          draw: drawANI
//       }

//       animateWithEaseOut(object)  

//      Edit the content of this function for drawing
//      function drawObjectANI(progress){

//          Example:
//          brick.style.left = progress * 500 + 'px';
//      } 
    function makeEaseOut(timing){
        return function(timeFraction){
            return 1 - timing(timeFraction)
        }
    }
    function functionalGraph(x){
        return Math.sqrt(1 - x*x)
    }
    function animateWithEaseOut(options) {
        var start = performance.now();
    
        requestAnimationFrame(
        function animateWithEaseOut(time) {
            var timeFraction = (time - start) / options.duration
            timeFraction = (timeFraction > 1) ? 1 : timeFraction 
            var progress = options.timing(timeFraction)
    
            options.draw(progress);
    
            if (timeFraction < 1) {
                requestAnimationFrame(animateWithEaseOut);
            }
    
        }
        )
    }
/////----- END -  The Functions supporting Animation with Ease out ------ /////




