import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/index.js'
import appwriteOperation from '../appwrite/operation.js'
import { useNavigate, useParams } from 'react-router';


function EditPost() {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteOperation.getPost(slug).then((data) => {
        if (data) {
          setPost(data);
        }
      })
    }
  }, [slug, navigate])

  if (!post) return

  return (
    <div className='py-8'>
      <Container>
        <PostForm post={post}/>
      </Container>
    </div>
  )
}

export default EditPost