import Button from "@/components/Button";
import { IoMdHome } from "react-icons/io";

const PricingButton = ({ item }) => {
  return (
    <Button type={`${item.color ? "primary" : "secondary"}`}>
      <IoMdHome size={20} />
      <h1>Activate HyperLead</h1>
    </Button>
  );
};

export default PricingButton;
