import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const { state } = useLocation();
  const { appointment } = state;
  const { token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/pay-appointment`, {
        appointmentId: appointment._id
      }, {
        headers: { token }
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-gray-600 text-xl font-bold mb-4">Appointment Payment</h2>
      <p><strong>Doctor:</strong> {appointment.docData.name}</p>
      <p><strong>Amount:</strong> ₹{appointment.amount}</p>
      <button
        onClick={handlePayment}
        className="mt-6 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;

