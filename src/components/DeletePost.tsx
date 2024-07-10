import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../mutations/Mutations';
import { FormEvent, useRef } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';

const DeletePostForm: React.FC = () => {
  const inputId = useRef<HTMLInputElement>(null);

  const [deletePost, { data, loading, error }] = useMutation(DELETE_POST);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputId.current) {
      deletePost({ variables: { id: inputId.current.value } });
      inputId.current.value = '';
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
      <h1>Delete Post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="postId">
          <Form.Label>Post Id: </Form.Label>
          <Form.Control type="text" placeholder="Enter post Id" ref={inputId} />
        </Form.Group>
        <Button type="submit">Delete Post</Button>
      </Form>
      {data && data.deletePost && (
        <div>
          <h2>Deleted Post: {data.deletePost.id}</h2>
        </div>
      )}
    </Container>
  );
};

export default DeletePostForm;
