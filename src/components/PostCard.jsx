import React from 'react'
import { Link } from 'react-router'
import { imageService } from '../appwrite/index.js'

function PostCard({
  $id,
  title,
  coverImageId }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full p-1 rounded-xl bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-800/70' >
        <div className='w-full justify-center mb-4'>
          <img src={imageService.viewImage(coverImageId)}
            alt={title}
            className='rounded-lg' />
        </div>
        <h2
          className='text-2xl mx-2 font-bold'
        >{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard