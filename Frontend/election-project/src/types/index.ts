export interface User {
    _id?: string,
    username: string,
    password: string,
    isAdmin?: boolean,
    hasVoted?: boolean,
    votedFor?: string | null
}

export interface Candidate {
    _id: string,
    name: string,
    image: string,
    votes: number
}

export interface RootState {
    users: User[],
    candidates: []
}

export type Status = "idle" | "pending" | "fulfilled" | "rejected"