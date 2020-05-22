import React from 'react'
import { getPosts } from '../../infrastructur/api/fetchPosts'
import {selector, useRecoilValue} from 'recoil'


const fetchData = selector({
    key : 'getPostTitle',
    get : async ({get}) =>{        
        const response = await getPosts()
        return response.data
    }
})

const GetPostTitle = () =>{
    const title = useRecoilValue(fetchData)       
         return <>{Object.keys(title).map(key=><p key={title[key].id}>{title[key].title}</p>)}</>
     
    
}

const Posts = ()=>{
    return (
        <React.Suspense fallback={<div>loading......</div>}>
            <GetPostTitle/>
        </React.Suspense>
    )
}

export default Posts