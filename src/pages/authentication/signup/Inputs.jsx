import PwdStrengthCheck from "./PwdStrengthCheck";

const Inputs = ({
  email,
  password,
  confirmPassword,
  setEmail,
  setConfirmPassword,
  setPassword,
}) => {
  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="userEmail"
          type="email"
          name="email"
          value={email}
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          placeholder="Enter Your Password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1"
        />
        <PwdStrengthCheck password={password} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Your Password"
          autoComplete="new-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mt-1"
        />
      </div>
    </>
  );
};

export default Inputs;
