import { Err, Ok } from "@watchparty/shared/errors";
import { env } from "../env";
import type { accessTokenReq } from "@watchparty/shared/types";

export async function getAccessToken() {
    try {
        console.log("Access token requested...");
        const res = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: env.GOOGLE_CLIENT_ID,
                client_secret: env.GOOGLE_CLIENT_SECRET,
                refresh_token: env.YT_REFRESH_TOKEN,
                grant_type: "refresh_token",
            }),
        });
        if (!res.ok) {
            const err = await res.text();
            switch (res.status) {
                case 400:
                    return Err({
                        code: 500,
                        name: "InternalError",
                        message: "Bad request",
                        error: err,
                    });
                case 401:
                    return Err({
                        code: 401,
                        name: "UnauthorizedError",
                        message: "Unauthorized",
                        error: err,
                    });
                case 403:
                    return Err({
                        code: 503,
                        name: "ServiceUnavailableError",
                        message: "Service currently unavailable",
                        error: err,
                    });
                case 404:
                    return Err({
                        code: 404,
                        name: "NotFoundError",
                        message: "Not found",
                        error: err,
                    });
                default:
                    return Err({
                        code: 502,
                        name: "BadGatewayError",
                        message: "Bad gateway",
                        error: err,
                    });
            }
        }

        const data = (await res.json()) as accessTokenReq;
        console.log("success");
        return Ok(data.access_token); // valid for ~1 hour, discard after use
    } catch (error) {
        return Err({
            code: 502,
            name: "BadGatewayError",
            message: error instanceof Error ? error.message : "Unknown error",
            error,
        });
    }
}
