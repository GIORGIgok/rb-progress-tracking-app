import { useState } from "react";
import reply_to_comment from "../../../assets/images/task-detailed/reply-comment.png";
import { addComment } from "../../../api/comments/add-comment";

export default function CommentsList({
  commentsList,
  taskId,
  setCommentsList,
}) {
  const [replyingTo, setReplyingTo] = useState(null);
  const [subCommentText, setSubCommentText] = useState("");

  const handleReplyClick = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleSubCommentSubmit = async (e, parentId) => {
    e.preventDefault();
    if (!subCommentText.trim()) return;

    try {
      const newSubComment = await addComment(taskId, subCommentText, parentId);
      setSubCommentText("");
      setReplyingTo(null);

      setCommentsList((prevCommentsList) => {
        return prevCommentsList.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              sub_comments: [...comment.sub_comments, newSubComment],
            };
          }
          return comment;
        });
      });
    } catch (error) {
      console.error("Error adding sub-comment:", error);
    }
  };

  return (
    <section className="mt-[40px]">
      {commentsList.map((comment) => (
        <div
          key={comment.id}
          className="float-left w-[598px] min-h-[104px] mb-[16px]"
        >
          <div className="float-left h-full w-[50px] mr-[12px] pt-[6px]">
            <figure className="object-cover">
              <img
                src={comment.author_avatar}
                alt="employee-img"
                className="rounded-full object-cover w-[38px] h-[38px]"
              />
            </figure>
          </div>
          <div className="float-right w-[536px] h-full">
            <h4 className="font-[500] text-[18px] text-[#212529]">
              {comment.author_nickname}
            </h4>
            <p className="font-[350] text-[16px] mt-[8px] mb-[10px]">
              {comment.text}
            </p>
            <figure className="flex items-center gap-[6px]">
              <img
                src={reply_to_comment}
                alt="reply-to-comment"
                className="size-[16px]"
              />
              <figcaption
                onClick={() => handleReplyClick(comment.id)}
                className="w-fit text-[#8338EC] text-[12px] leading-[100%] cursor-pointer"
              >
                უპასუხე
              </figcaption>
            </figure>

            {comment.sub_comments && comment.sub_comments.length > 0 && (
              <div className="mt-4 pl-[20px] float-left block w-full">
                {comment.sub_comments.map((subComment) => (
                  <div key={subComment.id} className="mb-[10px]">
                    <div className="flex items-center gap-[8px]">
                      <img
                        src={subComment.author_avatar}
                        alt="subcomment-author-img"
                        className="rounded-full w-[30px] h-[30px] object-cover"
                      />
                      <h5 className="font-[500] text-[16px]">
                        {subComment.author_nickname}
                      </h5>
                    </div>
                    <p className="font-[350] text-[14px] mt-[4px] mb-[6px]">
                      {subComment.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {replyingTo === comment.id && (
              <form
                onSubmit={(e) => handleSubCommentSubmit(e, comment.id)}
                className="mt-4 float-left"
              >
                <textarea
                  value={subCommentText}
                  onChange={(e) => setSubCommentText(e.target.value)}
                  placeholder="დაწერე პასუხი..."
                  className="text-[#898989] font-[300] text-[14px] w-full bg-[#FFFFFF] border-[0.3px] border-[#ADB5BD] rounded-[10px] pt-[10px] px-[12px] pb-[10px] resize-none focus:outline-none focus:border-purple-600"
                />
                <button
                  type="submit"
                  className="cursor-pointer mt-2 text-[14px] bg-purple-600 text-white hover:bg-purple-700 rounded-[20px] px-[18px] py-[4px]"
                >
                  უპასუხე
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
