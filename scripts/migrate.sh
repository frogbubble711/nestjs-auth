echo Enter name of new migration
read name
ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -n $name