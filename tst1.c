#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>

// Function to check if a queen can be placed on board[row][col]
bool isSafe(int **board, int row, int col, int N) {
    int i, j;
    
    // Check this row on left side
    for (i = 0; i < col; i++)
        if (board[row][i])
            return false;
            
    // Check upper diagonal on left side
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j])
            return false;
            
    // Check lower diagonal on left side
    for (i = row, j = col; j >= 0 && i < N; i++, j--)
        if (board[i][j])
            return false;
            
    return true;
}

// Recursive function to solve N Queen problem
bool solveNQUtil(int **board, int col, int N, long *moves) {
    // Base case: If all queens are placed, return true
    if (col >= N)
        return true;
        
    // Consider this column and try placing this queen in all rows one by one
    for (int i = 0; i < N; i++) {
        (*moves)++;
        
        // Check if queen can be placed on board[i][col]
        if (isSafe(board, i, col, N)) {
            // Place this queen in board[i][col]
            board[i][col] = 1;
            
            // Recur to place rest of the queens
            if (solveNQUtil(board, col + 1, N, moves))
                return true;
                
            // If placing queen in board[i][col] doesn't lead to a solution,
            // then remove queen from board[i][col]
            board[i][col] = 0; // BACKTRACK
        }
    }
    
    // If queen can't be placed in any row in this column col, return false
    return false;
}

// Main function to solve N Queens problem
void solveNQ(int N) {
    // Allocate memory for the board
    int **board = (int **)malloc(N * sizeof(int *));
    for (int i = 0; i < N; i++)
        board[i] = (int *)calloc(N, sizeof(int));
        
    long moves = 0;
    clock_t start = clock();
    
    if (solveNQUtil(board, 0, N, &moves)) {
        printf("\nSolution exists for N = %d\n", N);
        printf("Number of moves: %ld\n", moves);
        
        // Print the solution
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                printf("%d ", board[i][j]);
            printf("\n");
        }
    } else {
        printf("\nSolution does not exist for N = %d\n", N);
    }
    
    clock_t end = clock();
    double time_spent = (double)(end - start) / CLOCKS_PER_SEC;
    printf("Time spent: %f seconds\n", time_spent);
    
    // Free allocated memory
    for (int i = 0; i < N; i++)
        free(board[i]);
    free(board);
}

int main() {
    printf("N-Queens Problem Solution using Backtracking\n");
    
    int test_cases[] = {3, 4, 6, 8};
    int num_cases = sizeof(test_cases) / sizeof(test_cases[0]);
    
    for (int i = 0; i < num_cases; i++) {
        solveNQ(test_cases[i]);
    }
    
    return 0;
}
