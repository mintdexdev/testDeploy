import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import appwriteOperation from '../../appwrite/operation.js'
import { Button, Input, Select, RTE } from '../index.js'

function PostForm({
  post,

}) {
  const { register, handleSubmit, watch, getValues, setValue, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "",
    }
  });
  const navigate = useNavigate();
  const userData = useSelector(state => state.authReducer.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteOperation.uploadFile(data.image[0]) : null
      if (file) {
        appwriteOperation.deleteFile(post.image.coverImage)
      }
      const dbPost = await appwriteOperation.updatePost(post.$id, { ...data, coverImage: file ? file.$id : undefined })

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // well we can put this outside of if-else block
      const file = await appwriteOperation.uploadFile(data.image[0])
      if (file) {
        data.coverImage = file.$id
        const dbPost = await appwriteOperation.createPost({
          ...data,
          userId: userData.$id,
        })
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }

  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value.trim().toLowerCase().replace(/[^a-z\d]/g, '-')

    return '';
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    });

    return () => {
      subscription.unsubscribe()
    }
  }, [watch, slugTransform, setValue])


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          className="mb-4"
          label="Title :"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <Input
          className="mb-4"
          label="Slug :"
          placeholder="Slug"
          disabled
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          className="mb-4"
          label="Featured Image :"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFileView(post.coverImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          className="mb-4"
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />
        <Button
          className="w-full"
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm