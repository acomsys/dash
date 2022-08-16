import { z } from "zod";
import { Tree1 } from "../../../mocks/tree/tree1";
import { Dash } from "../../../models/Dash";
import { createProtectedRouter } from "../protected-router";

let id = 500;

export const dashRouter = createProtectedRouter()
    .mutation('push.directory', {
        input: z
            .object({
                text: z.string().max(50)
            })
            .nullish(),
        resolve(req) {
            id = id + 1;
            console.log(id);
            Tree1.push({
                text: `${req?.input?.text} ${id}` ?? "untitled",
                id: id,
                hasChildren: false
            })
            return {
                directories: Tree1,
            }
        }
    })
    .query("get", {
        resolve({ ctx }): Dash {
            return {
                directories: Tree1,
            };
        },
    });
