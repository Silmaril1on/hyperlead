"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUserProfile } from "@/features/userSlice";
import { setError } from "@/features/modalSlice";
import { updateProfile } from "@/lib/actions/profileActions";
import Button from "@/components/buttons/Button";
import FormContainer from "@/components/containers/FormContainer";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import FlexBox from "@/components/containers/FlexBox";
import MotionContainer from "@/components/containers/MotionContainer";

const UpdateProfile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    address: "",
    lastName: "",
    firstName: "",
    company: "",
    country: "",
    city: "",
    sex: "",
    userBirthDate: "",
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user?.profile) {
      setFormData({
        userName: user.profile.userName || user.email?.split("@")[0] || "",
        phone: user.profile.phone || "",
        address: user.profile.address || "",
        lastName: user.profile.lastName || "",
        firstName: user.profile.firstName || "",
        company: user.profile.company || "",
        country: user.profile.country || "",
        city: user.profile.city || "",
        sex: user.profile.sex || "",
        userBirthDate: user.profile.userBirthDate || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cleanFormData = (data) => {
    const cleaned = {};
    for (const key in data) {
      if (data[key] !== "") {
        cleaned[key] = data[key];
      } else {
        cleaned[key] = null;
      }
    }
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      dispatch(setError("User not found. Please try refreshing the page."));
      return;
    }
    setLoading(true);
    try {
      const cleanedData = cleanFormData(formData);
      const { data, error } = await updateProfile(user.id, cleanedData);
      if (error) {
        dispatch(setError(error));
        setLoading(false);
        return;
      }
      dispatch(updateUserProfile(data));
      dispatch(
        setError({
          message: "Profile updated successfully!",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(setError("Failed to update profile. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <MotionContainer animation="fade-in">
      <FormContainer>
        <form className="center flex-col space-y-5" onSubmit={handleSubmit}>
          <FlexBox type="column-1">
            <Title>Update Profile</Title>
            <Paragraph>Your current information</Paragraph>
          </FlexBox>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 w-full md:px-5">
            <div>
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label htmlFor="userBirthDate">Birth Date</label>
              <input
                type="date"
                id="userBirthDate"
                name="userBirthDate"
                value={formData.userBirthDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
              />
            </div>

            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
            </div>

            <div>
              <label htmlFor="sex">Gender</label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>
          </div>

          <Button type="submit" loading={loading}>
            Update Profile
          </Button>
        </form>
      </FormContainer>
    </MotionContainer>
  );
};

export default UpdateProfile;
