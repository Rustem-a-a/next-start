import React from "react";
import {Metadata} from "next";

type Props = {
    params:{
        id:string
    }
}
export async function generateMetadata({params:{id}}:Props):Promise<Metadata>{
    const post = await getData(id)
    return {
        title: `${post.title} | Next Start`
    }
}

async function getData(id:string){
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        next:{
            revalidate:30
        }
    })
    return await response.json()
}

const Post = async ({params:{id}}:Props) => {

    const post = await getData(id)
    return (
        <>
            <h1>{post.title}</h1>
            <h3>{post.body}</h3>
        </>
    );
};

export default Post;