module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      name: String,
      password: String,
      todos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "todo",
        },
      ],
    },
    { timestamps: true }
  );

  const User = mongoose.model("user", schema);

  return User;
};
