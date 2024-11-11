export interface User {
    username: string,
    password: string,
    isAdmin?: boolean,
    hasVoted?: boolean,
    votedFor?: Candidate | null
}

export interface Candidate {
    name: string,
    image: string,
    votes: number
}

export interface RootState {
    users: User[],
    candidates: []
}

export type Status = "idle" | "pending" | "fulfilled" | "rejected"