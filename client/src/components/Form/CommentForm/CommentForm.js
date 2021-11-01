import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router";

import { commentPost } from '../../../actions/posts'
import FormButton from '../FormButton'
import FormInput from '../FormInput'

const CommentForm = ({ postID }) => {
    const methodes = useForm()
    const { user } = useSelector(state => state.authData)
    const dispatch = useDispatch()
    const { id } = useParams()

    const onSubmit = (data) => {
        if (user) dispatch(commentPost(id, { creator: user.name, ...data }))
    }
    return (
        <FormProvider {...methodes}>
            <form onSubmit={methodes.handleSubmit(onSubmit)}>
                <FormInput name='comment' label='comment' multiline rows={4} required />
                <FormButton>Comment</FormButton>
            </form>
        </FormProvider>
    )
}

export default CommentForm
