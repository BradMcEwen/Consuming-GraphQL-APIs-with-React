import { Container, Row, Col } from 'react-bootstrap';
import PostsComponent from './components/PostPage';
import CreatePostForm from './components/CreatePost';
import UpdatePostForm from './components/UpdatePost';
import DeletePostForm from './components/DeletePost';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <CreatePostForm />
        </Col>
        <Col>
          <UpdatePostForm />
        </Col>
        <Col>
          <DeletePostForm />
        </Col>
      </Row>
      <Row>
        <Col>
          <PostsComponent />
        </Col>
      </Row>
    </Container>
  )
}

export default App;