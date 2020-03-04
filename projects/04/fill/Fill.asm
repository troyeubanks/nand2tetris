// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// SCREEN = 16384 (0x4000)
// KBD = 24576 (0x6000)

@color
M=0

(LOOP)
  @SCREEN
  D=A
  @px // keeps track of which pixel is being colored
  M=D

  @KBD
  D=M // is keyboard being pressed?
  @BLACK
  D;JGT // jump to black if pressed

  @color
  M=0 // set color to white if it makes it here (i.e. doesn't jump)
  @DRAW_SCREEN
  0;JMP // skip coloring the pixel black if it makes it here

  (BLACK)
    @color
    M=-1 // 2's complement (1111 1111 1111 1111)
    
  (DRAW_SCREEN)
    @color
    D=M
    @px
    A=M // I don't understand this line at all
    M=D

    @px
    M=M+1
    D=M

    @KBD
    D=D-A
    @DRAW_SCREEN
    D;JLT

@LOOP
0;JMP
