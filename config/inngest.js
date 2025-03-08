import { Inngest } from "inngest";
import connectDb from "@/config/db"; // Adjust if needed
import User from "@/model/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest function to save user data to database
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name, // Fixed space issue
      imageUrl: image_url,
    };

    await connectDb();
    await User.create(userData);
  }
);

// Inngest function to update user data in database
export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  { event: "clerk/user.updated" },
  async ({ event }) => {  // Fixed async function placement
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };

    await connectDb();
    await User.findByIdAndUpdate(id, userData);
  }
);

// Inngest function to delete user from database
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
  },
  { event: "clerk/user.deleted" },
  async ({ event }) => {  // Fixed async function placement
    const { id } = event.data;

    await connectDb();
    await User.findByIdAndDelete(id);
  }
);
