import React, { useState, useEffect } from 'react'
import { getPosts } from '../../infrastructur/api/fetchPosts'
const Posts = ()=>{
    const [posts , setPosts] = useState({})

    useEffect(()=>{
        const fetchData = async ()=>{
            const setDatatoStorage = await getPosts()
            localStorage.setItem('post' ,JSON.stringify(setDatatoStorage.data))
        }
        const getDataFromStorage = ()=>{
            const dataFromStorage = localStorage.getItem('post')
            setPosts(JSON.parse(dataFromStorage))
        }
        fetchData()
        getDataFromStorage()
    }, [])


 
    
    return (
    <>{posts.title}</>
    )
}

export default Posts