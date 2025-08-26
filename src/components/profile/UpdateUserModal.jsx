import { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import { User, MessageSquare, Upload, Image, X } from "lucide-react";
import Input from "../ui/input";
import { useUpdateMe } from "../../hooks/user/useUpdateMe";
import { toast } from "sonner";
import Button from "../ui/button";
import { useTranslation } from "react-i18next";

const UpdateUserModal = ({ userData, isOpen, onClose }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    userName: "",
    displayName: "",
    userBio: "",
    profilePhoto: null,
    profileBanner: null,
  });

  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState({
    profilePhoto: null,
    profileBanner: null,
  });

  // Initialize form data when modal opens or userData changes
  useEffect(() => {
    if (userData && isOpen) {
      setFormData({
        userName: userData.userName || "",
        displayName: userData.displayName || "",
        userBio: userData.userBio || "",
        profilePhoto: null,
        profileBanner: null,
      });
      setPreviews({
        profilePhoto: userData.profilePhotoUrl || null,
        profileBanner: userData.profileBannerUrl || null,
      });
      setErrors({});
    }
  }, [userData, isOpen]);

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case "userName":
        if (!value.trim()) {
          return t("profilePage.updateModal.validation.usernameRequired");
        }
        if (value.length < 3) {
          return t("profilePage.updateModal.validation.usernameMinLength");
        }
        if (value.length > 20) {
          return t("profilePage.updateModal.validation.usernameMaxLength");
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return t("profilePage.updateModal.validation.usernameInvalid");
        }
        return "";

      case "displayName":
        if (!value.trim()) {
          return t("profilePage.updateModal.validation.displayNameRequired");
        }
        if (value.length > 50) {
          return t("profilePage.updateModal.validation.displayNameMaxLength");
        }
        return "";

      case "userBio":
        if (value.length > 500) {
          return t("profilePage.updateModal.validation.bioMaxLength");
        }
        return "";

      default:
        return "";
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle file uploads
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: t("profilePage.updateModal.validation.invalidImageFile"),
        }));
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: t("profilePage.updateModal.validation.fileSizeLimit"),
        }));
        return;
      }

      // Clear any existing errors
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));

      // Update form data
      setFormData((prev) => ({ ...prev, [fieldName]: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => ({ ...prev, [fieldName]: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded file
  const removeFile = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: null }));
    setPreviews((prev) => ({
      ...prev,
      [fieldName]: userData?.[`${fieldName}Url`] || null,
    }));
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    newErrors.userName = validateField("userName", formData.userName);
    newErrors.displayName = validateField("displayName", formData.displayName);
    newErrors.userBio = validateField("userBio", formData.userBio);

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some((error) => error);
  };

  const { mutateAsync: updateMe, isPending } = useUpdateMe();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        const formDataPayload = new FormData();

        formDataPayload.append("UserName", formData.userName);
        formDataPayload.append("DisplayName", formData.displayName);
        formDataPayload.append("UserBio", formData.userBio);

        formData.profilePhoto &&
          formDataPayload.append("ProfilePhoto", formData.profilePhoto);

        formData.profileBanner &&
          formDataPayload.append("ProfileBanner", formData.profileBanner);

        await updateMe(formDataPayload);

        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error(t("profilePage.updateModal.updateError"));
    }
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      userName: "",
      displayName: "",
      userBio: "",
      profilePhoto: null,
      profileBanner: null,
    });
    setPreviews({
      profilePhoto: null,
      profileBanner: null,
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="rounded-lg p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {t("profilePage.updateModal.title")}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <Input
            id="userName"
            name="userName"
            type="text"
            value={formData.userName}
            onChange={handleInputChange}
            label={t("profilePage.updateModal.username")}
            placeholder={t("profilePage.updateModal.usernamePlaceholder")}
            icon={<User className="h-5 w-5 text-gray-400" />}
            error={errors.userName}
            required
          />

          {/* Display Name */}
          <Input
            id="displayName"
            name="displayName"
            type="text"
            value={formData.displayName}
            onChange={handleInputChange}
            label={t("profilePage.updateModal.displayName")}
            placeholder={t("profilePage.updateModal.displayNamePlaceholder")}
            icon={<User className="h-5 w-5 text-gray-400" />}
            error={errors.displayName}
            required
          />

          {/* Bio */}
          <div>
            <label
              htmlFor="userBio"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              {t("profilePage.updateModal.bio")}
              <span className="text-gray-500 ml-2">
                ({formData.userBio.length}/500)
              </span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute top-3 left-3 h-5 w-5 text-gray-400 pointer-events-none" />
              <textarea
                id="userBio"
                name="userBio"
                value={formData.userBio}
                onChange={handleInputChange}
                placeholder={t("profilePage.updateModal.bioPlaceholder")}
                rows={4}
                className={`w-full pl-10 pr-4 py-3 bg-gray-800 border ${
                  errors.userBio ? "border-red-500" : "border-gray-600"
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                  errors.userBio ? "focus:ring-red-500" : "focus:ring-blue-500"
                } focus:border-transparent transition-all duration-200 resize-none`}
              />
            </div>
            {errors.userBio && (
              <p className="text-red-600 my-3 text-sm">{errors.userBio}</p>
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("profilePage.updateModal.profilePhoto")}
            </label>
            <div className="flex items-center space-x-4">
              {previews.profilePhoto && (
                <div className="relative">
                  <img
                    src={previews.profilePhoto}
                    alt={t("profilePage.updateModal.profilePhotoPreview")}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile("profilePhoto")}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              <label className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 cursor-pointer transition-colors">
                <Upload className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-300">
                  {formData.profilePhoto
                    ? t("profilePage.updateModal.changePhoto")
                    : t("profilePage.updateModal.uploadPhoto")}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "profilePhoto")}
                  className="hidden"
                />
              </label>
            </div>
            {errors.profilePhoto && (
              <p className="text-red-600 my-3 text-sm">{errors.profilePhoto}</p>
            )}
          </div>

          {/* Profile Banner */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t("profilePage.updateModal.profileBanner")}
            </label>
            <div className="space-y-3">
              {previews.profileBanner && (
                <div className="relative">
                  <img
                    src={previews.profileBanner}
                    alt={t("profilePage.updateModal.bannerPreview")}
                    className="w-full h-32 rounded-lg object-cover border-2 border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile("profileBanner")}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <label className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 border-dashed rounded-lg p-6 cursor-pointer transition-colors">
                <Image className="h-6 w-6 text-gray-400" />
                <span className="text-sm text-gray-300">
                  {formData.profileBanner
                    ? t("profilePage.updateModal.changeBanner")
                    : t("profilePage.updateModal.uploadBanner")}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "profileBanner")}
                  className="hidden"
                />
              </label>
            </div>
            {errors.profileBanner && (
              <p className="text-red-600 my-3 text-sm">
                {errors.profileBanner}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors"
            >
              {t("profilePage.updateModal.cancel")}
            </button>

            <Button type="submit" isLoading={isPending}>
              {t("profilePage.updateModal.updateProfile")}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
