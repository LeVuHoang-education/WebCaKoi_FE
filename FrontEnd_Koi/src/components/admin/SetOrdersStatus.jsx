import { useParams } from "react-router-dom";

const OrdersStatus = () => {
    const {id} = useParams();

    return (
        <div> Hi {id}</div>
    );
}

export default OrdersStatus;