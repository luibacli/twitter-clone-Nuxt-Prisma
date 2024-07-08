import { getUserByUsername } from "~/server/db/users";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt";
import { userTransformer } from "~/server/transformers/user";
import { createRefreshToken } from "~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { username, password } = body;

    if (!username || !password) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Invalid Params",
            })
        );
    }

    // Is the user registered
    const user = await getUserByUsername(username);

    if (!user) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Username or password is invalid",
            })
        );
    }

    // Compare Passwords

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Password does not match",
            })
        );
    }

    //  Generate Tokens

    const { accessToken, refreshToken } = generateTokens(user);

    // save refreshToken to database

    await createRefreshToken({
        token: refreshToken,
        userId: user.id,
    });

    // add http only cookie
    sendRefreshToken(event, refreshToken);

    return {
        access_token: accessToken,
        user: userTransformer(user),
    };
});
