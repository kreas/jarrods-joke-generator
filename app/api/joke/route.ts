import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request) {
    const { prompt } = await req.json()

    const response = await openai.createChatCompletion({
        model: 'gpt-4',
        stream: true,
        messages: [
            {
                role: 'system',
                content: 'You are a creative and witty dad joke generator. Your task is to generate unique, funny, and unexpected dad jokes based on the given subject. Avoid common or overused puns, and strive for originality. Your jokes should be clever wordplay that might make people groan, but also laugh. The joke should be somewhat raunchy or very corny.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        max_tokens: 150,
        temperature: 0.9,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        n: 1,
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
}