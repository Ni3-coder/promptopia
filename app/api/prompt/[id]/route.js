import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt)return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
} 

// Patch (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag} = await request.json();
    try {
        await connectToDB();
        const existingprompt = await Prompt.findById(params.id);
        if(!existingprompt) return new Response("Prompt not found", { status: 404 })
        existingprompt.prompt = prompt;
        existingprompt.tag = tag;
        await existingprompt.save();
        return new Response(JSON.stringify(existingprompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to update prompts", { status: 500 });
    }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    const { prompt, tag} = await request.json();
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt delelted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })
    }
}