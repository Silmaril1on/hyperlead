"use client";

import Button from "@/components/Button";
import { useState } from "react";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="w-[300px] relative mb-2">
      <input
        type="text"
        id="email"
        name="email"
        placeholder="enter your email"
      />

      <Button className="absolute right-0  top-0" type="submit">
        Subscribe
      </Button>
    </div>
  );
};

export default SubscribeForm;
