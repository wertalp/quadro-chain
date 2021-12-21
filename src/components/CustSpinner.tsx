
import { Fragment } from "react";
import { Spinner ,Button} from "react-bootstrap"



export  const CustSpinner = (props: any) =>  {

    
  return (
<Fragment>
<Button variant="primary" disabled>
    <Spinner
      as="span"
      animation= {props.animation}
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span className="visually-hidden">Loading...</span>
  </Button>{' '}
  <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>
</Fragment>


  );
}