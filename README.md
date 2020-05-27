# 11_Game_TicTacToe
Tic Tac Toe is a simple game to get started with calculating moves and using MINIMAX algorithms and mastering interpolation functions - recursive functions

Algorithm of Minimax using Alpha and Beta pruning

<Pseuocode>


 
    function minimax(position, depth, maximizingPlayer)
        if depth == 0 or game over in position
            return static evaluation of position
        if maximizingPlayer
            maxEval = -infinity
            for each child of position
                eval = minimax(child, depth - 1, false)
                maxEval = max(maxEval, eval)
            return maxEval

        else
            minEval = +infinity
            for each child of position
                eval = minimax(child, depth - 1, true)
                minEval = min(minEval, eval)
            return minEval
            
        // initial call
        minimax(currentPosition, 3, true)


 

/// --- end --- /////


AND - 

Algorithm of Minimax purely coding

<Pseuocode>

      function minimax(position, depth, alpha, beta, maximizingPlayer)
          if depth == 0 or game over in position
              return static evaluation of position

          if maximizingPlayer
              maxEval = -infinity
              for each child of position
                  eval = minimax(child, depth - 1, alpha, beta false)
                  maxEval = max(maxEval, eval)
                  alpha = max(alpha, eval)
                  if beta <= alpha
                      break
              return maxEval

          else
              minEval = +infinity
              for each child of position
                  eval = minimax(child, depth - 1, alpha, beta true)
                  minEval = min(minEval, eval)
                  beta = min(beta, eval)
                  if beta <= alpha
                      break
              return minEval


      // initial call
      minimax(currentPosition, 3, -∞, +∞, true)
