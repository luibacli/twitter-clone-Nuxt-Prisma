import formidable from "formidable";
import { createTweet } from "~/server/db/tweets";
import { tweetTransformer } from "~/server/transformers/tweet";

export default defineEventHandler(async (event) => {
    const form = formidable({});

    const response = await new Promise((resolve, reject) => {
        form.parse(event.node.req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            resolve({ fields, files });
        });
    });

    const { fields, files } = response;

    const userId = event.context?.auth?.user?.id;

    const tweetData = {
        text: fields.text[0],
        authorId: userId,
    };
    console.log("text", typeof fields.text[0]);

    const tweet = await createTweet(tweetData);
    console.log("tweet", tweet);

    return {
        userId: tweetTransformer(tweet),
    };
});
