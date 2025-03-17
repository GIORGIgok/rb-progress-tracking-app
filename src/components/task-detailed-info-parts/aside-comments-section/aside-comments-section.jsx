import { useEffect, useState } from "react";
import { getCommentsByTaskId } from "../../../api/comments/get-comment-by-id";
import CommentsList from "./comments-list";

export default function AsideCommentsSection({ taskId }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const data = await getCommentsByTaskId(taskId);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) fetchComments();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    const newComment = await addComment(taskId, comment);

    if (newComment) {
      // console.log("Comment added:", newComment);
      setComment("");
    } else {
      console.error("Failed to add comment");
    }

    setLoading(false);
  };

  const commentsQty = comments.length;

  return (
    <aside className="w-[741px] rounded-[10px] bg-[#F8F3FEA6]/65 border-[#DDD2FF] border-[0.3px] p-[45px]">
      <form
        onSubmit={handleSubmit}
        className="w-[651px] h-[135px] m-auto relative"
      >
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="დაწერე კომენტარი"
          className="text-[#898989] font-[300] text-[14px] w-full h-full bg-[#FFFFFF] border-[0.3px] border-[#ADB5BD] rounded-[10px] pt-[18px] px-[20px] pb-[15px] resize-none focus:outline-none focus:border-purple-600"
        />
        <button
          disabled={loading}
          type="submit"
          className="cursor-pointer text-[14px] absolute right-3 bottom-3 bg-[#8338EC] hover:bg-[#B588F4] text-[#ffffff] transition-colors duration-200 text-whit rounded-[20px] px-[20px] py-[8px]"
        >
          დააკომენტარე
        </button>
      </form>
      {/* add comments */}
      <div className="mt-[66px]">
        <div className="flex items-center gap-[7px]">
          <h3 className="text-[20px] font-[500] text-[#000000]">კომენტარები</h3>
          <span className="rounded-[30px] bg-[#8338EC] w-[30px] h-[20px] flex items-center justify-center text-[#FFFFFF]">
            {commentsQty}
          </span>
        </div>

        {/* comments */}
        <CommentsList
          commentsList={comments}
          taskId={taskId}
          setCommentsList={setComments}
        />
      </div>
    </aside>
  );
}
