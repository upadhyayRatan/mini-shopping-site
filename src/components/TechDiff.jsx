import React from "react";

function TechDiff() {
  const onLogin = () => {
    localStorage.clear();
    window.location.href = "http://localhost:3000/login";
  };
  return (
    <div>
      <p
        class="mx-auto text-center"
        style={{ color: "red", marginTop: "5%",boxShadow:'5px 10px 8px #888888',border:'1px solid'}}
      >
        {" "}
        Login again to continue..
      </p>
      <div className="text-center">
        <button class="mx-auto " style={{color:'red'}} onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default TechDiff;
