import prisma from "../db/client.js";

async function seedAdmin() {
  const email = "helloworlds4357@gmail.com"; // your clerk email

  const user = await prisma.user.update({
    where: { email },
    data: { role: "ADMIN" },
  });

  console.log("Admin seeded:", user.email);
}

seedAdmin()
  .then(() => process.exit(0))
  .catch(console.error);
