import ErrorMsg from "@/components/ErrorMsg";
import React from "react";

const ResetError = ({ error, success }) => {
  return (
    <div className="absolute top-5 right-5">
      {success ? (
        <ErrorMsg type="success" error={error}>
          {error}
        </ErrorMsg>
      ) : (
        <ErrorMsg error={error}>{error}</ErrorMsg>
      )}
    </div>
  );
};

export default ResetError;
