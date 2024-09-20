import { chain } from "@/middlewares/chain";
import { withAuthMiddleware } from "./middlewares/auth";

export default chain([withAuthMiddleware]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|H5P/).*)"],
};
