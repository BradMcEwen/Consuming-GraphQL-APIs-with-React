import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '../mutations/Mutations';
import { FormEvent, useRef } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';

const UpdatePostForm: React.FC = () => {
  const inputId = useRef<HTMLInputElement>(null);
  const inputTitle = useRef<HTMLInputElement>(null);
  const inputBody = useRef<HTMLInputElement>(null);

  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputId.current && inputTitle.current && inputBody.current) {
      updatePost({
        variables: {
          id: inputId.current.value,
          input: {
            title: inputTitle.current.value,
            body: inputBody.current.value
          }
        }
      });
      inputId.current.value = '';
      inputTitle.current.value = '';
      inputBody.current.value = '';
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>ERROR</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }

  return (
    <Container>
      <h1>Update Post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="postId">
          <Form.Label>Post Id: </Form.Label>
          <Form.Control type="text" placeholder="Enter post Id" ref={inputId} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postTitle">
          <Form.Label>Title: </Form.Label>
          <Form.Control type="text" placeholder="Enter post title" ref={inputTitle} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postBody">
          <Form.Label>Body: </Form.Label>
          <Form.Control type="text" placeholder="Enter post body" ref={inputBody} />
        </Form.Group>
        <Button type="submit">Update Post</Button>
      </Form>
      {data && data.updatePost && (
        <div>
          <h2>Updated Post: {data.updatePost.title}</h2>
          <p>Post Id: {data.updatePost.id}</p>
          <p>User Id: {data.updatePost.userId}</p>
          <p>Body: {data.updatePost.body}</p>
        </div>
      )}
    </Container>
  );
};

export default UpdatePostForm;
