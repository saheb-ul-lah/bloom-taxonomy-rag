import express from 'express';
import cors from 'cors';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/api/user/webhook", async (req, res) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing WEBHOOK_SECRET");
    return res.status(500).send("Server misconfiguration");
  }
  
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];
  
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers");
    return res.status(400).send("Missing Svix headers");
  }
  
  const payload = req.body;
  const body = JSON.stringify(payload);
  
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).send("Webhook verification failed");
  }
  
  const { id } = evt.data;
  const eventType = evt.type;
  
  const { email_addresses, primary_email_address_id, first_name, last_name } = evt.data;
  const primaryEmail = email_addresses.find(
    (email) => email.id === primary_email_address_id
  );
  const fullName = [first_name, last_name].filter(Boolean).join(" ");
  
  if (eventType === "user.created") {
    await prisma.user.create({
      data: {
        clerkId: id,
        email: primaryEmail?.email_address || "no-email@example.com",
        name: fullName || "Unknown User",
      },
    });
    
    console.log("✅ Clerk user created");
  }
  
  if (eventType === "user.updated") {
    await prisma.user.update({
      where: { clerkId: id },
      data: {
        email: primaryEmail?.email_address || "no-email@example.com",
        name: fullName || "Unknown User",
      },
    });
    
    console.log("✏️ Clerk user updated");
  }
  
  return res.status(200).send("Webhook received successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});