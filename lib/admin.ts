import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2lk9FxJo3NNzn6QdeoXYkm9ybyT"
]

export const isAdmin = async () => {
    const { userId } = await auth()
    if (!userId) {
        return false
    }

    return adminIds.indexOf(userId) !== 1
}