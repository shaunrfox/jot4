import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const pages = await prisma.page.findMany();

  for (const page of pages) {
    let dateToSet;
    const dateFromTitle = page.title.match(/\d{4}-\d{2}-\d{2}/);

    if (dateFromTitle) {
      dateToSet = new Date(dateFromTitle[0]);
    } else if (page.created_at) {
      dateToSet = new Date(page.created_at);
    } else {
      // If no date in title and no created_at, use current date
      dateToSet = new Date();
    }

    // Ensure the date is valid
    if (isNaN(dateToSet.getTime())) {
      console.warn(`Invalid date for page ${page.id}. Using current date.`);
      dateToSet = new Date();
    }

    try {
      await prisma.page.upsert({
        where: { id: page.id },
        update: {
          date: dateToSet,
          created_at: page.created_at || new Date(),
          updated_at: page.updated_at || new Date(),
        },
        create: {
          id: page.id,
          title: page.title,
          content: page.content,
          date: dateToSet,
          created_at: page.created_at || new Date(),
          updated_at: page.updated_at || new Date(),
        },
      });
      // console.log(`Updated page ${page.id} with date ${dateToSet}`);
    } catch (error) {
      console.error(`Failed to update page ${page.id}:`, error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
