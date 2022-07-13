import { Row, Col, Button } from "react-bootstrap";

const GameOptionsComp = ({ disks }) => {
  return (
    <Row>
      <Col>
        <span>Discos: {disks}</span>
        <Button
          variant="outline-secondary"
        >
          +
        </Button>
        <Button
          variant="outline-secondary"
        >
          -
        </Button>
      </Col>
      <Col>
        <Button variant="outline-secondary" onClick={}>
          Reiniciar
        </Button>
        <Button variant="outline-secondary" onClick={}>
          Resolver
        </Button>
      </Col>
    </Row>
  );
};

export default GameOptionsComp;
