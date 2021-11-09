import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router";

import { commentPost } from '../../../actions/posts'
import FormButton from '../FormButton'
import FormInput from '../FormInput'

const CommentForm = ({ postID }) => {
    const methodes = useForm({
        defaultValues: {
            comment: ''
        }
    })
    const { user } = useSelector(state => state.authData)
    const [disable, setDisable] = useState(true);
    const dispatch = useDispatch()
    const { id } = useParams()

    let [comment] = methodes.watch(['comment'])
    console.log(comment.trim(), 'watch')

    useEffect(() => {
        if (comment.trim()) {
            setDisable(false)
        } else {
            setDisable(true)
        }

    }, [comment])

    const onSubmit = (data) => {
        if (user) dispatch(commentPost(id, { creator: user.name, ...data }))
        methodes.reset()
        setDisable(true)

    }
    return (
        <FormProvider {...methodes}>
            <form >
                <FormInput name='comment' label='comment' multiline rows={4} required />
                <FormButton disabled={disable} onClick={methodes.handleSubmit(onSubmit)}>Comment</FormButton>
            </form>
        </FormProvider>
    )
}

export default CommentForm
