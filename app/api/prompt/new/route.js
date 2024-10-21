/* eslint-disable @typescript-eslint/no-unused-vars */
import ConnectToDb  from '@/utils/database';
import Prompt from '@/models/promptSchema';
export  async function POST (req,res) {
    try {
        const { userId,prompt,tag } = await req.json();
        console.log(tag)
        const tags=[...tag]
        console.log(tags)
        await ConnectToDb();
        const created_prompt=await Prompt.create({
            prompt:prompt,
            tag:tags,
            creator:userId,
        })
        return new Response(JSON.stringify(created_prompt),{status:200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}