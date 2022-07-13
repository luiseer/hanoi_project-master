import { Row, Col, Button } from "react-bootstrap";

const GameOptionsComp = ({ disks, solve, reset, setDisks }) => {
  return (
    <Row>
      <Col>
        <span>Discos: {disks}</span>
        <Button variant="outline-secondary" style={{marginLeft: '20px', width: '40px'}} onClick={() => {if(disks < 8) setDisks(disks + 1)}}>
          +
        </Button>
        <Button
          variant="outline-secondary"
          style={{marginLeft: '20px', width: '40px'}}
          onClick={() => {
            if (disks > 3) setDisks(disks - 1);
          }}
        >
          -
        </Button>
      </Col>
      <Col>
        <Button variant="outline-secondary"  onClick={() => reset()}>
          Reiniciar
        </Button>
        <Button variant="outline-secondary" onClick={() => solve()}>
          Resolver
        </Button>
      </Col>
    </Row>
  );
};

export default GameOptionsComp;