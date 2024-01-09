import { PrismaClient } from "@prisma/client";
import { random, uniqueId } from "lodash";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  console.log("Seeding...");

  const user1 = await prisma.user.create({
    data: {
      email: "lisa@simpson.com",
      firstname: "Lisa",
      lastname: "Simpson",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm", // secret42
      role: "USER",
      posts: {
        create: {
          title: "Join us for Prisma Day 2019 in Berlin",
          content: "https://www.prisma.io/day/",
          published: true,
        },
      },
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: "bart@simpson.com",
      firstname: "Bart",
      lastname: "Simpson",
      role: "ADMIN",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm", // secret42
      posts: {
        create: [
          {
            title: "Subscribe to GraphQL Weekly for community news",
            content: "https://graphqlweekly.com/",
            published: true,
          },
          {
            title: "Follow Prisma on Twitter",
            content: "https://twitter.com/prisma",
            published: false,
          },
        ],
      },
    },
  });
  const user3 = await prisma.user.create({
    data: {
      email: "928783975@qq.com",
      firstname: "WANG",
      lastname: "MING",
      role: "ADMIN",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm", // secret42
      posts: {
        create: [
          {
            title: "Subscribe to GraphQL Weekly for community news",
            content: "https://graphqlweekly.com/",
            published: true,
          },
          {
            title: "Follow Prisma on Twitter",
            content: "https://twitter.com/prisma",
            published: false,
          },
        ],
      },
    },
  });

  console.log({ user1, user2, user3 });

  await prisma.supplier.create({
    data: {
      name: "王明",
      code: "wangming" + uniqueId(),
    },
  });
  for (let index = 0; index < 100; index++) {
    await prisma.book.create({
      data: {
        name: "从此爱上写作文-小学生注音看图作文(1-3年级适用)",
        bookNumber: 170228 + index + random(),
        author: "张在军 著",
        printTime: "2014-10-01",
        classification: "G",
        publish: "中国画报",
        format: "B15-01-2",
        discount: 0.1,
        address: "bj",
        stock: 647,
        price: 123,
        readership: "小学",
        supplierCode: "wang",
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
