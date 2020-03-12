// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/06/add/Add.asm

// Computes R0 = 2 + 3  (R0 refers to RAM[0])

(LABEL)
  @2
              D=A // I am a comment
  @3


(ANOTHER_LABEL)
  D=D+A // I am also a comment
      @0
M=D
