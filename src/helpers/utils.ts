import { DATA_SOURCE } from "../db/client";

export const converToType = (id: string) => {
    if (DATA_SOURCE === "postgres") {
        return Number(id)

    } else {

        return id
    }
}

