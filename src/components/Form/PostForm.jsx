import React, { useCallback, useEffect } from 'react'
import { Button, Input, TextEditor, Select } from '../index.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { imageService, postService } from '../../appwrite/index'

function PostForm({ post }) {
  const navigate = useNavigate()
  const userData = useSelector(state => state.authReducer.userData)
  const { register, handleSubmit, watch, getValues, setValue, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  })

  const submitForm = async (data) => {
    if (post) {
      const imageFile = data.image[0] ? await imageService.uploadImage(data.image[0]) : null
      if (imageFile) imageService.deleteImage(post.coverImageId)

      const dbPost = await postService.updatePost(post.$id, {
        ...data,
        coverImageId: imageFile ? imageFile.$id : undefined
      })
      if (dbPost) navigate(`/post/${dbPost.$id}`);

    } else {
      const imageFile = data.image[0] ? await imageService.uploadImage(data.image[0]) : null
      if (imageFile) {
        data.coverImageId = imageFile.$id;
        const dbPost = await postService.createPost({ ...data, userId: userData.$id });
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  }

  const slugTransform = useCallback(value => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    })

    return () => subscription.unsubscribe()

  }, [watch, slugTransform, setValue])


  return (
    <form
      className="flex flex-wrap"
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <TextEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Cover Image:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={imageService.viewImage(post.coverImageId)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm