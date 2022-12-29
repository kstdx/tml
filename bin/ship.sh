deno run -A bin/build.js
git add .
git commit -m "$2"
git tag -a "$1" -m "$2"
git push origin --tags
git push origin