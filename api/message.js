export default async function handler(req, res) {
  // Allow CORS from your frontend (you can specify your frontend domain here)
  res.setHeader("Access-Control-Allow-Origin", "*"); // Use specific origin in production
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS request (for preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const { content } = req.body;

      // Connect to MongoDB Atlas and save the message
      const MongoClient = require("mongodb").MongoClient;
      const uri = "your-mongodb-atlas-connection-string";
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await client.connect();
      const database = client.db("your-database-name");
      const collection = database.collection("messages");

      // Insert the message into the database
      const result = await collection.insertOne({ content });

      res.status(200).json({ message: "Message saved successfully!", result });
    } catch (error) {
      res.status(500).json({ message: "Error saving message", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
