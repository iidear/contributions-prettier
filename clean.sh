git checkout --orphan main

git add -A

node index.js

git branch -D master

git branch -m master

#git push -f origin master
