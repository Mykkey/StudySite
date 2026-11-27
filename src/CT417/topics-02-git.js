module.exports = [
  {
    "id": "git-commands",
    "title": "Git and GitHub commands (list, explain, find the problem)",
    "priority": 5,
    "tier": "core",
    "hint": "likely",
    "freq": "4/7 papers (2019 Q1a, 2024-25 Q1b, 2025-26 Q1a); hinted: list commands 10 marks",
    "marks": "5-10 marks",
    "summary": "**Know the three places a change lives, the everyday commands, branching, merging and undoing, and what each command does in one line.**",
    "mnemonic": "Status, Add, Commit, Push (SACP) then Pull before Push; branch with checkout -b, merge with merge",
    "source": [
      "CT417_Notes_02_Git_GitHub",
      "CT417_Exam_2019-2020_1_1_5",
      "CT417_Exam_2024-2025_1_1_5"
    ],
    "sections": [
      {
        "heading": "The model: where changes live",
        "items": [
          {
            "type": "diagram",
            "kind": "flow",
            "data": {
              "steps": [
                {
                  "label": "Working directory",
                  "sub": "files you edit"
                },
                {
                  "label": "Staging area (index)",
                  "sub": "git add"
                },
                {
                  "label": "Local repository",
                  "sub": "git commit"
                },
                {
                  "label": "Remote (GitHub)",
                  "sub": "git push"
                }
              ],
              "direction": "row",
              "loopBack": "git pull / fetch brings remote changes back"
            },
            "caption": "A change travels left to right; pull travels back."
          },
          "**Git is distributed**: everyone has a full copy of the history, so committing needs no internet.",
          "**GitHub** is a website that hosts Git repositories and adds teamwork tools such as pull requests.",
          "A **commit** is a saved snapshot, with an id, author, time and message.",
          "A **branch** is a movable bookmark pointing at a commit.",
          "**HEAD** is where you are right now."
        ]
      },
      {
        "heading": "Setup and starting",
        "items": [
          {
            "type": "table",
            "head": [
              "Command",
              "What it does"
            ],
            "rows": [
              [
                "`git config --global user.name \"Name\"` and `user.email`",
                "Set the identity recorded on commits"
              ],
              [
                "`git init`",
                "Create a new empty local repository in the current folder"
              ],
              [
                "`git clone <url>`",
                "Copy a remote repository (all history) to your machine and set `origin`"
              ],
              [
                "`git remote -v`",
                "Show the remote repositories and URLs"
              ],
              [
                "`git remote add origin <url>`",
                "Link a local repo to a remote called origin"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Everyday cycle",
        "items": [
          {
            "type": "table",
            "head": [
              "Command",
              "What it does / why"
            ],
            "rows": [
              [
                "`git status`",
                "Show which files are modified, staged or untracked and the current branch"
              ],
              [
                "`git diff`",
                "Show unstaged changes line by line (`git diff --staged` for staged ones)"
              ],
              [
                "`git add <file>` / `git add .`",
                "Stage changes: choose what goes into the next commit"
              ],
              [
                "`git commit -m \"message\"`",
                "Record the staged snapshot in the local repository with a message"
              ],
              [
                "`git log` / `git log --oneline --graph`",
                "Show commit history"
              ],
              [
                "`git pull`",
                "fetch + merge: bring the latest remote commits into your branch"
              ],
              [
                "`git fetch`",
                "Download remote changes without merging them"
              ],
              [
                "`git push`",
                "Upload your local commits to the remote. First push of a branch: `git push -u origin <branch>`"
              ]
            ]
          },
          {
            "type": "p",
            "text": "Past question (2019, 4 marks): get your work to the online repo"
          },
          "**1.** git status: see what changed.",
          "**2.** git add: choose what to save.",
          "**3.** git commit -m: save it locally.",
          "**4.** git pull: bring in others' work and fix any conflicts.",
          "**5.** git push: publish."
        ]
      },
      {
        "heading": "Branching and merging",
        "items": [
          {
            "type": "table",
            "head": [
              "Command",
              "What it does"
            ],
            "rows": [
              [
                "`git branch`",
                "List local branches (`-a` includes remote)"
              ],
              [
                "`git branch <name>`",
                "Create a branch"
              ],
              [
                "`git checkout <branch>` / `git switch <branch>`",
                "Move to a branch"
              ],
              [
                "`git checkout -b <branch>` / `git switch -c <branch>`",
                "Create and switch to a new branch"
              ],
              [
                "`git merge <branch>`",
                "Merge the named branch INTO the branch you are currently on"
              ],
              [
                "`git branch -d <branch>`",
                "Delete a merged branch (`-D` forces)"
              ],
              [
                "`git push origin --delete <branch>`",
                "Delete a remote branch"
              ],
              [
                "`git rebase <branch>`",
                "Replay your commits on top of another branch (linear history); do not rebase shared branches"
              ]
            ]
          }
        ]
      },
      {
        "heading": "Undo and inspect",
        "items": [
          {
            "type": "table",
            "head": [
              "Command",
              "What it does",
              "Safe?"
            ],
            "rows": [
              [
                "`git restore <file>`",
                "Discard unstaged edits in a file",
                "Loses edits"
              ],
              [
                "`git restore --staged <file>` / `git reset <file>`",
                "Unstage a file but keep the edits",
                "Safe"
              ],
              [
                "`git revert <commit>`",
                "Create a new commit that undoes an old one",
                "Safe for shared history"
              ],
              [
                "`git reset --soft HEAD~1`",
                "Undo last commit, keep changes staged",
                "Local only"
              ],
              [
                "`git reset --hard <commit>`",
                "Move branch and discard all working changes",
                "Destructive"
              ],
              [
                "`git stash` / `git stash pop`",
                "Shelve uncommitted work temporarily and restore it",
                "Safe"
              ],
              [
                "`git tag v1.0`",
                "Label a commit, e.g. a release",
                "Safe"
              ],
              [
                "`git blame <file>`",
                "Who last changed each line",
                "Safe"
              ],
              [
                "`git commit --amend`",
                "Edit the last commit message/content",
                "Local only"
              ]
            ]
          },
          {
            "type": "warn",
            "text": "`git push --force` overwrites the shared history and can destroy teammates' work. Use `git pull --rebase` then push. If you must force, use `--force-with-lease`."
          }
        ]
      },
      {
        "heading": "GitHub concepts used with the commands",
        "items": [
          "**Pull request (PR)**: asking for your branch to be merged, usually into main. Others review it and automated checks run.",
          "**Fork**: your own online copy of someone else's repository.",
          "**Feature branch workflow**: each feature gets its own branch from main, and is merged back after review.",
          "**.gitignore**: a list of files Git should not track (target/, *.class, .env, editor files).",
          "**Do commit** everything needed to build from a fresh copy: source, settings, documents.",
          "**Do not commit** built files (JARs, .pyc, .o), files with paths from your computer, or personal settings."
        ]
      },
      {
        "heading": "Model answer: FoodieGo feature branch (5 marks, 2024-25 Q1b)",
        "items": [
          {
            "type": "code",
            "text": "git status\ngit add .\ngit commit -m \"Implemented new feature\"\ngit push origin feature-branch\ngit checkout main\ngit pull origin main\ngit merge feature-branch\ngit push origin main"
          },
          {
            "type": "p",
            "text": "Why each line (this is where the marks are)"
          },
          "**status**: shows what changed.",
          "**add**: stages the changes.",
          "**commit**: saves them locally with a message.",
          "**push**: publishes the feature branch.",
          "**checkout main**: switch to the branch you are merging into.",
          "**pull**: get the latest main first.",
          "**merge**: bring the feature in.",
          "**push**: publish main (or merge with a PR instead)."
        ]
      },
      {
        "heading": "Given a command: identify the problem and fix it",
        "items": [
          {
            "type": "table",
            "head": [
              "Command / situation",
              "Problem",
              "Fix"
            ],
            "rows": [
              [
                "`git commit -m Implemented new feature`",
                "Message not quoted: git treats words as pathspecs, so commit fails",
                "`git commit -m \"Implemented new feature\"`"
              ],
              [
                "`git commit -m \"x\"` says \"nothing added to commit\"",
                "Nothing staged",
                "`git add <files>` first, then commit"
              ],
              [
                "`git merge feature-branch` run while ON feature-branch",
                "Merges the branch into itself: \"Already up to date\". Wrong branch",
                "`git checkout main` then `git merge feature-branch`"
              ],
              [
                "`git push` says \"no upstream branch\"",
                "Branch has no remote counterpart yet",
                "`git push -u origin feature-branch`"
              ],
              [
                "`git push` rejected: \"non-fast-forward / fetch first\"",
                "Remote has commits you do not have",
                "`git pull --rebase` (or `git pull`), resolve conflicts, push again; not `--force`"
              ],
              [
                "`git pull` stops with \"CONFLICT (content)\"",
                "Same lines changed on both sides",
                "Open file, resolve markers, `git add`, `git commit`"
              ],
              [
                "`git checkout feature` fails: \"would be overwritten\"",
                "Uncommitted changes conflict with the target branch",
                "Commit or `git stash`, then switch"
              ],
              [
                "`git branch -d feature` refused: \"not fully merged\"",
                "Branch has commits not in the current branch",
                "Merge it first, or `-D` only if you really discard it"
              ],
              [
                "`git add .` then secrets (.env, application.properties with keys) committed",
                "Secret in history",
                "`git rm --cached .env`, add to `.gitignore`, rotate the secret; rewrite history only if needed"
              ],
              [
                "`git reset --hard` run by mistake",
                "Uncommitted work lost",
                "Prevention: stash/commit first; recover committed work via `git reflog`"
              ],
              [
                "`HEAD detached`",
                "You checked out a commit, not a branch",
                "`git switch -c new-branch` to keep work, or `git switch main`"
              ],
              [
                "`git clone` into a folder then `git push` to someone else's repo is denied (403)",
                "No write permission",
                "Fork the repository, push to your fork, open a pull request"
              ]
            ]
          }
        ]
      }
    ],
    "pitfalls": [
      "git merge brings changes **into** the branch you are on. Check which that is.",
      "Do not forget git add before commit, or quotes around the message.",
      "Do not use git push --force to fix a rejected push.",
      "Explain why each command is needed. A bare list loses marks."
    ]
  },
  {
    "id": "git-merge-conflicts",
    "title": "Merge conflicts: why they happen and how to resolve them",
    "priority": 6,
    "tier": "core",
    "hint": "likely",
    "freq": "2/7 papers (2025-26 s1 Q1d) + hinted \"merge issue and resolve\" last year",
    "marks": "5-10 marks",
    "summary": "**A conflict occurs when two branches change the same part of a file (or one deletes what the other edits) and Git cannot decide. Resolve: pull, open the file, edit the markers into the correct final code, git add, git commit, test, push.**",
    "mnemonic": "PEACE: Pull, Edit markers, Add, Commit, Examine (test)",
    "source": [
      "CT417_Notes_02_Git_GitHub",
      "CT417_Exam_2025-2026_1_1_5"
    ],
    "sections": [
      {
        "heading": "Why conflicts arise",
        "items": [
          "Two developers (or branches) change the same lines, or one edits a file the other deleted or renamed, then both are merged.",
          "Long-lived feature branches drift from main so overlapping edits accumulate. High activity periods make this worse.",
          "**Sequential merge**: if changes do not overlap Git merges automatically, no conflict (slide: one branch adds a method, the other adds a constructor, auto-merged).",
          "**Type 1 conflict (easy)**: both add the same thing or the textual change is simple; a human just chooses/combines.",
          "**Type 2 conflict (tricky)**: semantic conflict. Branch A changes `length` from int to float, branch B changes it to short and uses it in a method. Git can show the text, but the right answer needs design judgement; code may even merge cleanly yet fail to compile or behave wrongly."
        ]
      },
      {
        "heading": "Anatomy of a conflict",
        "items": [
          {
            "type": "code",
            "text": "<<<<<<< HEAD\nprivate float length;\n=======\nprivate short length;\n>>>>>>> feature/pen-size"
          },
          "`<<<<<<< HEAD` to `=======` is YOUR current branch version; `=======` to `>>>>>>> branch` is the INCOMING branch version.",
          "`git status` lists \"both modified\" (unmerged) files. The merge is paused until you resolve all of them."
        ]
      },
      {
        "heading": "Resolution walk-through",
        "items": [
          {
            "type": "code",
            "text": "git checkout feature-x\ngit pull origin main        # or: git merge main  -> CONFLICT in Pen.java\ngit status                  # shows \"both modified: Pen.java\"\n# open Pen.java, decide the final code, delete the <<<<<<<, =======, >>>>>>> lines\nmvn test                    # prove the merged result still builds and passes\ngit add Pen.java            # mark as resolved\ngit commit                  # completes the merge commit\ngit push origin feature-x"
          },
          "1. Identify conflicted files (`git status`, or the IDE/GitHub conflict editor).",
          "2. Understand both changes (`git log`, `git diff`, ask the author). Decide: keep ours, keep theirs, or combine.",
          "3. Edit so the file contains the correct final code only, with all markers removed.",
          "4. Build and run tests. A clean text merge can still be logically wrong.",
          "5. `git add` the file, `git commit` to finish the merge, then push.",
          "6. To abandon: `git merge --abort` returns to the state before the merge."
        ]
      },
      {
        "heading": "Preventing conflicts (answer for \"practical process\")",
        "items": [
          "Short-lived feature branches; merge to main often (integrate daily, the CI idea).",
          "Pull/rebase main into your branch regularly so you resolve small conflicts early.",
          "Small, focused pull requests with review; agree code ownership and split work by file/module.",
          "Consistent formatting (formatter, linter) so whitespace changes do not cause noise.",
          "**Branch protection** is a repository setting that blocks direct changes to main. It requires a **pull request** (PR: a request to merge your branch, which others can review), at least one reviewer, and a passing **CI** run (continuous integration: an automatic build and test of every change).",
          "Communication: tell the team when refactoring shared files."
        ]
      },
      {
        "heading": "Model answer: SkyBankAI merge conflicts (5 marks)",
        "items": [
          {
            "type": "p",
            "text": "Arise: feature branches live for days while main moves; two teams edit the same payment/user classes; a PR merge detects overlapping hunks."
          },
          {
            "type": "p",
            "text": "Prevent: short branches, frequent `git pull --rebase origin main`, small PRs, CI on every PR, branch protection, clear module ownership."
          },
          {
            "type": "p",
            "text": "Resolve: fetch, update branch with main, open conflicted files, edit markers to the intended combination, run the test suite, git add, commit, push, let CI re-run and re-request review."
          }
        ]
      }
    ],
    "pitfalls": [
      "Leaving conflict markers in the file or committing without re-running the tests.",
      "Choosing \"ours\" blindly: you may delete a teammate's fix.",
      "Resolving by force-pushing over the other branch.",
      "Not distinguishing textual from semantic (type 2) conflicts."
    ]
  },
  {
    "id": "git-version-control",
    "title": "Version control concepts, centralised vs distributed, workflows",
    "priority": 21,
    "tier": "possible",
    "freq": "est. medium (week 2)",
    "marks": "3-6 marks",
    "summary": "**Version control records changes over time so you can roll back, see who changed what, collaborate and troubleshoot. Git is distributed; feature branches and pull requests are the workflow.**",
    "mnemonic": "BRCTS: Backup, Record, Collaborate, Troubleshoot, Statistics",
    "source": [
      "CT417_Notes_02_Git_GitHub"
    ],
    "sections": [
      {
        "heading": "What and why",
        "items": [
          "Version (source/revision) control = a system that records changes to files over time so you can recall specific versions later. It tracks what changed, by whom and when.",
          "Why: backup and rollback to a previous version; record of who did what and when; collaboration in a team; troubleshooting (analyse history to find what caused a problem); statistics.",
          "Tools: CVS, Subversion (centralised); Git, Mercurial (distributed); Team Foundation Server."
        ]
      },
      {
        "heading": "Centralised vs distributed",
        "items": [
          {
            "type": "table",
            "head": [
              "",
              "Centralised (CVCS)",
              "Distributed (DVCS, Git)"
            ],
            "rows": [
              [
                "Repository",
                "One central repository shared in real time",
                "Every developer has a full local repository (clone/fork)"
              ],
              [
                "Offline work",
                "Needs the server to commit",
                "Commit, diff, inspect history with no network"
              ],
              [
                "Failure",
                "Server outage blocks everyone",
                "If trunk breaks you keep working locally"
              ],
              [
                "Example",
                "CVS, Subversion",
                "Git, Mercurial"
              ]
            ]
          },
          "Git history: Linus Torvalds used patches and archives for Linux (1991-2002), then BitKeeper from 2002; the licence was revoked in 2005 and Git was created in April 2005."
        ]
      },
      {
        "heading": "Feature branch workflow and pull requests",
        "items": [
          "Git encourages a separate **branch** (a parallel line of work) for every feature, however small. When the feature is finished it is merged into **trunk** (the main branch).",
          "A **pull request** asks someone responsible for the project to merge your work. The team reviews and discusses it first, which also lets team leads track changes.",
          "A **fork** is your own copy of someone else's repository on GitHub.",
          "pull = fetch + merge (can run individually); push uploads local commits; clone copies a remote repository."
        ]
      },
      {
        "heading": "What to check in",
        "items": [
          "Check in everything that influences the build (config files, encodings, settings) and everything needed to set up the project from a clean checkout (source, docs, manuals, images, datasets).",
          "Do NOT check in: binaries (JARs, build outputs), intermediate files (.pyc, .o), files with absolute paths, personal preferences/IDE junk."
        ]
      }
    ],
    "pitfalls": [
      "Saying Git and GitHub are the same: Git is the VCS, GitHub is a hosting and collaboration service.",
      "Committing build output such as target/."
    ]
  }
];
