import sys
import tensorflow as tf
import numpy as np

from Models.Dependencies.Piece_Keys import PieceKeys as pk


class FormatBoard:
    white_turn: bool = True
    def __init__(self) -> None:
        self.board = np.zeros((8, 8, 8), dtype=np.int16)
    
    def get_position_from_san(self, san:str) -> str:
        L: int = len(san)-1 if '+' in san or '#' in san else len(san)
        if san[0] in ['N','B','R','Q','K']:
            return san[L-2:L]
        elif any(char in san for char in ['N','B','R','Q','K']):
            return san[L-4:L-2]
        else:
            return san[L-2:L]

    def update_board(self, single_san: str) -> None:
        if 'O-O' in single_san:
            if self.white_turn:
                self.board[6][0] += np.array(pk.King_Castle[0])
                self.board[5][0] += np.array(pk.Rook_Move[0])
            else:
                self.board[6][7] += np.array(pk.King_Castle[0])
                self.board[5][7] += np.array(pk.Rook_Move[0])
            return

        elif 'O-O-O' in single_san:
            if self.white_turn:
                self.board[2][0] += np.array(pk.King_Castle[1])
                self.board[3][0] += np.array(pk.Rook_Move[1])
            else:
                self.board[2][7] += np.array(pk.King_Castle[1])
                self.board[3][7] += np.array(pk.Rook_Move[1])
            return

        position: str = self.get_position_from_san(san=single_san)
        chess_piece: list[list[int]] = pk.get_chess_key_from_san(single_san)

        self.board[ ord(position[0])-ord('a') ][ int(position[1])-1 ] += np.array( chess_piece[0] if self.white_turn else chess_piece[1] )