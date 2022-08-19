import { hello } from "@acomsys/dash-utils";
import { z } from "zod";
import { Tree1 } from "../../../mocks/tree/tree1";
import { Dash } from "../../../models/Dash";
import { createProtectedRouter } from "../protected-router";

export const dashRouter = createProtectedRouter()
    .mutation('push.directory', {
        input: z
            .object({
                text: z.string().max(50)
            })
            .nullish(),
        resolve(req) {
            const id = Tree1.length;
            console.log(id);
            Tree1.push({
                text: `${req?.input?.text} ${id}` ?? "untitled",
                id: id,
                index: id,
                hasChildren: false,
                level: 0,
            })
            return {
                directories: Tree1,
                message: hello("df"),
            }
        }
    })
    .query("get", {
        resolve({ ctx }): Dash {
            return {
                directories: Tree1,
                message: hello("df"),
            };
        },
    });
