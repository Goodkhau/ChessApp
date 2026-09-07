# Little Blue

Little Blue is a from-scratch neural network that learns to play chess by pattern-matching board states to piece movement; an exercise in understanding deep learning fundamentals. This model is different from the groundbreaking LLMs we have, its a far more traditional form of deep learning that has been around for decades and lay the grounds for what we have today. Unfortunately, combining the weaknesses with this form of deep learning and my naive approach, this model does not perform very well.

## Model Design

The architecture consist of seven layers: an input layer, a flattening layer, four hidden dense layers, and an output layer.

| Layer   | Shape  | Notes |
|---------|--------|-------|
| Input   | 8×8×8  | 16-bit integers; two dimensions map to the chess board and the third is an arbitrarily assigned key per piece |
| Flatten | 1×512  | Collapses the board representation into a single vector |
| Dense   | 1x1024   | Hidden Layer |
| Dense   | 1x1024   | Hidden Layer |
| Dense   | 1x768    | Hidden Layer |
| Dense   | 1x512    | Hidden Layer |
| Output  | 1×386  | Decimal output 0.00 - 1.00 indicating an abstract value of how much the model wants the abstract representation of a chess move. |

Of the 386 outputs, two correspond to castling rights (one per color), and the remaining 384 map to a board position paired with one of six piece types (8x8x6).

## Model Training Process

TensorFlow is a heavy process to run without dedicated hardware, which made it unfortunate that the only machine on hand was a 16GB DDR3 laptop with no GPU. Training ran for about two weeks during the workday, paused every evening for homework and other personal projects. Memory was a huge problem as Tensorflow and Python are data hungry I had to come up with a solution to my lack of memory. One of the solutions I created was storing a large majority of the training data to my longer term storage SSD and loaded batches of games into memory as needed, this solution worked but increased the training time.

## Challenges & Fallbacks

200,000 chess games is simply not enough games for an AI to learn chess and, while a larger machine would help to essentially create a bigger stick, this model has hit a ceiling in it's scalability. The issue in scaling pertains largely to what context the model had to predict the next moves on. These are a list of issues that arose from my naive design.

- **Opening bias.** Chess openings repeat constantly across games, while midgame and endgame positions are comparatively unique. The model overfit hard to opening patterns and lost context/coherence as games went on.
- **No board context.** The model only sees piece type and location, no captures and no checks. A bishop can stare down the queen and the model has no idea anything is threatened.
- **Underfit late game.** The training data likely contains hundreds of games with popular openings like the Four Knights, but few complete endgames. If a late-game position doesn't resemble a position it has seen, which is often the case, the model is essentially guessing blind.

> Piece location alone isn't enough signal. A future version needs to encode threats and game phases, not just where the pieces happen to be standing and hoping the AI will decipher the game's rules.
