import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt";
import { getUserById } from "../db/users";

export default defineEventHandler(async (event) => {
    // brooooo dont forget / before API!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const endpoints = ["/api/auth/user"];

    const isHandledByThisMiddleWare = endpoints.some((endpoint) => {
        const pattern = new UrlPattern(endpoint);

        return pattern.match(event.node.req.url);
    });

    // console.log(isHandledByThisMiddleWare);

    if (!isHandledByThisMiddleWare) {
        return;
    }

    // make sure to put space between ""
    const token = event.node.req.headers["authorization"]?.split(" ")[1];

    const decoded = decodeAccessToken(token);

    if (!decoded) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
            })
        );
    }

    try {
        const userId = decoded.userId;

        const user = await getUserById(userId);

        // setting user in the context
        event.context.auth = { user };
    } catch (error) {
        return;
    }
});
