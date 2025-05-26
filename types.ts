export type User = {
    email:  string,
    fcmToken?: string, 
    firstName: string, 
    id: string, 
    lastName: string,
    profileImageOffset: {
        height: number, 
        width: number
    }
    profileImageScale: number, 
    profileImageUrl: string, 
    token: string
}

export type Contact = {
    contactUserId: User["id"], 
    id: string, 
    ownerId: User["id"], 
    pillarId: Array<string>
}

export type Thread = {
    firstMessageId: string, 
    id: string, 
    lastMessage: {
        fromId: User["id"], 
        id: string, 
        messageText?: string, 
        status: Array<string>,
        timestamp: Date, 
        toId: User["id"]
    }, 
    lastUpdated: Date,
    uids: Array<User["id"]>,
    users: Array<User>
}

export type Message = {
    fromId: User['id'],
    id: string, 
    isEncrypted: boolean, 
    messageText: string, 
    status: Array<string>,
    timestamp: Date, 
    toId: User['id'];
}