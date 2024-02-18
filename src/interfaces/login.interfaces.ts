import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";


export type TLoginReq = z.infer<typeof loginSchema>;
