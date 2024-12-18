import jwt from "jsonwebtoken";
import config from "../../config";

const crateToken = (
	JwtPayload: { userId: string; role: string },
	secret: string,
	expiresIn: string
) => {
	jwt.sign(JwtPayload, config.jwt_secret_token as string, {
		expiresIn: "10d",
	});
};
