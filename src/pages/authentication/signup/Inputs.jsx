import PwdStrengthCheck from "./PwdStrengthCheck";

const Inputs = ({
  email,
  userName,
  password,
  confirmPassword,
  setEmail,
  setUserName,
  setConfirmPassword,
  setPassword,
}) => {
  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          id="userEmail"
          className="mt-1"
          placeholder="Your Email"
          autoComplete="false"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="name">Display Name</label>
        <input
          id="name"
          type="text"
          name="name"
          className="mt-1"
          placeholder="Display name"
          autoComplete="false"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
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
