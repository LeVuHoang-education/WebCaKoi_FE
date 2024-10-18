import {useParams} from "react-router-dom"

const PaymentStatus = () => {
    const {id} = useParams()

    return (
      <div>Hello {id}</div>
    );
}

export default PaymentStatus