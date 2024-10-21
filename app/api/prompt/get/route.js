/* eslint-disable @typescript-eslint/no-unused-vars */
import  Prompt  from '@/models/promptSchema';
import  ConnectToDb  from '@/utils/database';
export  async  function GET (req) {
    try {
        await ConnectToDb();
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}