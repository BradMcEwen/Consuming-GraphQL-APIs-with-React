import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../queries/Queries';
import { Container, Spinner, Row, Col, Card, Alert } from 'react-bootstrap';

interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>Error!</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }

  return (
    <Container>
      <h1>Posts</h1>
      <Row>
        {data.posts.data.map((post: Post) => (
          <Col key={post.id} md={4}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <Card.Footer>
                  <small className="text-muted">User ID: {post.userId}</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Posts;
