import jwt from "jsonwebtoken";

export const crateToken = (
	JwtPayload: { userId: string; role: string },
	secret: string,
	expiresIn: string
) => {
	jwt.sign(JwtPayload, secret, {
		expiresIn,
	});
};
