const commentSchema = require("../../schema/commentSchema");

// create
const createComment = async (req, res) => {
  try {
    const { post_id, content } = req.body;
    const userId = req.userId;

    const newComment = await commentSchema.create({
      post_id,
      user_id: userId,
      content,
    });

    res.status(201).send({
      success: true,
      message: "Izoh yaratildi",
      data: newComment,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Izohni yangilash
const updateComment = async (req, res) => {
  try {
    const { id } = req.params; // Izoh ID'si
    const { content } = req.body; // Yangi izoh mazmuni
    const userId = req.userId; // Token orqali foydalanuvchi ID'sini olish

    // Izohni toping
    const comment = await commentSchema.findById(id);
    if (!comment)
      return res
        .status(404)
        .send({ success: false, message: "Izoh topilmadi" });

    // Faqat izoh egasi yangilay oladi
    if (comment.user_id.toString() !== userId) {
      return res
        .status(403)
        .send({ success: false, message: "Siz bu izohni yangilay olmaysiz" });
    }

    // Izohni yangilash
    comment.content = content;
    await comment.save();

    res.send({
      success: true,
      message: "Izoh muvaffaqiyatli yangilandi",
      data: comment,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// deleteComment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // Izoh ID'si
    const userId = req.userId; // Token orqali foydalanuvchi ID'sini olish

    // Izohni toping
    const comment = await commentSchema.findById(id);
    if (!comment)
      return res
        .status(404)
        .send({ success: false, message: "Izoh topilmadi" });

    // Faqat izoh egasi o'chirishi mumkin
    if (comment.user_id.toString() !== userId) {
      return res
        .status(403)
        .send({ success: false, message: "Siz bu izohni o'chira olmaysiz" });
    }

    // Izohni o'chirish
    await commentSchema.findByIdAndDelete(id);

    res.send({
      success: true,
      message: "Izoh muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
};
