#!/bin/sh

rm -f archive.zip
cd lambda
zip archive.zip * -Xr
mv archive.zip ../.
cd ..
aws lambda update-function-code --function-name superHeroQuizJS --zip-file fileb://archive.zip
