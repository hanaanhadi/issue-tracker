'use client';
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/ValidationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spiner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  const [error, SetError] = useState('');
  const [IsSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    }
    catch (error) {
      setSubmitting(false);
      SetError('An unexpected error occured !');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-3'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form
        className='max-w-xl space-y-3'
        onSubmit={ onSubmit }>
        <TextField.Root placeholder='Title' {...register('title')}></TextField.Root>

        <ErrorMessage >
          {errors.title?.message}
        </ErrorMessage>
        <TextArea placeholder='Description' {...register('description')} />

        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button disabled={IsSubmitting}>
          Sumbit New Issue {IsSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage
