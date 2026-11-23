
import dotenv from "dotenv";
import readlineSync from "readline-sync";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from "@google/genai";

dotenv.config({
    path: "../.env"
});

// Gemini setup
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.index({
    host: process.env.PINECONE_HOST,
    namespace: "pdf-rag",
});

// System Instruction
const systemInstruction = `
You have to behave like a Data Structure and Algorithm Expert.

You will be given a context of relevant information and a user question.

Your task is to answer the user's question based ONLY on the provided context.

If the answer is not in the context, you must say:
"I could not find the answer in the provided document."

Do not answer general knowledge or unrelated questions.
Do not use your own knowledge or external information.

Keep your answers clear, concise, and educational.
`;

async function chatting(userProblem) {

    // Existing Pinecone search code (unchanged)
    const response = await pineconeIndex.documents.search({
        scoreBy: [
            {
                type: "embed",
                field: "chunk_text",
                query: userProblem,
            }
        ],
        topK: 5,
        includeFields: ["chunk_text", "title"],
    });

    console.log("\nRelevant PDF chunks:\n");

    response.matches.forEach((match, index) => {
        console.log(`\nResult ${index + 1}`);
        console.log("Score:", match._score);
        console.log("Text:", match.chunk_text);
    });

    // Added: Combine retrieved PDF chunks into context
    const context = response.matches
        .map((match) => match.chunk_text)
        .join("\n\n");

    // Added: Send PDF context + user question to Gemini
    const result = await ai.models.generateContent({
        model: "gemini-3.6-flash",

        contents: `
PDF CONTEXT:
${context}

USER QUESTION:
${userProblem}
`,

        config: {
            systemInstruction: systemInstruction
        }
    });

    console.log("\nAnswer:\n");
    console.log(result.text);
}

async function main() {

    const userProblem = readlineSync.question(
        "\nAsk me anything (type exit to quit) --> "
    );

    if (userProblem.toLowerCase() === "exit") {
        console.log("Goodbye!");
        return;
    }

    await chatting(userProblem);

    main();
}

main().catch(console.error);
