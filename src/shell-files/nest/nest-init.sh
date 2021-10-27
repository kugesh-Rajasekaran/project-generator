args=("$@")
echo ${cwd}
npm install @nestjs/cli
npx nest new ${args[0]}

