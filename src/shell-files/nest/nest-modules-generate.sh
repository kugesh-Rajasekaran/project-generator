args=("$@")
for((ind=1; ind<$#; ind++))
do
  echo ${args[ind]}+"---"
  npx nest generate mo ${args[ind]}
  npx nest generate co ${args[ind]}
  npx nest generate s ${args[ind]}
done
npm i --save @nestjs/typeorm typeorm
npm install pg --save
