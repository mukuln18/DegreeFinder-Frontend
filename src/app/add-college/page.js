"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";

export default function AdminPage() {
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    ranking: "",
    fees: "",
    placementPercentage: "",
    eligibility: "",
    description: "",
    website: "",
    courses: [{ name: "", duration: "", fees: "" }],
    status: "draft",
  });

  // Fetch Colleges
  const fetchColleges = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_BASE_URL}/api/colleges`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setColleges(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) return router.replace("/login");
    if (role !== "admin") return router.replace("/");

    fetchColleges();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index][field] = value;
    setFormData({ ...formData, courses: updatedCourses });
  };

  const addCourse = () => {
    setFormData({
      ...formData,
      courses: [...formData.courses, { name: "", duration: "", fees: "" }],
    });
  };

  const removeCourse = (index) => {
    const updated = formData.courses.filter((_, i) => i !== index);
    setFormData({ ...formData, courses: updated });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "courses") {
          form.append("courses", JSON.stringify(formData.courses));
        } else {
          form.append(key, formData[key]);
        }
      });

      if (image) form.append("image", image);

      if (editingId) {
        await axios.put(
          `${API_BASE_URL}/api/colleges/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        alert("College updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/api/colleges`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("College created successfully!");
      }

      setFormData({
        name: "",
        location: "",
        ranking: "",
        fees: "",
        placementPercentage: "",
        eligibility: "",
        description: "",
        website: "",
        courses: [{ name: "", duration: "", fees: "" }],
        status: "draft",
      });

      setEditingId(null);
      setImage(null);
      setPreview(null);

      fetchColleges();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this college?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_BASE_URL}/api/colleges/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchColleges();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const handleEdit = (college) => {
    setFormData({
      name: college.name || "",
      location: college.location || "",
      ranking: college.ranking || "",
      fees: college.fees || "",
      placementPercentage: college.placementPercentage || "",
      eligibility: college.eligibility || "",
      description: college.description || "",
      website: college.website || "",
      courses: college.courses?.length
        ? college.courses
        : [{ name: "", duration: "", fees: "" }],
      status: college.status || "draft",
    });

    setPreview(college.image || null);
    setEditingId(college._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-8 space-y-10">
      {/* FORM */}
      <div className="flex justify-center">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>{editingId ? "Edit College" : "Add College"}</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                value={formData.name}
                placeholder="College Name"
                onChange={handleChange}
                required
              />
              <Input
                name="location"
                value={formData.location}
                placeholder="Location"
                onChange={handleChange}
              />
              <Input
                type="number"
                name="ranking"
                value={formData.ranking}
                placeholder="Ranking"
                onChange={handleChange}
              />
              <Input
                type="number"
                name="fees"
                value={formData.fees}
                placeholder="Fees"
                onChange={handleChange}
              />
              <Input
                type="number"
                name="placementPercentage"
                value={formData.placementPercentage}
                placeholder="Placement Percentage"
                onChange={handleChange}
              />
              <Input
                name="eligibility"
                value={formData.eligibility}
                placeholder="Eligibility"
                onChange={handleChange}
              />
              <Input
                name="website"
                value={formData.website}
                placeholder="Website URL"
                onChange={handleChange}
              />

              <textarea
                name="description"
                value={formData.description}
                placeholder="College Description"
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />

              {/* COURSES */}
              <div>
                <h3 className="font-medium mb-2">Courses</h3>

                {formData.courses.map((course, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      placeholder="Course Name"
                      value={course.name}
                      onChange={(e) =>
                        handleCourseChange(index, "name", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Duration"
                      value={course.duration}
                      onChange={(e) =>
                        handleCourseChange(index, "duration", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Fees"
                      value={course.fees}
                      onChange={(e) =>
                        handleCourseChange(index, "fees", e.target.value)
                      }
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeCourse(index)}
                    >
                      X
                    </Button>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addCourse}>
                  Add Course
                </Button>
              </div>

              {/* IMAGE */}
              <div className="space-y-2">
                <label className="text-sm font-medium">College Image</label>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    Choose Image
                  </Button>

                  <span className="text-sm text-gray-500">
                    {image ? image.name : "No file selected"}
                  </span>
                </div>

                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 rounded-lg border shadow-sm object-cover"
                />
              )}

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 w-full rounded-md"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => setPreviewMode(true)}
              >
                Preview College
              </Button>

              <Button type="submit" className="w-full">
                {editingId ? "Update College" : "Create College"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {previewMode && (
        <div className="fixed inset-0 bg-black/60 overflow-y-auto z-50">
          <div className="max-w-3xl mx-auto bg-white rounded-xl p-6 my-10 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6">Preview College</h2>

            {/* Image */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            {/* Basic Info */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold">{formData.name}</h3>

              <p className="text-gray-600">
                {formData.description || "No description provided"}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <p>
                  <strong>Location:</strong> {formData.location}
                </p>
                <p>
                  <strong>Ranking:</strong> {formData.ranking}
                </p>
                <p>
                  <strong>Fees:</strong> ₹{formData.fees}
                </p>
                <p>
                  <strong>Placement:</strong> {formData.placementPercentage}%
                </p>
                <p>
                  <strong>Eligibility:</strong> {formData.eligibility}
                </p>

                {formData.website && (
                  <p className="col-span-2">
                    <strong>Website:</strong>{" "}
                    <a
                      href={formData.website}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      {formData.website}
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Courses Preview */}
            {formData.courses && formData.courses.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Courses</h4>

                <div className="space-y-2">
                  {formData.courses.map((course, i) => (
                    <div key={i} className="border p-2 rounded">
                      <p>
                        <strong>{course.name}</strong>
                      </p>
                      <p className="text-sm">Duration: {course.duration}</p>
                      <p className="text-sm">Fees: ₹{course.fees}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <Button onClick={() => setPreviewMode(false)}>
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* COLLEGE LIST */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Existing Colleges</h2>

        <div className="space-y-3">
          {colleges.map((college) => (
            <div
              key={college._id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >
              <div className="flex items-center gap-4">
                {college.image && (
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-medium">{college.name}</p>
                  <p className="text-sm text-gray-500">{college.location}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEdit(college)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(college._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
