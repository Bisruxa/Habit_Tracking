import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const seed = async () => {
  console.log("Starting database seed...");
  const salt = bcrypt.genSaltSync();

  try {
    console.log("Creating demo user...");
    const user = await prisma.users.upsert({
      where: { email: "user@test.com" },
      update: {},
      create: {
        email: "user@test.com",
        username: "bisru",
        password: bcrypt.hashSync("password", salt),
        firstName: "Bisrat",
        lastName: "Alemayehu",
      },
    });

    console.log("Creating tags...");
    const healthTag = await prisma.tags.create({
      data: {
        name: "Health",
        color: "#10B981",
      },
    });

    const productivityTag = await prisma.tags.create({
      data: {
        name: "Productivity",
        color: "#3B82F6",
      },
    });

    console.log("Creating demo habits...");
    const exerciseHabit = await prisma.habit.create({
      data: {
        userId: user.id,
        name: "Exercise",
        description: "Daily workout routine",
        frequency: 1,
        targetCount: 1,
        HabitTags: {
          create: [
            { tag: { connect: { id: healthTag.id } } },
            { tag: { connect: { id: productivityTag.id } } },
          ],
        },
      },
    });

    console.log("Seed complete ✅");
  } catch (e) {
    console.error("Seed failed ❌", e);
  }
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
