import { Elysia, redirect } from "elysia";

const BASE_URL = "https://cataas.com/cat";

const app = new Elysia();

interface RandomCatResponse {
    tags?: string[];
    mimetype?: string;
    size?: number;
    createdAt?: string;
    editedAt?: string;
    _id: string;
}

app.get("/cat/:id", async ({ params, set }) => {
    const targetUrl = `${BASE_URL}/${params.id}`;

    // the commented code below works too!

    // const response = await fetch(targetUrl);
    // set.headers["content-type"] = response.headers.get("content-type") || "";
    // const arrayBuffer = await response.arrayBuffer();
    // return new Uint8Array(arrayBuffer);

    return await fetch(targetUrl);
});

app.get("/random", async () => {
    const url = "https://cataas.com/cat?json=true";
    const response = (await fetch(url)).json() as Promise<RandomCatResponse>;

    return redirect(`/cat/${(await response)._id}`);
});

app.listen(3000);

console.log(`Listening on ${app.server?.url}`);
