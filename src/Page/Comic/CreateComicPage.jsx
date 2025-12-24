import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComic, getComicById, updateComic } from "../../api/comicService";
import axiosClient from "../../api/axiosClient";

export default function CreateComicPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [form, setForm] = useState({
    title: "",
    author: "",
    emotionId: "",
    coverImage: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [emotions, setEmotions] = useState([]);


  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEditMode) loadComic();
  }, [id]);
  useEffect(() => {
    fetchEmotions();
  }, []);

  const fetchEmotions = async () => {
    try {
      const res = await axiosClient.get("/api/emotions");
      setEmotions(res.data);
    } catch (err) {
      alert("Không tải được danh sách thể loại");
    }
  };


  const loadComic = async () => {
    try {
      const res = await getComicById(id);
      const comic = res.data;
      setForm({
        title: comic.title || "",
        author: comic.author || "",
        emotionId: comic.emotionId || "",
        coverImage: comic.coverImage || "",
        description: comic.description || "",
      });
      setImagePreview(comic.coverImage || null);
    } catch {
      alert("Không tải được thông tin truyện!");
      navigate("/admin/comics");
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Chỉ chọn file ảnh!");
    if (file.size > 5 * 1024 * 1024) return alert("Ảnh quá lớn (>5MB)");
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleChooseImageClick = () => fileInputRef.current?.click();

  const uploadImage = async () => {
    if (!imageFile) return form.coverImage;
    const formData = new FormData();
    formData.append("file", imageFile);
    const res = await axiosClient.post("/api/uploads", formData, { headers: { "Content-Type": "multipart/form-data" } });
    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const coverImageUrl = await uploadImage();
      const payload = { ...form, emotionId: Number(form.emotionId), coverImage: coverImageUrl };
      if (isEditMode) {
        await updateComic(id, payload);
        alert("Cập nhật truyện thành công!");
      } else {
        await createComic(payload);
        alert("Thêm truyện thành công!");
      }
      navigate("/admin/comics");
    } catch (err) {
      alert(err.message || "Lưu truyện thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <div className="text-center py-10">Đang tải thông tin truyện...</div>;

  return (
    <div className="mx-auto max-w-2xl p-5 bg-white dark:bg-[#1A2633] rounded-xl shadow-md">
      <h1 className="mb-5 text-2xl font-bold text-black dark:text-white">{isEditMode ? "Chỉnh sửa Truyện" : "Thêm Truyện Mới"}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên truyện & Tác giả */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-black dark:text-white">Tên truyện</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full rounded-md bg-gray-100 dark:bg-[#2A3B4D] px-3 py-2 text-black dark:text-white focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-black dark:text-white">Tác giả</label>
            <input name="author" value={form.author} onChange={handleChange} required
              className="w-full rounded-md bg-gray-100 dark:bg-[#2A3B4D] px-3 py-2 text-black dark:text-white focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {/* Thể loại */}
        <div>
          <label className="block mb-1 text-sm font-medium text-black dark:text-white">Thể loại</label>
          <select
            name="emotionId"
            value={form.emotionId}
            onChange={handleChange}
            required
            className="w-full rounded-md bg-gray-100 dark:bg-[#2A3B4D] px-3 py-2 text-black dark:text-white"
          >
            <option value="">-- Chọn thể loại --</option>
            {emotions.map((emotion) => (
              <option key={emotion.id} value={emotion.id}>
                {emotion.name}
              </option>
            ))}
          </select>

        </div>

        {/* Ảnh bìa */}
        <div>
          <label className="block mb-1 text-sm font-medium text-black dark:text-white">Ảnh bìa</label>
          <div className="mb-2">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-60 object-contain rounded-md border border-gray-300 dark:border-gray-600" />
            ) : (
              <div className="w-full h-60 bg-gray-100 dark:bg-[#2A3B4D] flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600">
                <span className="text-gray-400 text-sm">Chưa chọn ảnh</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleChooseImageClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">
              Chọn ảnh
            </button>
            {imageFile && <span className="text-sm text-gray-500 dark:text-gray-300">{imageFile.name}</span>}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block mb-1 text-sm font-medium text-black dark:text-white">Mô tả</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="3"
            className="w-full rounded-md bg-gray-100 dark:bg-[#2A3B4D] px-3 py-2 text-black dark:text-white" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate("/admin/comics")}
            className="px-4 py-2 rounded-md border text-sm hover:bg-gray-100 dark:hover:bg-[#2A3B4D]">
            Hủy
          </button>
          <button type="submit" disabled={loading}
            className="px-5 py-2 rounded-md bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 disabled:opacity-50">
            {loading ? "Đang lưu..." : isEditMode ? "Cập nhật" : "Lưu"}
          </button>
        </div>
      </form>
    </div>
  );
}
