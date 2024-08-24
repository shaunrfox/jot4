import { PrismaClient, BlockType } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

function generateTiptapContent() {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: faker.word.words({ count: { min: 20, max: 100 } }),
          },
        ],
      },
    ],
  };
}

async function main() {
  // Create sample pages
  const pages = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      const date = new Date();
      date.setDate(date.getDate() - index); // Create pages for the last 5 days
      date.setHours(0, 0, 0, 0);

      const page = await prisma.page.create({
        data: {
          title: faker.company.buzzPhrase(),
          content: generateTiptapContent(),
          date: date,
        },
      });

      // Create blocks for each page
      const blocks = await Promise.all(
        Array.from({ length: faker.number.int({ min: 3, max: 10 }) }).map(
          async () => {
            return prisma.block.create({
              data: {
                type: faker.helpers.arrayElement(Object.values(BlockType)),
                attrs: {},
                content: generateTiptapContent(),
                referenced_in: [],
                parent_id: page.id,
              },
            });
          },
        ),
      );

      console.log(`Created page "${page.title}" with ${blocks.length} blocks`);

      return { page, blocks };
    }),
  );

  console.log(`Created ${pages.length} pages with blocks`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
