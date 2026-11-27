module.exports = [
  {
    "id": "collaborative-filtering",
    "title": "Collaborative filtering (user-user and item-item)",
    "priority": 1,
    "tier": "core",
    "freq": "9/9 papers",
    "marks": "8-10 marks (every paper, often 2 parts)",
    "summary": "**Collaborative filtering recommends things using other people's ratings. Find users like you, pick the closest ones, then use their ratings to guess yours.**",
    "mnemonic": "SNP: Similarity, Neighbourhood, Prediction",
    "source": [
      "CT4100_Notes_07_Collaborative_Filtering"
    ],
    "sections": [
      {
        "heading": "What it is",
        "items": [
          "There are two ways to recommend things.",
          "**Content filtering** looks at the item itself. \"You liked an action film, here is another action film.\"",
          "**Collaborative filtering (CF)** looks at other people. \"People with your taste liked this film.\"",
          "It is word of mouth, done by a computer.",
          "CF needs three things: **users**, **items** (films, songs, products) and **ratings** (for example 1 to 5).",
          "Put them in a grid: one row per user, one column per item. Most squares are empty, so we call the grid **sparse**.",
          {
            "type": "p",
            "text": "Ratings can be collected in two ways."
          },
          "**Explicit rating**: you give a score yourself, such as 4 stars.",
          "The problem: many people cannot be bothered to rate.",
          "The system can ask everyone to rate the same starter set of items (a **gauge set**).",
          "Or it can let people rate whatever they like. Then the grid has even more gaps.",
          "**Implicit rating**: the system guesses from what you do, such as buying, clicking, playing or reading for a long time.",
          "It turns those actions into numbers.",
          "The catch: it mostly shows what you liked. An empty square could mean \"not interested\" or \"never saw it\".",
          "Most real systems rely mainly on implicit ratings.",
          {
            "type": "p",
            "text": "**Why use CF instead of content filtering?**"
          },
          "It works when a computer cannot easily judge the content, such as music or films.",
          "It captures **quality and taste**, not just topic.",
          "It can pleasantly surprise you with something you would not have searched for (**serendipity**).",
          "Examples: Amazon (\"customers who bought this also bought\"), Netflix, YouTube, Spotify, news feeds and job sites.",
          "History, if asked: the name comes from a system called Tapestry (Xerox PARC, 1992). Others were GroupLens (1994) and Ringo (1995)."
        ]
      },
      {
        "heading": "The three stages of user-user CF",
        "items": [
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "1. Similarity",
                  "sub": "user-user correlation w(a,u)"
                },
                {
                  "label": "2. Neighbourhood",
                  "sub": "threshold or best-n users"
                },
                {
                  "label": "3. Prediction",
                  "sub": "weighted average of neighbours"
                },
                {
                  "label": "Recommend",
                  "sub": "top-N items by predicted rating"
                }
              ]
            },
            "caption": "User-user collaborative filtering pipeline."
          },
          "The **active user** is the person we are recommending to.",
          "**Step 1, similarity**: how alike is the active user to each other user?",
          "Only compare items that **both** of them rated.",
          "You can measure this with Pearson correlation, constrained Pearson, Spearman rank correlation or cosine similarity.",
          "**Step 2, neighbourhood**: choose which users to listen to. These are the **neighbours**.",
          "Either keep everyone above a cut-off score (such as 0.7), or keep the best n (often 20 to 50).",
          "Too many neighbours: weak matches add noise, so guesses are less accurate.",
          "Too few neighbours: for many items nobody has a rating, so no guess is possible.",
          "**Step 3, prediction**: guess the score for an item the active user has not rated.",
          "Only use neighbours who **did** rate that item."
        ]
      },
      {
        "heading": "Formulas",
        "items": [
          {
            "type": "p",
            "text": "**Pearson** asks: do two people go above and below their own average on the same items?"
          },
          {
            "type": "formula",
            "label": "Pearson correlation between active user a and user u",
            "text": "w(a,u) = Σ_i (r(a,i) - mean_a)(r(u,i) - mean_u)  /  sqrt( Σ_i (r(a,i) - mean_a)^2 × Σ_i (r(u,i) - mean_u)^2 ), sums over i in I(a,u) = items rated by both. w is in [-1, 1]."
          },
          "r(a,i) is the score user a gave item i. mean_a is user a's average score.",
          "Answer **+1** means same taste. **-1** means opposite taste. **0** means no link.",
          {
            "type": "p",
            "text": "**Cosine** treats each user's ratings as a list of numbers and compares the direction of the two lists."
          },
          {
            "type": "formula",
            "label": "Cosine (vector) similarity",
            "text": "cos(a,u) = (a · u) / (|a| |u|), users as rating vectors with 0 for \"not rated\"."
          },
          {
            "type": "warn",
            "text": "Problem: cosine reads an empty square as a score of 0, as if the user hated it. Also, all scores are positive, so everyone looks fairly alike. Fix: subtract each user's average and only use items both rated. That gives you Pearson."
          },
          {
            "type": "p",
            "text": "**Prediction, simple version**: average the neighbours' scores, giving more say to closer neighbours."
          },
          {
            "type": "formula",
            "label": "Prediction 1: weighted average of ratings",
            "text": "P(a,i) = Σ_u r(u,i) w(a,u) / Σ_u |w(a,u)|  (assumes everyone uses the rating scale in the same way)"
          },
          "Weakness: it assumes everyone uses the 1 to 5 scale the same way. They do not.",
          {
            "type": "p",
            "text": "**Prediction, better version**: use how far each neighbour was above or below **their own** average."
          },
          {
            "type": "formula",
            "label": "Prediction 2: mean-centred weighted average (preferred)",
            "text": "P(a,i) = mean_a + Σ_u (r(u,i) - mean_u) w(a,u) / Σ_u |w(a,u)|, sums over the n neighbours who rated i."
          },
          "This makes generous raters and harsh raters comparable.",
          "The bars in |w| mean \"ignore the minus sign\". This keeps the answer on the rating scale.",
          "So if someone with opposite taste disliked an item, that counts in its favour.",
          {
            "type": "p",
            "text": "**Significance weighting**: trust a match less if it is based on only a few shared items."
          },
          {
            "type": "formula",
            "label": "Significance weighting (Herlocker 1999)",
            "text": "w'(a,u) = min(|I(a,u)|, 50) / 50 × w(a,u)"
          },
          "Why: with only 2 shared items, Pearson can only give +1 or -1."
        ]
      },
      {
        "heading": "Worked example (Resnick et al.): does Ken like message 6?",
        "items": [
{"type":"task","show":2,"q":["Work out whether Ken would like message 6. Pick a similarity measure, then predict the rating."]},
          "The question: would Ken like message 6? A dash means \"not rated\".",
          {
            "type": "table",
            "head": [
              "Msg",
              "Ken",
              "Lee",
              "Meg",
              "Nan"
            ],
            "rows": [
              [
                "1",
                "1",
                "4",
                "2",
                "2"
              ],
              [
                "2",
                "5",
                "2",
                "4",
                "4"
              ],
              [
                "3",
                "-",
                "-",
                "3",
                "-"
              ],
              [
                "4",
                "2",
                "5",
                "-",
                "5"
              ],
              [
                "5",
                "4",
                "1",
                "-",
                "1"
              ],
              [
                "6",
                "?",
                "2",
                "5",
                "-"
              ]
            ]
          },
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**The plan.** This example uses **Pearson** similarity, then **Prediction 2** (mean-centred)."
          },
          "Step 1: score how similar each person is to Ken.",
          "Step 2: keep the people who rated message 6.",
          "Step 3: combine their ratings, giving similar people more say.",
          {
            "type": "formula",
            "label": "Worked example: Pearson",
            "text": "w = Σ (a - ā)(u - ū) / sqrt( Σ (a - ā)² × Σ (u - ū)² ), over messages both rated."
          },
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Step 1a, Ken and Lee.** Both rated messages 1, 2, 4 and 5."
          },
          "First, each average over those four messages:",
          {
            "type": "formula",
            "label": "Worked example: Ken and Lee averages",
            "text": "Ken: (1+5+2+4)/4 = 3. Lee: (4+2+5+1)/4 = 3."
          },
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Step 1a, the table.** Take 3 from every rating, then multiply and square, one row at a time."
          },
          {
            "type": "table",
            "head": [
              "Msg",
              "Ken",
              "Lee",
              "Ken − 3",
              "Lee − 3",
              "Multiply",
              "(Ken − 3)²",
              "(Lee − 3)²"
            ],
            "rows": [
              [
                "1",
                "1",
                "4",
                "-2",
                "1",
                "-2",
                "4",
                "1"
              ],
              [
                "2",
                "5",
                "2",
                "2",
                "-1",
                "-2",
                "4",
                "1"
              ],
              [
                "4",
                "2",
                "5",
                "-1",
                "2",
                "-2",
                "1",
                "4"
              ],
              [
                "5",
                "4",
                "1",
                "1",
                "-2",
                "-2",
                "1",
                "4"
              ],
              [
                "**Total**",
                "",
                "",
                "",
                "",
                "**-8**",
                "**10**",
                "**10**"
              ]
            ]
          },
          "Row 1: Ken 1 − 3 = -2. Lee 4 − 3 = 1. Multiply: -2 × 1 = -2. Squares: 4 and 1.",
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Step 1a, the answer.** Put the three totals into the formula."
          },
          {
            "type": "formula",
            "label": "Worked example: Ken and Lee result",
            "text": "w = -8 / sqrt(10 × 10) = -8 / 10 = -0.8"
          },
          "Close to -1, so Lee has nearly the **opposite** taste to Ken.",
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Step 1b, Ken and Meg.** Both rated only messages 1 and 2."
          },
          "Ken: (1 + 5) / 2 = 3. Meg: (2 + 4) / 2 = 3.",
          {
            "type": "table",
            "head": [
              "Msg",
              "Ken",
              "Meg",
              "Ken − 3",
              "Meg − 3",
              "Multiply",
              "(Ken − 3)²",
              "(Meg − 3)²"
            ],
            "rows": [
              [
                "1",
                "1",
                "2",
                "-2",
                "-1",
                "2",
                "4",
                "1"
              ],
              [
                "2",
                "5",
                "4",
                "2",
                "1",
                "2",
                "4",
                "1"
              ],
              [
                "**Total**",
                "",
                "",
                "",
                "",
                "**4**",
                "**8**",
                "**2**"
              ]
            ]
          },
          {
            "type": "formula",
            "label": "Worked example: Ken and Meg result",
            "text": "w = 4 / sqrt(8 × 2) = 4 / 4 = 1"
          },
          "A perfect match, but from only two messages, so it is weak evidence.",
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Step 1c, Ken and Nan.** Both rated messages 1, 2, 4 and 5."
          },
          "Ken averages 3. Nan: (2 + 4 + 5 + 1) / 4 = 3.",
          {
            "type": "table",
            "head": [
              "Msg",
              "Ken",
              "Nan",
              "Ken − 3",
              "Nan − 3",
              "Multiply",
              "(Ken − 3)²",
              "(Nan − 3)²"
            ],
            "rows": [
              [
                "1",
                "1",
                "2",
                "-2",
                "-1",
                "2",
                "4",
                "1"
              ],
              [
                "2",
                "5",
                "4",
                "2",
                "1",
                "2",
                "4",
                "1"
              ],
              [
                "4",
                "2",
                "5",
                "-1",
                "2",
                "-2",
                "1",
                "4"
              ],
              [
                "5",
                "4",
                "1",
                "1",
                "-2",
                "-2",
                "1",
                "4"
              ],
              [
                "**Total**",
                "",
                "",
                "",
                "",
                "**0**",
                "**10**",
                "**10**"
              ]
            ]
          },
          {
            "type": "formula",
            "label": "Worked example: Ken and Nan result",
            "text": "w = 0 / sqrt(10 × 10) = 0"
          },
          "No link either way.",
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Step 2, pick the neighbours.** Who can tell us about message 6?"
          },
          {
            "type": "table",
            "head": [
              "Person",
              "Similarity to Ken",
              "Rated message 6?",
              "Use them?"
            ],
            "rows": [
              [
                "Lee",
                "-0.8",
                "yes, 2",
                "yes"
              ],
              [
                "Meg",
                "1.0",
                "yes, 5",
                "yes"
              ],
              [
                "Nan",
                "0",
                "no",
                "no"
              ]
            ]
          },
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Step 3a, averages for the prediction.** Now use **every** message each person rated, including message 6."
          },
          {
            "type": "formula",
            "label": "Worked example: overall averages",
            "text": "Ken (1+5+2+4)/4 = 3. Lee (4+2+5+1+2)/5 = 2.8. Meg (2+4+3+5)/4 = 3.5."
          },
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Step 3b, how each felt about message 6**, compared with their own usual rating."
          },
          {
            "type": "table",
            "head": [
              "Person",
              "Rating − average",
              "Difference",
              "× similarity",
              "Result"
            ],
            "rows": [
              [
                "Lee",
                "2 − 2.8",
                "-0.8",
                "-0.8 × -0.8",
                "0.64"
              ],
              [
                "Meg",
                "5 − 3.5",
                "1.5",
                "1.5 × 1.0",
                "1.50"
              ],
              [
                "**Total**",
                "",
                "",
                "",
                "**2.14**"
              ]
            ]
          },
          "Lee disliked it, and Lee is Ken's opposite, so that counts **in favour** (minus times minus is plus).",
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Step 3c, the prediction.** Divide by the total similarity, ignoring minus signs, then add Ken's average."
          },
          {
            "type": "formula",
            "label": "Worked example: prediction",
            "text": "P = 3 + 2.14 / (0.8 + 1.0) = 3 + 1.19 = 4.19"
          },
          "**4.19 out of 5**, which is above Ken's usual 3, so recommend message 6.",
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Same question with cosine.** Cosine takes no averages away. A dash, and Ken's unknown rating, count as 0."
          },
          {
            "type": "table",
            "head": [
              "Message",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "Sum of squares"
            ],
            "rows": [
              [
                "Ken",
                "1",
                "5",
                "0",
                "2",
                "4",
                "0",
                "46"
              ],
              [
                "Lee",
                "4",
                "2",
                "0",
                "5",
                "1",
                "2",
                "50"
              ],
              [
                "Meg",
                "2",
                "4",
                "3",
                "0",
                "0",
                "5",
                "54"
              ],
              [
                "Nan",
                "2",
                "4",
                "0",
                "5",
                "1",
                "0",
                "46"
              ]
            ]
          },
          "Top of the fraction: multiply Ken's row by the other row, square by square, and add.",
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**The three cosine scores.**"
          },
          {
            "type": "formula",
            "label": "Worked example: cosine scores",
            "text": "Lee 28/sqrt(46×50) = 0.58. Meg 22/sqrt(46×54) = 0.44. Nan 36/sqrt(46×46) = 0.78."
          },
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Cosine prediction** (Prediction 1). Only Lee and Meg rated message 6."
          },
          {
            "type": "formula",
            "label": "Worked example: cosine prediction",
            "text": "P = (2 × 0.58 + 5 × 0.44) / (0.58 + 0.44) = 3.3"
          },
          "Cosine says Lee is fairly like Ken, which is wrong: their tastes are opposite. Counting gaps as 0 and keeping every rating positive hides that.",
          {
            "type": "screen"
          },
          {
            "type": "p",
            "text": "**Extras worth a sentence.**"
          },
          "With significance weighting, Meg's weight drops to 0.04 and the guess is about 4.07.",
          "If you require 3 shared items, Meg is dropped and the guess is about 3.80.",
          "All versions still point towards recommending it."
        ]
      },
      {
        "heading": "Item-item CF",
        "items": [
          "Item-item CF turns the idea round.",
          "Instead of finding people like you, it finds **items like the one in question**.",
          "Two items count as similar when the same users rate them in a similar way.",
          "Then it uses **your own** ratings of those similar items to make the guess.",
          {
            "type": "formula",
            "label": "Adjusted cosine item similarity",
            "text": "s(i,j) = Σ_u (r(u,i) - mean_u)(r(u,j) - mean_u) / sqrt( Σ_u (r(u,i) - mean_u)^2 × Σ_u (r(u,j) - mean_u)^2 ), sums over users who rated both i and j."
          },
          "In words: how alike are items i and j, judged by everyone who rated both?",
          {
            "type": "formula",
            "label": "Item-item prediction",
            "text": "P(a,i) = Σ_j s(i,j) r(a,j) / Σ_j |s(i,j)|, j over the k items most similar to i that a has rated (use only positive similarities with raw ratings)."
          },
          "In words: average your scores for similar items, giving the closest items the most say. With raw ratings, use only positive similarities.",
          {
            "type": "table",
            "head": [
              "",
              "User-user",
              "Item-item"
            ],
            "rows": [
              [
                "What is compared",
                "users (rows)",
                "items (columns)"
              ],
              [
                "Guess is based on",
                "what similar users gave this item",
                "what you gave similar items"
              ],
              [
                "Work it out in advance?",
                "hard: users keep changing",
                "yes: item similarities stay stable"
              ],
              [
                "How it explains itself",
                "\"people like you liked it\"",
                "\"because you liked X\""
              ],
              [
                "Surprising results",
                "more often",
                "less often"
              ],
              [
                "Cost",
                "expensive with many users",
                "usually cheaper: fewer items than users"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Answer template: \"Describe the main steps of CF with an example\"",
        "items": [
          "**1. Define it**: a grid of users and items, explicit or implicit ratings, and the active user.",
          "**2. Similarity**: write the Pearson formula. Say you only use items both users rated.",
          "**3. Neighbourhood**: cut-off score or best n. Say what happens if it is too big or too small.",
          "**4. Prediction**: write the better formula (the one using averages), then recommend the highest scores.",
          "**5. Example**: draw a small table like Ken, Lee, Meg and Nan, and work one number through.",
          "**6. Finish**: give good points and bad points."
        ]
      },
      {
        "heading": "Advantages and limitations (asked directly in 2024-25)",
        "items": [
          {
            "type": "p",
            "text": "**Good points**"
          },
          "No need to analyse content, so it works for music, films or jokes.",
          "It captures quality and taste.",
          "It can surprise you with something good.",
          "It gets better as more ratings arrive.",
          "Item-item similarities can be worked out in advance, which helps with large systems.",
          {
            "type": "p",
            "text": "**Bad points**"
          },
          "**Sparsity**: most of the grid is empty.",
          "**Cold start**: a new user or new item has no ratings yet.",
          "**Scalability**: searching for neighbours is slow with millions of users.",
          "**Grey sheep**: people with unusual taste have no good neighbours.",
          "**Shilling attacks**: fake ratings can push an item up or down.",
          "**Popularity bias and filter bubbles**: you keep seeing popular or familiar things.",
          "**Noisy data**: ratings are inconsistent and tastes change over time.",
          "**One-sided data**: implicit ratings mostly show likes, not dislikes.",
          "**Privacy**: the system holds profiles of many people."
        ]
      }
    ],
    "pitfalls": [
      "For Pearson, only use items **both** users rated.",
      "In the prediction, use each neighbour's distance from their own average. A plain average ignores that people score differently.",
      "If you use cosine with 0 for gaps, say why that is a problem.",
      "Divide by the sum of |w| (ignore minus signs), not the sum of w.",
      "Do not just list the steps. The question often asks for an example too."
    ]
  },
  {
    "id": "cf-issues-evaluation",
    "title": "CF issues: cold start, sparsity, evaluation, hybrids and content information",
    "priority": 3,
    "tier": "core",
    "freq": "7/9 papers (cold start is a full 10 marks in 2025-26)",
    "marks": "7-10 marks",
    "summary": "**Know each problem with recommenders and a fix for it, how to measure a recommender, and how using item content helps when there are no ratings yet.**",
    "mnemonic": "Problems: S-C-S-G-S-N (Sparse, Cold, Size, Grey sheep, Shilling, Noise)",
    "source": [
      "CT4100_Notes_07_Collaborative_Filtering"
    ],
    "sections": [
      {
        "heading": "Cold start (describe in detail, 10 marks in 2025-26)",
        "items": [
          "**Cold start** means there is not enough data to begin.",
          "**New user**: no ratings, so we cannot find similar people.",
          "**New item**: no ratings, so pure CF never recommends it. So it never gets rated: a vicious circle.",
          "**New system**: no data at all.",
          {
            "type": "p",
            "text": "Related problems"
          },
          "**Sparsity**: most of the user-item grid is empty. In the Netflix Prize only about 1% was filled. Two users may share no items.",
          "**Grey sheep**: users whose taste matches no group.",
          {
            "type": "table",
            "head": [
              "Strategy",
              "How it helps",
              "Trade-off (quality vs data needed)"
            ],
            "rows": [
              [
                "Ask for ratings of a gauge set (Ringo-style onboarding)",
                "Gets a quick profile from a few well-chosen items",
                "Good quality for little data but burdens the user, who may abandon; gauge set may be unrepresentative"
              ],
              [
                "Recommend popular / trending items",
                "Needs no user data at all",
                "Low personalisation; reinforces popularity bias"
              ],
              [
                "Demographics / context (location, device, time)",
                "Cluster new user with similar demographic groups",
                "Coarse; stereotyping; privacy concerns"
              ],
              [
                "Content-based or hybrid recommenders",
                "Use item features (genre, director, artist) so new items can be recommended and new users get matched on a few liked items",
                "Needs good metadata; tends to over-specialise (more of the same)"
              ],
              [
                "Blend global mean with user mean, shifting weight as ratings arrive",
                "Smooth transition from non-personalised to personalised",
                "Early predictions are weak"
              ],
              [
                "Exploration (bandits): show new items to a few users to collect ratings",
                "Solves new-item cold start",
                "Costs short-term quality; needs traffic"
              ],
              [
                "Implicit signals (clicks, dwell time) from the first session",
                "Plentiful, no effort for user",
                "Noisy; positive-only"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Spotting users who are hard to recommend to (2025-26 Q2b)"
          },
          "They have rated very little.",
          "They are not very similar to anyone (grey sheep).",
          "Their neighbours disagree with each other.",
          "They share few rated items with their neighbours.",
          "Their own ratings are inconsistent.",
          "This is query difficulty prediction, applied to users.",
          "**Before** recommending: check profile size and the number of good neighbours.",
          "**After**: check how spread out the predicted scores in the top list are."
        ]
      },
      {
        "heading": "Other issues and mitigations (2023-24: \"difficulties and how to tackle them\")",
        "items": [
          {
            "type": "table",
            "head": [
              "Issue",
              "Why",
              "Mitigation"
            ],
            "rows": [
              [
                "Sparsity",
                "Each user rates a tiny fraction; overlaps small or empty",
                "Latent-factor / dimensionality reduction (SVD, matrix factorisation); item-item; significance weighting; use implicit data; hybrids"
              ],
              [
                "Scalability (size of matrix)",
                "Millions of users x items; neighbour search is costly",
                "Item-item with offline similarities; clustering users; sampling; approximate nearest neighbours"
              ],
              [
                "Cold start",
                "No ratings for new users/items",
                "See table above"
              ],
              [
                "Neighbourhood size",
                "No \"right\" size; large = noisy, small = few predictions",
                "Tune n experimentally (20-50); thresholds; significance weighting"
              ],
              [
                "Grey sheep",
                "Tastes not shared by any group",
                "Content-based fallback; hybrid"
              ],
              [
                "Shilling attacks",
                "Fake profiles built to look like many real users enter neighbourhoods and push/nuke items",
                "Detect suspicious profiles; robust algorithms; limit influence of any single user"
              ],
              [
                "Noise and time",
                "Users are inconsistent; tastes drift; items age",
                "Time-aware models; weight recent ratings; mean-centring"
              ],
              [
                "Feedback loops / filter bubbles",
                "Recommendations shape what is consumed, which becomes training data",
                "Diversity, novelty and exploration; online testing"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Evaluating a recommender",
        "items": [
          "**Offline testing**: hide some known ratings, predict them, and compare.",
          "You can split at random, by time, or leave one rating out at a time.",
          "Splitting by time is more realistic. Random splitting lets the system \"see the future\".",
          {
            "type": "p",
            "text": "How far off are the predicted ratings?"
          },
          {
            "type": "formula",
            "label": "Statistical accuracy",
            "text": "MAE = (1/|T|) Σ |p(u,i) - r(u,i)|   RMSE = sqrt( (1/|T|) Σ (p(u,i) - r(u,i))^2 ), over test set T. RMSE punishes large errors more (Netflix prize metric)."
          },
          "RMSE punishes big mistakes more. It was the Netflix Prize measure.",
          "**Coverage**: for how many items can the system make any prediction?",
          "Small neighbourhoods can be accurate but cover less.",
          {
            "type": "p",
            "text": "Is the recommendation good or bad?"
          },
          "Count a rating above a threshold as \"good\", then use precision, recall, F1 or ROC.",
          "Users only see a short top list, so also use ranking measures: precision@k, recall@k, MAP, nDCG, MRR.",
          {
            "type": "p",
            "text": "Beyond accuracy"
          },
          "**Catalogue coverage**: how many items ever get recommended.",
          "**Diversity**: items in one list differ from each other.",
          "**Novelty**: the user did not already know them.",
          "**Serendipity**: surprising and still useful.",
          "**Fairness**: not just pushing popular items.",
          "**Online testing**: A/B tests (two random groups, compare clicks, retention, sales) and user studies (trust, satisfaction).",
          {
            "type": "p",
            "text": "Why offline testing is limited"
          },
          "Only known ratings can be scored. No rating does not mean dislike.",
          "The data was collected under the old recommender, so it is biased.",
          "Just recommending popular items looks deceptively good.",
          "Accurate is not the same as useful.",
          "Errors on items nobody will ever see do not matter.",
          "Differences need to be statistically significant across users."
        ]
      },
      {
        "heading": "Content information and hybrids (2021-22 P2, 2022-23)",
        "items": [
          "**Content** means facts about the item.",
          "Music: artist, album, year, genre, audio. Films: director, genre, actors. Books: author, genre, summary.",
          {
            "type": "p",
            "text": "Content-based recommending"
          },
          "Describe each item as a list of numbers (a **feature vector**), such as genre flags or tf-idf of its text.",
          "Build a user profile: the average of items they liked, weighted by rating.",
          "Recommend items most similar to that profile (cosine similarity).",
          "It needs no ratings for a new item, so it solves **item cold start** and improves coverage.",
          {
            "type": "p",
            "text": "Hybrids (mixing CF and content)"
          },
          "**Weighted**: combine both scores.",
          "**Switching**: use content for new items, CF otherwise.",
          "**Feature augmentation**: feed one method's output into the other.",
          "You can also use content similarity to fill gaps in the grid.",
          {
            "type": "p",
            "text": "Music example (2022-23)"
          },
          "Describe each track by artist, album, year and genre.",
          "Work out how similar tracks are to each other.",
          "Score unplayed tracks by similarity to the user's most played ones.",
          "Mix with the CF score, leaning on content when a track has few plays.",
          "Tracks with no listening history can now be recommended.",
          "**Weaknesses of content-based**: more of the same, needs good item information, cannot judge quality or taste."
        ]
      },
      {
        "heading": "Recasting CF and current directions (lecture)",
        "items": [
          {
            "type": "p",
            "text": "CF as machine learning"
          },
          "It can be treated as **classification** (relevant or not), **regression** (predict the rating) or **ranking**.",
          "**Netflix Prize**: blending many models won, but was costly to build.",
          "Several published neural recommenders were later beaten by well-tuned simple methods.",
          {
            "type": "p",
            "text": "Order matters"
          },
          "**Sequential** recommendation treats your history as an ordered list.",
          "**Session-based** systems often have no long-term profile, only this visit.",
          "The task is to predict the next item. Models borrow from language modelling (recurrent networks).",
          {
            "type": "p",
            "text": "LLMs"
          },
          "They can chat with you to refine what you want.",
          "They can recommend, describe items and users, or explain choices.",
          "Open problems: made-up items, bias, cost and how to evaluate.",
          {
            "type": "p",
            "text": "Recent trends"
          },
          "Explaining and visualising recommendations.",
          "Recommending to groups, or recommending sequences.",
          "Fairness to users, producers and the platform.",
          "Using context: time, place, device.",
          "How best to show or summarise the neighbourhood is still an open question."
        ]
      },
      {
        "heading": "Diverse recommendations (2021-22: 7 marks)",
        "items": [
          "To make a list more varied, re-order a bigger candidate list (such as the top 50).",
          "Use **MMR**: pick items one at a time, balancing relevance against similarity to those already picked.",
          "The score is λ × predicted relevance - (1-λ) × highest similarity to a chosen item.",
          "Other options: take the best from each cluster, penalise repeated genres or artists, or add some exploration.",
          "Measure with variety within the list and catalogue coverage."
        ]
      }
    ],
    "pitfalls": [
      "Cold start is three problems (new user, new item, new system). Give a fix for each.",
      "Do not only measure accuracy. Mention coverage, diversity, novelty and A/B tests.",
      "If asked to evaluate options, discuss the trade-off the question names (quality vs data needed).",
      "Content-based does not fix everything: it repeats itself and needs good item information."
    ]
  },
  {
    "id": "query-performance-prediction",
    "title": "Query performance / difficulty prediction (QPP)",
    "priority": 2,
    "tier": "core",
    "freq": "9/9 papers",
    "marks": "8-10 marks (often 3 sub-sources)",
    "summary": "**Some searches are much harder than others. We try to spot the hard ones without knowing the right answers, either before searching (using word statistics) or after (by looking at the results).**",
    "mnemonic": "Pre = Query + Collection; Post = Clarity, Stability, Score (C-S-S)",
    "source": [
      "CT4100_Notes_10_Query_Difficulty_Prediction"
    ],
    "sections": [
      {
        "heading": "Why predict difficulty",
        "items": [
          "Even good search systems do badly on some queries.",
          "An average score hides those failures. Results that swing a lot between queries are a **robustness** problem.",
          {
            "type": "p",
            "text": "Why can a query be hard?"
          },
          "**Ambiguous word**: \"mercury\" can mean several things.",
          "**Vocabulary mismatch**: you type \"car hire\", the page says \"vehicle rental\".",
          "**Missing content**: the collection simply does not have the answer.",
          "Part of the query gets ignored, or one word dominates.",
          "Words are processed wrongly, or word closeness is ignored (\"New York\").",
          {
            "type": "p",
            "text": "Who benefits from knowing a query is hard?"
          },
          "**User**: can rephrase or look elsewhere.",
          "**System**: can expand only the hard queries, change ranking model, or ask \"did you mean...?\"",
          "**Administrator**: can spot gaps in the collection.",
          "**Distributed search** (many sources): can trust sources with better predicted quality.",
          "**RAG** (a chatbot that searches first): can decide whether to search, or warn of low confidence.",
          {
            "type": "p",
            "text": "Hard for whom?"
          },
          "Difficulty depends on the collection and the system. A query hard for one may be easy for another.",
          "Even human experts judged difficulty poorly in the TREC Robust Track (2003-05). Their match with real system performance was only r = 0.26."
        ]
      },
      {
        "heading": "Lecture details: robust track, evaluation example, linguistic predictors",
        "items": [
          "**Query performance prediction (QPP)**: guess how well a system will do on a query **without** knowing which documents are relevant.",
          "The predicted numbers are not on the same scale as AP (average precision, the real score).",
          "So we judge a predictor by whether it **ranks** queries correctly, not by its exact values.",
          {
            "type": "p",
            "text": "Example"
          },
          "Real AP for q1, q2, q3: 0.62, 0.15, 0.40.",
          "Predicted: 0.81, 0.34, 0.52.",
          "The order is identical, so Spearman ρ = Kendall τ = 1.0 and Pearson r is about 0.99.",
          {
            "type": "p",
            "text": "TREC Robust Track (2003-2005, written up by Carmel and Yom-Tov 2010)"
          },
          "It focused on difficult search topics.",
          "It rewarded consistency using GMAP (geometric mean of AP) as well as AP.",
          "Experts agreed poorly with real performance (r = 0.26) and with each other (r = 0.39).",
          "Teams ranked topics by predicted difficulty before seeing the judgements. This proved hard.",
          "Some methods had **negative correlation**: they pointed the wrong way.",
          "This led to today's before-search and after-search predictors.",
          "Difficulty is fairly consistent across collections in some studies. But systems differ: exact word matching fails on \"car hire\" vs \"vehicle rental\", while embeddings may connect them.",
          {
            "type": "p",
            "text": "Language-based predictors"
          },
          "They look at ambiguity, number of word meanings (for example WordNet senses), names and sentence structure.",
          "Most predict poorly. Multiple meanings and complex structure are exceptions.",
          "LLMs make this analysis easier, so interest has returned.",
          "\"jaguar speed\" is ambiguous but may still work, since there are many pages about the animal's speed.",
          {
            "type": "p",
            "text": "Query scope examples"
          },
          "**Scope** = the share of documents containing any query word.",
          "\"computer science\": 8,000/10,000 = 0.80 (very broad).",
          "\"graph embedding\": 2,000/10,000 = 0.20.",
          "\"algorthim recusion\": 30/10,000 = 0.003 (misspelt, or not covered).",
          "Adding words can only increase scope.",
          {
            "type": "p",
            "text": "Stability example"
          },
          "Original ranking: A, B, C, D, E.",
          "Small change gives A, C, B, D, E: Overlap@5 = 1.0 and Overlap@3 = 1.0. **Stable.**",
          "Small change gives X, Y, Z, A, B: Overlap@5 = 0.4 and Overlap@3 = 0.0. **Unstable.**",
          "You can disturb the query (drop a word), the documents (add noise) or the system (try several).",
          {
            "type": "p",
            "text": "Lecture exercises, with answers"
          },
          "**1.** Combine before-search and after-search predictors in a learned model.",
          "**2.** For a music recommender, predict hard users or items from profile size, neighbour similarity and score spread. To tell if query expansion helped, compare score spread or overlap before and after.",
          "**3.** High AvgIDF, low scope and flat scores disagree: rare words, little coverage or a typo, and no clear winners. Probably difficult.",
          "**4.** Test a new predictor by correlating (Pearson, Spearman, Kendall τ) its scores with real AP over many queries.",
          "**5.** RAG deciding **whether** to search can only use before-search predictors. After searching, it can use after-search ones to flag low confidence."
        ]
      },
      {
        "heading": "Evaluating a predictor",
        "items": [
          "Run many queries. Compare the predicted scores with the real AP (or P@k).",
          "**Pearson r**: is the relationship a straight line?",
          "**Spearman ρ**: do the rankings agree?",
          "**Kendall τ**: (agreeing pairs - disagreeing pairs) / total pairs. This one is reported most.",
          "A good predictor puts queries in the right order of difficulty.",
          "A negative correlation means it is misleading."
        ]
      },
      {
        "heading": "Pre-retrieval predictors (no retrieval run: cheap)",
        "items": [
          "\"Pre-retrieval\" means **before** running the search, so these are cheap.",
          {
            "type": "p",
            "text": "Type 1: the query's wording"
          },
          "Look at query length, ambiguity (number of word meanings, names) and sentence structure.",
          "Most are weak. Multiple meanings is one exception.",
          {
            "type": "p",
            "text": "Type 2: statistics about the collection"
          },
          "**AvgIDF**: are the query words rare? Rare words are specific, so the query is easier.",
          {
            "type": "formula",
            "label": "AvgIDF / MaxIDF",
            "text": "AvgIDF(q) = (1/|q|) Σ_{t in q} log(N / df(t));  MaxIDF(q) = max_t log(N / df(t)). N = documents in collection, df(t) = documents containing t. High = specific = easier."
          },
          "**Scope**: how much of the collection does the query touch?",
          {
            "type": "formula",
            "label": "Query scope",
            "text": "Scope(q) = |{d in C : d contains at least one query term}| / |C|.  Example: \"computer science\" 8000/10000 = 0.80 (broad); \"algorthim recusion\" 30/10000 = 0.003 (misspelling or missing coverage)."
          },
          "**PMI**: do the query words tend to appear together?",
          {
            "type": "formula",
            "label": "Term relatedness: average pointwise mutual information",
            "text": "PMI(t1,t2) = log [ P(t1,t2) / (P(t1) P(t2)) ], P(t) = df(t)/N, P(t1,t2) = df(t1,t2)/N. Predictor = average PMI over all pairs of query terms. \"neural network training\" (terms co-occur) beats \"neural banana training\". Undefined for single-term queries."
          },
          "\"neural network training\" (words that go together) should do better than \"neural banana training\".",
          "PMI does not work for one-word queries.",
          "**SCQ**: how similar is the query to the collection as a whole?",
          {
            "type": "formula",
            "label": "Collection-query similarity (SCQ, Zhao et al.; extra, not on the slides)",
            "text": "SCQ(t) = (1 + ln cf(t)) × ln(1 + N/df(t)); SCQ(q) = sum or max over query terms. cf = collection frequency. Higher = collection similarity of the query is higher = easier."
          },
          "Other ideas: how much the query words' tf-idf weights vary (more variation means some words discriminate well), and how well the words hang together.",
          {
            "type": "p",
            "text": "Cautions"
          },
          "A rare word might just be a typo.",
          "A long query has high scope, but is not necessarily broad.",
          "Words appearing together does not prove relevance."
        ]
      },
      {
        "heading": "Post-retrieval predictors (run the query, inspect the result list: more accurate, costs a retrieval)",
        "items": [
          "\"Post-retrieval\" means run the search first, then study the results. More accurate, but costs a search.",
          {
            "type": "p",
            "text": "Clarity"
          },
          "Do the top results use distinctive words, or do they read like random text?",
          "Distinctive (high **KL divergence**, a measure of how different two word mixes are) means a clear query.",
          "Random-looking means ambiguous or poor.",
          {
            "type": "formula",
            "label": "Clarity score",
            "text": "Clarity(q) = Σ_w P(w|Q) log2( P(w|Q) / P(w|C) ), where P(w|Q) is the word distribution of the top-k retrieved documents (weighted by retrieval score) and P(w|C) the collection distribution."
          },
          "\"jaguar\": results mix cars and cats, so **low clarity**.",
          "\"jaguar xk engine\": results are all about engines, so **high clarity**.",
          "Caution: results can agree with each other and still all be wrong.",
          "The slides give only the idea. The formula is the standard one (Cronen-Townsend et al.).",
          {
            "type": "p",
            "text": "Stability (robustness)"
          },
          "A reliable ranking should barely change after a small disturbance.",
          "Drop a query word, add noise to documents, or try other systems.",
          "Measure the change with overlap@k or Kendall τ.",
          "Caution: a good rewording can rightly change the ranking.",
          {
            "type": "p",
            "text": "Score spread"
          },
          "A sharp drop after a few top documents suggests an **easy** query.",
          "Flat scores suggest a **hard** one.",
          "Scores from different queries are not comparable, so scale them first.",
          {
            "type": "formula",
            "label": "Normalised Query Commitment (NQC)",
            "text": "NQC(q) = sqrt( (1/k) Σ_{d in top-k} (s(d) - μ)^2 ) / |s(C)|, s(d) = retrieval score of d, μ = mean of the top-k scores, s(C) = score of the collection treated as one document (normaliser)."
          },
          "Query A scores: 9.5, 8.7, 7.9, 3.2, 2.8, 2.5, 2.2, 2.0 (mean 4.85, standard deviation 3.03).",
          "Query B scores: 6.1, 5.9, 5.8, 5.7, 5.6, 5.5, 5.4, 5.3 (mean 5.66, standard deviation 0.25).",
          "A is spread out, so the system is confident about its top documents. A is predicted **easier**.",
          "Caution: those top documents could still be wrong.",
          "Also exist (not on the slides): Weighted Information Gain (WIG) and BERT-based predictors."
        ]
      },
      {
        "heading": "Pre vs post summary and uses",
        "items": [
          {
            "type": "table",
            "head": [
              "",
              "Pre-retrieval",
              "Post-retrieval"
            ],
            "rows": [
              [
                "Evidence",
                "Query text, collection statistics",
                "Ranked list, scores, retrieved text"
              ],
              [
                "Cost",
                "Very cheap, before searching",
                "Needs a retrieval run (some need extra runs)"
              ],
              [
                "Accuracy",
                "Usually lower",
                "Usually higher"
              ],
              [
                "Examples",
                "AvgIDF, MaxIDF, scope, SCQ, PMI, length, ambiguity",
                "Clarity, NQC, WIG, overlap/stability, score variance"
              ],
              [
                "Use",
                "Decide whether to expand, route queries, warn the user",
                "Select between result lists, trigger feedback or expansion, merge sources"
              ]
            ]
          },
          {
            "type": "p",
            "text": "What is it used for?"
          },
          "Expand only the queries predicted to be hard.",
          "Pick the best ranking method for each query.",
          "Ask the user to rephrase or clarify, or suggest queries.",
          "Rank and merge sources in distributed search.",
          "Let a RAG system decide whether to search.",
          "Flag low-confidence results.",
          "Find topics the collection covers poorly.",
          "You can combine predictors (for example with regression), or use the same idea in recommenders to predict hard users or items."
        ]
      },
      {
        "heading": "Exam answer templates",
        "items": [
          {
            "type": "p",
            "text": "\"Predict difficulty from the query, the collection and the results\""
          },
          "**Query**: length, ambiguity, number of word senses.",
          "**Collection**: AvgIDF, scope, SCQ, PMI, with a small example.",
          "**Results**: clarity, score spread (NQC), stability.",
          "Give one example for each.",
          {
            "type": "p",
            "text": "\"Explain three pre-retrieval measures\""
          },
          "Use AvgIDF, scope, and PMI or length/ambiguity.",
          "AvgIDF example: N = 10000 and df = 50 gives 2.3 for \"apple\", against 0.05 for \"the\"."
        ]
      }
    ],
    "pitfalls": [
      "For each predictor, say whether a high value means easy or hard.",
      "Clarity and NQC need the results, so they are not pre-retrieval.",
      "Say how a predictor is tested (correlation with real AP) and what it is for.",
      "In NQC, do not leave out the square root or the divider, and do not treat a score as a probability."
    ]
  }
];
