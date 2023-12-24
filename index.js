const express=require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//to get cookies from client side we require cookie purser
// const cookieParser=require('cookie-parser');
require('dotenv').config()
const corsConfig = {
  origin: '*',
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  }
  app.use(cors(corsConfig))
  app.use(express.json());
//middleware: just connecting client and server
// app.use(cors({
//   origin:['http://localhost:5173'],
//   credentials:true
// }))
// app.use(cookieParser())
const port=process.env.PORT || 3000;

//middleware
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://palppartha:pal610676@cluster0.kf7gnio.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });





  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7
     // await client.connect();
      const database = client.db("task_management");
      const taskCollection = database.collection("task");
    
      //post job
    app.post('/task', async (req,res)=>{
        const task_list=req.body;
        console.log('hello',task_list);
        const result = await taskCollection.insertOne(task_list);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.send(result);
    })
    app.get('/task',async(req,res)=>{
      const cursor=taskCollection.find();
      const result=await cursor.toArray();
      res.send(result);
  })

     

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
     // await client.close();
    }
  }
  run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('task is starting');
})
app.listen(port,()=>{
    console.log(`task is listening on port ${port}`)
})