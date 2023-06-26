export interface Reply {
    id: string;
    content: string;
    user: {
        name: string;
        lastname: string;
    };
    username: string;
    imageurl: string;
    replyto: string;
}

export interface Feedbck {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    comments: Comment[];
    ups: number;
    date: string;
}

export interface Comment {
    id: string;
    content: string;
    user: {
        name: string;
        lastname: string;
    };
    username: string;
    imageurl: string;
    replies: Reply[];
}

export interface Feedback {
    _id: ObjectId;
    title: string;
    description: string;
    tags: string[];
    comments: Comment[];
    ups: number;
    date: string;
}
