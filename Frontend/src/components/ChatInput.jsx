import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useMessage } from "../store/useMessage";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useMessage();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-2 sm:p-3 md:p-4 border-t border-gray-800 bg-gray-900 flex-shrink-0">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-2 sm:mb-2.5 md:mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-lg border-2 border-gray-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 md:-top-2 md:-right-2 w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 rounded-full bg-gray-800 hover:bg-red-500 border-2 border-gray-700 flex items-center justify-center transition-colors group"
              type="button"
            >
              <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-gray-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-1.5 sm:gap-2">
        <div className="flex-1 flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-gray-800 rounded-lg px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 border border-gray-700 focus-within:border-purple-500 transition-colors min-w-0">
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-xs sm:text-sm min-w-0"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Image Upload Button */}
          <button
            type="button"
            className={`flex p-1 sm:p-1.5 md:p-2 rounded-lg transition-colors flex-shrink-0 ${
              imagePreview 
                ? "text-purple-400 hover:bg-purple-500/10" 
                : "text-gray-400 hover:bg-gray-700"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className={`p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-lg transition-all flex-shrink-0 ${
            text.trim() || imagePreview
              ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-800 text-gray-600 cursor-not-allowed"
          }`}
        >
          <Send className={`w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 ${text.trim() || imagePreview ? "" : "opacity-50"}`} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;