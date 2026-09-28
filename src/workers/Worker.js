const {Worker}=require("bullmq");
const Redis=require("ioredis");

const redisconnection=new Redis(
    "redis://default:SANFcc9pBcyxNMTTS4GTxEsXjTk4sYa8@dewy-lace-farm-99384.db.redis.io:15561",
    {
        maxRetriesPerRequest:null
    }
);

const worker=new Worker(
    "taskQueue",
    async(job)=>{
        console.log(`job has been started for ${job.data.name}`);   
        console.log(`email=${job.data.email}`)
        await new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    },
    {connection :redisconnection},
);
worker.on("completed",(job)=>{
    console.log(`task done for ${job.id}`)
})
worker.on("failed",(err)=>{
    console.log(`err`)
})


