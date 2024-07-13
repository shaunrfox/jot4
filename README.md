# Jot 4!

For real this time...

## Development

| | Step | Command |
| --- | --- | --- |
| 1 | Install dependencies | `npm install` |
| 2 | Run Docker | `docker compose up` |
| 3 | Generate Prisma Client | `npx prisma generate` |
| 4 | Seed DB (if needed) | `npm run seed` |
| 5 | Run Remix | `npm run dev` |

## Technologies

- [Remix](https://remix.run/) + [Prisma](https://www.prisma.io/) + [MongoDB](https://www.mongodb.com/)
- [Lexical](https://playground.lexical.dev/) or [SlateJS](https://www.slatejs.org/examples/richtext)
- [Jot Pattern Library](https://jot.st/components)

## MongoDB

Options for connecting to the database:

- Use [Mongo Compass](https://www.mongodb.com/products/tools/compass)
- Use [Prisma Studio](https://www.prisma.io/docs/orm/tools/prisma-studio): `npx prisma studio`
